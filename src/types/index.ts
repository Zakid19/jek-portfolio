// src/types/index.ts
export type Project = {
  id: string;
  title: string;
  short: string;
  tech: string[];
  image?: string; // public path or external url
  href?: string; // demo or repo
};
