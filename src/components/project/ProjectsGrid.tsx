"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  FolderOpen,
  Layers3,
} from "lucide-react";

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

  const filters = useMemo(() => {
    const technologies = new Set<string>();

    projects.forEach((project) => {
      project.tech?.forEach((technology) => {
        if (technology) technologies.add(technology);
      });
    });

    return ["All", ...Array.from(technologies).sort()];
  }, [projects]);

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
      {/* PROJECT DISCOVERY */}
      <section
        aria-label="Project search and filters"
        className="mb-10 sm:mb-12"
      >
        {/* SEARCH */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <label
              htmlFor="project-search"
              className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted"
            >
              Search projects
            </label>

            <div className="relative w-full max-w-2xl">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted"
              />

              <input
                id="project-search"
                type="search"
                placeholder="Search by project name, technology, or keyword..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className={cn(
                  "h-12 w-full border border-border bg-bg-elev",
                  "pl-11 pr-11 text-sm text-fg",
                  "placeholder:text-fg-muted",
                  "transition-colors duration-200",
                  "hover:border-fg-muted/60",
                  "focus-visible:border-neon-green",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
                )}
              />

              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2",
                    "flex h-7 w-7 items-center justify-center",
                    "text-fg-muted transition-colors",
                    "hover:text-neon-green",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  )}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* RESULT COUNT */}
          <div
            className="flex items-center justify-between gap-4 border-t border-border pt-4 lg:justify-end lg:border-t-0 lg:pt-0"
            aria-live="polite"
            aria-atomic="true"
          >
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
                Results
              </span>

              <p className="mt-1 text-sm text-fg-muted">
                <span className="font-semibold tabular-nums text-fg">
                  {visible.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold tabular-nums text-fg">
                  {projects.length}
                </span>{" "}
                projects
              </p>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted transition-colors hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-3.5 w-3.5" />
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* TECHNOLOGY FILTERS */}
        <div className="mt-7 border-y border-border py-5">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal
              aria-hidden="true"
              className="h-4 w-4 text-neon-green"
            />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
              Filter by technology
            </span>

            <span className="ml-auto font-mono text-[10px] tabular-nums text-fg-muted">
              {String(filters.length - 1).padStart(2, "0")} technologies
            </span>
          </div>

          <div
            className={cn(
              "scrollbar-none flex items-center gap-2 overflow-x-auto pb-1",
              "md:flex-wrap md:overflow-visible md:pb-0",
            )}
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
                    "inline-flex h-9 shrink-0 items-center justify-center",
                    "border px-3.5 text-xs font-medium whitespace-nowrap",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-neon-green bg-neon-green text-bg"
                      : [
                          "border-border bg-bg text-fg-muted",
                          "hover:border-neon-green/60 hover:text-neon-green",
                        ].join(" "),
                  )}
                >
                  {technology}
                </button>
              );
            })}
          </div>

          {/* ACTIVE FILTER INDICATORS */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                Active:
              </span>

              {filter !== "All" && (
                <span className="inline-flex items-center gap-2 border border-neon-green/40 px-2.5 py-1 text-xs text-neon-green">
                  <span className="h-1.5 w-1.5 bg-neon-green" />
                  {filter}
                </span>
              )}

              {query.trim().length > 0 && (
                <span className="inline-flex max-w-full items-center gap-1.5 border border-border bg-bg-soft px-2.5 py-1 text-xs text-fg-muted">
                  <Search className="h-3 w-3 shrink-0" />
                  <span className="max-w-[220px] truncate">
                    &quot;{query.trim()}&quot;
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* PROJECT GRID */}
      {visible.length > 0 ? (
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-neon-green" />
              <h2 className="text-sm font-semibold text-fg">
                Project Collection
              </h2>
            </div>

            <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              {String(visible.length).padStart(2, "0")} items
            </span>
          </div>

          <motion.div
            layout={!reduce}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((project) => (
                <motion.div
                  key={project.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{
                    duration: reduce ? 0 : 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full min-w-0"
                >
                  <ProjectCard project={project} onOpen={setSelected} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center border border-dashed border-border bg-bg-elev px-5 py-16 text-center sm:py-20">
          <div className="flex h-14 w-14 items-center justify-center border border-neon-green/30 bg-neon-green/5">
            <FolderOpen className="h-6 w-6 text-neon-green" />
          </div>

          <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
            No matching results
          </span>

          <h3 className="mt-2 text-lg font-semibold text-fg">
            No projects found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
            We couldn&apos;t find any projects matching your search or selected
            technology. Try another keyword or clear your filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className={cn(
              "mt-6 inline-flex h-10 items-center justify-center gap-2",
              "border border-border bg-bg px-5",
              "text-sm font-medium text-fg",
              "transition-colors hover:border-neon-green/60 hover:text-neon-green",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
