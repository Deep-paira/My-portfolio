"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

// Lazy-load the 3D scene (SSR disabled)
const CodeToInterfaceScene = dynamic(() => import("../3d/CodeToInterfaceScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-[var(--primary)]/10 blur-2xl animate-pulse" />
    </div>
  ),
});

export function TopHeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-between items-center px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 pb-12 bg-[var(--background)] border-b border-[var(--outline-variant)] select-none">
      
      {/* 1. Subtle Editorial Top Badge */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
        className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[var(--on-surface-variant)] uppercase"
      >
        <span className="text-[var(--primary)] font-semibold">00</span>
        <span className="text-[var(--outline-variant)]">—</span>
        <span>THE CODE &amp; INTERFACE DUALITY</span>
      </motion.div>

      {/* 2. Main Centered Composition: Headline + Centered 3D Morphing Model */}
      <div className="w-full max-w-5xl flex flex-col items-center text-center my-auto py-6">
        
        {/* Large Confident Centered Headline */}
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: LUXURY_EASE }}
          className="font-serif text-[2.75rem] sm:text-[3.85rem] md:text-[4.75rem] lg:text-[5.5rem] leading-[1.02] tracking-[-0.025em] text-[var(--on-background)] font-normal max-w-4xl"
        >
          Architecting scalable code, <br />
          <span className="italic font-serif text-[var(--primary)] font-light">
            crafting tactile
          </span>{" "}
          interfaces.
        </motion.h1>

        {/* Centered 3D Sculptural Canvas (Code Becoming Interface) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: LUXURY_EASE }}
          className="relative w-[320px] sm:w-[400px] md:w-[460px] aspect-square flex items-center justify-center my-2 sm:my-4"
        >
          <CodeToInterfaceScene shouldReduceMotion={Boolean(shouldReduceMotion)} />

          {/* Contact Grounding Glow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 sm:w-60 h-6 bg-[var(--primary)]/15 rounded-full blur-xl pointer-events-none" />
        </motion.div>

        {/* Subtle Supporting Caption Explaining the 3D Synthesis */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-4 text-xs font-mono tracking-widest text-[var(--on-surface-variant)] uppercase mt-1"
        >
          <span className="text-[var(--primary)]">[ WIREFRAME LATTICE // CODE ]</span>
          <span className="text-[var(--outline-variant)]">→</span>
          <span className="text-[var(--on-background)]">[ SOLID CLAY // INTERFACE ]</span>
        </motion.div>

      </div>

      {/* 3. Bottom Scroll Prompt Anchoring into Section 01 */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[var(--on-surface-variant)] uppercase opacity-70 hover:opacity-100 transition-opacity"
      >
        <span>CONTINUE TO DELTA DISCIPLINE</span>
        <ArrowDown className="w-3.5 h-3.5 text-[var(--primary)] animate-bounce" />
      </motion.div>

    </section>
  );
}
