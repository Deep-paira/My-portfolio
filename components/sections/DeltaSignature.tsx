"use client";

import * as React from "react";
import { DeltaParticleSection } from "./DeltaParticleSection";

/**
 * DeltaSignature
 * Refactored brand signature using React Bits ParticleText with scroll-up assembly/dispersal physics.
 * Fits strictly on a single line across all viewports within max-w-4xl,
 * rendered directly over the native dark background (bg-transparent).
 */
export function DeltaSignature() {
  return <DeltaParticleSection />;
}

export { DeltaParticleSection };
export default DeltaSignature;
