"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "./Navigation";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Home, Layers, List, Mail, MousePointer2, User } from "lucide-react";
import { personalInfo, type Project } from "@/lib/data";
import { AnimatedRibbons, CharacterReveal, DrawLabel, WordReveal } from "./Motion";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .65, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export function Frame({ children, className = "", color = "purple", label }: { children: ReactNode; className?: string; color?: "purple" | "blue" | "green" | "orange"; label?: string }) {
  return <div className={`editor-frame frame-${color} ${className}`}>
    {label && <span className="frame-caption"><Layers size={12} aria-hidden="true" />{label}</span>}
    <i className="handle top-left" aria-hidden="true" /><i className="handle top-right" aria-hidden="true" /><i className="handle bottom-left" aria-hidden="true" /><i className="handle bottom-right" aria-hidden="true" />
    {children}
  </div>;
}

export function SectionHeading({ label, title, color = "purple" }: { label: string; title: string; color?: "purple" | "blue" | "green" | "orange" }) {
  return <div className="section-heading"><DrawLabel color={color}>{label}</DrawLabel><h2><WordReveal text={title} /></h2></div>;
}

export function Signature() {
  return <header className="site-header"><Link href="/" aria-label="Ahmad Syahani — home" className="signature">Syahani<span>.</span></Link></header>;
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return <div className={`social-links ${className}`}><a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" /></svg></a><a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"><svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg></a></div>;
}

export function Hero() {
  return <section className="intro-section">
    <AnimatedRibbons immediate />
    <Image className="hero-sticker pen-sticker" src="/studio/pen.webp" alt="" width={100} height={100} />
    <Image className="hero-sticker rocket-sticker" src="/studio/rocket.webp" alt="" width={100} height={150} />
    <div className="intro-wrap">
      <div className="intro-topline"><span>Intro</span><span className="availability"><i aria-hidden="true" />Available for work</span></div>
      <Frame className="hero-drawing-frame" color="blue"><span className="sr-only">Introduction</span></Frame>
      <div className="intro-card">
          <div className="intro-portrait"><Image src="/studio/ahmad-portrait.webp" alt="Ahmad Syahani" fill sizes="(max-width: 700px) 90vw, 330px" preload /></div>
          <div className="intro-copy"><h1>Hey, I am<br />Ahmad Syahani</h1><p>I care about the details, the craft, and building things that people love to use.</p></div>
      </div>
      <div className="intro-bottomline"><span>Full stack developer, based in Indonesia</span><SocialLinks /></div>
      <div className="collaborator-cursor hero-cursor" aria-hidden="true"><div><MousePointer2 fill="currentColor" size={26} /><span>Full stack developer</span></div></div>
    </div>
  </section>;
}

export function AboutIntro() {
  return <section id="about-intro" className="about-intro section-space">
    <DrawLabel color="green">More about me</DrawLabel>
    <Frame className="statement" color="green"><p><CharacterReveal text="I’m a" /> <CharacterReveal className="statement-highlight" text="full stack developer" delay={.07} /> <CharacterReveal text="with a strong focus on building thoughtful interfaces and reliable, scalable digital products." delay={.3} /></p><Image className="bulb-sticker" src="/studio/lightbulb.webp" alt="" width={90} height={100} /><Image className="brain-sticker" src="/studio/brain.webp" alt="" width={86} height={86} /></Frame>
    <Reveal className="center-action"><Link className="outlined-button" href="/about-me"><span className="button-fill" aria-hidden="true"><i /><i /><i /></span><span className="button-label">Read my full story <ArrowRight size={17} /></span></Link></Reveal>
  </section>;
}

export function ProjectList({ items }: { items: Project[] }) {
  return <div className="project-stack">{items.map((project, index) => <Reveal key={project.id}>
    <Frame label={`Project ${project.num}`} className="project-frame">
      <div className="project-copy"><div className="project-meta"><span>{project.title}</span><i aria-hidden="true" /><span>{project.year}</span></div><div><h3><Link href={`/projects/${project.id}`}><WordReveal text={project.title} /></Link></h3><p><CharacterReveal text={project.desc} /></p></div><Link href={`/projects/${project.id}`} className="outlined-button"><span className="button-fill" aria-hidden="true"><i /><i /><i /></span><span className="button-label">View case study <ArrowRight size={17} /></span></Link></div>
      <Link href={`/projects/${project.id}`} className={`project-image project-image-${index % 4}`} aria-label={`View ${project.title}`}><Image src={project.image} alt={project.title} fill sizes="(max-width: 700px) 90vw, 480px" /><span className="project-image-arrow"><ArrowUpRight size={22} /></span></Link>
    </Frame>
  </Reveal>)}</div>;
}

const services = [
  { title: "Web\ndevelopment", image: "interaction", className: "yellow-note", tags: "React · Next.js · Vue" },
  { title: "Backend\nengineering", image: "research", className: "blue-note", tags: "Laravel · PostgreSQL · Go" },
  { title: "Mobile\napplications", image: "prototype", className: "purple-note", tags: "Flutter · Dart · SQLite" },
  { title: "Creative\ninterfaces", image: "motion", className: "green-note", tags: "Motion · Responsive UI" },
];

