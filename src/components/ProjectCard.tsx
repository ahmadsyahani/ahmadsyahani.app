"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function ProjectCard({
  project,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/project/${project.id}`}
        className={`group grid grid-cols-[32px_1fr_auto_20px] items-center gap-5 border-b border-stone-200 py-7 transition-all duration-300 ${
          index === 0 ? "border-t" : ""
        } ${isHovered ? "border-b-stone-400" : ""}`}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        {/* Number */}
        <span className="text-[12px] font-medium tabular-nums tracking-[0.02em] text-stone-400">
          {project.num}
        </span>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <h3 className="text-[17px] font-medium tracking-[-0.02em] text-stone-900 transition-colors duration-200 group-hover:text-stone-600">
            {project.title}
          </h3>
          <p className="text-[13px] leading-snug tracking-[-0.01em] text-stone-400">
            {project.desc}
          </p>
        </div>

        {/* Category */}
        <span className="hidden whitespace-nowrap text-[12px] tracking-[-0.01em] text-stone-400 sm:block">
          {project.category} · {project.year}
        </span>

        {/* Arrow */}
        <span className="text-[16px] text-stone-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-stone-900">
          →
        </span>
      </Link>
    </motion.div>
  );
}
