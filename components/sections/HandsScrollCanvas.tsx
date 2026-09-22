"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useScroll, useReducedMotion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

interface HandsScrollCanvasProps {
  onReachComplete?: () => void;
  frameCount?: number;
  framePathPrefix?: string;
  frameExtension?: string;
}

// Procedural 3D hands fallback if image frames are not yet uploaded
const ReachingHandsScene = dynamic(
  () => import("../3d/ReachingHandsScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-[#38BDF8]/10 blur-3xl animate-pulse" />
      </div>
    ),
  }
);

/**
 * HandsScrollCanvas
 * High-performance HTML5 2D Canvas scroll-scrubbed hands sequence.
 * Calibrated with a compact h-[165vh] runway, zero dead scroll tracks,
 * normalized vertical padding, and a direct visual bridge into Core Capabilities.
 */
export function HandsScrollCanvas({
  onReachComplete,
  frameCount = 90,
  framePathPrefix = "/hands-sequence/frame_",
  frameExtension = ".jpg",
}: HandsScrollCanvasProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [useFallback3D, setUseFallback3D] = React.useState(false);
  const [framesLoaded, setFramesLoaded] = React.useState(false);
  const [isReached, setIsReached] = React.useState(Boolean(shouldReduceMotion));

  const imagesRef = React.useRef<HTMLImageElement[]>([]);
  const hasTriggeredRef = React.useRef(false);

  // Calibrated h-[165vh] scroll runway to eliminate dead whitespace and excessive pinning
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Helper for 3-digit frame URLs
  const getFrameUrl = React.useCallback(
    (idx: number) => {
      const padded = String(idx + 1).padStart(3, "0");
      return `${framePathPrefix}${padded}${frameExtension}`;
    },
    [framePathPrefix, frameExtension]
  );

  // Probe and preload image sequence
  React.useEffect(() => {
    if (shouldReduceMotion) return;

    let isCancelled = false;
    const probe = new Image();
    probe.src = getFrameUrl(0);

    probe.onload = () => {
      if (isCancelled) return;
      const loaded: HTMLImageElement[] = [];
      let count = 0;

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          count++;
          if (count >= Math.min(10, frameCount)) {
            setFramesLoaded(true);
          }
        };
        loaded.push(img);
      }
      imagesRef.current = loaded;
    };

    probe.onerror = () => {
      if (isCancelled) return;
      // Seamlessly fall back to 3D procedural hands if video frames are missing
      setUseFallback3D(true);
    };

    return () => {
      isCancelled = true;
    };
  }, [frameCount, getFrameUrl, shouldReduceMotion]);

  // Canvas draw loop synced to scroll progress via rAF
  React.useEffect(() => {
    if (useFallback3D || !framesLoaded || shouldReduceMotion) return;

    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      const stage = stageRef.current;
      const images = imagesRef.current;

      if (!canvas || !stage || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Responsive canvas buffer sizing (CLS = 0, no re-allocations on scroll)
      const targetW = stage.clientWidth;
      const targetH = stage.clientHeight;
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Eased progress: finishes right as scroll finishes
      const currentScroll = scrollYProgress.get();
      const eased = Math.pow(Math.max(0, Math.min(1, currentScroll)), 1.25);

      const frameIdx = Math.min(
        images.length - 1,
        Math.max(0, Math.floor(eased * (images.length - 1)))
      );

      const img = images[frameIdx];

      if (img && img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, w, h);

        // object-fit: contain logic across all viewports
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;

        let drawW = w;
        let drawH = h;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawW = h * imgRatio;
          offsetX = (w - drawW) / 2;
        } else {
          drawH = w / imgRatio;
          offsetY = (h - drawH) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      }

      // Contact threshold trigger (calibrated for smooth hand clasp)
      if (eased >= 0.85) {
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setIsReached(true);
          onReachComplete?.();
        }
      } else if (eased < 0.72) {
        hasTriggeredRef.current = false;
        setIsReached(false);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [useFallback3D, framesLoaded, shouldReduceMotion, scrollYProgress, onReachComplete]);

  // Track scroll state for fallback 3D hands
  const [fallbackProgress, setFallbackProgress] = React.useState(0);
  React.useEffect(() => {
    if (!useFallback3D || shouldReduceMotion) return;

    const unsub = scrollYProgress.on("change", (latest) => {
      const eased = Math.pow(latest, 1.25);
      setFallbackProgress(eased);
      if (eased >= 0.85 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setIsReached(true);
        onReachComplete?.();
      } else if (eased < 0.72 && hasTriggeredRef.current) {
        hasTriggeredRef.current = false;
        setIsReached(false);
      }
    });

    return () => unsub();
  }, [useFallback3D, shouldReduceMotion, scrollYProgress, onReachComplete]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[135vh] bg-[var(--background)] border-b border-[var(--outline-variant)] pt-4 pb-12"
      id="hands-lead-in"
    >
      {/* Sticky Full-Viewport Stage with Compact Spacing (pb-8 pt-4 lg:pb-12) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 md:px-12 lg:px-20 pt-4 pb-8 lg:pb-12 select-none pointer-events-none">
        
        {/* Editorial Section Header */}
        <div className="relative z-10 flex items-center justify-between mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[var(--on-surface-variant)] uppercase">
            <span className="text-[#38BDF8] font-semibold">02.5</span>
            <span className="text-[var(--outline-variant)]">—</span>
            <span>KINETIC CONVERGENCE</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest text-[var(--on-surface-variant)] uppercase">
            <span>[ CALIBRATED 140VH TRACK // ZERO DEAD SPACE ]</span>
          </div>
        </div>

        {/* Center Stage: High-Fidelity Canvas Scrubber OR 3D Fallback */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            ref={stageRef}
            className="relative w-full max-w-5xl h-[72vh] sm:h-[76vh] flex items-center justify-center"
          >
            {!useFallback3D ? (
              <canvas
                ref={canvasRef}
                className="w-full h-full block object-contain"
                aria-label="Scroll-scrubbed hands animation"
              />
            ) : (
              <ReachingHandsScene
                progress={shouldReduceMotion ? 1 : fallbackProgress}
                shouldReduceMotion={Boolean(shouldReduceMotion)}
                onTouch={onReachComplete}
              />
            )}

            {/* Glowing Anti-Gravity Contact Halo */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-[#38BDF8]/20 to-[var(--primary)]/20 blur-3xl transition-all duration-500 pointer-events-none ${
                isReached ? "opacity-100 scale-125" : "opacity-0 scale-50"
              }`}
            />
          </div>
        </div>

        {/* Bottom Lead-in into Core Compatibility */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between mx-auto w-full max-w-7xl gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <p className="font-serif italic text-xs sm:text-sm text-[var(--on-surface-variant)] font-light">
              Bridging engineering precision with tactile human interaction.
            </p>
          </div>

          {/* Interactive Bridge Indicator */}
          <a
            href="#core-capabilities"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-container-low)]/80 border border-[var(--outline-variant)] text-xs font-mono text-[var(--on-surface-variant)] hover:text-[#38BDF8] hover:border-[#38BDF8]/50 transition-colors pointer-events-auto"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isReached
                  ? "bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]"
                  : "bg-[var(--outline-variant)]"
              }`}
            />
            <span className="text-[10px] tracking-wider uppercase">
              {isReached ? "CONVERGED // ENTER CAPABILITIES" : "SCROLL TO CONVERGE"}
            </span>
            <ArrowDown className="w-3 h-3 text-[#38BDF8] animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
}

export default HandsScrollCanvas;
