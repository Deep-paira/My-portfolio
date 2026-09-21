"use client";

import * as React from "react";
import * as THREE from "three";

// ==============================================================================
// ABOUT 3D GEOMETRIC SHAPES - PURE THREE.JS (ZERO RECONCILER DEPENDENCY)
// ==============================================================================
// Completely immune to React 19 / Turbopack / Next.js reconciler errors.
export const STAGGER_INTERVAL_MS = 140;

function springProgress(t: number, omega: number = 9.0, zeta: number = 0.54): number {
  if (t <= 0) return 0;
  if (t >= 1.6) return 1;
  const omegaD = omega * Math.sqrt(Math.max(0, 1 - zeta * zeta));
  const decay = Math.exp(-zeta * omega * t);
  return 1 - decay * (Math.cos(omegaD * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(omegaD * t));
}

export default function AboutGeometricScene() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 700;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 50);
    camera.position.set(0, 0, 7.5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);

    // 3. Studio Lights
    const ambientLight = new THREE.AmbientLight(0xfffbf7, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeada, 1.4);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xefe6d8, 0.5);
    fillLight.position.set(-5, -3, -2);
    scene.add(fillLight);

    const bounceLight = new THREE.DirectionalLight(0xe08362, 0.6);
    bounceLight.position.set(0, -4, 2);
    scene.add(bounceLight);

    // 4. Five Geometric Primitives in Warm Clay Palette
    const group = new THREE.Group();
    scene.add(group);

    // 1. Torus (Terracotta #C4623F)
    const torusGeom = new THREE.TorusGeometry(0.5, 0.16, 28, 48);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xc4623f,
      roughness: 0.86,
      metalness: 0.04,
    });
    const torus = new THREE.Mesh(torusGeom, torusMat);
    torus.rotation.set(0.6, 0.4, 0.2);
    group.add(torus);

    // 2. Sphere (Soft Linen Cream #EAE1D3)
    const sphereGeom = new THREE.SphereGeometry(0.42, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xeae1d3,
      roughness: 0.92,
      metalness: 0.02,
    });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    group.add(sphere);

    // 3. Cube (Warm Ochre #D97754)
    const cubeGeom = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0xd97754,
      roughness: 0.85,
      metalness: 0.04,
    });
    const cube = new THREE.Mesh(cubeGeom, cubeMat);
    cube.rotation.set(0.5, 0.7, 0.3);
    group.add(cube);

    // 4. Cone (Deep Umber #3A302A)
    const coneGeom = new THREE.ConeGeometry(0.36, 0.72, 32);
    const coneMat = new THREE.MeshStandardMaterial({
      color: 0x3a302a,
      roughness: 0.9,
      metalness: 0.02,
    });
    const cone = new THREE.Mesh(coneGeom, coneMat);
    cone.rotation.set(-0.4, 0.2, 0.5);
    group.add(cone);

    // 5. Cylinder / Disc (Terracotta Clay #E08362)
    const cylGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.16, 32);
    const cylMat = new THREE.MeshStandardMaterial({
      color: 0xe08362,
      roughness: 0.88,
      metalness: 0.03,
    });
    const cylinder = new THREE.Mesh(cylGeom, cylMat);
    cylinder.rotation.set(1.1, 0.3, 0.5);
    group.add(cylinder);

    // Initial scale 0
    torus.scale.set(0, 0, 0);
    sphere.scale.set(0, 0, 0);
    cube.scale.set(0, 0, 0);
    cone.scale.set(0, 0, 0);
    cylinder.scale.set(0, 0, 0);

    // Function to update viewport-relative positions
    const updatePositions = (w: number, h: number) => {
      const vFov = (camera.fov * Math.PI) / 180;
      const visibleH = 2 * Math.tan(vFov / 2) * camera.position.z;
      const visibleW = visibleH * (w / h);

      const responsiveScale = Math.max(0.48, Math.min(0.8, visibleW / 13));

      // Calculate safe proportional positions
      torus.position.set(
        Math.min(visibleW * 0.36, 4.2),
        Math.min(visibleH * 0.36, 2.6),
        0.2
      );
      sphere.position.set(
        Math.max(-visibleW * 0.38, -4.2),
        Math.min(visibleH * 0.35, 2.5),
        0.1
      );
      cube.position.set(
        Math.max(-visibleW * 0.32, -3.6),
        Math.max(-visibleH * 0.14, -1.2),
        0.4
      );
      cone.position.set(
        Math.min(visibleW * 0.36, 4.0),
        Math.max(-visibleH * 0.32, -2.4),
        0.3
      );
      cylinder.position.set(
        Math.min(visibleW * 0.42, 4.8),
        Math.max(-visibleH * 0.05, -0.4),
        -0.2
      );

      return responsiveScale;
    };

    let targetScale = updatePositions(width, height);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width || 800;
        height = entry.contentRect.height || 700;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        targetScale = updatePositions(width, height);
      }
    });
    resizeObserver.observe(container);

    const startTime = performance.now();
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const t = clock.getElapsedTime();
      const elapsedSec = (performance.now() - startTime) / 1000;

      // Spring entrance scaling
      const torusS = springProgress(elapsedSec, 9.0, 0.54) * targetScale * 0.72;
      const sphereS = springProgress(elapsedSec - 0.14, 9.0, 0.54) * targetScale * 0.65;
      const cubeS = springProgress(elapsedSec - 0.28, 9.0, 0.54) * targetScale * 0.68;
      const coneS = springProgress(elapsedSec - 0.42, 9.0, 0.54) * targetScale * 0.70;
      const cylS = springProgress(elapsedSec - 0.56, 9.0, 0.54) * targetScale * 0.58;

      torus.scale.setScalar(torusS);
      sphere.scale.setScalar(sphereS);
      cube.scale.setScalar(cubeS);
      cone.scale.setScalar(coneS);
      cylinder.scale.setScalar(cylS);

      // Infinite Looping Motion
      torus.rotation.x += delta * 0.22;
      torus.rotation.y += delta * 0.3;

      sphere.position.y += Math.sin(t * 1.05 + 0.4) * 0.002;
      sphere.position.x += Math.cos(t * 0.75) * 0.001;

      cube.rotation.x += delta * 0.16;
      cube.rotation.z += delta * 0.2;

      cone.rotation.y += delta * 0.28;

      cylinder.rotation.x += delta * 0.18;
      cylinder.rotation.y += delta * 0.22;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      torusGeom.dispose();
      torusMat.dispose();
      sphereGeom.dispose();
      sphereMat.dispose();
      cubeGeom.dispose();
      cubeMat.dispose();
      coneGeom.dispose();
      coneMat.dispose();
      cylGeom.dispose();
      cylMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
