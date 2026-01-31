// src/app/projects/page.tsx
import React from "react";
import Section from "@/components/ui/Section";
import ProjectsGridClient from "@/components/project/ProjectsGrid";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects — Zaki Deza",
  description: "All projects and case studies — built with Next.js, TypeScript and Tailwind.",
  openGraph: {
    title: "Projects — Zaki Deza",
    description: "A collection of projects and case studies.",
    images: ["/og-image.png"],
  },
};

export default function ProjectsPage() {
  // Server component: can pass data as props or let client import data again.
  // We'll render a Section wrapper and mount client component inside.
  return (
    <main>
      <Section title="All Projects" subtitle="Browse all case studies and experiments.">
        {/* ProjectsGridClient handles rendering + modal */}
        {/* If you prefer server-props, pass projects as prop: <ProjectsGridClient initialProjects={projects} /> */}
        <ProjectsGridClient />
      </Section>
    </main>
  );
}
