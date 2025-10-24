"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * BackToTop with progress ring
 * - shows when user scrolled past `threshold`
 * - click scrolls to top (smooth unless reduced-motion)
 * - progress ring shows scroll progress (animated)
 *
 * Usage: <BackToTop threshold={300} />
 */

export default function BackToTop({ threshold = 400, size = 52 }: { threshold?: number; size?: number }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const reduce = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  // compute scroll progress (0..1)
  const update = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || window.pageYOffset;
    const height = Math.max(doc.scrollHeight - window.innerHeight, 1);
    const pct = Math.min(1, Math.max(0, scrollTop / height));
    setProgress(pct);
    setVisible(scrollTop > threshold);
  };

  useEffect(() => {
    // initial
    update();

    const onScroll = () => {
      // throttle using RAF
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current && cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold]);

  const handleClick = () => {
    if ("scrollBehavior" in document.documentElement.style && !reduce) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
    const main = document.querySelector("body");
    if (main instanceof HTMLElement) main.focus();
  };

  // progress ring geometry
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * Math.max(0, Math.min(1, progress));
  const remaining = circumference - dash;

  // motion variants (hidden/visible)
  const variants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div aria-hidden={!visible} className="fixed right-4 bottom-6 z-50">
      <motion.button
        type="button"
        onClick={handleClick}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        variants={reduce ? { hidden: {}, visible: {} } : variants}
        transition={{ duration: 0.26 }}
        className="group relative inline-flex items-center justify-center rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9945FF]/30"
        aria-label="Back to top"
        title="Back to top"
        style={{ width: size, height: size }}
      >
        {/* SVG ring */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative z-0">
          <defs>
            <linearGradient id="bt-gradient" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#14F195" />
              <stop offset="100%" stopColor="#0075FF" />
            </linearGradient>
          </defs>

          {/* background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(15,23,42,0.06)"
            strokeWidth={stroke}
            fill="transparent"
          />

          {/* progress stroke */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="url(#bt-gradient)"
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${remaining}`}
            strokeDashoffset={reduce ? 0 : 0}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
            animate={reduce ? {} : { strokeDasharray: `${dash} ${remaining}` }}
            transition={{ duration: 0.18 }}
          />
        </svg>

        {/* icon */}
        <span className="absolute z-10 text-white" aria-hidden>
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 stroke-black dark:stroke-white transition-colors duration-200"
          >
            <path
              d="M12 6v12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 12l-6-6-6 6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </span>



        {/* sr-only live text */}
        <span className="sr-only" aria-live="polite">
          {visible ? `Page scroll ${Math.round(progress * 100)}%` : ""}
        </span>
      </motion.button>
    </div>
  );
}
