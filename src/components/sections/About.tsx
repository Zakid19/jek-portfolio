"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { CheckCircle2, CalendarDays, Briefcase } from "lucide-react";
import Section from "@/components/ui/Section";
import { AVATAR_BLUR } from "@/data/projects";

const EXPERTISE = [
  "React & Next.js",
  "TypeScript",
  "Laravel & Express",
  "REST & API Design",
  "UI/UX & Animation",
  "AI-Augmented Workflows",
];

const EXPERIENCE = [
  {
    role: "Frontend / Web Developer",
    company: "Freelance",
    period: "2022 — Present",
    details:
      "Designing and shipping modern interfaces and crypto-themed experiences for international clients.",
  },
  {
    role: "Fullstack Developer",
    company: "Lorehype Agency",
    period: "2024 — 2025",
    details:
      "Owned end-to-end fullstack delivery for agency projects spanning React, Tailwind, and Firebase.",
  },
  {
    role: "Fullstack Developer",
    company: "Abie Group",
    period: "2023 — 2024",
    details:
      "Built corporate websites and internal tools with Laravel + React, integrating CMS workflows.",
  },
];

export default function About() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Spotlight follow-cursor — desktop pointer only
  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const node = sectionRef.current;
    if (!node) return;
    const pointer = node.querySelector<HTMLDivElement>(".spotlight-pointer");
    if (!pointer) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        pointer.style.transform = `translate3d(${e.clientX - 160}px, ${e.clientY - 160}px, 0)`;
      });
    };
    node.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      node.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineer, builder, lifelong learner."
      subtitle="Self-taught fullstack developer with a product-first mindset — focused on clean code, fast iteration, and AI-accelerated workflows."
    >
      <div ref={sectionRef} className="relative spotlight-area">
        <div className="spotlight-pointer" aria-hidden />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left column */}
          <div className="space-y-8">
            {/* Profile card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl p-8 glass neon-edge overflow-hidden"
            >
              <div className="flex items-start gap-5">
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-neon-cyan/30 shadow-glow-soft flex-shrink-0">
                  <Image
                    src="/assets/images/avatar.png"
                    alt="Zaki Deza"
                    fill
                    sizes="80px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={AVATAR_BLUR}
                  />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
                    /whoami
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-fg">Zaki Deza</h3>
                  <p className="text-sm text-fg-muted">Fullstack Web Developer · Remote</p>
                </div>
              </div>

              <p className="mt-6 text-sm sm:text-[15px] leading-relaxed text-fg-soft">
                I&apos;m a self-taught fullstack developer experienced in building scalable,
                user-friendly web applications with{" "}
                <span className="text-fg font-medium">React</span>,{" "}
                <span className="text-fg font-medium">Next.js</span>,{" "}
                <span className="text-fg font-medium">Laravel</span>, and{" "}
                <span className="text-fg font-medium">Express</span>. I care about clean code,
                fast execution, and leveraging AI-assisted workflows to ship better products
                in less time.
              </p>
            </motion.div>

            {/* Expertise */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl p-7 glass neon-edge"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-neon-cyan mb-4">
                Core Expertise
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {EXPERTISE.map((skill) => (
                  <li
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm border border-neon-cyan/20 bg-neon-cyan/[0.04] text-fg-soft hover:text-neon-cyan hover:border-neon-cyan/50 hover:shadow-glow-soft transition-all duration-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-cyan" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right column — Timeline */}
          <div id="work" ref={timelineRef} className="relative pl-10">
            <motion.div
              style={{ height: progressHeight, opacity: progressOpacity }}
              className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-neon-green via-neon-cyan to-neon-purple rounded-full shadow-[0_0_20px_rgb(34_211_238_/_0.6)]"
              aria-hidden
            />
            <div className="absolute left-0 top-0 w-[2px] h-full bg-fg/10 dark:bg-white/[0.06] rounded-full" aria-hidden />

            <div className="flex items-center gap-2 mb-8">
              <Briefcase className="w-5 h-5 text-neon-cyan" />
              <h3 className="font-semibold text-xl text-fg">Professional Journey</h3>
            </div>

            <div className="space-y-6">
              {EXPERIENCE.map((exp, i) => (
                <motion.article
                  key={exp.company + exp.period}
                  initial={reduce ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative rounded-xl p-6 glass neon-edge hover:shadow-glow-soft transition-shadow duration-500"
                >
                  <div className="absolute -left-[11px] top-7 w-4 h-4 rounded-full bg-gradient-to-br from-neon-green to-neon-cyan shadow-[0_0_15px_rgb(34_211_238_/_0.7)]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-fg text-base">{exp.role}</h4>
                    <span className="font-mono text-xs text-neon-cyan inline-flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-sm text-neon-purple mt-1">{exp.company}</div>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{exp.details}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
