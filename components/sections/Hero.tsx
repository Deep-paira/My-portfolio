"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "../ui/Button";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: [0.23, 1, 0.32, 1], duration: 1 } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[75vh] w-full items-center overflow-hidden px-6 md:px-12 lg:px-24">
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-8"
        >
          <motion.div variants={item}>
             <h1 className="font-serif text-[3.25rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[0.95] tracking-tight text-on-background font-medium">
              Crafting <br />
              <span className="text-on-surface-variant italic">Digital</span> <br />
              <span className="relative">
                Experiences.
                <span className="absolute bottom-[10%] left-0 h-[0.15em] w-full bg-primary/80 -z-10 mix-blend-screen"></span>
              </span>
            </h1>
          </motion.div>
          
          <motion.p variants={item} className="font-sans text-lg md:text-xl text-on-surface-variant max-w-md leading-relaxed mt-4">
            Hi, I'm Deep. A UI/UX Designer elevating digital products through rigorous editorial minimalism and strategic storytelling.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mt-6">
            <Button size="lg" variant="primary" href="/work">View Work</Button>
            <Button size="lg" variant="secondary" href="/contact">Get in Touch</Button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="hidden lg:flex relative w-full h-[600px] items-center justify-center pointer-events-none"
        >
          {/* Image Composition */}
          <div className="relative w-full aspect-[4/5] max-w-[450px] overflow-hidden rounded-[24px] bg-[var(--surface-container-low)]">
            <Image 
              src="/deep.jpeg" 
              alt="Deep" 
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
