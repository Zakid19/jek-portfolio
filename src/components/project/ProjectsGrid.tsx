// src/components/projects/ProjectsGrid.tsx
"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ProjectCard from "@/components/project/ProjectCard";
import { projects as allProjects } from "@/data/projects";
import type { Project } from "@/types";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  easeInOut,
  Variants,
} from "framer-motion";

const DynamicModal = dynamic(
  () => import("@/components/project/ProjectModal"),
  { ssr: false }
);

export default function ProjectsGrid({
  initialProjects,
}: {
  initialProjects?: Project[];
}) {
  const [selected, setSelected] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  const projects = initialProjects ?? allProjects;

  // ✅ fixed: ease pakai preset bawaan framer-motion (easeInOut)
  const itemVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 8 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: easeInOut },
      },
      exit: {
        opacity: 0,
        y: -8,
        transition: { duration: 0.3, ease: easeInOut },
      },
    }),
    []
  );

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
              initial={reduce ? undefined : "hidden"}
              animate="show"
              exit={reduce ? undefined : "exit"}
              variants={itemVariants}
            >
              <ProjectCard project={p} onOpen={(proj) => setSelected(proj)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <DynamicModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
