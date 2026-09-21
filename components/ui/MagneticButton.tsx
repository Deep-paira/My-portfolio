"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "nav" | "primary" | "outline";
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "nav",
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft elastic spring
  const springConfig = { damping: 18, stiffness: 180, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Max displacement radius: ~6px for subtle editorial restraint
    const distanceX = (e.clientX - centerX) * 0.22;
    const distanceY = (e.clientY - centerY) * 0.22;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = cn(
    "group relative inline-flex items-center justify-center font-sans text-xs uppercase tracking-[0.14em] font-medium transition-all duration-300 select-none",
    variant === "nav" &&
      "h-9 px-4 rounded-[10px] border border-[var(--outline-variant)]/60 bg-[var(--surface-container-low)]/40 text-[var(--on-background)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[#FAF6F0] hover:shadow-[0_2px_12px_rgba(196,98,63,0.25)]",
    variant === "primary" &&
      "h-11 px-6 rounded-[12px] bg-[var(--primary)] text-[#FAF6F0] hover:bg-[var(--primary-container)] hover:shadow-[0_4px_16px_rgba(196,98,63,0.3)]",
    variant === "outline" &&
      "h-10 px-5 rounded-[12px] border border-[var(--outline-variant)] text-[var(--on-background)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
    className
  );

  const content = (
    <motion.div
      ref={ref}
      style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={baseStyles}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
