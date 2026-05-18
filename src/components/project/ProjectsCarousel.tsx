// src/components/project/ProjectsCarousel.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/project/ProjectCard";
import type { Project } from "@/types";

const DynamicModal = dynamic(() => import("@/components/project/ProjectModal"), { ssr: false });

const GAP_PX = 24;

export default function ProjectsCarousel() {
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

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedSnap(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
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

  return (
    <div className="relative">
      <div className="embla overflow-hidden -mx-2 px-2" ref={emblaRef}>
        <div className="embla__container flex gap-6 py-2">
          {projects.map((p) => (
            <div
              key={p.id}
              className="embla__slide flex-shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={p.title}
            >
              <ProjectCard project={p} onOpen={setSelected} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedSnap
                  ? "w-8 bg-gradient-to-r from-neon-green to-neon-cyan shadow-[0_0_10px_rgb(34_211_238_/_0.6)]"
                  : "w-2 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous"
            className="w-10 h-10 rounded-full border border-white/10 bg-bg-elev/60 backdrop-blur-md flex items-center justify-center text-fg hover:border-neon-cyan/50 hover:text-neon-cyan disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next"
            className="w-10 h-10 rounded-full border border-white/10 bg-bg-elev/60 backdrop-blur-md flex items-center justify-center text-fg hover:border-neon-cyan/50 hover:text-neon-cyan disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <a
            href="/projects"
            className="ml-2 inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-medium text-white bg-brand-gradient bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-glow-soft hover:shadow-glow transition-all duration-500"
          >
            View all
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {selected && <DynamicModal project={selected} onClose={() => setSelected(null)} />}

      <style jsx>{`
        .embla__slide {
          flex: 0 0 85%;
        }
        @media (min-width: 640px) {
          .embla__slide {
            flex: 0 0 calc((100% - ${GAP_PX}px) / 2);
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
