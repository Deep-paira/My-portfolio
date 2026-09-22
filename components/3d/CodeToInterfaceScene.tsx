"use client";

import * as React from "react";
import * as THREE from "three";

interface CodeToInterfaceSceneProps {
  shouldReduceMotion?: boolean;
}

export default function CodeToInterfaceScene({
  shouldReduceMotion = false,
}: CodeToInterfaceSceneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene & Perspective Camera (Anti-gravity wider FOV)
    const scene = new THREE.Scene();
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    // FOV dynamically adapts so the model never clips in the split-hero column
    const aspect = width / height;
    const fov = aspect < 1 ? 44 : 38;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 50);
    camera.position.set(0, 0, 5.8);

    // 2. WebGL Renderer with Local Clipping Enabled
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.localClippingEnabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 3. Anti-Gravity Dark Luxury Studio Lighting (Metallic Cyan + Terracotta)
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 0.85);
    scene.add(ambientLight);

    // Key Light: Warm Terracotta
    const keyLight = new THREE.DirectionalLight(0xe08865, 2.6);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    // Fill Light: Soft Warm Platinum
    const fillLight = new THREE.DirectionalLight(0xf5ebe1, 1.1);
    fillLight.position.set(-5, -3, 3);
    scene.add(fillLight);

    // Rim/Accent Light: Metallic Cyan (Anti-gravity sheen)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-2, 4, -4);
    scene.add(rimLight);

    // Deep Indigo Backlight
    const indigoLight = new THREE.DirectionalLight(0x312e81, 1.2);
    indigoLight.position.set(2, -4, -3);
    scene.add(indigoLight);

    // 4. Opposing Clipping Planes (Left = Wireframe Code, Right = Solid Interface)
    const clipPlaneSolid = new THREE.Plane(new THREE.Vector3(1, 0, 0), shouldReduceMotion ? 0 : 2.4);
    const clipPlaneWire = new THREE.Plane(new THREE.Vector3(-1, 0, 0), shouldReduceMotion ? 0 : -2.4);

    // 5. Crystalline Torus Knot Sculpture
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    const geometry = new THREE.TorusKnotGeometry(1.15, 0.35, 128, 28, 2, 3);

    // Right Half: Solid Tactile Form (Warm Terracotta Clay with Metallic Sheen)
    const solidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc4623f,
      roughness: 0.32,
      metalness: 0.12,
      clearcoat: 0.45,
      clearcoatRoughness: 0.15,
      clippingPlanes: [clipPlaneSolid],
      clipShadows: true,
    });
    const solidMesh = new THREE.Mesh(geometry, solidMaterial);
    sculptureGroup.add(solidMesh);

    // Left Half: Technical Wireframe Lattice (Cyan/Stone Code Structure)
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      clippingPlanes: [clipPlaneWire],
      transparent: true,
      opacity: 0.72,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMaterial);
    sculptureGroup.add(wireMesh);

    // Syntax Node Points
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.048,
      clippingPlanes: [clipPlaneWire],
    });
    const pointsMesh = new THREE.Points(geometry, pointsMaterial);
    sculptureGroup.add(pointsMesh);

    // Synthesis Boundary Ring (Cyan to Terracotta transition ring)
    const ringGeo = new THREE.RingGeometry(1.68, 1.74, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const boundaryRing = new THREE.Mesh(ringGeo, ringMat);
    boundaryRing.rotation.y = Math.PI / 2;
    sculptureGroup.add(boundaryRing);

    // 6. Mouse Tracking Inertia & Anti-Gravity Floating Physics
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = Math.max(-1, Math.min(1, x));
      targetMouseY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Animation Loop (Entrance Sweep + Inertia + Anti-gravity float)
    let animationFrameId: number;
    let isDisposed = false;
    let startTime: number | null = null;
    const sweepDuration = 1800;

    const animate = (timestamp: number) => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!shouldReduceMotion) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // Clipping plane entrance sweep
        if (elapsed < sweepDuration) {
          const progress = elapsed / sweepDuration;
          const ease = 1 - Math.pow(1 - progress, 4);
          const currentOffset = (1 - ease) * 2.4;
          clipPlaneSolid.constant = currentOffset;
          clipPlaneWire.constant = -currentOffset;
          boundaryRing.position.x = -currentOffset;
        } else {
          clipPlaneSolid.constant = 0;
          clipPlaneWire.constant = 0;
          boundaryRing.position.x = 0;
        }

        // Smooth mouse damping
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        const t = timestamp * 0.001;

        // Dual-axis rotation with mouse tracking inertia
        sculptureGroup.rotation.y += 0.003 + currentMouseX * 0.008;
        sculptureGroup.rotation.x = Math.sin(t * 0.45) * 0.12 - currentMouseY * 0.35;
        sculptureGroup.rotation.z = Math.cos(t * 0.35) * 0.08 + currentMouseX * 0.2;

        // Anti-gravity floating oscillations on Y & Z axes
        sculptureGroup.position.y = Math.sin(t * 1.15) * 0.11;
        sculptureGroup.position.z = Math.cos(t * 0.85) * 0.09;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 8. Responsive Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth || 800;
      const newH = container.clientHeight || 500;
      const newAspect = newW / newH;

      camera.aspect = newAspect;
      camera.fov = newAspect < 1 ? 48 : 38;
      camera.updateProjectionMatrix();

      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      geometry.dispose();
      solidMaterial.dispose();
      wireMaterial.dispose();
      pointsMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
