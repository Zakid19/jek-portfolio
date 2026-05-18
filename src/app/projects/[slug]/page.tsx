// src/app/projects/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { projects } from "@/data/projects";
import type { Project } from "@/types";
import ProjectAsideClient from "@/components/project/ProjectAsideClient";
import { formatTech } from "@/lib/utils";

export const generateStaticParams = async () =>
  projects.map((p) => ({ slug: p.id }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

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
        ? [{ url: project.image, width: 1200, height: 630, alt: project.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: project.image ? [project.image] : undefined,
    },
    alternates: { canonical: `/projects/${project.id}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.id === slug);
  if (idx === -1) return notFound();

  const project = projects[idx] as Project;
  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  const externalUrl =
    project.demo || (project.href && project.href !== "#" ? project.href : undefined);

  return (
    <main className="relative">
      <div className="aurora" aria-hidden />

      <article className="container pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-neon-cyan transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          All projects
        </Link>

        {/* Header */}
        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {project.featured && <span className="badge-glow">Featured</span>}
            {project.type && (
              <span className="px-2.5 py-1 rounded-full text-[0.7rem] font-mono uppercase tracking-widest text-fg-muted border border-white/10">
                {project.type}
              </span>
            )}
            {project.year && (
              <span className="px-2.5 py-1 rounded-full text-[0.7rem] font-mono text-fg-muted border border-white/10">
                {project.year}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-fg">
            {project.title}
          </h1>
          <p className="mt-5 text-lg text-fg-muted leading-relaxed">{project.short}</p>
        </header>

        {/* Hero image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] mt-10 rounded-2xl overflow-hidden neon-edge shadow-glow">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
              priority
              placeholder={project.blurDataURL ? "blur" : undefined}
              blurDataURL={project.blurDataURL}
            />
          ) : (
            <div className="w-full h-full bg-bg-soft flex items-center justify-center text-fg-muted text-sm">
              No image
            </div>
          )}
        </div>

        {/* Body */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-2 space-y-12">
            {project.longDescription && (
              <section>
                <h2 className="text-2xl font-bold text-fg mb-4">Overview</h2>
                <p className="text-base text-fg-soft leading-relaxed">
                  {project.longDescription}
                </p>
              </section>
            )}

            {project.highlights?.length ? (
              <section>
                <h2 className="text-2xl font-bold text-fg mb-4">Highlights</h2>
                <ul className="space-y-3">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 p-4 rounded-xl glass neon-edge"
                    >
                      <CheckCircle2 className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-fg-soft">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.tech?.length ? (
              <section>
                <h2 className="text-2xl font-bold text-fg mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg text-sm border border-neon-cyan/20 bg-neon-cyan/[0.04] text-fg-soft hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {externalUrl && (
              <section>
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg text-white font-medium bg-brand-gradient bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-glow-soft hover:shadow-glow transition-all duration-500"
                >
                  Visit live project
                  <ArrowRight className="w-4 h-4" />
                </a>
              </section>
            )}
          </div>

          <ProjectAsideClient project={project} />
        </div>

        {/* Prev / next */}
        {(prev || next) && (
          <nav
            className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4"
            aria-label="Project navigation"
          >
            {prev ? (
              <Link
                href={`/projects/${prev.id}`}
                className="group p-5 rounded-xl glass neon-edge hover:shadow-glow-soft transition-shadow"
              >
                <div className="text-xs font-mono uppercase tracking-widest text-fg-muted flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </div>
                <div className="mt-2 font-semibold text-fg group-hover:text-neon-cyan transition-colors">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/projects/${next.id}`}
                className="group p-5 rounded-xl glass neon-edge hover:shadow-glow-soft transition-shadow sm:text-right"
              >
                <div className="text-xs font-mono uppercase tracking-widest text-fg-muted flex items-center sm:justify-end gap-1.5">
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="mt-2 font-semibold text-fg group-hover:text-neon-cyan transition-colors">
                  {next.title}
                </div>
              </Link>
            ) : null}
          </nav>
        )}
      </article>
    </main>
  );
}
