"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Defers mounting of `children` until the placeholder is near the viewport.
 * Use to keep below-the-fold sections (and their Framer Motion overhead)
 * out of the initial hydration path.
 *
 * `rootMargin` controls how early we wake up. Default starts mounting
 * 600px before the section scrolls in — feels instant on phones.
 */
export default function LazyView({
  children,
  rootMargin = "600px 0px",
  minHeight = 600,
  className = "",
  id,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;

    // Old Safari / very limited environments: just mount.
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);

    // Also wake up on idle as a safety net (e.g. when user pastes a hash anchor).
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const w = window as IdleWindow;
    const idleHandle = w.requestIdleCallback
      ? w.requestIdleCallback(() => setShow(true))
      : window.setTimeout(() => setShow(true), 2500);

    return () => {
      io.disconnect();
      if (w.cancelIdleCallback) w.cancelIdleCallback(idleHandle);
      else clearTimeout(idleHandle);
    };
  }, [rootMargin, show]);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={!show ? { minHeight, contain: "layout paint" } : undefined}
    >
      {show ? children : null}
    </div>
  );
}
