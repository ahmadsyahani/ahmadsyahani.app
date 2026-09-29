import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/studio/Navigation";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BackLink, Reveal } from "@/components/studio/Studio";
import { CharacterReveal, WordReveal } from "@/components/studio/Motion";
import { projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(p => ({ slug: p.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.id === slug);
  return { title: project?.title ?? "Project not found", description: project?.desc, alternates: { canonical: `/projects/${slug}` } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex(p => p.id === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const realLive = project.liveUrl && !project.liveUrl.includes("example.com");
  const realRepo = project.githubUrl && project.githubUrl !== "https://github.com";
  return <main id="main-content" className="subpage case-study">
    <BackLink href="/projects">Go back</BackLink>
    <header className="case-intro"><h1><WordReveal text={project.title} /></h1><p><CharacterReveal text={project.desc} /></p></header>
    <Reveal className="case-hero"><Image src={project.image} alt={project.title} width={1200} height={800} sizes="(max-width: 809px) 92vw, 750px" preload /></Reveal>
    <div className="case-facts"><div><span>Role</span><p>{project.role}</p></div><div><span>Category</span><p>{project.category}</p></div><div><span>Year</span><p>{project.year}</p></div></div>
    <div className="case-body"><section><span className="small-label">The overview</span><h2>About the project</h2><p>{project.overview}</p><div className="case-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{(realLive || realRepo) && <div className="case-links">{realLive && <a className="outlined-button" href={project.liveUrl} target="_blank" rel="noreferrer"><span className="button-fill" aria-hidden="true"><i /><i /><i /></span><span className="button-label">Visit website <ArrowUpRight size={16} /></span></a>}{realRepo && <a className="outlined-button" href={project.githubUrl} target="_blank" rel="noreferrer"><span className="button-fill" aria-hidden="true"><i /><i /><i /></span><span className="button-label">View source <ArrowUpRight size={16} /></span></a>}</div>}</section>{project.sections.map((section, i) => <Reveal key={section.label}><section className="case-section"><span className="case-step">0{i + 1}</span><div><h2>{section.label}</h2><p>{section.body}</p></div></section></Reveal>)}</div>
    <Link href={`/projects/${next.id}`} className="next-project"><div><span className="small-label">Next project</span><h2>{next.title}</h2></div><ArrowRight size={32} /></Link>
  </main>;
}
