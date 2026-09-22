"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountUp } from "./CountUp";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleEnd = React.useCallback(() => {
    // Brief pause at 100 before curtain exit
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 180);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader-curtain"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] bg-background text-on-background flex flex-col items-center justify-center select-none"
        >
          {/* Subtle Ambient Aurora Radial Glow */}
          <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#38bdf8]/10 via-[#818cf8]/10 to-[#c084fc]/10 blur-[110px] pointer-events-none" />

          {/* Centered CountUp Display */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-baseline font-mono text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter">
              <CountUp
                from={0}
                to={100}
                duration={1.8}
                onEnd={handleEnd}
                className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent font-mono"
              />
              <span className="text-2xl sm:text-3xl md:text-4xl text-[#818cf8]/70 font-light ml-1 font-mono">
                %
              </span>
            </div>

            {/* Subtle Tracking Status */}
            <div className="flex items-center gap-2.5 mt-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-400">
                INITIALIZING SYNTHESIS
              </span>
            </div>
          </div>

          {/* Floating Studio Signature Badge (Bottom-Right) */}
          <div className="fixed bottom-8 right-10 z-[101] hidden sm:flex items-center gap-3 font-mono text-[11px] text-neutral-500 tracking-widest uppercase">
            <span>DEEP PAIRA // 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
