"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Section from "@/components/ui/Section";
import { SKILLS } from "@/data/skills";
import { cn } from "@/lib/utils";

export default function Skills() {
  const categories = SKILLS.map((s) => s.group);
  const [active, setActive] = useState(categories[0]);
  const selectedGroup = SKILLS.find((s) => s.group === active);
  const reduce = useReducedMotion();

  return (
    <Section
      id="skills"
      eyebrow="Toolbox"
      title="Skills & Expertise"
      subtitle="A pragmatic stack built around shipping fast, scaling cleanly, and embracing AI in the loop."
    >
      {/* Tabs — horizontal scroll on mobile, wrap on tablet+ */}
      <div className="flex sm:flex-wrap sm:justify-center gap-2 mt-2 mb-10 sm:mb-12 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto sm:overflow-visible scrollbar-none">
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "relative px-4 sm:px-5 h-10 rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 whitespace-nowrap flex-shrink-0",
                isActive
                  ? "text-white"
                  : "text-fg-soft border border-white/10 hover:text-fg hover:border-neon-cyan/40"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="skills-tab-bg"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-brand-gradient bg-[length:200%_100%] animate-gradient shadow-glow-soft"
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {selectedGroup?.items.map((item, idx) => {
            const Icon = item.icon;
            const pct = (item.level / 5) * 100;
            return (
              <motion.div
                key={item.name}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={reduce ? undefined : { y: -4 }}
                className="group relative rounded-xl p-5 glass neon-edge overflow-hidden hover:shadow-glow-soft transition-shadow duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  {Icon ? (
                    <div className="relative w-10 h-10 rounded-lg bg-bg-elev border border-white/10 flex items-center justify-center group-hover:border-neon-cyan/40 transition-colors">
                      <Icon className="w-5 h-5 text-neon-cyan" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-brand-gradient bg-[length:200%_100%] animate-gradient flex items-center justify-center font-mono text-white text-sm">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-fg text-sm">{item.name}</div>
                    <div className="text-[0.7rem] font-mono uppercase tracking-wider text-fg-muted">
                      Level {item.level}/5
                    </div>
                  </div>
                </div>

                {/* Animated bar */}
                <div className="relative h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 + idx * 0.04 }}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple shadow-[0_0_8px_rgb(34_211_238_/_0.6)]"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
