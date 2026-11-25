// src/app/layout.tsx

import "./globals.css";

import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import { JetBrains_Mono } from "next/font/google";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ThemeTransition from "@/components/ui/ThemeTransition";
import BackToTop from "@/components/ui/BackToTop";

/* ================================================================
   FONT CONFIGURATION
================================================================ */

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

/* ================================================================
   SITE CONFIGURATION
================================================================ */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zakideza.dev";

/* ================================================================
   SEO METADATA
================================================================ */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Zaki Deza - Fullstack Web Developer",
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
    title: "Zaki Deza - Fullstack Web Developer",

    description:
      "Building scalable, AI-augmented web experiences with React, Next.js, Laravel, and Express.",

    images: ["/assets/images/avatar.png"],
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* ================================================================
   VIEWPORT
================================================================ */

export const viewport: Viewport = {
  // Dark-first browser theme color
  themeColor: "#000103",

  width: "device-width",
  initialScale: 1,
};

/* ================================================================
   ROOT LAYOUT
================================================================ */

export default function RootLayout({ children }: { children: ReactNode }) {
  /*
   * Apply theme before first paint.
   *
   * Default theme: Dark.
   * Saved user preference takes priority.
   * Light theme remains available through the theme toggle.
   */

  const setInitialTheme = `
    (function () {
      try {
        var saved = localStorage.getItem("theme");
        var useDark = saved ? saved === "dark" : true;

        document.documentElement.classList.toggle("dark", useDark);
      } catch (_) {
        document.documentElement.classList.add("dark");
      }
    })();
  `;

  /* ==============================================================
     STRUCTURED DATA
  ============================================================== */

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
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <head>
        {/* Apply theme before initial paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: setInitialTheme,
          }}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className="font-sans antialiased selection:bg-neon-green/20 selection:text-fg">
        {/* Skip Navigation */}
        <a
          href="#content"
          className={[
            "sr-only",
            "focus:not-sr-only",
            "focus:fixed",
            "focus:top-4",
            "focus:left-4",
            "focus:z-[100]",
            "bg-bg-elev",
            "text-fg",
            "text-sm",
            "px-3",
            "py-2",
            "rounded-md",
            "shadow-glow",
          ].join(" ")}
        >
          Skip to content
        </a>

        {/* Main Navigation */}
        <Navbar />

        {/* Main Content */}
        <main id="content" className="relative min-h-[60vh]" tabIndex={-1}>
          {children}
        </main>

        {/* Global Components */}
        <BackToTop threshold={400} />

        <Footer />

        <ThemeTransition />

        {/* Portal Root */}
        <div id="modal-root" />
      </body>
    </html>
  );
}
