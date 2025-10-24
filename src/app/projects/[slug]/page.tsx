// src/app/projects/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import ProjectAsideClient from "@/components/project/ProjectAsideClient";
import type { Metadata } from "next";

// ✅ Generate static params (untuk static site generation)
export const generateStaticParams = async () => {
  return projects.map((p) => ({ slug: p.id }));
};

// ✅ Generate metadata untuk SEO dan social share
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // fix: params di Next 15 harus di-await
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "This project could not be found.",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.short,
    openGraph: {
      title: project.title,
      description: project.short,
      url: `https://yourwebsite.com/projects/${project.id}`,
      type: "article",
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.short,
      images: [project.image ?? "/og-image.png"],
    },
  };
}

// ✅ Komponen utama halaman project
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // fix: harus di-await
  const project = projects.find((p) => p.id === slug) as Project | undefined;

  if (!project) return notFound();

  return (
    <main className="relative container py-20">
      {/* Gradient background aura */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(20,241,149,0.06)] via-transparent to-[rgba(69,153,255,0.06)] blur-3xl opacity-70" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left side — main content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Hero Image */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg shadow-black/20">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.03]"
                priority
              />
            ) : (
              <div className="w-full h-full bg-slate-300 dark:bg-slate-800 flex items-center justify-center text-sm text-muted-foreground">
                No image
              </div>
            )}
          </div>

          {/* Title & short description */}
          <header>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
              {project.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              {project.short}
            </p>
          </header>

          {/* Overview section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold dark:text-white">Overview</h2>
            <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed">
              {project.longDescription ??
                "This is a detailed case study about how this project was built — covering the problem, solution, and technologies used to make it happen. It highlights the design approach, architecture, and the lessons learned during development."}
            </p>
          </section>

          {/* Tech Stack */}
          {project.tech?.length ? (
            <section>
              <h2 className="text-xl font-semibold mb-3 dark:text-white">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs md:text-sm rounded-md bg-white/10 border border-white/10 text-muted-foreground dark:text-white/80 backdrop-blur-sm hover:bg-white/15 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* Right side — aside info */}
        <ProjectAsideClient project={project} />
      </div>
    </main>
  );
}
