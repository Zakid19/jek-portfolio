import type { Metadata } from "next";

import Section from "@/components/ui/Section";
import ProjectsGridClient from "@/components/project/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore selected web development, software engineering, and AI-oriented digital projects by Zaki Deza.",
  openGraph: {
    title: "Projects · Zaki Deza",
    description:
      "A collection of web applications, digital products, and technical projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects · Zaki Deza",
    description:
      "Explore selected web development and digital product projects.",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-bg pt-20">
      <Section
        eyebrow="Portfolio / Selected Work"
        title="Projects & Experiments"
        subtitle="A collection of digital products, web applications, and technical explorations. Explore the work, technologies, and ideas behind each project."
      >
        <ProjectsGridClient />
      </Section>
    </main>
  );
}
