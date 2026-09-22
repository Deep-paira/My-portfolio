"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThreeDTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  rotationX?: number;
  threshold?: number;
}

/**
 * ThreeDTextReveal (React Bits Pro 3d-text-reveal)
 * Renders milestone callouts or value propositions with a dramatic 3D perspective roll,
 * tilting into view along the X-axis upon entering viewport.
 */
export function ThreeDTextReveal({
  children,
  className,
  delay = 0.1,
  duration = 0.85,
  rotationX = -75,
  threshold = 0.2,
}: ThreeDTextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={cn("perspective-1000 overflow-hidden", className)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        initial={{
          opacity: 0,
          rotateX: rotationX,
          y: 24,
          transformOrigin: "bottom center",
        }}
        whileInView={{
          opacity: 1,
          rotateX: 0,
          y: 0,
        }}
        viewport={{ once: true, amount: threshold }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="preserve-3d inline-block w-full"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ThreeDTextReveal;
