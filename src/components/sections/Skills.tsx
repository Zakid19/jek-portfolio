"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import { SKILLS } from "@/data/skills";
import { motion, AnimatePresence } from "framer-motion";

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function Skills() {
  const categories = SKILLS.map((s) => s.group);
  const [active, setActive] = useState(categories[0]);
  const selectedGroup = SKILLS.find((s) => s.group === active);

  return (
    <Section id="skills" title="Skills & Expertise">
      {/* Tabs */}
      <div className="flex justify-center gap-3 mt-8 flex-wrap">
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileTap={{ scale: 0.96 }}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60
                ${
                  isActive
                    ? "bg-gradient-to-r from-secondary-green to-secondary-blue text-white shadow-[0_0_25px_2px_rgba(0,255,255,0.25)]"
                    : "border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-white/80 hover:border-secondary-blue/50 hover:text-cyan-400"
                }`}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {selectedGroup?.items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                variants={cardVariant}
                whileHover={{
                  y: -6,
                  boxShadow: "0 8px 30px rgba(0,255,255,0.12)",
                }}
                className="rounded-xl p-5 bg-white dark:bg-primary
                           border border-neutral-200 dark:border-white/10 backdrop-blur-sm
                           transition-all duration-300 "
              >
                {/* Skill header */}
                <div className="flex items-center gap-2 mb-3">
                  {Icon && (
                    <Icon className="text-secondary-blue w-5 h-5 opacity-90" />
                  )}
                  <span className="font-medium text-neutral-800 dark:text-white text-sm tracking-wide">
                    {item.name}
                  </span>
                </div>

                {/* Level Indicator */}
                <div className="flex gap-1.5 mt-1">
                  {[...Array(5)].map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx < item.level
                          ? "bg-gradient-to-r from-secondary-green to-secondary-blue shadow-[0_0_6px_rgba(0,255,255,0.8)]"
                          : "bg-secondary-green/30 dark:bg-cyan-500/20"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
