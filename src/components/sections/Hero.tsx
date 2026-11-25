"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight, Github, Linkedin, MapPin, Sparkles } from "lucide-react";

import { AVATAR_BLUR } from "@/data/projects";

const ROLES = [
  "Fullstack Web Developer",
  "Next.js · React Engineer",
  "Laravel · Express Builder",
  "AI-Augmented Developer",
];

const STATS = [
  { value: "3+", label: "Years" },
  { value: "20+", label: "Projects" },
  { value: "10+", label: "Clients" },
];

function useTypewriter(
  words: string[],
  enabled: boolean,
  speed = 65,
  pause = 1500,
) {
  const [text, setText] = useState(enabled ? "" : words[0]);
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled || words.length === 0) return;

    const current = words[wordIdx % words.length];

    if (!deleting && text === current) {
      const timeout = window.setTimeout(() => setDeleting(true), pause);

      return () => window.clearTimeout(timeout);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((index) => (index + 1) % words.length);
      return;
    }

    const nextText = deleting
      ? current.slice(0, text.length - 1)
      : current.slice(0, text.length + 1);

    const timeout = window.setTimeout(
      () => setText(nextText),
      deleting ? speed / 1.8 : speed,
    );

    return () => window.clearTimeout(timeout);
  }, [enabled, text, deleting, wordIdx, words, speed, pause]);

  return text;
}

export default function Hero() {
  const reduce = useReducedMotion() ?? false;
  const role = useTypewriter(ROLES, !reduce);

  // Avatar tilt interaction
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateY = useSpring(
    useTransform(x, (value) => value / 12),
    { stiffness: 220, damping: 24 },
  );

  const rotateX = useSpring(
    useTransform(y, (value) => -value / 12),
    { stiffness: 220, damping: 24 },
  );

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || event.pointerType !== "mouse") return;

      const rect = event.currentTarget.getBoundingClientRect();

      const px = event.clientX - (rect.left + rect.width / 2);
      const py = event.clientY - (rect.top + rect.height / 2);

      x.set(Math.max(-60, Math.min(60, px)));
      y.set(Math.max(-60, Math.min(60, py)));
    },
    [reduce, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pb-20 lg:pt-36"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-16">
          {/* HERO CONTENT */}
          <div className="order-2 max-w-2xl lg:order-1 lg:col-span-3">
            {/* AVAILABILITY STATUS */}
            <div className="inline-flex items-center gap-2 rounded border border-neon-green/50 px-3 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-neon-green">
              <span
                className="h-1.5 w-1.5 rounded-full bg-neon-green"
                aria-hidden="true"
              />
              <Sparkles className="h-3.5 w-3.5" />
              Available for new opportunities
            </div>

            {/* MAIN HEADING */}
            <h1 className="mt-5 text-[2rem] font-extrabold leading-[1.12] tracking-[-0.05em] text-fg sm:text-5xl md:text-6xl lg:text-display-2">
              Hi, I&apos;m <span className="text-neon-green">Zaki Deza</span>
              <span className="mt-3 flex flex-wrap items-baseline gap-x-3 text-[0.68em] leading-tight sm:mt-4">
                <span className="shrink-0 font-medium text-fg-soft">
                  I&apos;m a
                </span>

                <span
                  className={`inline-block min-h-[1.2em] font-mono font-medium text-neon-green ${
                    reduce ? "" : "cursor-blink"
                  }`}
                  aria-label={reduce ? ROLES[0] : undefined}
                >
                  <span aria-hidden="true">{role || "\u00A0"}</span>
                  <span className="sr-only">{role || ROLES[0]}</span>
                </span>
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-xl text-[15px] font-normal leading-7 text-fg-muted sm:mt-6 sm:text-base md:text-lg md:leading-8">
              I craft scalable, AI-augmented web experiences with{" "}
              <span className="font-semibold text-fg">React</span>,{" "}
              <span className="font-semibold text-fg">Next.js</span>,{" "}
              <span className="font-semibold text-fg">Laravel</span> and{" "}
              <span className="font-semibold text-fg">Express</span>.
              Self-taught, product-minded, shipping clean code at speed.
            </p>

            {/* PRIMARY ACTIONS */}
            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
              <a
                href="#projects"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-neon-green bg-neon-green/10 px-5 font-semibold text-neon-green transition-colors duration-300 hover:bg-neon-green hover:text-[#000103] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-bg px-5 font-medium text-fg transition-colors duration-300 hover:border-neon-green hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Contact Me
              </a>
            </div>

            {/* LOCATION AND SOCIAL LINKS */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-neon-green" />
                Remote · Indonesia
              </span>

              <a
                href="https://github.com/Zakid19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-neon-green"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/zaki-deza-31666719a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-neon-green"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            </div>

            {/* STATS */}
            <div className="mt-9 grid max-w-md grid-cols-3 gap-2.5 sm:gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-bg p-3 text-center transition-colors duration-300 hover:border-neon-green/60 sm:p-4"
                >
                  <div className="font-mono text-xl font-bold tracking-tight text-neon-green sm:text-2xl">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-fg-muted sm:text-[0.7rem]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AVATAR */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-2 lg:justify-end">
            <div
              className="relative"
              onPointerMove={onMove}
              onPointerLeave={onLeave}
              style={{ perspective: 1000 }}
            >
              {/* SUBTLE FRAME */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 hidden rounded-[2rem] border border-border/60 sm:block"
              />

              {/* AVATAR CARD */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                transition={{
                  duration: reduce ? 0 : 0.3,
                  ease: "easeOut",
                }}
                className="group relative aspect-square w-[min(72vw,18rem)] sm:w-[clamp(14rem,32vw,20rem)]"
              >
                {/* IMAGE FRAME */}
                <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-border bg-bg transition-colors duration-300 group-hover:border-neon-green/70">
                  <Image
                    src="/assets/images/avatar.png"
                    alt="Portrait of Zaki Deza"
                    fill
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 320px, 320px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    priority
                    placeholder="blur"
                    blurDataURL={AVATAR_BLUR}
                  />

                  {/* IMAGE OVERLAY */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                  />

                  {/* STATUS BADGE */}
                  <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
                    <div className="inline-flex w-max items-center gap-2 rounded-md border border-neon-green/50 bg-[#000103]/90 px-4 py-2 font-mono text-xs font-medium text-neon-green sm:text-sm">
                      <span className="relative flex h-2 w-2 shrink-0">
                        {!reduce && (
                          <span className="absolute inset-0 animate-ping rounded-full bg-neon-green opacity-50" />
                        )}
                        <span className="relative h-2 w-2 rounded-full bg-neon-green" />
                      </span>
                      Available
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* SCROLL CUE */}
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-fg-muted transition-colors duration-300 hover:text-neon-green lg:flex"
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-fg/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[slideDown_1.8s_ease-in-out_infinite] bg-neon-green" />
          </span>
        </a>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
          }

          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
}
