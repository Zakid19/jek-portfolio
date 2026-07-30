import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import LazyView from "@/components/ui/LazyView";

// Code-split below-hero sections — keeps initial JS payload tight.
const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function HomePage() {
  return (
    <>
      <Hero />
      <LazyView minHeight={680}>
        <About />
      </LazyView>
      <LazyView minHeight={760}>
        <Projects />
      </LazyView>
      <LazyView minHeight={620}>
        <Skills />
      </LazyView>
      <LazyView minHeight={680}>
        <Contact />
      </LazyView>
    </>
  );
}
