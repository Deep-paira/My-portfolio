"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Sparkles, Code2, Layers, Compass, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeatItem {
  id: string;
  tag: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  highlight?: string;
  description: string;
  quote?: boolean;
}

const BEATS: BeatItem[] = [
  {
    id: "identity",
    tag: "01 // IDENTITY",
    category: "CREATIVE ENGINEERING",
    icon: Sparkles,
    title: "Deep Paira",
    highlight: "Frontend-Leaning Full-Stack Developer",
    description:
      "Crafting high-impact digital systems where resilient software architecture meets fluid motion craft and meticulous typography.",
  },
  {
    id: "bio",
    tag: "02 // STACK & FOUNDATION",
    category: "CORE CAPABILITIES",
    icon: Code2,
    title: "Building modern, scalable applications.",
    highlight: "From interface to database.",
    description:
      "Specializing in React, Next.js, Tailwind CSS, Framer Motion, and Django. Grounded in modern JavaScript (ES6+), HTML5 semantic architecture, and REST API design.",
  },
  {
    id: "focus",
    tag: "03 // PHILOSOPHY",
    category: "DESIGN ENGINEERING",
    icon: Layers,
    title: "Focusing on clean UI architecture & fluid motion.",
    description:
      "Dedicated to smooth kinetic choreography, strict accessibility standards, robust state management, and dependable backend services to deliver great user experiences end-to-end.",
  },
  {
    id: "exploring",
    tag: "04 // THE FRONTIER",
    category: "CONTINUOUS LEARNING",
    icon: Compass,
    title: "Deepening craft across new horizons.",
    description:
      "Currently diving into advanced React design patterns, complex Framer Motion layout animations, WebGL/Three.js creative engineering, and web performance optimization.",
  },
  {
    id: "craft",
    tag: "05 // THE DETAILS",
    category: "METICULOUS OBSESSION",
    icon: Heart,
    title:
      "Detail-obsessed: the kind of developer who can spend hours perfecting a button’s hover curve, kinetic timing, and micro-interactions.",
    description: "Because small UI details make the biggest difference in how software truly feels.",
    quote: true,
  },
];

// Snappy, organic easing for editorial transitions
const EASE_CURVE = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 28 : -28,
    opacity: 0,
    filter: "blur(10px)",
    scale: 0.97,
  }),
  center: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.28,
      ease: EASE_CURVE,
    },
    transitionEnd: {
      filter: "none", // Drops CSS filter completely on resting state for razor-sharp typography
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -28 : 28,
    opacity: 0,
    filter: "blur(10px)",
    scale: 0.97,
    transition: {
      duration: 0.22,
      ease: EASE_CURVE,
    },
  }),
};

