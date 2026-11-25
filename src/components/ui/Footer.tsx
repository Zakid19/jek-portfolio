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
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/zaki-deza-31666719a",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:zakideza19@gmail.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-bg">
      <div className="container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg font-mono font-bold text-neon-green transition-colors duration-300 group-hover:border-neon-green">
                Z
              </div>

              <div>
                <div className="font-semibold text-fg">Zaki Deza</div>
                <div className="text-xs text-fg-muted">
                  Fullstack Web Developer
                </div>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">
              Building scalable, AI-augmented web experiences with React,
              Next.js, Laravel, and Express. Available for remote work and
              collaborations.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-fg-muted transition-colors duration-300 hover:border-neon-green hover:text-neon-green"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-muted">
              Navigate
            </h4>

            <nav
              className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm"
              aria-label="Footer"
            >
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-fg-soft transition-colors duration-300 hover:text-neon-green"
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
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-bg px-4 text-sm font-medium text-fg transition-colors duration-300 hover:border-neon-green hover:text-neon-green"
            >
              Download Resume
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <p className="mt-3 text-xs leading-relaxed text-fg-muted">
              PDF — work history, selected projects, and contact details.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-fg-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} Zaki Deza. All rights reserved.
          </span>

          <span className="font-mono">
            Built with Next.js · Tailwind · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
