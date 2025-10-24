// src/components/ui/Section.tsx
import React, { ReactNode } from "react";
import MotionSection from "./MotionSection";

export default function Section({
  id,
  title,
  children,
  className = "",
  useMotion = true,
}: {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  useMotion?: boolean; // option to turn off motion per-section
}) {
  const inner = (
    <div className={`container ${className}`}>
      {title && <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{title}</h2>}
      <div>{children}</div>
    </div>
  );

  return useMotion ? (
    <MotionSection id={id} className="py-12 sm:py-16">
      {inner}
    </MotionSection>
  ) : (
    <section id={id} className="py-12 sm:py-16">
      {inner}
    </section>
  );
}
