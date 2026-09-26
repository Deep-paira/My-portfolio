"use client";

import * as React from "react";
import { skillCategories } from "@/data/skills";
import { Badge } from "../ui/Badge";
import Image from "next/image";
import Link from "next/link";
import { About3DDecor } from "../3d/About3DDecor";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { motion, useReducedMotion } from "framer-motion";
import { ResumeDownloadBlock } from "./ResumeDownloadBlock";
import { AboutScrollBlur } from "./AboutScrollBlur";

const EDITORIAL_EASE = [0.23, 1, 0.32, 1] as const;

export function AboutContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-24 min-h-[750px]">
      {/* Background Decor Layer - Clipped to prevent scrollbars while leaving section unclipped for sticky children */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* 1. Subtle 3D Geometric Background Decor (Untouched) */}
        <About3DDecor />

      {/* 2. Low-Opacity Atmospheric 2D Geometric Watermarks (8-15% Opacity) (Untouched) */}
      {/* Shape A: Top-Right Thin Outlined Triangle with Inner Ring */}
      <div className="absolute top-10 right-6 sm:right-16 lg:right-28 pointer-events-none select-none z-0 opacity-[0.11]">
        <motion.svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          fill="none"
          animate={
            shouldReduceMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="text-[var(--primary)]"
          aria-hidden="true"
        >
          <polygon
            points="44,8 80,72 8,72"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="50" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="44" cy="50" r="2.5" fill="currentColor" />
        </motion.svg>
      </div>

      {/* Shape B: Left-Side Behind Portrait Rotated Square Frame with Crosshair */}
      <div className="absolute top-28 left-4 sm:left-10 lg:left-16 pointer-events-none select-none z-0 opacity-[0.10]">
        <motion.svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -10, 0] }
          }
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#6E645E]"
          aria-hidden="true"
        >
          <rect
            x="48"
            y="8"
            width="56"
            height="56"
            transform="rotate(45 48 8)"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <line x1="48" y1="20" x2="48" y2="76" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="20" y1="48" x2="76" y2="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </motion.svg>
      </div>

      {/* Shape C: Mid-Right Beside Pull-Quote Concentric Dual Ring */}
      <div className="absolute top-[48%] right-4 sm:right-12 lg:right-20 pointer-events-none select-none z-0 opacity-[0.12]">
        <motion.svg
          width="112"
          height="112"
          viewBox="0 0 112 112"
          fill="none"
          animate={
            shouldReduceMotion
              ? undefined
              : { rotate: -360 }
          }
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="text-[var(--primary)]"
          aria-hidden="true"
        >
          <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="56" cy="56" r="34" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 4" />
          <line x1="56" y1="4" x2="56" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="56" y1="100" x2="56" y2="108" stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1="56" x2="12" y2="56" stroke="currentColor" strokeWidth="1.5" />
          <line x1="100" y1="56" x2="108" y2="56" stroke="currentColor" strokeWidth="1.5" />
        </motion.svg>
      </div>

      {/* Shape D: Bottom-Left Architectural 3x3 Dot Matrix Cluster */}
      <div className="absolute bottom-20 left-8 sm:left-14 lg:left-24 pointer-events-none select-none z-0 opacity-[0.12]">
        <svg
          width="76"
          height="76"
          viewBox="0 0 76 76"
          fill="none"
          className="text-[var(--primary)]"
          aria-hidden="true"
        >
          <circle cx="18" cy="18" r="2" fill="currentColor" />
          <circle cx="38" cy="18" r="2" fill="currentColor" />
          <circle cx="58" cy="18" r="2" fill="currentColor" />
          <circle cx="18" cy="38" r="2" fill="currentColor" />
          <circle cx="38" cy="38" r="2" fill="currentColor" />
          <circle cx="58" cy="38" r="2" fill="currentColor" />
          <circle cx="18" cy="58" r="2" fill="currentColor" />
          <circle cx="38" cy="58" r="2" fill="currentColor" />
          <circle cx="58" cy="58" r="2" fill="currentColor" />
          <path d="M10 22V10H22M54 10H66V22M10 54V66H22M54 66H66V54" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Shape E: Upper-Right Technical Diagonal Hash / Measurement Ruler Accent */}
      <div className="absolute top-[22%] right-6 sm:right-14 lg:right-24 pointer-events-none select-none z-0 opacity-[0.10]">
        <svg
          width="104"
          height="104"
          viewBox="0 0 104 104"
          fill="none"
          className="text-[#6E645E]"
          aria-hidden="true"
        >
          <line x1="16" y1="88" x2="88" y2="16" stroke="currentColor" strokeWidth="1.2" />
          <line x1="28" y1="72" x2="36" y2="80" stroke="currentColor" strokeWidth="1" />
          <line x1="42" y1="58" x2="52" y2="68" stroke="currentColor" strokeWidth="1.4" />
          <line x1="56" y1="44" x2="64" y2="52" stroke="currentColor" strokeWidth="1" />
          <line x1="70" y1="30" x2="80" y2="40" stroke="currentColor" strokeWidth="1.4" />
          <text x="76" y="20" fill="currentColor" fontSize="8" fontFamily="monospace" letterSpacing="0.1em">45°</text>
        </svg>
      </div>

      {/* Shape F: Right-Side Segmented Astrolabe Coordinate Gauge */}
      <div className="absolute top-[68%] right-6 sm:right-12 lg:right-20 pointer-events-none select-none z-0 opacity-[0.11]">
        <motion.svg
          width="118"
          height="118"
          viewBox="0 0 118 118"
          fill="none"
          animate={
            shouldReduceMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
          className="text-[var(--primary)]"
          aria-hidden="true"
        >
          <path
            d="M59 14 A45 45 0 1 1 14 59"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="59" cy="59" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="59" y1="51" x2="59" y2="67" stroke="currentColor" strokeWidth="1" />
          <line x1="51" y1="59" x2="67" y2="59" stroke="currentColor" strokeWidth="1" />
          <line x1="59" y1="8" x2="59" y2="14" stroke="currentColor" strokeWidth="1.5" />
          <line x1="104" y1="59" x2="110" y2="59" stroke="currentColor" strokeWidth="1.5" />
          <line x1="59" y1="104" x2="59" y2="110" stroke="currentColor" strokeWidth="1.5" />
        </motion.svg>
      </div>

      {/* Shape G: Bottom-Right Scattered Constellation / Micro-Stippling Cluster */}
      <div className="absolute bottom-12 right-8 sm:right-16 lg:right-28 pointer-events-none select-none z-0 opacity-[0.12]">
        <svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          fill="none"
          className="text-[var(--primary)]"
          aria-hidden="true"
        >
          <line x1="18" y1="28" x2="48" y2="18" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
          <line x1="48" y1="18" x2="72" y2="44" stroke="currentColor" strokeWidth="0.8" />
          <line x1="72" y1="44" x2="38" y2="66" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
          <line x1="38" y1="66" x2="18" y2="28" stroke="currentColor" strokeWidth="0.8" />
          <line x1="48" y1="18" x2="38" y2="66" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="18" cy="28" r="2.5" fill="currentColor" />
          <circle cx="48" cy="18" r="3.2" fill="currentColor" />
          <circle cx="72" cy="44" r="2" fill="currentColor" />
          <circle cx="38" cy="66" r="3" fill="currentColor" />
          <circle cx="56" cy="74" r="1.5" fill="currentColor" />
        </svg>
      </div>
      </div>

      {/* 3. Main Content Layer */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] flex flex-col gap-16 md:gap-24 lg:gap-28">
        
        {/* ===================================================================== */}
        {/* Top Area: Layered Architectural Portrait & Editorial Profile Intro     */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column - Layered Architectural Portrait & Quick Links */}
          <div className="lg:col-span-5 w-full flex flex-col gap-8">
            
            {/* Portrait Container with Offset Architectural Depth Frame */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.95, y: 25 }
              }
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.85, ease: EDITORIAL_EASE }}
              className="group relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0"
            >
              {/* Soft Dark Neutral Gradient Backlight behind portrait */}
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-[#1e1b18]/40 via-[#141210]/30 to-[#0a0908]/50 blur-xl pointer-events-none" />

              {/* Offset Neutral Dark Architectural Frame for physical depth */}
              <div className="absolute -inset-2 sm:-inset-3 rounded-[32px] border border-neutral-700/30 dark:border-white/10 translate-x-3 translate-y-3 pointer-events-none transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
              
              {/* Main Portrait Frame with Dark Neutral Backdrop */}
              <div className="relative w-full h-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[#181614] to-[#0f0e0c] border border-neutral-800/80 dark:border-white/10 shadow-[0_20px_48px_rgba(0,0,0,0.4)] z-10">
                <Image 
                  src="/deep-photo.jpg" 
                  alt="Deep Paira" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />

                {/* Gentle subtle bottom fade to anchor editorial badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Discreet Editorial Tag Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-4 py-2.5 rounded-[12px] bg-[#0d0c0b]/85 backdrop-blur-md border border-white/10 text-xs font-mono">
                  <span className="text-white font-medium">Deep Paira</span>
                  <span className="text-neutral-400 uppercase tracking-wider text-[10px]">Full-Stack Developer</span>
                </div>
              </div>
            </motion.div>

            {/* Unified Agency-Grade Downloadable Resume Action Hub */}
            <ResumeDownloadBlock />

            {/* Social Links Row below resume hub */}
            <div className="flex items-center gap-3 w-full max-w-md mx-auto lg:mx-0">
              <a
                href="https://github.com/Deep-paira"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-[14px] bg-[var(--surface-container-low)]/70 border border-[var(--outline-variant)]/60 font-mono text-xs text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)]/50 hover:bg-[var(--surface-container-low)] hover:shadow-sm transition-all duration-300 group"
              >
                <GithubIcon className="w-4 h-4 text-[var(--primary)] transition-transform group-hover:scale-110" />
                <span className="font-medium">GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://linkedin.com/in/deep-paira"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-[14px] bg-[var(--surface-container-low)]/70 border border-[var(--outline-variant)]/60 font-mono text-xs text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:border-[var(--primary)]/50 hover:bg-[var(--surface-container-low)] hover:shadow-sm transition-all duration-300 group"
              >
                <LinkedinIcon className="w-4 h-4 text-[var(--primary)] transition-transform group-hover:scale-110" />
                <span className="font-medium">LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Archival Metadata Note */}
            <div className="p-6 rounded-[18px] bg-[var(--surface-container-low)]/40 border border-[var(--outline-variant)]/50 font-mono text-xs text-[var(--on-surface-variant)] flex flex-col gap-2 max-w-md mx-auto lg:mx-0">
              <span className="uppercase tracking-widest text-[10px] text-[var(--primary)] font-semibold">
                LOCATION &amp; COLLABORATION
              </span>
              <span className="text-[var(--on-background)] font-medium text-sm">
                Based in India // Open to Remote &amp; Internships
              </span>
              <span className="leading-relaxed opacity-80 font-sans text-xs">
                Actively seeking frontend-leaning full-stack roles, junior engineering opportunities, and open-source collaborations.
              </span>
            </div>
          </div>

          {/* Right Column - Editorial Header & Intro Prelude */}
          <div className="lg:col-span-7 flex flex-col gap-8 justify-center lg:pt-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
              className="flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase text-[var(--primary)] font-semibold"
            >
              <span>01</span>
              <span className="text-[var(--outline-variant)]">—</span>
              <span>ABOUT DEEP PAIRA</span>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EDITORIAL_EASE }}
              className="font-serif text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] text-[var(--on-background)] leading-[1.04] tracking-tight font-normal"
            >
              Building modern web apps.<br />
              <span className="italic font-serif text-[var(--primary)] font-light">
                From interface to database.
              </span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EDITORIAL_EASE }}
              className="font-sans text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed max-w-xl"
            >
              Bridging robust software architecture, tactile interface craft, and systematic component design into weightless, human-grounded digital experiences.
            </motion.p>

            {/* Scroll Invitation Pill */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: EDITORIAL_EASE }}
              className="flex items-center gap-3 pt-2"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/60 text-xs font-mono text-[var(--on-surface-variant)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                <span>Scroll down to navigate the 5 core pillars</span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ===================================================================== */}
        {/* Centerpiece: Skiper 44 "Vercel Scroll with Blur" 5-Beat Storyline     */}
        {/* ===================================================================== */}
        <div className="w-full">
          <AboutScrollBlur />
        </div>

        {/* ===================================================================== */}
        {/* Bottom Area: Static Tech Stack & Capabilities Matrix + Availability   */}
        {/* ===================================================================== */}
        <div className="flex flex-col gap-12 pt-8 border-t border-[var(--outline-variant)]/40">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div className="flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase text-[var(--on-surface-variant)] font-semibold">
              <span>02</span>
              <span className="text-[var(--outline-variant)]">—</span>
              <span>TECH STACK &amp; CAPABILITIES</span>
            </div>
            <span className="font-mono text-[11px] text-[var(--primary)] font-medium">
              {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} TECHNOLOGIES &amp; TOOLS
            </span>
          </div>

          {/* Categorized Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
            {skillCategories.map((group, index) => {
              // Row 1 (Core Engineering): 3 cards (4 cols each on lg)
              // Row 2 (Data & Systems): 2 cards (6 cols each on lg)
              // Row 3 (3D & Cloud): 2 cards (6 cols each on lg, card 6 spans 2 cols on md)
              const colSpanClass =
                index < 3
                  ? "md:col-span-1 lg:col-span-4"
                  : index === 6
                  ? "md:col-span-2 lg:col-span-6"
                  : "md:col-span-1 lg:col-span-6";

              return (
                <motion.div
                  key={group.category}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                    ease: EDITORIAL_EASE,
                  }}
                  className={`p-6 sm:p-7 rounded-[22px] bg-[var(--surface-container-low)]/50 border border-[var(--outline-variant)]/60 flex flex-col justify-between gap-4 hover:border-[var(--primary)]/40 hover:bg-[var(--surface-container-low)]/80 transition-all duration-300 ${colSpanClass}`}
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-xs font-semibold text-[var(--primary)] uppercase tracking-wider flex items-center gap-2">
                        <span className="text-[10px] text-[var(--on-surface-variant)] opacity-50 font-normal">
                          0{index + 1}
                        </span>
                        {group.category}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--on-surface-variant)] opacity-60">
                        {group.skills.length} skills
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[var(--on-surface-variant)] opacity-80 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {group.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="text-xs px-2.5 py-1 rounded-[8px] bg-[var(--surface-container-high)]/60 border-[var(--outline-variant)]/60 text-[var(--on-background)] hover:border-[var(--primary)]/60 hover:text-[var(--primary)] hover:-translate-y-0.5 transition-all duration-200 font-sans font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Availability & Call-to-Action Banner */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[var(--surface-container-low)] p-6 sm:p-8 rounded-[24px] border border-[var(--outline-variant)]/60 shadow-sm gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse shrink-0" />
              <div className="flex flex-col">
                <span className="font-sans text-base text-[var(--on-background)] font-medium">
                  Open to Internships &amp; Junior Roles
                </span>
                <span className="font-mono text-xs text-[var(--on-surface-variant)]">
                  Full-stack (Frontend-leaning) // Remote &amp; On-site Collaboration
                </span>
              </div>
            </div>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto text-center font-sans text-xs font-semibold tracking-wider text-[#FAF6F0] bg-[var(--primary)] px-7 py-3.5 rounded-full hover:bg-[var(--primary-container)] hover:shadow-md transition-all uppercase"
            >
              Get In Touch
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutContent;
