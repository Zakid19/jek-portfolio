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
    "Discover Zaki Deza's professional background, fullstack web development experience, AI-assisted development interests, and approach to building practical digital solutions.",
  openGraph: {
    title: "About · Zaki Deza",
    description:
      "Fullstack Web Developer focused on web engineering, AI integration, automation, and practical digital product development.",
    type: "profile",
  },
};

const EXPERIENCE = [
  {
    role: "Fullstack Web Developer",
    company: "Freelance / Remote",
    period: "2023 — Present",
    type: "Independent Work",
    details:
      "Working independently with local and international clients to develop web applications and digital solutions. Responsible for end-to-end development, including Laravel backend architecture, React.js and Next.js frontend implementation, REST API integration, database management, deployment, and performance optimization. Also incorporating AI-assisted development into daily workflows for debugging, code review, and technical documentation.",
  },
  {
    role: "Fullstack Web Developer",
    company: "Lorehype Agency",
    period: "Sep 2024 — Sep 2025",
    type: "Agency Experience",
    details:
      "Developed dynamic web applications for agency clients using React.js, Tailwind CSS, and Firebase. Contributed to frontend performance optimization through code splitting, lazy loading, and asset compression. Worked with Git/Gitflow, participated in pull request reviews, and translated design and business requirements into consistent frontend implementations. Also supported content planning, copywriting, and social media activities within the agency.",
  },
  {
    role: "Fullstack Web Developer / Web Administrator",
    company: "PT Abie Indonesia Energi",
    period: "Aug 2023 — Aug 2024",
    type: "Corporate Experience",
    details:
      "Built and maintained internal business applications using Laravel, PHP, and MySQL to support daily company operations. Designed REST APIs with JWT authentication for cross-departmental data integration, helping reduce manual data entry and duplication. Also handled deployment, application monitoring, database management, CMS administration, and internal IT support.",
  },
];

const PROFESSIONAL_FOCUS = [
  {
    number: "01",
    title: "Web Engineering",
    description:
      "Developing fullstack web applications and business systems, covering frontend interfaces, backend logic, REST API development, database integration, and application deployment with an emphasis on maintainability and performance.",
    capabilities: [
      "Frontend Development",
      "Backend Development",
      "REST API & Integration",
      "Database Design",
      "Application Architecture",
    ],
    icon: Code2,
  },
  {
    number: "02",
    title: "AI Integration",
    description:
      "Exploring how large language models and generative AI capabilities can be integrated into applications to support information processing, intelligent features, and more effective digital experiences.",
    capabilities: [
      "LLM API Integration",
      "AI-Powered Applications",
      "Prompt Engineering",
      "Context Engineering",
      "Generative AI",
    ],
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Automation & Intelligent Workflows",
    description:
      "Designing practical workflows that connect applications, APIs, and AI capabilities to reduce repetitive tasks, streamline processes, and improve consistency across digital operations.",
    capabilities: [
      "Workflow Automation",
      "API-Based Integration",
      "AI-Assisted Workflows",
      "Process Optimization",
      "Development Automation",
    ],
    icon: Workflow,
  },
  {
    number: "04",
    title: "Digital Product Development",
    description:
      "Turning business requirements and practical problems into functional digital products, from understanding user needs and defining system requirements to implementation, testing, and iterative improvement.",
    capabilities: [
      "Product Thinking",
      "Requirement Analysis",
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
      "Every useful solution starts with understanding the actual problem, business requirements, user needs, and expected outcomes before choosing technologies or implementing features.",
  },
  {
    number: "02",
    title: "Build on Solid Fundamentals",
    description:
      "Frameworks and tools continue to evolve, but clean code, maintainable architecture, reliable data management, security, and sound engineering principles remain essential.",
  },
  {
    number: "03",
    title: "Use AI with Purpose",
    description:
      "AI can improve productivity, support technical exploration, and accelerate development workflows. However, every output still requires critical evaluation, technical understanding, and manual verification.",
  },
  {
    number: "04",
    title: "Learn Through Practical Execution",
    description:
      "Continuous learning becomes more meaningful when applied through real projects. I prefer building incrementally, testing ideas, evaluating results, and improving solutions through practical experience.",
  },
];

const TECHNICAL_INTERESTS = [
  "React & Next.js",
  "TypeScript",
  "PHP & Laravel",
  "Node.js & Express",
  "REST API & System Integration",
  "Database Design",
  "AI Integration & LLM APIs",
  "Prompt & Context Engineering",
  "Workflow Automation",
  "Generative AI",
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
                I&apos;m Zaki Deza, a Fullstack Web Developer with a background
                in Software Engineering and professional experience across
                corporate, agency, and freelance environments. I build web
                applications and business systems while continuously exploring
                AI integration, automation, and new approaches to developing
                practical digital solutions.
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
            description="My journey combines a foundation in software engineering, hands-on experience developing web applications, and a growing interest in AI-driven technologies and digital innovation."
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
              <div className="space-y-5 text-sm leading-8 text-fg-muted sm:text-base">
                <p>
                  My interest in technology began with a Software Engineering
                  background during vocational high school. Since then, I have
                  developed my skills through independent learning and practical
                  experience, working across frontend and backend development.
                  These experiences have helped me understand how application
                  architecture, business logic, APIs, and databases work
                  together to create functional software solutions.
                </p>

                <p>
                  I have worked in different professional environments,
                  including corporate operations, digital agency projects, and
                  independent freelance engagements. Through these experiences,
                  I have handled various development responsibilities, from
                  understanding requirements and designing application
                  structures to implementation, debugging, deployment, and
                  maintenance.
                </p>

                <p>
                  Beyond conventional web development, I&apos;m increasingly
                  exploring Artificial Intelligence, application integration,
                  prompt engineering, context engineering, and workflow
                  automation. I&apos;m interested in using these technologies
                  thoughtfully to improve development processes and create
                  solutions that address practical needs.
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
            description="From vocational software engineering education to professional web development, my journey has been shaped by continuous learning, practical projects, and experience across different working environments."
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
                    Continuing my undergraduate studies in Information Systems
                    at Universitas Terbuka Bandung while strengthening my
                    understanding of business processes, information systems,
                    technology, and the development of practical digital
                    solutions.
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
                    My vocational education in Software Engineering introduced
                    me to programming, application development, and software
                    fundamentals. It provided the foundation for my continued
                    learning and professional journey in web development.
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
            description="Continuing to grow as an adaptable technology professional by strengthening software engineering fundamentals and developing practical experience with AI integration, automation, and digital products."
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
              <div className="space-y-5 text-sm leading-8 text-fg-muted sm:text-base">
                <p>
                  My current direction is to develop further as a technology
                  professional who can work across fullstack development, system
                  integration, AI-assisted development, and intelligent digital
                  solutions. I&apos;m focused on combining practical engineering
                  experience with a broader understanding of how technology
                  supports business and everyday processes.
                </p>

                <p>
                  I&apos;m particularly interested in understanding how AI
                  technologies can be integrated into real applications,
                  including LLM API integration, information processing, context
                  engineering, and automated workflows. My goal is to move
                  beyond simply using AI tools and develop a deeper
                  understanding of how to apply them effectively.
                </p>

                <p>
                  Alongside my professional development, I continue to
                  strengthen my technical foundations through academic learning,
                  independent study, and practical projects. I want to turn what
                  I learn into reliable applications and digital solutions that
                  provide meaningful value.
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
