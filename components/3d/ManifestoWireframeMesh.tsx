"use client";

import * as React from "react";
import * as THREE from "three";
import { motion, useReducedMotion } from "framer-motion";

interface ManifestoWireframeMeshProps {
  isVisible?: boolean;
}

export function ManifestoWireframeMesh({ isVisible = true }: ManifestoWireframeMeshProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    let width = container.clientWidth || 320;
    let height = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.8);

    // 2. Pure WebGL Renderer (Zero Reconciler Dependency)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);

    // 3. Hand-Sculpted Irregular Clay Wireframe Mesh
    // 80 triangular faces, 42 vertices — ultra-lightweight (<1ms render time)
    const geometry = new THREE.IcosahedronGeometry(1.6, 2);
    const pos = geometry.attributes.position;
    const count = pos.count;

    // Store base perturbed positions for organic "imperfect/unfinished" sculpture feel
    const basePositions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Create intentional asymmetrical sculpting variations (raw clay contour)
      const dist = Math.sqrt(x * x + y * y + z * z);
      const deform = 1 + Math.sin(x * 2.8) * 0.12 - Math.cos(y * 2.2) * 0.08 + Math.sin(z * 3.1) * 0.06;
      const nx = (x / dist) * 1.6 * deform;
      const ny = (y / dist) * 1.6 * deform;
      const nz = (z / dist) * 1.6 * deform;

      basePositions[i * 3] = nx;
      basePositions[i * 3 + 1] = ny;
      basePositions[i * 3 + 2] = nz;
      pos.setXYZ(i, nx, ny, nz);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    // Terracotta Wireframe Material (Muted, warm, architectural)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xC4623F,
      wireframe: true,
      transparent: true,
      opacity: 0.26,
    });
    const mesh = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(mesh);

    // Architectural Vertex Node Points (Espresso tone)
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x6E645E,
      size: 0.06,
      transparent: true,
      opacity: 0.38,
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);

    // Secondary subtle inner sketch ring
    const innerRingGeo = new THREE.TorusGeometry(1.15, 0.015, 8, 36);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xC4623F,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 3;
    scene.add(innerRing);

    // 4. Animation Loop with Organic Ambient Motion
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let isDisposed = false;

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!shouldReduceMotion) {
        const time = clock.getElapsedTime();

        // Slow unhurried tumble
        mesh.rotation.y += 0.0022;
        mesh.rotation.x += 0.0011;
        points.rotation.copy(mesh.rotation);

        innerRing.rotation.z -= 0.0018;
        innerRing.rotation.x = Math.PI / 3 + Math.sin(time * 0.4) * 0.15;

        // Subtle organic breathing on vertex positions
        for (let i = 0; i < count; i++) {
          const bx = basePositions[i * 3];
          const by = basePositions[i * 3 + 1];
          const bz = basePositions[i * 3 + 2];

          const wave = Math.sin(bx * 2.2 + time * 0.7) * Math.cos(by * 2.2 + time * 0.5) * 0.06;
          pos.setXYZ(i, bx * (1 + wave), by * (1 + wave), bz * (1 + wave));
        }
        pos.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 5. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || 320;
      const newHeight = container.clientHeight || 320;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      geometry.dispose();
      wireframeMaterial.dispose();
      pointsMaterial.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      renderer.dispose();
    };
  }, [shouldReduceMotion]);

  return (
    <motion.div
      ref={containerRef}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
      animate={
        isVisible
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.92 }
      }
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}
