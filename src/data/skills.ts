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
  level: number;
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
      { name: "Next.js", level: 5, icon: SiNextdotjs },
      { name: "React", level: 5, icon: SiReact },
      { name: "TypeScript", level: 4, icon: SiTypescript },
      { name: "Tailwind CSS", level: 5, icon: SiTailwindcss },
      { name: "JavaScript", level: 5, icon: SiJavascript },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", level: 4, icon: SiNodedotjs },
      { name: "Express", level: 4, icon: SiExpress },
      { name: "Laravel", level: 4, icon: SiLaravel },
      { name: "Python", level: 3, icon: SiPython },
    ],
  },
  {
    group: "Database",
    items: [
      { name: "MySQL", level: 4, icon: SiMysql },
      { name: "PostgreSQL", level: 4, icon: SiPostgresql },
      { name: "Firebase", level: 3, icon: SiFirebase },
    ],
  },
  {
    group: "AI & Vibe Coding",
    items: [
      { name: "Claude / Claude Code", level: 5, icon: SiClaude },
      { name: "ChatGPT / GPT-4o", level: 5, icon: SiOpenai },
      { name: "Cursor", level: 5, icon: null },
      { name: "GitHub Copilot", level: 4, icon: SiGithubcopilot },
      { name: "v0 by Vercel", level: 4, icon: SiVercel },
      { name: "Prompt Engineering", level: 5, icon: null },
      { name: "LLM API Integration", level: 4, icon: null },
      { name: "AI-Augmented Workflow", level: 5, icon: null },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git", level: 4, icon: SiGit },
      { name: "GitHub", level: 4, icon: SiGithub },
      { name: "Postman", level: 4, icon: SiPostman },
      { name: "Vercel", level: 5, icon: SiVercel },
      { name: "Docker (basic)", level: 3, icon: SiDocker },
      { name: "Figma", level: 4, icon: SiFigma },
    ],
  },
  {
    group: "Soft Skills",
    items: [
      { name: "Problem Solving", level: 5, icon: null },
      { name: "Product Mindset", level: 5, icon: null },
      { name: "Collaboration", level: 5, icon: null },
      { name: "Fast Iteration", level: 5, icon: null },
    ],
  },
];
