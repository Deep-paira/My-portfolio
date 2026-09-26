"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

// Lazy-load the 3D scene (SSR disabled) with lightweight skeleton to ensure CLS = 0
const PaperScrunchHeroWrapper = dynamic(
  () => import("../3d/PaperScrunchHeroWrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-[#06B6D4]/10 blur-3xl animate-pulse" />
      </div>
    ),
  }
);

/**
 * ModelSection
 * Widened 3D viewport giving the interactive paper model horizontal dominance (w-full max-w-7xl / w-[92vw]),
 * featuring smooth mouse tracking inertia, dual-axis float, and zero layout shift.
 */
export function ModelSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-8 sm:py-12 px-4 sm:px-6 md:px-12 bg-[var(--background)] border-b border-[var(--outline-variant)] select-none overflow-hidden">
      
      {/* 1. Subtle Section Header Plate */}
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between mb-4 sm:mb-6 text-xs font-mono tracking-[0.2em] text-[var(--on-surface-variant)] uppercase">
        <div className="flex items-center gap-3">
          <span className="text-[#06B6D4] font-semibold">01</span>
          <span className="text-[var(--outline-variant)]">—</span>
          <span>3D PERSPECTIVE VIEWPORT</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[10px] text-[var(--on-surface-variant)]/70">
          <span>[ 3D PERSPECTIVE VIEWPORT // INTERACTIVE INERTIA ]</span>
        </div>
      </div>

      {/* 2. Widened Model Canvas Viewport (w-full max-w-7xl / w-[92vw] mx-auto) */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.0, ease: LUXURY_EASE }}
        className="relative w-full max-w-7xl lg:w-[92vw] mx-auto h-[420px] sm:h-[520px] md:h-[600px] lg:h-[650px] rounded-3xl bg-[var(--surface-container-low)]/40 border border-[var(--outline-variant)]/60 shadow-inner flex items-center justify-center overflow-hidden"
      >
        {/* Subtle Ambient Backlighting */}
        <div className="absolute inset-0 bg-radial from-[#06B6D4]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-24 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full h-full">
          <PaperScrunchHeroWrapper shouldReduceMotion={Boolean(shouldReduceMotion)} />
        </div>

        {/* Corner HUD Coordinates */}
        <div className="absolute top-4 left-6 font-mono text-[10px] text-[var(--on-surface-variant)]/60 tracking-widest hidden sm:block">
          POS: [0, 0, 5.6] // ROT: DUAL-AXIS INERTIA
        </div>
        <div className="absolute bottom-4 right-6 font-mono text-[10px] text-[var(--primary)] tracking-widest hidden sm:block">
          CLIPPING: 50% WIREFRAME // 50% TACTILE CLAY
        </div>
      </motion.div>

    </section>
  );
}

export default ModelSection;
