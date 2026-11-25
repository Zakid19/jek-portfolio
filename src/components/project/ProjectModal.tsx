"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";

import type { Project } from "@/types";

type Props = {
  project: Project;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export default function ProjectModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const reduce = useReducedMotion();

  // RESET SCROLL POSITION WHEN SWITCHING PROJECTS
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [project.id]);

  // MODAL ACCESSIBILITY, KEYBOARD NAVIGATION AND SCROLL LOCKING
  useEffect(() => {
    lastActiveRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 60);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;

      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") && element.offsetParent !== null,
      );

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);

      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;

      lastActiveRef.current?.focus();
    };
  }, [onClose]);

  // PROJECT LINKS
  const externalUrl =
    project.demo ||
    (project.href && project.href !== "#" ? project.href : undefined);

  const repositoryUrl =
    project.repo && project.repo !== "#" ? project.repo : undefined;

  const content = (
    <AnimatePresence>
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        transition={{ duration: 0.25 }}
        className={[
          "fixed inset-0 z-[60]",
          "flex items-center justify-center",
          "bg-black/80",
          "p-3 sm:p-4",
        ].join(" ")}
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        {/* MODAL CONTAINER */}
        <motion.div
          ref={dialogRef}
          initial={
            reduce
              ? false
              : {
                  y: 24,
                  opacity: 0,
                  scale: 0.98,
                }
          }
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          exit={
            reduce
              ? undefined
              : {
                  y: 24,
                  opacity: 0,
                  scale: 0.98,
                }
          }
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          tabIndex={-1}
          className={[
            "relative z-10",
            "flex flex-col",
            "w-full max-w-5xl",
            "h-[min(560px,calc(100dvh-1.5rem))]",
            "lg:h-[min(760px,calc(100dvh-2rem))]",
            "overflow-hidden",
            "rounded-xl",
            "border border-border",
            "bg-bg",
            "shadow-2xl",
            "focus-visible:outline-none",
          ].join(" ")}
        >
          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className={[
              "absolute right-3 top-3 sm:right-4 sm:top-4",
              "z-30 flex h-10 w-10 items-center justify-center",
              "rounded-md border border-border",
              "bg-bg text-fg-muted",
              "transition-colors duration-200",
              "hover:border-neon-green/50",
              "hover:text-neon-green",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring",
            ].join(" ")}
          >
            <X className="h-4 w-4" />
          </button>

          {/* MAIN LAYOUT */}
          <div
            className={[
              "flex h-full min-h-0 flex-col",
              "lg:grid lg:grid-cols-5",
            ].join(" ")}
          >
            {/* PROJECT IMAGE */}
            <div
              className={[
                "relative h-[140px] w-full shrink-0",
                "overflow-hidden",
                "border-b border-border",
                "bg-bg-soft",
                "sm:h-[150px]",
                "lg:col-span-2 lg:h-full",
                "lg:border-b-0 lg:border-r",
              ].join(" ")}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain"
                  placeholder={project.blurDataURL ? "blur" : undefined}
                  blurDataURL={project.blurDataURL}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-fg-muted">
                  No image available
                </div>
              )}

              {/* IMAGE LABEL */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 left-5 right-5 z-10"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
                  Project Showcase
                </span>

                <div className="mt-2 h-px w-10 bg-neon-green" />
              </div>
            </div>

            {/* PROJECT CONTENT PANEL */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:col-span-3">
              {/* SCROLLABLE INFORMATION */}
              <div
                ref={contentRef}
                className={[
                  "relative min-h-0 flex-1",
                  "overflow-y-auto overscroll-contain",
                  "scrollbar-none",
                  "p-5 sm:p-7 lg:p-8",
                ].join(" ")}
              >
                {/* METADATA */}
                <div className="mb-4 flex flex-wrap items-center gap-2 pr-10">
                  {project.featured && (
                    <span className="inline-flex items-center rounded-md border border-neon-green/40 bg-neon-green/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neon-green">
                      Featured
                    </span>
                  )}

                  {project.type && (
                    <span className="inline-flex items-center rounded-md border border-border bg-bg-soft px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-fg-muted">
                      {project.type}
                    </span>
                  )}

                  {project.year && (
                    <span className="inline-flex items-center rounded-md border border-border bg-bg-soft px-2.5 py-1 font-mono text-[0.65rem] text-fg-muted">
                      {project.year}
                    </span>
                  )}
                </div>

                {/* PROJECT TITLE */}
                <h3
                  id="project-modal-title"
                  className="text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl"
                >
                  {project.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-3 text-sm leading-relaxed text-fg-muted sm:text-base">
                  {project.longDescription || project.short}
                </p>

                {/* KEY HIGHLIGHTS */}
                {(project.highlights?.length ?? 0) > 0 && (
                  <section className="mt-7">
                    <h4 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-neon-green">
                      Key Highlights
                    </h4>

                    <ul className="space-y-3">
                      {(project.highlights ?? []).map((highlight, index) => (
                        <li
                          key={`${project.id}-highlight-${index}`}
                          className="flex items-start gap-3 text-sm leading-relaxed text-fg-soft"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-green"
                          />

                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* TECHNOLOGIES */}
                {project.tech?.length > 0 && (
                  <section className="mt-7">
                    <h4 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-neon-green">
                      Technologies
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((technology) => (
                        <span
                          key={technology}
                          className={[
                            "rounded-md border border-border",
                            "bg-bg-soft px-2.5 py-1",
                            "text-xs text-fg-soft",
                          ].join(" ")}
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* FIXED FOOTER */}
              <div
                className={[
                  "relative z-20 shrink-0",
                  "border-t border-border",
                  "bg-bg",
                  "px-5 py-4 sm:px-7 lg:px-8",
                ].join(" ")}
              >
                <div className="flex flex-wrap items-center gap-3">
                  {/* PRIMARY ACTIONS */}
                  <div className="flex flex-wrap items-center gap-2">
                    {externalUrl && (
                      <a
                        href={externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={[
                          "inline-flex h-10 items-center justify-center gap-2",
                          "rounded-md border border-neon-green",
                          "bg-neon-green px-4",
                          "text-xs font-semibold text-bg sm:text-sm",
                          "transition-opacity duration-200",
                          "hover:opacity-85",
                          "focus-visible:outline-none",
                          "focus-visible:ring-2 focus-visible:ring-ring",
                        ].join(" ")}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}

                    {repositoryUrl && (
                      <a
                        href={repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={[
                          "inline-flex h-10 items-center justify-center gap-2",
                          "rounded-md border border-border",
                          "px-4 text-xs font-medium text-fg sm:text-sm",
                          "transition-colors duration-200",
                          "hover:border-neon-green/50",
                          "hover:text-neon-green",
                          "focus-visible:outline-none",
                          "focus-visible:ring-2 focus-visible:ring-ring",
                        ].join(" ")}
                      >
                        <Github className="h-4 w-4" />
                        Source
                      </a>
                    )}
                  </div>

                  {/* SECONDARY ACTION */}
                  <Link
                    href={`/projects/${project.id}`}
                    onClick={onClose}
                    prefetch={false}
                    aria-label={`View full case study for ${project.title}`}
                    className={[
                      "group ml-auto inline-flex items-center gap-2",
                      "whitespace-nowrap rounded-md",
                      "text-xs font-semibold text-neon-green sm:text-sm",
                      "transition-colors duration-200",
                      "hover:text-fg",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-ring",
                      "focus-visible:ring-offset-4",
                      "focus-visible:ring-offset-bg",
                    ].join(" ")}
                  >
                    <span>Full Case Study</span>

                    <span
                      className={[
                        "inline-flex h-7 w-7 items-center justify-center",
                        "rounded-md border border-neon-green/30",
                        "bg-neon-green/5",
                        "transition-colors duration-200",
                        "group-hover:border-neon-green/60",
                        "group-hover:bg-neon-green/10",
                      ].join(" ")}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (typeof document === "undefined") {
    return null;
  }

  const root = document.getElementById("modal-root") ?? document.body;

  return createPortal(content, root);
}
