"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    let frame = 0;
    function stop() { cancelAnimationFrame(frame); lenis?.destroy(); lenis = undefined; }
    function configure() {
      stop();
      if (media.matches) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
      function animate(time: number) { lenis?.raf(time); frame = requestAnimationFrame(animate); }
      frame = requestAnimationFrame(animate);
    }
    configure(); media.addEventListener("change", configure);
    return () => { stop(); media.removeEventListener("change", configure); };
  }, []);
  return <>{children}</>;
}
