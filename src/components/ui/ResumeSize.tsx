// src/components/ui/ResumeSize.tsx
"use client";

import { useEffect, useState } from "react";

export default function ResumeSize({ path = "/resume.pdf" }: { path?: string }) {
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // do a HEAD request to get size via content-length
        const res = await fetch(path, { method: "HEAD" });
        const length = res.headers.get("content-length");
        if (!mounted) return;
        if (length) {
          const kb = Math.round((Number(length) / 1024) * 10) / 10;
          setSize(`${kb} KB`);
        } else {
          setSize(null);
        }
      } catch {
        setSize(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [path]);

  if (!size) return <span>—</span>;
  return <span>{size}</span>;
}
