"use client";

import { ArrowUpRight, ExternalLink, Github, Layers3 } from "lucide-react";

import type { Project } from "@/types";

type Props = {
  project: Project;
};

export default function ProjectAsideClient({ project }: Props) {
  const externalUrl =
    project.demo ||
    (project.href && project.href !== "#" ? project.href : undefined);

  const repoUrl =
    project.repo && project.repo !== "#" ? project.repo : undefined;

  const caseStudyUrl =
    project.caseStudy && project.caseStudy !== "#"
      ? project.caseStudy
      : undefined;

  const hasActions = externalUrl || repoUrl || caseStudyUrl;

  return (
    <aside className="min-w-0 lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-xl border border-border bg-bg">
        {/* PANEL HEADER */}
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Layers3 className="h-4 w-4 text-neon-green" />

            <h2 className="text-sm font-semibold text-fg">
              Project Information
            </h2>
          </div>
        </div>

        {/* PROJECT DETAILS */}
        <dl className="space-y-5 p-5">
          <InfoRow label="Role" value={project.role || "Developer"} />

          <InfoRow
            label="Status"
            value={project.status || "Completed"}
            highlight={project.status === "Live"}
          />

          <InfoRow label="Category" value={project.type || "Web Project"} />

          {project.year && <InfoRow label="Year" value={project.year} />}

          {project.featured && (
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-3 py-1.5 text-xs font-medium text-neon-green">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />
                Featured Project
              </span>
            </div>
          )}
        </dl>

        {/* PROJECT ACTIONS */}
        {hasActions && (
          <div className="space-y-2 border-t border-border p-5">
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-neon-green bg-neon-green px-4 text-sm font-semibold text-bg transition-colors hover:bg-transparent hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Visit Live Project
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-fg transition-colors hover:border-neon-green hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Github className="h-4 w-4" />
                View Source Code
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}

            {caseStudyUrl && (
              <a
                href={caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-full items-center justify-center gap-2 text-xs font-medium text-fg-muted transition-colors hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Read Case Study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </div>

      <p className="mt-3 px-1 text-xs leading-relaxed text-fg-muted">
        Project details and technologies reflect the available project
        information.
      </p>
    </aside>
  );
}

function InfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-xs text-fg-muted">{label}</dt>

      <dd
        className={
          highlight
            ? "text-right text-sm font-medium text-neon-green"
            : "text-right text-sm font-medium text-fg"
        }
      >
        {value}
      </dd>
    </div>
  );
}
