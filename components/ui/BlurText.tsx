"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

/**
 * BlurText (React Bits text-animations/blur-text)
 * Animates text reveals with progressive Gaussian blur-to-sharp transitions,
 * supporting word-level or character-level staggered choreographies.
 */
export function BlurText({
  text = "",
  delay = 0.05,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.15,
  rootMargin = "-50px",
  onAnimationComplete,
}: BlurTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const elements = React.useMemo(() => {
    if (animateBy === "letters") {
      return text.split("");
    }
    return text.split(" ");
  }, [text, animateBy]);

  const defaultFrom = React.useMemo(() => {
    const yOffset = direction === "top" ? -18 : 18;
    return {
      filter: "blur(12px)",
      opacity: 0,
      y: yOffset,
    };
  }, [direction]);

  const defaultTo = {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
  };

  if (shouldReduceMotion) {
    return <span className={cn("inline-block", className)}>{text}</span>;
  }

  return (
    <span className={cn("inline-block flex-wrap", className)}>
      {elements.map((element, index) => (
        <motion.span
          key={`${element}-${index}`}
          initial={defaultFrom}
          whileInView={defaultTo}
          viewport={{ once: true, amount: threshold, margin: rootMargin }}
          transition={{
            duration: 0.75,
            delay: index * delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={
            index === elements.length - 1 ? onAnimationComplete : undefined
          }
          className="inline-block"
          style={{ willChange: "filter, opacity, transform" }}
        >
          {element}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
}

export default BlurText;
