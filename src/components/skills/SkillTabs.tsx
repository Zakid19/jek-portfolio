"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/\";

const tabs = ["All", "Frontend", "Backend", "Tools", "Soft Skills"];

export default function SkillTabs({ active, setActive }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "relative px-3 py-1 text-sm transition-colors",
              isActive ? "text-cyan-200" : "text-gray-400 hover:text-cyan-300"
            )}
          >
            {tab}

            {isActive && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[2px]
                           bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
