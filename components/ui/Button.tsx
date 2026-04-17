"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-[12px] text-sm font-medium transition-all duration-300 ease-custom-quintic focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
      {
        "primary-gradient text-[var(--on-primary-container)] hover:opacity-90": variant === "primary",
        "bg-[var(--surface-container-high)] ghost-border text-[var(--on-background)] hover:bg-[var(--outline-variant)]/20": variant === "secondary",
        "text-[var(--primary-fixed-dim)] underline decoration-[var(--primary-fixed-dim)]/30 hover:decoration-[var(--primary-fixed-dim)]/100 underline-offset-4": variant === "tertiary",
        "hover:bg-[var(--surface-container-high)] text-[var(--on-background)]": variant === "ghost",
        "h-12 px-8 py-2": size === "default",
        "h-10 rounded-md px-4": size === "sm",
        "h-14 px-10 text-base": size === "lg",
        "h-12 w-12": size === "icon",
      },
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {props.children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
