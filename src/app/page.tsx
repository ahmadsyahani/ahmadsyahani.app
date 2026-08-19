"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import { personalInfo, skills } from "@/lib/data";

export default function Home() {

  return (
    <>
      <Navbar />

      <main>
        {/* ════════════════════════════════════════════════════
            HERO SECTION
           ════════════════════════════════════════════════════ */}
        <Hero />

        {/* ════════════════════════════════════════════════════
            PROJECTS SECTION
           ════════════════════════════════════════════════════ */}
        <ProjectShowcase />

        {/* ════════════════════════════════════════════════════
            ABOUT BRIEF
           ════════════════════════════════════════════════════ */}
        <section className="border-t border-stone-200">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-24 md:grid-cols-[340px_1fr] md:gap-24 md:px-10">
            <AnimatedSection>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                About
              </p>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-stone-900">
                A bit about
                <br />
                myself.
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-[17px] leading-[1.7] tracking-[-0.01em] text-stone-500">
                {personalInfo.bio}
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-stone-900 transition-colors hover:text-stone-500"
              >
                Read more about me
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            TECH STACK
           ════════════════════════════════════════════════════ */}
        <section className="border-t border-stone-200">
          <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10">
            <AnimatedSection>
              <p className="mb-10 text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                Technologies
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {skills.map((skill, i) => (
                <AnimatedSection key={skill} delay={i * 0.04}>
                  <div className="group flex items-center gap-3 rounded-lg border border-stone-200 px-4 py-3 transition-all duration-300 hover:border-stone-400 hover:bg-stone-100">
                    <span className="text-[14px] tracking-[-0.01em] text-stone-600 transition-colors group-hover:text-stone-900">
                      {skill}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            CONTACT CTA
           ════════════════════════════════════════════════════ */}
        <section id="contact" className="border-t border-stone-200">
          <div className="mx-auto max-w-[1200px] px-6 py-32 text-center md:px-10">
            <AnimatedSection>
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                Contact
              </p>
              <h2 className="mx-auto max-w-[520px] text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.03em] text-stone-900">
                Let&apos;s build something great together.
              </h2>
              <p className="mx-auto mt-4 max-w-[400px] text-[16px] leading-relaxed text-stone-400">
                Have a project in mind? I&apos;d love to hear about it. Drop me
                a line and let&apos;s chat.
              </p>

              <div className="mt-12">
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}