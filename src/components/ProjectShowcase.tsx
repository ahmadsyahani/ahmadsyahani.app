"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";

export default function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative mx-auto w-full max-w-[1200px] px-6 py-24 md:px-10"
      id="projects"
    >
      <p className="mb-12 text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-400">
        Selected Projects
      </p>

      {/* Floating Image Container */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-50 hidden overflow-hidden rounded-xl shadow-2xl md:block"
        style={{
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative h-[240px] w-[360px] overflow-hidden rounded-xl bg-stone-200">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-stone-300" />
              )}
            </div>
          ))}
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
        </div>
      </div>

      <div className="space-y-0 w-full">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative border-t border-stone-200 py-6 transition-all duration-300 ease-out md:py-8">
              {/* Background highlight on hover */}
              <div
                className={`
                  absolute inset-0 -mx-4 rounded-lg bg-stone-100 px-4
                  transition-all duration-300 ease-out md:-mx-8 md:px-8
                  ${hoveredIndex === index ? "scale-100 opacity-100" : "scale-95 opacity-0"}
                `}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  {/* Title with animated underline */}
                  <div className="inline-flex items-center gap-3">
                    <h3 className="text-[24px] font-medium tracking-tight text-stone-900 md:text-[32px]">
                      <span className="relative">
                        {project.title}
                        {/* Animated underline */}
                        <span
                          className={`
                            absolute -bottom-0.5 left-0 h-[2px] bg-stone-900
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                        />
                      </span>
                    </h3>

                    {/* Arrow that slides in */}
                    <ArrowUpRight
                      className={`
                        h-6 w-6 text-stone-400
                        transition-all duration-300 ease-out
                        ${
                          hoveredIndex === index
                            ? "translate-x-0 translate-y-0 opacity-100"
                            : "-translate-x-2 translate-y-2 opacity-0"
                        }
                      `}
                    />
                  </div>

                  {/* Description with fade effect */}
                  <p
                    className={`
                      mt-2 text-[15px] leading-relaxed text-stone-500
                      transition-all duration-300 ease-out md:text-[16px]
                      ${hoveredIndex === index ? "text-stone-600" : "text-stone-400"}
                    `}
                  >
                    {project.desc}
                  </p>
                </div>

                {/* Year badge */}
                <span
                  className={`
                    mt-2 text-[14px] tabular-nums tracking-[-0.01em] text-stone-400
                    transition-all duration-300 ease-out md:mt-3 md:text-[15px]
                    ${hoveredIndex === index ? "text-stone-900" : ""}
                  `}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* Bottom border for last item */}
        <div className="border-t border-stone-200" />
      </div>
    </section>
  );
}
