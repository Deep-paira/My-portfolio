"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  intensity?: number; // 0.1 to 0.5
  className?: string;
}

export function Magnetic({
  children,
  intensity = 0.3,
  className,
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
