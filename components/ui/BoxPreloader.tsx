"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BoxPreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // Minimum display time in ms (default: 1400ms)
  maxTimeout?: number;  // Fallback maximum timeout in ms (default: 3800ms)
}

interface Particle {
  id: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  opacity: number;
  color: "terracotta" | "espresso" | "ring";
  driftX: number;
  driftY: number;
  duration: number;
  depth: number;
}

export function BoxPreloader({
  onComplete,
  minDuration = 1400,
  maxTimeout = 3800,
}: BoxPreloaderProps) {
  const shouldReduceMotion = useReducedMotion();

  // Progress state: 0 to 100 (steps by 10)
  const [progress, setProgress] = React.useState<number>(0);

  // Satellite card visibility triggers
  const [showUsefulInfo, setShowUsefulInfo] = React.useState<boolean>(false);
  const [showTechSpecs, setShowTechSpecs] = React.useState<boolean>(false);
  const [showOriginBadge, setShowOriginBadge] = React.useState<boolean>(false);

  // Status message
  const [statusText, setStatusText] = React.useState<string>("INITIALIZING SYSTEM");

  // Mouse physics tracking for subtle interactive particle parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springX = useSpring(rawMouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(rawMouseY, { stiffness: 45, damping: 20 });

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const normX = (clientX / innerWidth - 0.5) * 2;
      const normY = (clientY / innerHeight - 0.5) * 2;
      rawMouseX.set(normX);
      rawMouseY.set(normY);
    },
    [rawMouseX, rawMouseY, shouldReduceMotion]
  );

  // Deterministic particle configuration
  const particles = React.useMemo<Particle[]>(
    () => [
      { id: 1, x: 14, y: 20, size: 7, opacity: 0.55, color: "terracotta", driftX: 12, driftY: -16, duration: 6.2, depth: 28 },
      { id: 2, x: 26, y: 76, size: 5, opacity: 0.4, color: "espresso", driftX: -10, driftY: 14, duration: 7.1, depth: 18 },
      { id: 3, x: 84, y: 26, size: 9, opacity: 0.5, color: "terracotta", driftX: 14, driftY: -12, duration: 5.8, depth: 32 },
      { id: 4, x: 72, y: 74, size: 6, opacity: 0.45, color: "espresso", driftX: -12, driftY: -14, duration: 6.5, depth: 22 },
      { id: 5, x: 48, y: 14, size: 8, opacity: 0.5, color: "ring", driftX: 8, driftY: 10, duration: 6.8, depth: 25 },
      { id: 6, x: 10, y: 64, size: 5, opacity: 0.35, color: "terracotta", driftX: -14, driftY: 12, duration: 7.5, depth: 16 },
      { id: 7, x: 88, y: 56, size: 6, opacity: 0.45, color: "espresso", driftX: 10, driftY: -10, duration: 6.0, depth: 24 },
      { id: 8, x: 62, y: 84, size: 4, opacity: 0.35, color: "terracotta", driftX: -8, driftY: -16, duration: 8.0, depth: 14 },
      { id: 9, x: 36, y: 32, size: 6, opacity: 0.4, color: "espresso", driftX: 12, driftY: 8, duration: 7.2, depth: 20 },
      { id: 10, x: 68, y: 22, size: 7, opacity: 0.45, color: "terracotta", driftX: -10, driftY: 15, duration: 6.4, depth: 26 },
      { id: 11, x: 20, y: 46, size: 5, opacity: 0.3, color: "ring", driftX: 15, driftY: -8, duration: 7.8, depth: 15 },
      { id: 12, x: 82, y: 86, size: 8, opacity: 0.5, color: "terracotta", driftX: -12, driftY: -12, duration: 6.6, depth: 30 },
      { id: 13, x: 52, y: 88, size: 5, opacity: 0.4, color: "espresso", driftX: 9, driftY: 14, duration: 7.0, depth: 18 },
      { id: 14, x: 8, y: 22, size: 6, opacity: 0.45, color: "terracotta", driftX: 11, driftY: -10, duration: 6.9, depth: 22 },
      { id: 15, x: 92, y: 16, size: 5, opacity: 0.35, color: "espresso", driftX: -14, driftY: 12, duration: 7.3, depth: 17 },
      { id: 16, x: 38, y: 92, size: 7, opacity: 0.5, color: "terracotta", driftX: 8, driftY: -14, duration: 6.7, depth: 27 },
      { id: 17, x: 56, y: 36, size: 4, opacity: 0.3, color: "espresso", driftX: -11, driftY: 9, duration: 8.2, depth: 12 },
      { id: 18, x: 28, y: 10, size: 6, opacity: 0.4, color: "terracotta", driftX: 13, driftY: 11, duration: 6.1, depth: 21 },
      { id: 19, x: 86, y: 42, size: 5, opacity: 0.35, color: "ring", driftX: -9, driftY: -11, duration: 7.6, depth: 19 },
      { id: 20, x: 18, y: 88, size: 8, opacity: 0.5, color: "terracotta", driftX: 10, driftY: 12, duration: 6.5, depth: 29 },
    ],
    []
  );

  // Trigger satellite cards at specific progress thresholds
  React.useEffect(() => {
    if (progress >= 20) setShowUsefulInfo(true);
    if (progress >= 50) setShowTechSpecs(true);
    if (progress >= 70) setShowOriginBadge(true);

    if (progress < 40) {
      setStatusText("INITIALIZING ENVIRONMENT");
    } else if (progress < 80) {
      setStatusText("SYNTHESIZING FACETS & SHADERS");
    } else if (progress < 100) {
      setStatusText("VERIFYING ASSETS");
    } else {
      setStatusText("SYSTEM READY");
    }
  }, [progress]);

  // Main Progression & Readiness Lifecycle
  React.useEffect(() => {
    let isCancelled = false;
    const startTime = performance.now();

    // Step pacing (delays in ms for each 10% increment)
    // 0 -> 10 -> 20 -> 30 -> 40 -> 50 -> 60 -> 70 -> 80 -> 90 -> 100
    const stepDelays = [110, 120, 100, 130, 110, 100, 120, 110, 130];

    // Readiness promise (verifies fonts and window load)
    const readinessPromise = (async () => {
      if (typeof window !== "undefined") {
        if (document.readyState !== "complete") {
          await new Promise((resolve) => {
            window.addEventListener("load", resolve, { once: true });
          });
        }
        if ("fonts" in document) {
          try {
            await document.fonts.ready;
          } catch {
            // Font loading API fallback
          }
        }
      }
    })();

    // Fallback maximum safety timeout
    const fallbackTimer = setTimeout(() => {
      if (!isCancelled) {
        setProgress(100);
      }
    }, maxTimeout);

    let currentStep = 0;

    const advanceStep = () => {
      if (isCancelled) return;

      if (currentStep < 9) {
        // Increment by 10 (from 0 up to 90)
        setProgress((prev) => Math.min(90, prev + 10));
        currentStep++;
        setTimeout(advanceStep, stepDelays[currentStep - 1] || 110);
      } else {
        // At 90%, wait for readiness check AND minDuration
        Promise.all([
          readinessPromise,
          new Promise((resolve) => {
            const elapsed = performance.now() - startTime;
            const remaining = Math.max(0, minDuration - elapsed);
            setTimeout(resolve, remaining);
          }),
        ]).then(() => {
          if (isCancelled) return;
          setProgress(100);
        });
      }
    };

    // Kick off progression
    const initialTimer = setTimeout(advanceStep, stepDelays[0]);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimer);
      clearTimeout(fallbackTimer);
    };
  }, [minDuration, maxTimeout]);

  // When 100% is reached, hold briefly (160ms) then trigger onComplete
  React.useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        onComplete?.();
      }, 160);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      key="skiper-box-preloader"
      initial={{ y: 0 }}
      exit={
        shouldReduceMotion
          ? { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }
          : {
              y: "-100%",
              transition: {
                duration: 1,
                ease: [0.785, 0.135, 0.15, 0.86], // Exact Skiper 15 cubic-bezier curve
              },
            }
      }
      onPointerMove={handlePointerMove}
      className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center bg-[#FAF6F0] dark:bg-[#1C1917] text-[#221E1C] dark:text-[#F5EFEB] select-none"
    >
      {/* 1. Subtle Ambient Radial Warm Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#C4623F]/12 via-[#EAE1D3]/20 to-transparent blur-[120px] pointer-events-none" />

      {/* 2. Floating Interactive Particles Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => {
          const parallaxFactor = (p.depth / 20);
          return (
            <motion.div
              key={p.id}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                x: shouldReduceMotion ? 0 : springX,
                y: shouldReduceMotion ? 0 : springY,
              }}
              animate={
                shouldReduceMotion
                  ? false
                  : {
                      x: [0, p.driftX * parallaxFactor, 0],
                      y: [0, p.driftY * parallaxFactor, 0],
                      opacity: [p.opacity * 0.7, p.opacity, p.opacity * 0.7],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: p.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            >
              {p.color === "ring" ? (
                <div
                  style={{ width: p.size + 4, height: p.size + 4 }}
                  className="rounded-full border border-[#C4623F]/40 dark:border-[#D97754]/40"
                />
              ) : p.color === "terracotta" ? (
                <div
                  style={{ width: p.size, height: p.size }}
                  className="rounded-full bg-[#C4623F] dark:bg-[#D97754] shadow-[0_0_8px_rgba(196,98,63,0.3)]"
                />
              ) : (
                <div
                  style={{ width: p.size, height: p.size }}
                  className="rounded-full bg-[#221E1C]/40 dark:bg-[#FAF6F0]/40"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 3. Main Centerpiece: Skiper 15 Box Window Loader */}
      <div className="relative z-20 rounded-2xl bg-white dark:bg-[#262220] border border-[#E2D7C8]/80 dark:border-[#443C37]/80 shadow-[0_20px_50px_rgba(34,30,28,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] min-w-[310px] sm:min-w-[380px] overflow-hidden">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#F3ECE2]/50 dark:bg-[#1C1917]/50 border-b border-[#E2D7C8]/60 dark:border-[#443C37]/60">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#221E1C]/70 dark:text-[#F5EFEB]/70">
            SYSTEM // LOADER
          </p>
          <div className="flex items-center justify-center gap-1.5">
            <div className="size-2.5 rounded-full bg-[#C4623F]/80 dark:bg-[#D97754]/80" />
            <div className="size-2.5 rounded-full bg-[#E2D7C8] dark:bg-[#443C37]" />
          </div>
        </div>

        {/* Progress Grid Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-4">
          {/* 10 Segmented Progress Blocks */}
          <div className="flex w-full gap-2 rounded-xl bg-[#F3ECE2]/60 dark:bg-[#1C1917]/60 p-2.5 border border-[#E2D7C8]/40 dark:border-[#443C37]/40">
            {[...Array(10)].map((_, i) => {
              const isFilled = progress >= (i + 1) * 10;
              return (
                <div
                  key={i}
                  className={cn(
                    "h-7 sm:h-8 flex-1 rounded-md transition-all duration-300",
                    isFilled
                      ? "bg-[#C4623F] dark:bg-[#D97754] shadow-[0_0_10px_rgba(196,98,63,0.35)] scale-100"
                      : "bg-[#EAE1D3]/70 dark:bg-[#332D2A]/70 scale-95"
                  )}
                />
              );
            })}
          </div>

          {/* Status & Numeric Value Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4623F] dark:bg-[#D97754] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E645E] dark:text-[#B5ABA3]">
                {statusText}
              </span>
            </div>
            <p className="font-mono text-sm sm:text-base font-semibold tracking-tight text-[#221E1C]/80 dark:text-[#F5EFEB]/80">
              {progress}%
            </p>
          </div>
        </div>
      </div>

      {/* 4. Satellite Card 1 (Bottom Right): USEFUL INFO (Triggered at 20%) */}
      <AnimatePresence>
        {showUsefulInfo && (
          <motion.div
            drag={!shouldReduceMotion}
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.03 }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              bounce: 0.35,
              type: "spring",
            }}
            className="absolute bottom-[8%] right-[5%] sm:right-[10%] z-30 cursor-grab overflow-hidden rounded-2xl bg-white dark:bg-[#262220] border border-[#E2D7C8]/90 dark:border-[#443C37]/90 shadow-xl active:cursor-grabbing max-w-[270px] sm:max-w-xs"
          >
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#F3ECE2]/40 dark:bg-[#1C1917]/40 border-b border-[#E2D7C8]/50 dark:border-[#443C37]/50">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#221E1C]/70 dark:text-[#F5EFEB]/70">
                USEFUL INFO
              </p>
              <div className="flex items-center justify-center gap-1">
                <div className="size-2 rounded-full bg-[#C4623F]/70 dark:bg-[#D97754]/70" />
                <div className="size-2 rounded-full bg-[#E2D7C8] dark:bg-[#443C37]" />
              </div>
            </div>
            <div className="p-3.5 text-xs font-sans leading-relaxed text-[#6E645E] dark:text-[#B5ABA3]">
              Deep Paira — Systems Architecture, Interactive 3D Canvas, and Creative Engineering.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Satellite Card 2 (Bottom Left): CRAFT SPECIFICATIONS (Triggered at 50%) */}
      <AnimatePresence>
        {showTechSpecs && (
          <motion.div
            drag={!shouldReduceMotion}
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.03 }}
            initial={{ opacity: 0, scale: 0.8, y: 20, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 6 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              bounce: 0.35,
              type: "spring",
            }}
            className="absolute bottom-[10%] left-[5%] sm:left-[10%] z-30 cursor-grab overflow-hidden rounded-2xl bg-white dark:bg-[#262220] border border-[#E2D7C8]/90 dark:border-[#443C37]/90 shadow-xl active:cursor-grabbing max-w-[220px]"
          >
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#F3ECE2]/40 dark:bg-[#1C1917]/40 border-b border-[#E2D7C8]/50 dark:border-[#443C37]/50">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#221E1C]/70 dark:text-[#F5EFEB]/70">
                SYS // CRAFT
              </p>
              <div className="flex items-center justify-center gap-1">
                <div className="size-2 rounded-full bg-[#E2D7C8] dark:bg-[#443C37]" />
              </div>
            </div>
            <div className="font-mono p-3.5 text-xs uppercase leading-snug tracking-wider text-[#221E1C]/80 dark:text-[#F5EFEB]/80">
              Loaders, <br /> Shaders, <br /> Tactile UI/UX <br /> <br />
              <span className="text-[#C4623F] dark:text-[#D97754]">Collection 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Satellite Card 3 (Top Right): ORIGIN BADGE (Triggered at 70%) */}
      <AnimatePresence>
        {showOriginBadge && (
          <motion.div
            drag={!shouldReduceMotion}
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.03 }}
            initial={{ opacity: 0, scale: 0.8, y: -20, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -6 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              bounce: 0.35,
              type: "spring",
            }}
            className="absolute top-[8%] right-[5%] sm:right-[12%] z-30 cursor-grab overflow-hidden rounded-2xl bg-white dark:bg-[#262220] border border-[#E2D7C8]/90 dark:border-[#443C37]/90 shadow-xl active:cursor-grabbing max-w-[210px]"
          >
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#F3ECE2]/40 dark:bg-[#1C1917]/40 border-b border-[#E2D7C8]/50 dark:border-[#443C37]/50">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#221E1C]/70 dark:text-[#F5EFEB]/70">
                ORIGIN
              </p>
              <div className="flex items-center justify-center gap-1">
                <div className="size-2 rounded-full bg-[#C4623F]/80 dark:bg-[#D97754]/80" />
              </div>
            </div>
            <div className="font-mono p-3.5 text-xs uppercase font-medium leading-relaxed tracking-wider text-[#221E1C]/80 dark:text-[#F5EFEB]/80">
              Crafted with{" "}
              <Heart className="inline size-3.5 fill-[#C4623F] text-[#C4623F] dark:fill-[#D97754] dark:text-[#D97754] mx-0.5 align-middle" />{" "}
              <br /> from India
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Subtle Footer Branding Badge (Bottom Left) */}
      <div className="fixed bottom-6 left-8 z-10 hidden sm:flex items-center gap-3 font-mono text-[11px] text-[#6E645E]/60 dark:text-[#B5ABA3]/60 tracking-widest uppercase pointer-events-none">
        <span>DEEP PAIRA // PORTFOLIO</span>
      </div>
    </motion.div>
  );
}

export default BoxPreloader;
