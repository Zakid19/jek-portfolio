// src/app/layout.tsx
import "../app/globals.css";
import type { ReactNode } from "react";
import Navbar from "./components/ui/Navbar";

export const metadata = {
  title: "Your Name — Portfolio",
  description: "Personal portfolio of Your Name — frontend developer.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Inline script to set theme before React hydrates (minimizes FOUC).
  const setInitialTheme = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          // respect system preference by default
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en">
      <head>
        {/* Preconnect + font (quick approach). Later you can switch to next/font for optimization */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body className="antialiased selection:bg-primary/30 selection:text-white">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        {/* footer will be added later as component */}
      </body>
    </html>
  );
}
