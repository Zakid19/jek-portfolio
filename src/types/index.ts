export type ProjectFeature = {
  title: string;
  description: string;
  details?: string[];
};

export type ProjectArchitecture = {
  description?: string;
  components?: {
    name: string;
    description: string;
  }[];
};

export type ProjectChallenge = {
  challenge: string;
  approach: string;
};

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectCaseStudy = {
  // Project context
  overview?: {
    background?: string;
    problem?: string;
    objectives?: string[];
    targetUsers?: string[];
  };

  // Proposed solution
  solution?: {
    description?: string;
    features?: ProjectFeature[];
  };

  // Technical implementation
  implementation?: {
    architecture?: ProjectArchitecture;
    technicalDetails?: string[];
    decisions?: {
      title: string;
      explanation: string;
    }[];
  };

  // Development process
  challenges?: ProjectChallenge[];

  // Results and reflection
  outcomes?: {
    summary?: string;
    achievements?: string[];
    learnings?: string[];
    limitations?: string[];
  };

  // Supporting visuals
  gallery?: ProjectGalleryItem[];
};

export type Project = {
  id: string;
  title: string;
  short: string;
  longDescription?: string;

  tech: string[];
  image?: string;
  blurDataURL?: string;

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

  // Extended case study content
  caseStudyContent?: ProjectCaseStudy;
};
