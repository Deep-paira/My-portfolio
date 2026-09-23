import * as THREE from "three";
import Delaunator from "delaunator";
import { installWasmLogFilter } from "./wasm-log-filter";

export interface TriangleData {
  // Resolved state
  resolvedCentroid: THREE.Vector3;
  localOffsets: [THREE.Vector3, THREE.Vector3, THREE.Vector3];
  uvs: [THREE.Vector2, THREE.Vector2, THREE.Vector2];

  // Scrunched state
  scrunchedCentroid: THREE.Vector3;
  scrunchedQuaternion: THREE.Quaternion;
  scrunchedScale: number;
}

export interface PaperMeshModel {
  geometry: THREE.BufferGeometry;
  triangles: TriangleData[];
  faceDetected: boolean;
  landmarkCount: number;
  trianglesCount: number;
}

/**
 * Deterministic pseudo-random number generator for reproducible paper crumple
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * High-fidelity anatomical facial feature points (used when FaceLandmarker is unavailable or offline)
 */
export function getAnatomicalFallbackPoints(): [number, number][] {
  const pts: [number, number][] = [];

  // 1. Jawline & Chin contour (9 curated points)
  const jawX = [0.24, 0.29, 0.35, 0.42, 0.50, 0.58, 0.65, 0.71, 0.76];
  const jawY = [0.42, 0.55, 0.68, 0.78, 0.84, 0.78, 0.68, 0.55, 0.42];
  for (let i = 0; i < jawX.length; i++) pts.push([jawX[i], jawY[i]]);

  // 2. Forehead & Temples arc (7 points)
  const foreheadX = [0.26, 0.34, 0.42, 0.50, 0.58, 0.66, 0.74];
  const foreheadY = [0.30, 0.24, 0.20, 0.19, 0.20, 0.24, 0.30];
  for (let i = 0; i < foreheadX.length; i++) pts.push([foreheadX[i], foreheadY[i]]);

  // 3. Eyebrows (left & right, 4 points each)
  const leftBrowX = [0.31, 0.36, 0.40, 0.45];
  const leftBrowY = [0.32, 0.30, 0.30, 0.32];
  for (let i = 0; i < leftBrowX.length; i++) pts.push([leftBrowX[i], leftBrowY[i]]);

  const rightBrowX = [0.55, 0.60, 0.64, 0.69];
  const rightBrowY = [0.32, 0.30, 0.30, 0.32];
  for (let i = 0; i < rightBrowX.length; i++) pts.push([rightBrowX[i], rightBrowY[i]]);

  // 4. Eyes (left & right, 5 points each)
  const leftEye = [
    [0.33, 0.38], [0.38, 0.36], [0.43, 0.38], [0.38, 0.41], [0.38, 0.38]
  ];
  for (const p of leftEye) pts.push([p[0], p[1]]);

  const rightEye = [
    [0.57, 0.38], [0.62, 0.36], [0.67, 0.38], [0.62, 0.41], [0.62, 0.38]
  ];
  for (const p of rightEye) pts.push([p[0], p[1]]);

  // 5. Nose (bridge, tip & nostrils)
  const nose = [
    [0.50, 0.36], [0.50, 0.46], [0.50, 0.54], [0.45, 0.54], [0.55, 0.54]
  ];
  for (const p of nose) pts.push([p[0], p[1]]);

  // 6. Mouth & Lips (7 points)
  const lips = [
    [0.43, 0.65], [0.50, 0.63], [0.57, 0.65],
    [0.54, 0.69], [0.50, 0.70], [0.46, 0.69],
    [0.50, 0.66]
  ];
  for (const p of lips) pts.push([p[0], p[1]]);

  // 7. Cheeks & Midface
  pts.push([0.34, 0.50], [0.66, 0.50]);

  // 8. Neck & Collar
  pts.push([0.42, 0.92], [0.50, 0.93], [0.58, 0.92]);

  return pts;
}

/**
 * Generate peripheral and background grid points so the entire photo area is triangulated
 */
