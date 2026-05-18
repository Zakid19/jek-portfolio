// src/components/project/ProjectsGrid.tsx
"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import { projects as allProjects } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const DynamicModal = dynamic(() => import("@/components/project/ProjectModal"), { ssr: false });

export default function ProjectsGrid({
  initialProjects,
}: {
  initialProjects?: Project[];
}) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const reduce = useReducedMotion();

  const projects = initialProjects ?? allProjects;

  const filters = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.tech.includes(filter);
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [projects, filter, query]);

  return (
    <>
      {/* Controls */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted" />
          <input
            type="search"
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-3 rounded-lg bg-bg-elev/60 backdrop-blur-md border border-border dark:border-white/10 text-sm text-fg placeholder:text-fg-muted focus-visible:outline-none focus-visible:border-neon-cyan/60 focus-visible:shadow-glow-soft transition-all"
            aria-label="Search projects"
          />
        </div>

        <div className="flex flex-wrap gap-2 -mr-2 overflow-x-auto pb-1">
          {filters.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-3.5 h-9 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300",
                filter === t
                  ? "text-white bg-brand-gradient bg-[length:200%_100%] shadow-glow-soft"
                  : "text-fg-soft border border-border dark:border-white/10 hover:text-fg hover:border-neon-cyan/40"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard project={p} onOpen={(proj) => setSelected(proj)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <div className="text-center py-16 text-fg-muted">
          No projects match your search.
        </div>
      )}

      {selected && <DynamicModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
