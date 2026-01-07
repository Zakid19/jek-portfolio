// src/app/layout.tsx
// import "@/styles/globals.css";
import "../app/globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ThemeTransition from "@/components/ui/ThemeTransition";
import BackToTop from "@/components/ui/BackToTop";

/**
 * Metadata for App Router (can be extended per route later)
 */
export const metadata = {
  title: "Zakida Portfolio",
  description: "Personal portfolio of Your Name — frontend developer.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // inline script to set initial theme BEFORE React hydrates
  // Minimizes FOUC by applying `dark` class early based on localStorage or system preference
  const setInitialTheme = `
    (function () {
      try {
        var theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          // respect system preference when no explicit user choice
          var mql = window.matchMedia('(prefers-color-scheme: dark)');
          if (mql && mql.matches) document.documentElement.classList.add('dark');
        }
      } catch (e) {
        // fail silently on older browsers / incognito restrictions
      }
    })();
  `;

  return (
    <html lang="en">
      <head>
        {/* font quick-loading (swap ensures text is visible while font loads) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* run before hydration to avoid theme flash */}
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>

      <body className="antialiased selection:bg-primary/30 selection:text-white">
        {/* Skip link for keyboard users */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white dark:bg-slate-800 text-sm px-3 py-2 rounded shadow"
        >
          Skip to content
        </a>

        {/* Header / Navbar */}
        <header>
          <Navbar />
        </header>

        {/* Main content */}
        <main id="content" className="min-h-[60vh]" tabIndex={-1}>
          {children}
        </main>

        <BackToTop threshold={400} />

        {/* Footer */}
        <Footer />

        {/* mounts client-only helpers (ThemeTransition listens for 'theme-change' events) */}
        <div id="client-helpers" aria-hidden>
          <ThemeTransition />
        </div>

        {/* Portal root for modals/lightboxes (use createPortal to render here) */}
        <div id="modal-root" />
      </body>
    </html>
  );
}
