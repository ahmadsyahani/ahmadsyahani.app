import { notFound, redirect } from "next/navigation";
import { BackLink, Frame, PageIntro } from "@/components/studio/Studio";
import { projects } from "@/lib/data";

const legacyProjects: Record<string, { title: string; category: string; description: string }> = {
  pensmate: { title: "PensMate", category: "Web Community", description: "A growing online community platform designed to help users discover conversations, resources, and common interests with a clean and engaging experience." },
  "dapur-ai": { title: "Dapur AI", category: "AI Recipe Generator", description: "An AI-powered recipe assistant that transforms ingredients and preferences into useful cooking suggestions with a user-friendly interface." },
  "scm-project": { title: "SCM App", category: "Supply Chain", description: "A supply chain management application built to streamline operational coordination, inventory oversight, and process efficiency." },
};

export default async function LegacyProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (projects.some(p => p.id === slug)) redirect(`/project/${slug}`);
  const project = legacyProjects[slug];
  if (!project) notFound();
  return <main id="main-content" className="subpage legacy-project"><BackLink href="/projects">Back to projects</BackLink><PageIntro label={project.category} title={project.title} description={project.description} /><Frame color="green" className="legacy-overview"><h2>Overview</h2><p>{project.description}</p></Frame></main>;
}
