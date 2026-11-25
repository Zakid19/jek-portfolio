// src/components/ui/ThemeToggle.tsx

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getSavedTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");

    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch {
    // Fall back to dark theme when storage is unavailable.
  }

  return "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  const reduce = useReducedMotion();

  // Initialize from the same preference used by layout.tsx.
  useEffect(() => {
    setTheme(getSavedTheme());
    setMounted(true);
  }, []);

  // Apply theme and persist user preference.
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");

    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Theme remains active for the current session.
    }

    window.dispatchEvent(new Event("theme-change"));
  }, [theme, mounted]);

  // Synchronize theme changes from other browser tabs.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "theme") return;

      if (event.newValue === "light" || event.newValue === "dark") {
        setTheme(event.newValue);
      } else {
        setTheme("dark");
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const toggle = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      className="
        inline-flex
        h-10
        w-10
        items-center
        justify-center
        rounded-md
        border
        border-border
        dark:border-white
        bg-transparent
        text-neon-green
        dark:text-neon-green
        transition-colors
        duration-200
        hover:border-neon-green
        hover:text-neon-green
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ring
      "
    >
      {!mounted ? (
        <span className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={reduce ? false : { opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {isDark ? (
              <Moon
                className="h-[18px] w-[18px] text-neon-cyan"
                strokeWidth={1.8}
              />
            ) : (
              <Sun
                className="h-[18px] w-[18px] text-neon-green"
                strokeWidth={1.8}
              />
            )}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
