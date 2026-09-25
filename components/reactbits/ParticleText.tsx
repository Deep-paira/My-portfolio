"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";

interface ParticleTextProps {
  text?: string;
  className?: string;
  particleDensity?: number;
  particleSize?: number;
  scrollTriggerDirection?: "up" | "down" | "both";
  color?: string;
}

interface Particle {
  targetX: number;
  targetY: number;
  scatterX: number;
  scatterY: number;
  currentX: number;
  currentY: number;
  size: number;
  alpha: number;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
}

export const ParticleText: React.FC<ParticleTextProps> = ({
  text = "D E L T A",
  className = "",
  particleDensity = 55,
  particleSize = 1.6,
  scrollTriggerDirection = "up",
  color = "currentColor",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);

  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Calculate scroll assembly progress based on viewport position
  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Viewport trigger zones:
    // When element enters bottom: progress starts at 0 (dispersed)
    // When element reaches optical focal zone: progress reaches 1 (crisp D E L T A)
    // When element scrolls far past top: progress eases back to 0 (dispersed)
    const enterTrigger = windowHeight * 0.95;
    const peakTrigger = windowHeight * 0.45;
    const exitTrigger = -rect.height * 0.3;

    let target = 0;
    if (rect.top > enterTrigger) {
      target = 0;
    } else if (rect.top > peakTrigger) {
      // Entering from bottom and scrolling up into view
      const ratio = (enterTrigger - rect.top) / (enterTrigger - peakTrigger);
      target = Math.min(Math.max(ratio, 0), 1);
    } else if (rect.bottom > exitTrigger) {
      // In center focal zone
      if (rect.top >= 0) {
        target = 1;
      } else {
        // Scrolling up past top
        const exitRatio = (rect.bottom - exitTrigger) / (-exitTrigger + rect.height);
        target = Math.min(Math.max(exitRatio, 0), 1);
      }
    } else {
      target = 0;
    }

    targetProgressRef.current = target;
  }, []);

  // Initialize and sample particles from offscreen canvas
  const initParticles = useCallback(async () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Wait for document fonts to be ready before rasterizing text into particles
    if (typeof document !== "undefined" && "fonts" in document) {
      try {
        await document.fonts.ready;
        // Specifically ensure the 800 weight of Manrope is requested/ready
        await Promise.race([
          document.fonts.load('800 48px "Manrope"'),
          new Promise((resolve) => setTimeout(resolve, 800)),
        ]);
      } catch {
        // Continue even if font loading API times out
      }
    }

    // Verify container and canvas are still mounted after async wait
    if (!canvasRef.current || !containerRef.current) return;

    const rect = container.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const measuredWidth = rect.width > 0 ? rect.width : container.clientWidth;
    const width = Math.max(measuredWidth, 300);
    const height = Math.min(Math.max(width * 0.28, 120), 190);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Offscreen canvas for typography measurement and pixel rasterization
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    // Character parsing
    const characters = text.split("");

    // Calculate initial font size based on container width
    let fontSize = Math.floor(Math.min(width * 0.1, 72));
    if (width < 480) fontSize = Math.floor(width * 0.088);
    if (fontSize < 22) fontSize = 22;

    offCtx.fillStyle = "#ffffff";
    offCtx.textBaseline = "middle";

    // Proportional letter-spacing
    const trackingPx = Math.floor(fontSize * 0.22);

    // Measure total width considering individual character glyphs & spaces
    const measureTextWidth = (size: number) => {
      offCtx.font = `800 ${size}px "Manrope", system-ui, -apple-system, sans-serif`;
      let total = 0;
      for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        const charW = char === " " ? offCtx.measureText(" ").width * 0.7 : offCtx.measureText(char).width;
        total += charW + (i < characters.length - 1 ? trackingPx : 0);
      }
      return total;
    };

    // Auto-fit loop ensuring strict single-line display across all screen widths
    let calculatedWidth = measureTextWidth(fontSize);
    const maxWidth = width * 0.9;
    while (calculatedWidth > maxWidth && fontSize > 16) {
      fontSize -= 2;
      calculatedWidth = measureTextWidth(fontSize);
    }

    offCtx.font = `800 ${fontSize}px "Manrope", system-ui, -apple-system, sans-serif`;

    // Render characters with precise horizontal centering
    let cursorX = (width - calculatedWidth) / 2;
    const centerY = height / 2;

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const charW = char === " " ? offCtx.measureText(" ").width * 0.7 : offCtx.measureText(char).width;
      if (char !== " ") {
        offCtx.fillText(char, cursorX, centerY);
      }
      cursorX += charW + trackingPx;
    }

    // Sample raster pixels based on density
    const sampleStep = Math.max(2, Math.floor(8 - (particleDensity / 15)));
    const imgData = offCtx.getImageData(0, 0, width, height).data;

    const newParticles: Particle[] = [];

    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const index = (y * width + x) * 4;
        const alpha = imgData[index + 3];

        if (alpha > 120) {
          // Organic dispersed coordinates spread across the section
          const scatterRadiusX = (Math.random() - 0.5) * (width * 0.95);
          const scatterRadiusY = (Math.random() - 0.5) * (height * 2.0);

          newParticles.push({
            targetX: x,
            targetY: y,
            scatterX: x + scatterRadiusX,
            scatterY: y + scatterRadiusY,
            currentX: x + scatterRadiusX,
            currentY: y + scatterRadiusY,
            size: (Math.random() * 0.4 + 0.8) * particleSize,
            alpha: Math.min(Math.max((alpha / 255) * (0.6 + Math.random() * 0.4), 0.3), 1),
            driftAngle: Math.random() * Math.PI * 2,
            driftSpeed: 0.015 + Math.random() * 0.02,
            driftRadius: 2 + Math.random() * 3.5,
          });
        }
      }
    }

    // 2. CRITICAL COLD-CACHE GUARD: If 0 particles were sampled (canvas blank due to active font download or layout zero-size):
    if (newParticles.length === 0) {
      if (retryCountRef.current < 8) {
        retryCountRef.current += 1;
        if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = setTimeout(() => {
          initParticles();
        }, 120);
      }
      return;
    }

    particlesRef.current = newParticles;
    setIsReady(true);
    retryCountRef.current = 0;
  }, [text, particleDensity, particleSize]);

  // Main animation frame loop
  useEffect(() => {
    initParticles();
    updateScrollProgress();

    // 3. Listen to document.fonts.ready and loadingdone for delayed font arrivals
    let fontLoadHandler: (() => void) | null = null;
    if (typeof document !== "undefined" && "fonts" in document) {
      fontLoadHandler = () => {
        initParticles();
      };
      document.fonts.ready.then(() => {
        initParticles();
      });
      document.fonts.addEventListener("loadingdone", fontLoadHandler);
    }

    // 4. ResizeObserver ensures particles re-sample whenever container dimensions stabilize
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0) {
            initParticles();
            updateScrollProgress();
          }
        }
      });
      resizeObserver.observe(containerRef.current);
    }

    const handleResize = () => {
      initParticles();
      updateScrollProgress();
    };

    const handleScroll = () => {
      updateScrollProgress();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let time = 0;
    const render = () => {
      time += 0.03;

      // Smooth interpolation for scroll assembly/dispersion
      progressRef.current += (targetProgressRef.current - progressRef.current) * 0.09;
      const progress = progressRef.current;

      const canvas = canvasRef.current;
      if (canvas && isVisibleRef.current) {
        const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.save();
          ctx.scale(dpr, dpr);
          ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

          const particles = particlesRef.current;
          const mouse = mouseRef.current;
          const len = particles.length;

          for (let i = 0; i < len; i++) {
            const p = particles[i];

            // Lerp from dispersed scatter coordinates to crisp assembled target
            let destX = p.scatterX + (p.targetX - p.scatterX) * progress;
            let destY = p.scatterY + (p.targetY - p.scatterY) * progress;

            // Subtle organic floating drift while dispersed
            if (progress < 0.98) {
              const dispersionDrift = (1 - progress) * p.driftRadius;
              destX += Math.cos(p.driftAngle + time * p.driftSpeed) * dispersionDrift;
              destY += Math.sin(p.driftAngle + time * p.driftSpeed) * dispersionDrift;
            }

            // Interactive mouse repulsion
            if (mouse.active && progress > 0.35) {
              const dx = destX - mouse.x;
              const dy = destY - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const maxDist = 65;

              if (dist < maxDist && dist > 0) {
                const force = ((maxDist - dist) / maxDist) * 14 * progress;
                destX += (dx / dist) * force;
                destY += (dy / dist) * force;
              }
            }

            p.currentX += (destX - p.currentX) * 0.18;
            p.currentY += (destY - p.currentY) * 0.18;

            // Render particle
            const activeColor =
              color && color !== "currentColor"
                ? color
                : typeof document !== "undefined" && document.documentElement.classList.contains("dark")
                ? "#F5EFEB"
                : "#221E1C";

            ctx.beginPath();
            ctx.arc(p.currentX, p.currentY, p.size, 0, Math.PI * 2);
            ctx.fillStyle = activeColor;
            ctx.globalAlpha = Math.min(1, Math.max(0.1, p.alpha * (0.3 + progress * 0.7)));
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      if (fontLoadHandler && typeof document !== "undefined" && "fonts" in document) {
        document.fonts.removeEventListener("loadingdone", fontLoadHandler);
      }
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [initParticles, updateScrollProgress, color]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center select-none ${className}`}
    >
      {/* Graceful lightweight loading state while fonts initialize on cold cache */}
      {!isReady && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <span className="font-mono text-sm sm:text-base uppercase tracking-[0.25em] text-[var(--on-surface-variant)]/25 animate-pulse select-none">
            {text}
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`block max-w-full pointer-events-auto transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        aria-label={text}
        role="img"
      />
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default ParticleText;
