"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Clock, Sparkles } from "lucide-react";

// ==============================================================================
// EXPANDED AUTHENTIC PROCESS DATA
// ==============================================================================
// Preserves the 4 original steps from the portfolio with enriched deliverables,
// rhythm estimates, and editorial takeaways.
interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  expandedContext: string;
  rhythm: string;
  takeaway: string;
  deliverables: string[];
  iconType: "discovery" | "strategy" | "design" | "delivery";
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    phase: "Discovery & Architecture",
    title: "Understanding the Core Problem",
    subtitle: "Requirements Gathering & Data Modeling",
    description:
      "Deep dive into project requirements, user needs, and data flows to define a clear, realistic full-stack development roadmap.",
    expandedContext:
      "Before writing code, I analyze user requirements, map database schemas, and assess technical feasibility across the frontend and backend stack to eliminate ambiguity early.",
    rhythm: "Phase 01",
    takeaway: "Clarity of requirements before a single line of code.",
    deliverables: [
      "Requirement Analysis",
      "User Flow Mapping",
      "Database & API Schema",
      "Technical Feasibility",
    ],
    iconType: "discovery",
  },
  {
    number: "02",
    phase: "UI/UX in Figma",
    title: "Structuring Accessible Interfaces",
    subtitle: "Figma Wireframes & Component Blueprints",
    description:
      "Structuring user journeys and wireframes in Figma to ensure an intuitive, accessible layout before jumping into frontend code.",
    expandedContext:
      "Using Figma, I construct responsive component layouts, establish typographic scale, and build clickable wireframe prototypes to validate usability and user flow logic.",
    rhythm: "Phase 02",
    takeaway: "Structure creates ease; thoughtful design creates confidence.",
    deliverables: [
      "Figma Wireframes",
      "Component Blueprints",
      "User Journey Maps",
      "Design System Tokens",
    ],
    iconType: "strategy",
  },
  {
    number: "03",
    phase: "Full-Stack Engineering",
    title: "Building with React, Next.js & Django",
    subtitle: "Component Architecture & REST APIs",
    description:
      "Translating Figma designs into responsive React and Next.js interfaces styled with Tailwind CSS, brought to life with Framer Motion, and powered by Django REST APIs.",
    expandedContext:
      "I write clean, modular JavaScript and TypeScript code, craft fluid micro-interactions with Framer Motion, and develop reliable Django backend endpoints with proper authentication, state management, and validation.",
    rhythm: "Phase 03",
    takeaway: "Pixel-level craft meeting dependable backend logic.",
    deliverables: [
      "Next.js & React Frontend",
      "Tailwind CSS Styling",
      "Framer Motion Animations",
      "Django REST APIs & Models",
    ],
    iconType: "design",
  },
  {
    number: "04",
    phase: "Deployment & Cloud",
    title: "Production Polish on Vercel & Netlify",
    subtitle: "QA, Performance Tuning & Deployment",
    description:
      "Conducting thorough cross-browser testing, accessibility passes, performance tuning, and automated deployments via Vercel or Netlify.",
    expandedContext:
      "Testing responsive breakpoints, optimizing asset delivery and web performance, validating API reliability, and configuring continuous deployment pipelines with Git on Vercel and Netlify.",
    rhythm: "Phase 04",
    takeaway: "Tested, fast, and accessible in production reality.",
    deliverables: [
      "Vercel & Netlify Hosting",
      "Cross-Device Design QA",
      "Web Performance Tuning",
      "Git CI/CD Pipeline",
    ],
    iconType: "delivery",
  },
];

const EDITORIAL_EASE = [0.23, 1, 0.32, 1] as const;

