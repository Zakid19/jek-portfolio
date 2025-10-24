// src/types/index.ts
export type Project = {
  id: string;
  title: string;
  short: string;
  tech: string[];
  image?: string; // public path or external url
  href?: string; // demo or repo
  longDescription?: string; //
  role?: string;
  status?: string;
  type?: string;
  repo?: string;
   caseStudy?: string;
   demo?: string;
};
