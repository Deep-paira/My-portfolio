import * as React from "react";
import { cn } from "@/lib/utils";

interface StatItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
}

export function StatItem({ value, label, className, ...props }: StatItemProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <span className="font-serif text-4xl text-on-background">{value}</span>
      <span className="font-sans text-sm text-on-surface-variant">{label}</span>
    </div>
  );
}
