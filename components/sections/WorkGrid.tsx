"use client";

import * as React from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const filters = ["ALL", "PRODUCT DESIGN", "DESIGN SYSTEMS", "MOBILE", "WEB", "BRANDING"];

export function WorkGrid() {
  const [activeFilter, setActiveFilter] = React.useState("ALL");

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-24">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-sm tracking-widest uppercase text-[var(--on-surface-variant)]">
              - SELECTED WORK
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="font-serif text-[3.5rem] md:text-[5rem] lg:text-[6rem] text-[var(--on-background)] leading-[0.9] tracking-tight">
                Things I've<br/>Designed
              </h2>
              <span className="font-mono text-sm text-[var(--on-surface-variant)] tracking-widest md:mb-4">
                2021 — 2025
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--outline-variant)]/20">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "font-sans text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-300",
                  activeFilter === filter 
                    ? "bg-[#C8BFFF] text-[#131313]" // Light purple solid for active state mimicking the screenshot
                    : "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] hover:bg-[var(--outline-variant)]/20 shadow-sm"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[minmax(350px,auto)]">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
