import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Lightbulb,
  Workflow,
  Layers3,
  Target,
  Compass,
  Check,
} from "lucide-react";

import { AVATAR_BLUR } from "@/data/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Zaki Deza, his background, professional journey, technical interests, and approach to building digital products.",
  openGraph: {
    title: "About · Zaki Deza",
    description:
      "Professional background, journey, areas of focus, and working principles.",
    type: "profile",
  },
};

const EXPERIENCE = [
  {
    role: "Frontend / Web Developer",
    company: "Freelance",
    period: "2022 — Present",
    type: "Independent Work",
    details:
      "Designing and delivering modern web interfaces and digital experiences for clients, with an emphasis on usability, responsive layouts, and practical implementation.",
  },
  {
    role: "Fullstack Developer",
    company: "Lorehype Agency",
    period: "2024 — 2025",
    type: "Agency Experience",
    details:
      "Worked on end-to-end web development for agency projects, including frontend implementation and backend integration using React, Tailwind CSS, and Firebase.",
  },
  {
    role: "Fullstack Developer",
    company: "Abie Group",
    period: "2023 — 2024",
    type: "Professional Experience",
    details:
      "Developed corporate websites and internal tools using Laravel and React, including content management workflows and application features.",
  },
];

const PROFESSIONAL_FOCUS = [
  {
    number: "01",
    title: "Web Engineering",
    description:
      "Building modern web applications with attention to architecture, maintainability, performance, responsive interfaces, and reliable functionality.",
    capabilities: [
      "Frontend Development",
      "Backend Development",
      "API Integration",
      "Application Architecture",
    ],
    icon: Code2,
  },
  {
    number: "02",
    title: "AI Integration",
    description:
      "Exploring practical ways to integrate AI capabilities into applications and workflows, turning model capabilities into useful product features.",
    capabilities: [
      "LLM Integration",
      "AI-Powered Applications",
      "Prompt Engineering",
      "Generative AI",
    ],
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Automation & Intelligent Workflows",
    description:
      "Designing workflows that reduce repetitive work, connect different tools, and make digital processes more efficient and consistent.",
    capabilities: [
      "Workflow Automation",
      "API-Based Integration",
      "AI-Assisted Workflows",
      "Process Optimization",
    ],
    icon: Workflow,
  },
  {
    number: "04",
    title: "Digital Product Development",
    description:
      "Turning practical problems and ideas into useful digital solutions, from understanding requirements to building and improving working products.",
    capabilities: [
      "Product Thinking",
      "Problem Solving",
      "MVP Development",
      "Iterative Improvement",
    ],
    icon: Layers3,
  },
];

const WORKING_PRINCIPLES = [
  {
    number: "01",
    title: "Understand the Problem First",
    description:
      "Good implementation starts with understanding the actual problem, the people involved, and the outcome a solution should deliver.",
  },
  {
    number: "02",
    title: "Build on Solid Fundamentals",
    description:
      "Tools and frameworks change. Maintainable code, clear architecture, reliable data handling, and sound engineering fundamentals remain important.",
  },
  {
    number: "03",
    title: "Use AI with Purpose",
    description:
      "AI is a tool to improve how work gets done, not a substitute for technical understanding, critical thinking, or responsibility for the final result.",
  },
  {
    number: "04",
    title: "Prefer Practical Progress",
    description:
      "A useful working solution is more valuable than endless planning. Build incrementally, validate assumptions, learn from feedback, and improve.",
  },
];

const TECHNICAL_INTERESTS = [
  "React & Next.js",
  "TypeScript",
  "Laravel",
  "Node.js & Express",
  "REST API",
  "AI Integration",
  "Generative AI",
  "Workflow Automation",
];

function PageEyebrow({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-xs tabular-nums text-neon-green">
        {number}
      </span>
      <span className="h-px w-8 bg-border" />
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function PageSection({
  number,
  eyebrow,
  title,
  description,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-28">
      <PageEyebrow number={number} label={eyebrow} />

      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-sm leading-8 text-fg-muted sm:text-base">
            {description}
          </p>
        )}
      </div>

      <div className="mt-8">{children}</div>
    </section>
  );
}

