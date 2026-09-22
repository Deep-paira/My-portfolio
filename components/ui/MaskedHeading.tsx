"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MaskedHeadingProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  speed?: number;
}

/**
 * MaskedHeading (React Bits text-animations/masked-heading)
 * Renders high-impact heading typography with an anti-gravity moving gradient mask,
 * transitioning from deep indigo to luminous metallic cyan and crisp platinum highlights.
 */
export function MaskedHeading({
  children,
  className,
  gradient = "linear-gradient(115deg, #1E1B4B 0%, #312E81 22%, #0284C7 45%, #38BDF8 60%, #E0F2FE 78%, #312E81 100%)",
  as: Component = "h1",
  speed = 8,
}: MaskedHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Component
      className={cn(
        "relative inline-block bg-clip-text text-transparent select-none",
        className
      )}
      style={{
        backgroundImage: gradient,
        backgroundSize: shouldReduceMotion ? "100% 100%" : "250% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      <motion.span
        className="inline-block"
        animate={
          shouldReduceMotion
            ? { backgroundPosition: "0% 50%" }
            : {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
        }
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: gradient,
          backgroundSize: "250% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
}

export default MaskedHeading;
