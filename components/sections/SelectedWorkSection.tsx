"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { Card } from "../ui/card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

const filters = [
  "ALL",
  "REACT",
  "PYTHON",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "DJANGO",
];

export function SelectedWorkSection() {
  const [activeFilter, setActiveFilter] = React.useState("ALL");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  const filteredProjects = React.useMemo(() => {
    if (activeFilter === "ALL") return projects;
    return projects.filter((p) =>
      p.tags.some((tag) => tag.toUpperCase().includes(activeFilter))
    );
  }, [activeFilter]);

  return (
    <section
      id="selected-work"
      className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden border-b border-[var(--outline-variant)] bg-[var(--background)]"
    >
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Header Block with Hand-crafted Editorial Index */}
        <div className="mb-14 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[var(--on-surface-variant)] uppercase"
          >
            <span className="text-[var(--primary)] font-medium">05</span>
            <span className="text-[var(--outline-variant)]">—</span>
            <span>SELECTED ARCHIVE</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="font-serif text-[3rem] sm:text-[4rem] md:text-[4.75rem] text-[var(--on-background)] leading-[0.98] tracking-tight font-normal"
            >
              Recent design &amp; <br />
              <span className="italic text-[var(--primary)] font-serif font-light">case studies</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <span className="font-mono text-xs text-[var(--on-surface-variant)] tracking-widest uppercase">
                INDEX 2024 — 2026
              </span>
              <Button variant="secondary" size="sm" href="/work" className="group rounded-[8px]">
                Full Archive
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Restrained Filter Pills (Warm Paper Aesthetic) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-2 pt-6 border-t border-[var(--outline-variant)]/80 mt-2"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "font-sans text-[11px] font-medium tracking-wider uppercase px-4 py-1.5 rounded-full transition-all duration-200",
                  activeFilter === filter
                    ? "bg-[var(--primary)] text-[#FAF6F0]"
                    : "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] border border-[var(--outline-variant)]/60 hover:text-[var(--on-background)] hover:border-[var(--outline-variant)]"
                )}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(420px,auto)]">
          {filteredProjects.map((project, index) => {
            // Asymmetric rhythm: 8/4 then 5/7 column arrangement
            const colSpan =
              index % 4 === 0
                ? "md:col-span-8"
                : index % 4 === 1
                ? "md:col-span-4"
                : index % 4 === 2
                ? "md:col-span-5"
                : "md:col-span-7";

            const cardBgImage = project.bgImage || project.imageUrl || project.image;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className={colSpan}
              >
                <Card
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[18px] bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/70 p-7 sm:p-8 transition-all duration-400 hover:border-[var(--primary)]/50 hover:shadow-[0_8px_30px_rgba(42,36,33,0.06)] cursor-pointer h-full min-h-[420px]"
                >
                  {/* Dedicated High-Resolution Background Imagery with Dark-Mode Overlay Masking */}
                  {cardBgImage && (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <Image
                        src={cardBgImage}
                        alt={project.title}
                        fill
                        className="object-cover object-center opacity-30 dark:opacity-20 transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-50 dark:group-hover:opacity-40"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Dark contrast overlay layer for high-contrast readable copy */}
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--surface-container-low)] via-[var(--surface-container-low)]/85 to-[var(--surface-container-low)]/40 pointer-events-none" />
                    </div>
                  )}

                  {/* Top Metadata Plate */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-widest text-[var(--on-surface-variant)] uppercase group-hover:text-[var(--primary)] transition-colors">
                      {`${project.year || "2025"}${project.subtitle ? ` // ${project.subtitle}` : ` // ${project.tags[0]}`}`}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--background)] border border-[var(--outline-variant)]/80 text-[var(--on-background)] transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-[#FAF6F0] group-hover:border-[var(--primary)]">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="relative z-10 mt-auto pt-16 flex flex-col gap-3">
                    <h3 className="font-serif text-2xl sm:text-3xl text-[var(--on-background)] tracking-tight group-hover:text-[var(--primary)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-[var(--on-surface-variant)] line-clamp-2 max-w-md leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-[6px] text-[11px] font-mono tracking-wider bg-[var(--background)] text-[var(--on-surface-variant)] border border-[var(--outline-variant)]/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal (Preserved interactive experience) */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[60] bg-[#221E1C]/60 backdrop-blur-sm cursor-pointer"
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 25 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-4xl max-h-[90vh] bg-[var(--background)] rounded-[20px] p-7 md:p-12 overflow-y-auto pointer-events-auto flex flex-col relative shadow-2xl border border-[var(--outline-variant)]"
              >
                {(selectedProject.bgImage || selectedProject.imageUrl || selectedProject.image) && (
                  <div className="relative w-full h-[260px] md:h-[360px] rounded-[14px] overflow-hidden mb-8 border border-[var(--outline-variant)]/60">
                    <Image
                      src={selectedProject.bgImage || selectedProject.imageUrl || selectedProject.image || ""}
                      alt={selectedProject.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 900px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] flex items-center justify-center text-[var(--on-background)] hover:border-[var(--primary)] transition-colors z-20"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex flex-col gap-4">
                  <span className="font-mono text-xs text-[var(--primary)] tracking-widest uppercase">
                    {`${selectedProject.year || "2025"} // ${selectedProject.subtitle || selectedProject.tagline || "CASE STUDY"}`}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-[var(--on-background)]">
                    {selectedProject.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 my-2">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-[var(--outline-variant)]">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="font-sans text-[var(--on-surface-variant)] text-base md:text-lg leading-relaxed mt-2">
                    {selectedProject.description}
                  </p>

                  {/* Key Highlights & Architecture Features */}
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div className="mt-8 flex flex-col gap-4 border-t border-[var(--outline-variant)] pt-6">
                      <h4 className="font-serif text-xl text-[var(--on-background)]">
                        Key Architecture &amp; Highlights
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedProject.features.map((feature, idx) => (
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

                  {/* Action Links */}
                  {(selectedProject.githubUrl || selectedProject.liveUrl) && (
                    <div className="mt-6 pt-6 border-t border-[var(--outline-variant)]/60 flex flex-wrap items-center gap-3">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] text-xs font-mono text-[var(--on-background)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                        >
                          <span>Repository</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {selectedProject.liveUrl && selectedProject.liveUrl !== selectedProject.githubUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)] text-[#FAF6F0] text-xs font-mono hover:opacity-90 transition-opacity"
                        >
                          <span>Live Demo</span>
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
