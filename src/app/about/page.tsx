import type { Metadata } from "next";
import { MousePointer2 } from "lucide-react";
import { Frame, Reveal } from "@/components/studio/Studio";
import { AnimatedRibbons, CharacterReveal, WordReveal } from "@/components/studio/Motion";
import PhotoStack from "@/components/studio/PhotoStack";
import AboutShowcase from "@/components/studio/AboutShowcase";
import { experience, learningSkills, skills } from "@/lib/data";

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
    <AboutShowcase skills={skills} learningSkills={learningSkills} experience={experience} />
  </main>;
}
