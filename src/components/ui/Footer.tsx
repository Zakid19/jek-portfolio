// src/components/ui/Footer.tsx
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const NAV = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/Zakid19", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/zaki-deza-31666719a", icon: Linkedin },
  { label: "Email", href: "mailto:zakideza19@gmail.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06] bg-bg-soft/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-brand-gradient bg-[length:200%_100%] flex items-center justify-center text-white font-bold font-mono shadow-glow-soft group-hover:bg-[position:100%_0] transition-all duration-500">
                Z
              </div>
              <div>
                <div className="font-semibold text-fg">Zaki Deza</div>
                <div className="text-xs text-fg-muted">Fullstack Web Developer</div>
              </div>
            </Link>

            <p className="mt-5 text-sm text-fg-muted leading-relaxed max-w-sm">
              Building scalable, AI-augmented web experiences with React, Next.js, Laravel, and
              Express. Available for remote work and collaborations.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex w-10 h-10 items-center justify-center rounded-full border border-white/10 bg-bg-elev/60 backdrop-blur-md text-fg-soft hover:text-neon-cyan hover:border-neon-cyan/50 hover:shadow-glow-soft transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-muted">
              Navigate
            </h4>
            <nav className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm" aria-label="Footer">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-fg-soft hover:text-fg link-underline w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-muted">
              Resume
            </h4>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 w-full h-11 px-4 rounded-lg text-sm font-medium text-white bg-brand-gradient bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-glow-soft hover:shadow-glow transition-all duration-500"
            >
              Download Resume
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <p className="mt-3 text-xs text-fg-muted leading-relaxed">
              PDF — work history, selected projects, and contact details.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-fg-muted">
          <span>© {new Date().getFullYear()} Zaki Deza. All rights reserved.</span>
          <span className="font-mono">
            Built with Next.js · Tailwind · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
