"use client";

import * as React from "react";
import * as THREE from "three";

interface ReachingHandsSceneProps {
  progress: number; // 0.0 (wide apart) to 1.0 (fingertips touching)
  shouldReduceMotion?: boolean;
  onTouch?: () => void;
}

// Procedural stylized hand generator using basic Three.js primitives
function createStylizedHand(isRight: boolean, material: THREE.Material): THREE.Group {
  const hand = new THREE.Group();

  // Helper functions for segments
  const makeSegment = (radius: number, length: number) => {
    const geo = new THREE.CylinderGeometry(radius * 0.88, radius, length, 16);
    geo.translate(0, length / 2, 0);
    return new THREE.Mesh(geo, material);
  };
  const makeJoint = (radius: number) =>
    new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 16), material);

  // 1. Forearm / Wrist
  const forearmGeo = new THREE.CylinderGeometry(0.28, 0.44, 2.4, 20);
  forearmGeo.translate(0, -1.2, 0);
  const forearm = new THREE.Mesh(forearmGeo, material);
  hand.add(forearm);

  // 2. Wrist Joint Sphere
  const wristJoint = new THREE.Mesh(new THREE.SphereGeometry(0.34, 20, 20), material);
  hand.add(wristJoint);

  // 3. Palm (Rounded, tapered box)
  const palmGeo = new THREE.BoxGeometry(0.9, 1.1, 0.34);
  palmGeo.translate(0, 0.58, 0);
  const palm = new THREE.Mesh(palmGeo, material);
  hand.add(palm);

  // 4. Index Finger (Extended protagonist reaching finger)
  const indexGroup = new THREE.Group();
  indexGroup.position.set(isRight ? -0.28 : 0.28, 1.12, 0);
  indexGroup.rotation.z = isRight ? 0.06 : -0.06;

  const i1 = makeSegment(0.11, 0.65);
  indexGroup.add(makeJoint(0.11));
  indexGroup.add(i1);

  const i2Group = new THREE.Group();
  i2Group.position.set(0, 0.65, 0);
  i2Group.rotation.x = -0.06;
  const i2 = makeSegment(0.095, 0.54);
  i2Group.add(makeJoint(0.095));
  i2Group.add(i2);

  const i3Group = new THREE.Group();
  i3Group.position.set(0, 0.54, 0);
  i3Group.rotation.x = -0.04;
  const i3 = makeSegment(0.082, 0.46);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.086, 16, 16), material);
  tip.position.set(0, 0.46, 0);
  i3Group.add(makeJoint(0.082));
  i3Group.add(i3);
  i3Group.add(tip);

  i2Group.add(i3Group);
  indexGroup.add(i2Group);
  hand.add(indexGroup);

  // 5. Middle Finger (Curled softly back)
  const midGroup = new THREE.Group();
  midGroup.position.set(0, 1.14, 0);
  midGroup.rotation.x = -0.32;
  midGroup.add(makeJoint(0.115));
  midGroup.add(makeSegment(0.115, 0.68));

  const m2Group = new THREE.Group();
  m2Group.position.set(0, 0.68, 0);
  m2Group.rotation.x = -0.36;
  m2Group.add(makeJoint(0.10));
  m2Group.add(makeSegment(0.10, 0.56));

  const m3Group = new THREE.Group();
  m3Group.position.set(0, 0.56, 0);
  m3Group.rotation.x = -0.28;
  const mTip = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), material);
  mTip.position.set(0, 0.46, 0);
  m3Group.add(makeJoint(0.085));
  m3Group.add(makeSegment(0.085, 0.46));
  m3Group.add(mTip);

  m2Group.add(m3Group);
  midGroup.add(m2Group);
  hand.add(midGroup);

  // 6. Ring Finger (More curled)
  const ringGroup = new THREE.Group();
  ringGroup.position.set(isRight ? 0.27 : -0.27, 1.08, 0);
  ringGroup.rotation.x = -0.52;
  ringGroup.add(makeJoint(0.105));
  ringGroup.add(makeSegment(0.105, 0.62));

  const r2Group = new THREE.Group();
  r2Group.position.set(0, 0.62, 0);
  r2Group.rotation.x = -0.42;
  r2Group.add(makeJoint(0.09));
  r2Group.add(makeSegment(0.09, 0.50));

  const r3Group = new THREE.Group();
  r3Group.position.set(0, 0.50, 0);
  r3Group.rotation.x = -0.35;
  const rTip = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), material);
  rTip.position.set(0, 0.42, 0);
  r3Group.add(makeJoint(0.08));
  r3Group.add(makeSegment(0.08, 0.42));
  r3Group.add(rTip);

  r2Group.add(r3Group);
  ringGroup.add(r2Group);
  hand.add(ringGroup);

  // 7. Pinky Finger (Curled deepest)
  const pinkyGroup = new THREE.Group();
  pinkyGroup.position.set(isRight ? 0.49 : -0.49, 0.96, 0);
  pinkyGroup.rotation.x = -0.72;
  pinkyGroup.add(makeJoint(0.09));
  pinkyGroup.add(makeSegment(0.09, 0.52));

  const p2Group = new THREE.Group();
  p2Group.position.set(0, 0.52, 0);
  p2Group.rotation.x = -0.52;
  p2Group.add(makeJoint(0.08));
  p2Group.add(makeSegment(0.08, 0.42));

  const p3Group = new THREE.Group();
  p3Group.position.set(0, 0.42, 0);
  p3Group.rotation.x = -0.42;
  const pTip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), material);
  pTip.position.set(0, 0.36, 0);
  p3Group.add(makeJoint(0.07));
  p3Group.add(makeSegment(0.07, 0.36));
  p3Group.add(pTip);

  p2Group.add(p3Group);
  pinkyGroup.add(p2Group);
  hand.add(pinkyGroup);

  // 8. Thumb (Angled outwards & gracefully curved)
  const thumbGroup = new THREE.Group();
  thumbGroup.position.set(isRight ? -0.48 : 0.48, 0.38, 0.1);
  thumbGroup.rotation.z = isRight ? 0.72 : -0.72;
  thumbGroup.rotation.x = -0.25;
  thumbGroup.add(makeJoint(0.12));
  thumbGroup.add(makeSegment(0.12, 0.50));

  const t2Group = new THREE.Group();
  t2Group.position.set(0, 0.50, 0);
  t2Group.rotation.x = -0.40;
  const tTip = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 16), material);
  tTip.position.set(0, 0.45, 0);
  t2Group.add(makeJoint(0.10));
  t2Group.add(makeSegment(0.10, 0.45));
  t2Group.add(tTip);

  thumbGroup.add(t2Group);
  hand.add(thumbGroup);

  return hand;
}

