"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useScroll, useReducedMotion } from "framer-motion";
import { HandsFrameScrubber } from "./HandsFrameScrubber";

interface ReachingHandsSectionProps {
  onHandsTouch?: () => void;
}

// Lazy-loaded procedural 3D hands fallback (rendered when video frames are pending)
const ReachingHandsScene = dynamic(() => import("../3d/ReachingHandsScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-[var(--primary)]/10 blur-3xl animate-pulse" />
    </div>
  ),
});

export function ReachingHandsSection({ onHandsTouch }: ReachingHandsSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = React.useState(shouldReduceMotion ? 1 : 0);
  const [hasReached, setHasReached] = React.useState(Boolean(shouldReduceMotion));

  // Probes video frames first, automatically falling back to 3D procedural hands if frames are not found
  const [use3DFallback, setUse3DFallback] = React.useState(false);

  // Expanded 300vh scroll range for unhurried, cinematic pacing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setScrollProgress(1);
      setHasReached(true);
      onHandsTouch?.();
      return;
    }

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Easing curve: Math.pow(latest, 1.35) for a natural, accelerating approach
      const eased = Math.pow(latest, 1.35);
      setScrollProgress(eased);

      if (eased >= 0.86 && !hasReached) {
        setHasReached(true);
        onHandsTouch?.();
      } else if (eased < 0.75 && hasReached) {
        setHasReached(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, shouldReduceMotion, hasReached, onHandsTouch]);

  const handleTouchTrigger = React.useCallback(() => {
    setHasReached(true);
    onHandsTouch?.();
  }, [onHandsTouch]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[var(--background)] border-b border-[var(--outline-variant)]"
      id="reaching-hands"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 md:px-12 lg:px-20 py-10 sm:py-14 select-none">
        
        {/* Editorial Header Plate */}
        <div className="relative z-10 flex items-center justify-between mx-auto w-full max-w-6xl">
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[var(--on-surface-variant)] uppercase">
            <span className="text-[var(--primary)] font-semibold">03.5</span>
            <span className="text-[var(--outline-variant)]">—</span>
            <span className="tracking-[0.2em]">KINETIC INTERACTION</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest text-[var(--on-surface-variant)] uppercase">
            <span>[ SCROLL TO BRIDGING POINT // 300VH STAGE ]</span>
          </div>
        </div>

        {/* Center Stage: Video Frame Scrubber OR Procedural 3D Fallback */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-[85vh]">
            
            {/*
              ==========================================================================
              VIDEO FRAME SCRUBBING ENGINE (APPLE PRODUCT STYLE)
              Place 60-90 frames in /public/hands-sequence/ (frame_001.jpg, frame_002.jpg...)
              The component probes frame_001.jpg: if found, it scrubs video frames on canvas.
              If not found yet, it seamlessly falls back to the 3D procedural hands below.
              ==========================================================================
            */}
            {!use3DFallback ? (
              <HandsFrameScrubber
                progress={scrollProgress}
                frameCount={90}
                framePathPrefix="/hands-sequence/frame_"
                frameExtension=".jpg"
                onTouch={handleTouchTrigger}
                onFallbackNeeded={() => setUse3DFallback(true)}
              />
            ) : (
              <ReachingHandsScene
                progress={scrollProgress}
                shouldReduceMotion={Boolean(shouldReduceMotion)}
                onTouch={handleTouchTrigger}
              />
            )}

            {/* Ambient Contact Pulse Glow behind contact center */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--primary)]/20 blur-3xl pointer-events-none transition-opacity duration-500 ${
                hasReached ? "opacity-100 scale-125" : "opacity-0 scale-50"
              }`}
            />
          </div>
        </div>

        {/* Poetic Editorial Footer Indicator */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between mx-auto w-full max-w-6xl gap-3">
          <p className="font-serif italic text-base sm:text-lg text-[var(--on-surface-variant)] font-light text-center sm:text-left">
            Where engineering precision meets human intent.
          </p>

          {/* Interactive Touch Status Indicator */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[var(--surface-container-low)]/80 border border-[var(--outline-variant)]/60 text-xs font-mono text-[var(--on-surface-variant)]">
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                hasReached ? "bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]" : "bg-[var(--outline-variant)]"
              }`}
            />
            <span className="text-[10px] tracking-wider uppercase">
              {hasReached ? "CONTACT ESTABLISHED // MANIFESTO ACTIVATED" : "APPROACHING CONTACT"}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
