"use client";

import Image from "next/image";
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
        <section className="border-t border-stone-200 py-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <div className="relative overflow-hidden rounded-[40px] bg-stone-50 border border-stone-200/50 p-10 md:p-16 lg:p-20">
              {/* Decorative background blurs */}
              <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-stone-200/50 blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-stone-200/30 blur-[60px]" />
              
              <div className="relative z-10 grid gap-12 md:grid-cols-[1fr_1.5fr] lg:gap-24 items-center">
                <AnimatedSection className="flex flex-col items-start gap-8">
                  <h2 className="text-[36px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-stone-900">
                    A bit about
                    <br />
                    myself.
                  </h2>

                  {/* Profile Photo Slot */}
                  <div className="group relative w-[200px] md:w-[240px]">
                    {/* SVG 1: Bottom Frame Swoosh IN FRONT (Amber) */}
                    <svg 
                      className="absolute -inset-8 z-20 text-amber-400 pointer-events-none transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-105" 
                      viewBox="0 0 250 300" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M 10,240 C 50,300 200,310 230,220 C 250,150 200,100 220,80" 
                        stroke="currentColor" 
                        strokeWidth="5" 
                        strokeLinecap="round" 
                        className="[stroke-dasharray:500] [stroke-dashoffset:500] group-hover:[stroke-dashoffset:0] transition-all duration-[1s] ease-in-out" 
                      />
                    </svg>

                    {/* SVG 2: Pop Star Top Right (Indigo) */}
                    <svg
                      className="absolute -right-8 -top-8 w-16 h-16 text-indigo-500 z-20 pointer-events-none transition-transform duration-700 group-hover:rotate-[45deg] group-hover:scale-110"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50 15 Q50 50 85 50 Q50 50 50 85 Q50 50 15 50 Q50 50 50 15 Z"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinejoin="round"
                        className="[stroke-dasharray:300] [stroke-dashoffset:300] group-hover:[stroke-dashoffset:0] transition-all duration-700 ease-in-out"
                      />
                    </svg>
                    
                    {/* SVG 3: Burst Bottom Left (Emerald) */}
                    <svg
                      className="absolute -left-6 -bottom-6 w-14 h-14 text-emerald-400 z-20 pointer-events-none transition-transform duration-700 group-hover:-rotate-45 group-hover:scale-110"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M50 25 L50 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="[stroke-dasharray:50] [stroke-dashoffset:50] group-hover:[stroke-dashoffset:0] transition-all duration-500 ease-in-out" />
                      <path d="M50 75 L50 90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="[stroke-dasharray:50] [stroke-dashoffset:50] group-hover:[stroke-dashoffset:0] transition-all duration-500 ease-in-out" />
                      <path d="M25 50 L10 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="[stroke-dasharray:50] [stroke-dashoffset:50] group-hover:[stroke-dashoffset:0] transition-all duration-500 ease-in-out" />
                      <path d="M75 50 L90 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="[stroke-dasharray:50] [stroke-dashoffset:50] group-hover:[stroke-dashoffset:0] transition-all duration-500 ease-in-out" />
                      <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="4" className="[stroke-dasharray:150] [stroke-dashoffset:150] group-hover:[stroke-dashoffset:0] transition-all duration-700 ease-in-out" />
                    </svg>

                    {/* SVG 4: Arrow Left Side (Rose) */}
                    <svg
                      className="absolute -left-12 top-14 w-16 h-16 text-rose-400 z-20 pointer-events-none transition-transform duration-700 group-hover:-translate-x-3 group-hover:rotate-12"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M 15,85 C 10,40 40,20 80,30"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="[stroke-dasharray:300] [stroke-dashoffset:300] group-hover:[stroke-dashoffset:0] transition-all duration-700 ease-in-out"
                      />
                      <path
                        d="M 60,15 L 85,32 L 60,50"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="[stroke-dasharray:150] [stroke-dashoffset:150] group-hover:[stroke-dashoffset:0] transition-all duration-500 ease-in-out"
                      />
                    </svg>

                    {/* SVG 5: Small Plus Bottom Right (Sky) */}
                    <svg
                      className="absolute -right-4 -bottom-2 w-10 h-10 text-sky-400 z-20 pointer-events-none transition-transform duration-700 group-hover:rotate-90 group-hover:scale-125"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 50,20 L 50,80 M 20,50 L 80,50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="[stroke-dasharray:100] [stroke-dashoffset:100] group-hover:[stroke-dashoffset:0] transition-all duration-500 delay-200 ease-in-out" />
                    </svg>

                    {/* SVG 6: Floating Dots Mid Right (Violet) */}
                    <svg
                      className="absolute -right-10 top-1/2 w-12 h-12 text-violet-400 z-20 pointer-events-none transition-transform duration-700 group-hover:-translate-y-3"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="20" cy="70" r="8" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                      <circle cx="50" cy="30" r="5" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                      <circle cx="80" cy="60" r="7" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300" />
                    </svg>

                    {/* Image Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-200 -rotate-2 transition-all duration-700 group-hover:rotate-0 group-hover:scale-105 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-4 border-white z-10">
                      <Image
                        src="/ahmad_3.webp"
                        alt="Ahmad Syahani"
                        fill
                        sizes="(max-width: 768px) 200px, 240px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <p className="text-[18px] md:text-[22px] leading-[1.6] tracking-[-0.01em] text-stone-600 font-light">
                    {personalInfo.bio}
                  </p>
                  <Link
                    href="/about"
                    className="group mt-10 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3.5 text-[14px] font-medium tracking-[-0.01em] text-stone-900 shadow-sm transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900 hover:shadow-md"
                  >
                    Read full story
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </AnimatedSection>
              </div>
            </div>
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