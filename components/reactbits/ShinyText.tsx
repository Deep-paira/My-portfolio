"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  className?: string;
  disabled?: boolean;
  speed?: number;
}

export function ShinyText({
  text,
  className,
  disabled = false,
  speed = 5,
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent transition-all",
        !disabled && "animate-shine bg-[linear-gradient(110deg,var(--on-surface-variant),45%,var(--primary),55%,var(--on-surface-variant))] bg-[length:250%_100%]",
        disabled && "text-[var(--on-surface-variant)]",
        className
      )}
      style={{
        animationDuration,
      }}
    >
      {text}
    </span>
  );
}
