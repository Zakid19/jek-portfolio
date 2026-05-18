// src/components/ui/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("theme") as Theme | null) ?? null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved ?? (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event("theme-change"));
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-border dark:border-white/10 bg-bg-elev/60 backdrop-blur-md hover:border-neon-cyan/40 hover:shadow-glow-soft transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={reduce ? false : { opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="w-[18px] h-[18px] text-neon-cyan" strokeWidth={2} />
          ) : (
            <Sun className="w-[18px] h-[18px] text-amber-500" strokeWidth={2} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
