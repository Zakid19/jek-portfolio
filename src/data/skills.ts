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
  SiJavascript
} from "react-icons/si";

export const SKILLS = [
  {
    group: "Frontend",
    items: [
      { name: "Next.js", level: 5, icon: SiNextdotjs },
      { name: "React", level: 5, icon: SiReact },
      { name: "TypeScript", level: 4, icon: SiTypescript },
      { name: "Tailwind CSS", level: 5, icon: SiTailwindcss },
      { name: "Javascript", level: 4, icon: SiJavascript },
      // { name: "Accessibility", level: 4, icon: SiAccessibility }
    ]
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", level: 4, icon: SiNodedotjs },
      { name: "Express", level: 4, icon: SiExpress },
      { name: "Laravel", level: 4, icon: SiLaravel },
      { name: "Python", level: 4, icon: SiPython }
    ]
  },
  {
    group: "Database",
    items: [
      { name: "MySQL", level: 4, icon: SiMysql },
      { name: "PostgreSQL", level: 4, icon: SiPostgresql },
      { name: "Firebase", level: 3, icon: SiFirebase }
    ]
  },
  {
    group: "Tools",
    items: [
      { name: "Git", level: 4, icon: SiGit },
      { name: "GitHub", level: 4, icon: SiGithub },
      { name: "Postman", level: 4, icon: SiPostman },
      { name: "Vercel", level: 5, icon: SiVercel },
      { name: "Docker (basic)", level: 3, icon: SiDocker },
      { name: "AI / LLM Integration", level: 4, icon: SiOpenai },
      { name: "Figma", level: 4, icon: SiFigma }
    ]
  },
  {
    group: "Soft Skills",
    items: [
      { name: "Problem Solving", level: 5, icon: null },
      { name: "Product Mindset", level: 5, icon: null },
      { name: "Collaboration", level: 5, icon: null }
    ]
  }
];
