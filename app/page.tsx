import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="flex flex-col overflow-x-hidden">
        {/* Section 1: Hero with 3D Clay Scene & Deep's Real Bio */}
        <Hero />

        {/* Section 2: Seamless Infinite Tech Stack Marquee */}
        <ClientStrip />

        {/* Section 3: Core Capabilities & What I Do (Full-Stack, Motion, UI/UX) */}
        <CapabilitiesSection />

        {/* Section 4: Engineering & Design Philosophy Manifesto with ScrollReveal */}
        <PhilosophySection />

        {/* Section 5: Selected Work Preview with Scroll-driven Stagger */}
        <SelectedWorkSection />

        {/* Section 6: Animated CTA Teaser with Magnetic Button */}
        <CtaSection />
      </div>
    </SmoothScroll>
  );
}
