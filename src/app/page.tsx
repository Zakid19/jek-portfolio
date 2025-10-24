import Hero from '../components/sections/Hero'
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="about" className="py-16">
        <About />
      </section>
      <section id="projects" className="py-16">
        <Projects />
      </section>
      <section id="skills" className="py-16">
        <Skills />
      </section>
      <section id="contact" className="py-16">
        <Contact />
      </section>
    </>
  );
}
