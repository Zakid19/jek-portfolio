// src/components/ui/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/15 bg-white/80 dark:bg-primary">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-green to-secondary-blue flex items-center justify-center text-white font-bold">
            Y
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Zaki Deza</div>
            <div className="text-xs text-slate-600 dark:text-slate-300">Fullstack Web Developer</div>
          </div>
        </div>

        {/* Links (center on md) */}
        <div className="flex justify-center">
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/#projects" className="text-slate-700 dark:text-slate-200 hover:underline">
              Projects
            </Link>
            <Link href="/#about" className="text-slate-700 dark:text-slate-200 hover:underline">
              About
            </Link>
            <Link href="/#skills" className="text-slate-700 dark:text-slate-200 hover:underline">
              Skills
            </Link>
            <Link href="/#contact" className="text-slate-700 dark:text-slate-200 hover:underline">
              Contact
            </Link>
          </nav>
        </div>

        {/* Social & CTA */}
        <div className="flex justify-end items-center gap-4">
          <div className="flex items-center gap-3">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-200 text-sm hover:underline">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-200 text-sm hover:underline">
              LinkedIn
            </a>
          </div>

          <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm px-3 py-1 rounded-md bg-gradient-to-br from-secondary-green to-secondary-blue text-white hover:shadow-[0_0_30px_-5px_rgba(0,255,255,0.5)]">
            Resume
          </Link>
        </div>

        {/* Copyright full-width under on small screens */}
        <div className="md:col-span-3 text-center text-xs text-slate-600 dark:text-slate-300 mt-2">
          © {new Date().getFullYear()} Zaki Deza.
        </div>
      </div>
    </footer>
  );
}
