import type { Metadata } from "next";
import { DrawLabel, WordReveal } from "@/components/studio/Motion";
import ProjectIndex from "@/components/studio/ProjectIndex";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Projects", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  return <main id="main-content" className="subpage project-archive">
    <header className="project-board-heading">
      <DrawLabel color="purple">My work</DrawLabel>
      <h1><WordReveal text="Selected projects." /></h1>
      <p>A selection of websites and apps I have built.</p>
    </header>
    <ProjectIndex projects={projects} />
  </main>;
}
