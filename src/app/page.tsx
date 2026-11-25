import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Keep below-the-fold sections code-split.
const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