function ExperienceTimeline() {
  return (
    <div className="relative">
      <div
        className="absolute bottom-3 left-[5px] top-3 w-px bg-border"
        aria-hidden="true"
      />

      <div className="space-y-8">
        {EXPERIENCE.map((item, index) => (
          <article
            key={`${item.company}-${item.period}`}
            className="relative pl-8"
          >
            <span
              className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-bg bg-neon-green shadow-[0_0_0_1px_var(--color-border)]"
              aria-hidden="true"
            />

            <div className="border-b border-border pb-8 last:border-b-0 last:pb-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                    {item.type}
                  </span>

                  <h3 className="mt-1 text-base font-semibold text-fg sm:text-lg">
                    {item.role}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-neon-green">
                    {item.company}
                  </p>
                </div>

                <span className="inline-flex w-fit items-center border border-border px-3 py-1.5 font-mono text-[10px] tabular-nums text-fg-muted sm:text-xs">
                  {item.period}
                </span>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-fg-muted">
                {item.details}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg">
      <article className="container pb-24 pt-28 sm:pt-32">
        {/* Page Introduction */}
        <header className="mb-16 border-b border-border pb-12 sm:mb-20 sm:pb-16">
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green"
          >
            <ArrowDown className="h-4 w-4 rotate-90 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-neon-green/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neon-green">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />
              Personal Profile
            </span>

            <span className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              About Me
            </span>
          </div>

          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-7xl">
                Building digital solutions with{" "}
                <span className="text-neon-green">purpose.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-fg-muted sm:text-lg">
                I&apos;m Zaki Deza, a web developer and Information Systems
                student interested in building practical digital products,
                exploring AI capabilities, and creating more effective ways to
                solve real-world problems through technology.
              </p>
            </div>

            <div className="flex items-center gap-4 border-t border-border pt-5 lg:min-w-[230px] lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-neon-green/50 bg-bg-elev sm:h-20 sm:w-20">
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
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neon-green">
                  whoami
                </span>
                <h2 className="mt-1 text-base font-semibold text-fg">
                  Zaki Deza
                </h2>
                <p className="mt-1 text-xs leading-5 text-fg-muted">
                  Web Developer
                  <br />
                  AI-Oriented Digital Professional
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              Based in Indonesia
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              Web Engineering
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              AI & Automation
            </span>
          </div>
        </header>

        <div className="space-y-20 sm:space-y-24">
          {/* 01 — Introduction */}
          <PageSection
            number="01"
            eyebrow="Introduction"
            title="A developer with a broader perspective."
            description="My background started in software development, and my interests have continued to expand alongside the possibilities of modern technology."
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
              <div className="space-y-5 text-sm leading-8 text-fg-muted sm:text-base">
                <p>
                  I have a background in Software Engineering and experience
                  building web applications across frontend and backend
                  development. Working with different projects has helped me
                  understand how interfaces, application logic, APIs, and data
                  work together to deliver a complete product.
                </p>

                <p>
                  Over time, my interests have expanded beyond conventional web
                  development. I&apos;m increasingly interested in Artificial
                  Intelligence, application integration, automation, and the
                  development of intelligent digital solutions.
                </p>

                <p>
                  I see technology as a means to solve practical problems. What
                  matters is not simply using the latest tools, but
                  understanding how to combine them into something useful,
                  reliable, and accessible.
                </p>
              </div>

              <div className="border border-border bg-bg-elev p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
                    Profile Snapshot
                  </span>
                  <Code2 className="h-4 w-4 text-neon-green" />
                </div>

                <dl className="space-y-5">
                  <div>
                    <dt className="text-xs text-fg-muted">Background</dt>
                    <dd className="mt-1 text-sm font-medium text-fg">
                      Software Engineering
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs text-fg-muted">Education</dt>
                    <dd className="mt-1 text-sm font-medium text-fg">
                      Information Systems
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs text-fg-muted">Professional Base</dt>
                    <dd className="mt-1 text-sm font-medium text-fg">
                      Fullstack Web Development
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs text-fg-muted">
                      Expanding Interests
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-6 text-fg">
                      AI Integration, Automation & Digital Products
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </PageSection>

          {/* 02 — Background & Journey */}
          <PageSection
            number="02"
            eyebrow="Background & Journey"
            title="Learning, building, and growing through experience."
            description="My journey combines a foundation in software development, ongoing academic learning, and practical experience working on web projects."
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="space-y-7">
                <div className="border border-border bg-bg-elev p-5 sm:p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center border border-neon-green/30 text-neon-green">
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
                    Academic Background
                  </span>

                  <h3 className="mt-2 text-lg font-semibold text-fg">
                    Information Systems
                  </h3>

                  <p className="mt-1 text-sm text-fg-soft">
                    Universitas Terbuka
                  </p>

                  <p className="mt-4 text-sm leading-7 text-fg-muted">
                    Continuing my undergraduate education while developing
                    technical knowledge and a broader understanding of
                    information systems, technology, and digital solutions.
                  </p>
                </div>

                <div className="border border-border bg-bg-elev p-5 sm:p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center border border-neon-green/30 text-neon-green">
                    <Code2 className="h-5 w-5" />
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
                    Technical Foundation
                  </span>

                  <h3 className="mt-2 text-lg font-semibold text-fg">
                    Software Engineering
                  </h3>

                  <p className="mt-1 text-sm text-fg-soft">
                    Vocational High School Background
                  </p>

                  <p className="mt-4 text-sm leading-7 text-fg-muted">
                    My initial foundation in programming and software
                    development provided a starting point for learning how to
                    design, build, and maintain digital applications.
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-7 flex items-center gap-3">
                  <BriefcaseBusiness className="h-4 w-4 text-neon-green" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
                      Professional Experience
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-fg">
                      Work Experience
                    </h3>
                  </div>
                </div>

                <ExperienceTimeline />
              </div>
            </div>
          </PageSection>

          {/* 03 — Professional Focus */}
          <PageSection
            number="03"
            eyebrow="Professional Focus"
            title="Where technology meets practical problem-solving."
            description="I don't want to limit myself to a single technology or specialization. My focus is on developing strong engineering fundamentals while exploring how different technologies can work together."
          >
            <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
              {PROFESSIONAL_FOCUS.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.number}
                    className="group bg-bg p-6 transition-colors duration-200 hover:bg-bg-elev sm:p-7"
                  >
                    <div className="mb-7 flex items-center justify-between">
                      <span className="font-mono text-xs text-neon-green">
                        {item.number}
                      </span>

                      <Icon className="h-5 w-5 text-fg-muted transition-colors group-hover:text-neon-green" />
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-fg-muted">
                      {item.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="border border-border px-2.5 py-1.5 font-mono text-[10px] text-fg-soft"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 border-l-2 border-neon-green pl-5">
              <p className="text-sm leading-7 text-fg-muted">
                These areas are connected. Web engineering provides the
                foundation, AI introduces new capabilities, automation connects
                processes, and product development brings everything together
                into useful solutions.
              </p>
            </div>
          </PageSection>

          {/* 04 — Working Principles */}
          <PageSection
            number="04"
            eyebrow="Working Principles"
            title="How I approach the work."
            description="The way a solution is built matters as much as the technology behind it. These are the principles I aim to apply when learning, developing, and solving problems."
          >
            <div className="divide-y divide-border border-y border-border">
              {WORKING_PRINCIPLES.map((item) => (
                <article
                  key={item.number}
                  className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-[64px_1fr] sm:gap-6 sm:py-8"
                >
                  <span className="font-mono text-sm tabular-nums text-neon-green">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="text-base font-semibold text-fg sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-fg-muted">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </PageSection>

          {/* 05 — Current Direction */}
          <PageSection
            number="05"
            eyebrow="Current Direction"
            title="Building toward the next stage."
            description="I'm continuing to strengthen my technical foundation while exploring new ways to build useful products with modern software and AI."
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
              <div className="space-y-5 text-sm leading-8 text-fg-muted sm:text-base">
                <p>
                  My current direction is to grow as an adaptable technology
                  professional who can work across software development, AI
                  integration, automation, and digital product development.
                </p>

                <p>
                  I'm interested in understanding AI beyond simply using
                  ready-made tools: how models can be integrated into
                  applications, how intelligent workflows can be designed, and
                  how these capabilities can solve meaningful problems.
                </p>

                <p>
                  The goal is to keep learning through practical projects,
                  improve engineering judgment, and turn knowledge into
                  solutions that create real value.
                </p>
              </div>

              <div className="border border-border bg-bg-elev p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Compass className="h-4 w-4 text-neon-green" />
                  <h3 className="text-sm font-semibold text-fg">
                    Areas of Continued Learning
                  </h3>
                </div>

                <ul className="space-y-3">
                  {TECHNICAL_INTERESTS.map((interest) => (
                    <li
                      key={interest}
                      className="flex items-center gap-3 text-sm text-fg-muted"
                    >
                      <Check className="h-4 w-4 shrink-0 text-neon-green" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PageSection>
        </div>

        {/* Closing CTA */}
        <section className="mt-24 border-t border-border pt-10 sm:mt-28 sm:pt-14">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-green">
                What&apos;s Next?
              </span>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                Let&apos;s build something meaningful.
              </h2>

              <p className="mt-4 text-sm leading-7 text-fg-muted sm:text-base">
                Explore some of the projects I&apos;ve worked on, or get in
                touch to discuss an idea, collaboration, or opportunity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#projects"
                className="inline-flex h-11 items-center gap-2 border border-border px-5 text-sm font-medium text-fg transition-colors hover:border-neon-green hover:text-neon-green"
              >
                Explore Projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/#contact"
                className="inline-flex h-11 items-center gap-2 bg-neon-green px-5 text-sm font-semibold text-black transition-opacity hover:opacity-85"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
