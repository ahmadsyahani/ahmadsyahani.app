"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import GlassFolder from "@/components/ui/glass-folder-cards";
import Link from "./Navigation";
import type { Project } from "@/lib/data";

function ProjectFolderCard({ project, index }: { project: Project; index: number }) {
  const category = project.category === "Mobile Application" ? "mobile" : project.category.includes("Portfolio") ? "portfolio" : "web";
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(260);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(180, Math.min(300, entry.contentRect.width - 32)));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <article className="project-glass-card" data-category={category}>
    <div className="project-glass-stage" ref={container}>
      <GlassFolder label={project.title} meta={`${project.category} / ${project.year}`} art="none"
        showLabel={false}
        sticker={project.category === "Web Application" ? "Web app" : project.category === "Mobile Application" ? "Mobile app" : project.category.includes("Portfolio") ? "Portfolio" : project.category}
        peekPapers
        width={width} action="none" appearDelay={350 + index * 100}
        files={[
          { name: "Project details", meta: project.role, href: `/projects/${project.id}` },
          { name: project.title, meta: "Explore project", image: project.image, href: `/projects/${project.id}` },
        ]} />
    </div>
    <div className="project-glass-info">
      <Link className="project-glass-title" href={`/projects/${project.id}`}><h2>{project.title}</h2><ArrowUpRight size={23} aria-hidden="true" /></Link>
      <p>{project.desc}</p>
      <ul aria-label="Main technologies">{project.tags.slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</ul>
    </div>
  </article>;
}

export default function ProjectIndex({ projects }: { projects: Project[] }) {
  return <section aria-label="Project collection">
    <p className="project-glass-hint">Open a folder to take a closer look.</p>
    <div className="project-glass-grid">{projects.map((project, index) => <ProjectFolderCard project={project} index={index} key={project.id} />)}</div>
  </section>;
}