function getPerimeterAndFillPoints(existingPoints: [number, number][]): [number, number][] {
  const result: [number, number][] = [...existingPoints];

  // 4 corners
  result.push([0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0]);

  // Perimeter points along the 4 edges (6 divisions = 20 edge points)
  const edgeDivisions = 6;
  for (let i = 1; i < edgeDivisions; i++) {
    const t = i / edgeDivisions;
    result.push([t, 0.0]); // Top
    result.push([t, 1.0]); // Bottom
    result.push([0.0, t]); // Left
    result.push([1.0, t]); // Right
  }

  // Background filler grid (avoiding areas with already dense facial landmarks)
  const gridStepsX = 6;
  const gridStepsY = 7;
  for (let gx = 1; gx < gridStepsX; gx++) {
    for (let gy = 1; gy < gridStepsY; gy++) {
      const px = gx / gridStepsX + (pseudoRandom(gx * 31 + gy * 17) - 0.5) * 0.05;
      const py = gy / gridStepsY + (pseudoRandom(gx * 19 + gy * 47) - 0.5) * 0.05;

      // Don't add grid point if it's too close to an existing landmark
      let tooClose = false;
      for (const [ex, ey] of result) {
        const dx = px - ex;
        const dy = py - ey;
        if (dx * dx + dy * dy < 0.005) {
          tooClose = true;
          break;
        }
      }

      if (!tooClose) {
        result.push([Math.max(0.02, Math.min(0.98, px)), Math.max(0.02, Math.min(0.98, py))]);
      }
    }
  }

  return result;
}

/**
 * Detect face landmarks using MediaPipe Tasks Vision FaceLandmarker
 */
export async function detectFaceLandmarksFromImage(
  imageElement: HTMLImageElement
): Promise<{ landmarks: [number, number][]; faceDetected: boolean }> {
  let faceLandmarker: any = null;

  try {
    // 1. Ensure image is decoded and prepare offscreen canvas buffer
    if ("decode" in imageElement) {
      try {
        await imageElement.decode();
      } catch {}
    }

    const width = Math.max(320, imageElement.naturalWidth || imageElement.width || 800);
    const height = Math.max(320, imageElement.naturalHeight || imageElement.height || 1000);
    imageElement.width = width;
    imageElement.height = height;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      return { landmarks: getAnatomicalFallbackPoints(), faceDetected: false };
    }
    ctx.drawImage(imageElement, 0, 0, width, height);

    // 2. Load MediaPipe FaceLandmarker dynamically
    installWasmLogFilter();

    const { FilesetResolver, FaceLandmarker } = await import("@mediapipe/tasks-vision");

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    installWasmLogFilter();

    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "CPU",
      },
      outputFaceBlendshapes: false,
      runningMode: "IMAGE",
      numFaces: 1,
    });

    installWasmLogFilter();

    // 3. Detect landmarks from the guaranteed 2D canvas buffer
    let results: any = null;
    const currentError = typeof window !== "undefined" ? window.console.error : console.error;
    try {
      if (typeof window !== "undefined") {
        window.console.error = function (this: any, ...args: any[]) {
          const msg = String(args[0] || "");
          if (
            msg.includes("TensorFlow Lite") ||
            msg.includes("XNNPACK") ||
            msg.includes("INFO:") ||
            msg.includes("vision_wasm") ||
            msg.includes("mediapipe")
          ) {
            console.info("[PaperScrunch Info]", ...args);
            return;
          }
          return currentError.apply(this || window.console, args);
        };
      }
      results = faceLandmarker.detect(canvas);
    } catch (detectErr) {
      console.warn("[PaperScrunch] FaceLandmarker detect threw error, using anatomical fallback:", detectErr);
    } finally {
      if (typeof window !== "undefined") {
        window.console.error = currentError;
      }
    }

    if (results && results.faceLandmarks && results.faceLandmarks.length > 0) {
      const allLandmarks = results.faceLandmarks[0];
      const sampledPoints: [number, number][] = [];
      // Sample key landmark points with stride 6 for optimal ~200-triangle low-poly origami facets
      for (let i = 0; i < allLandmarks.length; i += 6) {
        const lm = allLandmarks[i];
        sampledPoints.push([
          Math.max(0.02, Math.min(0.98, lm.x)),
          Math.max(0.02, Math.min(0.98, lm.y)),
        ]);
      }

      try {
        faceLandmarker.close();
      } catch {}

      return { landmarks: sampledPoints, faceDetected: true };
    }
  } catch (err) {
    console.warn("[PaperScrunch] MediaPipe FaceLandmarker initialization skipped, utilizing structured anatomical grid:", err);
  } finally {
    if (faceLandmarker) {
      try {
        faceLandmarker.close();
      } catch {}
    }
  }

  return { landmarks: getAnatomicalFallbackPoints(), faceDetected: false };
}

