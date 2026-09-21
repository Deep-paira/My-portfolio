"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // delay between each word/char in seconds
  initialDelay?: number; // delay before starting in seconds
  splitBy?: "words" | "chars";
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({
  text,
  className,
  delay = 0.04,
  initialDelay = 0.1,
  splitBy = "chars",
  as = "span",
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Component = as;
    return <Component className={className}>{text}</Component>;
  }

  const items = splitBy === "words" ? text.split(" ") : text.split("");

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {items.map((item, index) => {
        const isSpace = item === " ";
        return (
          <span
            key={index}
            className="inline-block overflow-hidden"
            style={{ marginRight: splitBy === "words" ? "0.3em" : undefined }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: "110%", rotateX: -40 }}
              animate={{ opacity: 1, y: "0%", rotateX: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
                delay: initialDelay + index * delay,
              }}
            >
              {isSpace ? "\u00A0" : item}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
