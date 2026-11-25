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
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 rounded border border-neon-green px-3 py-1.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-neon-green">
          <span
            className="h-1.5 w-1.5 rounded-full bg-neon-green"
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      )}

      {title && (
        <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] text-fg sm:text-4xl md:text-5xl">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="mt-4 max-w-2xl text-sm font-normal leading-7 text-fg-muted sm:text-base sm:leading-8">
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

  const base = "relative section-cv py-16 sm:py-24 scroll-mt-6";

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
