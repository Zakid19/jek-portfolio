"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface TooltipProps {
  text: string;
  children: ReactNode;
  side?: "top" | "bottom";
}

export default function Tooltip({ text, children, side = "top" }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const isTop = side === "top";

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            initial={reduce ? false : { opacity: 0, y: isTop ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: isTop ? 4 : -4 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-1/2 -translate-x-1/2 z-30 ${
              isTop ? "bottom-[125%]" : "top-[125%]"
            } text-xs text-white bg-bg-elev/95 backdrop-blur-md px-2.5 py-1 rounded-md whitespace-nowrap border border-neon-cyan/30 shadow-glow-soft`}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
