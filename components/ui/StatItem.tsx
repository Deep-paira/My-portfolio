"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "./AnimatedNumber";

export interface StatItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  sublabel?: string;
  duration?: number;
}

/**
 * StatItem
 * Renders an architectural metric card with Skiper 37 animated number counter.
 * Automatically parses prefix, target number, and suffix (e.g., "99.8%", "15+", "200+").
 */
export function StatItem({
  value,
  label,
  sublabel,
  duration = 1.4,
  className,
  ...props
}: StatItemProps) {
  // Parse numeric and symbol components if passed as a string like "99.8%" or "200+"
  const parsed = React.useMemo(() => {
    if (typeof value === "number") {
      return { num: value, prefix: "", suffix: "" };
    }
    const match = value.match(/^([^0-9.-]*)([0-9.-]+)(.*)$/);
    if (match) {
      return {
        prefix: match[1] || "",
        num: parseFloat(match[2]),
        suffix: match[3] || "",
      };
    }
    return null;
  }, [value]);

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 p-4 rounded-2xl bg-[var(--surface-container-low)]/50 border border-[var(--outline-variant)]/60 transition-all duration-300 hover:border-[var(--primary)]/40 hover:bg-[var(--surface-container-low)]/80",
        className
      )}
      {...props}
    >
      <span className="font-serif text-3xl sm:text-4xl text-[var(--on-background)] font-medium tracking-tight">
        {parsed ? (
          <AnimatedNumber
            value={parsed.num}
            prefix={parsed.prefix}
            suffix={parsed.suffix}
            duration={duration}
          />
        ) : (
          value
        )}
      </span>
      <span className="font-sans text-xs sm:text-sm font-medium text-[var(--on-surface-variant)] leading-snug">
        {label}
      </span>
      {sublabel && (
        <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--primary)] font-semibold">
          {sublabel}
        </span>
      )}
    </div>
  );
}

export default StatItem;
