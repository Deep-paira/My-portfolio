"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", color: "#A78BFA" },
  { name: "CSS", color: "#A78BFA" },
  { name: "JavaScript", color: "#A78BFA" },
  { name: "React", color: "#A78BFA" },
  { name: "Next.js", color: "#A78BFA" },
  { name: "Node.js", color: "#60A5FA" },
  { name: "Tailwind", color: "#4ADE80" },
  { name: "Bootstrap", color: "#4ADE80" },
  { name: "Python", color: "#60A5FA" },
  { name: "Django", color: "#60A5FA" },
  { name: "Git", color: "#FACC15" },
  { name: "GitHub", color: "#FACC15" },
  { name: "Vercel", color: "#4ADE80" },
  { name: "Netlify", color: "#4ADE80" },
  { name: "Figma", color: "#FACC15" },
  { name: "Canva", color: "#FACC15" }
];

export function ClientStrip({ className }: { className?: string }) {
  // Duplicate 3 times for a perfectly seamless 33.333% css transform animation loop
  const rowItems = [...skills, ...skills, ...skills];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn(
        "w-full border-t border-[var(--outline-variant)] relative overflow-hidden py-12 marquee-wrapper",
        className
      )}
    >
      <p className="text-center text-[11px] font-mono tracking-[0.2em] text-[var(--on-surface-variant)] uppercase mb-6">
        WORKING WITH
      </p>

      <div 
        className="relative w-full"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="marquee-track marquee-row-1 hover:[animation-play-state:paused]">
            {rowItems.map((skill, index) => (
              <SkillPill key={`row1-${index}`} skill={skill} />
            ))}
          </div>

          <div className="marquee-track marquee-row-2 hover:[animation-play-state:paused]">
            {rowItems.map((skill, index) => (
              <SkillPill key={`row2-${index}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SkillPill({ skill }: { skill: { name: string; color: string } }) {
  return (
    <div className="flex items-center px-[20px] py-[10px] rounded-full whitespace-nowrap text-[13px] font-medium tracking-[0.03em] font-sans border transition-all duration-200 cursor-default hover:scale-[1.08] dark:bg-[rgba(167,139,250,0.08)] dark:border-[rgba(167,139,250,0.2)] dark:text-[#F0EDE8] dark:hover:shadow-[0_0_16px_rgba(167,139,250,0.35)] bg-[rgba(124,92,219,0.07)] border-[rgba(124,92,219,0.18)] text-[#111111] hover:shadow-[0_0_16px_rgba(124,92,219,0.25)]">
      <span 
        className="inline-block w-[6px] h-[6px] rounded-full mr-[7px]"
        style={{ backgroundColor: skill.color }}
      />
      {skill.name}
    </div>
  );
}