// ==============================================================================
// ANIMATED SVG MICRO-ILLUSTRATIONS
// ==============================================================================
function ProcessMicroIcon({
  type,
  reduceMotion,
}: {
  type: ProcessStep["iconType"];
  reduceMotion: boolean | null;
}) {
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: EDITORIAL_EASE };

  if (type === "discovery") {
    // Discovery: Compass / Radar Lens
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-8 h-8 text-[var(--primary)]"
        aria-hidden="true"
      >
        <motion.circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeDasharray="3 3"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={transition}
        />
        <motion.circle
          cx="24"
          cy="24"
          r="9"
          stroke="currentColor"
          strokeWidth="1.75"
          initial={reduceMotion ? false : { pathLength: 0, scale: 0.5 }}
          whileInView={{ pathLength: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.1 }}
        />
        <motion.path
          d="M24 10V14M24 34V38M10 24H14M34 24H38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.2 }}
        />
        <motion.circle
          cx="24"
          cy="24"
          r="2.5"
          fill="currentColor"
          initial={reduceMotion ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.3 }}
        />
      </svg>
    );
  }

  if (type === "strategy") {
    // Strategy: Information Architecture Flow Nodes
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-8 h-8 text-[var(--primary)]"
        aria-hidden="true"
      >
        {/* Top Root Node */}
        <motion.rect
          x="18"
          y="8"
          width="12"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={transition}
        />
        {/* Branch Lines */}
        <motion.path
          d="M24 16V26M13 26H35M13 26V32M35 26V32"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.15 }}
        />
        {/* Bottom Left Node */}
        <motion.rect
          x="7"
          y="32"
          width="12"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.25 }}
        />
        {/* Bottom Right Node */}
        <motion.rect
          x="29"
          y="32"
          width="12"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.3 }}
        />
      </svg>
    );
  }

  if (type === "design") {
    // Design: Precision Bezier Vector & Layout Frame
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-8 h-8 text-[var(--primary)]"
        aria-hidden="true"
      >
        {/* Smooth Bezier Arc */}
        <motion.path
          d="M10 36C12 18 36 30 38 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={transition}
        />
        {/* Handle Lines */}
        <motion.path
          d="M10 36L18 30M38 12L30 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.15 }}
        />
        {/* Anchor Points */}
        <motion.rect
          x="7.5"
          y="33.5"
          width="5"
          height="5"
          fill="currentColor"
          initial={reduceMotion ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.25 }}
        />
        <motion.rect
          x="35.5"
          y="9.5"
          width="5"
          height="5"
          fill="currentColor"
          initial={reduceMotion ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.3 }}
        />
      </svg>
    );
  }

  // Delivery: Terminal Code & Production Rocket Checkmark
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="w-8 h-8 text-[var(--primary)]"
      aria-hidden="true"
    >
      {/* Outer Card / Terminal Window */}
      <motion.rect
        x="8"
        y="10"
        width="32"
        height="28"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.75"
        initial={reduceMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={transition}
      />
      {/* Window Controls */}
      <motion.circle
        cx="14"
        cy="16"
        r="1.5"
        fill="currentColor"
        initial={reduceMotion ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ ...transition, delay: 0.1 }}
      />
      <motion.circle
        cx="19"
        cy="16"
        r="1.5"
        fill="currentColor"
        initial={reduceMotion ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ ...transition, delay: 0.15 }}
      />
      {/* Code Prompt Brackets & Verified Checkmark */}
      <motion.path
        d="M15 27L19 31L15 35M23 35H29"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ ...transition, delay: 0.25 }}
      />
    </svg>
  );
}

