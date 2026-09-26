"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkiperClipMaskProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}

/**
 * SkiperClipMask
 * Derived from Skiper UI — Skiper 66 "SVG clip path mask" (skiper-ui.com/v1/skiper66).
 * Recreated from official Skiper UI shadcn registry schema (/r/skiper66.json).
 * Applies an organic geometric SVG clip-path mask to content containers, giving the
 * showcase viewport its signature sculpted silhouette.
 */
export function SkiperClipMask({
  id = "skiper66-project-mask",
  children,
  className,
  enabled = true,
}: SkiperClipMaskProps) {
  return (
    <>
      {/* Hidden SVG defs registering the objectBoundingBox clipPath */}
      <svg
        aria-hidden="true"
        className="absolute w-0 h-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1836 1053"
      >
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path
              d="M457.525 1.148c-20.789-3.198-193.979 1.16-283.854 2.496 11.104-.178 1.297-2.868-81.146-2.496-103.5.468-86 102.499-86 109.999s-7 524.5-6.5 547.5 10 59 6.5 99c-2.8 32-1.167 234.667 0 332.003.5 75 62.5 66.5 67 68.5s38.5 0 81.5 0 436 6 526 10.5 438.995-.5 505.495 0 330.01-12.5 417.51-12.5 230.99 2 270.99 0 40.5-16 51-31.5 12.5-61 12.5-105.5c0-44.503 7.01-274.504 7.01-348.004s-3.51-159.998-7.01-230.998 0-256.002 0-318.002 7.01-92.998-22.5-110.999c-18.79-11.471-81.99-9.999-133.49-9.999H853.525c-29 0-370 4-396 0Z"
              transform="scale(0.0005139987561, 0.0008543065594)"
            />
          </clipPath>
        </defs>
      </svg>

      <div
        style={enabled ? { clipPath: `url(#${id})` } : undefined}
        className={cn("relative overflow-hidden transition-all duration-500", className)}
      >
        {children}
      </div>
    </>
  );
}

export default SkiperClipMask;
