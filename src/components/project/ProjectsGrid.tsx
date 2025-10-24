// src/components/projects/ProjectsGrid.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ProjectCard from "@/components/project/ProjectCard";
import { projects as allProjects } from "@/data/projects";
import type { Project } from "@/types";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const DynamicModal = dynamic(() => import("@/components/project/ProjectModal"), { ssr: false });

export default function ProjectsGrid({
  initialProjects,
}: {
  initialProjects?: Project[]; // optional, not necessary
}) {
  const [selected, setSelected] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  // Use provided projects or import directly
  const projects = initialProjects ?? allProjects;

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 8 },
      show: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
    }),
    []
  );

  // optional: pagination state (if you want)
  // const [page, setPage] = useState(1);
  // const perPage = 12;
  // const visible = projects.slice(0, page * perPage);

  return (
    <>
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        <AnimatePresence initial={false}>
          {projects.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={reduce ? false : "hidden"}
              animate="show"
              exit={reduce ? false : "exit"}
              variants={itemVariants}
            >
              <ProjectCard project={p} onOpen={(proj) => setSelected(proj)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* optional pagination / load more (uncomment if needed)
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 rounded border" onClick={() => setPage((s) => s + 1)}>Load more</button>
      </div>
      */}

      {/* Modal */}
      <AnimatePresence>
        {selected ? (
          <DynamicModal project={selected} onClose={() => setSelected(null)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
