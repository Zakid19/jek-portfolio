import type { Metadata } from "next";

import Section from "@/components/ui/Section";
import ProjectsGrid from "@/components/project/ProjectsGrid";

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
    <main className="relative pt-12">
      <Section
        eyebrow="Portfolio"
        title="All Projects"
        subtitle="Explore selected projects, technical experiments, and digital solutions. Search by project name or filter by technology."
      >
        <ProjectsGrid />
      </Section>
    </main>
  );
}
