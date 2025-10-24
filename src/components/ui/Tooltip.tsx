import { ReactNode, useState } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-[125%] left-1/2 -translate-x-1/2
                     text-xs text-white bg-black/60 backdrop-blur-sm
                     px-2 py-1 rounded-md whitespace-nowrap
                     border border-white/20 shadow-lg z-20"
        >
          {text}
        </span>
      )}
    </span>
  );
}
