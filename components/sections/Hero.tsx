"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { ShinyText } from "../ui/ShinyText";
import { WarmParticlesBackground } from "../ui/WarmParticlesBackground";
import { MagneticButton } from "../ui/MagneticButton";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden px-6 md:px-12 lg:px-20 py-16 sm:py-20 lg:py-24 border-b border-[var(--outline-variant)] bg-[var(--background)]">
      
      {/* 1. Subtle React Bits Atmospheric Particles (Warm Palette: Terracotta / Espresso) */}
      <WarmParticlesBackground particleCount={36} />

      {/* 2. Main Editorial Hero Composition */}
      <div className="mx-auto w-full max-w-7xl flex-1 flex flex-col justify-center my-auto z-10">
        <div className="flex flex-col items-start gap-8 sm:gap-10 max-w-5xl">
          
          {/* React Bits Animated Brand Mark: "DELTA" Kinetic Text Sweep */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[var(--surface-container-low)]/80 border border-[var(--outline-variant)]/70 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--on-surface-variant)] font-semibold">
              <ShinyText text="DELTA" speed={4.5} className="font-mono font-bold tracking-[0.25em]" />
            </span>
            <span className="text-[var(--outline-variant)] font-mono text-xs">—</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--on-surface-variant)]">
              DEEP PAIRA // FULL-STACK
            </span>
          </motion.div>

          {/* Bold Left-Aligned Editorial Headline */}
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: LUXURY_EASE }}
            className="font-serif text-[3.25rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.4rem] leading-[0.96] tracking-[-0.025em] text-[var(--on-background)] font-normal text-left"
          >
            Architecting scalable code, <br />
            <span className="italic font-serif text-[var(--primary)] font-light">
              crafting tactile
            </span>{" "}
            interfaces.
          </motion.h1>

          {/* Short, Confident Supporting Bio Line */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: LUXURY_EASE }}
            className="font-sans text-base sm:text-lg md:text-xl text-[var(--on-surface-variant)] max-w-2xl leading-relaxed text-left font-normal"
          >
            Deep Paira builds modern, high-performance web applications using React, Next.js,
            and Django — bridging clean design systems, fluid motion craft, and reliable backend engineering.
          </motion.p>

          {/* Restrained CTA Pair (Magnetic Button + Contact) + Social Links */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5, ease: LUXURY_EASE }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2 w-full sm:w-auto"
          >
            {/* Primary Terracotta Magnetic CTA Button */}
            <MagneticButton
              variant="primary"
              href="#selected-work"
              className="h-12 px-8 rounded-full text-xs font-mono font-semibold tracking-wider transition-transform duration-300"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDownRight className="ml-2 h-4 w-4" />
            </MagneticButton>

            {/* Secondary Clean Contact Link */}
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-sans font-medium text-[var(--on-background)] hover:text-[var(--primary)] transition-colors gap-2 group py-2"
            >
              <span>Get in touch</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Subtle Social Links */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:ml-4 border-t sm:border-t-0 sm:border-l border-[var(--outline-variant)] sm:pl-4">
              <a
                href="https://github.com/Deep-paira"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[var(--surface-container-low)]/60 border border-[var(--outline-variant)]/60 text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/deep-paira"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[var(--surface-container-low)]/60 border border-[var(--outline-variant)]/60 text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 3. Archival Metadata Strip Anchoring the Base */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.65 }}
        className="mx-auto w-full max-w-7xl pt-8 mt-12 border-t border-[var(--outline-variant)]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono tracking-widest text-[var(--on-surface-variant)]"
      >
        <div className="flex items-center gap-6 sm:gap-10">
          <div>
            <span className="block text-[10px] opacity-60 uppercase mb-0.5">DISCIPLINE</span>
            <span className="text-[var(--on-background)] font-medium">FULL-STACK // FRONTEND-LEANING</span>
          </div>
          <div>
            <span className="block text-[10px] opacity-60 uppercase mb-0.5">STACK</span>
            <span className="text-[var(--on-background)] font-medium">REACT • NEXT.JS • DJANGO</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[var(--primary)] font-medium text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>OPEN TO INTERNSHIPS &amp; JUNIOR ROLES</span>
        </div>
      </motion.div>

    </section>
  );
}
