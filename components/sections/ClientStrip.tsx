"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Server,
  Sparkles,
  Layers,
  Cloud,
  Terminal,
  Cpu,
  Palette,
} from "lucide-react";
import { ProgressiveBlur } from "../ui/ProgressiveBlur";
import { TechStackSpotlight } from "../ui/TechStackSpotlight";

interface SkillItem {
  name: string;
  category: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROW_1_SKILLS: SkillItem[] = [
  { name: "React", category: "Frontend", color: "#C4623F", icon: Code2 },
  { name: "Next.js", category: "Frontend", color: "#C4623F", icon: Cpu },
  { name: "Tailwind CSS", category: "Styling", color: "#C4623F", icon: Palette },
  { name: "Three.js", category: "3D Graphics", color: "#D97754", icon: Sparkles },
  { name: "Framer Motion", category: "Animation", color: "#D97754", icon: Layers },
  { name: "JavaScript (ES6+)", category: "Language", color: "#C4623F", icon: Code2 },
  { name: "Vite", category: "Tooling", color: "#C4623F", icon: Terminal },
  { name: "HTML5 & CSS3", category: "Foundation", color: "#C4623F", icon: Palette },
  { name: "React Hook Form", category: "Frontend", color: "#C4623F", icon: Code2 },
];

const ROW_2_SKILLS: SkillItem[] = [
  { name: "Django", category: "Backend", color: "#B05433", icon: Server },
  { name: "Python", category: "Language", color: "#B05433", icon: Terminal },
  { name: "REST APIs", category: "Architecture", color: "#B05433", icon: Server },
  { name: "Node.js", category: "Runtime", color: "#B05433", icon: Cpu },
  { name: "Figma", category: "UI/UX Design", color: "#6E645E", icon: Palette },
  { name: "Git & GitHub", category: "Version Control", color: "#6E645E", icon: Terminal },
  { name: "Vercel", category: "Edge Cloud", color: "#2E7D47", icon: Cloud },
  { name: "Netlify", category: "Deployment", color: "#2E7D47", icon: Cloud },
  { name: "After Effects", category: "Motion", color: "#D97754", icon: Sparkles },
  { name: "Canva", category: "Design", color: "#6E645E", icon: Palette },
];

export function ClientStrip({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  // 3x duplicate to guarantee seamless infinite loop wrapping
  const row1Tripled = [...ROW_1_SKILLS, ...ROW_1_SKILLS, ...ROW_1_SKILLS];
  const row2Tripled = [...ROW_2_SKILLS, ...ROW_2_SKILLS, ...ROW_2_SKILLS];

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true }}
      className={cn(
        "w-full border-b border-[var(--outline-variant)] relative overflow-hidden py-14 md:py-20 bg-[var(--surface-container-low)]/40",
        className
      )}
    >
      {/* Progressive Blur (Adapted from Skiper UI Skiper 41) for soft edge transitions */}
      <ProgressiveBlur
        position="top"
        height="64px"
        blurAmount="6px"
        backgroundColor="var(--background)"
      />
      <ProgressiveBlur
        position="bottom"
        height="64px"
        blurAmount="6px"
        backgroundColor="var(--background)"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Editorial Section Index */}
        <div className="mb-8 flex items-center justify-between text-xs font-mono tracking-[0.2em] text-[var(--on-surface-variant)] uppercase">
          <div className="flex items-center gap-2.5">
            <span className="text-[var(--primary)] font-medium">02</span>
            <span className="text-[var(--outline-variant)]">—</span>
            <span>TECH STACK &amp; MEDIUMS</span>
          </div>
          <span className="hidden sm:inline-block opacity-60">
            FRONTEND // BACKEND // 3D &amp; CLOUD
          </span>
        </div>

        {/* Dual Row Infinite Marquee with Edge Fade Mask */}
        <div
          className="relative w-full flex flex-col gap-4 overflow-hidden group pb-2"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          }}
        >
          {/* ROW 1: Slides Left-to-Right */}
          <div className="marquee-track marquee-row-1 group-hover:[animation-play-state:paused] will-change-transform py-1">
            {row1Tripled.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`row1-${item.name}-${index}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-[12px] bg-[var(--background)] border border-[var(--outline-variant)]/70 shadow-sm text-[13px] font-sans text-[var(--on-background)] whitespace-nowrap select-none transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-md cursor-default"
                >
                  <div
                    className="w-6 h-6 rounded-[8px] flex items-center justify-center bg-[var(--surface-container-high)] text-[var(--primary)]"
                    style={{ color: item.color }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium tracking-tight">{item.name}</span>
                  <span className="text-[10px] font-mono text-[var(--on-surface-variant)] uppercase opacity-60 ml-0.5">
                    / {item.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ROW 2: Slides Right-to-Left (Opposite Direction) */}
          <div className="marquee-track marquee-row-2 group-hover:[animation-play-state:paused] will-change-transform py-1">
            {row2Tripled.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`row2-${item.name}-${index}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-[12px] bg-[var(--background)] border border-[var(--outline-variant)]/70 shadow-sm text-[13px] font-sans text-[var(--on-background)] whitespace-nowrap select-none transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-md cursor-default"
                >
                  <div
                    className="w-6 h-6 rounded-[8px] flex items-center justify-center bg-[var(--surface-container-high)] text-[var(--primary)]"
                    style={{ color: item.color }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium tracking-tight">{item.name}</span>
                  <span className="text-[10px] font-mono text-[var(--on-surface-variant)] uppercase opacity-60 ml-0.5">
                    / {item.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Discipline Spotlight (Adapted from Skiper UI Skiper 6 "Hover members") */}
        <div className="mt-12 sm:mt-16">
          <TechStackSpotlight />
        </div>
      </div>
    </motion.section>
  );
}

export default ClientStrip;
