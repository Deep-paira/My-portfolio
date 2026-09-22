"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ManifestoWireframeMesh } from "../3d/ManifestoWireframeMesh";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

// Spring physics configuration for tactile, physical pop-up animation
const POP_SPRING = {
  type: "spring",
  stiffness: 240,
  damping: 14,
  mass: 0.65,
} as const;

const TENETS = [
  {
    number: "01",
    title: "Editorial Hierarchy",
    description:
      "Typography, structure, and unhurried whitespace establish immediate understanding before decorative styling ever begins.",
  },
  {
    number: "02",
    title: "Quiet Restraint",
    description:
      "Motion should clarify spatial state, not distract. Every animation has an intentional physical easing and settles into clarity.",
  },
  {
    number: "03",
    title: "Systematic Integrity",
    description:
      "Scalable tokens and clean component architectures that bridge the gap between Figma craft and production code.",
  },
];

interface PopWordProps {
  children: React.ReactNode;
  delay: number;
  isVisible: boolean;
  shouldReduceMotion?: boolean | null;
  className?: string;
}

function PopWord({
  children,
  delay,
  isVisible,
  shouldReduceMotion,
  className = "",
}: PopWordProps) {
  return (
    <motion.span
      className={`inline-block mr-[0.26em] cursor-default select-text ${className}`}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.72,
              y: 28,
            }
      }
      animate={
        isVisible
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
            }
          : {
              opacity: 0,
              scale: 0.72,
              y: 28,
            }
      }
      transition={{
        ...POP_SPRING,
        delay: shouldReduceMotion ? 0 : delay,
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.1,
              y: -3.5,
              transition: { type: "spring", stiffness: 450, damping: 14 },
            }
      }
    >
      {children}
    </motion.span>
  );
}

interface PhilosophySectionProps {
  activatedByHands?: boolean;
}

