import { ProjectList } from "@/components/studio/Studio";
import { WordReveal } from "@/components/studio/Motion";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return <main id="main-content" className="subpage project-archive"><header className="archive-heading"><h1><WordReveal text="Projects worth exploring" /></h1></header><ProjectList items={projects} /></main>;
}
