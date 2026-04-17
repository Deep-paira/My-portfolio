import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.6875rem] font-mono tracking-widest uppercase transition-colors focus:outline-none",
        variant === "default" && "bg-surface-container-high text-on-surface-variant",
        variant === "outline" && "text-on-surface-variant ghost-border",
        className
      )}
      {...props}
    />
  );
}
