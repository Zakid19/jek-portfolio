import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type NativeButtonProps = SharedProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    as?: "button";
    href?: never;
  };

type AnchorButtonProps = SharedProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof SharedProps | "href"
  > & {
    as: "a";
    href: string;
  };

type NextLinkButtonProps = SharedProps &
  Omit<React.ComponentProps<typeof Link>, keyof SharedProps | "href"> & {
    as: "link";
    href: string;
  };

export type ButtonProps =
  | NativeButtonProps
  | AnchorButtonProps
  | NextLinkButtonProps;

/* ================================================================
   BASE STYLES
================================================================ */

const base =
  "relative inline-flex items-center justify-center gap-2 " +
  "rounded-lg font-medium select-none " +
  "transition-colors duration-200 ease-smooth " +
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-ring/70 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-bg " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-40 " +
  "active:scale-[0.98]";

/* ================================================================
   SIZES
================================================================ */

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

/* ================================================================
   VARIANTS
================================================================ */

const variants: Record<ButtonVariant, string> = {
  // Primary: restrained accent border and subtle accent surface.
  primary:
    "border border-neon-green/60 " +
    "bg-neon-green/[0.04] " +
    "text-fg " +
    "hover:border-neon-green " +
    "hover:bg-neon-green/10 " +
    "dark:text-neon-green " +
    "active:bg-neon-green/15",

  // Accent: stronger accent surface for higher-priority actions.
  accent:
    "border border-neon-green " +
    "bg-neon-green/10 " +
    "text-fg " +
    "hover:bg-neon-green/15 " +
    "dark:text-neon-green " +
    "active:bg-neon-green/20",

  // Outline: neutral secondary action.
  outline:
    "border border-border-strong/80 " +
    "bg-transparent " +
    "text-fg-soft " +
    "hover:border-neon-green/70 " +
    "hover:bg-neon-green/[0.04] " +
    "hover:text-fg " +
    "dark:hover:text-neon-green " +
    "active:bg-neon-green/10",

  // Ghost: minimal borderless action.
  ghost:
    "border border-transparent " +
    "bg-transparent " +
    "text-fg-soft " +
    "hover:bg-fg/[0.04] " +
    "hover:text-fg " +
    "dark:hover:bg-neon-green/[0.05] " +
    "dark:hover:text-neon-green " +
    "active:bg-fg/[0.08]",
};

/* ================================================================
   CLASS GENERATOR
================================================================ */

function getClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(base, sizes[size], variants[variant], className);
}

/* ================================================================
   BUTTON COMPONENT
================================================================ */

export default function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;

  const classes = getClasses(variant, size, className);

  if (props.as === "link") {
    const {
      as,
      href,
      variant: _variant,
      size: _size,
      className: _className,
      children: _children,
      ...linkProps
    } = props;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  if (props.as === "a") {
    const {
      as,
      href,
      variant: _variant,
      size: _size,
      className: _className,
      children: _children,
      ...anchorProps
    } = props;

    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const {
    as,
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...buttonProps
  } = props;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
