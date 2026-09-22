"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Copy,
  Check,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

const TOPICS = ["Full-Stack Project", "Hiring / Role", "Say Hello"] as const;

export function ContactForm() {
  const [copied, setCopied] = React.useState(false);
  const [selectedTopic, setSelectedTopic] = React.useState<string>(TOPICS[0]);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("deeppaira45@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const validate = () => {
    const temp: Record<string, string> = {};
    if (!formData.name.trim()) temp.name = "Name is required";
    if (!formData.email.trim()) {
      temp.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      temp.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) temp.message = "Message is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: selectedTopic,
            message: formData.message,
            honeypot: formData.honeypot,
          }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error || "Failed to send message. Please try again.");
        }

        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "", honeypot: "" });
        setErrors({});
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setServerError(msg);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError(null);
  };

  return (
    <section className="w-full py-16 lg:py-24 px-6 lg:px-20 bg-transparent min-h-[90vh]">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetrical Editorial 2-Column Split (No Floating Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Direct Outreach & Status */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              {/* Availability Indicator */}
              <div className="flex items-center gap-3 text-sm text-[var(--on-surface-variant)] dark:text-neutral-400">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="font-mono text-xs tracking-wider uppercase">
                  Available for freelance contracts &amp; engineering roles
                </span>
              </div>

              {/* Large Editorial Heading */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[var(--on-background)] dark:text-white tracking-tight leading-[1] font-normal">
                Start a <br />
                <span className="italic font-serif text-[var(--primary)] font-light">
                  conversation.
                </span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-[var(--on-surface-variant)] dark:text-neutral-400 leading-relaxed max-w-md">
                Have a new venture, product architecture challenge, or full-stack role in mind?
                Fill out the brief below or reach out directly.
              </p>
            </div>

            {/* Direct Outreach Links with High-Contrast Typography & Micro-Interactions */}
            <div className="flex flex-col gap-6 pt-4 border-t border-[var(--outline-variant)]/50 dark:border-white/10">
              
              {/* Direct Email with Quick-Copy */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--on-surface-variant)] dark:text-neutral-500">
                  Direct Email
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:deeppaira45@gmail.com"
                    className="font-serif text-2xl sm:text-3xl text-[var(--on-background)] dark:text-white hover:text-[var(--primary)] transition-colors"
                  >
                    deeppaira45@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-[var(--outline-variant)] dark:border-white/20 text-[var(--on-surface-variant)] dark:text-neutral-300 hover:border-[var(--on-background)] dark:hover:border-white transition-all select-none shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location Anchor */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--on-surface-variant)] dark:text-neutral-500">
                  Location
                </span>
                <div className="flex items-center gap-2 text-base font-sans text-[var(--on-background)] dark:text-white">
                  <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0" />
                  <span>Bhubaneswar, Odisha // Remote Worldwide</span>
                </div>
              </div>

              {/* Minimalist Social Anchors */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--on-surface-variant)] dark:text-neutral-500">
                  Networks
                </span>
                <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-[var(--on-surface-variant)] dark:text-neutral-400">
                  <a
                    href="https://github.com/Deep-paira"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[var(--on-background)] dark:hover:text-white transition-colors group"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href="https://linkedin.com/in/deep-paira"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[var(--on-background)] dark:hover:text-white transition-colors group"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href="https://x.com/Deep_Paira"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[var(--on-background)] dark:hover:text-white transition-colors group"
                  >
                    <span>X / Twitter</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Ultra-Clean Cardless Inquiry Canvas */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-9">
              {/* Honeypot field */}
              <div
                className="opacity-0 absolute -z-10 select-none pointer-events-none h-0 w-0 overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="hp_form">Leave empty</label>
                <input
                  type="text"
                  id="hp_form"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>

              {/* Inline Topic / Interest Pill Selection */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--on-surface-variant)] dark:text-neutral-400">
                  I&#39;m interested in
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {TOPICS.map((topic) => {
                    const active = selectedTopic === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setSelectedTopic(topic)}
                        className={cn(
                          "px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300",
                          active
                            ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm"
                            : "border border-[var(--outline-variant)] dark:border-white/15 text-[var(--on-surface-variant)] dark:text-neutral-400 hover:text-[var(--on-background)] dark:hover:text-white hover:border-[var(--on-background)] dark:hover:border-white/30"
                        )}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minimalist Bottom-Border-Only Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="form-name"
                    className="text-xs font-mono uppercase tracking-widest text-[var(--on-surface-variant)] dark:text-neutral-400"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Maya Lin"
                    className="w-full border-b border-[var(--outline-variant)] dark:border-white/20 bg-transparent py-3.5 px-0 text-lg font-sans text-[var(--on-background)] dark:text-white placeholder:text-[var(--on-surface-variant)]/40 dark:placeholder:text-white/30 focus:border-[var(--on-background)] dark:focus:border-white focus:outline-none transition-colors duration-300"
                  />
                  {errors.name && (
                    <span className="text-red-400 text-xs font-mono mt-1">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="form-email"
                    className="text-xs font-mono uppercase tracking-widest text-[var(--on-surface-variant)] dark:text-neutral-400"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. maya@domain.com"
                    className="w-full border-b border-[var(--outline-variant)] dark:border-white/20 bg-transparent py-3.5 px-0 text-lg font-sans text-[var(--on-background)] dark:text-white placeholder:text-[var(--on-surface-variant)]/40 dark:placeholder:text-white/30 focus:border-[var(--on-background)] dark:focus:border-white focus:outline-none transition-colors duration-300"
                  />
                  {errors.email && (
                    <span className="text-red-400 text-xs font-mono mt-1">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Message (Textarea with Auto-Expand) */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="form-message"
                    className="text-xs font-mono uppercase tracking-widest text-[var(--on-surface-variant)] dark:text-neutral-400"
                  >
                    Your Message
                  </label>
                  <span className="text-xs font-mono text-[var(--on-surface-variant)]/50 dark:text-neutral-500">
                    {formData.message.length}/2000
                  </span>
                </div>
                <textarea
                  id="form-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  onInput={(e) => {
                    const target = e.currentTarget;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                  placeholder="Tell me about your project, timeline, or idea..."
                  className="w-full border-b border-[var(--outline-variant)] dark:border-white/20 bg-transparent py-3.5 px-0 text-lg font-sans text-[var(--on-background)] dark:text-white placeholder:text-[var(--on-surface-variant)]/40 dark:placeholder:text-white/30 focus:border-[var(--on-background)] dark:focus:border-white focus:outline-none transition-colors duration-300 resize-none overflow-hidden"
                />
                {errors.message && (
                  <span className="text-red-400 text-xs font-mono mt-1">{errors.message}</span>
                )}
              </div>

              {/* Server Error */}
              {serverError && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-sans">
                  {serverError}
                </div>
              )}

              {/* Submit Action: Sleek High-Contrast Action Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="self-start inline-flex items-center justify-center gap-3 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-medium px-9 py-4 rounded-full transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>

                <span className="text-xs font-mono text-[var(--on-surface-variant)] dark:text-neutral-500">
                  Response within 24 hours // Strict privacy
                </span>
              </div>

              {/* Inline Success State Reveal */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-4 p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-sans font-medium text-base text-[var(--on-background)] dark:text-white">
                        Message sent successfully.
                      </p>
                      <p className="text-sm text-[var(--on-surface-variant)] dark:text-neutral-400">
                        Thank you for reaching out. I&#39;ll review your note and get back to you within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsSuccess(false)}
                        className="text-xs font-mono text-emerald-400 underline hover:text-emerald-300 self-start mt-2"
                      >
                        Send another note
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
