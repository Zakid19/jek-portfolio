// src/data/projects.ts
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "p1",
    title: "Management System Hospital",
    short:
      "Sistem manajemen rumah sakit berbasis Laravel dengan modul pasien, rawat inap, manajemen kamar, dan laporan. Menggunakan role-based access (admin/dokter/perawat) dan dashboard monitoring interaktif.",
    tech: ["Laravel", "Blade", "Tailwind CSS", "MySQL"],
    image: "/assets/images/project-1.png",
    href: "#",
  },
  {
    id: "p2",
    title: "NFT Generator System",
    short:
      "Platform generator NFT otomatis berbasis Next.js + Express.js. Fitur unggulan: upload layer, generate acak, serta export image & metadata untuk koleksi NFT.",
    tech: ["Next.js", "Express.js"],
    image: "/assets/images/project-2.png",
    href: "#",
  },
  {
    id: "p3",
    title: "Crypto Landing Page",
    short:
      "Landing page modern untuk proyek cryptocurrency dengan desain responsif, CTA interaktif, dan animasi ringan berbasis React & Tailwind.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-3.png",
    href: "#",
  },
  {
    id: "p4",
    title: "Company Profile Website",
    short:
      "Website profil perusahaan dengan CMS sederhana berbasis Laravel dan React.js untuk pengelolaan konten serta admin panel interaktif.",
    tech: ["Laravel", "MySQL", "React.js"],
    image: "/assets/images/project-4.png",
    href: "#",
  },
  {
    id: "p5",
    title: "Website Lorehype Agency",
    short:
      "Website profil interaktif untuk agensi Lorehype menggunakan React + Tailwind + Firebase. Fitur autentikasi dan manajemen konten terintegrasi.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    image: "/assets/images/project-5.png",
    href: "#",
  },
];
