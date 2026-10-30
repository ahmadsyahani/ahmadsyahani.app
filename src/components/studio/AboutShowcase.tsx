"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Experience } from "@/lib/data";
import { SectionHeading } from "./Studio";

const toolIcons: Record<string, string> = {
  React: "react",
  "Next.js": "nextjs",
  JavaScript: "javascript",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  GSAP: "gsap",
  "Node.js": "nodejs",
  Kotlin: "kotlin",
  "React Native": "react",
  Rust: "rust",
  PHP: "php",
  Go: "go",
  Laravel: "laravel",
  "Express.js": "express",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  Flutter: "flutter",
  Vue: "vue",
  Python: "python",
  TensorFlow: "tensorflow",
  MATLAB: "matlab",
  QGIS: "qgis",
};

// Add new technologies to a category here; their display order follows `skills`.
const toolCategories = [
  { title: "Frontend", skills: ["React", "Next.js", "Vue", "JavaScript", "TypeScript", "Tailwind CSS", "GSAP"] },
  { title: "Backend", skills: ["PHP", "Go", "Laravel", "Rust", "Express.js", "Node.js"] },
  { title: "Mobile", skills: ["Flutter", "Kotlin", "React Native"] },
  { title: "Database", skills: ["PostgreSQL", "MongoDB"] },
];

export default function AboutShowcase({ skills, learningSkills = [], experience }: { skills: string[]; learningSkills?: string[]; experience: Experience[] }) {
  const reducedMotion = useReducedMotion();
  const learningSet = new Set(learningSkills);
  const currentSkills = skills.filter((skill) => !learningSet.has(skill));
  const categorizedSkills = new Set(toolCategories.flatMap((category) => category.skills));
  const categories = [
    ...toolCategories.map((category) => ({
      title: category.title,
      skills: currentSkills.filter((skill) => category.skills.includes(skill)),
    })),
    { title: "Other tools", skills: currentSkills.filter((skill) => !categorizedSkills.has(skill)) },
    { title: "Still learning", skills: [...learningSet] },
  ].filter((category) => category.skills.length > 0);

  return <div className="about-content">
    <section className="skills-section" aria-label="My toolkit">
      <SectionHeading label="My toolkit" title="Tools I build with" color="orange" />
      <div className="tech-categories">
        {categories.map((category) => (
          <motion.section
            className="tech-category"
            aria-label={`${category.title} technologies`}
            key={category.title}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: .2 }}
          >
            <motion.h3
              className="tech-category-title"
              variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: reducedMotion ? 0 : .35, ease: [.22, 1, .36, 1] }}
            >{category.title}</motion.h3>
            <ul className="tech-stack">
              {category.skills.map((skill, index) => (
                <motion.li
                  className="tech-stack-item"
                  key={skill}
                  variants={{
                    hidden: { opacity: 0, y: 10, rotate: index % 2 ? 2 : -2 },
                    visible: { opacity: 1, y: 0, rotate: 0 },
                  }}
                  transition={reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 260, damping: 22, delay: .12 + Math.min(index, 8) * .045 }}
                >
                  {toolIcons[skill] && <Image src={`/tech/${toolIcons[skill]}.svg`} alt="" width={32} height={32} className="tech-stack-icon" />}
                  <span>{skill}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </section>

    <section className="about-experience" aria-label="My experience">
      <SectionHeading label="My experience" title="A journey shaped by great teams." color="green" />
      <div className="journey-timeline">
        {experience.map((item, index) => {
          return <Fragment key={`${item.company}-${item.role}`}>
            <motion.article
              className={`journey-entry journey-entry-${index % 2 === 0 ? "left" : "right"}${index === 0 ? " journey-entry-current" : ""}`}
              initial={reducedMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: .28 }}
              transition={{ type: "spring", stiffness: 95, damping: 15, delay: index * .08 }}
            >
              <div className="journey-card-top"><span>0{index + 1}</span><span>{item.period}</span></div>
              <span className="journey-card-mark" aria-hidden="true">{index === 0 ? "CURRENT" : "CAREER CHECKPOINT"}</span>
              <h3>{item.company}</h3>
              <p className="journey-role">{item.role}</p>
              <p className="journey-description">{item.desc}</p>
              <span className="journey-card-arrow" aria-hidden="true">↗</span>
            </motion.article>
            {index < experience.length - 1 && <JourneyConnector reverse={index % 2 === 1} first={index === 0 ? "#039754" : index % 2 ? "#e9a125" : "#8427de"} second={index % 2 ? "#8427de" : "#e9a125"} reducedMotion={!!reducedMotion} />}
          </Fragment>;
        })}
      </div>
    </section>
  </div>;
}

function JourneyConnector({ reverse, first, second, reducedMotion }: { reverse: boolean; first: string; second: string; reducedMotion: boolean }) {
  const id = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const visible = useInView(svgRef, { once: true, amount: .22 });
  const [size, setSize] = useState({ width: 320, height: 116 });
  // Draw in CSS pixels so curves, stroke widths, and the travelling dot never stretch.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height) setSize({ width, height });
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);
  const { width, height } = size;
  const startX = width <= 24 ? width / 2 : reverse ? width : 0;
  const endX = width <= 24 ? width / 2 : reverse ? 0 : width;
  const d = `M ${startX} 0 C ${startX} ${height * .55} ${endX} ${height * .45} ${endX} ${height}`;

  useEffect(() => {
    const path = lineRef.current;
    const dot = dotRef.current;
    if (!visible || !path || !dot) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    if (reducedMotion) {
      path.style.strokeDashoffset = "0";
      const end = path.getPointAtLength(length);
      dot.setAttribute("cx", String(end.x));
      dot.setAttribute("cy", String(end.y));
      dot.style.opacity = "1";
      return;
    }

    path.style.strokeDashoffset = String(length);
    let frame = 0;
    let start = 0;
    const draw = (time: number) => {
      if (!start) start = time;
      const progress = Math.min(1, (time - start) / 1150);
      const eased = 1 - (1 - progress) ** 3;
      path.style.strokeDashoffset = String(length * (1 - eased));
      const point = path.getPointAtLength(length * eased);
      dot.setAttribute("cx", String(point.x));
      dot.setAttribute("cy", String(point.y));
      dot.style.opacity = progress > .03 ? "1" : "0";
      if (progress < 1) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [visible, reducedMotion, d]);

  return <svg ref={svgRef} className="journey-connector" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
    <defs><linearGradient id={`${id}-stroke`} x1={startX} y1="0" x2={endX} y2={height} gradientUnits="userSpaceOnUse"><stop stopColor={first} /><stop offset="1" stopColor={second} /></linearGradient></defs>
    <path className="journey-connector-track" d={d} />
    <path ref={lineRef} className="journey-connector-trace" d={d} style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }} stroke={`url(#${id}-stroke)`} />
    <circle ref={dotRef} className="journey-connector-dot" cx={startX} cy="0" r="5" fill={`url(#${id}-stroke)`} />
  </svg>;
}
