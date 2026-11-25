"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  amount?: number | "some" | "all";
  delay?: number;
};

export default function MotionSection({
  id,
  children,
  className = "",
  amount = "some",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduce = useReducedMotion();

  const inView = useInView(ref, {
    once: true,
    amount,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={
        shouldReduce || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
      }
      transition={{
        duration: shouldReduce ? 0 : 0.7,
        ease: [0.22, 0.8, 0.2, 1],
        delay: shouldReduce ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
