// // src/components/sections/Projects.tsx
// "use client";

// import dynamic from "next/dynamic";
// import { useState } from "react";
// import Section from "@/components/ui/Section";
// import ProjectCard from "@/components/project/ProjectCard";
// import { projects } from "@/data/projects";
// import type { Project } from "@/types";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// const DynamicModal = dynamic(() => import("@/components/project/ProjectModal"), { ssr: false });

// export default function Projects() {
//   const [selected, setSelected] = useState<Project | null>(null);
//   const [expanded, setExpanded] = useState(false);
//   const reduce = useReducedMotion();

//   const shown = expanded ? projects : projects.slice(0, 3);

//   // Variants for each item
//   const itemVariants = {
//     hidden: { opacity: 0, y: 10 },
//     show: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -8 },
//   };

//   return (
//     <Section id="projects" title="Selected Projects">
//       <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         <AnimatePresence initial={false}>
//           {shown.map((p) => (
//             // motion wrapper per item with layout so grid reflows smoothly
//             <motion.div
//               key={p.id}
//               layout
//               initial={reduce ? false : "hidden"}
//               animate={reduce ? "show" : "show"}
//               exit={reduce ? false : "exit"}
//               variants={itemVariants}
//             >
//               <ProjectCard key={p.id} project={p} onOpen={setSelected} />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       <div className="mt-6 flex items-center gap-3">
//         {/* animate button label change slightly */}
//         <motion.button
//           onClick={() => setExpanded((s) => !s)}
//           className="border px-4 py-2 rounded"
//           aria-expanded={expanded}
//           layout
//           whileTap={reduce ? {} : { scale: 0.98 }}
//         >
//           <AnimatePresence mode="wait">
//             <motion.span
//               key={expanded ? "less" : "more"}
//               initial={{ opacity: 0, y: 4 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -4 }}
//               transition={{ duration: 0.18 }}
//             >
//               {expanded ? "Show less" : `Show more`}
//             </motion.span>
//           </AnimatePresence>
//         </motion.button>
//       </div>

//       {/* Render modal only when selected */}
//       {selected ? <DynamicModal project={selected} onClose={() => setSelected(null)} /> : null}
//     </Section>
//   );
// }
