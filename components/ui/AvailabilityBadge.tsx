import * as React from "react";
import { cn } from "@/lib/utils";

export function AvailabilityBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-surface-container-high ghost-border",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
      </span>
      <span className="text-xs font-sans text-on-background tracking-wide">
        Available for work
      </span>
    </div>
  );
}
