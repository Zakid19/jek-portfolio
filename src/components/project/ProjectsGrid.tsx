"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, X, SlidersHorizontal, FolderOpen } from "lucide-react";

import ProjectCard from "@/components/project/ProjectCard";
import { projects as allProjects } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const DynamicModal = dynamic(
  () => import("@/components/project/ProjectModal"),
  { ssr: false },
);

type Props = {
  initialProjects?: Project[];
};

export default function ProjectsGrid({ initialProjects }: Props) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const reduce = useReducedMotion();
  const projects = initialProjects ?? allProjects;

  // TECHNOLOGY FILTER OPTIONS
  const filters = useMemo(() => {
    const technologies = new Set<string>();

    projects.forEach((project) => {
      project.tech?.forEach((technology) => {
        if (technology) technologies.add(technology);
      });
    });

    return ["All", ...Array.from(technologies).sort()];
  }, [projects]);

  // SEARCH AND FILTER
  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const projectTechnologies = project.tech ?? [];

      const matchesFilter =
        filter === "All" || projectTechnologies.includes(filter);

      const searchableContent = [
        project.title,
        project.short,
        project.longDescription,
        project.role,
        project.type,
        project.status,
        project.year,
        ...projectTechnologies,
        ...(project.highlights ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || searchableContent.includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [projects, filter, query]);

  const hasActiveFilters = query.trim().length > 0 || filter !== "All";

  const clearFilters = () => {
    setQuery("");
    setFilter("All");
  };

  return (
    <>
      {/* SEARCH AND FILTER SECTION */}
      <section
        aria-label="Project search and filters"
        className="mb-8 sm:mb-10"
      >
        {/* SEARCH BAR AND RESULT COUNT */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <div className="relative w-full flex-1 sm:max-w-xl">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted"
            />

            <input
              type="search"
              placeholder="Search projects by name, technology, or keyword..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search projects"
              className={cn(
                "h-12 w-full rounded-lg pl-11 pr-11 text-sm",
                "border border-border bg-bg",
                "text-fg placeholder:text-fg-muted",
                "transition-colors duration-200",
                "focus-visible:outline-none",
                "focus-visible:border-neon-green",
                "focus-visible:ring-2 focus-visible:ring-ring/30",
              )}
            />

            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2",
                  "flex h-7 w-7 items-center justify-center rounded-md",
                  "text-fg-muted transition-colors",
                  "hover:bg-bg-soft hover:text-fg",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div
            className="flex items-center justify-between gap-2 sm:justify-end sm:whitespace-nowrap"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-xs text-fg-muted sm:text-sm">
              Showing{" "}
              <span className="font-semibold tabular-nums text-fg">
                {visible.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold tabular-nums text-fg">
                {projects.length}
              </span>{" "}
              projects
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-md text-xs font-medium text-neon-green transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* TECHNOLOGY FILTERS */}
        <div className="mt-6 sm:mt-7">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                aria-hidden="true"
                className="h-3.5 w-3.5 text-neon-green"
              />

              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-fg-muted">
                Filter by technology
              </span>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className={cn(
                  "hidden items-center gap-1.5 rounded-md sm:inline-flex",
                  "text-xs font-medium text-fg-muted",
                  "transition-colors hover:text-neon-green",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
          </div>

          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter projects by technology"
          >
            {filters.map((technology) => {
              const active = filter === technology;

              return (
                <button
                  key={technology}
                  type="button"
                  onClick={() => setFilter(technology)}
                  aria-pressed={active}
                  className={cn(
                    [
                      "inline-flex h-8 items-center justify-center",
                      "rounded-md border px-3.5",
                      "text-xs font-medium whitespace-nowrap",
                      "transition-colors duration-200",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-ring",
                      "focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-bg",
                    ].join(" "),
                    active
                      ? [
                          "border-neon-green bg-neon-green text-bg",
                          "dark:border-neon-green dark:bg-neon-green dark:text-bg",
                        ].join(" ")
                      : [
                          "border-border bg-bg text-fg-soft",
                          "hover:border-neon-green/50",
                          "hover:text-neon-green",
                        ].join(" "),
                  )}
                >
                  {technology}
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE FILTER INDICATORS */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {filter !== "All" && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-neon-green/30 bg-neon-green/5 px-2.5 py-1 text-xs text-neon-green">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />
                {filter}
              </span>
            )}

            {query.trim().length > 0 && (
              <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-md border border-border bg-bg px-2.5 py-1 text-xs text-fg-muted">
                Search: &quot;{query.trim()}&quot;
              </span>
            )}
          </div>
        )}
      </section>

      {/* PROJECT GRID */}
      {visible.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={
                  reduce
                    ? false
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  reduce
                    ? undefined
                    : {
                        opacity: 0,
                        y: -8,
                      }
                }
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full min-w-0"
              >
                <ProjectCard project={project} onOpen={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-bg px-5 py-16 text-center sm:py-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-neon-green/30 bg-neon-green/5">
            <FolderOpen className="h-6 w-6 text-neon-green" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-fg">
            No projects found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
            We couldn&apos;t find any projects matching your search or selected
            technology. Try changing your search keywords or clearing the
            filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className={cn(
              "mt-6 inline-flex h-10 items-center justify-center gap-2",
              "rounded-md border border-border bg-bg px-5",
              "text-sm font-medium text-fg",
              "transition-colors hover:border-neon-green/50",
              "hover:text-neon-green",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        </div>
      )}

      {/* PROJECT DETAIL MODAL */}
      {selected && (
        <DynamicModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
