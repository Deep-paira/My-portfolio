"use client";

import * as React from "react";
import { ArrowDownToLine, ArrowUpRight, FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResumeDownloadBlockProps {
  className?: string;
}

/**
 * ResumeDownloadBlock
 * Modern, cardless dual-action resume hub embedded directly into the editorial flow.
 * Features a high-contrast pill download button, live ATS/metadata badge with ping indicator,
 * ghost link for in-browser viewing, and a floating "peek" document preview on desktop hover.
 */
export function ResumeDownloadBlock({ className }: ResumeDownloadBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn("w-full max-w-md mx-auto lg:mx-0 flex flex-col gap-3.5 select-none", className)}>
      
      {/* Primary & Secondary Action Dock */}
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        
        {/* Primary Action: Download Resume Pill with Peek Hover Thumbnail */}
        <div className="relative group flex-1">
          
          {/* Floating Peek Document Preview Thumbnail (Desktop Only) */}
          {!shouldReduceMotion && (
            <motion.div
              className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 p-3.5 rounded-[14px] bg-[#0c0c0e] border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 pointer-events-none transition-all duration-300 origin-bottom z-30"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              {/* Miniature Realistic Document Mockup */}
              <div className="flex flex-col gap-2 font-mono text-[8px] text-neutral-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <div>
                    <span className="block font-bold text-white tracking-wide text-[9px]">DEEP PAIRA</span>
                    <span className="text-[7px] text-[#38BDF8]">FULL-STACK DEVELOPER // BHUBANESWAR</span>
                  </div>
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                </div>

                <div className="space-y-0.5 text-[7px] text-neutral-400 leading-tight">
                  <div className="flex justify-between text-[6.5px] text-neutral-400">
                    <span className="text-white font-medium">ITER, SOA UNIVERSITY</span>
                    <span>CGPA 8.5/10</span>
                  </div>
                  <span className="block text-[6.5px] text-neutral-500">B.Tech in Computer Science &amp; Engineering</span>
                </div>

                <div className="space-y-1 text-[7px] text-neutral-400 leading-tight pt-0.5">
                  <span className="block font-semibold text-neutral-200">PROJECTS</span>
                  <div className="flex flex-wrap gap-1 text-[6.5px]">
                    <span className="px-1 py-0.5 rounded bg-white/10 text-white">MediTrack</span>
                    <span className="px-1 py-0.5 rounded bg-white/10 text-white">PawPlex</span>
                    <span className="px-1 py-0.5 rounded bg-white/10 text-white">ProofTrail</span>
                    <span className="px-1 py-0.5 rounded bg-white/10 text-white">EchoCard</span>
                  </div>
                </div>

                <div className="space-y-1 text-[7px] text-neutral-400 leading-tight pt-0.5">
                  <span className="block font-semibold text-neutral-200">CORE STACK</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-1 py-0.5 rounded bg-[#38BDF8]/15 text-[#38BDF8] text-[6px]">React</span>
                    <span className="px-1 py-0.5 rounded bg-[#38BDF8]/15 text-[#38BDF8] text-[6px]">Next.js</span>
                    <span className="px-1 py-0.5 rounded bg-[#38BDF8]/15 text-[#38BDF8] text-[6px]">Tailwind</span>
                    <span className="px-1 py-0.5 rounded bg-[#38BDF8]/15 text-[#38BDF8] text-[6px]">Django</span>
                    <span className="px-1 py-0.5 rounded bg-[#38BDF8]/15 text-[#38BDF8] text-[6px]">Python</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-white/10 flex justify-between items-center text-[7px] text-neutral-500">
                  <span>96 KB • ATS READY</span>
                  <span className="text-emerald-400">● 2026 CV</span>
                </div>
              </div>

              {/* Tiny triangle point indicator */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0c0c0e] border-r border-b border-white/15 rotate-45" />
            </motion.div>
          )}

          {/* Download Anchor */}
          <a
            href="/resume_deep_after4thsem.pdf"
            download="Deep_Paira_Resume.pdf"
            aria-label="Download Deep Paira's Resume in PDF format"
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.12)] active:scale-[0.98]"
          >
            <ArrowDownToLine className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            <span>Download Resume (PDF)</span>
          </a>
        </div>

        {/* Secondary Action: Ghost Link for In-Browser Viewing */}
        <a
          href="/resume_deep_after4thsem.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Deep Paira's Resume Online in a new tab"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full text-xs font-mono text-[var(--on-surface-variant)] dark:text-neutral-300 hover:text-[var(--on-background)] dark:hover:text-white border border-[var(--outline-variant)] dark:border-white/15 hover:border-[var(--on-background)] dark:hover:border-white/40 transition-all duration-200 group shrink-0"
        >
          <span className="underline-offset-4 group-hover:underline">View Online</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

      </div>

      {/* Lightweight Metadata Tag with Live Ping Indicator */}
      <div className="flex items-center gap-2.5 px-2 text-[11px] font-mono text-[var(--on-surface-variant)] dark:text-neutral-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span>Updated for 2026 • ATS Ready • PDF (94 KB)</span>
      </div>

    </div>
  );
}

export default ResumeDownloadBlock;
