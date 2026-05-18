"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
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

function useTypewriter(words: string[], enabled: boolean, speed = 65, pause = 1500) {
  const [text, setText] = useState(enabled ? "" : words[0]);
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const current = words[wordIdx % words.length];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }
    const next = deleting
      ? current.slice(0, text.length - 1)
      : current.slice(0, text.length + 1);
    const t = setTimeout(() => setText(next), deleting ? speed / 1.8 : speed);
    return () => clearTimeout(t);
  }, [enabled, text, deleting, wordIdx, words, speed, pause]);

  return text;
}

export default function Hero() {
  const reduce = useReducedMotion() ?? false;
  const role = useTypewriter(ROLES, !reduce);

  // Avatar tilt — disabled on touch
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, (v) => v / 12), { stiffness: 220, damping: 22 });
  const rotateX = useSpring(useTransform(y, (v) => -v / 12), { stiffness: 220, damping: 22 });

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || e.pointerType === "touch") return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = e.clientX - (rect.left + rect.width / 2);
      const py = e.clientY - (rect.top + rect.height / 2);
      x.set(Math.max(-60, Math.min(60, px)));
      y.set(Math.max(-60, Math.min(60, py)));
    },
    [reduce, x, y]
  );
  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden cyber-grid"
    >
      <div className="aurora" aria-hidden>
        <div className="aurora__green" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-3 max-w-2xl order-2 lg:order-1">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge-glow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Available for new opportunities
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 sm:mt-6 text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-display-2 font-extrabold tracking-tight text-fg"
            >
              Hi, I&apos;m{" "}
              <span className="text-gradient text-gradient--animated">Zaki Deza</span>
              <span className="block mt-2 sm:mt-3 text-[0.85em] sm:text-[0.75em]">
                <span className="text-fg-soft font-medium">I&apos;m a</span>{" "}
                <span className={`text-neon-cyan font-mono ${reduce ? "" : "cursor-blink"}`}>
                  {role || " "}
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 sm:mt-6 text-[15px] sm:text-base md:text-lg text-fg-muted leading-relaxed max-w-xl"
            >
              I craft scalable, AI-augmented web experiences with{" "}
              <span className="text-fg font-medium">React</span>,{" "}
              <span className="text-fg font-medium">Next.js</span>,{" "}
              <span className="text-fg font-medium">Laravel</span> and{" "}
              <span className="text-fg font-medium">Express</span>. Self-taught, product-minded,
              shipping clean code at speed.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 h-12 px-5 rounded-lg text-white font-medium bg-brand-gradient bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-glow-soft hover:shadow-glow transition-all duration-500"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-lg border border-white/15 bg-bg-elev/60 backdrop-blur-md text-fg hover:border-neon-cyan/60 hover:text-neon-cyan transition-all duration-300"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Remote · Indonesia
              </span>
              <a
                href="https://github.com/Zakid19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 link-underline hover:text-fg"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/zaki-deza-31666719a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 link-underline hover:text-fg"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-9 grid grid-cols-3 gap-2.5 sm:gap-4 max-w-md"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="relative p-3 sm:p-4 rounded-xl glass neon-edge text-center"
                >
                  <div className="text-xl sm:text-2xl font-bold font-mono text-gradient">{s.value}</div>
                  <div className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-fg-muted mt-0.5 sm:mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div
              className="relative"
              onPointerMove={onMove}
              onPointerLeave={onLeave}
              style={{ perspective: 1000 }}
            >
              {/* Orbit rings — desktop only */}
              <div className="hidden sm:block absolute -inset-4 rounded-full border border-neon-cyan/20 pulse-ring pointer-events-none" />
              <div className="hidden sm:block absolute -inset-8 rounded-full border border-neon-purple/10 pointer-events-none" />

              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-[min(72vw,18rem)] sm:w-[clamp(14rem,32vw,20rem)] aspect-square"
              >
                <div className="absolute -inset-1 rounded-[2rem] bg-brand-gradient bg-[length:200%_100%] opacity-60 sm:opacity-70 blur-md hidden sm:block" />
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden neon-edge shadow-glow">
                  <Image
                    src="/assets/images/avatar.png"
                    alt="Portrait of Zaki Deza"
                    fill
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 320px, 400px"
                    className="object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL={AVATAR_BLUR}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 px-3 py-1.5 rounded-lg glass neon-edge text-xs font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative inline-flex w-2 h-2">
                      <span className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-75" />
                      <span className="relative inline-flex rounded-full w-2 h-2 bg-neon-green" />
                    </span>
                    Available
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue — desktop only */}
        <motion.a
          href="#about"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          aria-label="Scroll to about section"
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-6 flex-col items-center gap-2 text-xs uppercase tracking-widest font-mono text-fg-muted hover:text-neon-cyan transition-colors"
        >
          Scroll
          <span className="relative w-px h-10 bg-white/20 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-neon-cyan to-transparent animate-[slideDown_1.8s_ease-in-out_infinite]" />
          </span>
        </motion.a>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
