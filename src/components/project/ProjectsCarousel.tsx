"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";
import ProjectCard from "@/components/project/ProjectCard";
import type { Project } from "@/types";

const DynamicModal = dynamic(
  () => import("@/components/project/ProjectModal"),
  { ssr: false },
);

const GAP_PX = 24;

export default function ProjectsCarousel() {
  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);

  const syncCarouselState = useCallback(() => {
    if (!emblaApi) return;

    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedSnap(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handleReInit = useCallback(() => {
    if (!emblaApi) return;

    setSnaps(emblaApi.scrollSnapList());
    syncCarouselState();
  }, [emblaApi, syncCarouselState]);

  useEffect(() => {
    if (!emblaApi) return;

    handleReInit();

    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reInit", handleReInit);

    return () => {
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reInit", handleReInit);
    };
  }, [emblaApi, handleReInit, syncCarouselState]);

  const openPrevious = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const openNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const openSlide = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <div className="relative">
      {featuredProjects.length > 0 ? (
        <>
          {/* COLLECTION HEADER */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-y border-border py-4">
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full bg-neon-green"
                aria-hidden="true"
              />

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-fg-muted sm:text-xs">
                Featured Collection
              </span>
            </div>

            <span className="font-mono text-[10px] tabular-nums tracking-wider text-fg-muted sm:text-xs">
              {String(featuredProjects.length).padStart(2, "0")} PROJECTS
            </span>
          </div>

          {/* FEATURED PROJECTS CAROUSEL */}
          <div
            ref={emblaRef}
            className="overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects"
          >
            <div className="flex gap-6 py-2">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="embla__slide min-w-0 flex-shrink-0"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${featuredProjects.length}: ${project.title}`}
                >
                  <ProjectCard project={project} onOpen={setSelected} />
                </div>
              ))}
            </div>
          </div>

          {/* CAROUSEL CONTROLS */}
          <div className="mt-7 flex flex-col-reverse gap-5 border-t border-border pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
            {/* PAGINATION */}
            <div className="flex items-center justify-between gap-4 sm:justify-start">
              <div
                className="flex items-center gap-2"
                role="group"
                aria-label="Choose featured project slide"
              >
                {snaps.map((_, index) => {
                  const isActive = index === selectedSnap;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => openSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      className={[
                        "h-2 rounded-full",
                        "transition-all duration-200",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2 focus-visible:ring-ring",
                        "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                        isActive
                          ? "w-8 bg-neon-green"
                          : "w-2 bg-border hover:bg-fg-muted",
                      ].join(" ")}
                    />
                  );
                })}
              </div>

              <span className="font-mono text-[10px] tabular-nums tracking-wider text-fg-muted sm:hidden">
                {snaps.length > 0
                  ? `${String(selectedSnap + 1).padStart(2, "0")} / ${String(snaps.length).padStart(2, "0")}`
                  : "00 / 00"}
              </span>
            </div>

            {/* NAVIGATION & VIEW ALL */}
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="flex items-center gap-2">
                {/* PREVIOUS */}
                <button
                  type="button"
                  onClick={openPrevious}
                  disabled={!canPrev}
                  aria-label="Previous featured projects"
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-md",
                    "border border-border bg-bg",
                    "text-fg-muted transition-colors duration-200",
                    "hover:border-neon-green/50 hover:text-neon-green",
                    "disabled:cursor-not-allowed disabled:opacity-30",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  ].join(" ")}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>

                {/* NEXT */}
                <button
                  type="button"
                  onClick={openNext}
                  disabled={!canNext}
                  aria-label="Next featured projects"
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-md",
                    "border border-border bg-bg",
                    "text-fg-muted transition-colors duration-200",
                    "hover:border-neon-green/50 hover:text-neon-green",
                    "disabled:cursor-not-allowed disabled:opacity-30",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  ].join(" ")}
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>

                {/* VIEW ALL */}
                <a
                  href="/projects"
                  className={[
                    "ml-1 inline-flex h-10 items-center justify-center gap-2",
                    "rounded-md border border-border bg-bg px-4",
                    "text-sm font-medium text-fg",
                    "transition-colors duration-200",
                    "hover:border-neon-green/50 hover:text-neon-green",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  ].join(" ")}
                >
                  View all
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-border bg-bg px-6 py-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-muted">
            No featured projects available
          </p>
        </div>
      )}

      {/* PROJECT DETAIL MODAL */}
      {selected && (
        <DynamicModal project={selected} onClose={() => setSelected(null)} />
      )}

      {/* RESPONSIVE SLIDE WIDTH */}
      <style jsx>{`
        .embla__slide {
          flex: 0 0 88%;
        }

        @media (min-width: 640px) {
          .embla__slide {
            flex: 0 0 55%;
          }
        }

        @media (min-width: 1024px) {
          .embla__slide {
            flex: 0 0 calc((100% - ${GAP_PX * 2}px) / 3);
          }
        }
      `}</style>
    </div>
  );
}
