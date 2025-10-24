"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import type { Project } from "@/types";

type Props = {
  project: Project;
  onOpen?: (project: Project) => void;
};

const MotionArticle = motion.article;

export default React.memo(function ProjectCard({ project, onOpen }: Props) {
  const reduce = useReducedMotion();

  // ✅ Fix: Always provide a valid Variants object (Framer Motion requires it)
  const variants: Variants = reduce
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
        rest: { scale: 1 },
        hover: { scale: 1 },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
        rest: { scale: 1, y: 0, boxShadow: "0 6px 18px rgba(0,0,0,0.06)" },
        hover: {
          scale: 1.03,
          y: -6,
          boxShadow: "0 18px 40px rgba(8,11,20,0.28)",
          transition: { duration: 0.35, ease: [0.4, 0.2, 0.2, 1] },
        },
      };

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      e.preventDefault();
      onOpen?.(project);
    },
    [onOpen, project]
  );

  const openDemo = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      project.demo && window.open(project.demo, "_blank", "noopener,noreferrer");
    },
    [project]
  );

  const openRepo = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      project.repo && window.open(project.repo, "_blank", "noopener,noreferrer");
    },
    [project]
  );

  const visibleTech = project.tech?.slice(0, 3) ?? [];
  const remainingTechCount = Math.max(0, (project.tech?.length ?? 0) - visibleTech.length);

  return (
    <MotionArticle
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      animate="rest"
      whileHover="hover"
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label={`Open project ${project.title}`}
      className={`relative flex flex-col h-full rounded-xl overflow-hidden
        border border-neutral-200 dark:border-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300
        before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-tr
        before:from-[rgba(69,153,255,0.12)]
        before:to-[rgba(20,241,149,0.12)]
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(153,69,255,0.18)]`}
    >
      {/* Image area */}
      <div className="relative h-44 w-full flex-shrink-0 bg-slate-900/30 overflow-hidden group">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            loading="lazy"
            placeholder={project.blurDataURL ? "blur" : undefined}
            blurDataURL={project.blurDataURL}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}

        {/* Hover overlay icons */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all"
        >
          {project.demo && (
            <button
              onClick={openDemo}
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors"
              aria-label={`Open demo for ${project.title}`}
            ></button>
          )}
          {project.repo && (
            <button
              onClick={openRepo}
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors"
              aria-label={`Open repository for ${project.title}`}
            ></button>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-base md:text-lg text-neutral-800 dark:text-white leading-tight">
            {project.title}
          </h3>

          {project.featured && (
            <span className="text-xs px-2 py-0.5 rounded-md bg-gradient-to-r from-[rgba(var(--accent-purple-r),0.18)] to-[rgba(var(--accent-green-r),0.18)] text-white">
              Featured
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground/90 text-neutral-800/80 dark:text-white/70 flex-1 leading-relaxed">
          {project.short.length > 100 ? project.short.slice(0, 50) + " ..." : project.short}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {visibleTech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-transparent border-neutral-200 text-muted-foreground shadow-sm hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] text-xs bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border dark:border-cyan-300/20 dark:text-cyan-300 transition-shadow"
            >
              {t}
            </span>
          ))}
          {remainingTechCount > 0 && (
            <span className="px-2 py-1 rounded-md text-xs bg-white/5 border border-white/10 text-muted-foreground shadow-sm">
              +{remainingTechCount}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-start gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpen(e);
            }}
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-secondary-green to-secondary-blue text-white shadow-[0_0_12px_rgba(139,92,246,0.25)] hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:opacity-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
          >
            <span className="transition-transform group-hover:scale-105">Details</span>
          </button>
        </div>
      </div>
    </MotionArticle>
  );
});
