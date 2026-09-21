"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BklitGridProps {
  className?: string;
  variant?: "dots" | "grid" | "cross";
  size?: number;
  glow?: boolean;
}

export function BklitGrid({
  className,
  variant = "dots",
  size = 28,
  glow = true,
}: BklitGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Background Grid Pattern */}
      {variant === "dots" && (
        <div
          className="absolute inset-0 h-full w-full opacity-35 dark:opacity-25"
          style={{
            backgroundImage: `radial-gradient(var(--outline-variant) 1px, transparent 1px)`,
            backgroundSize: `${size}px ${size}px`,
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      )}

      {variant === "grid" && (
        <div
          className="absolute inset-0 h-full w-full opacity-25 dark:opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, var(--outline-variant) 1px, transparent 1px), linear-gradient(to bottom, var(--outline-variant) 1px, transparent 1px)`,
            backgroundSize: `${size}px ${size}px`,
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
      )}

      {variant === "cross" && (
        <div
          className="absolute inset-0 h-full w-full opacity-30 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(var(--outline-variant) 1px, transparent 0)`,
            backgroundSize: `${size}px ${size}px`,
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
      )}

      {/* Subtle Ambient Radial Glow */}
      {glow && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[650px] rounded-full bg-primary/10 blur-[130px] -z-10"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