export function AboutScrollBlur() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const lastIndexRef = React.useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const updateActiveIndex = React.useCallback((progress: number) => {
    // 5 discrete, non-overlapping bands: [0-0.2), [0.2-0.4), [0.4-0.6), [0.6-0.8), [0.8-1.0]
    const clamped = Math.max(0, Math.min(0.9999, progress));
    const nextIdx = Math.min(BEATS.length - 1, Math.floor(clamped * BEATS.length));
    if (nextIdx !== lastIndexRef.current) {
      setDirection(nextIdx > lastIndexRef.current ? 1 : -1);
      lastIndexRef.current = nextIdx;
      setActiveIndex(nextIdx);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", updateActiveIndex);

  React.useEffect(() => {
    // Initialize or re-sync active index on mount
    updateActiveIndex(scrollYProgress.get());
  }, [scrollYProgress, updateActiveIndex]);

  const handleDotClick = (beatIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    // Target the center of each slide's scroll zone
    const targetMidpoints = [0.10, 0.30, 0.50, 0.70, 0.90];
    const targetY = containerTop + targetMidpoints[beatIndex] * scrollableHeight;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const activeBeat = BEATS[activeIndex];
  const Icon = activeBeat.icon;

  return (
    <section className="relative w-full">
      {/* ========================================================================= */}
      {/* 1. DESKTOP / TABLET: Sticky-Scroll Reveal with Active-Slide Isolation     */}
      {/* ========================================================================= */}
      {!shouldReduceMotion && (
        <div
          ref={containerRef}
          className="hidden md:block relative h-[300vh]"
        >
          {/* Sticky Stage Container pinned at comfortable eye level */}
          <div className="sticky top-[15vh] h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Ambient Warm Radial Backlight */}
            <div className="absolute w-[620px] h-[360px] rounded-full bg-gradient-to-tr from-[var(--primary)]/10 via-[var(--surface-container-high)]/20 to-transparent blur-[120px] pointer-events-none" />

            {/* Stage Frame Border & Drafting Corner Accents */}
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center px-4">
              {/* Corner Drafting Marks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[var(--outline-variant)]/60 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[var(--outline-variant)]/60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[var(--outline-variant)]/60 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[var(--outline-variant)]/60 pointer-events-none" />

              {/* Active Slide Presentation via AnimatePresence (Zero Inactive DOM Leakage) */}
              <div className="relative w-full flex items-center justify-center min-h-[320px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeBeat.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full max-w-3xl flex flex-col items-center gap-6 sm:gap-7 text-center px-4 sm:px-8 select-none"
                  >
                    {/* Pill Tag & Category Badge */}
                    <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[var(--surface-container-low)]/80 border border-[var(--outline-variant)]/70 backdrop-blur-md shadow-sm">
                      <Icon className="w-3.5 h-3.5 text-[var(--primary)]" />
                      <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[var(--primary)]">
                        {activeBeat.tag}
                      </span>
                      <span className="text-[var(--outline-variant)]">•</span>
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--on-surface-variant)]/80">
                        {activeBeat.category}
                      </span>
                    </div>

                    {/* Main Content Display */}
                    {activeBeat.quote ? (
                      <div className="flex flex-col gap-4">
                        <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[var(--on-background)] leading-[1.25] tracking-tight">
                          &ldquo;{activeBeat.title}&rdquo;
                        </blockquote>
                        <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[var(--primary)] font-medium">
                          — {activeBeat.description}
                        </p>
                      </div>
                    ) : activeIndex === 0 ? (
                      <div className="flex flex-col gap-3">
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[var(--on-background)] tracking-tight font-normal leading-[1.05]">
                          {activeBeat.title}
                        </h2>
                        <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[var(--primary)] font-light">
                          {activeBeat.highlight}
                        </p>
                        <p className="font-sans text-base sm:text-lg text-[var(--on-surface-variant)] max-w-xl mx-auto mt-2 leading-relaxed">
                          {activeBeat.description}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-[var(--on-background)] leading-[1.18] tracking-tight max-w-2xl mx-auto">
                          {activeBeat.title}{" "}
                          {activeBeat.highlight && (
                            <span className="italic font-serif text-[var(--primary)] font-light block sm:inline">
                              {activeBeat.highlight}
                            </span>
                          )}
                        </h3>
                        <p className="font-sans text-sm sm:text-base md:text-lg text-[var(--on-surface-variant)] max-w-xl mx-auto leading-relaxed">
                          {activeBeat.description}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Minimalist 5-Beat Interactive Progress Indicator */}
              <div 
                className="absolute bottom-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-container-low)]/90 border border-[var(--outline-variant)]/60 backdrop-blur-md z-30 shadow-sm"
                role="navigation"
                aria-label="Pillars progress"
              >
                {BEATS.map((beat, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={beat.id}
                      type="button"
                      onClick={() => handleDotClick(idx)}
                      title={`Go to ${beat.tag}`}
                      aria-label={`Go to slide ${idx + 1}: ${beat.tag}`}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                        isActive
                          ? "w-6 bg-[var(--primary)]"
                          : "w-1.5 bg-[var(--outline-variant)] hover:bg-[var(--primary)]/60"
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MOBILE & ACCESSIBILITY FALLBACK: Statically Stacked Responsive Cards  */}
      {/* ========================================================================= */}
      <div
        className={cn(
          "w-full flex flex-col gap-6 py-12 px-4 sm:px-6",
          shouldReduceMotion ? "block" : "block md:hidden"
        )}
      >
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">
          <span>01</span>
          <span className="text-[var(--outline-variant)]">—</span>
          <span>CORE PILLARS &amp; PHILOSOPHY</span>
        </div>

        {BEATS.map((beat) => {
          const BeatIcon = beat.icon;
          return (
            <div
              key={beat.id}
              className="p-6 sm:p-7 rounded-[22px] bg-[var(--surface-container-low)]/70 border border-[var(--outline-variant)]/70 flex flex-col gap-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--primary)]">
                  <BeatIcon className="w-4 h-4" />
                  <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
                    {beat.tag}
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--on-surface-variant)]/70">
                  {beat.category}
                </span>
              </div>

              {beat.quote ? (
                <blockquote className="font-serif italic text-lg sm:text-xl text-[var(--on-background)] leading-snug">
                  &ldquo;{beat.title}&rdquo;
                </blockquote>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-serif text-xl sm:text-2xl text-[var(--on-background)] font-normal leading-snug">
                    {beat.title}
                  </h4>
                  {beat.highlight && (
                    <p className="font-serif italic text-base sm:text-lg text-[var(--primary)] font-light">
                      {beat.highlight}
                    </p>
                  )}
                </div>
              )}

              <p className="font-sans text-xs sm:text-sm text-[var(--on-surface-variant)] leading-relaxed">
                {beat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AboutScrollBlur;
