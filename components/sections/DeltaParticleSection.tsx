"use client";

import React from "react";
import ParticleText from "@/components/reactbits/ParticleText";

export const DeltaParticleSection: React.FC = () => {
  return (
    <section className="relative w-full py-14 sm:py-20 md:py-24 flex items-center justify-center bg-transparent overflow-hidden">
      <div className="w-full max-w-4xl px-4 flex items-center justify-center">
        <ParticleText
          text="D E L T A"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-on-background select-none whitespace-nowrap text-center tracking-[0.2em] sm:tracking-[0.25em]"
          particleDensity={55}
          particleSize={1.6}
          scrollTriggerDirection="up"
          color="currentColor"
        />
      </div>
    </section>
  );
};

export default DeltaParticleSection;