export default function ReachingHandsScene({
  progress = 0,
  shouldReduceMotion = false,
  onTouch,
}: ReachingHandsSceneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const progressRef = React.useRef(progress);
  const hasTriggeredTouch = React.useRef(false);

  // Keep progressRef updated with zero re-mounts
  React.useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0, 7.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // 3. Warm Studio Lighting (Evoking soft-gradient 3D wallpaper art style)
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 0.95);
    scene.add(ambientLight);

    // Key Light (Warm Terracotta from top-right)
    const keyLight = new THREE.DirectionalLight(0xe08865, 2.2);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    // Fill Light (Soft Warm Linen from bottom-left)
    const fillLight = new THREE.DirectionalLight(0xf2e8dc, 1.4);
    fillLight.position.set(-5, -4, 3);
    scene.add(fillLight);

    // Subtle Rim Light (Espresso)
    const rimLight = new THREE.DirectionalLight(0x756860, 1.1);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    // Contact Glow Light (At fingertip convergence point [0, 0, 0])
    const contactLight = new THREE.PointLight(0xffa07a, 0, 5);
    contactLight.position.set(0, 0, 0.2);
    scene.add(contactLight);

    // Contact Glow Ring (Soft expanding aura on touch)
    const ringGeo = new THREE.RingGeometry(0.04, 0.25, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc4623f,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const contactRing = new THREE.Mesh(ringGeo, ringMat);
    scene.add(contactRing);

    // 4. Matte Clay/Ceramic Material (Soft warm terracotta-cream tone)
    const handMaterial = new THREE.MeshStandardMaterial({
      color: 0xdec8b8, // Warm natural clay tone
      roughness: 0.82, // Soft matte finish, no harsh reflections
      metalness: 0.02,
    });

    // 5. Build Two Hands
    // Hand 1 (Lower-Left Reaching Up-Right)
    const handLeft = createStylizedHand(true, handMaterial);
    // Base rotation: pointing ~55° up-right towards center
    handLeft.rotation.set(0.15, 0.1, -Math.PI / 3.4);
    scene.add(handLeft);

    // Hand 2 (Upper-Right Reaching Down-Left)
    const handRight = createStylizedHand(false, handMaterial);
    // Base rotation: pointing ~235° down-left towards center
    handRight.rotation.set(-0.15, -0.1, Math.PI - Math.PI / 3.4);
    scene.add(handRight);

    // 6. Smooth Animation & Scroll Interpolation Loop
    let animationFrameId: number;
    let isDisposed = false;
    let currentP = shouldReduceMotion ? 1.0 : progressRef.current;

    const animate = (timestamp: number) => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      // Target progress from scroll
      const targetP = shouldReduceMotion ? 1.0 : Math.max(0, Math.min(1, progressRef.current));
      // Smooth dampening
      currentP += (targetP - currentP) * 0.1;

      // Coordinate mapping:
      // Start (p=0): hands far apart off the edges
      // End (p=1): fingertips meet exactly at [0, 0, 0]
      const reachFactor = currentP;

      // Hand Left diagonal vector
      const leftStartX = -4.5;
      const leftStartY = -2.8;
      const leftEndX = -1.55;
      const leftEndY = -0.98;

      handLeft.position.x = leftStartX + (leftEndX - leftStartX) * reachFactor;
      handLeft.position.y = leftStartY + (leftEndY - leftStartY) * reachFactor;

      // Hand Right diagonal vector
      const rightStartX = 4.5;
      const rightStartY = 2.8;
      const rightEndX = 1.55;
      const rightEndY = 0.98;

      handRight.position.x = rightStartX + (rightEndX - rightStartX) * reachFactor;
      handRight.position.y = rightStartY + (rightEndY - rightStartY) * reachFactor;

      // Subtle levitation breath on both hands
      const t = timestamp * 0.001;
      const floatOffset = Math.sin(t * 1.2) * 0.04 * (1 - reachFactor * 0.5);
      handLeft.position.y += floatOffset;
      handRight.position.y -= floatOffset;

      // Contact Threshold Logic (Touch at ~0.88 - 1.0)
      if (reachFactor >= 0.88) {
        const contactStrength = (reachFactor - 0.88) / 0.12;
        contactLight.intensity = contactStrength * 3.8;
        ringMat.opacity = contactStrength * 0.45;
        contactRing.scale.setScalar(1 + contactStrength * 1.2);

        if (!hasTriggeredTouch.current) {
          hasTriggeredTouch.current = true;
          onTouch?.();
        }
      } else {
        contactLight.intensity = 0;
        ringMat.opacity = 0;
        contactRing.scale.setScalar(0.01);
        if (reachFactor < 0.75) {
          hasTriggeredTouch.current = false;
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 7. Responsive Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      handMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [shouldReduceMotion, onTouch]);

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
