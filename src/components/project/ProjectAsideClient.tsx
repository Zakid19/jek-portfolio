"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

export default function ProjectAsideClient({ project }: { project: Project }) {
  const others = projects.filter((p) => p.id !== project.id).slice(0, 3);
  const externalUrl = project.demo || (project.href !== "#" ? project.href : undefined);

  return (
    <aside className="lg:sticky lg:top-28 space-y-6">
      {/* Quick facts */}
      <div className="rounded-2xl p-6 glass neon-edge">
        <div className="font-mono text-xs uppercase tracking-widest text-neon-cyan mb-4">
          Project Info
        </div>
        <dl className="space-y-3 text-sm">
          <Row label="Role" value={project.role ?? "Developer"} />
          <Row label="Status" value={project.status ?? "Completed"} />
          <Row label="Type" value={project.type ?? "Web App"} />
          {project.year && <Row label="Year" value={project.year} />}
        </dl>

        <div className="mt-6 space-y-2.5">
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-11 px-4 rounded-lg text-sm font-medium text-white bg-brand-gradient bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-glow-soft hover:shadow-glow transition-all duration-500"
            >
              <ExternalLink className="w-4 h-4" /> Visit Project
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-11 px-4 rounded-lg text-sm font-medium border border-border dark:border-white/15 text-fg hover:border-neon-cyan/50 hover:text-neon-cyan transition-all"
            >
              <Github className="w-4 h-4" /> View Source
            </a>
          )}
          {project.caseStudy && (
            <a
              href={project.caseStudy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-neon-cyan hover:underline"
            >
              Case study <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Other projects */}
      {others.length > 0 && (
        <div className="rounded-2xl p-6 glass neon-edge">
          <div className="font-mono text-xs uppercase tracking-widest text-neon-cyan mb-4">
            Other Projects
          </div>
          <div className="space-y-3">
            {others.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="group flex items-center gap-3 rounded-xl overflow-hidden border border-border dark:border-white/[0.06] hover:border-neon-cyan/40 transition-colors"
              >
                <div className="relative w-16 h-16 flex-shrink-0 bg-bg-soft">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      placeholder={p.blurDataURL ? "blur" : undefined}
                      blurDataURL={p.blurDataURL}
                    />
                  )}
                </div>
                <div className="flex-1 pr-3 py-2 min-w-0">
                  <h4 className="text-sm font-semibold text-fg truncate group-hover:text-neon-cyan transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-fg-muted truncate">{p.type ?? "Project"}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-fg-muted group-hover:text-neon-cyan mr-4 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-xs uppercase tracking-wider font-mono text-fg-muted">{label}</dt>
      <dd className="text-sm font-medium text-fg text-right">{value}</dd>
    </div>
  );
}
