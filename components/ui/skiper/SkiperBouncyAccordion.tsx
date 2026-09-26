"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  year?: string;
  accentColor: string;
  accentSoft: string;
  accentBorder: string;
  children: React.ReactNode;
}

interface SkiperBouncyAccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
}

/**
 * SkiperBouncyAccordion
 * Derived from Skiper UI — Skiper 103 "Bouncy accordion" (skiper-ui.com/v1/skiper103).
 * Recreated with Framer Motion spring physics ({ type: "spring", stiffness: 320, damping: 22, bounce: 0.22 }).
 * Features tactile spring-expanded content disclosure and rotating pill toggle indicators,
 * customized for the portfolio's warm editorial aesthetic.
 */
export function SkiperBouncyAccordion({
  items,
  defaultOpenId,
  className,
}: SkiperBouncyAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || items[0]?.id || null);
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 320,
        damping: 24,
        mass: 0.8,
      };

  return (
    <div className={cn("w-full flex flex-col divide-y divide-[var(--outline-variant)]/60 border-y border-[var(--outline-variant)]/60 select-none", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="w-full overflow-hidden transition-colors duration-200">
            {/* Clickable Header Trigger */}
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className={cn(
                "w-full text-left py-5 sm:py-6 px-1 flex items-center justify-between gap-4 group transition-colors",
                isOpen && "bg-[var(--surface-container-low)]/30"
              )}
            >
              <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
                {/* Monospace Catalog Index */}
                <span
                  className="font-mono text-xs sm:text-sm font-semibold tracking-wider shrink-0 transition-colors"
                  style={{ color: item.accentColor }}
                >
                  {item.index}
                </span>

                <div className="flex flex-col min-w-0">
                  <h3 className="font-serif text-xl sm:text-2xl text-[var(--on-background)] font-normal tracking-tight truncate group-hover:text-[var(--primary)] transition-colors">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <span className="font-mono text-[10px] sm:text-[11px] text-[var(--on-surface-variant)] uppercase tracking-wider truncate">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Bouncy Spring Pill Toggle Indicator */}
              <div className="flex items-center gap-3 shrink-0">
                {item.year && (
                  <span className="hidden sm:inline font-mono text-[10px] text-[var(--on-surface-variant)]/70 uppercase tracking-widest">
                    [{item.year}]
                  </span>
                )}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: isOpen ? 1.08 : 1,
                          rotate: isOpen ? 90 : 0,
                        }
                  }
                  transition={springTransition}
                  className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors"
                  style={{
                    backgroundColor: isOpen ? item.accentSoft : "var(--surface-container-high)",
                    borderColor: isOpen ? item.accentBorder : "var(--outline-variant)",
                    color: isOpen ? item.accentColor : "var(--on-surface-variant)",
                  }}
                >
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </motion.div>
              </div>
            </button>

            {/* Bouncy Expanded Drawer */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { height: "auto", opacity: 1 }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={springTransition}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pb-8 px-1">
                    {item.children}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default SkiperBouncyAccordion;
