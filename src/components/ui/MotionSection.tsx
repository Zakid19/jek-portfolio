// src/components/ui/MotionSection.tsx
"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function MotionSection({
  children,
  className = "",
  threshold = 0.12,
  offset = "-80px", // root margin like -80px to trigger earlier
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  offset?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { margin: offset, once: true });

  const variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={shouldReduce ? "show" : inView ? "show" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
