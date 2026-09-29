"use client";

import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ribbonPaths = [
  "M -95 322 C 4 366, 88 313, 116 264 C 140 222, 116 151, 74 154 C 24 158, 29 246, 91 270 C 168 300, 208 260, 214 176 C 225 40, 280 5, 390 -34",
  "M 93 -102 C 131 74, 236 151, 355 147 C 474 143, 526 59, 573 -76",
];

export function AnimatedRibbons({ variant = "hero", immediate = false }: { variant?: "hero" | "projects" | "footer"; immediate?: boolean }) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const mono = variant === "footer";
  const visible = useInView(ref, { once: true, amount: mono ? .16 : .08 });
  const reduce = useReducedMotion();
  const lineRefs = useRef<Array<SVGPathElement | null>>([]);
  useEffect(() => {
    if (variant !== "projects" || reduce) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scene = ref.current;
        if (!scene) return;
        const bounds = scene.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
        const offsets = [1 - Math.min(1, progress / .96), 1 - Math.max(0, Math.min(1, (progress - .07) / .93))];
        lineRefs.current.forEach((path, index) => {
          if (path) path.style.strokeDashoffset = String(offsets[index]);
        });
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduce, variant]);
  const transforms = variant === "projects"
    ? ["translate(30 -240) translate(300 500) rotate(-40) scale(1) translate(-300 -500)", "translate(-60 -150) translate(300 500) rotate(110) scale(0.85) translate(-300 -500)"]
    : ["translate(10 180) translate(300 500) rotate(0) scale(1) translate(-300 -500)", "translate(-110 -150) translate(300 500) rotate(90) scale(0.85) translate(-300 -500)"];
  return <div ref={ref} className={`ribbon-art ribbon-${variant}`} data-drawing={immediate || visible} aria-hidden="true">
    <svg viewBox="0 0 600 1000" preserveAspectRatio="xMidYMid slice" fill="none">
      <defs>
        <linearGradient id={`${id}-warm`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop stopColor={mono ? "#ffffff" : "#f4513b"} stopOpacity={mono ? .1 : 1} />
          <stop offset=".5" stopColor={mono ? "#000000" : "#f5bd3b"} />
          <stop offset="1" stopColor={mono ? "#060606" : "#ffa396"} stopOpacity={mono ? .6 : 1} />
        </linearGradient>
        <linearGradient id={`${id}-green`} x1="3.015%" y1="32.899%" x2="96.985%" y2="67.101%">
          <stop stopColor={mono ? "#ffffff" : "#17cf69"} stopOpacity={mono ? .1 : 1} />
          <stop offset=".5" stopColor={mono ? "#ffffff" : "#17cf69"} stopOpacity={mono ? .1 : 1} />
          <stop offset="1" stopColor={mono ? "#060606" : "#61faa6"} stopOpacity={mono ? .6 : 1} />
        </linearGradient>
      </defs>
      {ribbonPaths.map((path, i) => <motion.path ref={variant === "projects" ? (node) => { lineRefs.current[i] = node; } : undefined} key={i} className="ribbon-stroke" d={path} transform={transforms[i]} stroke={`url(#${id}-${i === 0 ? "warm" : "green"})`} pathLength="1" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />)}
    </svg>
  </div>;
}

export function CharacterReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: .35 });
  let index = 0;
  return <span ref={ref} className={`character-reveal ${className}`} data-visible={visible} aria-label={text}>
    {text.split(" ").map((word, wordIndex) => <span className="reveal-word" aria-hidden="true" key={wordIndex}>{Array.from(word + " ").map((char, charIndex) => <span key={charIndex} style={{ "--char-delay": `${delay + index++ * .012}s` } as CSSProperties}>{char}</span>)}</span>)}
  </span>;
}

export function WordReveal({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return <motion.span aria-label={text} initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: .1 }}>{text.split(" ").map((word, i) => <span className="word-mask" key={i} aria-hidden="true"><motion.span variants={{ hidden: { y: "105%" }, visible: { y: 0 } }} transition={{ duration: reduce ? 0 : .65, delay: reduce ? 0 : i * .06, ease: [.22, 1, .36, 1] }}>{word}&nbsp;</motion.span></span>)}</motion.span>;
}

export function DrawLabel({ children, color = "purple" }: { children: ReactNode; color?: "purple" | "blue" | "green" | "orange" }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: .5 });
  return <div ref={ref} className={`draw-label frame-${color}`} data-visible={visible}><span>{children}<span className="typing-caret" aria-hidden="true">_</span></span><i className="handle top-left" aria-hidden="true" /><i className="handle top-right" aria-hidden="true" /><i className="handle bottom-left" aria-hidden="true" /><i className="handle bottom-right" aria-hidden="true" /></div>;
}
