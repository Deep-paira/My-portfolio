"use client";

import * as React from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Universal smooth scroll helper that leverages active Lenis instance
 * or falls back to native element.scrollIntoView
 */
export function scrollToTarget(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number }
) {
  if (typeof window === "undefined") return;

  const offset = options?.offset ?? -70;
  const duration = options?.duration ?? 1.4;

  if (window.__lenis) {
    window.__lenis.scrollTo(target, {
      offset,
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) {
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + offset;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    }
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Intercept in-page anchor links for smooth scrolling with offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        scrollToTarget(targetEl as HTMLElement, { offset: -70, duration: 1.4 });
        if (typeof window !== "undefined" && window.history) {
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Disable smooth scrolling if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      return () => {
        document.removeEventListener("click", handleAnchorClick);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
