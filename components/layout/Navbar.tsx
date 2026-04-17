"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ui/ThemeToggle";
import { AvailabilityBadge } from "../ui/AvailabilityBadge";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-glass border-b border-outline-variant/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-[var(--on-background)] hover:opacity-80 transition-opacity">
          Deep | Portfolio
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-sans text-[0.9rem] font-semibold uppercase tracking-widest transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-on-surface-variant"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:block">
            <AvailabilityBadge />
          </div>
          <ThemeToggle />
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b border-outline-variant/10 p-8 flex flex-col gap-8 shadow-2xl md:hidden">
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "font-sans text-xl font-medium tracking-wide transition-colors",
                  pathname === link.href ? "text-primary" : "text-on-surface-variant"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="w-fit mt-4">
            <AvailabilityBadge />
          </div>
        </div>
      )}
    </header>
  );
}
