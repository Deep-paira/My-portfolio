"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

function ClaySkeleton() {
  return (
    <div className="relative w-full h-[450px] sm:h-[500px] lg:h-[560px] flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Soft Ambient Clay Glow Placeholder */}
        <div className="h-64 w-64 rounded-full bg-[#C4623F]/15 blur-[80px]" />
        <div className="absolute h-56 w-56 rounded-full border border-[var(--outline-variant)]/40 animate-pulse" />
      </div>
    </div>
  );
}

function StaticClayFallback() {
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center p-6 select-none">
      {/* Editorial Static Clay Illustration */}
      <div className="relative w-full max-w-[340px] aspect-square rounded-[32px] bg-gradient-to-br from-[#F3ECE2] to-[#EAE1D3] border border-[var(--outline-variant)]/40 p-8 flex flex-col items-center justify-center shadow-lg overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#C4623F]/20 blur-2xl pointer-events-none" />
        <div className="relative w-40 h-40 rounded-[28px] bg-gradient-to-tr from-[#C4623F] via-[#D97754] to-[#E08A68] shadow-2xl flex items-center justify-center transform rotate-12">
          <div className="w-20 h-20 rounded-full bg-[#FAF6F0]/20 backdrop-blur-sm border border-white/30" />
        </div>
        <div className="mt-8 flex flex-col items-center gap-1 z-10">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#C4623F] uppercase">
            SCULPTURAL STUDY
          </span>
          <span className="font-serif text-sm text-[var(--on-background)]">
            Organic Form in Terracotta
          </span>
        </div>
      </div>
    </div>
  );
}

// Error Boundary to prevent any WebGL / R3F error from ever crashing the page or causing reload loops
class Safe3DBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("3D Scene caught error gracefully:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const ClayScene = dynamic(
  async () => {
    try {
      if (typeof window !== "undefined") {
        const ReactModule = await import("react");
        const r = (ReactModule as unknown as { default?: Record<string, unknown> }).default || (ReactModule as unknown as Record<string, unknown>);
        const client = (r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE || {}) as Record<string, unknown>;
        const secret = (r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED || {
          ReactCurrentOwner: client.A || { current: null },
          ReactCurrentDispatcher: client.H || { current: null },
          ReactCurrentBatchConfig: client.T || { transition: null },
          ReactCurrentActQueue: client.actQueue || { current: null },
        }) as Record<string, unknown>;

        if (!secret.ReactCurrentOwner) {
          secret.ReactCurrentOwner = client.A || { current: null };
        }
        r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = secret;
      }
      return await import("./ClayScene");
    } catch (err) {
      console.warn("ClayScene module failed to load, falling back to static presentation:", err);
      return { default: () => <StaticClayFallback /> };
    }
  },
  {
    ssr: false,
    loading: () => <ClaySkeleton />,
  }
);

interface ClayHeroSceneProps {
  replayOnScroll?: boolean;
}

export function ClayHeroScene({ replayOnScroll }: ClayHeroSceneProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return <ClaySkeleton />;
  }

  // Gracefully fallback on mobile or reduced-motion
  if (shouldReduceMotion || isMobile) {
    return <StaticClayFallback />;
  }

  return (
    <Safe3DBoundary fallback={<StaticClayFallback />}>
      <ClayScene replayOnScroll={replayOnScroll} />
    </Safe3DBoundary>
  );
}
