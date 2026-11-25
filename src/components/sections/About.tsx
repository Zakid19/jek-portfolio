"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

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
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineer, builder, lifelong learner."
      subtitle="A web developer with a product-oriented mindset, exploring the intersection of software engineering, AI integration, and practical digital solutions."
    >
      <div className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT COLUMN */}
          <div className="space-y-6 sm:space-y-8">
            {/* PROFILE CARD */}
            <div className="border border-border bg-bg-elev p-6 transition-colors duration-300 hover:border-neon-green/40 sm:p-8">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* AVATAR */}
                <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full border border-neon-green/50 bg-bg sm:h-20 sm:w-20">
                  <Image
                    src="/assets/images/avatar.png"
                    alt="Zaki Deza"
                    fill
                    sizes="(max-width: 640px) 68px, 80px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={AVATAR_BLUR}
                  />
                </div>

                {/* IDENTITY */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-neon-green sm:text-xs">
                      whoami
                    </span>
                    <span className="h-px w-6 bg-border" />
                  </div>

                  <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-fg sm:text-xl">
                    Zaki Deza
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-fg-muted sm:text-sm">
                    Web Developer · AI-Oriented Digital Professional
                  </p>
                </div>
              </div>

              <div className="my-5 h-px w-full bg-border sm:my-6" />

              <p className="text-sm font-normal leading-7 text-fg-soft sm:text-[15px]">
                I&apos;m a web developer with a background in software
                engineering and experience building web applications using{" "}
                <span className="font-semibold text-fg">React</span>,{" "}
                <span className="font-semibold text-fg">Next.js</span>,{" "}
                <span className="font-semibold text-fg">Laravel</span>, and{" "}
                <span className="font-semibold text-fg">Express</span>. My
                interests extend to AI integration, automation, and building
                practical digital products.
              </p>

              <Link
                href="/about"
                className="group mt-6 inline-flex items-center gap-2 border-b border-neon-green/40 pb-1.5 text-sm font-medium text-neon-green transition-colors hover:border-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green"
              >
                Explore My Background
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* EXPERTISE */}
            <div className="border border-border bg-bg-elev p-6 transition-colors duration-300 hover:border-neon-green/40 sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
                    Capabilities
                  </span>
                  <h3 className="mt-1 text-base font-semibold tracking-tight text-fg sm:text-lg">
                    Core Expertise
                  </h3>
                </div>

                <span className="font-mono text-xs tabular-nums text-fg-muted">
                  {String(EXPERTISE.length).padStart(2, "0")}{" "}
                  <span className="text-border">/</span>{" "}
                  {String(EXPERTISE.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="flex flex-wrap gap-2">
                {EXPERTISE.map((skill) => (
                  <li
                    key={skill}
                    className="inline-flex items-center gap-2 border border-border bg-bg px-3 py-2 text-xs font-medium text-fg-soft transition-colors duration-200 hover:border-neon-green/60 hover:text-neon-green sm:text-sm"
                  >
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0 text-neon-green"
                      aria-hidden="true"
                    />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN — EXPERIENCE TIMELINE */}
          <div id="work" ref={timelineRef} className="relative pl-9 sm:pl-10">
            {/* TIMELINE BASE TRACK */}
            <div
              className="absolute bottom-0 left-0 top-0 z-0 w-px bg-border"
              aria-hidden="true"
            />

            {/* TIMELINE SCROLL PROGRESS */}
            {!reduce && (
              <motion.div
                style={{ height: progressHeight }}
                className="absolute left-0 top-0 z-[1] w-px bg-neon-green"
                aria-hidden="true"
              />
            )}

            {/* SECTION HEADING */}
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-neon-green/40 bg-bg-elev text-neon-green">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
                  Career
                </span>
                <h3 className="mt-0.5 text-lg font-semibold tracking-tight text-fg sm:text-xl">
                  Professional Journey
                </h3>
              </div>
            </div>

            {/* EXPERIENCE LIST */}
            <div className="space-y-4 sm:space-y-5">
              {EXPERIENCE.map((exp, index) => (
                <motion.article
                  key={`${exp.company}-${exp.period}`}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduce ? 0 : 0.4,
                    delay: reduce ? 0 : index * 0.08,
                  }}
                  className="group relative z-10 border border-border bg-bg-elev p-5 transition-colors duration-300 hover:border-neon-green/50 sm:p-6"
                >
                  {/* TIMELINE DOT */}
                  <div
                    className="absolute -left-[41px] top-[27px] z-20 h-3 w-3 rounded-full border-[2px] border-bg bg-neon-green shadow-[0_0_0_1px_var(--color-border)] sm:-left-[45px]"
                    aria-hidden="true"
                  />

                  {/* ROLE & PERIOD */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <h4 className="text-base font-semibold leading-snug tracking-tight text-fg transition-colors duration-200 group-hover:text-neon-green">
                      {exp.role}
                    </h4>

                    <span className="inline-flex w-fit items-center gap-1.5 border border-border bg-bg px-2.5 py-1 font-mono text-[10px] font-medium tabular-nums text-fg-muted sm:shrink-0 sm:text-[11px]">
                      <CalendarDays
                        className="h-3.5 w-3.5 shrink-0 text-neon-green"
                        aria-hidden="true"
                      />
                      {exp.period}
                    </span>
                  </div>

                  {/* COMPANY */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />
                    <span className="text-sm font-semibold text-fg-soft">
                      {exp.company}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-3 text-sm font-normal leading-7 text-fg-muted">
                    {exp.details}
                  </p>
                </motion.article>
              ))}
            </div>

            {/* FULL PROFILE LINK */}
            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green"
            >
              View Full Professional Journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
