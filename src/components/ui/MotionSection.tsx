// src/components/ui/MotionSection.tsx
"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function MotionSection({
   id,
  children,
  className = "",
  threshold = 0.12,
  offset = "-80px 0px", // format rootMargin
}: {
   id?: string;
  children: ReactNode;
  className?: string;
  threshold?: number;
  offset?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduce = useReducedMotion();

  // 🧠 Casting opsi jadi any untuk kompatibilitas lintas versi
  const inView = useInView(ref, {
    rootMargin: offset,
    once: true,
  } as any);

  const variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
    id={id}
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
