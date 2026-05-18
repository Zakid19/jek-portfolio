"use client";

import Image from "next/image";
import React, { useCallback } from "react";
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

  const handleOpen = useCallback(() => {
    onOpen?.(project);
  }, [onOpen, project]);

  const onKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen?.(project);
      }
    },
    [onOpen, project]
  );

  const openExternal = (url?: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const visibleTech = project.tech?.slice(0, 4) ?? [];
  const remaining = Math.max(0, (project.tech?.length ?? 0) - visibleTech.length);

  return (
    <MotionArticle
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleOpen}
      onKeyDown={onKey}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title}`}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer glass neon-edge hover:shadow-glow transition-shadow duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-bg-soft">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[700ms] ease-smooth group-hover:scale-[1.06]"
            loading="lazy"
            placeholder={project.blurDataURL ? "blur" : undefined}
            blurDataURL={project.blurDataURL}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-fg-muted">
            No image
          </div>
        )}

        {/* Gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-elev via-bg-elev/10 to-transparent opacity-80" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 badge-glow">
            <Sparkles className="w-3 h-3" />
            Featured
          </div>
        )}

        {/* Year */}
        {project.year && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-[0.7rem] font-mono bg-bg/70 backdrop-blur-md border border-white/10 text-fg-soft">
            {project.year}
          </div>
        )}

        {/* External quick-actions — always visible on touch, hover-revealed on desktop */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-100 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300">
          {project.repo && (
            <button
              onClick={openExternal(project.repo)}
              aria-label={`Open repository for ${project.title}`}
              className="w-9 h-9 rounded-lg bg-bg/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-fg hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
            >
              <Github className="w-4 h-4" />
            </button>
          )}
          {(project.demo || (project.href && project.href !== "#")) && (
            <button
              onClick={openExternal(project.demo ?? project.href)}
              aria-label={`Open live demo for ${project.title}`}
              className="w-9 h-9 rounded-lg bg-bg/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-fg hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-base md:text-lg text-fg leading-tight group-hover:text-neon-cyan transition-colors">
            {project.title}
          </h3>
          {project.type && (
            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-fg-muted whitespace-nowrap pt-1">
              {project.type}
            </span>
          )}
        </div>

        <p className="text-sm text-fg-muted leading-relaxed flex-1 line-clamp-2">
          {project.short}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {visibleTech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-[0.7rem] border border-neon-cyan/20 bg-neon-cyan/[0.04] text-fg-soft"
            >
              {t}
            </span>
          ))}
          {remaining > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[0.7rem] border border-white/10 text-fg-muted">
              +{remaining}
            </span>
          )}
        </div>

        <div className="mt-2 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-fg-muted">{project.role ?? "Developer"}</span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-neon-cyan group-hover:gap-2 transition-all">
            View details
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </MotionArticle>
  );
});
