"use client";

import * as React from "react";
import * as THREE from "three";

// ==============================================================================
// 3D HERO CLAY SCULPTURE - PURE THREE.JS (ZERO RECONCILER DEPENDENCY)
// ==============================================================================
// Completely immune to React 19 / Turbopack / Next.js reconciler errors.
export const REPLAY_ON_SCROLL = false;

interface ClaySceneProps {
  replayOnScroll?: boolean;
}

// Analytical underdamped spring function for bouncy entrance with overshoot
function springProgress(t: number, omega: number = 8.5, zeta: number = 0.52): number {
  if (t <= 0) return 0;
  if (t >= 1.8) return 1;
  const omegaD = omega * Math.sqrt(Math.max(0, 1 - zeta * zeta));
  const decay = Math.exp(-zeta * omega * t);
  const val = 1 - decay * (Math.cos(omegaD * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(omegaD * t));
  return val;
}

export default function ClayScene({ replayOnScroll = REPLAY_ON_SCROLL }: ClaySceneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isVisibleRef = React.useRef(false);
  const startTimeRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 3. Studio Lighting (Warm Terracotta Editorial Palette)
    const ambientLight = new THREE.AmbientLight(0xfffbf7, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeada, 1.3);
    keyLight.position.set(5, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xefe6d8, 0.5);
    fillLight.position.set(-5, -2, -2);
    scene.add(fillLight);

    const bounceLight = new THREE.DirectionalLight(0xe08362, 0.6);
    bounceLight.position.set(0, -4, 2);
    scene.add(bounceLight);

    // 4. Primary Terracotta Sculpture Knot
    const sculptureGroup = new THREE.Group();
    sculptureGroup.position.set(0, 0.1, 0);
    scene.add(sculptureGroup);

    const knotGroup = new THREE.Group();
    sculptureGroup.add(knotGroup);

    const knotGeometry = new THREE.TorusKnotGeometry(1.05, 0.36, 128, 32, 2, 3);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0xc4623f, // Terracotta burnt clay
      roughness: 0.88,
      metalness: 0.04,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    knotMesh.castShadow = true;
    knotMesh.receiveShadow = true;
    knotGroup.add(knotMesh);

    // 5. Satellite 1: Soft Linen Cream Pebble (stagger +140ms)
    const sat1Group = new THREE.Group();
    sculptureGroup.add(sat1Group);
    const sat1Geometry = new THREE.SphereGeometry(1, 32, 32);
    const sat1Material = new THREE.MeshStandardMaterial({
      color: 0xeae1d3, // Soft warm linen cream
      roughness: 0.92,
      metalness: 0.02,
    });
    const sat1Mesh = new THREE.Mesh(sat1Geometry, sat1Material);
    sat1Mesh.scale.setScalar(0.34);
    sat1Mesh.castShadow = true;
    sat1Group.add(sat1Mesh);

    // 6. Satellite 2: Warm Ochre Pebble (stagger +260ms)
    const sat2Group = new THREE.Group();
    sculptureGroup.add(sat2Group);
    const sat2Geometry = new THREE.SphereGeometry(1, 32, 32);
    const sat2Material = new THREE.MeshStandardMaterial({
      color: 0xd97754, // Warm ochre clay
      roughness: 0.86,
      metalness: 0.04,
    });
    const sat2Mesh = new THREE.Mesh(sat2Geometry, sat2Material);
    sat2Mesh.scale.setScalar(0.22);
    sat2Mesh.castShadow = true;
    sat2Group.add(sat2Mesh);

    // 7. Satellite 3: Deep Umber Bead (stagger +380ms)
    const sat3Group = new THREE.Group();
    sculptureGroup.add(sat3Group);
    const sat3Geometry = new THREE.SphereGeometry(1, 24, 24);
    const sat3Material = new THREE.MeshStandardMaterial({
      color: 0xb05433, // Deep terracotta umber
      roughness: 0.9,
      metalness: 0.02,
    });
    const sat3Mesh = new THREE.Mesh(sat3Geometry, sat3Material);
    sat3Mesh.scale.setScalar(0.14);
    sat3Mesh.castShadow = true;
    sat3Group.add(sat3Mesh);

    // Initial zero scale before spring pop
    knotGroup.scale.set(0, 0, 0);
    sat1Group.scale.set(0, 0, 0);
    sat2Group.scale.set(0, 0, 0);
    sat3Group.scale.set(0, 0, 0);

    // Mouse / Pointer Tilt Interaction
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = y * 0.3;
      targetTiltY = x * 0.4;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        knotGroup.rotation.y += deltaX * 0.01;
        knotGroup.rotation.x += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseup", handlePointerUp);
    container.addEventListener("mousedown", handlePointerDown);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width || 400;
        const h = entry.contentRect.height || 500;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Intersection Observer to trigger spring entrance
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isVisibleRef.current || replayOnScroll) {
            isVisibleRef.current = true;
            startTimeRef.current = performance.now();
          }
        } else if (replayOnScroll) {
          isVisibleRef.current = false;
          startTimeRef.current = null;
          knotGroup.scale.set(0, 0, 0);
          sat1Group.scale.set(0, 0, 0);
          sat2Group.scale.set(0, 0, 0);
          sat3Group.scale.set(0, 0, 0);
        }
      },
      { threshold: 0.15 }
    );
    intersectionObserver.observe(container);

    // Animation Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Spring Entrance Animation
      if (startTimeRef.current !== null) {
        const elapsedSec = (performance.now() - startTimeRef.current) / 1000;

        // 1. Main Sculpture Knot Pop (elastic bounce)
        const mainP = springProgress(elapsedSec, 8.5, 0.52);
        knotGroup.scale.setScalar(mainP);

        // 2. Satellite 1 (+140ms stagger)
        const sat1P = springProgress(elapsedSec - 0.14, 9.0, 0.5);
        sat1Group.scale.setScalar(sat1P);

        // 3. Satellite 2 (+260ms stagger)
        const sat2P = springProgress(elapsedSec - 0.26, 9.5, 0.48);
        sat2Group.scale.setScalar(sat2P);

        // 4. Satellite 3 (+380ms stagger)
        const sat3P = springProgress(elapsedSec - 0.38, 10.0, 0.46);
        sat3Group.scale.setScalar(sat3P);
      }

      // Smooth Tilt Lerp
      currentTiltX = THREE.MathUtils.lerp(currentTiltX, targetTiltX, 0.05);
      currentTiltY = THREE.MathUtils.lerp(currentTiltY, targetTiltY, 0.05);

      // Continuous Idle Rotations & Orbits
      if (!isDragging) {
        knotGroup.rotation.y += delta * 0.18;
        knotGroup.rotation.x = Math.sin(elapsedTime * 0.6) * 0.08 + currentTiltX;
        knotGroup.rotation.z = -currentTiltY * 0.6;
      }

      // Satellite 1: Orbit
      const orbitSpeed = elapsedTime * 0.45;
      sat1Group.position.x = Math.cos(orbitSpeed) * 1.8;
      sat1Group.position.z = Math.sin(orbitSpeed) * 1.8;
      sat1Group.position.y = Math.sin(elapsedTime * 1.2) * 0.35 - 0.25;
      sat1Group.rotation.y += delta * 0.25;

      // Satellite 2: Vertical bob
      sat2Group.position.set(-1.35, 0.85 + Math.sin(elapsedTime * 0.8 + 1.2) * 0.15, -0.2);
      sat2Group.rotation.x += delta * 0.15;
      sat2Group.rotation.z += delta * 0.2;

      // Satellite 3: Floating bead
      sat3Group.position.set(1.15, 1.15 + Math.sin(elapsedTime * 1.1 + 2.4) * 0.12, -0.4);
      sat3Group.rotation.y += delta * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      container.removeEventListener("mousedown", handlePointerDown);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      // Clean GPU memory
      knotGeometry.dispose();
      knotMaterial.dispose();
      sat1Geometry.dispose();
      sat1Material.dispose();
      sat2Geometry.dispose();
      sat2Material.dispose();
      sat3Geometry.dispose();
      sat3Material.dispose();
      renderer.dispose();
    };
  }, [replayOnScroll]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] sm:h-[500px] lg:h-[560px] flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
      />
    </div>
  );
}
