// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ThemeTransition from "@/components/ui/ThemeTransition";
import BackToTop from "@/components/ui/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zakideza.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zaki Deza — Fullstack Web Developer",
    template: "%s · Zaki Deza",
  },
  description:
    "Fullstack web developer crafting scalable, AI-augmented web experiences with React, Next.js, Laravel, and Express.",
  keywords: [
    "Zaki Deza",
    "Zakida",
    "Fullstack Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "Laravel",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Zaki Deza" }],
  creator: "Zaki Deza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Zaki Deza · Portfolio",
    title: "Zaki Deza — Fullstack Web Developer",
    description:
      "Building scalable, AI-augmented web experiences with React, Next.js, Laravel, and Express.",
    images: [
      {
        url: "/assets/images/avatar.png",
        width: 1200,
        height: 630,
        alt: "Zaki Deza — Fullstack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaki Deza — Fullstack Web Developer",
    description:
      "Building scalable, AI-augmented web experiences with React, Next.js, Laravel, and Express.",
    images: ["/assets/images/avatar.png"],
  },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafc" },
    { media: "(prefers-color-scheme: dark)", color: "#08090e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Inline pre-hydration script: applies the dark class BEFORE first paint
  // so users never see a flash of the wrong theme.
  const setInitialTheme = `
    (function () {
      try {
        var saved = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var useDark = saved ? saved === 'dark' : prefersDark;
        if (useDark) document.documentElement.classList.add('dark');
      } catch (_) {}
    })();
  `;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Zaki Deza",
    url: SITE_URL,
    image: `${SITE_URL}/assets/images/avatar.png`,
    jobTitle: "Fullstack Web Developer",
    sameAs: [
      "https://github.com/Zakid19",
      "https://linkedin.com/in/zaki-deza-31666719a",
    ],
    knowsAbout: ["React", "Next.js", "TypeScript", "Laravel", "Tailwind CSS"],
  };

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="font-sans antialiased selection:bg-neon-purple/30 selection:text-white">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-bg-elev text-fg text-sm px-3 py-2 rounded-md shadow-glow"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="content" className="min-h-[60vh] relative" tabIndex={-1}>
          {children}
        </main>

        <BackToTop threshold={400} />
        <Footer />

        <ThemeTransition />
        <div id="modal-root" />
      </body>
    </html>
  );
}
