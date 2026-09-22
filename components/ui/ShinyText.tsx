"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className,
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={cn(
        "inline-block font-mono tracking-widest uppercase transition-all duration-300",
        !disabled && "animate-shine",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(120deg, var(--on-background) 0%, var(--on-background) 35%, var(--primary) 50%, #E89E78 55%, var(--on-background) 65%, var(--on-background) 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animationDuration,
      }}
    >
      {text}
    </span>
  );
}
