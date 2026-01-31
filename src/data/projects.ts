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
    href: "https://github.com/Zakid19/Sm-Hospital",
  },
  {
    id: "p2",
    title: "NFT Generator System",
    short:
      "NFT Generator adalah aplikasi fullstack untuk menghasilkan koleksi NFT secara otomatis, lengkap dengan image compositing, metadata JSON, dan preview web interface. Project ini dirancang untuk mensimulasikan workflow NFT production end-to-end seperti yang digunakan pada NFT collection di dunia nyata.",
    tech: ["Next.js", "Express.js", "Node.js"],
    image: "/assets/images/project-2.png",
    href: "https://github.com/Zakid19/generator-system-NFT",
  },
  {
    id: "p3",
    title: "Parodee Crypto Project",
    short:
      "Landing page modern untuk proyek cryptocurrency dengan desain responsif, CTA interaktif, dan animasi ringan berbasis React & Tailwind.",
    tech: ["React", "Tailwind CSS", "Typescript"],
    image: "/assets/images/project-3.png",
    href: "https://parodee.fun/",
  },
  {
    id: "p4",
    title: "PT Anak Bungsu Indo Energi",
    short:
      "Website profil perusahaan dengan CMS sederhana berbasis Laravel dan React.js untuk pengelolaan konten serta admin panel interaktif.",
    tech: ["Laravel", "MySQL", "React.js"],
    image: "/assets/images/project-4.jpeg",
    href: "http://www.abienergi.com/",
  },
  {
    id: "p5",
    title: "Lorehype Agency",
    short:
      "Website profil interaktif untuk agensi Lorehype menggunakan React + Tailwind + Firebase. Fitur autentikasi dan manajemen konten terintegrasi.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    image: "/assets/images/project-5.png",
    href: "https://lorehype.com/",
  },
  {
    id: "p6",
    title: "Kalisloka",
    short: "Landing page modern untuk perusahaan export kalisloka",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-6.png",
    href: "https://www.kalisloka.com/",
  },
  {
    id: "p7",
    title: "Crypto Landing Page",
    short:
      "Landing page modern untuk proyek cryptocurrency dengan desain responsif, CTA interaktif, dan animasi ringan berbasis React & Tailwind.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-7.png",
    href: "#",
  },
];
