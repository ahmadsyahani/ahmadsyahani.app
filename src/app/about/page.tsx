"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { personalInfo, experience, skills } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      <main className="pt-24">


        {/* ── Body Grid ── */}
        <section className="mx-auto max-w-[1200px] px-6 pb-24 pt-16 md:px-10">
          <div className="grid gap-16 md:grid-cols-[340px_1fr] md:gap-24">
            {/* Left — Sticky Identity */}
            <aside className="md:sticky md:top-24 md:self-start">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href="/"
                  className="group mb-8 inline-flex items-center gap-2.5 rounded-full border border-stone-200/60 bg-white/60 px-2 py-2 pr-5 text-[13px] font-medium tracking-[-0.01em] text-stone-600 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:border-stone-300 hover:bg-white hover:text-stone-900 hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors duration-300 group-hover:bg-stone-200 group-hover:text-stone-900">
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  Back to Home
                </Link>

                <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-stone-400">
                  {personalInfo.role}
                </p>

                <h1 className="mt-4 text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-stone-900 max-md:text-[40px]">
                  Ahmad
                  <br />
                  Syahani
                </h1>

                <p className="mt-6 text-[15px] leading-[1.6] tracking-[-0.01em] text-stone-500">
                  {personalInfo.bio}
                </p>

                {/* Social Links & CV */}
                <div className="mt-10 flex flex-col gap-3">
                  <a
                    href="/resume.pdf"
                    download
                    className="group inline-flex w-fit items-center gap-1.5 rounded-full border border-stone-200 bg-white px-5 py-2 text-[13px] font-medium tracking-[-0.01em] text-stone-900 transition-all hover:border-stone-400"
                  >
                    Download CV
                    <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">
                      ↓
                    </span>
                  </a>
                  
                  <div className="mt-4 flex flex-col gap-3">
                    <a
                      href={`mailto:${personalInfo.email}`}
                    className="group inline-flex items-center gap-1 text-[14px] tracking-[-0.01em] text-stone-400 transition-colors hover:text-stone-900"
                  >
                    Email
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[14px] tracking-[-0.01em] text-stone-400 transition-colors hover:text-stone-900"
                  >
                    GitHub
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[14px] tracking-[-0.01em] text-stone-400 transition-colors hover:text-stone-900"
                  >
                    LinkedIn
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                  </div>
                </div>
              </motion.div>
            </aside>

            {/* Right — Content */}
            <div className="flex flex-col gap-20">
              {/* Experience */}
              <AnimatedSection>
                <p className="border-b border-stone-200 pb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                  Experience
                </p>

                <div className="mt-8 flex flex-col gap-10">
                  {experience.map((e, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                        <div>
                          <h3 className="text-[16px] font-medium tracking-[-0.02em] text-stone-900">
                            {e.role}
                          </h3>
                          <p className="mt-0.5 text-[14px] tracking-[-0.01em] text-stone-400">
                            {e.company}
                          </p>
                        </div>
                        <span className="text-[13px] tracking-[-0.01em] text-stone-400 sm:whitespace-nowrap">
                          {e.period}
                        </span>
                      </div>
                      <p className="text-[15px] leading-[1.6] tracking-[-0.01em] text-stone-500">
                        {e.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Skills */}
              <AnimatedSection delay={0.1}>
                <p className="border-b border-stone-200 pb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                  Technologies
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-stone-200 px-4 py-1.5 text-[13px] tracking-[-0.01em] text-stone-600 transition-all duration-200 hover:border-stone-400 hover:text-stone-900"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </AnimatedSection>

              {/* Philosophy */}
              <AnimatedSection delay={0.15}>
                <p className="border-b border-stone-200 pb-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                  Philosophy
                </p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {[
                    {
                      title: "Clean Code",
                      desc: "I believe in writing code that is easy to read, maintain, and extend. Every line should serve a purpose.",
                    },
                    {
                      title: "User-First",
                      desc: "Great technology should be invisible. I focus on building experiences that feel intuitive and effortless.",
                    },
                    {
                      title: "Continuous Learning",
                      desc: "The tech landscape evolves rapidly. I stay curious, experiment with new tools, and adapt quickly.",
                    },
                    {
                      title: "Collaboration",
                      desc: "The best products are built by diverse teams. I value open communication and shared ownership.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <h4 className="text-[15px] font-medium tracking-[-0.02em] text-stone-900">
                        {item.title}
                      </h4>
                      <p className="text-[14px] leading-[1.6] tracking-[-0.01em] text-stone-500">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
