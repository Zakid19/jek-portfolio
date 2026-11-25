import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  GitBranch,
  Layers3,
  Workflow,
} from "lucide-react";

import Section from "@/components/ui/Section";
import { SKILLS } from "@/data/skills";
import { cn } from "@/lib/utils";

const TECHNICAL_GROUPS = [
  { key: "Frontend", label: "Frontend Development" },
  { key: "Backend", label: "Backend Development" },
  { key: "Database", label: "Database Design" },
  {
    key: "AI & Development Workflows",
    label: "AI / ML Integration",
  },
] as const;

const SERVICES = [
  {
    title: "Web Application",
    description: "Development",
    icon: Code2,
  },
  {
    title: "AI Integration",
    description: "& Automation",
    icon: BrainCircuit,
  },
  {
    title: "AI-Powered Product",
    description: "Development",
    icon: Workflow,
  },
  {
    title: "Technical Consulting",
    description: "& Code Review",
    icon: BriefcaseBusiness,
  },
];

function PanelHeading({
  number,
  title,
  icon: Icon,
}: {
  number: string;
  title: string;
  icon: typeof Code2;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <Icon className="h-4 w-4 shrink-0 text-neon-green" strokeWidth={1.7} />

        <h3 className="truncate font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-fg">
          {number} / {title}
        </h3>
      </div>

      <span className="shrink-0 font-mono text-[9px] tracking-wider text-fg-muted">
        0{number}
      </span>
    </div>
  );
}

function LevelIndicator({ level }: { level: number }) {
  const safeLevel = Math.max(0, Math.min(5, level));

  return (
    <div
      className="grid w-12 shrink-0 grid-cols-5 gap-1"
      role="img"
      aria-label={`Level ${safeLevel} of 5`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "h-[3px] rounded-full",
            index < safeLevel ? "bg-neon-green" : "bg-border",
          )}
        />
      ))}
    </div>
  );
}

function TechnicalSkillsPanel() {
  return (
    <section className="min-w-0 border-b border-border p-5 sm:p-6 lg:border-b-0 lg:border-r">
      <PanelHeading number="01" title="Technical Skills" icon={Code2} />

      <div className="mt-5 space-y-5">
        {TECHNICAL_GROUPS.map((group, index) => {
          const skillGroup = SKILLS.find((item) => item.group === group.key);

          if (!skillGroup) return null;

          return (
            <div key={group.key} className="min-w-0">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="font-mono text-[10px] text-neon-green">
                  0{index + 1}
                </span>

                <h4 className="text-xs font-semibold tracking-tight text-fg">
                  {group.label}
                </h4>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill.name}
                    className={cn(
                      "inline-flex max-w-full items-center gap-2",
                      "rounded-md border border-border bg-bg-soft",
                      "px-2.5 py-1.5 transition-colors",
                      "hover:border-neon-green/40",
                    )}
                    title={`${skill.name}: Level ${skill.level}/5`}
                  >
                    <span className="truncate text-[10px] text-fg-soft">
                      {skill.name}
                    </span>

                    <span className="font-mono text-[9px] tabular-nums text-neon-green">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ServicesPanel() {
  return (
    <section className="min-w-0 border-b border-border p-5 sm:p-6 lg:border-b-0 lg:border-r">
      <PanelHeading number="02" title="Services" icon={Layers3} />

      <div className="mt-5 space-y-2">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className={cn(
                "group flex items-center gap-3 rounded-lg",
                "border border-border bg-bg p-3",
                "transition-colors duration-200",
                "hover:border-neon-green/40 hover:bg-bg-soft",
              )}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-bg-soft transition-colors group-hover:border-neon-green/40">
                <Icon
                  className="h-4 w-4 text-fg-muted transition-colors group-hover:text-neon-green"
                  strokeWidth={1.7}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold leading-relaxed text-fg">
                  {service.title}
                </h4>

                <p className="text-[10px] text-fg-muted">
                  {service.description}
                </p>
              </div>

              <span className="font-mono text-[9px] text-fg-muted">
                0{index + 1}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-fg-muted">
          Working approach
        </span>

        <p className="mt-2 text-[11px] leading-relaxed text-fg-soft">
          Engineering, automation, and thoughtful technology integration for
          practical digital solutions.
        </p>
      </div>
    </section>
  );
}

function ToolsPanel() {
  const toolsGroup = SKILLS.find((group) => group.group === "Tools");

  return (
    <section className="min-w-0 p-5 sm:p-6">
      <PanelHeading number="03" title="Tools I Use" icon={GitBranch} />

      <div className="mt-5 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {toolsGroup?.items.map((tool) => {
          const Icon = tool.icon;

          return (
            <div
              key={tool.name}
              className="group flex min-w-0 items-center gap-2.5"
              title={`${tool.name}: Level ${tool.level}/5`}
            >
              {Icon ? (
                <Icon
                  className="h-4 w-4 shrink-0 text-fg-muted transition-colors group-hover:text-neon-green"
                  aria-hidden="true"
                  strokeWidth={1.7}
                />
              ) : (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon-green" />
              )}

              <span className="min-w-0 flex-1 truncate text-[11px] text-fg-soft transition-colors group-hover:text-fg">
                {tool.name}
              </span>

              <span className="font-mono text-[9px] tabular-nums text-fg-muted">
                {tool.level}/5
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-fg-muted">
          Environment
        </span>

        <div className="mt-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />

          <span className="font-mono text-[10px] text-fg-soft">
            Development / Production
          </span>
        </div>
      </div>
    </section>
  );
}

function AdditionalCapabilities() {
  const softSkills = SKILLS.find((group) => group.group === "Soft Skills");

  if (!softSkills) return null;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-bg px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <Workflow
          className="h-4 w-4 shrink-0 text-neon-green"
          strokeWidth={1.7}
        />

        <div>
          <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-fg">
            Additional Capabilities
          </h3>

          <p className="mt-1 text-[10px] text-fg-muted">
            Beyond technical expertise
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {softSkills.items.map((skill) => (
          <span
            key={skill.name}
            className="rounded-md border border-border bg-bg-soft px-2.5 py-1.5 text-[10px] text-fg-soft"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Capabilities"
      title="Skills & Expertise"
      subtitle="A practical overview of my technical capabilities, services, and tools for building modern digital solutions."
    >
      <div className="space-y-3">
        {/* MAIN DASHBOARD */}
        <div className="overflow-hidden rounded-xl border border-border bg-bg">
          {/* HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-bg-soft px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-30" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
              </span>

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-fg">
                Technical Overview
              </span>
            </div>

            <span className="font-mono text-[9px] tracking-wider text-fg-muted">
              ZD / CAPABILITY INDEX
            </span>
          </div>

          {/* COLUMNS */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.85fr]">
            <TechnicalSkillsPanel />
            <ServicesPanel />
            <ToolsPanel />
          </div>

          {/* FOOTER */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-bg-soft px-5 py-3">
            <span className="font-mono text-[9px] text-fg-muted">
              SKILLS / SERVICES / TOOLCHAIN
            </span>

            <span className="font-mono text-[9px] text-neon-green">
              SYSTEM OVERVIEW
            </span>
          </div>
        </div>

        <AdditionalCapabilities />
      </div>
    </Section>
  );
}
