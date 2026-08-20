"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative mx-auto flex min-h-[90vh] w-full max-w-[1200px] flex-col justify-center overflow-hidden px-6 pt-24 md:px-10"
    >
      {/* ── Interactive Glowing Grid Background ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 162, 158, 0.1), transparent 40%)`,
          }}
        />
      </div>

      <div className="relative z-10 grid items-center gap-16 md:grid-cols-2 md:gap-8 lg:gap-24">
        {/* ── Left Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Role badge */}
          <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.06em] text-stone-400">
            {personalInfo.role}
          </p>

          {/* Title */}
          <h1 className="max-w-[680px] text-[clamp(40px,5vw,64px)] font-semibold leading-[1.08] tracking-[-0.04em] text-stone-900">
            {personalInfo.tagline}
          </h1>

          {/* Body */}
          <p className="mt-6 max-w-[480px] text-[18px] leading-relaxed tracking-[-0.01em] text-stone-500">
            {personalInfo.bio.split(".")[0]}.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-stone-900 bg-stone-900 px-6 py-3 text-[14px] font-medium tracking-[-0.01em] text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(28,25,23,0.3)]"
            >
              <span className="absolute inset-0 translate-y-full bg-stone-700 transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center gap-2">
                Get in touch
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </a>
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-[14px] font-medium tracking-[-0.01em] text-stone-600 transition-all duration-300 hover:border-stone-400 hover:bg-stone-50 hover:text-stone-900"
            >
              Download CV
              <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </motion.div>

        {/* ── Right Abstract Visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden aspect-square items-center justify-center md:flex"
        >
          {/* Main interactive container */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
            className="group relative h-[320px] w-[320px] cursor-pointer"
          >
            {/* Background glowing aura */}
            <div className="absolute inset-0 rounded-full bg-stone-300/20 blur-[60px] transition-all duration-500 group-hover:bg-stone-300/40 group-hover:blur-[80px]" />

            {/* Main glass card */}
            <div className="absolute inset-4 rounded-[40px] border border-stone-200/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:border-stone-300/80 group-hover:bg-white/60 group-hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] overflow-hidden flex items-center justify-center">
              
              {/* Inner geometric shapes */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center opacity-60"
              >
                <div className="h-[220px] w-[220px] rounded-full border border-stone-300 border-dashed transition-all duration-500 group-hover:scale-105" />
                <div className="absolute h-[160px] w-[160px] rounded-full border border-stone-200 transition-all duration-500 group-hover:scale-95" />
              </motion.div>

              {/* Central focal point */}
              <div className="relative z-10 h-24 w-24 rounded-full bg-gradient-to-br from-stone-800 to-stone-600 shadow-[0_10px_30px_rgba(41,37,36,0.2)] transition-transform duration-500 group-hover:scale-110" />
              
              {/* Decorative accent elements */}
              <div className="absolute -top-4 -right-4 h-28 w-28 rounded-full bg-stone-200/40 backdrop-blur-md border border-stone-100/50 transition-transform duration-700 ease-out group-hover:-translate-x-6 group-hover:translate-y-6" />
              <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-[24px] rotate-12 bg-gradient-to-br from-white/60 to-transparent backdrop-blur-md border border-stone-100/50 transition-transform duration-700 ease-out group-hover:translate-x-8 group-hover:-translate-y-8" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
