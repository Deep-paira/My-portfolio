"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkiperProgressiveBlurProps {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom" | "both";
  height?: string;
  blurAmount?: string;
  accentColor?: string;
}

/**
 * SkiperProgressiveBlur
 * Derived from Skiper UI — Skiper 41 "Progressive Blur" (skiper-ui.com/v1/skiper41).
 * Recreated from official Skiper UI shadcn registry schema (/r/skiper41.json).
 * Creates a high-end cinematic progressive blur and soft gradient vignette at the edges
 * of containers, dynamically tinted with the active project's warm palette accent.
 */
export function SkiperProgressiveBlur({
  className = "",
  backgroundColor = "var(--background)",
  position = "bottom",
  height = "100px",
  blurAmount = "6px",
  accentColor,
}: SkiperProgressiveBlurProps) {
  const renderEdge = (pos: "top" | "bottom") => {
    const isTop = pos === "top";
    return (
      <div
        key={pos}
        aria-hidden="true"
        className={cn("pointer-events-none absolute left-0 w-full select-none z-10", className)}
        style={{
          [isTop ? "top" : "bottom"]: 0,
          height,
          background: isTop
            ? `linear-gradient(to top, transparent, ${backgroundColor})`
            : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
          maskImage: isTop
            ? `linear-gradient(to bottom, ${backgroundColor} 45%, transparent)`
            : `linear-gradient(to top, ${backgroundColor} 45%, transparent)`,
          WebkitBackdropFilter: `blur(${blurAmount})`,
          backdropFilter: `blur(${blurAmount})`,
        }}
      >
        {accentColor && (
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: isTop
                ? `linear-gradient(to top, transparent, ${accentColor})`
                : `linear-gradient(to bottom, transparent, ${accentColor})`,
            }}
          />
        )}
      </div>
    );
  };

  if (position === "both") {
    return (
      <>
        {renderEdge("top")}
        {renderEdge("bottom")}
      </>
    );
  }

  return renderEdge(position);
}

export default SkiperProgressiveBlur;
