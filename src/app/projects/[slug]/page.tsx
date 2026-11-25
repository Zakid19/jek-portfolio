import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Layers3,
  Check,
  Code2,
  Target,
  Lightbulb,
  Workflow,
  AlertCircle,
  ImageIcon,
} from "lucide-react";

import { projects } from "@/data/projects";
import type { Project } from "@/types";
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

function SectionHeading({
  number,
  eyebrow,
  title,
}: {
  number: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-7">
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-xs text-neon-green">{number}</span>
        <span className="h-px w-8 bg-border" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-fg-muted">
          {eyebrow}
        </span>
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function ContentSection({
  children,
  number,
  eyebrow,
  title,
}: {
  children: ReactNode;
  number: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="scroll-mt-28">
      <SectionHeading number={number} eyebrow={eyebrow} title={title} />
      {children}
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="space-y-1.5">
      <p className="text-xs uppercase tracking-wider text-fg-muted">{label}</p>
      <p className="text-sm font-medium text-fg">{value}</p>
    </div>
  );
}

function ProjectPageAside({ project }: { project: Project }) {
  const liveUrl =
    project.demo ||
    (project.href && project.href !== "#" && project.href !== project.repo
      ? project.href
      : undefined);

  return (
    <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
      <div className="overflow-hidden rounded-xl border border-border bg-bg-elev">
        <div className="border-b border-border p-5">
          <div className="flex items-center gap-2">
            <Layers3 className="h-4 w-4 text-neon-green" />
            <h2 className="text-sm font-semibold text-fg">
              Project Information
            </h2>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <InfoItem label="Role" value={project.role || "Developer"} />
          <InfoItem label="Category" value={project.type || "Web Project"} />
          <InfoItem label="Year" value={project.year} />
          <InfoItem label="Status" value={project.status || "Completed"} />

          {project.featured && (
            <div className="inline-flex items-center gap-2 border border-neon-green/30 px-3 py-1.5 text-xs font-medium text-neon-green">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />
              Featured Case Study
            </div>
          )}
        </div>

        {(liveUrl || project.repo) && (
          <div className="space-y-2 border-t border-border p-5">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-neon-green px-4 text-sm font-semibold text-black transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Visit Live Project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-fg transition-colors hover:border-neon-green hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green"
              >
                <Github className="h-4 w-4" />
                View Source Code
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.id === slug);

  if (index === -1) return notFound();

  const project = projects[index];
  const previous = projects[index - 1];
  const next = projects[index + 1];

  const caseStudy = project.caseStudyContent;
  const overview = caseStudy?.overview;
  const solution = caseStudy?.solution;
  const implementation = caseStudy?.implementation;
  const outcomes = caseStudy?.outcomes;

  const hasOverview = Boolean(
    overview?.background ||
      overview?.problem ||
      overview?.objectives?.length ||
      overview?.targetUsers?.length ||
      project.longDescription,
  );

  const hasSolution = Boolean(
    solution?.description || solution?.features?.length,
  );

  const hasImplementation = Boolean(
    implementation?.architecture ||
      implementation?.technicalDetails?.length ||
      implementation?.decisions?.length,
  );

  const hasChallenges = Boolean(caseStudy?.challenges?.length);

  const hasOutcomes = Boolean(
    outcomes?.summary ||
      outcomes?.achievements?.length ||
      outcomes?.learnings?.length ||
      outcomes?.limitations?.length,
  );

  const hasHighlights = Boolean(project.highlights?.length);

  // Show highlights when no detailed solution section is available.
  const showHighlights = hasHighlights && !hasSolution;

  const hasGallery = Boolean(caseStudy?.gallery?.length);

  // Generate section numbers only for sections that are actually rendered.
  const sectionKeys = [
    hasOverview ? "overview" : null,
    hasSolution ? "solution" : null,
    hasImplementation ? "implementation" : null,
    hasChallenges ? "challenges" : null,
    hasOutcomes ? "outcomes" : null,
    showHighlights ? "highlights" : null,
    hasGallery ? "gallery" : null,
    "technology",
  ].filter((key): key is string => Boolean(key));

  const sectionNumbers = Object.fromEntries(
    sectionKeys.map((key, position) => [
      key,
      String(position + 1).padStart(2, "0"),
    ]),
  );

  const liveUrl =
    project.demo ||
    (project.href && project.href !== "#" && project.href !== project.repo
      ? project.href
      : undefined);

  return (
    <main className="relative min-h-screen bg-bg">
      <article className="container pb-24 pt-28 sm:pt-32">
        {/* Breadcrumb */}
        <Link
          href="/projects"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-neon-green focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <header className="mb-10 max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {project.featured && (
              <span className="inline-flex items-center gap-2 border border-neon-green/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neon-green">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />
                Featured Case Study
              </span>
            )}

            {project.type && (
              <span className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                {project.type}
              </span>
            )}

            {project.year && (
              <span className="border border-border px-3 py-1.5 font-mono text-[10px] text-fg-muted">
                {project.year}
              </span>
            )}
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-fg sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-fg-muted sm:text-lg">
            {project.short}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-neon-green px-5 text-sm font-semibold text-black transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Visit Live Project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium text-fg transition-colors hover:border-neon-green hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green"
              >
                <Github className="h-4 w-4" />
                Source Code
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-bg-soft sm:aspect-[2/1]">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} project preview`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
              placeholder={project.blurDataURL ? "blur" : undefined}
              blurDataURL={project.blurDataURL}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-fg-muted">
              <ImageIcon className="h-8 w-8" />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-3 lg:gap-14">
          <div className="min-w-0 space-y-16 lg:col-span-2">
            {/* Overview */}
            {hasOverview && (
              <ContentSection
                number={sectionNumbers.overview}
                eyebrow="Project Overview"
                title="Understanding the Project"
              >
                <div className="space-y-8">
                  {overview?.background && (
                    <div>
                      <h3 className="mb-3 text-base font-semibold text-fg">
                        Background
                      </h3>
                      <p className="text-sm leading-8 text-fg-muted sm:text-base">
                        {overview.background}
                      </p>
                    </div>
                  )}

                  {project.longDescription && (
                    <div>
                      <h3 className="mb-3 text-base font-semibold text-fg">
                        Project Description
                      </h3>
                      <p className="text-sm leading-8 text-fg-muted sm:text-base">
                        {project.longDescription}
                      </p>
                    </div>
                  )}

                  {overview?.problem && (
                    <div className="border-l-2 border-neon-green pl-5">
                      <h3 className="mb-2 text-base font-semibold text-fg">
                        Problem Statement
                      </h3>
                      <p className="text-sm leading-7 text-fg-muted">
                        {overview.problem}
                      </p>
                    </div>
                  )}

                  {overview?.objectives?.length ? (
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <Target className="h-4 w-4 text-neon-green" />
                        <h3 className="text-base font-semibold text-fg">
                          Project Objectives
                        </h3>
                      </div>

                      <ul className="space-y-3">
                        {overview.objectives.map((objective) => (
                          <li
                            key={objective}
                            className="flex items-start gap-3 text-sm leading-7 text-fg-muted"
                          >
                            <Check className="mt-1 h-4 w-4 shrink-0 text-neon-green" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {overview?.targetUsers?.length ? (
                    <div>
                      <h3 className="mb-3 text-base font-semibold text-fg">
                        Target Users
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {overview.targetUsers.map((user) => (
                          <span
                            key={user}
                            className="border border-border bg-bg-elev px-3 py-2 text-xs text-fg-soft"
                          >
                            {user}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </ContentSection>
            )}

            {/* Solution */}
            {hasSolution && (
              <ContentSection
                number={sectionNumbers.solution}
                eyebrow="The Solution"
                title="What Was Built"
              >
                {solution?.description && (
                  <p className="mb-8 text-sm leading-8 text-fg-muted sm:text-base">
                    {solution.description}
                  </p>
                )}

                {solution?.features?.length ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {solution.features.map((feature, index) => (
                      <div
                        key={`${feature.title}-${index}`}
                        className="border border-border bg-bg-elev p-5 transition-colors hover:border-neon-green/40"
                      >
                        <div className="mb-4 flex h-8 w-8 items-center justify-center border border-neon-green/30 text-neon-green">
                          <span className="font-mono text-xs">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="mb-2 text-sm font-semibold text-fg">
                          {feature.title}
                        </h3>

                        <p className="text-sm leading-7 text-fg-muted">
                          {feature.description}
                        </p>

                        {feature.details?.length ? (
                          <ul className="mt-4 space-y-2 border-t border-border pt-4">
                            {feature.details.map((detail) => (
                              <li
                                key={detail}
                                className="flex items-start gap-2 text-xs leading-6 text-fg-muted"
                              >
                                <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-neon-green" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </ContentSection>
            )}

            {/* Implementation */}
            {hasImplementation && (
              <ContentSection
                number={sectionNumbers.implementation}
                eyebrow="Technical Implementation"
                title="Under the Hood"
              >
                {implementation?.architecture && (
                  <div className="mb-8">
                    {implementation.architecture.description && (
                      <p className="text-sm leading-8 text-fg-muted sm:text-base">
                        {implementation.architecture.description}
                      </p>
                    )}

                    {implementation.architecture.components?.length ? (
                      <div className="mt-5 space-y-3">
                        {implementation.architecture.components.map(
                          (component) => (
                            <div
                              key={component.name}
                              className="border border-border bg-bg-elev p-4"
                            >
                              <h3 className="mb-1 text-sm font-semibold text-fg">
                                {component.name}
                              </h3>
                              <p className="text-sm leading-6 text-fg-muted">
                                {component.description}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    ) : null}
                  </div>
                )}

                {implementation?.technicalDetails?.length ? (
                  <div className="border border-border bg-bg-elev p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-neon-green" />
                      <h3 className="text-sm font-semibold text-fg">
                        Technical Details
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {implementation.technicalDetails.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-3 text-sm leading-7 text-fg-muted"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-green" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {implementation?.decisions?.length ? (
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-neon-green" />
                      <h3 className="text-base font-semibold text-fg">
                        Technical Decisions
                      </h3>
                    </div>

                    {implementation.decisions.map((decision) => (
                      <div
                        key={decision.title}
                        className="border-l border-border pl-5"
                      >
                        <h4 className="mb-2 text-sm font-semibold text-fg">
                          {decision.title}
                        </h4>
                        <p className="text-sm leading-7 text-fg-muted">
                          {decision.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </ContentSection>
            )}

            {/* Challenges */}
            {hasChallenges && (
              <ContentSection
                number={sectionNumbers.challenges}
                eyebrow="Development Process"
                title="Challenges & Approach"
              >
                <div className="space-y-4">
                  {caseStudy?.challenges?.map((item, index) => (
                    <div
                      key={`${item.challenge}-${index}`}
                      className="border border-border bg-bg-elev p-5"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-neon-green" />
                        <h3 className="text-sm font-semibold text-fg">
                          Challenge
                        </h3>
                      </div>

                      <p className="mb-5 text-sm leading-7 text-fg-muted">
                        {item.challenge}
                      </p>

                      <div className="mb-2 flex items-center gap-2">
                        <Workflow className="h-4 w-4 text-neon-green" />
                        <h4 className="text-sm font-semibold text-fg">
                          Approach
                        </h4>
                      </div>

                      <p className="text-sm leading-7 text-fg-muted">
                        {item.approach}
                      </p>
                    </div>
                  ))}
                </div>
              </ContentSection>
            )}

            {/* Outcomes */}
            {hasOutcomes && (
              <ContentSection
                number={sectionNumbers.outcomes}
                eyebrow="Project Reflection"
                title="Outcomes & Learnings"
              >
                <div className="space-y-8">
                  {outcomes?.summary && (
                    <p className="text-sm leading-8 text-fg-muted sm:text-base">
                      {outcomes.summary}
                    </p>
                  )}

                  {outcomes?.achievements?.length ? (
                    <div>
                      <h3 className="mb-4 text-base font-semibold text-fg">
                        Key Outcomes
                      </h3>
                      <ul className="space-y-3">
                        {outcomes.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex items-start gap-3 text-sm leading-7 text-fg-muted"
                          >
                            <Check className="mt-1 h-4 w-4 shrink-0 text-neon-green" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {outcomes?.learnings?.length ? (
                    <div>
                      <h3 className="mb-4 text-base font-semibold text-fg">
                        Lessons Learned
                      </h3>
                      <ul className="space-y-3">
                        {outcomes.learnings.map((learning) => (
                          <li
                            key={learning}
                            className="flex items-start gap-3 text-sm leading-7 text-fg-muted"
                          >
                            <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-neon-green" />
                            {learning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {outcomes?.limitations?.length ? (
                    <div>
                      <h3 className="mb-4 text-base font-semibold text-fg">
                        Limitations & Future Improvements
                      </h3>
                      <ul className="space-y-3">
                        {outcomes.limitations.map((limitation) => (
                          <li
                            key={limitation}
                            className="flex items-start gap-3 text-sm leading-7 text-fg-muted"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fg-muted" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </ContentSection>
            )}

            {/* Highlights Fallback */}
            {showHighlights && (
              <ContentSection
                number={sectionNumbers.highlights}
                eyebrow="Project Highlights"
                title="Key Highlights"
              >
                <ul className="space-y-3">
                  {project.highlights?.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 border border-border bg-bg-elev p-4 text-sm leading-7 text-fg-muted"
                    >
                      <Check className="mt-1 h-4 w-4 shrink-0 text-neon-green" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </ContentSection>
            )}

            {/* Gallery */}
            {hasGallery && (
              <ContentSection
                number={sectionNumbers.gallery}
                eyebrow="Visual Showcase"
                title="Project Gallery"
              >
                <div className="grid grid-cols-1 gap-6">
                  {caseStudy?.gallery?.map((item, index) => (
                    <figure key={`${item.src}-${index}`}>
                      <div className="relative aspect-video overflow-hidden border border-border bg-bg-soft">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 800px"
                          className="object-cover"
                        />
                      </div>

                      {item.caption && (
                        <figcaption className="mt-3 text-xs leading-6 text-fg-muted">
                          {item.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </ContentSection>
            )}

            {/* Technology Stack */}
            <ContentSection
              number={sectionNumbers.technology}
              eyebrow="Tools & Technologies"
              title="Technology Stack"
            >
              <div className="flex flex-wrap gap-2">
                {project.tech.map((technology) => (
                  <span
                    key={technology}
                    className="border border-border bg-bg-elev px-3 py-2 text-sm text-fg-soft"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </ContentSection>
          </div>

          {/* Sidebar */}
          <ProjectPageAside project={project} />
        </div>

        {/* Project Navigation */}
        {(previous || next) && (
          <nav
            className="mt-24 border-t border-border pt-10"
            aria-label="Project navigation"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">
                Continue Exploring
              </span>

              <Link
                href="/projects"
                className="text-xs text-fg-muted transition-colors hover:text-neon-green"
              >
                All Projects
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {previous ? (
                <Link
                  href={`/projects/${previous.id}`}
                  className="group border border-border bg-bg-elev p-5 transition-colors hover:border-neon-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green"
                >
                  <span className="mb-3 flex items-center gap-2 text-xs text-fg-muted">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Previous Project
                  </span>

                  <span className="text-base font-semibold text-fg transition-colors group-hover:text-neon-green">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/projects/${next.id}`}
                  className="group border border-border bg-bg-elev p-5 text-left transition-colors hover:border-neon-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green sm:text-right"
                >
                  <span className="mb-3 flex items-center justify-end gap-2 text-xs text-fg-muted">
                    Next Project
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>

                  <span className="text-base font-semibold text-fg transition-colors group-hover:text-neon-green">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>
        )}
      </article>
    </main>
  );
}
