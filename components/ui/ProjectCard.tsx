"use client";

import * as React from "react";
import { Project } from "@/types";
import { Badge } from "./Badge";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const bg = project.bgImage || project.imageUrl || project.image;

  return (
    <>
      <motion.div
        layoutId={`card-container-${project.id}`}
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative flex flex-col justify-between overflow-hidden rounded-[12px] bg-[var(--surface-container-low)] p-6 transition-colors duration-500 hover:bg-[var(--surface-container-high)] min-h-[300px] cursor-pointer",
          project.size === "large" ? "md:col-span-2" : "col-span-1"
        )}
      >
        <div className="absolute inset-0 z-0 border border-outline-variant/10 rounded-[12px] transition-colors duration-500 group-hover:border-primary/50 pointer-events-none"></div>

        {bg && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image 
              src={bg}
              alt={project.title}
              fill
              className="object-cover object-center opacity-30 dark:opacity-20 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-45 dark:group-hover:opacity-35"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Dark contrast overlay layer for high-contrast readable copy */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--surface-container-low)] via-[var(--surface-container-low)]/85 to-[var(--surface-container-low)]/40 pointer-events-none" />
          </div>
        )}

        <motion.div layoutId={`content-${project.id}`} className="relative z-10 flex flex-col h-full gap-4">
          <div className="flex justify-between items-start">
            <motion.span layoutId={`year-${project.id}`} className="text-xs font-mono text-[var(--on-surface-variant)] tracking-widest uppercase">
              {`${project.year || "2025"}${project.subtitle ? ` // ${project.subtitle}` : ""}`}
            </motion.span>
          </div>
          
          <div className="mt-4">
            <motion.h3 layoutId={`title-${project.id}`} className="font-serif text-2xl text-[var(--on-background)] mb-3">{project.title}</motion.h3>
            <motion.p layoutId={`desc-${project.id}`} className="font-sans text-[var(--on-surface-variant)] text-base max-w-md leading-relaxed">{project.description}</motion.p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-auto pt-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-6 right-6 z-10 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-container)] text-[var(--on-primary-container)] shadow-lg hover:scale-105 transition-transform">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md cursor-pointer"
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-12 pointer-events-none">
              <motion.div
                layoutId={`card-container-${project.id}`}
                className="w-full max-w-4xl max-h-[90vh] bg-[var(--surface-container-low)] rounded-[24px] p-8 md:p-16 overflow-y-auto pointer-events-auto flex flex-col relative shadow-2xl border border-outline-variant/15"
              >
                {/* Modal Background Display */}
                {bg && (
                  <div className="absolute inset-0 z-0 h-[450px] opacity-20 pointer-events-none fade-in mask-radial rounded-t-[24px] overflow-hidden">
                    <Image 
                      src={bg}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--surface-container-low)]/50 to-[var(--surface-container-low)]"></div>
                  </div>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[var(--surface-container-high)] flex items-center justify-center text-[var(--on-background)] hover:bg-[var(--outline-variant)]/20 transition-colors z-20"
                >
                  <X className="h-5 w-5" />
                </button>

                <motion.div layoutId={`content-${project.id}`} className="flex flex-col gap-6 max-w-3xl relative z-10">
                  <motion.span layoutId={`year-${project.id}`} className="text-sm font-mono text-[var(--primary)] tracking-widest uppercase">
                    {`${project.year || "2025"} // ${project.subtitle || project.tagline || "CASE STUDY"}`}
                  </motion.span>
                  <motion.h3 layoutId={`title-${project.id}`} className="font-serif text-4xl md:text-5xl text-[var(--on-background)] leading-tight">
                    {project.title}
                  </motion.h3>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>

                  <motion.p layoutId={`desc-${project.id}`} className="font-sans text-[var(--on-surface-variant)] text-xl leading-relaxed mt-6 font-medium">
                    {project.description}
                  </motion.p>
                  
                  {/* Expanded Content Details: Key Architecture & Highlights */}
                  {project.features && project.features.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="mt-8 flex flex-col gap-4 border-t border-outline-variant/20 pt-8"
                    >
                      <h4 className="font-serif text-[var(--on-background)] text-2xl">Key Architecture &amp; Highlights</h4>
                      <ul className="space-y-3">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 font-sans text-base text-[var(--on-surface-variant)] leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Links */}
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="mt-6 pt-6 border-t border-outline-variant/20 flex flex-wrap items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-container-high)] border border-outline-variant/40 text-xs font-mono text-[var(--on-background)] hover:border-primary hover:text-primary transition-colors"
                        >
                          <span>Repository</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== project.githubUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-container)] text-[var(--on-primary-container)] text-xs font-mono hover:opacity-90 transition-opacity"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}

                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
