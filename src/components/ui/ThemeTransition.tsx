"use client";

import { useEffect } from "react";

export default function ThemeTransition() {
  useEffect(() => {
    const html = document.documentElement;

    let timeoutId: number | undefined;

    const clearTransitionTimer = () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const handler = () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      clearTransitionTimer();

      if (prefersReduced) {
        html.classList.remove("theme-transition");
        return;
      }

      html.classList.add("theme-transition");

      timeoutId = window.setTimeout(() => {
        html.classList.remove("theme-transition");
        timeoutId = undefined;
      }, 350);
    };

    window.addEventListener("theme-change", handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("theme-change", handler);
      window.removeEventListener("storage", handler);

      clearTransitionTimer();
      html.classList.remove("theme-transition");
    };
  }, []);

  return null;
}
