import type { Metadata } from "next";
import { MousePointer2 } from "lucide-react";
import { Frame } from "@/components/studio/Studio";
import { AnimatedRibbons } from "@/components/studio/Motion";
import AboutEntrance from "@/components/studio/AboutEntrance";
import PhotoStack from "@/components/studio/PhotoStack";
import AboutShowcase from "@/components/studio/AboutShowcase";
import { experience, learningSkills, skills } from "@/lib/data";

export const metadata: Metadata = { title: "About me", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <main id="main-content" className="about-page">
    <AboutEntrance>
      <section className="about-hero">
        <div className="about-ribbon-entry"><AnimatedRibbons immediate /></div>
        <div className="about-hero-inner">
          <div className="about-photo-entry"><PhotoStack /></div>
          <div className="about-intro-stage">
            <Frame className="about-intro-drawing" label="About me"><span className="sr-only">About me</span></Frame>
            <div className="about-introduction">
              <h1>I build the details that make digital products feel right.</h1>
              <p>I&apos;m Ahmad, a full stack developer based in Indonesia. From thoughtful interfaces to reliable systems, I enjoy bringing digital products to life.</p>
            </div>
            <div className="collaborator-cursor about-cursor" aria-hidden="true"><MousePointer2 fill="currentColor" size={26} /><span>Full stack developer</span></div>
          </div>
        </div>
      </section>
      <div className="about-showcase-entry"><AboutShowcase skills={skills} learningSkills={learningSkills} experience={experience} /></div>
    </AboutEntrance>
  </main>;
}
