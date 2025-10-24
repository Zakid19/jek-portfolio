// src/components/ui/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
  { label: "Work Experience", href: "/#work" },
  // { label: "Work Experience", href: "/#work", external: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const prefersReduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false); // hide-on-scroll

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef<number>(0);
  const ticking = useRef(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // scroll shadow/backdrop blur toggle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on scroll (mobile only)
  useEffect(() => {
    if (prefersReduce) return; // don't hide for reduced-motion users

    const threshold = 40;
    const handler = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        const last = lastScrollY.current;
        const width = window.innerWidth;
        if (width < 1024) {
          if (current - last > threshold && current > 120) {
            setHidden(true);
          } else if (last - current > 20) {
            setHidden(false);
          }
        } else {
          setHidden(false);
        }
        lastScrollY.current = current;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [prefersReduce]);

  // focus management & body scroll lock for mobile panel
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstLinkRef.current?.focus(), 60);

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
        if (e.key !== "Tab") return;
        const root = panelRef.current;
        if (!root) return;
        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
        toggleRef.current?.focus();
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // Simple scrollspy for anchor sections
  useEffect(() => {
    const ids = ["about", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, threshold: 0.48 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !activeSection;
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      return activeSection === id || (pathname === "/" && activeSection === null && id === "home");
    }
    return pathname === href;
  };

  const navMotion = prefersReduce
    ? { initial: undefined, animate: undefined }
    : { initial: { y: -12, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.36 } };

  const panelVariants = {
    closed: { x: "100%" },
    open: { x: 0 },
  };

  return (
    <motion.nav
      {...(prefersReduce ? {} : { initial: navMotion.initial, animate: navMotion.animate })}
      className={`w-full fixed top-0 z-50 transition-colors duration-300 ${scrolled ? "backdrop-blur-md bg-white/60 dark:bg-[#0b0b0b]/60 shadow-sm" : "bg-white/80 dark:bg-[#0b0b0b]/50"}`}
      aria-label="Primary navigation"
      style={{
        transform: hidden ? "translateY(-110%)" : undefined,
        transition: prefersReduce ? "none" : "transform 260ms cubic-bezier(.2,.9,.3,1)",
      }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary-green to-secondary-blue flex items-center justify-center text-white font-bold transform transition-transform duration-200 group-hover:scale-105" aria-hidden>
              Z
            </div>
            <span className="font-semibold text-lg text-slate-900 dark:text-white">Zaki Deza</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
          <div className="flex items-center gap-1 relative">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {item.label}
                </a>
              ) : (
                <div key={item.href} className="relative flex flex-col items-center">
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded text-sm inline-block transition ${
                      isActive(item.href)
                        ? "font-medium text-primary dark:text-white"
                        : "text-slate-800 hover:text-primary dark:text-white/80 dark:hover:text-white"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>

                  {/* Underline neon centered */}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden
                      className="absolute bottom-1 h-[2px] w-1/2 rounded-full
                                bg-gradient-to-r from-secondary-green to-secondary-blue
                                shadow-[0_0_20px_rgba(0,255,255,0.4)]
                                "
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    />
                  )}
                </div>
              )
            )}
          </div>

        </div>

        {/* Right side controls (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/resume.pdf"
            target="_blank"
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm bg-gradient-to-br from-secondary-green to-secondary-blue hover:shadow-[0_0_30px_-5px_rgba(0,255,255,0.5)]"
          >
            Resume
          </Link>

          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          {/* Animated hamburger */}
          <button
            ref={toggleRef}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((s) => !s)}
            className="relative z-50 w-10 h-10 rounded-md flex items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9945FF]/30"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="overflow-visible">
              <motion.g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <motion.line
                  animate={open ? { rotate: 45, translateY: 6 } : { rotate: 0, translateY: 0 }}
                  transition={{ duration: prefersReduce ? 0 : 0.18 }}
                  x1="4"
                  y1="7"
                  x2="20"
                  y2="7"
                />
                <motion.line
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: prefersReduce ? 0 : 0.12 }}
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                />
                <motion.line
                  animate={open ? { rotate: -45, translateY: -4 } : { rotate: 0, translateY: 0 }}
                  transition={{ duration: prefersReduce ? 0 : 0.18 }}
                  x1="4"
                  y1="17"
                  x2="20"
                  y2="17"
                />
              </motion.g>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div id="mobile-menu" aria-hidden={!open} className={`md:hidden fixed inset-0 pointer-events-none ${open ? "pointer-events-auto" : ""}`}>
        {/* backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 transition-opacity ${open ? "opacity-60" : "opacity-0"} bg-white dark:bg-[#0b0b0b]`}
          aria-hidden
        />

        {/* animated panel */}
        <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          ref={panelRef}
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={prefersReduce ? { closed: {}, open: {} } : panelVariants}
          transition={{ type: "spring", stiffness: 160, damping: 26 }}
          className="absolute z-50 right-0 top-0 h-full w-full max-w-xs transform bg-white dark:bg-[#0b0b0b] p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="font-semibold text-lg text-slate-900 dark:text-white">Menu</div>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-md text-slate-700 dark:text-slate-200 focus-visible:ring-2">
            </button>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Main mobile navigation">
            {NAV_ITEMS.map((item, idx) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#232323] transition"
                  ref={idx === 0 ? firstLinkRef : undefined}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  ref={idx === 0 ? firstLinkRef : undefined}
                  className={`block px-3 py-3 rounded text-base font-medium transition ${
                    isActive(item.href) ? "bg-white dark:bg-primary text-primary dark:text-white dark:hover:text-white" : "text-slate-700 hover:text-primary dark:text-white/70 dark:hover:text-white "
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="mt-6">
            <Link
              href="/resume.pdf"
              target="_blank"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-md text-white font-medium bg-gradient-to-bl from-[#14F195] to-[#9945FF] shadow"
            >
              Resume
            </Link>
          </div>
        </motion.aside>
      </div>
    </motion.nav>
  );
}
