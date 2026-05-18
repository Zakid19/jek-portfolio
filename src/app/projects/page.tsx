// src/app/projects/page.tsx
import React from "react";
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ProjectsGridClient from "@/components/project/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects and case studies — built with Next.js, React, Laravel, and TypeScript.",
  openGraph: {
    title: "Projects · Zaki Deza",
    description: "A collection of projects and case studies.",
  },
};

export default function ProjectsPage() {
  return (
    <main className="relative pt-20">
      <div className="aurora" aria-hidden />
      <Section
        eyebrow="Portfolio"
        title="All Projects"
        subtitle="Browse the full archive of case studies and experiments — search by name, filter by stack."
      >
        <ProjectsGridClient />
      </Section>
    </main>
  );
}
