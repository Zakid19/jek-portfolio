// src/components/project/ProjectModal.tsx
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

export default function ProjectModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => dialogRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lastActiveRef.current?.focus();
    };
  }, [onClose]);

  const externalUrl = project.demo || (project.href !== "#" ? project.href : undefined);

  const content = (
    <AnimatePresence>
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-md bg-black/70"
        role="presentation"
      >
        <button
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 cursor-default"
          onClick={onClose}
        />

        <motion.div
          ref={dialogRef}
          initial={reduce ? false : { y: 28, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { y: 28, opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
          className="relative z-10 w-full max-w-5xl rounded-2xl glass neon-edge overflow-hidden shadow-glow"
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-bg/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-fg hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Image */}
            <div className="relative w-full h-64 lg:h-full lg:col-span-2 bg-bg-soft">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  placeholder={project.blurDataURL ? "blur" : undefined}
                  blurDataURL={project.blurDataURL}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-fg-muted text-sm">
                  No image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent lg:bg-gradient-to-r" />
            </div>

            {/* Content */}
            <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col max-h-[80vh] overflow-y-auto">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {project.featured && <span className="badge-glow">Featured</span>}
                {project.type && (
                  <span className="px-2.5 py-1 rounded-full text-[0.7rem] font-mono uppercase tracking-widest text-fg-muted border border-white/10">
                    {project.type}
                  </span>
                )}
                {project.year && (
                  <span className="px-2.5 py-1 rounded-full text-[0.7rem] font-mono text-fg-muted border border-white/10">
                    {project.year}
                  </span>
                )}
              </div>

              <h3
                id="modal-title"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-fg"
              >
                {project.title}
              </h3>

              <p className="mt-3 text-sm sm:text-base text-fg-muted leading-relaxed">
                {project.longDescription ?? project.short}
              </p>

              {project.highlights?.length ? (
                <ul className="mt-5 space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-fg-soft">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-cyan flex-shrink-0 shadow-[0_0_8px_rgb(34_211_238_/_0.7)]" />
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-xs border border-neon-cyan/20 bg-neon-cyan/[0.04] text-fg-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
                {externalUrl && (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-lg text-sm font-medium text-white bg-brand-gradient bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-glow-soft hover:shadow-glow transition-all duration-500"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-lg text-sm font-medium border border-white/15 text-fg hover:border-neon-cyan/50 hover:text-neon-cyan transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                )}
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 ml-auto text-sm text-neon-cyan hover:gap-2.5 transition-all"
                >
                  Full case study
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  const root = document.getElementById("modal-root") ?? document.body;
  return createPortal(content, root);
}