export function Services() {
  return <section className="services-section section-space"><SectionHeading label="What I offer" title="How I can help" color="orange" /><div className="service-notes">{services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}</div></section>;
}

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: .15 });
  return <div ref={ref} className={`service-note ${service.className}`} data-visible={visible} style={{ "--note-index": index } as CSSProperties}><Image src={`/studio/${service.image}.webp`} width={200} height={200} alt="" /><h3>{service.title}</h3></div>;
}

const workingStyle = [
  "I bring the same care to each layer: clear interfaces, reliable systems, and details that make a product feel considered.",
  "I like to work close to the problem, communicate early, and ship in small, thoughtful iterations.",
  "From first sketch to production, I keep the experience and the engineering moving together.",
];

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  return <section className="testimonial-section section-space"><SectionHeading label="How I work" title="What it’s like to work with me" color="green" /><Reveal><Frame className="testimonial-card" color="green"><div className="testimonial-slides" aria-live="polite" aria-atomic="true"><AnimatePresence mode="wait" initial={false}><motion.div className="testimonial-slide" key={index} initial={{ opacity: 0, x: reduce ? 0 : 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduce ? 0 : -24 }} transition={{ duration: reduce ? 0 : .28 }}><blockquote>“{workingStyle[index]}”</blockquote><div className="testimonial-author"><Image src="/studio/ahmad-portrait.webp" width={58} height={58} alt="" /><p>Ahmad Syahani<span>Full stack developer</span></p></div></motion.div></AnimatePresence></div><div className="testimonial-controls"><span>{String(index + 1).padStart(2, "0")} <span className="muted">/ {String(workingStyle.length).padStart(2, "0")}</span></span><div><button onClick={() => setIndex((index - 1 + workingStyle.length) % workingStyle.length)} aria-label="Previous testimonial"><ChevronLeft size={20} /></button><button onClick={() => setIndex((index + 1) % workingStyle.length)} aria-label="Next testimonial"><ChevronRight size={20} /></button></div></div></Frame></Reveal></section>;
}

export function EmailButton() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true); setError(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch { setError(true); }
  }
  return <div className="email-control"><button className="email-button" onClick={copy} aria-label="Copy email address"><span>{copied ? "Email copied!" : personalInfo.email}</span>{copied ? <Check size={16} /> : <Copy size={16} />}</button><span className="sr-only" role="status">{copied ? "Email address copied to clipboard" : ""}</span>{error && <a href={`mailto:${personalInfo.email}`}>Open your email app <ArrowUpRight size={14} /></a>}</div>;
}

export function StudioFooter() {
  return <footer id="contact" className="studio-footer"><AnimatedRibbons variant="footer" /><div className="footer-content"><Reveal><h2>Ready for the work?</h2><Link className="lets-talk" href="/contact">Let’s talk</Link></Reveal><div className="footer-bottom"><i className="footer-handle top-left" aria-hidden="true" /><i className="footer-handle top-right" aria-hidden="true" /><i className="footer-handle bottom-left" aria-hidden="true" /><i className="footer-handle bottom-right" aria-hidden="true" /><div><p>Currently open for collaboration</p><EmailButton /></div><div className="footer-social"><p>Connect on socials</p><SocialLinks /></div></div><div className="footer-credits"><span>© {new Date().getFullYear()} Ahmad Syahani</span><span>Built with care, from Indonesia.</span></div></div></footer>;
}

const links = [{ href: "/", label: "Home", Icon: Home }, { href: "/about-me", label: "About me", Icon: User }, { href: "/projects", label: "Projects", Icon: List }, { href: "/contact", label: "Contact", Icon: Mail }];

export function StudioNav() {
  const path = usePathname();
  return <nav className="studio-dock" aria-label="Main navigation">{links.map(({ href, label, Icon }) => {
    const active = href === "/" ? path === "/" : href === "/projects" ? path.startsWith("/project") : path === href;
    return <Link key={href} href={href} className={active ? "active" : ""} aria-label={label} aria-current={active ? "page" : undefined}><Icon size={24} strokeWidth={1.6} /><span className="dock-tooltip">{label}</span></Link>;
  })}</nav>;
}

export function BackLink({ href = "/", children = "Back to home" }: { href?: string; children?: ReactNode }) {
  return <Link className="back-link" href={href}><ArrowLeft size={16} />{children}</Link>;
}

export function PageIntro({ label, title, description }: { label: string; title: string; description?: string }) {
  return <div className="page-intro"><DrawLabel>{label}</DrawLabel><h1><WordReveal text={title} /></h1>{description && <p><CharacterReveal text={description} /></p>}</div>;
}

export function PaperTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .3 }}>{children}</motion.div>;
}

export function ColorTag({ children, color }: { children: ReactNode; color: string }) {
  return <span className="color-tag" style={{ "--tag-color": color } as CSSProperties}>{children}</span>;
}