export function PhilosophySection({ activatedByHands = false }: PhilosophySectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Section-level intersection observer ensures unclipped reliable triggering
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  // Activated EITHER by hands touching, OR by standard viewport intersection (failsafe), OR reduced motion
  const isVisible = shouldReduceMotion || isInView || activatedByHands;

  // Exact manifesto words parsed into rhythmic stanzas with pop-up stagger delays
  const stanza1 = ["Great", "software", "is", "not", "the", "pursuit", "of", "novelty,"];
  
  const stanza2Lead = ["but", "the"];
  const stanza2Accent = ["patient", "removal", "of", "friction."];

  const stanza3Line1 = ["Like", "shaping", "raw", "clay,", "every", "contour,", "token,", "and", "transition"];
  const stanza3Line2Lead = ["must", "feel", "deliberate,", "human,", "and"];
  const stanza3Line2Accent = ["grounded", "in", "clarity."];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 md:py-44 px-6 md:px-12 lg:px-20 border-b border-[var(--outline-variant)] bg-[var(--background)] min-h-[500px] overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl relative z-10">
        
        {/* Editorial Section Index with Animated Hairline Accent */}
        <div className="flex flex-col gap-4 mb-16 md:mb-20">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.25em] text-[var(--on-surface-variant)] uppercase">
            <span className="text-[var(--primary)] font-semibold text-sm sm:text-base">04</span>
            <span className="text-[var(--outline-variant)]">—</span>
            <span className="tracking-[0.2em]">DESIGN &amp; ENGINEERING MANIFESTO</span>
          </div>

          {/* Animated Hairline that draws in from left to right */}
          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, ease: LUXURY_EASE }}
            className="w-full max-w-sm h-[1.5px] bg-gradient-to-r from-[var(--primary)] via-[var(--primary)]/50 to-transparent origin-left"
          />
        </div>

        {/* Main Composition: Refined Editorial Typography (Left) + Organic 3D Sketch Mesh (Right) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14 mb-20 md:mb-28">
          
          {/* Asymmetrical Editorial Text Block with Staggered Spring Pop-Up Animation */}
          <div className="w-full lg:max-w-3xl flex flex-col space-y-6 sm:space-y-8 font-serif text-[1.65rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.15rem] leading-[1.3] tracking-[-0.01em] text-[var(--on-background)] font-normal">
            
            {/* Stanza 1: Opening premise */}
            <div className="pl-0 py-1 overflow-visible">
              {stanza1.map((word, i) => (
                <PopWord
                  key={word + i}
                  delay={0.1 + i * 0.035}
                  isVisible={isVisible}
                  shouldReduceMotion={shouldReduceMotion}
                >
                  {word}
                </PopWord>
              ))}
            </div>

            {/* Stanza 2: The turning insight (Asymmetric indent + Terracotta Italic Accent) */}
            <div className="pl-5 sm:pl-10 md:pl-14 py-1 overflow-visible">
              {stanza2Lead.map((word, i) => (
                <PopWord
                  key={word + i}
                  delay={0.42 + i * 0.035}
                  isVisible={isVisible}
                  shouldReduceMotion={shouldReduceMotion}
                >
                  {word}
                </PopWord>
              ))}
              {stanza2Accent.map((word, i) => (
                <PopWord
                  key={word + i}
                  delay={0.49 + i * 0.04}
                  isVisible={isVisible}
                  shouldReduceMotion={shouldReduceMotion}
                  className="text-[var(--primary)] italic font-light hover:text-[var(--primary-container)]"
                >
                  {word}
                </PopWord>
              ))}
            </div>

            {/* Stanza 3: Tactile synthesis (Subtle indent + Grounded in clarity underline) */}
            <div className="pl-2 sm:pl-5 md:pl-7 py-1 overflow-visible flex flex-col gap-1.5 sm:gap-2">
              <div>
                {stanza3Line1.map((word, i) => (
                  <PopWord
                    key={word + i}
                    delay={0.68 + i * 0.032}
                    isVisible={isVisible}
                    shouldReduceMotion={shouldReduceMotion}
                  >
                    {word}
                  </PopWord>
                ))}
              </div>

              <div className="text-[0.88em] text-[var(--on-surface-variant)] font-light leading-snug">
                {stanza3Line2Lead.map((word, i) => (
                  <PopWord
                    key={word + i}
                    delay={0.98 + i * 0.032}
                    isVisible={isVisible}
                    shouldReduceMotion={shouldReduceMotion}
                  >
                    {word}
                  </PopWord>
                ))}
                {stanza3Line2Accent.map((word, i) => (
                  <PopWord
                    key={word + i}
                    delay={1.14 + i * 0.038}
                    isVisible={isVisible}
                    shouldReduceMotion={shouldReduceMotion}
                    className="text-[var(--on-background)] font-normal underline decoration-[var(--primary)]/40 underline-offset-6 decoration-1 hover:text-[var(--primary)]"
                  >
                    {word}
                  </PopWord>
                ))}
              </div>
            </div>

          </div>

          {/* Organic Three.js Wireframe Clay Mesh (Option B) - Sits in Negative Space */}
          <div className="flex-shrink-0 self-center lg:self-auto -my-4 lg:my-0">
            <ManifestoWireframeMesh isVisible={isVisible} />
          </div>

        </div>

        {/* Three Editorial Tenets */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 1.3, ease: LUXURY_EASE }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-12 border-t border-[var(--outline-variant)]/60"
        >
          {TENETS.map((tenet) => (
            <motion.div
              key={tenet.number}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -4, transition: { duration: 0.25, ease: "easeOut" } }
              }
              className="group p-8 rounded-[18px] bg-[var(--surface-container-low)]/50 border border-[var(--outline-variant)]/60 hover:border-[var(--primary)]/40 hover:bg-[var(--surface-container-low)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 flex flex-col gap-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--primary)] font-semibold tracking-wider">
                  TENET {tenet.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h4 className="font-serif text-xl sm:text-2xl text-[var(--on-background)] font-normal transition-colors group-hover:text-[var(--primary)]">
                {tenet.title}
              </h4>

              <p className="font-sans text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
                {tenet.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
