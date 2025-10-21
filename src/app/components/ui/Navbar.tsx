// src/components/ui/Navbar.tsx
"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="font-semibold text-lg">
          YourName
        </Link>

        <div className="flex items-center gap-4">
          <a href="#projects" className="hidden md:inline-block hover:underline">
            Projects
          </a>
          <a href="#about" className="hidden md:inline-block hover:underline">
            About
          </a>
          <a href="#contact" className="hidden md:inline-block hover:underline">
            Contact
          </a>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
