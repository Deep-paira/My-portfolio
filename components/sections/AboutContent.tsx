import * as React from "react";
import { skills } from "@/data/skills";
import { Badge } from "../ui/Badge";
import Image from "next/image";
import Link from "next/link";

export function AboutContent() {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24">
      <div className="mx-auto w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Left Column - Image */}
        <div className="lg:col-span-5 w-full h-full">
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[24px] bg-[var(--surface-container-low)]">
            <Image 
              src="/deep.jpeg" 
              alt="Deep" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          
          <div className="flex flex-col gap-6">
            <span className="font-mono text-sm tracking-widest uppercase text-[var(--on-surface-variant)]">
              - ABOUT ME
            </span>
            <h2 className="font-serif text-[2.5rem] md:text-[4rem] text-[var(--on-background)] leading-[1.1] tracking-tight">
              I code with precision.<br />I build with empathy.
            </h2>
            <div className="flex flex-col gap-6 font-sans text-xl text-[var(--on-surface-variant)] leading-relaxed mt-4 max-w-2xl">
              <p>
                I&#39;m a Full-Stack Developer focused on creating modern, scalable web applications that respect the user&#39;s time and intelligence. Specializing in the React ecosystem and Django backends, I translate complex technical requirements into fluid, intuitive interfaces.
              </p>
              <p>
                My practice is rooted in systemic thinking. I believe great software isn&#39;t just about what ends up on the screen, but the structural integrity behind it—how a database scales, an API adapts, and an entire application evolves.
              </p>
            </div>
          </div>
          
          {/* Skills and Tools */}
          <div className="flex flex-col gap-6 pt-4 border-t border-[var(--outline-variant)]/20">
            <span className="font-mono text-sm tracking-widest uppercase text-[var(--on-surface-variant)]">
              - SKILLS & TOOLS
            </span>
            <div className="flex flex-wrap gap-3 max-w-2xl">
              {skills.map((skill) => (
                <Badge key={skill.name} variant="outline" className="text-sm px-4 py-2 border-[var(--outline-variant)]/30 hover:border-[var(--primary)]/50 transition-colors">
                  {skill.name.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl">
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-4xl text-[var(--on-background)]">2</h3>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--on-surface-variant)]">YEARS OF PRACTICE</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-4xl text-[var(--on-background)]">10+</h3>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--on-surface-variant)]">PROJECTS COMPLETED</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-4xl text-[var(--on-background)]">∞</h3>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--on-surface-variant)]">LEARNING EVERY DAY</span>
            </div>
          </div>

          {/* Availability Banner */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-[var(--surface-container-low)] p-6 rounded-[16px] max-w-2xl border border-[var(--outline-variant)]/10 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EAB308] animate-pulse"></div>
              <span className="font-sans text-sm text-[var(--on-background)] font-medium">Currently open to full-time & freelance</span>
            </div>
            <Link 
              href="/contact" 
              className="mt-4 sm:mt-0 font-sans text-xs font-semibold tracking-wider text-[var(--on-primary-container)] bg-[var(--primary-container)] px-6 py-3 rounded-full hover:opacity-90 transition-opacity uppercase drop-shadow-md"
            >
              LET&#39;S TALK
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
