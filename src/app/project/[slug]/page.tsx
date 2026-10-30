import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/studio/Navigation";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, ArrowRight, FolderOpen, Check } from "lucide-react";
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
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const realLive = project.liveUrl && !project.liveUrl.includes("example.com");
  const realRepo = project.githubUrl && project.githubUrl !== "https://github.com";
  return <main id="main-content" className="subpage case-file">
    <nav className="case-file-top" aria-label="Project navigation">
      <BackLink href="/projects">All projects</BackLink>
      <span><FolderOpen size={17} aria-hidden="true" /> {project.category}</span>
    </nav>

    <header className="case-file-heading">
      <div className="case-header-title"><div className="case-file-tab"><span>Project notes</span><span>{project.year}</span></div><h1><WordReveal text={project.title} /></h1></div>
      <div className="case-header-summary"><p>{project.desc}</p><span>{project.role}</span></div>
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
          <dl><div><dt>My role</dt><dd>{project.role}</dd></div><div><dt>Project type</dt><dd>{project.category}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div></dl>
          <h3>Built with</h3>
          <ul className="case-file-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </div>

      </aside>

      <div className="case-file-story">
        <section className="case-file-overview" id="overview">
          <span className="case-file-kicker">Inside the project</span>
          <h2>The idea behind it.</h2>
          {project.overview.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </section>
      </div>
    </div>

    <div className="case-process" aria-label="Project process">
      <div className="case-workbook-top"><span>{project.title} / working notes</span><span>{project.year}</span></div>
      {project.sections.map((section, i) => {
        const paragraphs = section.body.split(/\n\s*\n|(?<=[.!?])\s+(?=[A-Z])/).filter(Boolean);
        const kind = section.label.toLowerCase();
        return <Reveal key={section.label}><section className={`case-process-section case-process-${kind === "problem" || kind === "approach" || kind === "outcome" ? kind : "plain"}`} id={`process-${i + 1}`}>
          <header className="case-process-heading">
            <span className="case-margin-note">{kind === "problem" ? "The starting point" : kind === "approach" ? "Connecting the dots" : "What came out of it"}</span>
            <h2>{section.label}</h2>
            <svg className="case-pencil-arrow" width="95" height="42" viewBox="0 0 95 42" fill="none" aria-hidden="true"><path d="M3 9C24 4 15 37 43 29C57 25 66 20 88 22M78 14L89 22L79 30" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </header>
          {kind === "approach" ? <ul className="case-process-path">{paragraphs.map((paragraph, j) => <li key={j}><span className="case-process-dot" aria-hidden="true">{String(j + 1).padStart(2, "0")}</span><p>{paragraph}</p></li>)}</ul>
            : kind === "outcome" ? <ul className="case-process-results">{paragraphs.map((paragraph, j) => <li key={j}><Check size={19} aria-hidden="true" /><p>{paragraph}</p></li>)}</ul>
            : <div className="case-process-copy">{paragraphs.map((paragraph, j) => <p key={j}>{paragraph}</p>)}</div>}
        </section></Reveal>;
      })}
    </div>

    <nav className="case-project-navigation" aria-label="Previous and next projects">
      {[{ project: previous, direction: "Previous", Icon: ArrowLeft }, { project: next, direction: "Next", Icon: ArrowRight }].map(({ project: adjacent, direction, Icon }) => <Link key={direction} href={`/projects/${adjacent.id}`} className="case-project-nav-link" aria-label={`${direction} project: ${adjacent.title}`}>
        <span className="case-project-nav-direction"><Icon size={18} aria-hidden="true" />{direction} project</span>
        <div className="case-project-nav-body"><div className="case-project-nav-image"><Image src={adjacent.image} alt="" fill sizes="96px" /></div><div><h2>{adjacent.title}</h2><p>{adjacent.category}</p></div></div>
      </Link>)}
    </nav>

  </main>;
}
