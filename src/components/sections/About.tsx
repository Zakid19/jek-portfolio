"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { CheckCircle2, CalendarDays } from "lucide-react";

// === Animations ===
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};
const container = { visible: { transition: { staggerChildren: 0.12 } } };
const badgeHover = { scale: 1.15, y: -6, transition: { type: "spring", stiffness: 350 } };

export default function About() {
  const expertise = [
    "React & Next.js",
    "TypeScript",
    "Smart Contracts",
    "UI/UX & Animations",
    "REST & Web3 APIs",
  ];

  const experience = [
    {
      role: "Frontend / Web Developer",
      company: "Freelance",
      period: "2022 — Present",
      details: "Building modern interfaces & crypto experiences",
    },
    {
      role: "Full Stack Developer",
      company: "Abie Group",
      period: "2023 — 2024",
      details: "End-to-end fullstack project development",
    },
    {
      role: "Full Stack Developer",
      company: "Lorehype Agency",
      period: "2024 — 2025",
      details: "End-to-end fullstack project development",
    },
  ];

  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const cursorRef = useRef<any>(null);
  const handleMouseMove = (e: any) => {
    if (!cursorRef.current) return;
    cursorRef.current.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
  };

  return (
    <section
      id="about"
      className="py-32 relative max-w-6xl mx-auto px-6 spotlight-area cyber-grid snap-center"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Follow Cursor */}
      <div ref={cursorRef} className="spotlight-pointer" />

      {/* Glass Divider */}
      <motion.div
        style={{ opacity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[2px]
        bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent blur-sm"
      />

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-20"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 dark:text-white text-neutral-900">
          About Me
        </h2>
        {/* <p className="max-w-2xl mx-auto mt-3  ">
          Passionate developer crafting high-performance futuristic experiences
        </p> */}
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

        {/* LEFT */}
        <div className="space-y-14">

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl p-8 border border-neutral-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]
            dark:bg-primary dark:border-white/10 dark:backdrop-blur-md
            hover:shadow-md transition  duration-300"
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden ring-2 ring-cyan-400/30 shadow-[0_0_25px_rgba(0,255,255,0.3)]"
            >
              <img src="/assets/images/avatar.png" alt="Avatar" className="object-cover" />
            </motion.div>

            {/* <p className="inline-block px-3 py-1 text-xs uppercase rounded-md font-semibold tracking-wide
            bg-neutral-100 dark:bg-cyan-400/10 text-neutral-700 dark:text-cyan-300 border
            dark:border-cyan-400/30">
              Web3 Developer
            </p> */}

            <p className="mt-4 text-neutral-600 dark:text-white/75 text-sm text-justify leading-relaxed">
              I'm a self-taught Fullstack Web Developer experienced in building scalable and user-friendly web applications using React.js, Next.js, Laravel, and Express.js.
              Passionate about clean code, fast execution, and leveraging AI-assisted development (ChatGPT Prompt Engineering) to accelerate coding, debugging, and documentation.
            </p>
          </motion.div>

          {/* Expertise */}
          <motion.div
            variants={fadeUp}
            viewport={{ once: true }}
            className="p-6 border border-neutral-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]
            dark:bg-primary rounded-2xl dark:border-white/10"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4 text-lg">
              Core Expertise
            </h3>

            <motion.ul
              className="flex flex-wrap gap-3"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {expertise.map((skill) => (
                <motion.li
                  key={skill}
                  variants={fadeUp}
                  whileHover={badgeHover}
                  className="px-3 py-1.5 rounded-md text-xs bg-gradient-to-r from-cyan-400/10 to-blue-400/10
                  border dark:border-cyan-300/20 dark:text-cyan-300 shadow-[0_0_30px_-13px_rgba(0,255,255,0.5)]"
                >
                  <CheckCircle2 className="w-4 h-4 inline mr-1" /> {skill}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* RIGHT — Timeline */}
        <div id="work" ref={timelineRef} className="relative pl-10">

          <motion.div
            style={{ height: progressHeight, opacity }}
            className="absolute left-0 top-0 w-[3px] bg-gradient-to-b from-secondary-green to-secondary-blue rounded-full shadow-[0_0_20px_rgba(0,255,255,0.4)]"
          />

          <h3 className="font-bold text-xl dark:text-white mb-5">Professional Journey</h3>

          {experience.map((exp, i) => (
            <TiltCard
              key={i}
              className="relative mb-8 p-5 bg-white dark:bg-primary rounded-xl shadow-sm border dark:border-white/10"
            >
              <div className="absolute -left-[10px] -top-2 w-4 h-4 bg-gradient-to-br from-secondary-green to-secondary-blue rounded-full shadow-[0_0_15px_rgba(0,255,255,0.4)]" />
              <div className="text-cyan-500 dark:text-white font-semibold">{exp.role}</div>
              <div className="flex items-center gap-2 mt-1 text-sm dark:text-cyan-300/80">
                <CalendarDays className="w-4 h-4" /> {exp.period}
              </div>
              <p className="text-sm mt-2 dark:text-white/70">{exp.details}</p>
              <p className="text-xs mt-1 dark:text-purple-200/70">{exp.company}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==== 3D TILT ====
function TiltCard({ children, className = "" }: any) {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ rotateX: 0, rotateY: 0 });

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rotate.rotateX,
        rotateY: rotate.rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(e) => {
        const rect: any = ref.current?.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setRotate({ rotateX: y / -20, rotateY: x / 20 });
      }}
      onMouseLeave={() => setRotate({ rotateX: 0, rotateY: 0 })}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className={`${className} transition-transform duration-300 origin-center`}
    >
      {children}
    </motion.div>
  );
}
