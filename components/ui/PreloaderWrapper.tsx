"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PreloaderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    try {
      const hasLoaded = sessionStorage.getItem("delta_has_loaded");
      if (hasLoaded) {
        setIsLoading(false);
        setIsFirstVisit(false);
        return;
      }
    } catch {
      // In case storage is inaccessible
      setIsLoading(false);
      setIsFirstVisit(false);
      return;
    }

    const startTime = performance.now();
    const duration = 2000; // 2 seconds

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * 100));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          try {
            sessionStorage.setItem("delta_has_loaded", "true");
          } catch {}
          setIsLoading(false);
        }, 150);
      }
    };

    const rafId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Subsequent visits: Render immediately with no preloader or pop-up animation
  if (!isFirstVisit) {
    return <div className="w-full min-h-screen">{children}</div>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-on-background select-none"
          >
            <div className="font-mono text-7xl sm:text-8xl md:text-9xl font-light tracking-tighter bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
              {count}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pop-up entrance on first load */}
      <motion.div
        initial={{ scale: 0.82, opacity: 0, filter: "blur(14px)" }}
        animate={!isLoading ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full min-h-screen origin-center"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PreloaderWrapper;
