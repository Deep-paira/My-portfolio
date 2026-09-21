"use client";

import * as React from "react";
import { skillCategories } from "@/data/skills";
import { Badge } from "../ui/Badge";
import Image from "next/image";
import Link from "next/link";
import { About3DDecor } from "../3d/About3DDecor";
import { Sparkles, HeartHandshake, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { motion, useReducedMotion } from "framer-motion";

const EDITORIAL_EASE = [0.23, 1, 0.32, 1] as const;

export function AboutContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-36 px-6 md:px-12 lg:px-24 overflow-hidden min-h-[750px]">
      {/* 1. Subtle 3D Geometric Background Decor (Untouched) */}
      <About3DDecor />

      {/* 2. Low-Opacity Atmospheric 2D Geometric Watermarks (8-15% Opacity) */}
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
          {/* 3x3 Grid of fine architectural points */}
          <circle cx="18" cy="18" r="2" fill="currentColor" />
          <circle cx="38" cy="18" r="2" fill="currentColor" />
          <circle cx="58" cy="18" r="2" fill="currentColor" />
          <circle cx="18" cy="38" r="2" fill="currentColor" />
          <circle cx="38" cy="38" r="2" fill="currentColor" />
          <circle cx="58" cy="38" r="2" fill="currentColor" />
          <circle cx="18" cy="58" r="2" fill="currentColor" />
          <circle cx="38" cy="58" r="2" fill="currentColor" />
          <circle cx="58" cy="58" r="2" fill="currentColor" />
          {/* Corner frame ticks */}
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
          {/* 45° Main Drafting Axis Line */}
          <line x1="16" y1="88" x2="88" y2="16" stroke="currentColor" strokeWidth="1.2" />
          {/* Perpendicular Micro-Measurement Tick Marks */}
          <line x1="28" y1="72" x2="36" y2="80" stroke="currentColor" strokeWidth="1" />
          <line x1="42" y1="58" x2="52" y2="68" stroke="currentColor" strokeWidth="1.4" />
          <line x1="56" y1="44" x2="64" y2="52" stroke="currentColor" strokeWidth="1" />
          <line x1="70" y1="30" x2="80" y2="40" stroke="currentColor" strokeWidth="1.4" />
          {/* Micro-Coordinate Label */}
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
          {/* 270° Open Broken Circular Arc */}
          <path
            d="M59 14 A45 45 0 1 1 14 59"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Inner Dashed Orbital Ring */}
          <circle cx="59" cy="59" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
          {/* Center Micro Crosshair */}
          <line x1="59" y1="51" x2="59" y2="67" stroke="currentColor" strokeWidth="1" />
          <line x1="51" y1="59" x2="67" y2="59" stroke="currentColor" strokeWidth="1" />
          {/* Degree Calibration Ticks */}
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
          {/* Fine Hairline Vectors connecting nodes */}
          <line x1="18" y1="28" x2="48" y2="18" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
          <line x1="48" y1="18" x2="72" y2="44" stroke="currentColor" strokeWidth="0.8" />
          <line x1="72" y1="44" x2="38" y2="66" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
          <line x1="38" y1="66" x2="18" y2="28" stroke="currentColor" strokeWidth="0.8" />
          <line x1="48" y1="18" x2="38" y2="66" stroke="currentColor" strokeWidth="0.6" />
          {/* Node Points of varying diameters */}
          <circle cx="18" cy="28" r="2.5" fill="currentColor" />
          <circle cx="48" cy="18" r="3.2" fill="currentColor" />
          <circle cx="72" cy="44" r="2" fill="currentColor" />
          <circle cx="38" cy="66" r="3" fill="currentColor" />
          <circle cx="56" cy="74" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* 3. Main Content Layer */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
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
            {/* Offset Terracotta Architectural Frame for physical depth */}
            <div className="absolute -inset-2 sm:-inset-3 rounded-[32px] border border-[var(--primary)]/35 translate-x-3 translate-y-3 pointer-events-none transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
            
            {/* Main Portrait Frame */}
            <div className="relative w-full h-full overflow-hidden rounded-[28px] bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/80 shadow-[0_16px_40px_rgba(0,0,0,0.06)] z-10">
              <Image 
                src="/deep.jpeg" 
                alt="Deep Paira" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />

              {/* Discreet Editorial Tag Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-4 py-2.5 rounded-[12px] bg-[var(--background)]/85 backdrop-blur-md border border-[var(--outline-variant)]/60 text-xs font-mono">
                <span className="text-[var(--on-background)] font-medium">Deep Paira</span>
                <span className="text-[var(--primary)] uppercase tracking-wider text-[10px]">Developer</span>
              </div>
            </div>
          </motion.div>

          {/* Social Links Row below image */}
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

        {/* Right Column - Authentic Bio, Pull-Quote & Categorized Skills */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          
          {/* Section Header & Bio */}
          <div className="flex flex-col gap-6">
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

            <div className="flex flex-col gap-5 font-sans text-base sm:text-lg text-[var(--on-surface-variant)] leading-[1.8] max-w-xl">
              <p>
                Hi, I&#39;m <strong className="text-[var(--on-background)] font-medium">Deep Paira</strong>, a frontend-leaning Full-Stack Developer currently open to internships and junior developer roles. I build modern, scalable, high-performance web applications using React, Next.js, Tailwind CSS, Framer Motion, and Django, with HTML5, CSS3, and modern JavaScript (ES6+) as my foundation.
              </p>
              <p>
                I focus on clean UI architecture, smooth animations, accessibility, and reliable backend systems to deliver great user experiences end-to-end. My backend experience includes building Django-based backends, REST APIs, authentication systems, and database-driven applications.
              </p>
            </div>
          </div>

          {/* Warm Editorial Pull-Quote Treatment */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, ease: EDITORIAL_EASE }}
            className="relative p-6 sm:p-8 rounded-r-[20px] bg-[var(--surface-container-low)]/60 border-l-[3px] border-[var(--primary)] border-y border-r border-[var(--outline-variant)]/40 max-w-xl shadow-sm"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)] font-semibold block mb-3">
              THE DETAILS MATTER
            </span>
            <blockquote className="font-serif italic text-lg sm:text-xl md:text-[1.35rem] text-[var(--on-background)] leading-snug">
              &ldquo;I&#39;m genuinely detail-obsessed: the kind of developer who can spend hours perfecting a single button&#39;s hover effect, kinetic curve, or micro-interaction—because small UI details make the biggest difference in how software feels.&rdquo;
            </blockquote>
          </motion.div>

          {/* Currently Exploring & Growth Mindset Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: EDITORIAL_EASE }}
            className="p-6 sm:p-7 rounded-[20px] bg-[var(--surface-container-low)]/50 border border-[var(--outline-variant)]/60 max-w-xl flex flex-col gap-3.5"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">
                CURRENTLY EXPLORING &amp; EXPANDING
              </span>
            </div>
            <p className="font-sans text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
              Deepening my craft in <strong className="text-[var(--on-background)]">advanced React patterns</strong>, <strong className="text-[var(--on-background)]">deeper Framer Motion animation techniques</strong>, and <strong className="text-[var(--on-background)]">web performance optimization</strong>.
            </p>
            <div className="flex items-center gap-2 pt-3 border-t border-[var(--outline-variant)]/30 text-xs font-mono text-[var(--on-surface-variant)]">
              <HeartHandshake className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
              <span>Actively open to collaborating on open-source frontend and full-stack projects.</span>
            </div>
          </motion.div>
          
          {/* Categorized Tech Stack Display with Staggered Reveals */}
          <div className="flex flex-col gap-6 pt-4 border-t border-[var(--outline-variant)]/40 max-w-xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest uppercase text-[var(--on-surface-variant)] font-semibold">
                TECH STACK &amp; CAPABILITIES
              </span>
              <span className="font-mono text-[11px] text-[var(--primary)] font-medium">
                {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} TECHNOLOGIES
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {skillCategories.map((group, index) => (
                <motion.div
                  key={group.category}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                    ease: EDITORIAL_EASE,
                  }}
                  className="flex flex-col gap-2.5"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs font-medium text-[var(--primary)] uppercase tracking-wider">
                      {group.category}
                    </span>
                    <span className="font-sans text-[11px] text-[var(--on-surface-variant)] opacity-75 hidden sm:inline">
                      {group.description}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="text-xs px-3 py-1.5 rounded-[8px] bg-[var(--surface-container-high)]/60 border-[var(--outline-variant)]/60 text-[var(--on-background)] hover:border-[var(--primary)]/60 hover:text-[var(--primary)] hover:-translate-y-0.5 transition-all duration-200 font-sans font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Availability Banner */}
          <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[var(--surface-container-low)] p-6 sm:p-7 rounded-[20px] max-w-xl border border-[var(--outline-variant)]/60 shadow-sm gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></div>
              <div className="flex flex-col">
                <span className="font-sans text-sm text-[var(--on-background)] font-medium">
                  Open to Internships &amp; Junior Roles
                </span>
                <span className="font-mono text-[11px] text-[var(--on-surface-variant)]">
                  Full-stack (Frontend-leaning) // Remote &amp; On-site
                </span>
              </div>
            </div>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto text-center font-sans text-xs font-semibold tracking-wider text-[#FAF6F0] bg-[var(--primary)] px-6 py-3 rounded-full hover:bg-[var(--primary-container)] hover:shadow-md transition-all uppercase"
            >
              Get In Touch
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
