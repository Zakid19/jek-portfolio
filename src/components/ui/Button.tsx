// src/components/ui/Button.tsx
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "accent";
};

export default function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const base = "inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-shadow focus-visible:ring-2";
  const styles =
    variant === "primary"
      ? "bg-secondary-purple text-white hover:opacity-95"
      : variant === "accent"
      ? "bg-gradient-to-bl from-secondary-green to-secondary-purple text-white hover:opacity-95"
      : "bg-transparent text-current";

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
}
