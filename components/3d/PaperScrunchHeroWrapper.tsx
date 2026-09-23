"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CameraOff, Sparkles, RefreshCw, Hand, Sliders, CheckCircle2 } from "lucide-react";
import { HandTrackerController, HandTrackingStatus } from "@/lib/paper-mesh/hand-tracking";

// Dynamic import of Three.js canvas (SSR disabled)
const PaperScrunchScene = dynamic(
  () => import("./PaperScrunchScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="w-48 h-48 rounded-full bg-[#06B6D4]/10 blur-3xl animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--on-surface-variant)]/70">
          Synthesizing paper facets...
        </span>
      </div>
    ),
  }
);

interface PaperScrunchHeroWrapperProps {
  shouldReduceMotion?: boolean;
}

export function PaperScrunchHeroWrapper({
  shouldReduceMotion = false,
}: PaperScrunchHeroWrapperProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const trackerRef = React.useRef<HandTrackerController | null>(null);

  // Core interactive state (stored in ref to prevent per-frame React re-renders)
  const progressRef = React.useRef<number>(shouldReduceMotion ? 1.0 : 0.45);
  const sliderRef = React.useRef<HTMLInputElement>(null);
  const percentLabelRef = React.useRef<HTMLSpanElement>(null);

  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [trackingStatus, setTrackingStatus] = React.useState<HandTrackingStatus>("idle");
  const [statusMessage, setStatusMessage] = React.useState<string>("Mouse / Touch fallback mode");
  const [isCameraActive, setIsCameraActive] = React.useState<boolean>(false);
  const [isUserInteracting, setIsUserInteracting] = React.useState<boolean>(false);

  // High-performance progress updater: mutates ref and updates DOM elements directly with zero React re-renders
  const updateProgress = React.useCallback((p: number) => {
    const clamped = Math.max(0, Math.min(1, p));
    progressRef.current = clamped;
    if (sliderRef.current) {
      sliderRef.current.value = String(clamped);
    }
    if (percentLabelRef.current) {
      percentLabelRef.current.textContent = `${Math.round(clamped * 100)}%`;
    }
  }, []);

  // Mesh telemetry stats
  const [meshStats, setMeshStats] = React.useState<{
    faceDetected: boolean;
    landmarkCount: number;
    trianglesCount: number;
    activeImageSrc: string;
  } | null>(null);

  const userInteractTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Mark user interaction to pause idle breathing
  const notifyUserInteraction = React.useCallback(() => {
    setIsUserInteracting(true);
    if (userInteractTimeoutRef.current) {
      clearTimeout(userInteractTimeoutRef.current);
    }
    userInteractTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 3500);
  }, []);

  // Initialize HandTrackerController
  React.useEffect(() => {
    trackerRef.current = new HandTrackerController({
      onProgress: (p) => {
        updateProgress(p);
      },
      onStatusChange: (status, msg) => {
        setTrackingStatus(status);
        setStatusMessage(msg);
        setIsCameraActive(status === "tracking-active" || status === "no-hand-detected");
      },
    });

    return () => {
      if (trackerRef.current) {
        trackerRef.current.stop();
      }
      if (userInteractTimeoutRef.current) {
        clearTimeout(userInteractTimeoutRef.current);
      }
    };
  }, []);

  // Idle Oscillation when hand tracking is inactive and user is not touching/moving
  React.useEffect(() => {
    if (shouldReduceMotion || isCameraActive || isUserInteracting || !isLoaded) return;

    let animId: number;
    // Delay start so the entrance pop-up animation finishes first
    let startTime = performance.now() + 1200;

    const idleLoop = (time: number) => {
      if (time < startTime) {
        animId = requestAnimationFrame(idleLoop);
        return;
      }
      const elapsed = (time - startTime) * 0.001;
      // Gently breathe between 0.32 (crumpled) and 0.62 (half-unfolded)
      const idleValue = 0.47 + Math.sin(elapsed * 1.1) * 0.15;
      updateProgress(idleValue);
      animId = requestAnimationFrame(idleLoop);
    };

    animId = requestAnimationFrame(idleLoop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [shouldReduceMotion, isCameraActive, isUserInteracting, isLoaded, updateProgress]);

  // Pause camera and rendering when scrolled out of view
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!trackerRef.current) return;
          if (entry.isIntersecting) {
            trackerRef.current.resume();
          } else {
            trackerRef.current.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Toggle Hand Tracking
  const toggleHandTracking = async () => {
    notifyUserInteraction();
    if (!trackerRef.current || !videoRef.current) return;

    if (isCameraActive || trackingStatus === "requesting-permission" || trackingStatus === "loading-model") {
      trackerRef.current.stop();
      setIsCameraActive(false);
    } else {
      await trackerRef.current.start(videoRef.current);
    }
  };

  // Fallback: Pointer (Mouse / Touch) movement controls paper resolution
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isCameraActive) return;
    notifyUserInteraction();

    const rect = e.currentTarget.getBoundingClientRect();
    // Invert Y: dragging or hovering towards top resolves, towards bottom crumbles
    const relativeY = (e.clientY - rect.top) / rect.height;
    const computedProgress = Math.max(0, Math.min(1, 1.0 - relativeY));
    updateProgress(computedProgress);
  };

  // Fallback: Wheel / Touchpad scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isCameraActive) return;
    notifyUserInteraction();
    e.stopPropagation();

    const delta = e.deltaY * -0.0015;
    updateProgress(progressRef.current + delta);
  };

  // Slider manual scrub
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    notifyUserInteraction();
    updateProgress(parseFloat(e.target.value));
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onWheel={handleWheel}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      {/* Hidden webcam video stream element */}
      <video
        ref={videoRef}
        playsInline
        muted
        className="hidden"
        aria-hidden="true"
      />

      {/* Loading placeholder skeleton */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none z-10"
          >
            <div className="w-40 h-40 rounded-full bg-[#38BDF8]/10 blur-3xl animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--on-surface-variant)]/70">
              Synthesizing paper facets...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Paper Scrunch Canvas with Framer Motion entrance pop */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: 16 }}
        animate={
          isLoaded
            ? { opacity: 1, scale: 1, y: 0 }
            : shouldReduceMotion
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.9, y: 16 }
        }
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 20,
          mass: 0.85,
        }}
        className="relative w-full h-full"
      >
        <PaperScrunchScene
          progressRef={progressRef}
          shouldReduceMotion={shouldReduceMotion}
          imageSrc="/deep-photo.jpg"
          onModelLoaded={(info) => {
            setMeshStats(info);
            setIsLoaded(true);
          }}
        />
      </motion.div>

      {/* Top HUD: Editorial Status & Mesh Diagnostics */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20"
      >
        {/* Mode / Tracking Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-container-low)]/85 border border-[var(--outline-variant)]/80 backdrop-blur-md text-[10px] font-mono tracking-wider text-[var(--on-surface-variant)] uppercase">
          <span
            className={`w-2 h-2 rounded-full ${
              isCameraActive
                ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"
                : "bg-[#06B6D4]"
            }`}
          />
          <span className="font-semibold text-[var(--on-background)]">
            {isCameraActive ? "WEBCAM ACTIVE" : "PAPER SCULPTURE"}
          </span>
          <span className="text-[var(--outline-variant)]">/</span>
          <span className="truncate max-w-[140px] sm:max-w-none">
            {statusMessage}
          </span>
        </div>

        {/* Telemetry pill */}
        {meshStats && (
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--surface-container-low)]/70 border border-[var(--outline-variant)]/60 text-[9px] font-mono tracking-widest text-[var(--on-surface-variant)]/80 uppercase">
            <Sparkles className="w-2.5 h-2.5 text-[#38BDF8]" />
            <span>{meshStats.trianglesCount} FACETS</span>
            <span>•</span>
            <span>{meshStats.faceDetected ? "FACE ANCHORED" : "ANATOMICAL GRID"}</span>
          </div>
        )}
      </motion.div>

      {/* Bottom HUD: Opt-in Camera Toggle & Interaction Bar */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-3 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 z-20"
      >
        
        {/* Camera Opt-In / Opt-Out Button */}
        <button
          type="button"
          onClick={toggleHandTracking}
          disabled={trackingStatus === "requesting-permission" || trackingStatus === "loading-model"}
          className={`group flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer ${
            isCameraActive
              ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25"
              : "bg-white text-black hover:bg-neutral-200 border border-white/20 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
          }`}
          aria-label={isCameraActive ? "Turn off webcam hand tracking" : "Enable webcam hand tracking"}
        >
          {trackingStatus === "requesting-permission" || trackingStatus === "loading-model" ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[var(--primary)]" />
          ) : isCameraActive ? (
            <CameraOff className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          ) : (
            <Camera className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-900 group-hover:scale-110 transition-transform" />
          )}

          <span>
            {trackingStatus === "requesting-permission"
              ? "Requesting Access..."
              : trackingStatus === "loading-model"
              ? "Loading Landmarker..."
              : isCameraActive
              ? "Disable Camera"
              : "Enable Hand Tracking"}
          </span>
        </button>

        {/* Tactile Scrubber & Hint Pill */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[var(--surface-container-low)]/85 border border-[var(--outline-variant)]/80 backdrop-blur-md text-[11px] font-mono text-[var(--on-surface-variant)] shadow-sm">
          <Hand className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
          
          <span className="hidden md:inline text-[10px] uppercase tracking-wider text-[var(--on-surface-variant)]/80">
            {isCameraActive ? "Open / Pinch hand" : "Hover / Drag to fold"}
          </span>

          <span className="text-[var(--outline-variant)] hidden md:inline">•</span>

          {/* Interactive Scrub Slider */}
          <div className="flex items-center gap-2">
            <input
              ref={sliderRef}
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue={shouldReduceMotion ? 1.0 : 0.45}
              onChange={handleSliderChange}
              className="w-16 sm:w-20 h-1 bg-[var(--outline-variant)] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
              aria-label="Paper fold progress"
            />
            <span
              ref={percentLabelRef}
              className="text-[10px] font-bold text-[var(--on-background)] min-w-[32px] text-right"
            >
              {shouldReduceMotion ? "100%" : "45%"}
            </span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default PaperScrunchHeroWrapper;
