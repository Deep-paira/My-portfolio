"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  flex?: boolean;
  stroke?: boolean;
  textColor?: string;
  strokeColor?: string;
  minFontSize?: number;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  className?: string;
}

/**
 * TextPressure (React Bits text-animations/text-pressure)
 * Interactive variable font component reacting to cursor proximity with spring physics,
 * dynamically deforming font weight (wght) and width (wdth) axes with a gentle floating idle state.
 */
export function TextPressure({
  text = "DELTA",
  fontFamily = "'Roboto Flex', var(--font-sans), sans-serif",
  flex = true,
  stroke = false,
  textColor = "#ffffff",
  strokeColor = "#5227ff",
  minFontSize = 60,
  width = true,
  weight = true,
  italic = false,
  alpha = false,
  className = "",
}: TextPressureProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const charsRef = React.useRef<(HTMLSpanElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const chars = React.useMemo(() => text.split(""), [text]);

  // Spring & physics state per character (resting in clean ultra-condensed/thin state: wght 100, wdth 40)
  const physicsState = React.useRef(
    chars.map(() => ({
      currentWght: 100,
      targetWght: 100,
      currentWdth: 40,
      targetWdth: 40,
      currentY: 0,
      targetY: 0,
      currentScale: 1,
      targetScale: 1,
    }))
  );

  // Reinitialize if text length changes
  React.useEffect(() => {
    physicsState.current = chars.map(() => ({
      currentWght: 100,
      targetWght: 100,
      currentWdth: 40,
      targetWdth: 40,
      currentY: 0,
      targetY: 0,
      currentScale: 1,
      targetScale: 1,
    }));
  }, [chars]);

  const mousePos = React.useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Mouse event handlers
  React.useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  // Animation RAF loop with damping
  React.useEffect(() => {
    if (shouldReduceMotion) return;

    let animationFrameId: number;
    const DAMPING = 0.12; // smooth spring feel matching React Bits
    const RADIUS = 340;   // cursor influence radius in px across section

    const animate = (time: number) => {
      const container = containerRef.current;
      if (!container) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      charsRef.current.forEach((charEl, idx) => {
        if (!charEl) return;
        const state = physicsState.current[idx];
        if (!state) return;

        const rect = charEl.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        let influence = 0;

        if (mousePos.current.active) {
          const dx = mousePos.current.x - charCenterX;
          const dy = mousePos.current.y - charCenterY;
          const dist = Math.hypot(dx, dy);

          if (dist < RADIUS) {
            influence = Math.max(0, 1 - dist / RADIUS);
            // Non-linear falloff for punchy tactile pressure
            influence = Math.pow(influence, 1.4);
          }
        }

        // Idle state: Characters rest in a clean, ultra-condensed/thin aspect ratio
        const wave = Math.sin(time * 0.002 + idx * 0.8);
        const idleWght = 100 + (shouldReduceMotion ? 0 : wave * 18);
        const idleWdth = 40 + (shouldReduceMotion ? 0 : wave * 4);
        const idleY = shouldReduceMotion ? 0 : wave * 2.5;

        if (influence > 0.01) {
          // Proximity state: Letters dynamically swell in width and stroke thickness as pointer moves across DELTA
          state.targetWght = weight ? 100 + influence * 800 : 100; // reaches 900
          state.targetWdth = width ? 40 + influence * 110 : 40;     // reaches 150
          state.targetScale = 1 + influence * 0.08;
          state.targetY = -influence * 6;
        } else {
          // Return to ultra-condensed/thin resting state
          state.targetWght = idleWght;
          state.targetWdth = idleWdth;
          state.targetScale = 1;
          state.targetY = idleY;
        }

        // Smooth Lerp
        state.currentWght += (state.targetWght - state.currentWght) * DAMPING;
        state.currentWdth += (state.targetWdth - state.currentWdth) * DAMPING;
        state.currentScale += (state.targetScale - state.currentScale) * DAMPING;
        state.currentY += (state.targetY - state.currentY) * DAMPING;

        // Apply variable font variation settings & transforms directly to style
        const fontSettings: string[] = [];
        if (weight) fontSettings.push(`'wght' ${Math.round(state.currentWght)}`);
        if (width) fontSettings.push(`'wdth' ${Math.round(state.currentWdth)}`);
        if (italic) fontSettings.push(`'ital' 1`);

        charEl.style.fontVariationSettings = fontSettings.join(", ");
        charEl.style.transform = `scale(${state.currentScale.toFixed(3)}) translateY(${state.currentY.toFixed(2)}px)`;

        if (alpha) {
          const charOpacity = 0.5 + influence * 0.5;
          charEl.style.opacity = charOpacity.toFixed(2);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion, weight, width, italic, alpha]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative select-none overflow-visible w-full py-4 text-center",
        flex ? "flex items-center justify-between" : "inline-block",
        className
      )}
      style={{
        fontFamily,
      }}
    >
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          ref={(el) => {
            charsRef.current[index] = el;
          }}
          className={cn(
            "inline-block font-pressure transition-colors duration-200 cursor-default",
            stroke ? "stroke-text" : ""
          )}
          style={{
            fontSize: `clamp(${minFontSize}px, 16vw, 15rem)`,
            lineHeight: 0.85,
            color: stroke
              ? "transparent"
              : textColor === "#ffffff"
              ? "var(--text-pressure-color, #ffffff)"
              : textColor,
            WebkitTextStroke: stroke ? `2px ${strokeColor}` : undefined,
            fontVariationSettings: shouldReduceMotion
              ? "'wght' 300, 'wdth' 60"
              : "'wght' 100, 'wdth' 40",
            willChange: "transform, font-variation-settings",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

export default TextPressure;
