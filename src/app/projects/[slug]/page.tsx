import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

import { projects } from "@/data/projects";
import type { Project } from "@/types";
import ProjectAsideClient from "@/components/project/ProjectAsideClient";
import { formatTech } from "@/lib/utils";

export const generateStaticParams = async () =>
  projects.map((project) => ({ slug: project.id }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "This project could not be found.",
    };
  }

  const description = `${project.short} Built with ${formatTech(project.tech)}.`;

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: `/projects/${project.id}`,
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: project.image ? [project.image] : undefined,
    },
    alternates: {
      canonical: `/projects/${project.id}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const index = projects.findIndex((project) => project.id === slug);

  if (index === -1) return notFound();

  const project = projects[index] as Project;
  const previousProject = projects[index - 1];
  const nextProject = projects[index + 1];

  const externalUrl =
    project.demo ||
    (project.href && project.href !== "#" ? project.href : undefined);

  return (
    <main className="min-h-screen">
      <article className="container pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pt-32">
        {/* BACK NAVIGATION */}
        <Link
          href="/projects"
          className={[
            "group mb-8 inline-flex items-center gap-2",
            "text-sm text-fg-muted",
            "transition-colors duration-200",
            "hover:text-neon-green",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring",
            "rounded-md",
          ].join(" ")}
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to projects
        </Link>

        {/* PROJECT HEADER */}
        <header className="max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {project.featured && (
              <span className="inline-flex items-center rounded-md border border-neon-green/40 bg-neon-green/10 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-neon-green">
                Featured Project
              </span>
            )}

            {project.type && (
              <span className="rounded-md border border-border px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-fg-muted">
                {project.type}
              </span>
            )}

            {project.year && (
              <span className="rounded-md border border-border px-3 py-1 font-mono text-[10px] text-fg-muted">
                {project.year}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl md:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-fg-muted sm:mt-5 sm:text-lg">
            {project.short}
          </p>

          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "mt-6 inline-flex h-10 items-center gap-2",
                "rounded-md border border-neon-green/40",
                "px-4 text-sm font-medium text-neon-green",
                "transition-colors duration-200",
                "hover:border-neon-green",
                "hover:bg-neon-green/5",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring",
              ].join(" ")}
            >
              Visit Live Project
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </header>

        {/* PROJECT IMAGE */}
        <section aria-label="Project preview" className="mt-9 sm:mt-12">
          <div
            className={[
              "relative isolate aspect-[4/3]",
              "overflow-hidden rounded-xl",
              "border border-border bg-bg-soft",
              "sm:aspect-[16/9]",
            ].join(" ")}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1200px"
                className="object-contain p-2 sm:p-4 lg:p-6"
                priority
                placeholder={project.blurDataURL ? "blur" : undefined}
                blurDataURL={project.blurDataURL}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-fg-muted">
                Project preview unavailable
              </div>
            )}
          </div>

          <p className="mt-3 text-center text-xs text-fg-muted">
            Project preview — {project.title}
          </p>
        </section>

        {/* PROJECT CONTENT */}
        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          {/* MAIN CONTENT */}
          <div className="min-w-0 space-y-12 lg:col-span-2">
            {/* OVERVIEW */}
            {project.longDescription && (
              <section>
                <div className="mb-4">
                  <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neon-green">
                    Introduction
                  </p>

                  <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    Project Overview
                  </h2>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-fg-soft sm:text-base sm:leading-8">
                  {project.longDescription}
                </p>
              </section>
            )}

            {/* HIGHLIGHTS */}
            {project.highlights && project.highlights.length > 0 && (
              <section>
                <div className="mb-5">
                  <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neon-green">
                    What was built
                  </p>

                  <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    Key Highlights
                  </h2>
                </div>

                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.highlights.map((highlight, index) => (
                    <li
                      key={`${project.id}-highlight-${index}`}
                      className={[
                        "flex items-start gap-3",
                        "rounded-lg border border-border",
                        "bg-bg p-4",
                        "transition-colors duration-200",
                        "hover:border-neon-green/40",
                      ].join(" ")}
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon-green" />

                      <span className="text-sm leading-relaxed text-fg-soft">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* TECHNOLOGY STACK */}
            {project.tech && project.tech.length > 0 && (
              <section>
                <div className="mb-5">
                  <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neon-green">
                    Tools & Technologies
                  </p>

                  <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    Technology Stack
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className={[
                        "rounded-md border border-border",
                        "bg-bg px-3.5 py-2",
                        "text-sm font-medium text-fg-soft",
                        "transition-colors duration-200",
                        "hover:border-neon-green/40",
                        "hover:text-neon-green",
                      ].join(" ")}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* PROJECT INFORMATION SIDEBAR */}
          <ProjectAsideClient project={project} />
        </div>

        {/* PREVIOUS / NEXT PROJECT */}
        {(previousProject || nextProject) && (
          <nav
            className="mt-16 border-t border-border pt-8 sm:mt-20 sm:pt-10"
            aria-label="Project navigation"
          >
            <div className="mb-5">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neon-green">
                Keep exploring
              </p>

              <h2 className="mt-2 text-xl font-semibold text-fg sm:text-2xl">
                More Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              {previousProject ? (
                <Link
                  href={`/projects/${previousProject.id}`}
                  className={[
                    "group rounded-lg border border-border",
                    "bg-bg p-5",
                    "transition-colors duration-200",
                    "hover:border-neon-green/40",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-fg-muted">
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                    Previous Project
                  </div>

                  <p className="mt-3 font-medium text-fg transition-colors group-hover:text-neon-green">
                    {previousProject.title}
                  </p>

                  <p className="mt-1 line-clamp-1 text-xs text-fg-muted">
                    {previousProject.short}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {nextProject && (
                <Link
                  href={`/projects/${nextProject.id}`}
                  className={[
                    "group rounded-lg border border-border",
                    "bg-bg p-5",
                    "transition-colors duration-200",
                    "hover:border-neon-green/40",
                    "sm:text-right",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-fg-muted sm:justify-end">
                    Next Project
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>

                  <p className="mt-3 font-medium text-fg transition-colors group-hover:text-neon-green">
                    {nextProject.title}
                  </p>

                  <p className="mt-1 line-clamp-1 text-xs text-fg-muted">
                    {nextProject.short}
                  </p>
                </Link>
              )}
            </div>

            <div className="mt-7 text-center">
              <Link
                href="/projects"
                className={[
                  "inline-flex items-center gap-2",
                  "text-sm font-medium text-fg-muted",
                  "transition-colors duration-200",
                  "hover:text-neon-green",
                ].join(" ")}
              >
                <ArrowLeft className="h-4 w-4" />
                Explore all projects
              </Link>
            </div>
          </nav>
        )}
      </article>
    </main>
  );
}
