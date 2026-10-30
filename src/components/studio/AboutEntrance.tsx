"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePageTransitionReady } from "./Navigation";

/** Start once the navigation wipe has fully cleared; do not replay on exit. */
export default function AboutEntrance({ children }: { children: ReactNode }) {
  const ready = usePageTransitionReady();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!ready || started) return;
    const frame = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(frame);
  }, [ready, started]);
  return <div className="about-sequence" data-started={started}>{children}</div>;
}
