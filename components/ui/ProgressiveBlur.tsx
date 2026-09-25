"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressiveBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top" | "bottom" | "left" | "right";
  height?: string;
  blurAmount?: string;
  backgroundColor?: string;
  stop?: string;
}

/**
 * ProgressiveBlur (Adapted from Skiper UI Skiper 41)
 * Creates a graduated, luxurious backdrop blur transition rather than a hard cutoff.
 * Fully adapted to the portfolio's warm neutral design tokens.
 */
export function ProgressiveBlur({
  position = "top",
  height = "80px",
  blurAmount = "8px",
  backgroundColor = "var(--background)",
  stop = "50%",
  className,
  style,
  ...props
}: ProgressiveBlurProps) {
  const isTop = position === "top";
  const isBottom = position === "bottom";
  const isLeft = position === "left";
  const isRight = position === "right";

  const isVertical = isTop || isBottom;

  const gradientDirection = isTop
    ? "to top"
    : isBottom
    ? "to bottom"
    : isLeft
    ? "to left"
    : "to right";

  const maskDirection = isTop
    ? "to bottom"
    : isBottom
    ? "to top"
    : isLeft
    ? "to right"
    : "to left";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none z-10",
        isVertical ? "left-0 w-full" : "top-0 h-full",
        className
      )}
      style={{
        [position]: 0,
        [isVertical ? "height" : "width"]: height,
        background: `linear-gradient(${gradientDirection}, transparent, ${backgroundColor})`,
        maskImage: `linear-gradient(${maskDirection}, ${backgroundColor} ${stop}, transparent)`,
        WebkitMaskImage: `linear-gradient(${maskDirection}, ${backgroundColor} ${stop}, transparent)`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
        WebkitUserSelect: "none",
        userSelect: "none",
        ...style,
      }}
      {...props}
    />
  );
}

export default ProgressiveBlur;
