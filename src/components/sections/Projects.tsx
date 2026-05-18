// src/components/sections/Projects.tsx
"use client";

import Section from "@/components/ui/Section";
import ProjectsCarousel from "@/components/project/ProjectsCarousel";

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Projects shipped with intent."
      subtitle="A showcase of recent builds — from production SaaS to landing pages — each crafted with purpose, clean architecture, and a touch of polish."
    >
      <ProjectsCarousel />
    </Section>
  );
}
