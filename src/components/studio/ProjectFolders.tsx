"use client";

import { useId, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Folder, FolderOpen } from "lucide-react";
import { AnimatePresence, motion, useIsPresent, usePresenceData, useReducedMotion } from "framer-motion";
import Link from "./Navigation";
import type { Project } from "@/lib/data";

const folderColors = [
  { paper: "#ece0fa", ink: "#7433a5", edge: "#c6a7de" },
  { paper: "#dcefe3", ink: "#286a48", edge: "#a8ccb6" },
  { paper: "#ffedc5", ink: "#865b19", edge: "#d9bd84" },
  { paper: "#dceafa", ink: "#2f6192", edge: "#aac4df" },
];

export default function ProjectFolders({ projects }: { projects: Project[] }) {
  const [{ index: activeIndex, direction }, setSelection] = useState({ index: 0, direction: 1 });
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const reduce = useReducedMotion();
  const compact = useSyncExternalStore(subscribeCompact, getCompact, () => false);
  const selectedIndex = Math.min(activeIndex, Math.max(0, projects.length - 1));
  if (!projects.length) return <p>New projects are on the way.</p>;
  const color = folderColors[selectedIndex % folderColors.length];
  const theme = { "--folder-paper": color.paper, "--folder-ink": color.ink, "--folder-edge": color.edge } as CSSProperties;

  function selectFolder(index: number) {
    if (index === selectedIndex) return;
    setSelection({ index, direction: index > selectedIndex ? 1 : -1 });
  }

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % projects.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + projects.length) % projects.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = projects.length - 1;
    else return;
    event.preventDefault();
    selectFolder(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return <div className="project-folders" style={theme}>
    <div className="folder-instructions"><span>{projects.length} project folders</span><span>Pick a tab to explore</span></div>
    <div className="folder-tabs" role="tablist" aria-label="Project folders">
      {projects.map((project, index) => {
        const active = selectedIndex === index;
        const Icon = active ? FolderOpen : Folder;
        const tabColor = folderColors[index % folderColors.length];
        return <motion.button whileTap={reduce ? undefined : { y: 3, scale: .985 }} transition={{ duration: .12 }} key={project.id} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab" id={`${id}-tab-${project.id}`} aria-selected={active} aria-controls={`${id}-panel`} tabIndex={active ? 0 : -1} onClick={() => selectFolder(index)} onKeyDown={(event) => handleKey(event, index)} style={{ "--tab-paper": tabColor.paper, "--tab-ink": tabColor.ink, "--tab-edge": tabColor.edge } as CSSProperties}>
          <Icon size={20} strokeWidth={1.6} aria-hidden="true" /><span>{project.title}</span>
        </motion.button>;
      })}
    </div>
    <div className="folder-shell">
      <div className="folder-motion-viewport">
        <AnimatePresence initial={false} mode="wait" custom={{ direction, compact, reduce: !!reduce }}>
          <FolderPanel key={projects[selectedIndex].id} project={projects[selectedIndex]} id={id} direction={direction} compact={compact} reduce={!!reduce} />
        </AnimatePresence>
      </div>
      <span className="folder-lip" aria-hidden="true" />
    </div>
  </div>;
}

function subscribeCompact(callback: () => void) {
  const media = window.matchMedia("(max-width: 700px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function getCompact() { return window.matchMedia("(max-width: 700px)").matches; }

type FolderMotion = { direction: number; compact: boolean; reduce: boolean };

const sheetMotion = {
  tucked: ({ direction, compact, reduce }: FolderMotion) => ({ opacity: reduce ? 1 : 0, x: reduce ? 0 : direction * (compact ? 14 : 32), y: reduce ? 0 : compact ? 24 : 56, rotate: reduce ? -1 : direction * 5, scale: reduce ? 1 : .96 }),
  open: ({ reduce }: FolderMotion) => ({ opacity: 1, x: 0, y: 0, rotate: -1.5, scale: 1, transition: reduce ? { duration: 0 } : { type: "spring" as const, duration: .34, bounce: .16 } }),
  filed: ({ direction, compact, reduce }: FolderMotion) => ({ opacity: 0, x: reduce ? 0 : -direction * (compact ? 10 : 24), y: reduce ? 0 : compact ? 32 : 80, rotate: reduce ? -1.5 : -direction * 4, scale: reduce ? 1 : .95, transition: { duration: reduce ? 0 : .16, ease: "easeIn" as const } }),
};
const noteMotion = {
  tucked: ({ direction, compact, reduce }: FolderMotion) => ({ opacity: reduce ? 1 : 0, x: reduce ? 0 : direction * (compact ? 8 : 20), y: reduce ? 0 : compact ? 12 : 28, rotate: reduce ? 0 : direction * 1.5 }),
  open: ({ reduce }: FolderMotion) => ({ opacity: 1, x: 0, y: 0, rotate: 0, transition: { duration: reduce ? 0 : .28, delay: reduce ? 0 : .05, ease: [.22, 1, .36, 1] as const } }),
  filed: ({ direction, reduce }: FolderMotion) => ({ opacity: 0, x: reduce ? 0 : -direction * 10, y: reduce ? 0 : 18, rotate: 0, transition: { duration: reduce ? 0 : .12 } }),
};

function FolderPanel({ project, id, direction, compact, reduce }: { project: Project; id: string } & FolderMotion) {
  const present = useIsPresent();
  // Exiting panels need the latest selection direction, not their old entry direction.
  const presenceData = usePresenceData() as FolderMotion | undefined;
  const custom = presenceData ?? { direction, compact, reduce };
  return <motion.section id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${project.id}`} tabIndex={present ? 0 : -1} inert={!present} aria-hidden={!present} initial="tucked" animate="open" exit="filed" custom={custom}>
    <div className="folder-content">
      <motion.div className="folder-sheet" variants={sheetMotion} custom={custom}>
        <div className="folder-sheet-caption"><span>Project {project.num}</span><span>{project.year}</span></div>
        <Link href={`/projects/${project.id}`} className="folder-preview" aria-label={`View ${project.title} case study`}><Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 700px) 86vw, (max-width: 1100px) 54vw, 560px" /><span className="folder-preview-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span></Link>
        <span className="folder-photo-caption">A glimpse of the project</span>
      </motion.div>
      <motion.div className="folder-details" variants={noteMotion} custom={custom}>
        <span className="folder-category">{project.category}</span>
        <h2>{project.title}</h2>
        <p>{project.desc}</p>
        <dl className="folder-role"><dt>My role</dt><dd>{project.role}</dd></dl>
        <ul className="folder-tech" aria-label="Technologies used">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <Link href={`/projects/${project.id}`} className="folder-case-link">Open case study <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </motion.div>
    </div>
  </motion.section>;
}
