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
    title: "Sistem Absensi Fingerprint Simulator",
    short:
      "Aplikasi absensi sekolah berbasis Laravel 11 yang terintegrasi dengan device fingerprint standalone tanpa SDK. Sistem menangkap fingerprint ID dari device, memetakkannya ke data siswa melalui mekanisme registrasi terkontrol, dan mencatat absensi secara realtime dengan perhitungan jam masuk dan keterlambatan yang dinamis. Dilengkapi manajemen siswa, guru, dan kelas, validasi anti double-scan, laporan absensi, serta arsitektur modular yang stabil dan hemat biaya untuk device entry-level.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-7.png",
    href: "#",
  },

  {
    id: "p8",
    title: "Sistem Cerdas Booking Bengkel Chatbot",
    short:
      "Smart Booking & Queue Management System adalah aplikasi web berbasis Laravel 11 untuk mengelola booking servis, antrian, dan operasional bengkel secara efisien. Sistem ini mendukung booking online, monitoring antrian real-time, serta estimasi waktu tunggu berbasis rule-based decision support yang dihitung dari durasi layanan, jumlah antrian, dan ketersediaan mekanik. Dilengkapi chatbot berbasis perintah (command-based) tanpa machine learning, aplikasi ini membantu pengguna mengecek status booking, antrian, dan jadwal servis dengan cepat. Dirancang modular dengan arsitektur MVC + Service Layer, sistem ini ringan, mudah dikembangkan, dan siap digunakan untuk kebutuhan komersial maupun Tugas Akhir.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-8.png",
    href: "#",
  },
  {
    id: "p9",
    title: "Sistem Booking Barbershop",
    short:
      "Sistem ini adalah aplikasi booking barbershop berbasis web yang dirancang untuk membantu barbershop kecil–menengah mengelola booking secara rapi, otomatis, dan bebas bentrok jadwal, tanpa ketergantungan pada chat manual (WhatsApp/DM). Aplikasi dibangun dengan pendekatan real-world MVP, fokus pada operasional nyata, shared-hosting friendly, dan mudah dipakai oleh admin non-teknis maupun customer awam.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-9.png",
    href: "#",
  },
  {
    id: "p10",
    title: "Crypto Landing Page",
    short:
      "Landing page modern untuk proyek cryptocurrency dengan desain responsif, CTA interaktif, dan animasi ringan berbasis React & Tailwind.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-10.png",
    href: "#",
  },
  {
    id: "p11",
    title: "Smart Stock Prediction UMKM",
    short:
      "Aplikasi web berbasis Laravel 11 yang berfungsi sebagai Decision Support System (DSS) untuk membantu UMKM mengelola stok barang secara efektif. Sistem ini menyediakan manajemen produk dan penjualan, analisis penjualan historis, serta prediksi kebutuhan stok menggunakan metode Moving Average. Dilengkapi chatbot berbasis rule-based, validasi stok real-time, laporan dan visualisasi data, serta role-based access (Admin & Staff), sistem ini dirancang ringan, explainable, dan tanpa machine learning sehingga mudah dipahami dan siap digunakan pada skala bisnis kecil hingga menengah.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-11.png",
    href: "#",
  },
];
