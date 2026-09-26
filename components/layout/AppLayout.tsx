"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BoxPreloader } from "@/components/ui/BoxPreloader";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Safely check session persistence on client
    try {
      const hasLoaded = sessionStorage.getItem("delta_has_loaded");
      if (hasLoaded) {
        setShowPreloader(false);
        setIsLoading(false);
        setIsFirstVisit(false);
        return;
      }
    } catch {
      setShowPreloader(false);
      setIsLoading(false);
      setIsFirstVisit(false);
      return;
    }
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    try {
      sessionStorage.setItem("delta_has_loaded", "true");
    } catch {}
    // Trigger upward exit slide on preloader and reveal main content underneath
    setShowPreloader(false);
    setIsLoading(false);
  }, []);

  // Prevent flash before hydration resolves
  if (!mounted) {
    return <div className="w-full min-h-screen bg-background" />;
  }

  // Subsequent visits: Load instantly without preloader
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
      {/* 1. Skiper 15 Box Preloader with exact upward slide exit transition */}
      <AnimatePresence mode="wait">
        {showPreloader && (
          <BoxPreloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* 2. Main Page with gated Hero 3D / paper scrunch initialization */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
