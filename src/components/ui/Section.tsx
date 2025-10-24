// src/components/ui/Section.tsx
import React, { ReactNode } from "react";
import MotionSection from "./MotionSection";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  useMotion?: boolean; // option to turn off motion per-section
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  useMotion = true,
}: SectionProps) {
  const inner = (
    <div className={`container ${className}`}>
      {/* Header Section */}
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 dark:text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Content */}
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
