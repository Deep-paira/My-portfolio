"use client";

import * as React from "react";
import { motion, AnimatePresence, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code2, Server, Sparkles, Layers, Palette, Cpu, Compass } from "lucide-react";

export interface TechSkill {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const TOP_SKILLS: TechSkill[] = [
  {
    id: "react",
    name: "REACT",
    shortLabel: "React",
    category: "FRONTEND",
    description:
      "Building fast, component-driven interfaces with clean, reusable architecture.",
    icon: Code2,
    accentColor: "var(--primary)",
  },
  {
    id: "nextjs",
    name: "NEXT.JS",
    shortLabel: "Next.js",
    category: "FULL-STACK",
    description:
      "Full-stack React framework for performant, SEO-friendly production apps.",
    icon: Cpu,
    accentColor: "#0284C7",
  },
  {
    id: "tailwind",
    name: "TAILWIND CSS",
    shortLabel: "Tailwind CSS",
    category: "STYLING",
    description:
      "Rapid, consistent UI styling with a utility-first workflow.",
    icon: Palette,
    accentColor: "#06B6D4",
  },
  {
    id: "framermotion",
    name: "FRAMER MOTION",
    shortLabel: "Framer Motion",
    category: "ANIMATION",
    description:
      "Crafting smooth, physics-based animation and micro-interactions.",
    icon: Layers,
    accentColor: "#D97754",
  },
  {
    id: "threejs",
    name: "THREE.JS",
    shortLabel: "Three.js",
    category: "3D GRAPHICS",
    description:
      "Building custom interactive 3D experiences for the web.",
    icon: Sparkles,
    accentColor: "var(--primary)",
  },
  {
    id: "django",
    name: "DJANGO",
    shortLabel: "Django",
    category: "BACKEND / APIS",
    description:
      "Backend development, REST APIs, and database-driven application logic.",
    icon: Server,
    accentColor: "#B05433",
  },
];

const SPRING_CURSOR = { mass: 0.1, damping: 16, stiffness: 85 } as const;
const SPRING_SCALE = { mass: 0.1, damping: 12, stiffness: 140 } as const;

/**
 * TechStackSpotlight (Adapted from Skiper UI Skiper 6 "Hover members")
 * Showcases Deep Paira's top 6 core skills using Skiper 6's signature:
 * - Ultra-tall condensed Thunder display font for the primary kinetic name reveal
 * - Center-outward symmetrical letter stagger animation
 * - Secondary line delayed description reveal
 * - Physics-based cursor follower on desktop
 * - Full 6-item symmetrical grid layout (2 cols mobile, 3 cols tablet, 6 cols desktop)
 * - Tap-to-select and idle auto-cycling for mobile touch discovery
 * - 100% warm neutral palette (cream, terracotta, espresso)
 */
export function TechStackSpotlight({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse follower springs
  const cursorX = useSpring(0, SPRING_CURSOR);
  const cursorY = useSpring(0, SPRING_CURSOR);
  const cursorScale = useSpring(0, SPRING_SCALE);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handlePointerEnter = () => {
    if (shouldReduceMotion) return;
    setIsHovered(true);
    cursorScale.set(1);
  };

  const handlePointerLeave = () => {
    if (shouldReduceMotion) return;
    setIsHovered(false);
    cursorScale.set(0);
    setActiveIndex(null);
  };

  // Auto-cycling for touch/idle discovery on mobile
  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % TOP_SKILLS.length));
    }, 4200);

    return () => clearInterval(timer);
  }, [isHovered]);

  const activeSkill = activeIndex !== null ? TOP_SKILLS[activeIndex] : null;
  const defaultTitle = "TECH STACK FOCUS";

  // Center-outward delay calculation per Skiper 6 algorithm
  const getLetterDelay = (index: number, total: number) => {
    if (shouldReduceMotion) return 0;
    const center = Math.floor(total / 2);
    return 0.038 * Math.abs(index - center);
  };

  const letterVariants = {
    hidden: { y: "115%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
    exit: { y: "-115%", opacity: 0 },
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-[var(--outline-variant)]/70 bg-[var(--surface-container-low)]/40 p-6 sm:p-10 md:p-12 select-none",
        className
      )}
    >
      {/* Interactive Cursor Follower (Skiper 6 signature interaction) */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{
            x: cursorX,
            y: cursorY,
            scale: cursorScale,
            transformOrigin: "center center",
          }}
          className="pointer-events-none absolute -left-4 -top-4 z-30 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-[#FAF6F0] shadow-lg shadow-[var(--primary)]/25"
        >
          <Compass className="h-4 w-4 animate-spin-slow" />
        </motion.div>
      )}

      {/* Top Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-8 border-b border-[var(--outline-variant)]/50">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-[var(--on-surface-variant)]">
            CORE DISCIPLINES // HOVER OR TAP
          </span>
        </div>
        <span className="font-mono text-[11px] text-[var(--on-surface-variant)]/80 uppercase tracking-widest">
          {activeSkill ? `${activeSkill.category} // 0${activeIndex! + 1}` : "6 CORE SKILLS"}
        </span>
      </div>

      {/* Symmetrical 6-Item Grid (2 cols mobile, 3 cols tablet, 6 cols desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 md:gap-3.5 py-8 md:py-10 z-20 relative">
        {TOP_SKILLS.map((skill, idx) => {
          const Icon = skill.icon;
          const isSelected = activeIndex === idx;

          return (
            <motion.button
              key={skill.id}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setIsHovered(true);
              }}
              onHoverStart={() => {
                setActiveIndex(idx);
                setIsHovered(true);
              }}
              animate={{
                scale: isSelected ? 1.04 : 1,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                "group relative flex flex-col sm:flex-row items-center sm:items-start gap-2.5 p-3.5 sm:p-3 rounded-2xl border transition-all duration-300 cursor-pointer text-center sm:text-left",
                isSelected
                  ? "bg-[var(--background)] border-[var(--primary)] shadow-md shadow-[var(--primary)]/10 text-[var(--on-background)]"
                  : "bg-[var(--surface-container-low)]/80 border-[var(--outline-variant)]/80 text-[var(--on-surface-variant)] hover:border-[var(--primary)]/40 hover:text-[var(--on-background)]"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                  isSelected
                    ? "bg-[var(--primary)] text-[#FAF6F0]"
                    : "bg-[var(--surface-container-high)] text-[var(--primary)] group-hover:scale-110"
                )}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-mono text-xs font-semibold tracking-wide truncate">
                  {skill.shortLabel}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider opacity-60">
                  {skill.category}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Primary Kinetic Name Reveal (Portfolio Editorial Serif) & Delayed Secondary Description */}
      <div className="relative pt-4 sm:pt-6 pb-2 min-h-[140px] sm:min-h-[160px] flex flex-col items-center justify-center text-center overflow-hidden">
        <AnimatePresence mode="wait">
          {activeSkill ? (
            <motion.div
              key={activeSkill.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-center gap-3.5 w-full"
            >
              {/* Primary Kinetic Skill Name (Editorial Serif) */}
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--on-background)] font-normal tracking-tight uppercase leading-tight select-none overflow-hidden">
                {Array.from(activeSkill.name).map((char, charIdx) => (
                  <motion.span
                    key={`${activeSkill.id}-${charIdx}`}
                    variants={letterVariants}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.5,
                      ease: [0.19, 1, 0.22, 1],
                      delay: getLetterDelay(charIdx, activeSkill.name.length),
                    }}
                    className={cn(
                      "inline-block",
                      char === "." && "text-[var(--primary)]"
                    )}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h3>

              {/* Secondary Line: Delayed Architectural Description Reveal */}
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.18 }}
                className="font-sans text-xs sm:text-sm md:text-base text-[var(--on-surface-variant)] max-w-2xl leading-relaxed px-4"
              >
                {activeSkill.description}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-center gap-3.5 w-full"
            >
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--on-background)] font-normal tracking-tight uppercase leading-tight select-none overflow-hidden opacity-90">
                {Array.from(defaultTitle).map((char, charIdx) => (
                  <motion.span
                    key={`default-${charIdx}`}
                    variants={letterVariants}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.5,
                      ease: [0.19, 1, 0.22, 1],
                      delay: getLetterDelay(charIdx, defaultTitle.length),
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[var(--on-surface-variant)] max-w-xl opacity-75 px-4">
                Hover or tap any of the 6 disciplines above to inspect implementation focus &amp; technical craft.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TechStackSpotlight;
