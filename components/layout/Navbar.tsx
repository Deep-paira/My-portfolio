"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "../ui/ThemeToggle";
import { AvailabilityBadge } from "../ui/AvailabilityBadge";
import { MagneticButton } from "../ui/MagneticButton";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

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
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll detection: shrink height and apply frosted-glass backdrop
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        isScrolled
          ? "h-16 bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--outline-variant)]/40 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
          : "h-20 bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16">
        
        {/* Logo with tasteful editorial hover interaction */}
        <Link
          href="/"
          className="group flex items-center gap-1 font-serif text-2xl tracking-tight text-[var(--on-background)] transition-colors duration-200"
        >
          <span className="group-hover:text-[var(--primary)] transition-colors duration-200">
            Deep
          </span>
          <span className="text-[var(--primary)] font-serif text-2xl transition-transform duration-300 group-hover:scale-150 group-hover:translate-x-0.5 inline-block">
            .
          </span>
          <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--on-surface-variant)] ml-1.5 opacity-50 group-hover:opacity-90 group-hover:text-[var(--primary)] transition-all">
            Portfolio
          </span>
        </Link>

        {/* Desktop Navigation with Animated layoutId Active Indicator & Soft Hover */}
        <nav
          className="hidden md:flex items-center gap-9"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const isHovered = hoveredLink === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.href)}
                className={cn(
                  "relative py-1 font-sans text-[0.82rem] font-semibold uppercase tracking-[0.12em] transition-all duration-200",
                  isActive
                    ? "text-[var(--primary)]"
                    : "text-[var(--on-surface-variant)] hover:text-[var(--on-background)]",
                  isHovered && !isActive && "tracking-[0.15em]"
                )}
              >
                <span className="relative z-10">{link.label}</span>

                {/* Animated active underline indicator via Framer Motion layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--primary)] rounded-full"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                  />
                )}

                {/* Subtle hover draw-in line for inactive links */}
                {!isActive && isHovered && (
                  <motion.span
                    layoutId="navbar-hover-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[var(--outline-variant)] rounded-full"
                    transition={{ duration: 0.15 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side Actions: Availability, Theme, Magnetic CTA, Animated Hamburger */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="hidden lg:block">
            <AvailabilityBadge />
          </div>

          <ThemeToggle />

          {/* Magnetic CTA button */}
          <div className="hidden md:block">
            <MagneticButton href="/contact" variant="nav">
              <span>Let&#39;s Talk</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </div>

          {/* Animated Hamburger-to-X Icon Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg focus:outline-none hover:bg-[var(--surface-container-low)] transition-colors"
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7.2 } : { rotate: 0, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 340, damping: 24 }
                }
                className="w-5 h-[1.5px] bg-[var(--on-background)] block rounded-full origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.16 }}
                className="w-5 h-[1.5px] bg-[var(--on-background)] block rounded-full origin-center"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -7.2 } : { rotate: 0, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 340, damping: 24 }
                }
                className="w-5 h-[1.5px] bg-[var(--on-background)] block rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Menu with Staggered Link Reveals */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 top-0 z-40 bg-[var(--background)]/98 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-10 px-8 sm:px-12 md:hidden"
          >
            {/* Staggered Navigation Links */}
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.08,
                    staggerChildren: shouldReduceMotion ? 0 : 0.06, // 60ms stagger per link
                  },
                },
              }}
              className="flex flex-col gap-5 my-auto"
            >
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname === link.href;

                return (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.35,
                          ease: [0.23, 1, 0.32, 1],
                        },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4 py-2 border-b border-[var(--outline-variant)]/30 transition-colors"
                    >
                      <span className="font-mono text-xs tracking-widest text-[var(--primary)] font-medium">
                        {`0${index + 1}`}
                      </span>
                      <span
                        className={cn(
                          "font-serif text-3xl sm:text-4xl transition-all duration-200 group-hover:translate-x-2 group-hover:text-[var(--primary)]",
                          isActive
                            ? "text-[var(--primary)] italic font-light"
                            : "text-[var(--on-background)] font-normal"
                        )}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Mobile Footer Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="pt-6 border-t border-[var(--outline-variant)]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[var(--on-surface-variant)] uppercase tracking-wider"
            >
              <div className="flex items-center gap-3">
                <AvailabilityBadge />
              </div>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-[var(--primary)] hover:underline inline-flex items-center gap-1 font-sans text-sm capitalize font-medium"
              >
                <span>Start a conversation</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
