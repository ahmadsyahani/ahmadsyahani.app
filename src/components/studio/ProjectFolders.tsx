"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Folder, FolderOpen } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "./Navigation";
import type { Project } from "@/lib/data";

const folderColors = [
  { paper: "#ece0fa", ink: "#7433a5", edge: "#c6a7de" },
  { paper: "#dcefe3", ink: "#286a48", edge: "#a8ccb6" },
  { paper: "#ffedc5", ink: "#865b19", edge: "#d9bd84" },
  { paper: "#dceafa", ink: "#2f6192", edge: "#aac4df" },
];

export default function ProjectFolders({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const reduce = useReducedMotion();
  const selectedIndex = Math.min(activeIndex, Math.max(0, projects.length - 1));
  if (!projects.length) return <p>New projects are on the way.</p>;
  const color = folderColors[selectedIndex % folderColors.length];
  const theme = { "--folder-paper": color.paper, "--folder-ink": color.ink, "--folder-edge": color.edge } as CSSProperties;

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % projects.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + projects.length) % projects.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = projects.length - 1;
    else return;
    event.preventDefault();
    setActiveIndex(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return <div className="project-folders" style={theme}>
    <div className="folder-instructions"><span>{projects.length} project folders</span><span>Pick a tab to explore</span></div>
    <div className="folder-tabs" role="tablist" aria-label="Project folders">
      {projects.map((project, index) => {
        const active = selectedIndex === index;
        const Icon = active ? FolderOpen : Folder;
        const tabColor = folderColors[index % folderColors.length];
        return <button key={project.id} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab" id={`${id}-tab-${project.id}`} aria-selected={active} aria-controls={`${id}-panel-${project.id}`} tabIndex={active ? 0 : -1} onClick={() => setActiveIndex(index)} onKeyDown={(event) => handleKey(event, index)} style={{ "--tab-paper": tabColor.paper, "--tab-ink": tabColor.ink, "--tab-edge": tabColor.edge } as CSSProperties}>
          <Icon size={20} strokeWidth={1.6} aria-hidden="true" /><span>{project.title}</span>
        </button>;
      })}
    </div>
    <div className="folder-shell">
      {projects.map((project, index) => <section key={project.id} id={`${id}-panel-${project.id}`} role="tabpanel" aria-labelledby={`${id}-tab-${project.id}`} hidden={selectedIndex !== index} tabIndex={0}>
        {selectedIndex === index && <motion.div className="folder-content" key={project.id} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .24, ease: [.22, 1, .36, 1] }}>
          <div className="folder-sheet">
            <div className="folder-sheet-caption"><span>Project {project.num}</span><span>{project.year}</span></div>
            <Link href={`/projects/${project.id}`} className="folder-preview" aria-label={`View ${project.title} case study`}><Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 700px) 86vw, (max-width: 1100px) 54vw, 560px" /><span className="folder-preview-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span></Link>
            <span className="folder-photo-caption">A glimpse of the project</span>
          </div>
          <div className="folder-details">
            <span className="folder-category">{project.category}</span>
            <h2>{project.title}</h2>
            <p>{project.desc}</p>
            <dl className="folder-role"><dt>My role</dt><dd>{project.role}</dd></dl>
            <ul className="folder-tech" aria-label="Technologies used">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <Link href={`/projects/${project.id}`} className="folder-case-link">Open case study <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </motion.div>}
      </section>)}
    </div>
  </div>;
}
