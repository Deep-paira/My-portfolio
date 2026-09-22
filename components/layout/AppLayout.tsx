"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Safely check session persistence on client
    try {
      const hasLoaded = sessionStorage.getItem("delta_has_loaded");
      if (hasLoaded) {
        setIsLoading(false);
        setIsFirstVisit(false);
        return;
      }
    } catch {
      setIsLoading(false);
      setIsFirstVisit(false);
      return;
    }

    const duration = 2000; // 2.0 seconds exact
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out
      const easeProgress = 1 - Math.pow(1 - rawProgress, 3);
      const currentNumber = Math.floor(easeProgress * 100);

      setCount(currentNumber);

      if (rawProgress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(100);
        setTimeout(() => {
          try {
            sessionStorage.setItem("delta_has_loaded", "true");
          } catch {}
          setIsLoading(false);
        }, 150);
      }
    };

    const rafId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Prevent flash before hydration resolves
  if (!mounted) {
    return <div className="w-full min-h-screen bg-background" />;
  }

  // Subsequent visits: Load instantly with normal theme tokens
  if (!isFirstVisit) {
    return (
      <div className="w-full min-h-screen bg-background text-on-background flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background text-on-background relative flex flex-col">
      {/* 1. Preloader Overlay using original theme background & typography */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background text-on-background select-none"
          >
            <div className="font-mono text-7xl sm:text-8xl md:text-9xl font-light tracking-tighter">
              {count}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Page with synchronized Navbar */}
      {!isLoading && (
        <motion.div
          initial={{ scale: 0.88, opacity: 0, filter: "blur(12px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-full min-h-screen origin-center bg-background text-on-background flex flex-col flex-1"
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default AppLayout;
