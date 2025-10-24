"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useAnimation,
  useInView,
  easeOut,
} from "framer-motion";
import Button from "@/components/ui/Button";

const NAME = "Zaki Deza";

export default function Hero() {
  const reduce = useReducedMotion();
  const controls = useAnimation();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", amount: 0.15 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useTransform(x, (v) => (v / 100) * 8);
  const rotateX = useTransform(y, (v) => (v / 100) * -6);
  const translateY = useTransform(y, (v) => (Math.abs(v) / 100) * -6);
  const floatY = reduce ? 0 : [-6, 0, -6];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
  };

  // ✅ fixed ease array
  const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut }
  },
};


  useEffect(() => {
    if (reduce) {
      controls.stop();
      controls.set("show");
      return;
    }

    // ✅ cross-platform type (Node & browser)
    let t: ReturnType<typeof setTimeout>;

    if (inView) {
      controls.set("hidden");
      t = setTimeout(() => {
        void controls.start("show");
      }, 90);
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(t);
  }, [inView, controls, reduce]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent, el: HTMLElement | null) => {
      if (reduce) return;
      const rect = el?.getBoundingClientRect();
      if (!rect) return;
      const px = e.clientX - (rect.left + rect.width / 2);
      const py = e.clientY - (rect.top + rect.height / 2);
      const clamp = (v: number, m = 40) => Math.max(-m, Math.min(m, v));
      x.set(clamp(px));
      y.set(clamp(py));
    },
    [reduce, x, y]
  );

  const onPointerLeave = useCallback(() => {
    if (reduce) return;
    x.set(0);
    y.set(0);
  }, [x, y, reduce]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative pt-24 md:pt-32 lg:pt-40 pb-20 md:pb-28 overflow-hidden transition-colors duration-300"
    >
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10"
        >
          {/* Left Section */}
          <div className="lg:col-span-2 max-w-3xl lg:w-5/6">
            <span className="sr-only">{NAME}</span>

            <motion.h1
              variants={fadeUp}
              className="font-extrabold leading-tight text-[clamp(2rem,4vw,3.5rem)] text-balance"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-secondary-green to-secondary-blue bg-clip-text text-transparent animate-gradient">
                Zaki Deza
              </span>{" "}
              — Fullstack Web Developer.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 md:mt-6 text-[clamp(1rem,1.5vw,1.125rem)] text-muted-foreground/90 leading-relaxed max-w-2xl dark:text-white/80"
            >
              Self-taught Web Developer passionate about building scalable, user-friendly, and AI-powered web applications using React.js, Laravel, and Express.js.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 md:mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={reduce ? {} : { scale: 1.04 }}
                whileTap={reduce ? {} : { scale: 0.97 }}
                aria-label="View projects"
              >
                <Button className="px-5 py-2.5 rounded-md text-white bg-gradient-to-bl from-secondary-green to-secondary-blue shadow-[0_0_25px_-8px_rgba(0,255,255,0.3)] hover:shadow-[0_0_35px_-8px_rgba(0,255,255,0.5)] transition-all">
                  View Projects
                </Button>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={reduce ? {} : { scale: 1.03 }}
                whileTap={reduce ? {} : { scale: 0.97 }}
                aria-label="Contact me"
              >
                <Button className="border border-black/10 dark:border-white/20 text-black dark:text-white px-4 py-2 rounded-md bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300">
                  Contact Me
                </Button>
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap items-center gap-3 text-[clamp(0.85rem,1vw,0.95rem)] text-muted-foreground dark:text-white/60"
            >
              <span>
                Open for <strong className="text-current">remote & collabs</strong>
              </span>
              <span className="hidden sm:inline">•</span>
              <a
                href="https://github.com/Zakid19"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-secondary-blue transition"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/zaki-deza-31666719a"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-secondary-blue transition"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Avatar Section */}
          <motion.div
            variants={fadeUp}
            className="hidden lg:flex items-center justify-center"
            onPointerMove={(e) => onPointerMove(e, e.currentTarget as HTMLElement)}
            onPointerLeave={onPointerLeave}
            style={{ perspective: reduce ? undefined : 900 }}
          >
            <motion.div
              style={{
                rotateY: rotateY as any,
                rotateX: rotateX as any,
                translateY: translateY as any,
              }}
              animate={reduce ? {} : { y: floatY }}
              transition={
                reduce
                  ? {}
                  : { duration: 4.5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] } // ✅ easeInOut array
              }
              className="relative w-[clamp(12rem,20vw,18rem)] h-[clamp(12rem,20vw,18rem)] rounded-2xl overflow-hidden shadow-[0_0_30px_-8px_rgba(0,255,255,0.3)] bg-gradient-to-br from-secondary-green/10 to-secondary-blue/10"
            >
              <Image
                src="/assets/images/avatar.png"
                alt="Portrait of Zaki Deza"
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 1024px) 40vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-primary/20 via-transparent to-transparent opacity-40 pointer-events-none" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
