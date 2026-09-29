import { AboutIntro, Hero, ProjectList, SectionHeading, Services, TestimonialSlider } from "@/components/studio/Studio";
import { projects } from "@/lib/data";
import { AnimatedRibbons } from "@/components/studio/Motion";

export default function Home() {
  return <main id="main-content"><Hero /><AboutIntro /><div className="featured-scene"><AnimatedRibbons variant="projects" /><section id="projects" className="featured-section section-space"><SectionHeading label="Featured projects" title="Work I am proud of" /><ProjectList items={projects.slice(0, 3)} /></section></div><Services /><TestimonialSlider /></main>;
}
