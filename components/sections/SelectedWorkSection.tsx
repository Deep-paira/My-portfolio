"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, X, Code2, Globe, Terminal, Layers } from "lucide-react";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

// Skiper UI Integrations
import { SkiperClipMask } from "../ui/skiper/SkiperClipMask";
import { SkiperParallaxImage } from "../ui/skiper/SkiperParallaxImage";
import { SkiperProgressiveBlur } from "../ui/skiper/SkiperProgressiveBlur";
import { SkiperBouncyAccordion, AccordionItemData } from "../ui/skiper/SkiperBouncyAccordion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

const filters = [
  "ALL",
  "REACT",
  "PYTHON",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "DJANGO",
];

export interface ProjectTheme {
  index: string;
  category: string;
  accent: {
    name: string;
    primary: string;
    soft: string;
    border: string;
    glow: string;
  };
  metrics?: { label: string; value: string };
}

export const PROJECT_THEMES: Record<string, ProjectTheme> = {
  meditrack: {
    index: "01",
    category: "HEALTH INFORMATICS // GEOSPATIAL",
    accent: {
      name: "Terracotta Rust",
      primary: "#C2593F",
      soft: "rgba(194, 89, 63, 0.10)",
      border: "rgba(194, 89, 63, 0.35)",
      glow: "rgba(194, 89, 63, 0.22)",
    },
    metrics: { label: "TRIAGED ROLES", value: "5 Staff Tiers" },
  },
  pawplex: {
    index: "02",
    category: "VETERINARY DASHBOARD // OPERATIONS",
    accent: {
      name: "Warm Amber",
      primary: "#D97706",
      soft: "rgba(217, 119, 6, 0.10)",
      border: "rgba(217, 119, 6, 0.35)",
      glow: "rgba(217, 119, 6, 0.22)",
    },
    metrics: { label: "STATE ARCHITECTURE", value: "Zustand + Recharts" },
  },
  prooftrail: {
    index: "03",
    category: "DIGITAL SKILL PASSPORT // VERIFIED CREDENTIALS",
    accent: {
      name: "Amber Ochre",
      primary: "#B7863A",
      soft: "rgba(183, 134, 58, 0.12)",
      border: "rgba(183, 134, 58, 0.35)",
      glow: "rgba(183, 134, 58, 0.22)",
    },
    metrics: { label: "NATIONAL HACKATHON", value: "Smart India Hackathon 2026" },
  },
  echocard: {
    index: "04",
    category: "AI LEARNING // GROQ LPU & 3D FLIP",
    accent: {
      name: "Verdigris Teal",
      primary: "#0D9488",
      soft: "rgba(13, 148, 136, 0.10)",
      border: "rgba(13, 148, 136, 0.35)",
      glow: "rgba(13, 148, 136, 0.22)",
    },
    metrics: { label: "INFERENCE ACCEL", value: "Groq LPU Engine" },
  },
};

