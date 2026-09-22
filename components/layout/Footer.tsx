import * as React from "react";
import Link from "next/link";
import { socialLinks } from "@/data/social";

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-outline-variant/20 pt-12 pb-8 px-6 text-on-background">
      {/* Upper footer links / brand mark */}
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-6 mb-8">
        <Link
          href="/"
          className="group flex items-center gap-1 font-serif text-2xl font-medium tracking-tight text-[var(--on-background)] hover:text-[var(--primary)] transition-colors"
        >
          <span>Deep</span>
          <span className="text-[var(--primary)] font-serif text-2xl transition-transform duration-300 group-hover:scale-150 group-hover:translate-x-0.5 inline-block">
            .
          </span>
        </Link>
        <p className="font-sans text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed">
          Full-Stack Developer (Frontend-leaning) building with React, Next.js &amp; Django.
          Open to high-impact internships &amp; junior engineering roles.
        </p>

        {/* Navigation anchors / social links */}
        <div className="flex items-center justify-center gap-6 pt-2">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>{link.platform}</span>
              <span className="text-[10px] opacity-60">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* Centered Copyright Line */}
      <div className="w-full pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-center gap-2.5 text-center">
        <Link
          href="/"
          className="group inline-flex items-center gap-0.5 font-serif text-sm tracking-tight text-[var(--on-background)] hover:text-[var(--primary)] transition-colors duration-200"
          aria-label="Deep Paira - Home"
        >
          <span className="font-medium">Deep</span>
          <span className="text-[var(--primary)] font-serif text-sm transition-transform duration-300 group-hover:scale-150 inline-block">
            .
          </span>
        </Link>
        <span className="hidden sm:inline text-on-surface-variant/40">•</span>
        <p className="text-xs sm:text-sm text-on-surface-variant tracking-wide font-light">
          © 2026 Deep Paira. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
