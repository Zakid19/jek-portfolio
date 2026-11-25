"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
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
] as const;

/**
 * Keep this order aligned with the actual DOM order.
 *
 * Experience (#work) is currently nested inside About.
 * It is intentionally treated as a separate navigation target.
 */
const SECTION_IDS = ["about", "work", "projects", "skills", "contact"] as const;

// const NAVBAR_OFFSET = 88;
// const ACTIVATION_OFFSET = 110;

const NAVBAR_OFFSET = 24;
const ACTIVATION_OFFSET = 122;

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

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

  // Scrollspy synchronization.
  const programmaticScrollRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollspySyncRef = useRef<(() => void) | null>(null);

  const previousBodyOverflow = useRef("");

  /**
   * Clear pending programmatic-scroll fallback.
   */
  const clearScrollEndTimer = () => {
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = null;
    }
  };

  /**
   * Reset mobile menu and navigation state after route changes.
   */
  useEffect(() => {
    setOpen(false);
    setActiveSection(null);
    setHidden(false);
  }, [pathname]);

  /**
   * Navbar background when page is scrolled.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Hide navbar while scrolling down on smaller screens.
   */
  useEffect(() => {
    if (reduce) return;

    const threshold = 40;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const current = window.scrollY;
        const previous = lastScrollY.current;
        const isMobile = window.innerWidth < 1024;

        if (isMobile) {
          if (current - previous > threshold && current > 120) {
            setHidden(true);
          } else if (previous - current > 20) {
            setHidden(false);
          }
        } else {
          setHidden(false);
        }

        lastScrollY.current = current;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ticking.current = false;
    };
  }, [reduce]);

  /**
   * Mobile menu focus management, keyboard navigation and scroll lock.
   */
  useEffect(() => {
    if (!open) return;

    previousBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusableElements = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => {
        return (
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true" &&
          element.offsetParent !== null
        );
      });

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousBodyOverflow.current;

      toggleRef.current?.focus();
    };
  }, [open]);

  /**
   * Scrollspy.
   *
   * Manual scrolling:
   * - Determine active section from actual viewport positions.
   *
   * Programmatic navigation:
   * - Temporarily pause automatic section detection.
   * - Resume after scrolling finishes.
   */
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    let frameId = 0;

    const updateActiveSection = () => {
      if (programmaticScrollRef.current) return;

      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        const documentHeight = document.documentElement.scrollHeight;

        const viewportHeight = window.innerHeight;

        const maxScroll = Math.max(0, documentHeight - viewportHeight);

        // Home is active near the top of the page.
        if (scrollY < 100) {
          setActiveSection(null);
          return;
        }

        // Contact is active when reaching the bottom.
        if (maxScroll > 0 && scrollY >= maxScroll - 24) {
          setActiveSection("contact");
          return;
        }

        let currentSection: string | null = null;

        for (const id of SECTION_IDS) {
          const element = document.getElementById(id);

          if (!element) continue;

          const marker =
            id === "work"
              ? element.querySelector("h3")
              : element.querySelector("header");

          const targetElement = marker ?? element;
          const rect = targetElement.getBoundingClientRect();

          if (rect.top <= ACTIVATION_OFFSET) {
            currentSection = id;
          } else {
            break;
          }
        }

        setActiveSection((previous) => {
          return previous === currentSection ? previous : currentSection;
        });
      });
    };

    /**
     * Resume Scrollspy after programmatic scrolling.
     */
    const finishProgrammaticScroll = () => {
      if (!programmaticScrollRef.current) return;

      clearScrollEndTimer();

      programmaticScrollRef.current = false;

      updateActiveSection();
    };

    /**
     * Scroll event.
     */
    const handleScroll = () => {
      updateActiveSection();
    };

    /**
     * Detect sections that may be inserted after dynamic imports.
     */
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            updateActiveSection();
          })
        : null;

    resizeObserver?.observe(document.documentElement);

    // Initial synchronization.
    updateActiveSection();

    // Recalculate when the browser finishes loading resources.
    window.addEventListener("load", updateActiveSection);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    // Modern browser scroll completion event.
    window.addEventListener("scrollend", finishProgrammaticScroll);

    // Expose synchronization to navigation click handler.
    scrollspySyncRef.current = updateActiveSection;

    return () => {
      cancelAnimationFrame(frameId);

      clearScrollEndTimer();

      resizeObserver?.disconnect();

      window.removeEventListener("load", updateActiveSection);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSection);

      window.removeEventListener("scrollend", finishProgrammaticScroll);

      scrollspySyncRef.current = null;
    };
  }, [pathname]);

  /**
   * Active navigation state.
   */
  const isActive = (id: string) => {
    if (pathname !== "/") return false;

    if (id === "home") {
      return activeSection === null;
    }

    return activeSection === id;
  };

  /**
   * Close mobile navigation.
   */
  const closeMenu = () => {
    setOpen(false);
  };

  /**
   * Navigate to a homepage section.
   *
   * The target indicator changes immediately.
   * Scrollspy pauses while smooth scrolling is in progress.
   * Once scrolling finishes, actual section position is checked again.
   */
  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (pathname !== "/") {
      closeMenu();
      return;
    }

    const target = id === "home" ? null : document.getElementById(id);

    if (id !== "home" && !target) {
      closeMenu();
      return;
    }

    event.preventDefault();

    closeMenu();
    clearScrollEndTimer();

    programmaticScrollRef.current = true;

    setActiveSection(id === "home" ? null : id);

    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: reduce ? "instant" : "smooth",
      });
    } else {
      target!.scrollIntoView({
        behavior: reduce ? "instant" : "smooth",
        block: "start",
      });
    }

    if (reduce) {
      programmaticScrollRef.current = false;

      requestAnimationFrame(() => {
        scrollspySyncRef.current?.();
      });

      return;
    }

    scrollEndTimerRef.current = setTimeout(() => {
      programmaticScrollRef.current = false;
      scrollspySyncRef.current?.();
    }, 5000);
  };

  return (
    <>
      {/* =========================================================
          MAIN NAVBAR
      ========================================================= */}

      <motion.header
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{
          y: hidden ? "-110%" : 0,
          opacity: 1,
        }}
        transition={{
          duration: reduce ? 0 : 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          "fixed top-0 inset-x-0 z-50",
          "transition-colors duration-300",
          scrolled
            ? "bg-bg border-b border-border"
            : "bg-bg border-b border-transparent",
        )}
        aria-label="Primary navigation"
      >
        <div className="container flex items-center justify-between gap-3 py-3">
          {/* Brand */}

          <Link
            href="/"
            onClick={(event) => handleNavigation(event, "home")}
            className="flex items-center gap-3 group"
            aria-label="Zaki Deza — home"
          >
            <div className="relative flex h-9 w-9 items-center justify-center border border-border font-mono font-bold text-neon-green transition-colors duration-200 group-hover:border-neon-green">
              <span className="relative z-10">Z</span>
            </div>

            <span className="font-semibold text-lg tracking-tight text-fg">
              Zaki<span className="text-neon-green">.</span>Deza
            </span>
          </Link>

          {/* Desktop navigation */}

          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.id);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(event) => handleNavigation(event, item.id)}
                  className={cn(
                    "relative px-3.5 py-2 rounded-md text-sm transition-colors",
                    active ? "text-neon-green" : "text-fg-soft hover:text-fg",
                  )}
                  aria-current={active ? "location" : undefined}
                >
                  <span className="relative inline-block">
                    {item.label}

                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 -bottom-2 h-[2px] bg-neon-green"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex h-10 items-center gap-2 border border-border px-4 text-sm font-medium text-fg transition-colors duration-200 hover:border-neon-green hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FileText className="w-4 h-4" />
              Resume
            </Link>

            <ThemeToggle />
          </div>

          {/* Mobile actions */}

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button
              ref={toggleRef}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((current) => !current)}
              className="relative z-50 flex h-10 w-10 items-center justify-center border border-border bg-bg text-fg transition-colors duration-200 hover:border-neon-green hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={reduce ? false : { opacity: 0, rotate: -90 }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={reduce ? undefined : { opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {open ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================= */}

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "md:hidden fixed inset-0 z-40 pointer-events-none",
          open && "pointer-events-auto",
        )}
      >
        {/* Backdrop */}

        <motion.div
          onClick={closeMenu}
          initial={false}
          animate={{
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/60"
          aria-hidden="true"
        />

        {/* Drawer */}

        <motion.aside
          role="dialog"
          aria-modal={open ? "true" : undefined}
          aria-label="Mobile navigation"
          ref={panelRef}
          initial={false}
          animate={{
            x: open ? "0%" : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 28,
          }}
          className="absolute right-0 top-0 flex h-full w-[88%] max-w-xs flex-col overflow-y-auto border-l border-border bg-bg p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-semibold text-lg text-fg">
              Menu<span className="text-neon-green">.</span>
            </span>
          </div>

          {/* Mobile links */}

          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item, index) => {
              const active = isActive(item.id);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  onClick={(event) => handleNavigation(event, item.id)}
                  className={cn(
                    "px-4 py-3 text-base font-medium border transition-colors duration-200",
                    active
                      ? "text-neon-green bg-fg/5 border-neon-green/40"
                      : "text-fg-soft border-transparent hover:text-fg hover:bg-fg/5",
                  )}
                  aria-current={active ? "location" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Resume action */}

          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 border border-border text-sm font-medium text-fg transition-colors duration-200 hover:border-neon-green hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FileText className="w-4 h-4" />
            Download Resume
          </Link>
        </motion.aside>
      </div>
    </>
  );
}