// ==============================================================================
// MAIN PROCESS STEPS COMPONENT
// ==============================================================================
export function ProcessSteps() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-driven animation tracking for drawing the continuous connecting timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <section className="relative w-full py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-[var(--outline-variant)]/20">
      <div className="mx-auto w-full max-w-6xl">
        
        {/* Editorial Section Header */}
        <div className="mb-20 md:mb-28 max-w-3xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[var(--on-surface-variant)] uppercase mb-6"
          >
            <span className="text-[var(--primary)] font-medium">04</span>
            <span className="text-[var(--outline-variant)]">—</span>
            <span>METHODOLOGY &amp; CADENCE</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EDITORIAL_EASE }}
            className="font-serif text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem] text-[var(--on-background)] leading-[1] tracking-tight mb-8"
          >
            The Method. <br />
            <span className="italic font-serif text-[var(--primary)] font-light">
              Crafting with intent.
            </span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EDITORIAL_EASE }}
            className="font-sans text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed max-w-2xl"
          >
            Enduring digital products are never built on guesswork. They require rigorous discovery,
            disciplined architecture, and continuous attention to physical craft. Here is how an idea
            evolves from the first conversation into production code.
          </motion.p>
        </div>

        {/* Connected Step Timeline Layout */}
        <div ref={containerRef} className="relative">
          
          {/* Continuous Vertical Connecting SVG Spine */}
          <div className="absolute left-6 sm:left-8 md:left-12 top-6 bottom-12 w-6 -translate-x-1/2 overflow-visible pointer-events-none z-0">
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Neutral background track guide */}
              <line
                x1="12"
                y1="0"
                x2="12"
                y2="100%"
                stroke="var(--outline-variant)"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Scroll-driven progressive drawing path */}
              <motion.line
                x1="12"
                y1="0"
                x2="12"
                y2="100%"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  pathLength: shouldReduceMotion ? 1 : smoothProgress,
                }}
              />
            </svg>
          </div>

          {/* Steps Stack */}
          <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.number}
                className="relative flex items-start group"
              >
                {/* Numbered Step Marker along the timeline spine */}
                <div className="relative z-10 flex-shrink-0 left-6 sm:left-8 md:left-12 -translate-x-1/2">
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : { scale: 0.7, opacity: 0 }
                    }
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-12% 0px" }}
                    transition={{
                      duration: 0.5,
                      delay: shouldReduceMotion ? 0 : index * 0.08,
                      ease: EDITORIAL_EASE,
                    }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--background)] border-2 border-[var(--outline-variant)] flex items-center justify-center font-mono text-xs sm:text-sm font-medium text-[var(--on-surface-variant)] transition-all duration-300 group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(196,98,63,0.25)]"
                  >
                    <span>{step.number}</span>
                  </motion.div>
                </div>

                {/* Step Content Card with Responsive Margin & Desktop Hover State */}
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 28 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.7,
                    delay: shouldReduceMotion ? 0 : 0.1 + index * 0.06,
                    ease: EDITORIAL_EASE,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -4, transition: { duration: 0.25 } }
                  }
                  className="flex-1 ml-10 sm:ml-14 md:ml-20 rounded-[20px] sm:rounded-[24px] border border-[var(--outline-variant)]/60 bg-[var(--surface-container-low)]/40 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-[var(--primary)]/50 hover:bg-[var(--surface-container-low)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
                >
                  {/* Top Bar: Phase Badge, Micro-Icon, and Cadence */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--outline-variant)]/40">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-[12px] bg-[var(--surface-container-high)] border border-[var(--outline-variant)]/50 transition-colors group-hover:border-[var(--primary)]/40">
                        <ProcessMicroIcon
                          type={step.iconType}
                          reduceMotion={shouldReduceMotion}
                        />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.16em] text-[var(--primary)] font-medium block">
                          {step.phase}
                        </span>
                        <h4 className="font-sans text-xs text-[var(--on-surface-variant)]">
                          {step.subtitle}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] text-xs font-mono">
                      <Clock className="w-3.5 h-3.5 text-[var(--primary)]" />
                      <span>{step.rhythm}</span>
                    </div>
                  </div>

                  {/* Step Title & Core Description */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[var(--on-background)] font-medium mb-3 tracking-tight transition-colors group-hover:text-[var(--primary)]">
                    {step.title}
                  </h3>
                  
                  <p className="font-sans text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <p className="font-sans text-sm text-[var(--on-surface-variant)]/85 leading-relaxed mb-6">
                    {step.expandedContext}
                  </p>

                  {/* Editorial Philosophy Quote / Takeaway */}
                  <div className="flex items-center gap-2.5 p-3 sm:p-4 rounded-[12px] bg-[var(--background)]/70 border border-[var(--outline-variant)]/40 mb-6">
                    <Sparkles className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                    <span className="font-serif italic text-xs sm:text-sm text-[var(--on-background)]">
                      &ldquo;{step.takeaway}&rdquo;
                    </span>
                  </div>

                  {/* Key Deliverables Chips */}
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)] block mb-3">
                      Key Deliverables &amp; Outcomes:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((item) => (
                        <div
                          key={item}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[var(--surface-container-high)] border border-[var(--outline-variant)]/40 text-xs font-sans text-[var(--on-background)] transition-colors group-hover:border-[var(--primary)]/30"
                        >
                          <Check className="w-3 h-3 text-[var(--primary)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
