"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useReducedMotion, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  decimals?: number;
  once?: boolean;
}

/**
 * AnimatedNumber (Adapted from Skiper UI Skiper 37)
 * Animates a numeric count-up into place using Framer Motion springs upon entering viewport.
 * Zero external dependencies (no @number-flow/react required).
 * Fully respects prefers-reduced-motion.
 */
export function AnimatedNumber({
  value,
  from = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  delay = 0.1,
  decimals,
  once = true,
  className,
  ...props
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  // Determine decimals from target value if not explicitly specified
  const resolvedDecimals =
    decimals !== undefined
      ? decimals
      : value.toString().includes(".")
      ? value.toString().split(".")[1].length
      : 0;

  const [displayValue, setDisplayValue] = React.useState<number>(
    shouldReduceMotion ? value : from
  );

  const motionValue = useMotionValue(from);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Luxury editorial ease
        onUpdate: (latest) => {
          setDisplayValue(latest);
        },
      });

      return () => controls.stop();
    } else if (!once) {
      motionValue.set(from);
      setDisplayValue(from);
    }
  }, [isInView, value, from, duration, delay, shouldReduceMotion, once, motionValue]);

  const formattedValue = React.useMemo(() => {
    if (resolvedDecimals > 0) {
      return displayValue.toFixed(resolvedDecimals);
    }
    return Math.round(displayValue).toLocaleString();
  }, [displayValue, resolvedDecimals]);

  return (
    <span
      ref={ref}
      className={cn("inline-flex items-baseline tabular-nums", className)}
      {...props}
    >
      {prefix && <span className="opacity-80">{prefix}</span>}
      <span>{formattedValue}</span>
      {suffix && <span className="opacity-80 ml-0.5">{suffix}</span>}
    </span>
  );
}

export default AnimatedNumber;
