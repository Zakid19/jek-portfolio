"use client";

import Image from "next/image";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Sparkles } from "lucide-react";

import type { Project } from "@/types";

type Props = {
  project: Project;
  onOpen?: (project: Project) => void;
};

const MotionArticle = motion.article;

export default React.memo(function ProjectCard({ project, onOpen }: Props) {
  const reduce = useReducedMotion();

  const visibleTech = project.tech?.slice(0, 4) ?? [];
  const remaining = Math.max(
    0,
    (project.tech?.length ?? 0) - visibleTech.length,
  );

  const demoUrl =
    project.demo ||
    (project.href && project.href !== "#" ? project.href : undefined);

  const repoUrl =
    project.repo && project.repo !== "#" ? project.repo : undefined;

  return (
    <MotionArticle
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{
        duration: reduce ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "group relative flex h-full min-w-0 flex-col overflow-hidden",
        "border border-border bg-bg-elev",
        "transition-colors duration-300",
        "hover:border-neon-green/50",
        onOpen ? "cursor-pointer" : "",
      ].join(" ")}
    >
      {/* PROJECT PREVIEW */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-bg-soft">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={[
              "object-cover",
              "transition-transform duration-500 ease-out",
              reduce ? "" : "group-hover:scale-[1.025]",
            ].join(" ")}
            loading="lazy"
            placeholder={project.blurDataURL ? "blur" : undefined}
            blurDataURL={project.blurDataURL}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-bg-soft">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
              Project Preview
            </span>
            <span className="text-xs text-fg-muted">Image unavailable</span>
          </div>
        )}

        {/* IMAGE METADATA */}
        <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-2">
          {project.featured ? (
            <span className="inline-flex items-center gap-1.5 border border-neon-green/40 bg-bg-elev px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-neon-green">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Featured
            </span>
          ) : (
            <span />
          )}

          {project.year && (
            <span className="border border-border bg-bg-elev px-2.5 py-1.5 font-mono text-[10px] tabular-nums text-fg">
              {project.year}
            </span>
          )}
        </div>

        {/* EXTERNAL QUICK ACTIONS */}
        {(repoUrl || demoUrl) && (
          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open repository for ${project.title}`}
                title="View source code"
                className={[
                  "flex h-9 w-9 items-center justify-center",
                  "border border-border bg-bg-elev text-fg",
                  "transition-colors duration-200",
                  "hover:border-neon-green hover:text-neon-green",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-ring",
                ].join(" ")}
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            )}

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live project for ${project.title}`}
                title="View live project"
                className={[
                  "flex h-9 w-9 items-center justify-center",
                  "border border-border bg-bg-elev text-fg",
                  "transition-colors duration-200",
                  "hover:border-neon-green hover:text-neon-green",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-ring",
                ].join(" ")}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* PROJECT INFORMATION */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* CATEGORY */}
        <div className="mb-3 flex min-h-4 items-center justify-between gap-3">
          {project.type ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neon-green">
              {project.type}
            </span>
          ) : (
            <span />
          )}

          {project.status && (
            <span className="max-w-[45%] truncate text-right font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              {project.status}
            </span>
          )}
        </div>

        {/* TITLE */}
        <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight text-fg transition-colors duration-200 group-hover:text-neon-green sm:text-lg">
          {project.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-7 text-fg-muted">
          {project.short}
        </p>

        {/* TECHNOLOGY STACK */}
        {visibleTech.length > 0 && (
          <div className="mt-5 flex min-h-7 flex-wrap items-center gap-1.5">
            {visibleTech.map((technology) => (
              <span
                key={technology}
                className={[
                  "border border-border",
                  "bg-bg px-2 py-1",
                  "font-mono text-[10px] text-fg-soft",
                ].join(" ")}
              >
                {technology}
              </span>
            ))}

            {remaining > 0 && (
              <span className="border border-border bg-bg px-2 py-1 font-mono text-[10px] text-fg-muted">
                +{remaining}
              </span>
            )}
          </div>
        )}

        {/* CARD FOOTER */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <span className="min-w-0 truncate text-xs text-fg-muted">
            {project.role || "Developer"}
          </span>

          {onOpen && (
            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-fg transition-colors duration-200 group-hover:text-neon-green">
              View details
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          )}
        </div>
      </div>

      {/* PRIMARY PROJECT ACTION */}
      {onOpen && (
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`View details for ${project.title}`}
          className={[
            "absolute inset-0 z-10 h-full w-full",
            "cursor-pointer",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-inset",
            "focus-visible:ring-ring",
          ].join(" ")}
        >
          <span className="sr-only">View details for {project.title}</span>
        </button>
      )}
    </MotionArticle>
  );
});
