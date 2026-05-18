// src/components/ui/Section.tsx
import React, { ReactNode } from "react";
import MotionSection from "./MotionSection";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  useMotion?: boolean;
  align?: "left" | "center";
};

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  innerClassName = "",
  useMotion = true,
  align = "left",
}: Props) {
  const heading = (title || subtitle || eyebrow) && (
    <header
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 badge-glow mb-4 font-mono uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-fg">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-fg-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );

  const inner = (
    <div className={cn("container", innerClassName)}>
      {heading}
      {children}
    </div>
  );

  const base = "relative section-cv py-16 sm:py-24 scroll-mt-24";

  if (useMotion) {
    return (
      <MotionSection id={id} className={cn(base, className)}>
        {inner}
      </MotionSection>
    );
  }

  return (
    <section id={id} className={cn(base, className)}>
      {inner}
    </section>
  );
}
