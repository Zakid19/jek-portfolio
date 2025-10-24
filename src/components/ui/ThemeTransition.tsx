// src/components/ui/ThemeTransition.tsx
"use client";

import { useEffect } from "react";

export default function ThemeTransition() {
  useEffect(() => {
    const handler = () => {
      const html = document.documentElement;
      // Respect reduced-motion
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      html.classList.add("theme-transition");
      window.setTimeout(() => html.classList.remove("theme-transition"), 350);
    };

    window.addEventListener("theme-change", handler);
    // Also react to storage (if user toggles in other tab)
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("theme-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return null;
}
