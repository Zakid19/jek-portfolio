// src/components/project/ProjectModal.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
    // Save last focused element to restore later
    lastActiveRef.current = document.activeElement as HTMLElement | null;

    // Focus dialog after mount
    const t = setTimeout(() => dialogRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Focus trap
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
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

  // Animations
  const backdropVars = reduce
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25 },
      };

  const dialogVars = reduce
    ? {}
    : {
        initial: { y: 20, opacity: 0, scale: 0.98 },
        animate: { y: 0, opacity: 1, scale: 1 },
        exit: { y: 20, opacity: 0, scale: 0.98 },
        transition: { duration: 0.3, ease: "easeOut" },
      };

  return (
    <AnimatePresence>
      <motion.div
        {...(backdropVars as any)}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60"
        role="presentation"
      >
        {/* backdrop click */}
        <button
          aria-hidden
          className="absolute inset-0"
          onClick={onClose}
          tabIndex={-1}
        />

        {/* modal content */}
        <motion.div
          {...(dialogVars as any)}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          tabIndex={-1}
          className="relative z-10 w-full max-w-4xl mx-4 rounded-2xl
                     bg-white/95 dark:bg-[#0f0f0f]/95
                     border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.25)]
                     overflow-hidden before:absolute before:inset-0
                     before:bg-gradient-to-r before:from-[rgba(20,241,149,0.12)]
                     before:to-[rgba(69,153,255,0.12)] before:opacity-70 before:-z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image section */}
            <div className="relative w-full h-60 lg:h-full">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-neutral-500">
                  No image
                </div>
              )}
            </div>

            {/* Text section */}
            <div className="p-6 flex flex-col text-neutral-800 dark:text-neutral-200">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground/90 leading-relaxed">
                {project.short}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 rounded-md  bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border border-cyan-300/20 text-xs dark:text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500
                               text-white text-sm font-medium shadow-md hover:opacity-90 transition"
                  >
                    Open Project
                  </a>
                )}

                <Link
                  href={`/projects/${project.id}`}
                  className="px-4 py-2 rounded-lg border border-neutral-300/30
                             dark:border-neutral-600/40 text-sm hover:bg-neutral-100/10 transition"
                >
                  View details
                </Link>

                <button
                  onClick={onClose}
                  className="ml-auto px-3 py-2 rounded-lg text-sm border border-neutral-300/30
                             dark:border-neutral-600/40 hover:bg-red-500/10 hover:text-red-400 transition"
                >
                  Close
                </button>
              </div>

              {project.longDescription && (
                <div className="mt-4 text-sm text-muted-foreground/80 overflow-auto max-h-40 pr-2">
                  {project.longDescription}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
