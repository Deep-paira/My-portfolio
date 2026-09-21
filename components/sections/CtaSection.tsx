"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-[var(--surface-container-low)]/60 border-b border-[var(--outline-variant)]">
      <div className="mx-auto w-full max-w-5xl relative z-10 flex flex-col items-start md:items-center md:text-center">
        
        {/* Editorial Index Marker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[var(--on-surface-variant)] uppercase mb-8"
        >
          <span className="text-[var(--primary)] font-medium">06</span>
          <span className="text-[var(--outline-variant)]">—</span>
          <span>INQUIRIES &amp; COLLABORATION</span>
        </motion.div>

        {/* Generous Editorial Serif Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="font-serif text-[3rem] sm:text-[4.25rem] md:text-[5.5rem] lg:text-[6.2rem] leading-[0.96] tracking-tight text-[var(--on-background)] font-normal mb-8"
        >
          Let&#39;s create something <br />
          <span className="italic font-serif text-[var(--primary)] font-light">timeless</span> together.
        </motion.h2>

        {/* Calm Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="font-sans text-base sm:text-lg text-[var(--on-surface-variant)] max-w-xl leading-relaxed mb-10"
        >
          Available for selected design systems architecture, product overhaul, and tactile digital direction. Let&#39;s discuss your next milestone.
        </motion.p>

        {/* Single Terracotta Action CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-14 px-9 rounded-[12px] bg-[var(--primary)] text-[#FAF6F0] font-sans text-base font-medium tracking-wide transition-all duration-300 hover:bg-[var(--primary-container)] hover:shadow-[0_4px_20px_rgba(196,98,63,0.3)] group"
          >
            <span>Start a conversation</span>
            <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Archival Meta Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 mt-16 pt-8 border-t border-[var(--outline-variant)] w-full max-w-lg text-xs font-mono tracking-widest text-[var(--on-surface-variant)] uppercase"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>Based in India // Worldwide</span>
          </div>
          <span className="hidden sm:inline opacity-40">•</span>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>Replies in 24-48 hours</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
