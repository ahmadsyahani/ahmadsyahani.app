import type { Metadata } from "next";
import { DrawLabel, WordReveal } from "@/components/studio/Motion";
import ProjectFolders from "@/components/studio/ProjectFolders";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Projects", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  return <main id="main-content" className="subpage project-archive">
    <header className="project-board-heading">
      <DrawLabel color="purple">Inside my project folders</DrawLabel>
      <h1><WordReveal text="Small ideas. Open folders. Real projects." /></h1>
      <p>A few things I have been working on. Pick a folder and take a look inside.</p>
    </header>
    <ProjectFolders projects={projects} />
  </main>;
}
