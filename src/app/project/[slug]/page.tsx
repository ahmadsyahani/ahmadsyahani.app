import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/studio/Navigation";
import { notFound } from "next/navigation";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { BackLink, Reveal } from "@/components/studio/Studio";
import { WordReveal } from "@/components/studio/Motion";
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
  return <main id="main-content" className="subpage case-file">
    <nav className="case-file-top" aria-label="Project navigation">
      <BackLink href="/projects">All projects</BackLink>
      <span><FolderOpen size={17} aria-hidden="true" /> {project.category}</span>
    </nav>

    <header className="case-file-heading">
      <div className="case-file-tab"><span>Project notes</span><span>{project.year}</span></div>
      <h1><WordReveal text={project.title} /></h1>
      <p>{project.desc}</p>
      {(realLive || realRepo) && <div className="case-file-actions">
        {realLive && <a href={project.liveUrl} target="_blank" rel="noreferrer">Visit website <ArrowUpRight size={17} aria-hidden="true" /></a>}
        {realRepo && <a href={project.githubUrl} target="_blank" rel="noreferrer">View source <ArrowUpRight size={17} aria-hidden="true" /></a>}
      </div>}
    </header>

    <figure className="case-file-preview">
      <span className="case-file-tape" aria-hidden="true" />
      <Image src={project.image} alt={`${project.title} project preview`} width={1200} height={800} sizes="(max-width: 809px) 92vw, 1000px" preload />
      <figcaption><span>{project.title}</span><span>{project.category} / {project.year}</span></figcaption>
    </figure>

    <div className="case-file-layout">
      <aside className="case-file-sidebar" aria-label="Project information">
        <div className="case-file-note">
          <h2>At a glance</h2>
          <dl><div><dt>My role</dt><dd>{project.role}</dd></div><div><dt>Made for</dt><dd>{project.category}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div></dl>
          <h3>Built with</h3>
          <ul className="case-file-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </div>

      </aside>

      <div className="case-file-story">
        <section className="case-file-overview" id="overview">
          <span className="case-file-kicker">Inside the project</span>
          <h2>The idea behind it.</h2>
          <p>{project.overview}</p>
        </section>
      </div>
    </div>

    <div className="case-process" aria-label="Project process">
      {project.sections.map((section, i) => {
        const paragraphs = section.body.split(/\n\s*\n|(?<=[.!?])\s+(?=[A-Z])/).filter(Boolean);
        return <Reveal key={section.label}><section className="case-process-chapter" id={`process-${i + 1}`} data-tone={i % 3}>
          <header className="case-process-heading"><h2>{section.label}</h2></header>
          <div className="case-process-content">
            {paragraphs.map((paragraph, j) => <p key={j}>{paragraph}</p>)}
          </div>
        </section></Reveal>;
      })}
    </div>

    <Link href={`/projects/${next.id}`} className="case-file-next">
      <div className="case-file-next-image"><Image src={next.image} alt="" fill sizes="(max-width: 600px) 100px, 220px" /></div>
      <div className="case-file-next-copy"><span>Next folder to open</span><h2>{next.title}</h2><p>{next.category}</p></div>
      <span className="case-file-next-arrow"><ArrowUpRight size={28} aria-hidden="true" /></span>
    </Link>
  </main>;
}
