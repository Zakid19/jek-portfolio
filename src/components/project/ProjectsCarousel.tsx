// src/components/project/ProjectsCarousel.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/project/ProjectCard";
import type { Project } from "@/types";
import { useReducedMotion } from "framer-motion";

const DynamicModal = dynamic(() => import("@/components/project/ProjectModal"), { ssr: false });

export default function ProjectsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  const GAP_PX = 24; // Tailwind gap-6 = 1.5rem = 24px

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") emblaApi.scrollPrev();
      if (e.key === "ArrowRight") emblaApi.scrollNext();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleOpen = useCallback((p: Project) => {
    setSelected(p);
  }, []);

  return (
    <div className="relative">
      {/* Embla viewport */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="embla__slide flex-shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${p.title} — slide`}
            >
              <ProjectCard project={p} onOpen={handleOpen} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="hidden absolute right-2 top-1/2 -translate-y-1/2 md:flex gap-2 z-10">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label="Previous projects"
          className="p-2 rounded-md border bg-white/85 dark:bg-slate-900/85 disabled:opacity-40 focus-visible:ring-2"
        >
          ‹
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          aria-label="Next projects"
          className="p-2 rounded-md border bg-white/85 dark:bg-slate-900/85 disabled:opacity-40 focus-visible:ring-2"
        >
          ›
        </button>
      </div>

      {/* Small CTA below carousel */}
      <div className="mt-4 flex justify-center ">
        <a href="/projects" className="text-sm py-1.5 px-3 rounded-lg bg-gradient-to-r from-secondary-green to-secondary-blue text-white hover:shadow-[0_0_30px_-5px_rgba(0,255,255,0.5)]">
          View All
        </a>
      </div>

      {/* Dynamic modal */}
      {selected ? <DynamicModal project={selected} onClose={() => setSelected(null)} /> : null}

      {/* CSS: calculate min-width per breakpoint so N slides fit fully */}
      <style jsx>{`
        .embla__container {
          display: flex;
          box-sizing: border-box;
        }
        .embla__slide {
          scroll-snap-align: start;
          box-sizing: border-box;
          /* ensure slides don't shrink and we control width via flex-basis */
          flex: 0 0 80%;
          padding: 0; /* avoid extra spacing from slides themselves */
        }

        /* >=640px (sm) => 2 columns */
        @media (min-width: 640px) {
          .embla__slide {
            /* (100% - gap) / 2 */
            flex: 0 0 calc((100% - ${GAP_PX}px) / 2);
          }
        }

        /* >=1024px (lg) => 3 columns fully visible */
        @media (min-width: 1024px) {
          .embla__slide {
            /* (100% - gap*2) / 3 */
            flex: 0 0 calc((100% - ${GAP_PX * 2}px) / 3);
          }
        }

        /* Make sure the viewport (embla) doesn't add extra padding that affects calc */
        .embla {
          box-sizing: border-box;
        }

        /* Reduce motion fallback */
        @media (prefers-reduced-motion: reduce) {
          .embla,
          .embla__container,
          .embla__slide {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </div>
  );
}
