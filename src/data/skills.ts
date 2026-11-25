import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiGit,
  SiDocker,
  SiVercel,
  SiPython,
  SiFigma,
  SiPostman,
  SiGithub,
  SiOpenai,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiJavascript,
  SiClaude,
  SiGithubcopilot,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type Skill = {
  name: string;
  icon: IconType | null;
};

export type SkillGroup = {
  group: string;
  items: Skill[];
};

export const SKILLS: SkillGroup[] = [
  {
    group: "Frontend",
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "Laravel", icon: SiLaravel },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    group: "Database",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    group: "AI & Development Workflows",
    items: [
      { name: "Claude / Claude Code", icon: SiClaude },
      { name: "ChatGPT / GPT-4o", icon: SiOpenai },
      { name: "Cursor", icon: null },
      { name: "GitHub Copilot", icon: SiGithubcopilot },
      { name: "v0 by Vercel", icon: SiVercel },
      { name: "Prompt Engineering", icon: null },
      { name: "LLM API Integration", icon: null },
      { name: "AI-Augmented Workflow", icon: null },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
      { name: "Vercel", icon: SiVercel },
      { name: "Docker (basic)", icon: SiDocker },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    group: "Soft Skills",
    items: [
      { name: "Problem Solving", icon: null },
      { name: "Product Mindset", icon: null },
      { name: "Collaboration", icon: null },
      { name: "Fast Iteration", icon: null },
    ],
  },
];
