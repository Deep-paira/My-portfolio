import * as React from "react";
import Link from "next/link";
import { socialLinks } from "@/data/social";

export function Footer() {
  return (
    <footer className="w-full bg-background py-12 px-6 md:px-12 lg:px-16 border-t border-outline-variant/10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2.5 items-center md:items-start text-center md:text-left">
          <Link
            href="/"
            className="font-serif text-2xl font-medium tracking-tight text-[var(--on-background)] hover:text-[var(--primary)] transition-colors"
          >
            Deep Paira
          </Link>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Full-Stack Developer (Frontend-leaning) building with React, Next.js &amp; Django. <br className="hidden md:block" />
            © {new Date().getFullYear()} Deep Paira. Open to internships &amp; junior roles.
          </p>
        </div>
         
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
