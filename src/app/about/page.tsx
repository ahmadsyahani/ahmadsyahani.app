import type { Metadata } from "next";
import { MousePointer2 } from "lucide-react";
import { Frame, Reveal, SectionHeading } from "@/components/studio/Studio";
import { AnimatedRibbons, CharacterReveal, WordReveal } from "@/components/studio/Motion";
import PhotoStack from "@/components/studio/PhotoStack";
import { experience, skills } from "@/lib/data";

export const metadata: Metadata = { title: "About me", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <main id="main-content" className="about-page">
    <section className="about-hero">
      <AnimatedRibbons immediate />
      <div className="about-hero-inner">
        <PhotoStack />
        <Reveal><Frame className="about-introduction" label="About me"><h1><WordReveal text="I build the details that make digital products feel right." /></h1><p><CharacterReveal text="I’m Ahmad, a full stack developer based in Indonesia. From thoughtful interfaces to reliable systems, I enjoy bringing digital products to life." /></p><div className="collaborator-cursor about-cursor" aria-hidden="true"><MousePointer2 fill="currentColor" size={26} /><span>Full stack developer</span></div></Frame></Reveal>
      </div>
    </section>
    <div className="about-content">
      <section className="skills-section"><SectionHeading label="My toolkit" title="A snapshot of my craft" color="orange" /><div className="skill-cloud">{skills.map((skill, i) => <Reveal key={skill} delay={i * .035}><span style={{ display: "block", rotate: `${(i % 3 - 1) * 2}deg` }}>{skill}</span></Reveal>)}</div></section>
      <section className="about-experience"><SectionHeading label="My experience" title="A journey shaped by great teams." color="green" /><div className="journey-timeline"><svg className="journey-line" viewBox="0 0 400 1000" preserveAspectRatio="none" aria-hidden="true"><path d="M 80 0 C 80 200 360 120 350 320 S 10 430 50 610 S 370 710 320 1000" /></svg>{experience.map(item => <article key={`${item.company}-${item.role}`} className="journey-entry"><Reveal><span>{item.period}</span><h3>{item.company}</h3><p>{item.role}</p></Reveal></article>)}</div></section>
    </div>
  </main>;
}