/**
 * Builds the PaperMeshModel with Delaunay triangulation and scrunched/resolved transforms
 */
export function buildPaperScrunchGeometry(
  points: [number, number][],
  faceDetected: boolean,
  aspectRatio: number = 3 / 4 // standard portrait ratio
): PaperMeshModel {
  // Ensure full coverage by adding edges and grid points
  const combinedPoints = getPerimeterAndFillPoints(points);

  // Delaunay Triangulation
  const delaunay = Delaunator.from(combinedPoints);
  const triangleIndices = delaunay.triangles;
  const numTriangles = triangleIndices.length / 3;

  // 3D dimensions of resolved portrait
  const portraitHeight = 4.4;
  const portraitWidth = portraitHeight * aspectRatio;

  const trianglesData: TriangleData[] = [];

  // Buffer arrays for Three.js BufferGeometry (non-indexed for distinct paper facets)
  const positions = new Float32Array(numTriangles * 3 * 3);
  const uvs = new Float32Array(numTriangles * 3 * 2);

  const identityQuat = new THREE.Quaternion();

  for (let i = 0; i < numTriangles; i++) {
    const idx0 = triangleIndices[i * 3];
    const idx1 = triangleIndices[i * 3 + 1];
    const idx2 = triangleIndices[i * 3 + 2];

    const p0 = combinedPoints[idx0];
    const p1 = combinedPoints[idx1];
    const p2 = combinedPoints[idx2];

    // UV coordinates (image space: (0,0) top-left, Three.js: (0,1) top-left)
    const uv0 = new THREE.Vector2(p0[0], 1.0 - p0[1]);
    const uv1 = new THREE.Vector2(p1[0], 1.0 - p1[1]);
    const uv2 = new THREE.Vector2(p2[0], 1.0 - p2[1]);

    // Resolved 3D coordinates (centered around origin)
    const v0 = new THREE.Vector3((p0[0] - 0.5) * portraitWidth, (0.5 - p0[1]) * portraitHeight, 0);
    const v1 = new THREE.Vector3((p1[0] - 0.5) * portraitWidth, (0.5 - p1[1]) * portraitHeight, 0);
    const v2 = new THREE.Vector3((p2[0] - 0.5) * portraitWidth, (0.5 - p2[1]) * portraitHeight, 0);

    // Subtle micro-crease Z offset to give paper physical tactile relief even when flat
    const microZ = (pseudoRandom(i * 13) - 0.5) * 0.025;
    v0.z += microZ;
    v1.z -= microZ * 0.5;
    v2.z += microZ * 0.5;

    // Centroid of the triangle in resolved state
    const resolvedCentroid = new THREE.Vector3()
      .add(v0)
      .add(v1)
      .add(v2)
      .divideScalar(3);

    // Local vertex offsets from centroid
    const localOffsets: [THREE.Vector3, THREE.Vector3, THREE.Vector3] = [
      new THREE.Vector3().subVectors(v0, resolvedCentroid),
      new THREE.Vector3().subVectors(v1, resolvedCentroid),
      new THREE.Vector3().subVectors(v2, resolvedCentroid),
    ];

    // Compute scrunched state:
    // Facets compress into a tight, crumpled paper ball around origin
    const seed = i * 29 + 7;
    const rBase = 0.55 + pseudoRandom(seed) * 0.55; // Ball radius ~0.55 - 1.10
    const theta = pseudoRandom(seed + 1) * Math.PI * 2;
    const phi = Math.acos(2 * pseudoRandom(seed + 2) - 1);

    const scrunchedCentroid = new THREE.Vector3(
      rBase * Math.sin(phi) * Math.cos(theta),
      rBase * Math.sin(phi) * Math.sin(theta),
      rBase * Math.cos(phi)
    );

    // Random 3D rotation representing folded, crumpled paper
    const rx = (pseudoRandom(seed + 3) - 0.5) * Math.PI * 2;
    const ry = (pseudoRandom(seed + 4) - 0.5) * Math.PI * 2;
    const rz = (pseudoRandom(seed + 5) - 0.5) * Math.PI * 2;
    const euler = new THREE.Euler(rx, ry, rz);
    const scrunchedQuaternion = new THREE.Quaternion().setFromEuler(euler);

    // Random scale factor for crumpled facet depth
    const scrunchedScale = 0.82 + pseudoRandom(seed + 6) * 0.32;

    trianglesData.push({
      resolvedCentroid,
      localOffsets,
      uvs: [uv0, uv1, uv2],
      scrunchedCentroid,
      scrunchedQuaternion,
      scrunchedScale,
    });

    // Write UVs (static)
    const uvOffset = i * 6;
    uvs[uvOffset] = uv0.x;
    uvs[uvOffset + 1] = uv0.y;
    uvs[uvOffset + 2] = uv1.x;
    uvs[uvOffset + 3] = uv1.y;
    uvs[uvOffset + 4] = uv2.x;
    uvs[uvOffset + 5] = uv2.y;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

  // Initialize at scrunched state (progress = 0)
  updatePaperMesh(geometry, trianglesData, 0.0);

  return {
    geometry,
    triangles: trianglesData,
    faceDetected,
    landmarkCount: points.length,
    trianglesCount: numTriangles,
  };
}

// Reusable temporary variables to avoid per-frame GC allocations
const _tempCentroid = new THREE.Vector3();
const _tempQuat = new THREE.Quaternion();
const _tempOffset = new THREE.Vector3();
const _identityQuat = new THREE.Quaternion();

/**
 * Smooth luxury quintic ease for organic origami unfolding
 */
export function easeUnfold(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

/**
 * Updates vertex positions of the paper mesh according to progress [0, 1]
 */
export function updatePaperMesh(
  geometry: THREE.BufferGeometry,
  triangles: TriangleData[],
  progress: number
): void {
  const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
  if (!posAttr) return;

  const positions = posAttr.array as Float32Array;
  const eased = easeUnfold(progress);

  for (let i = 0; i < triangles.length; i++) {
    const tri = triangles[i];

    // Interpolate centroid
    _tempCentroid.lerpVectors(tri.scrunchedCentroid, tri.resolvedCentroid, eased);

    // Slerp quaternion rotation
    _tempQuat.copy(tri.scrunchedQuaternion).slerp(_identityQuat, eased);

    // Interpolate facet scale
    const scale = THREE.MathUtils.lerp(tri.scrunchedScale, 1.0, eased);

    const posOffset = i * 9;

    // Vertex 0
    _tempOffset.copy(tri.localOffsets[0]).multiplyScalar(scale).applyQuaternion(_tempQuat).add(_tempCentroid);
    positions[posOffset] = _tempOffset.x;
    positions[posOffset + 1] = _tempOffset.y;
    positions[posOffset + 2] = _tempOffset.z;

    // Vertex 1
    _tempOffset.copy(tri.localOffsets[1]).multiplyScalar(scale).applyQuaternion(_tempQuat).add(_tempCentroid);
    positions[posOffset + 3] = _tempOffset.x;
    positions[posOffset + 4] = _tempOffset.y;
    positions[posOffset + 5] = _tempOffset.z;

    // Vertex 2
    _tempOffset.copy(tri.localOffsets[2]).multiplyScalar(scale).applyQuaternion(_tempQuat).add(_tempCentroid);
    positions[posOffset + 6] = _tempOffset.x;
    positions[posOffset + 7] = _tempOffset.y;
    positions[posOffset + 8] = _tempOffset.z;
  }

  posAttr.needsUpdate = true;
}
