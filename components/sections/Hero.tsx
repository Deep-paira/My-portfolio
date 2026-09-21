"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { ClayHeroScene } from "../3d/ClayHeroScene";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] lg:min-h-screen w-full items-center justify-center overflow-hidden px-6 md:px-12 lg:px-20 py-16 lg:py-24 border-b border-[var(--outline-variant)]">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Editorial Typography & Action */}
          <div className="lg:col-span-7 flex flex-col items-start gap-8 z-10">
            {/* Hand-crafted Editorial Index Number */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[var(--on-surface-variant)] uppercase"
            >
              <span className="text-[var(--primary)] font-medium">01</span>
              <span className="text-[var(--outline-variant)]">—</span>
              <span>FULL-STACK DEVELOPER // FRONTEND-LEANING</span>
            </motion.div>

            {/* Unhurried Editorial Headline */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="font-serif text-[3.25rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.2rem] leading-[0.95] tracking-[-0.02em] text-[var(--on-background)] font-normal"
              >
                Crafting <br />
                <span className="italic font-serif text-[var(--primary)] font-light">tactile</span> <br />
                digital experiences.
              </motion.h1>
            </div>

            {/* Thoughtful, Human Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="font-sans text-base sm:text-lg text-[var(--on-surface-variant)] max-w-lg leading-relaxed"
            >
              Deep Paira is a full-stack developer (frontend-leaning) building modern,
              high-performance web applications using React, Next.js, Tailwind CSS, Framer Motion,
              and Django. Focused on clean UI, fluid animation, accessibility, and reliable backend systems.
            </motion.p>

            {/* Curated CTA Pair & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col gap-5 pt-2"
            >
              <div className="flex flex-wrap items-center gap-6">
                {/* Primary Terracotta CTA */}
                <a
                  href="#selected-work"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-[10px] bg-[var(--primary)] text-[#FAF6F0] font-sans text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[var(--primary-container)] hover:shadow-[0_4px_16px_rgba(196,98,63,0.25)] group"
                >
                  Explore Selected Work
                  <ArrowDownRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </a>

                {/* Secondary Hairline Text Link */}
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm font-sans font-medium text-[var(--on-background)] hover:text-[var(--primary)] transition-colors gap-2 group"
                >
                  <span>Get in touch</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Social Links Row */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://github.com/Deep-paira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] border border-[var(--outline-variant)]/60 bg-[var(--surface-container-low)]/40 text-xs font-mono text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 hover:bg-[var(--surface-container-low)] transition-all"
                  aria-label="Deep Paira on GitHub"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/deep-paira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] border border-[var(--outline-variant)]/60 bg-[var(--surface-container-low)]/40 text-xs font-mono text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 hover:bg-[var(--surface-container-low)] transition-all"
                  aria-label="Deep Paira on LinkedIn"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>

            {/* Archival Metadata Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-2 gap-8 pt-8 mt-2 border-t border-[var(--outline-variant)]/70 w-full max-w-md text-xs font-mono tracking-widest text-[var(--on-surface-variant)]"
            >
              <div>
                <span className="block text-[10px] opacity-60 uppercase mb-1">ROLE</span>
                <span className="text-[var(--on-background)]">FULL-STACK // REACT &amp; DJANGO</span>
              </div>
              <div>
                <span className="block text-[10px] opacity-60 uppercase mb-1">STATUS</span>
                <span className="text-[var(--primary)]">OPEN TO INTERNSHIPS &amp; JUNIOR ROLES</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Custom 3D Clay Sculpture Studio Composition */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Architectural Crosshair Coordinates */}
            <span className="absolute top-2 left-2 font-mono text-[10px] text-[var(--on-surface-variant)]/50 select-none">
              +
            </span>
            <span className="absolute top-2 right-2 font-mono text-[10px] text-[var(--on-surface-variant)]/50 select-none">
              +
            </span>
            <span className="absolute bottom-2 left-2 font-mono text-[10px] text-[var(--on-surface-variant)]/50 select-none">
              +
            </span>
            <span className="absolute bottom-2 right-2 font-mono text-[10px] text-[var(--on-surface-variant)]/50 select-none">
              +
            </span>

            {/* Custom 3D Clay Scene (Untouched) */}
            <div className="w-full relative">
              <ClayHeroScene />
            </div>

            {/* Editorial Caption Plate */}
            <div className="w-full flex items-center justify-between pt-4 border-t border-[var(--outline-variant)]/50 text-[11px] font-mono tracking-wider text-[var(--on-surface-variant)]">
              <span>FIG. 01 — ORGANIC CLAY SCULPTURE</span>
              <span className="hidden sm:inline opacity-70">[ DRAG / SCROLL TO ROTATE ]</span>
            </div>

            {/* Integrated Designer Portrait Pill (Quiet Human Presence) */}
            <div className="mt-6 flex items-center gap-3 self-start px-3.5 py-2 rounded-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/70">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/50">
                <Image
                  src="/deep.jpeg"
                  alt="Deep Paira"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-sans font-medium text-[var(--on-background)] leading-tight">
                  Deep Paira
                </span>
                <span className="text-[10px] font-mono text-[var(--on-surface-variant)] uppercase tracking-wider">
                  India // Open to Roles
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