export function SelectedWorkSection() {
  const [activeFilter, setActiveFilter] = React.useState("ALL");
  const [activeProjectIndex, setActiveProjectIndex] = React.useState(0);
  const [selectedModalProject, setSelectedModalProject] = React.useState<Project | null>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (selectedModalProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedModalProject]);

  const filteredProjects = React.useMemo(() => {
    if (activeFilter === "ALL") return projects;
    return projects.filter((p) =>
      p.tags.some((tag) => tag.toUpperCase().includes(activeFilter))
    );
  }, [activeFilter]);

  // Ensure active index is within bounds of filtered items
  const safeActiveIndex = Math.min(activeProjectIndex, Math.max(0, filteredProjects.length - 1));
  const activeProject = filteredProjects[safeActiveIndex] || projects[0];
  const activeTheme = PROJECT_THEMES[activeProject?.id] || PROJECT_THEMES.meditrack;
  const activeImg = activeProject.bgImage || activeProject.imageUrl || activeProject.image || "";

  // Prepare data for Mobile Skiper 103 Bouncy Accordion
  const accordionItems: AccordionItemData[] = React.useMemo(() => {
    return filteredProjects.map((proj) => {
      const theme = PROJECT_THEMES[proj.id] || PROJECT_THEMES.meditrack;
      const img = proj.bgImage || proj.imageUrl || proj.image || "";

      return {
        id: proj.id,
        index: theme.index,
        title: proj.title,
        subtitle: proj.subtitle,
        year: proj.year,
        accentColor: theme.accent.primary,
        accentSoft: theme.accent.soft,
        accentBorder: theme.accent.border,
        children: (
          <div className="flex flex-col gap-5 pt-2">
            {/* Project Image Frame with SkiperParallaxImage */}
            <div className="relative rounded-[16px] overflow-hidden border border-[var(--outline-variant)]/60 shadow-md">
              <SkiperParallaxImage
                src={img}
                alt={proj.title}
                aspectRatio="aspect-[16/10]"
                accentColor={theme.accent.primary}
                projectId={proj.id}
              />
              <SkiperProgressiveBlur
                position="bottom"
                height="60px"
                accentColor={theme.accent.primary}
              />
            </div>

            {/* Supporting Philosophy Quote */}
            {proj.quote && (
              <div className="p-3 rounded-xl bg-[var(--surface-container)]/80 border-l-2 border-[#B7863A] text-xs font-serif italic text-[var(--on-surface)]">
                “{proj.quote}”
              </div>
            )}

            {/* Description & Metrics */}
            <p className="font-sans text-sm text-[var(--on-surface-variant)] leading-relaxed">
              {proj.description}
            </p>

            {/* Key Highlights */}
            {proj.features && proj.features.length > 0 && (
              <div className="flex flex-col gap-2 pt-2 border-t border-[var(--outline-variant)]/40">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--on-surface-variant)]/80">
                  SYSTEM HIGHLIGHTS:
                </span>
                <ul className="space-y-1.5">
                  {proj.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--on-surface-variant)]">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: theme.accent.primary }}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "px-2.5 py-1 rounded-[6px] text-[10px] font-mono tracking-wider border",
                    tag === "SIH 2026"
                      ? "bg-[#B7863A]/20 text-[#B7863A] dark:text-[#E5B56E] border-[#B7863A]/50 font-semibold inline-flex items-center gap-1 shadow-xs"
                      : "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] border-[var(--outline-variant)]/60"
                  )}
                >
                  {tag === "SIH 2026" && <span className="w-1.5 h-1.5 rounded-full bg-[#B7863A] animate-pulse" />}
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-[var(--outline-variant)]/40">
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--on-background)] text-[var(--background)] font-mono text-[11px] uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Repository</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </a>
              )}
              {proj.liveUrl && proj.liveUrl !== proj.githubUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--surface-container-high)] border border-[var(--outline-variant)] text-[var(--on-background)] font-mono text-[11px] uppercase tracking-wider hover:border-[var(--on-background)] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelectedModalProject(proj)}
                className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--on-surface-variant)] hover:text-[var(--primary)] underline underline-offset-4 ml-auto py-2"
              >
                <span>Full Specs ↗</span>
              </button>
            </div>
          </div>
        ),
      };
    });
  }, [filteredProjects]);

  return (
    <section
      id="selected-work"
      className="relative w-full py-20 sm:py-28 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden border-b border-[var(--outline-variant)] bg-[var(--background)]"
    >
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Section Editorial Header */}
        <div className="mb-12 sm:mb-16 flex flex-col gap-6">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[var(--on-surface-variant)] uppercase"
          >
            <span className="text-[var(--primary)] font-medium">05</span>
            <span className="text-[var(--outline-variant)]">—</span>
            <span>SELECTED ARCHIVE</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASE }}
              viewport={{ once: true }}
              className="font-serif text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem] text-[var(--on-background)] leading-[1.0] tracking-tight font-normal"
            >
              Recent design &amp; <br />
              <span className="italic text-[var(--primary)] font-serif font-light">case studies</span>
            </motion.h2>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASE }}
              viewport={{ once: true }}
              className="flex items-center gap-5 sm:gap-6"
            >
              <span className="font-mono text-xs text-[var(--on-surface-variant)] tracking-widest uppercase hidden sm:inline">
                INDEX 2024 — 2026 // 4 PLATFORMS
              </span>
              <Button variant="secondary" size="sm" href="/work" className="group rounded-[8px]">
                Full Archive
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Warm Paper Filter Pills */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: LUXURY_EASE }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-2 pt-6 border-t border-[var(--outline-variant)]/80 mt-2"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  setActiveProjectIndex(0);
                }}
                className={cn(
                  "font-sans text-[11px] font-medium tracking-wider uppercase px-4 py-1.5 rounded-full transition-all duration-200",
                  activeFilter === filter
                    ? "bg-[var(--primary)] text-[#FAF6F0] shadow-xs"
                    : "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] border border-[var(--outline-variant)]/60 hover:text-[var(--on-background)] hover:border-[var(--outline-variant)]"
                )}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* DESKTOP SPLIT-STAGE SHOWCASE (7:5 Asymmetric Grid) — lg and above */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* LEFT: 7-Column Showcase Stage with Skiper Parallax, SVG Mask & Progressive Blur */}
          <div className="lg:col-span-7 xl:col-span-7 sticky top-28">
            <div className="relative">
              
              {/* Dynamic Radial Ambient Backlight in Active Project Accent Color */}
              <div
                className="absolute -inset-4 rounded-3xl blur-3xl opacity-60 transition-all duration-700 pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${activeTheme.accent.glow} 0%, transparent 70%)`,
                }}
              />

              {/* Showcase Container Frame with SkiperClipMask (Skiper 66 SVG mask) */}
              <div className="relative rounded-[22px] overflow-hidden border border-[var(--outline-variant)]/80 bg-[var(--surface-container-low)] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                
                {/* SkiperClipMask geometric cut container */}
                <SkiperClipMask id="showcase-svg-mask" enabled={!shouldReduceMotion} className="w-full">
                  {/* Skiper 55 (Parallax Image) + Skiper 71 (Image Reveal) */}
                  <SkiperParallaxImage
                    src={activeImg}
                    alt={activeProject.title}
                    aspectRatio="aspect-[16/10]"
                    parallaxSpeed={5}
                    accentColor={activeTheme.accent.primary}
                    projectId={activeProject.id}
                    priority
                  />
                </SkiperClipMask>

                {/* Skiper 41 (Progressive Blur) at the bottom edge */}
                <SkiperProgressiveBlur
                  position="bottom"
                  height="90px"
                  blurAmount="8px"
                  accentColor={activeTheme.accent.primary}
                />

                {/* Top Corner Floating Badges */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono tracking-widest uppercase shadow-xs pointer-events-auto"
                    style={{
                      backgroundColor: "rgba(18, 16, 15, 0.75)",
                      borderColor: activeTheme.accent.border,
                      color: "#FAF6F0",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: activeTheme.accent.primary }}
                    />
                    <span>{activeTheme.category}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedModalProject(activeProject)}
                    className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                    aria-label={`Open technical case study for ${activeProject.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Active Project Technical Dossier Under the Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: LUXURY_EASE }}
                    className="p-7 sm:p-8 flex flex-col gap-4 relative z-20 bg-[var(--surface-container-low)]/90 backdrop-blur-sm border-t border-[var(--outline-variant)]/60"
                  >
                    {/* Catalog Index & Subtitle */}
                    <div className="flex items-center justify-between text-xs font-mono tracking-wider">
                      <span className="font-semibold" style={{ color: activeTheme.accent.primary }}>
                        {activeTheme.index} // {activeProject.subtitle}
                      </span>
                      <span className="text-[var(--on-surface-variant)]/70 uppercase">
                        [{activeProject.year || "2025"}]
                      </span>
                    </div>

                    {/* Headline Title */}
                    <h3 className="font-serif text-3xl xl:text-4xl text-[var(--on-background)] font-normal tracking-tight">
                      {activeProject.title}
                    </h3>

                    {/* Supporting Philosophy Quote */}
                    {activeProject.quote && (
                      <div className="p-3.5 rounded-xl bg-[var(--background)]/80 border-l-2 border-[#B7863A] border border-[var(--outline-variant)]/40 shadow-xs flex items-center gap-3">
                        <span className="font-serif text-2xl text-[#B7863A] leading-none shrink-0 select-none">“</span>
                        <p className="font-serif italic text-xs xl:text-sm text-[var(--on-surface)] leading-relaxed">
                          {activeProject.quote}
                        </p>
                      </div>
                    )}

                    {/* Description */}
                    <p className="font-sans text-sm xl:text-base text-[var(--on-surface-variant)] leading-relaxed">
                      {activeProject.description}
                    </p>

                    {/* Architecture Bullet Highlights */}
                    {activeProject.features && activeProject.features.length > 0 && (
                      <div className="pt-2 flex flex-col gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)]/80">
                          KEY ARCHITECTURAL HIGHLIGHTS:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activeProject.features.slice(0, 5).map((feat, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 p-2.5 rounded-[10px] bg-[var(--background)]/60 border border-[var(--outline-variant)]/50 text-xs font-sans text-[var(--on-surface-variant)] leading-snug"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-sm mt-1 shrink-0"
                                style={{ backgroundColor: activeTheme.accent.primary }}
                              />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {activeProject.tags.map((tag, idx) => (
                        <span
                          key={tag}
                          className={cn(
                            "px-2.5 py-1 rounded-[6px] text-[11px] font-mono tracking-wider border transition-colors",
                            tag === "SIH 2026"
                              ? "bg-[#B7863A]/20 text-[#B7863A] dark:text-[#E5B56E] border-[#B7863A]/50 font-semibold inline-flex items-center gap-1.5 shadow-xs"
                              : "bg-[var(--background)] text-[var(--on-surface-variant)] border-[var(--outline-variant)]/60"
                          )}
                          style={
                            tag !== "SIH 2026" && idx === 0
                              ? {
                                  borderColor: activeTheme.accent.border,
                                  color: activeTheme.accent.primary,
                                }
                              : undefined
                          }
                        >
                          {tag === "SIH 2026" && <span className="w-1.5 h-1.5 rounded-full bg-[#B7863A] animate-pulse" />}
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Direct Action CTAs Dock */}
                    <div className="mt-2 pt-4 border-t border-[var(--outline-variant)]/60 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {activeProject.githubUrl && (
                          <a
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--on-background)] text-[var(--background)] font-mono text-xs uppercase tracking-wider hover:opacity-90 transition-all duration-200 shadow-xs"
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Repository</span>
                            <ArrowUpRight className="w-3 h-3 opacity-70" />
                          </a>
                        )}

                        {activeProject.liveUrl && activeProject.liveUrl !== activeProject.githubUrl && (
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface-container-high)] border border-[var(--outline-variant)] text-[var(--on-background)] font-mono text-xs uppercase tracking-wider hover:border-[var(--on-background)] transition-colors"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedModalProject(activeProject)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--on-surface-variant)] hover:text-[var(--primary)] underline underline-offset-4 transition-colors"
                      >
                        <span>Deep Architecture Specs</span>
                      </button>
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>
            </div>
          </div>

          {/* RIGHT: 5-Column Editorial Index Directory with Skiper 53 (ExpandOnHover vertical) */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
            <div className="pb-4 mb-2 flex items-center justify-between border-b border-[var(--outline-variant)]/60">
              <span className="font-mono text-xs text-[var(--on-surface-variant)] tracking-widest uppercase">
                DIRECTORY // 0{filteredProjects.length} BUILDS
              </span>
              <span className="font-mono text-[11px] text-[var(--on-surface-variant)]/70 uppercase">
                HOVER TO EXPLORE
              </span>
            </div>

            {/* Vertical Hairline List using Skiper 53 ExpandOnHover mechanics */}
            <div className="flex flex-col divide-y divide-[var(--outline-variant)]/60 border-b border-[var(--outline-variant)]/60">
              {filteredProjects.map((project, index) => {
                const isSelected = safeActiveIndex === index;
                const theme = PROJECT_THEMES[project.id] || PROJECT_THEMES.meditrack;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    onClick={() => setActiveProjectIndex(index)}
                    onMouseEnter={() => setActiveProjectIndex(index)}
                    className={cn(
                      "group relative py-6 px-4 cursor-pointer transition-all duration-300 rounded-[14px]",
                      isSelected
                        ? "bg-[var(--surface-container-low)]/80"
                        : "hover:bg-[var(--surface-container-low)]/40"
                    )}
                  >
                    {/* Gliding Active Indicator Bar */}
                    {isSelected && (
                      <motion.div
                        layoutId="active-project-bar"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                        style={{ backgroundColor: theme.accent.primary }}
                      />
                    )}

                    <div className="flex items-start justify-between gap-4">
                      
                      <div className="flex flex-col gap-1.5">
                        {/* Monospace Index & Category */}
                        <div className="flex items-center gap-3 font-mono text-xs tracking-wider">
                          <span
                            className="font-semibold transition-colors duration-200"
                            style={{ color: isSelected ? theme.accent.primary : "var(--on-surface-variant)" }}
                          >
                            {theme.index}
                          </span>
                          <span className="text-[var(--outline-variant)]">—</span>
                          <span className="text-[var(--on-surface-variant)]/70 uppercase text-[10px]">
                            {project.year || "2025"}
                          </span>
                        </div>

                        {/* Large Serif Title */}
                        <h3
                          className={cn(
                            "font-serif text-2xl xl:text-3xl tracking-tight transition-colors duration-200",
                            isSelected
                              ? "text-[var(--on-background)] font-medium"
                              : "text-[var(--on-surface-variant)] group-hover:text-[var(--on-background)]"
                          )}
                        >
                          {project.title}
                        </h3>

                        {/* Subtitle / Domain Label */}
                        <p className="font-mono text-xs text-[var(--on-surface-variant)] tracking-wide">
                          {project.subtitle}
                        </p>

                        {/* Skiper 53 Expand-on-hover reveals primary tags when row is active */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: LUXURY_EASE }}
                              className="pt-2 flex flex-wrap gap-1.5 overflow-hidden"
                            >
                              {project.tags.slice(0, 4).map((t) => (
                                <span
                                  key={t}
                                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--background)] text-[var(--on-surface-variant)] border border-[var(--outline-variant)]/50"
                                >
                                  {t}
                                </span>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Right Arrow / Inspect Indicator */}
                      <div
                        className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0",
                          isSelected
                            ? "border-transparent text-white"
                            : "border-[var(--outline-variant)]/60 text-[var(--on-surface-variant)] group-hover:border-[var(--outline-variant)]"
                        )}
                        style={
                          isSelected
                            ? { backgroundColor: theme.accent.primary }
                            : undefined
                        }
                      >
                        <ArrowRight
                          className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            isSelected ? "translate-x-0.5" : "group-hover:translate-x-0.5"
                          )}
                        />
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* MOBILE & TABLET ACCORDION VIEW — Skiper 103 (Bouncy Accordion)     */}
        {/* ------------------------------------------------------------------ */}
        <div className="block lg:hidden mt-4">
          <SkiperBouncyAccordion
            items={accordionItems}
            defaultOpenId={filteredProjects[0]?.id}
          />
        </div>

      </div>

      {/* Case Study Deep-Dive Modal (Preserved & Enhanced) */}
      <AnimatePresence>
        {selectedModalProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalProject(null)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md cursor-pointer"
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 25 }}
                transition={{ duration: 0.35, ease: LUXURY_EASE }}
                className="w-full max-w-4xl max-h-[90vh] bg-[var(--background)] rounded-[22px] p-6 sm:p-10 md:p-12 overflow-y-auto pointer-events-auto flex flex-col relative shadow-2xl border border-[var(--outline-variant)] select-none"
              >
                {/* Image Banner */}
                {(selectedModalProject.bgImage || selectedModalProject.imageUrl || selectedModalProject.image) && (
                  <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] rounded-[14px] overflow-hidden mb-8 border border-[var(--outline-variant)]/60">
                    <Image
                      src={selectedModalProject.bgImage || selectedModalProject.imageUrl || selectedModalProject.image || ""}
                      alt={selectedModalProject.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 900px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedModalProject(null)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] flex items-center justify-center text-[var(--on-background)] hover:border-[var(--primary)] transition-colors z-20"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Modal Content */}
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-xs text-[var(--primary)] tracking-widest uppercase">
                    {`${selectedModalProject.year || "2025"} // ${selectedModalProject.subtitle || selectedModalProject.tagline || "TECHNICAL CASE STUDY"}`}
                  </span>
                  
                  <h3 className="font-serif text-3xl md:text-4xl text-[var(--on-background)]">
                    {selectedModalProject.title}
                  </h3>

                  {selectedModalProject.id === "prooftrail" && (
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#B7863A]/10 border border-[#B7863A]/30 text-xs font-mono text-[#B7863A] dark:text-[#E5B56E] w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B7863A] animate-pulse" />
                      <span>SMART INDIA HACKATHON (SIH 2026) // EDUCATION &amp; SKILL DEVELOPMENT TRACK</span>
                    </div>
                  )}

                  {selectedModalProject.quote && (
                    <blockquote className="p-4 rounded-xl bg-[var(--surface-container)] border-l-4 border-[#B7863A] my-1 text-sm md:text-base italic font-serif text-[var(--on-surface)] leading-relaxed">
                      “{selectedModalProject.quote}”
                      <footer className="text-xs font-mono font-normal not-italic text-[var(--on-surface-variant)] mt-1.5 uppercase tracking-wider">
                        — ProofTrail Core Philosophy // SIH 2026
                      </footer>
                    </blockquote>
                  )}

                  <div className="flex flex-wrap gap-2 my-1">
                    {selectedModalProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "px-3 py-1 rounded-[6px] text-xs font-mono tracking-wider border",
                          tag === "SIH 2026"
                            ? "bg-[#B7863A]/20 text-[#B7863A] dark:text-[#E5B56E] border-[#B7863A]/50 font-semibold inline-flex items-center gap-1.5 shadow-xs"
                            : "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] border-[var(--outline-variant)]"
                        )}
                      >
                        {tag === "SIH 2026" && <span className="w-1.5 h-1.5 rounded-full bg-[#B7863A] animate-pulse" />}
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="font-sans text-[var(--on-surface-variant)] text-base md:text-lg leading-relaxed mt-2">
                    {selectedModalProject.description}
                  </p>

                  {/* Architecture Highlights */}
                  {selectedModalProject.features && selectedModalProject.features.length > 0 && (
                    <div className="mt-8 flex flex-col gap-4 border-t border-[var(--outline-variant)] pt-6">
                      <h4 className="font-serif text-xl sm:text-2xl text-[var(--on-background)]">
                        Key Architecture &amp; System Highlights
                      </h4>
                      <ul className="space-y-3">
                        {selectedModalProject.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 font-sans text-sm md:text-base text-[var(--on-surface-variant)] leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Links Dock */}
                  {(selectedModalProject.githubUrl || selectedModalProject.liveUrl) && (
                    <div className="mt-8 pt-6 border-t border-[var(--outline-variant)]/60 flex flex-wrap items-center gap-3">
                      {selectedModalProject.githubUrl && (
                        <a
                          href={selectedModalProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] text-xs font-mono text-[var(--on-background)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span>View Code Repository</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {selectedModalProject.liveUrl && selectedModalProject.liveUrl !== selectedModalProject.githubUrl && (
                        <a
                          href={selectedModalProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--primary)] text-[#FAF6F0] text-xs font-mono hover:opacity-90 transition-opacity"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Open Live Deployment</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default SelectedWorkSection;
