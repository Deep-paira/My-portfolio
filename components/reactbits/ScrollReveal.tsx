"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: string;
  className?: string;
  wordClassName?: string;
}

export function ScrollReveal({
  children,
  className,
  wordClassName,
}: ScrollRevealProps) {
  const containerRef = React.useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = children.split(" ");

  if (shouldReduceMotion) {
    return <p className={className}>{children}</p>;
  }

  return (
    <p ref={containerRef} className={cn("relative flex flex-wrap", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            className={wordClassName}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}

function Word({ children, progress, range, className }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <span className="relative mr-[0.3em] mb-[0.2em] inline-block">
      <motion.span
        style={{ opacity, y }}
        className={cn("inline-block transition-colors", className)}
      >
        {children}
      </motion.span>
    </span>
  );
}
