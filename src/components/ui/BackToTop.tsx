"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * BackToTop with progress ring
 * - shows when user scrolled past `threshold`
 * - click scrolls to top (smooth unless reduced-motion)
 */
export default function BackToTop({
  threshold = 400,
  size = 52,
}: {
  threshold?: number;
  size?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || window.pageYOffset;
      const height = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const pct = Math.min(1, Math.max(0, scrollTop / height));

      setProgress(pct);
      setVisible(scrollTop > threshold);
      rafRef.current = null;
    };

    update();

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [threshold]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const stroke = 3;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * progress;
  const remaining = circumference - dash;

  return (
    <div
      aria-hidden={!visible}
      className="fixed bottom-6 right-4 z-40 sm:right-6"
    >
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={!visible}
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={
          visible
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 16, scale: 0.9 }
        }
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group relative inline-flex items-center justify-center rounded-full border border-border bg-bg text-fg transition-colors duration-300 hover:border-neon-green hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-default"
        aria-label="Back to top"
        title="Back to top"
        style={{
          width: size,
          height: size,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 -rotate-90 text-neon-green"
          aria-hidden="true"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="currentColor"
            strokeOpacity={0.18}
            strokeWidth={stroke}
            fill="transparent"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${remaining}`}
            style={{ transition: "stroke-dasharray 120ms linear" }}
          />
        </svg>

        <ArrowUp
          className="relative z-10 h-5 w-5 transition-colors duration-300 group-hover:text-neon-green"
          strokeWidth={2.5}
        />

        <span className="sr-only" aria-live="polite">
          {visible ? `Page scrolled ${Math.round(progress * 100)}%` : ""}
        </span>
      </motion.button>
    </div>
  );
}
