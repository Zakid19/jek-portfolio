"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

export default function ProjectAsideClient({ project }: { project: Project }) {
  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <aside className="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent dark:from-[#0e0e10]/60 backdrop-blur-md">
      <div className="sticky top-24 space-y-8">
        {/* --- Basic Project Info --- */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold dark:text-white/90">{project.title}</h3>
          <p className="text-sm dark:text-white/60 leading-relaxed">{project.short}</p>

          <dl className="grid grid-cols-2 gap-y-3 text-sm pt-3 border-t border-white/10">
            <div>
              <dt className="text-xs text-muted-foreground">Role</dt>
              <dd className="font-medium text-neutral-800/90 dark:text-white/90">{project.role ?? "Frontend"}</dd>
            </div>

            <div>
              <dt className="text-xs text-muted-foreground">Status</dt>
              <dd className="font-medium  text-neutral-800/90 dark:text-white/90">{project.status ?? "Completed"}</dd>
            </div>

            <div>
              <dt className="text-xs text-muted-foreground">Type</dt>
              <dd className="font-medium text-neutral-800/90 dark:text-white/90">{project.type ?? "Web App"}</dd>
            </div>
          </dl>
        </div>

        {/* --- Resources --- */}
        <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
          <h5 className="text-xs text-muted-foreground mb-3">Resources</h5>
          <ul className="space-y-2 text-sm">
            {project.repo && (
              <li>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 underline dark:text-white hover:text-primary transition-colors"
                >
                  View Source
                </a>
              </li>
            )}
            {project.caseStudy && (
              <li>
                <a
                  href={project.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 underline hover:text-primary transition-colors"
                >
                  Case Study
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* --- Visit Project Button --- */}
        {project.href && (
          <div className="flex flex-col gap-3">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md hover:scale-[1.02] hover:opacity-90 transition-all"
            >
              Visit Project
            </a>
          </div>
        )}

        {/* --- Other Projects --- */}
        {otherProjects.length > 0 && (
          <div className="pt-6 border-t border-white/10">
            <h5 className="text-xs text-muted-foreground mb-3 tracking-wide uppercase">
              Other Projects
            </h5>

            <div className="space-y-4">
              {otherProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group flex items-center gap-3 rounded-xl overflow-hidden border-neutral-200 dark:border-white/10 hover:border-primary/50 transition-all bg-white/[0.03] hover:bg-white/[0.06]"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700" />
                    )}
                  </div>

                  <div className="flex-1 py-2 pr-2">
                    <h4 className="text-sm font-semibold text-neutral-800 dark:text-white group-hover:text-primary transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-white/60 truncate">{p.type ?? "Project"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
