// src/components/ui/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Experience", href: "/#work", id: "work" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Scrolled state for backdrop blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide-on-scroll-down (mobile)
  useEffect(() => {
    if (reduce) return;
    const threshold = 40;
    const handler = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        const last = lastScrollY.current;
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          if (current - last > threshold && current > 120) setHidden(true);
          else if (last - current > 20) setHidden(false);
        } else {
          setHidden(false);
        }
        lastScrollY.current = current;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [reduce]);

  // Focus trap + scroll lock for mobile menu
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const focusT = setTimeout(() => firstLinkRef.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
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
      clearTimeout(focusT);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      toggleRef.current?.focus();
    };
  }, [open]);

  // Scrollspy
  useEffect(() => {
    const ids = ["about", "projects", "skills", "work", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isActive = (id: string) => {
    if (id === "home") return pathname === "/" && !activeSection;
    return activeSection === id;
  };

  return (
    <motion.header
      initial={reduce ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-bg/80 border-b border-white/[0.06] shadow-sm"
          : "bg-transparent"
      )}
      style={{
        transform: hidden ? "translateY(-110%)" : undefined,
        transition: reduce ? "none" : "transform 280ms cubic-bezier(.2,.9,.3,1), background-color 280ms",
      }}
      aria-label="Primary navigation"
    >
      <div className="container flex items-center justify-between gap-3 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Zaki Deza — home">
          <div className="relative w-9 h-9 rounded-xl bg-brand-gradient bg-[length:200%_100%] flex items-center justify-center text-white font-bold font-mono shadow-glow-soft group-hover:bg-[position:100%_0] transition-all duration-500">
            <span className="relative z-10">Z</span>
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-fg">
            Zaki<span className="text-neon-cyan">.</span>Deza
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.id);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-2 rounded-md text-sm transition-colors",
                  active
                    ? "text-fg"
                    : "text-fg-soft hover:text-fg"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] w-1/2 rounded-full bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple shadow-[0_0_12px_rgb(34_211_238_/_0.6)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="hidden lg:inline-flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-medium text-white bg-brand-gradient bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-glow-soft hover:shadow-glow transition-all duration-500"
          >
            <FileText className="w-4 h-4" />
            Resume
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((s) => !s)}
            className="relative z-50 w-10 h-10 rounded-full border border-white/10 bg-bg-elev/60 backdrop-blur-md flex items-center justify-center hover:border-neon-cyan/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={reduce ? false : { opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={reduce ? undefined : { opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "md:hidden fixed inset-0 z-40 pointer-events-none",
          open && "pointer-events-auto"
        )}
      >
        <motion.div
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden
        />

        <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          ref={panelRef}
          initial={{ x: "100%" }}
          animate={{ x: open ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className="absolute right-0 top-0 h-full w-[88%] max-w-xs bg-bg-elev border-l border-white/10 shadow-2xl p-6 flex flex-col overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-semibold text-lg text-fg">Menu</span>
          </div>

          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_ITEMS.map((item, idx) => {
              const active = isActive(item.id);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={idx === 0 ? firstLinkRef : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    active
                      ? "text-white bg-gradient-to-r from-neon-cyan/15 to-neon-purple/15 border border-neon-cyan/30"
                      : "text-fg-soft hover:text-fg hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex items-center justify-center gap-2 w-full h-12 rounded-lg text-white font-medium bg-brand-gradient bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-glow-soft transition-all duration-500"
          >
            <FileText className="w-4 h-4" />
            Download Resume
          </Link>
        </motion.aside>
      </div>
    </motion.header>
  );
}
