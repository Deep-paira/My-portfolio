"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Server, Sparkles, PenTool, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Premium, unhurried decelerating easing curve
const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

interface CapabilityItem {
  id: string;
  index: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  slideDirection: "left" | "right";
  featured?: boolean;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend Engineering",
    category: "REACT // NEXT.JS // TAILWIND",
    headline: "Scalable component architectures & high-performance web applications.",
    description:
      "Modern, responsive web applications built with React, Next.js, and Tailwind CSS. Grounded in semantic HTML5, CSS3, and JavaScript (ES6+), optimized for fast initial paint, client-side caching, and complete accessibility across viewports.",
    tags: ["React", "Next.js", "Tailwind CSS", "JavaScript (ES6+)", "Vite", "HTML5/CSS3", "React Hook Form"],
    icon: Code2,
    slideDirection: "left",
    featured: true,
  },
  {
    id: "backend",
    index: "02",
    title: "Backend & REST APIs",
    category: "DJANGO // PYTHON // POSTGRESQL",
    headline: "Dependable server architecture, token authentication & relational schemas.",
    description:
      "Architecting reliable Django backends, RESTful APIs, and database-driven applications. Experienced with authentication pipelines, CRUD patterns, and integrating backend logic cleanly with modern frontend clients.",
    tags: ["Django", "Python", "REST APIs", "Node.js", "Relational DBs", "Auth Systems"],
    icon: Server,
    slideDirection: "right",
  },
  {
    id: "motion",
    index: "03",
    title: "Motion & Interaction",
    category: "FRAMER MOTION // THREE.JS",
    headline: "Tactile micro-interactions & purposeful kinetic interfaces.",
    description:
      "Crafting restrained, editorial animations with Framer Motion and Three.js. From spring-damped modal entrances to continuous 3D canvas objects, every movement communicates spatial hierarchy without distracting from content.",
    tags: ["Framer Motion", "Three.js", "Micro-Interactions", "After Effects", "Kinetic Typography"],
    icon: Sparkles,
    slideDirection: "left",
  },
  {
    id: "design",
    index: "04",
    title: "UI/UX & Prototyping",
    category: "FIGMA // DESIGN SYSTEMS",
    headline: "Translating ambiguous concepts into systematic, clickable reality.",
    description:
      "Translating product ideas into intuitive user journeys, design tokens, and clickable prototypes in Figma. Establishing coherent design systems so that developer handoff is seamless and pixel-accurate in production.",
    tags: ["Figma", "Canva", "Wireframing", "Design Systems", "Prototyping", "User Flows"],
    icon: PenTool,
    slideDirection: "right",
    featured: true,
  },
];

export function CapabilitiesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-20 border-b border-[var(--outline-variant)] bg-[var(--background)] overflow-hidden">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Editorial Section Index & Asymmetric Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[var(--on-surface-variant)] uppercase mb-6"
            >
              <span className="text-[var(--primary)] font-medium">03</span>
              <span className="text-[var(--outline-variant)]">—</span>
              <span>CORE CAPABILITIES</span>
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.08, ease: LUXURY_EASE }}
              className="font-serif text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem] text-[var(--on-background)] leading-[0.98] tracking-tight font-normal"
            >
              What I Do. <br />
              <span className="italic font-serif text-[var(--primary)] font-light">
                Engineering with craft.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
            className="font-sans text-base sm:text-lg text-[var(--on-surface-variant)] max-w-md leading-relaxed"
          >
            I bridge design intention and dependable engineering. From interactive Figma prototypes
            to production Next.js interfaces and Django APIs, each phase is handled with precision.
          </motion.p>
        </div>

        {/* Asymmetric Editorial Staggered Layout with Smooth Entrance Animations */}
        <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
          {CAPABILITIES.map((cap, index) => {
            const Icon = cap.icon;
            const isLeft = cap.slideDirection === "left";

            return (
              <motion.div
                key={cap.id}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: isLeft ? -36 : 36,
                        y: 28,
                      }
                }
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{ once: true, amount: 0.22 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.85,
                        delay: index * 0.15, // Smooth 0.15s rhythmic stagger
                        ease: LUXURY_EASE,   // Premium quintic decelerating curve
                      }
                }
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -5, transition: { duration: 0.3, ease: LUXURY_EASE } }
                }
                className={cn(
                  "group relative rounded-[24px] bg-[var(--surface-container-low)]/50 border border-[var(--outline-variant)]/60 hover:border-[var(--primary)]/60 hover:bg-[var(--surface-container-low)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all duration-300 p-8 sm:p-10 md:p-12 w-full",
                  // Asymmetric widths and staggered horizontal positions on desktop
                  index === 0 && "lg:max-w-[76%] lg:mr-auto",
                  index === 1 && "lg:max-w-[70%] lg:ml-auto lg:-mt-8",
                  index === 2 && "lg:max-w-[70%] lg:mr-auto lg:-mt-8",
                  index === 3 && "lg:max-w-[78%] lg:ml-auto lg:-mt-8"
                )}
              >
                {/* Top Corner Editorial Numbering & Icon */}
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    {/* Micro-interactive animated icon */}
                    <div className="w-12 h-12 rounded-[14px] bg-[var(--surface-container-high)] border border-[var(--outline-variant)]/50 text-[var(--primary)] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:border-[var(--primary)]/40 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[var(--primary)] font-medium block">
                        {cap.category}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--on-background)] font-normal transition-colors duration-200 group-hover:text-[var(--primary)]">
                        {cap.title}
                      </h3>
                    </div>
                  </div>

                  {/* Editorial Index Stamp */}
                  <span className="font-serif italic text-3xl sm:text-4xl text-[var(--on-surface-variant)]/30 group-hover:text-[var(--primary)]/50 transition-colors duration-300 select-none">
                    /{cap.index}
                  </span>
                </div>

                {/* Headline & Description */}
                <div className="mb-8 max-w-3xl">
                  <p className="font-sans font-medium text-base sm:text-lg text-[var(--on-background)] mb-3 leading-snug">
                    {cap.headline}
                  </p>
                  <p className="font-sans text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="pt-6 border-t border-[var(--outline-variant)]/40 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)]/75 mr-2">
                    STACK:
                  </span>
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-[8px] bg-[var(--surface-container-high)] text-xs font-mono text-[var(--on-surface-variant)] border border-[var(--outline-variant)]/40 transition-colors duration-200 group-hover:border-[var(--primary)]/30 group-hover:text-[var(--on-background)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Subtle Bottom Action */}
        <div className="mt-16 pt-8 border-t border-[var(--outline-variant)]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-mono text-xs text-[var(--on-surface-variant)] uppercase tracking-wider">
            Looking for a dedicated developer for an internship or full-time role?
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[var(--primary)] hover:underline group"
          >
            <span>Let&#39;s start a conversation</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
