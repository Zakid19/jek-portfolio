// src/components/ui/Button.tsx
import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as <a> when an href is provided. */
  as?: "button" | "a";
  href?: string;
};

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed select-none";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "text-white bg-brand-gradient bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-glow-soft hover:shadow-glow",
  accent:
    "text-white bg-gradient-to-br from-neon-green to-neon-cyan shadow-glow-green hover:shadow-glow",
  outline:
    "text-fg border border-white/15 bg-bg-elev/60 backdrop-blur-md hover:border-neon-cyan/60 hover:text-neon-cyan",
  ghost: "text-fg-soft hover:text-fg hover:bg-white/5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  as = "button",
  href,
  ...props
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (as === "a" && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
