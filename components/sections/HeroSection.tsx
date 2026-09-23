"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Sparkles, Terminal, Layers } from "lucide-react";
import { MaskedHeading } from "../ui/MaskedHeading";
import { BlurText } from "../ui/BlurText";
import { ThreeDTextReveal } from "../ui/ThreeDTextReveal";
import { MagneticButton } from "../ui/MagneticButton";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

// Lazy-load the hand-tracked low-poly paper scrunch portrait (SSR disabled, CLS = 0)
const PaperScrunchHeroWrapper = dynamic(
  () => import("../3d/PaperScrunchHeroWrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="w-48 h-48 rounded-full bg-[#06B6D4]/10 blur-3xl animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--on-surface-variant)]/70">
          Synthesizing paper facets...
        </span>
      </div>
    ),
  }
);

/**
 * HeroSection (Split-Grid Asymmetrical Layout)
 * Left column (lg:col-span-7): Refined headline, MaskedHeading, BlurText, ThreeDTextReveal, CTAs.
 * Right column (lg:col-span-5): Anchored 3D canvas viewport (top-right hero alignment).
 */
export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 pb-12 sm:pb-16 bg-[var(--background)] border-b border-[var(--outline-variant)] select-none">
      
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12 my-auto">
        
        {/* Left Column: Typography, React Bits Animations & Value Propositions (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 sm:gap-7 z-10">
          
          {/* Top Editorial Tagline */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[var(--surface-container-low)]/80 border border-[var(--outline-variant)]/80 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-[var(--on-surface-variant)]">
              ANTI-GRAVITY // DESIGN &amp; CODE SYNTHESIS
            </span>
            <span className="text-[var(--outline-variant)] font-mono text-xs">—</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--primary)] font-medium">
              DEEP PAIRA
            </span>
          </motion.div>

          {/* Scaled-down Refined Headline (editorial poise, no crowding) */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[var(--on-background)] leading-[1.15] max-w-2xl">
            Architecting scalable systems,{" "}
            <br className="hidden sm:inline" />
            <span className="inline-block mt-1 sm:mt-0">
              crafting{" "}
              <MaskedHeading
                as="span"
                gradient="linear-gradient(115deg, #1E1B4B 0%, #312E81 20%, #0284C7 45%, #38BDF8 65%, #67E8F9 85%, #312E81 100%)"
                className="font-serif italic font-normal tracking-normal pr-1"
              >
                tactile interfaces.
              </MaskedHeading>
            </span>
          </h1>

          {/* React Bits BlurText: Supporting Lead Copy */}
          <div className="max-w-xl text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed font-sans font-normal">
            <BlurText
              text="Bridging resilient software architecture, fluid motion craft, and systematic component design into weightless, human-grounded digital experiences."
              delay={0.03}
              animateBy="words"
              direction="bottom"
            />
          </div>

          {/* React Bits Pro 3D-Text-Reveal: Key Value Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl pt-1">
            <ThreeDTextReveal delay={0.15} rotationX={-65}>
              <div className="p-3 rounded-xl bg-[var(--surface-container-low)]/70 border border-[var(--outline-variant)]/60 flex items-center gap-2.5">
                <Terminal className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                <div>
                  <span className="block text-[9px] font-mono tracking-widest uppercase text-[var(--on-surface-variant)]/70">
                    ARCHITECTURE
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[var(--on-background)] tracking-wide">
                    Next.js &amp; Django
                  </span>
                </div>
              </div>
            </ThreeDTextReveal>

            <ThreeDTextReveal delay={0.25} rotationX={-65}>
              <div className="p-3 rounded-xl bg-[var(--surface-container-low)]/70 border border-[var(--outline-variant)]/60 flex items-center gap-2.5">
                <Layers className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                <div>
                  <span className="block text-[9px] font-mono tracking-widest uppercase text-[var(--on-surface-variant)]/70">
                    SYSTEMS
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[var(--on-background)] tracking-wide">
                    Tokens &amp; Tailwind
                  </span>
                </div>
              </div>
            </ThreeDTextReveal>

            <ThreeDTextReveal delay={0.35} rotationX={-65}>
              <div className="p-3 rounded-xl bg-[var(--surface-container-low)]/70 border border-[var(--outline-variant)]/60 flex items-center gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <div>
                  <span className="block text-[9px] font-mono tracking-widest uppercase text-[var(--on-surface-variant)]/70">
                    MOTION
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[var(--on-background)] tracking-wide">
                    Three.js &amp; Framer
                  </span>
                </div>
              </div>
            </ThreeDTextReveal>
          </div>

          {/* CTA Pair + Social Icons */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: LUXURY_EASE }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2"
          >
            <MagneticButton
              variant="primary"
              href="#selected-work"
              className="h-11 px-7 rounded-full text-xs font-mono font-semibold tracking-wider transition-transform duration-300"
            >
              <span>EXPLORE WORK</span>
              <ArrowDownRight className="ml-2 h-4 w-4" />
            </MagneticButton>

            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-sans font-medium text-[var(--on-background)] hover:text-[var(--primary)] transition-colors gap-2 group py-2"
            >
              <span>Let&#39;s build together</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:ml-4 border-t sm:border-t-0 sm:border-l border-[var(--outline-variant)] sm:pl-4">
              <a
                href="https://github.com/Deep-paira"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[var(--surface-container-low)]/70 border border-[var(--outline-variant)]/60 text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/deep-paira"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[var(--surface-container-low)]/70 border border-[var(--outline-variant)]/60 text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Top-Right 3D Model Viewport (lg:col-span-5) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: LUXURY_EASE }}
          className="lg:col-span-5 justify-self-end w-full h-[480px] lg:h-[620px] relative flex items-center justify-center"
        >
          {/* Subtle Ambient Radial Backlighting */}
          <div className="absolute inset-0 bg-radial from-[#38BDF8]/10 via-transparent to-transparent pointer-events-none rounded-3xl" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 sm:w-60 h-10 bg-[var(--primary)]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Hand-Tracked Low-Poly Paper Scrunch Canvas */}
          <div className="relative w-full h-full">
            <PaperScrunchHeroWrapper shouldReduceMotion={Boolean(shouldReduceMotion)} />
          </div>
        </motion.div>

      </div>

    </section>
  );
}

export default HeroSection;
