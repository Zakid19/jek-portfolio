// src/components/sections/Projects.tsx
"use client";

import Section from "@/components/ui/Section";
import ProjectsCarousel from "@/components/project/ProjectsCarousel";

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Selected Projects"
      subtitle="A showcase of my latest works — each one crafted with purpose and clean design."
    >
      <ProjectsCarousel />
    </Section>
  );
}
