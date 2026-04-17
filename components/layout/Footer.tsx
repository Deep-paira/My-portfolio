import * as React from "react";
import Link from "next/link";
import { socialLinks } from "@/data/social";

export function Footer() {
  return (
    <footer className="w-full bg-background py-10 px-6 md:px-12 lg:px-16 border-t border-outline-variant/10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
          <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-[var(--on-background)] hover:opacity-80 transition-opacity">
            Deep | Portfolio
          </Link>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Crafting digital experiences rooted in editorial minimalism. <br className="hidden md:block" />
            © {new Date().getFullYear()} Deep.
          </p>
        </div>
        
        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-medium tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
