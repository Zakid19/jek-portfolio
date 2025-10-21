// src/components/ui/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

type ThemeState = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeState>("system");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme") as ThemeState | null;
      if (saved) setTheme(saved);
      else setTheme("system");
    } catch {
      setTheme("system");
    }
  }, []);

  useEffect(() => {
    try {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        // system
        localStorage.removeItem("theme");
        const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefers) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      }
    } catch {
      // no-op on SSR or if localStorage not available
    }
  }, [theme]);

  const toggle = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="inline-flex items-center justify-center p-2 rounded-md focus-visible:ring-2"
    >
      {theme === "dark" ? (
        <span aria-hidden>🌙</span>
      ) : (
        <span aria-hidden>☀️</span>
      )}
      <span className="sr-only">Toggle color theme</span>
    </button>
  );
}
