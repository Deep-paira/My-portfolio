"use client";

import * as React from "react";
import * as THREE from "three";
import {
  detectFaceLandmarksFromImage,
  getAnatomicalFallbackPoints,
  buildPaperScrunchGeometry,
  updatePaperMesh,
  PaperMeshModel,
} from "@/lib/paper-mesh/triangulation";

interface PaperScrunchSceneProps {
  progress?: number; // 0 (scrunched ball) to 1 (resolved flat portrait)
  progressRef?: React.MutableRefObject<number>; // Imperative progress ref to eliminate per-frame React re-renders
  shouldReduceMotion?: boolean;
  imageSrc?: string;
  onModelLoaded?: (info: {
    faceDetected: boolean;
    landmarkCount: number;
    trianglesCount: number;
    activeImageSrc: string;
  }) => void;
}

export function PaperScrunchScene({
  progress = 0.45,
  progressRef,
  shouldReduceMotion = false,
  imageSrc = "/deep-photo.jpg",
  onModelLoaded,
}: PaperScrunchSceneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // References to dynamic 3D elements
  const paperModelRef = React.useRef<PaperMeshModel | null>(null);
  const meshGroupRef = React.useRef<THREE.Group | null>(null);
  const paperMaterialRef = React.useRef<THREE.MeshStandardMaterial | null>(null);
  const currentProgressRef = React.useRef<number>(progressRef?.current ?? progress);
  const targetProgressRef = React.useRef<number>(progressRef?.current ?? progress);

  // Subtle mouse tilt parallax
  const mouseTiltRef = React.useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Update target progress when fallback prop changes (only if progressRef is not provided)
  React.useEffect(() => {
    if (!progressRef) {
      targetProgressRef.current = progress;
    }
  }, [progress, progressRef]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDisposed = false;
    let animationFrameId: number;
    let entranceStartTime: number | null = null;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    let width = container.clientWidth || 600;
    let height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0, 7.2);

    // 2. WebGL Renderer with High-Performance Settings
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    // 3. Studio Lighting for Paper Sculpture
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0xfff8f2, 0.95);
    scene.add(ambientLight);

    // Key Light: Warm terracotta
    const keyLight = new THREE.DirectionalLight(0xe08865, 2.2);
    keyLight.position.set(4, 5, 4.5);
    scene.add(keyLight);

    // Fill Light: Soft neutral
    const fillLight = new THREE.DirectionalLight(0xf5ebe1, 1.1);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    // Rim/Accent Light: Cyan edge glow matching portfolio theme
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.9);
    rimLight.position.set(0, -4, -2);
    scene.add(rimLight);

    // Top rim light
    const topRimLight = new THREE.DirectionalLight(0x67e8f9, 1.2);
    topRimLight.position.set(-3, 5, -2);
    scene.add(topRimLight);

    // Mesh container group
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // 4. Asset Loading and Landmark Detection Pipeline
    const loadAssetsAndBuildMesh = async () => {
      // Determine candidate image sources in priority order:
      // 1. /deep-photo.jpg (primary styled portrait)
      // 2. /portrait.jpg (direct mirror)
      // 3. /deep.jpeg (legacy mirror)
      const candidatePaths = [imageSrc, "/deep-photo.jpg", "/portrait.jpg", "/deep.jpeg"];
      let activeImg: HTMLImageElement | null = null;
      let activeSrc = imageSrc;

      for (const path of candidatePaths) {
        try {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = path;
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject();
          });
          activeImg = img;
          activeSrc = path;
          break;
        } catch {
          // Try next fallback candidate
        }
      }

      if (isDisposed || !activeImg) return;

      // Ensure image is decoded and natural dimensions are available
      if ("decode" in activeImg) {
        try {
          await activeImg.decode();
        } catch {}
      }

      const imgWidth = activeImg.naturalWidth || 800;
      const imgHeight = activeImg.naturalHeight || 1000;
      const aspect = imgWidth / imgHeight;

      // Detect face landmarks via MediaPipe (or use anatomical fallback if unavailable)
      let landmarks: [number, number][];
      let faceDetected = false;
      try {
        const res = await detectFaceLandmarksFromImage(activeImg);
        landmarks = res.landmarks;
        faceDetected = res.faceDetected;
      } catch (err) {
        console.warn("[PaperScrunch] Landmark detection fallback activated:", err);
        landmarks = getAnatomicalFallbackPoints();
        faceDetected = false;
      }

      if (isDisposed) return;

      // Triangulate & construct PaperMeshModel
      const paperModel = buildPaperScrunchGeometry(landmarks, faceDetected, aspect);
      paperModelRef.current = paperModel;

      // Texture setup
      const texture = new THREE.Texture(activeImg);
      texture.needsUpdate = true;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      // Matte cardstock paper material with per-facet flat shading
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.82,
        metalness: 0.04,
        flatShading: true, // Crucial for distinct origami paper facets
        side: THREE.DoubleSide,
        transparent: true,
        opacity: shouldReduceMotion ? 1 : 0,
      });
      paperMaterialRef.current = material;

      const paperMesh = new THREE.Mesh(paperModel.geometry, material);
      paperMesh.castShadow = true;
      paperMesh.receiveShadow = true;
      meshGroup.add(paperMesh);

      // Trigger tactile pop-up entrance animation
      if (!shouldReduceMotion) {
        entranceStartTime = performance.now();
        meshGroup.scale.set(0.001, 0.001, 0.001);
        meshGroup.position.y = -0.35;
        // Start crumpled so it unfolds/blossoms out during pop-up
        currentProgressRef.current = 0.18;
      } else {
        meshGroup.scale.set(1, 1, 1);
        meshGroup.position.y = 0;
      }

      // Report model stats to parent HUD
      onModelLoaded?.({
        faceDetected,
        landmarkCount: paperModel.landmarkCount,
        trianglesCount: paperModel.trianglesCount,
        activeImageSrc: activeSrc,
      });
    };

    loadAssetsAndBuildMesh();

    // 5. Mouse Parallax Handler
    const handleMouseMove = (e: MouseEvent) => {
      if (shouldReduceMotion) return;
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseTiltRef.current.targetX = ny * 0.16; // Pitch (X rotation)
      mouseTiltRef.current.targetY = nx * 0.22; // Yaw (Y rotation)
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 6. Animation Render Loop
    let lastTime = performance.now();

    const render = () => {
      if (isDisposed) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Direct reading from progressRef or targetProgressRef with zero React re-renders
      const targetP = progressRef ? progressRef.current : targetProgressRef.current;
      const curP = currentProgressRef.current;
      const diff = targetP - curP;

      // Snappy and fluid interpolation: delta * 20 settles in ~100ms without mushy lag
      if (Math.abs(diff) > 0.0003) {
        currentProgressRef.current += diff * Math.min(1, delta * 20);
        if (paperModelRef.current) {
          updatePaperMesh(
            paperModelRef.current.geometry,
            paperModelRef.current.triangles,
            currentProgressRef.current
          );
        }
      }

      // Pop-up entrance animation with natural spring overshoot (Back.easeOut)
      let entranceRotationZ = 0;
      if (entranceStartTime !== null) {
        const elapsed = (now - entranceStartTime) / 1000;
        const ENTRANCE_DURATION = 1.1; // 1.1s smooth pop-up
        if (elapsed < ENTRANCE_DURATION) {
          const t = Math.min(1, elapsed / ENTRANCE_DURATION);
          // Subtle natural overshoot spring curve
          const c1 = 1.25;
          const c3 = c1 + 1;
          const easeBack = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
          const currentScale = Math.max(0.001, easeBack);
          meshGroup.scale.set(currentScale, currentScale, currentScale);

          // Pop up smoothly on Y axis
          const easeCubic = 1 - Math.pow(1 - t, 3);
          meshGroup.position.y = -0.35 * (1 - easeCubic);
          entranceRotationZ = (1 - easeCubic) * -0.06;

          // Quick smooth opacity fade-in
          if (paperMaterialRef.current) {
            paperMaterialRef.current.opacity = Math.min(1, elapsed * 3.5);
          }
        } else {
          entranceStartTime = null;
          meshGroup.scale.set(1, 1, 1);
          meshGroup.position.y = 0;
          if (paperMaterialRef.current) {
            paperMaterialRef.current.opacity = 1;
          }
        }
      }

      // Smooth mouse tilt parallax
      if (!shouldReduceMotion && meshGroupRef.current) {
        const tilt = mouseTiltRef.current;
        tilt.x += (tilt.targetX - tilt.x) * 0.08;
        tilt.y += (tilt.targetY - tilt.y) * 0.08;

        // Subtle idle rotation when scrunched to display full 3D crumpled ball
        const scrunchFactor = 1.0 - currentProgressRef.current;
        const idleSpinY = Math.sin(now * 0.001) * 0.12 * scrunchFactor;

        meshGroupRef.current.rotation.x = tilt.x;
        meshGroupRef.current.rotation.y = tilt.y + idleSpinY;
        meshGroupRef.current.rotation.z = entranceRotationZ;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // 7. Responsive Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera || isDisposed) return;
      const newWidth = container.clientWidth || 600;
      const newHeight = container.clientHeight || 600;
      camera.aspect = newWidth / newHeight;

      // Dynamically tune FOV so portrait always stays fully framed
      camera.fov = camera.aspect < 1 ? 44 : 36;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Lifecycle Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();

      // Dispose Three.js resources
      if (paperModelRef.current) {
        paperModelRef.current.geometry.dispose();
      }

      meshGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => {
                if (m.map) m.map.dispose();
                m.dispose();
              });
            } else {
              if (obj.material.map) obj.material.map.dispose();
              obj.material.dispose();
            }
          }
        }
      });

      renderer.dispose();
    };
  }, [imageSrc, shouldReduceMotion]);

  return (
    <div ref={containerRef} className="relative w-full h-full cursor-grab active:cursor-grabbing">
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
    </div>
  );
}

export default PaperScrunchScene;
