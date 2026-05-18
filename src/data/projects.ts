// src/data/projects.ts
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "p1",
    title: "Hospital Management System",
    short:
      "Role-based hospital management platform handling patients, inpatient care, room assignment, and reporting — with a live monitoring dashboard.",
    longDescription:
      "An end-to-end hospital operations suite built with Laravel and Blade. Includes role-based access for admins, doctors, and nurses, modular patient & room workflows, and a real-time dashboard that surfaces ward occupancy and KPIs.",
    tech: ["Laravel", "Blade", "Tailwind CSS", "MySQL"],
    image: "/assets/images/project-1.png",
    blurDataURL:
      "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAgCdASoQAAgAA4BaJbACdLoAApv8w+hAAOvmC1+aa/Jpczu+LPHK0FXDAxr9b0L7dT8kMbMrgtn+LR/8y78HAAA=",
    href: "https://github.com/Zakid19/Sm-Hospital",
    repo: "https://github.com/Zakid19/Sm-Hospital",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2024",
    highlights: [
      "Role-based access (admin / doctor / nurse)",
      "Real-time ward & occupancy dashboard",
      "Modular patient and room workflows",
    ],
    featured: true,
  },
  {
    id: "p2",
    title: "NFT Generator System",
    short:
      "Fullstack NFT collection generator with automated image compositing, JSON metadata, and a live preview UI.",
    longDescription:
      "Simulates a production NFT workflow end-to-end: trait-based image compositing, deterministic metadata generation, and a polished Next.js preview for curating outputs before mint.",
    tech: ["Next.js", "Express.js", "Node.js"],
    image: "/assets/images/project-2.png",
    blurDataURL:
      "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAABwAQCdASoQAAgAA4BaJaVnyAGIAAD+8HQIGGlCydJXQkeullAAAA==",
    href: "https://github.com/Zakid19/generator-system-NFT",
    repo: "https://github.com/Zakid19/generator-system-NFT",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2024",
    highlights: [
      "Trait-based automated image compositing",
      "Deterministic JSON metadata output",
      "Web preview interface for the entire collection",
    ],
    featured: true,
  },
  {
    id: "p3",
    title: "Parodee — Crypto Landing",
    short:
      "Modern landing page for a cryptocurrency project — responsive layout, interactive CTAs, and lightweight motion.",
    tech: ["React", "Tailwind CSS", "TypeScript"],
    image: "/assets/images/project-3.png",
    blurDataURL:
      "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAwAgCdASoQAAoAA4BaJQBOj+ADAEOz+scwAAD+7StUosQXT2W+TKt5Ex+ySbyaskwNGLAuP388fg1a/miBUWwO1MOxuUslhuVTsUlYgcl1kEFBNvGQrOCxyB2tbQGKAAA=",
    href: "https://parodee.fun/",
    demo: "https://parodee.fun/",
    role: "Frontend Developer",
    status: "Live",
    type: "Landing Page",
    year: "2024",
  },
  {
    id: "p4",
    title: "PT Anak Bungsu Indo Energi",
    short:
      "Corporate profile site with a lightweight Laravel CMS and a React-driven admin panel for content management.",
    tech: ["Laravel", "React", "MySQL", "Tailwind CSS"],
    image: "/assets/images/project-4.jpeg",
    blurDataURL:
      "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwAgCdASoQAAkAA4BaJaACdH8AFnfkrc6FAADNk6pO2BzLiRqr64k+8Q1ty5SbGKH6PfHUYZOJ1LlmOonFxc8pgDogFfaTyqsBnr/HRdJo/fruRGE7wCprAAA=",
    href: "http://www.abienergi.com/",
    demo: "http://www.abienergi.com/",
    role: "Fullstack Developer",
    status: "Live",
    type: "CMS",
    year: "2023",
  },
  {
    id: "p5",
    title: "Lorehype Agency",
    short:
      "Interactive agency profile with Firebase authentication and an integrated content management layer.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    image: "/assets/images/project-5.png",
    blurDataURL:
      "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADQAQCdASoQAAkAA4BaJZwAAsdBbIJ0AAD+4eyXO4CvbVaw1Hylki3P1SAnHq+3i1ZhmtN0QADxoEwg8IwZN2SNmMf2DQB51GI22SA0HBDCgAAA",
    href: "https://lorehype.com/",
    demo: "https://lorehype.com/",
    role: "Fullstack Developer",
    status: "Live",
    type: "Web App",
    year: "2024",
    featured: true,
  },
  {
    id: "p6",
    title: "Kalisloka — Export Landing",
    short:
      "Modern landing page for an export company — focused on storytelling, product showcases, and clean conversions.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-6.png",
    blurDataURL:
      "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAACwAQCdASoQAAcAA4BaJZQAAu0eDYEoAP7tCdjXhuFqRrM301XGrHt0z+YJQzfMxQD6WYAA",
    href: "https://www.kalisloka.com/",
    demo: "https://www.kalisloka.com/",
    role: "Frontend Developer",
    status: "Live",
    type: "Landing Page",
    year: "2024",
  },
  {
    id: "p7",
    title: "Fingerprint Attendance Simulator",
    short:
      "Laravel 11 school attendance system that talks to standalone fingerprint devices (no SDK) and logs entries in real time.",
    longDescription:
      "Captures fingerprint IDs straight from entry-level standalone devices, maps them to student records via a controlled registration flow, and records attendance in real time with dynamic late-time calculation. Ships with student/teacher/class management, anti double-scan validation, attendance reports, and a modular architecture designed for cost-effective hardware.",
    tech: ["Laravel", "Tailwind CSS", "MySQL"],
    image: "/assets/images/project-7.png",
    blurDataURL:
      "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAACQAQCdASoQAAcAA4BaJZwAApKugoAA/oo5j51KfmdTYO3L/dxAr/t/Z3D34tHdCZxiH9QsBrHAAA==",
    href: "#",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2025",
    highlights: [
      "SDK-less integration with standalone fingerprint devices",
      "Real-time attendance with dynamic late-time logic",
      "Anti double-scan validation & reporting",
    ],
  },
  {
    id: "p8",
    title: "Smart Workshop Booking & Chatbot",
    short:
      "Laravel 11 booking and queue platform for auto workshops — real-time queue monitoring with a rule-based chatbot.",
    longDescription:
      "Manages online booking, real-time queue monitoring, and wait-time estimation using rule-based decision support that factors in service duration, queue length, and mechanic availability. A command-based chatbot (no ML required) lets customers check booking, queue, and schedule instantly. Built on an MVC + Service Layer architecture so it stays lightweight and easy to extend.",
    tech: ["Laravel", "Tailwind CSS", "MySQL"],
    image: "/assets/images/project-8.png",
    blurDataURL:
      "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAAAQAgCdASoQAAcAA4BaJZACdAEf/qnmyfAAAP5tJLobcWbFP037kG1bGDxLqKtPXw/7EAAA",
    href: "#",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2025",
    highlights: [
      "Rule-based wait-time estimation",
      "Command-based chatbot (no ML dependency)",
      "MVC + Service Layer architecture",
    ],
    featured: true,
  },
  {
    id: "p9",
    title: "Barbershop Booking System",
    short:
      "Web-based booking platform for small-to-mid barbershops — zero-conflict scheduling, MVP-first, shared-hosting friendly.",
    longDescription:
      "Designed to replace messy WhatsApp/DM bookings with a clean, automated flow. Built around real operational needs: tight scheduling, admin- and customer-friendly UI, and shared-hosting friendly deployment.",
    tech: ["Laravel", "Tailwind CSS", "MySQL"],
    image: "/assets/images/project-9.png",
    blurDataURL:
      "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoQAAcAA4BaJZQCdAEO9p5AAP3GSnNVUE9mIr5iuIN4fXfkGi9FsgASxefklQtL5ThXMTmAAAA=",
    href: "#",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2025",
  },
  {
    id: "p10",
    title: "Crypto Landing Page",
    short:
      "Modern crypto landing page with responsive layout, interactive CTAs, and lightweight motion.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-10.png",
    blurDataURL:
      "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADQAQCdASoQAAcAA4BaJaACdAEO+xazAAD+o398gej5a+yOe58dG3X4u7EcZPDsQ5gK81NpEOtyYAAA",
    href: "#",
    role: "Frontend Developer",
    status: "Completed",
    type: "Landing Page",
    year: "2024",
  },
  {
    id: "p11",
    title: "Smart Stock Prediction for SMBs",
    short:
      "Laravel 11 Decision Support System helping SMBs forecast inventory needs with Moving Average — explainable, no black-box ML.",
    longDescription:
      "A Decision Support System (DSS) for small businesses that combines product & sales management, historical sales analytics, and inventory forecasting using Moving Average. Includes a rule-based chatbot, real-time stock validation, reports & data visualisation, and role-based access (Admin / Staff). Designed to be lightweight, explainable, and ML-free so it's easy to adopt.",
    tech: ["Laravel", "Tailwind CSS", "MySQL"],
    image: "/assets/images/project-11.png",
    blurDataURL:
      "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoQAAcAA4BaJZwAAudM1z3wAPw+RZ65Z2DV5kuV5kNg07VlIAA=",
    href: "#",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2025",
    highlights: [
      "Moving-Average inventory forecasting",
      "Rule-based chatbot + real-time stock validation",
      "Role-based access (Admin / Staff)",
    ],
    featured: true,
  },
];

/** Used by the Hero component to render a smooth LQIP while the avatar loads. */
export const AVATAR_BLUR =
  "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAQCdASoQABAAA4BaJagCdAEfbhGqNgAA/vaqviv7cxW4ghYdLwzbeob344JRoyGH+Ix58l6zDMV0wyaVrRimAAA=";
