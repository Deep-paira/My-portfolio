"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CountUpProps {
  to: number;
  from?: number;
  duration?: number; // duration in seconds
  delay?: number; // delay in seconds
  className?: string;
  onEnd?: () => void;
  formatter?: (value: number) => string;
}

/**
 * CountUp (React Bits text-animations/count-up)
 * Smoothly interpolates an integer from `from` to `to` using cubic easing
 * with requestAnimationFrame, triggering an optional `onEnd` callback.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.8,
  delay = 0,
  className,
  onEnd,
  formatter = (v) => Math.round(v).toString(),
}: CountUpProps) {
  const [value, setValue] = React.useState(from);

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const delayTimer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

        // Cubic ease-out: 1 - Math.pow(1 - progress, 3)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = from + (to - from) * easeOut;

        setValue(current);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setValue(to);
          onEnd?.();
        }
      };

      frameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(frameId);
    };
  }, [from, to, duration, delay, onEnd]);

  return <span className={cn("inline-block select-none", className)}>{formatter(value)}</span>;
}

export default CountUp;
