import * as React from "react";
import { cn } from "@/lib/utils";

const clients = ["Stripe", "Linear", "Vercel", "Raycast", "Arc"];

export function ClientStrip({ className }: { className?: string }) {
  return (
    <section className={cn("w-full py-10 border-y border-outline-variant/10 bg-surface/30 backdrop-blur-sm overflow-hidden", className)}>
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-24">
        <p className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-on-surface-variant mb-8 text-center md:text-left">
          Previously collaborated with
        </p>
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          {clients.map((client) => (
             <span key={client} className="font-serif text-2xl font-medium tracking-tight text-on-background">
               {client}
             </span>
          ))}
        </div>
      </div>
    </section>
  );
}
