// src/components/ui/MotionContainer.tsx
"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function   MotionContainer({
  children,
  stagger = 0.08,
  className = "",
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduce ? 0 : stagger,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  // wrap children and automatically inject item variants to direct children
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className={className}
    >
      {/*
        We expect child elements to be `motion` aware.
        For simplicity, we'll map children and wrap non-motion elements.
      */}
      {Array.isArray(children)
        ? children.map((child, i) =>
            // eslint-disable-next-line react/no-array-index-key
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          )
        : <motion.div variants={itemVariants}>{children}</motion.div>}
    </motion.div>
  );
}
