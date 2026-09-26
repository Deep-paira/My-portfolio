"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkiperParallaxImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  parallaxSpeed?: number; // percentage range, e.g. 6 for -6% to +6%
  accentColor?: string;
  projectId?: string;
  priority?: boolean;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * SkiperParallaxImage
 * Synthesized from Skiper UI:
 * - Skiper 55 "Parallax Image" (skiper-ui.com/v1/skiper55) scroll-linked depth physics
 * - Skiper 71 "Image reveal" (skiper-ui.com/v1/skiper71) unmasking wipe curtain on project switch
 *
 * Provides a responsive cinematic visual frame where the image tracks scroll velocity with
 * buttery parallax inertia, paired with an editorial reveal wipe on project selection.
 */
export function SkiperParallaxImage({
  src,
  alt,
  aspectRatio = "aspect-[16/10]",
  className,
  parallaxSpeed = 6,
  accentColor = "var(--primary)",
  projectId = "default",
  priority = false,
}: SkiperParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Graceful fallback handler for assets
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  // Skiper 55 Scroll Parallax Hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : [`-${parallaxSpeed}%`, `${parallaxSpeed}%`]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-[var(--surface-container-low)] select-none",
        aspectRatio,
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={projectId + currentSrc}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                  scale: 1.05,
                }
          }
          animate={{
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            scale: 1,
          }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                  transition: { duration: 0.35, ease: LUXURY_EASE },
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.65,
            ease: LUXURY_EASE,
          }}
          className="absolute inset-0 size-full"
        >
          {/* Parallax inner container */}
          <motion.div
            style={{ y, scale: shouldReduceMotion ? 1 : 1.12 }}
            className="relative size-full will-change-transform"
          >
            <Image
              src={currentSrc}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
              className="object-cover object-center transition-all duration-700 brightness-[0.94] contrast-[1.03]"
              onError={() => {
                if (projectId === "prooftrail" && currentSrc !== "/projects/prooftrail.svg") {
                  setCurrentSrc("/projects/prooftrail.svg");
                }
              }}
            />
          </motion.div>

          {/* Skiper 71 Sweep Reveal Curtain Accent */}
          {!shouldReduceMotion && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.75, ease: LUXURY_EASE }}
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${accentColor}33 50%, transparent 100%)`,
              }}
            />
          )}

          {/* Warm Dark Masking Overlay for Readability */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[var(--background)]/85 via-[var(--background)]/20 to-transparent" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SkiperParallaxImage;
