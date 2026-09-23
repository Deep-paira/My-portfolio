"use client";

import * as React from "react";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { HeroSection } from "@/components/sections/HeroSection";
import { DeltaParticleSection } from "@/components/sections/DeltaParticleSection";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { HandsScrollCanvas } from "@/components/sections/HandsScrollCanvas";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  const [handsTouched, setHandsTouched] = React.useState(false);

  const handleHandsTouch = React.useCallback(() => {
    setHandsTouched(true);
  }, []);

  return (
    <SmoothScroll>
      <div className="flex flex-col overflow-x-hidden">
        {/* Section 00: Asymmetrical Split-Grid Hero (Left Typography + Right 3D Model Canvas) */}
        <HeroSection />

        {/* Section 01: Contained Single-Line "D E L T A" Particle-Text on Scroll */}
        <DeltaParticleSection />

        {/* Section 02.2: Seamless Infinite Tech Stack Marquee */}
        <ClientStrip />

        {/* Section 02.5: Pre-Core Compatibility Scroll-Scrubbed Hands Canvas with Generous Breathing Room */}
        <HandsScrollCanvas onReachComplete={handleHandsTouch} />

        {/* Section 03: Core Capabilities & Compatibility */}
        <CapabilitiesSection />

        {/* Section 04: Engineering & Design Philosophy Manifesto */}
        <PhilosophySection />

        {/* Section 05: Selected Work Showcase */}
        <SelectedWorkSection />

        {/* Section 06: Animated CTA Teaser with Magnetic Button */}
        <CtaSection />
      </div>
    </SmoothScroll>
  );
}
