// src/types/index.ts

export type Project = {
  id: string;
  title: string;
  /** Short pitch — used on cards & modals (1–2 sentences). */
  short: string;
  /** Long-form description — used on detail page. */
  longDescription?: string;
  tech: string[];
  image?: string;
  blurDataURL?: string;
  /** Primary link — usually live demo, falls back to repo. */
  href?: string;
  demo?: string;
  repo?: string;
  caseStudy?: string;
  role?: string;
  status?: "Live" | "In Progress" | "Completed" | "Archived" | string;
  type?: "Web App" | "Landing Page" | "Dashboard" | "SaaS" | "CMS" | string;
  year?: string;
  highlights?: string[];
  featured?: boolean;
};
