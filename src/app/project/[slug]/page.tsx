"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { projects } from "@/lib/data";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const projectIndex = projects.findIndex((p) => p.id === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[80vh] flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-stone-900">
            Project not found
          </h1>
          <Link
            href="/"
            className="mt-4 text-[14px] text-stone-400 transition-colors hover:text-stone-900"
          >
            ← Back to home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Prev / Next project navigation
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <>
      <Navbar />

      <main className="pt-24">


        {/* ── Hero Image ── */}
        <div className="mx-auto max-w-[1200px] px-6 pt-8 md:px-10 md:pt-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2.5 rounded-full border border-stone-200/60 bg-white/60 px-2 py-2 pr-5 text-[13px] font-medium tracking-[-0.01em] text-stone-600 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:border-stone-300 hover:bg-white hover:text-stone-900 hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.1)]"
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
              Back to Projects
            </Link>
          </motion.div>

          <motion.div
            className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border border-stone-200 bg-stone-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </motion.div>
        </div>

        {/* ── Content Grid ── */}
        <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
          <div className="grid gap-16 md:grid-cols-[300px_1fr] md:gap-20">
            {/* Sidebar — Project Meta */}
            <aside className="md:sticky md:top-24 md:self-start">
              <motion.div
                className="flex flex-col gap-10"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div>
                  <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.04em] text-stone-900">
                    {project.title}
                  </h1>
                  <p className="mt-2 text-[15px] tracking-[-0.01em] text-stone-400">
                    {project.category}
                  </p>
                </div>

                {/* Meta Details */}
                <div className="flex flex-col gap-5 border-t border-stone-200 pt-6">
                  {[
                    { label: "Year", value: project.year },
                    { label: "Role", value: project.role },
                  ].map((meta) => (
                    <div key={meta.label} className="flex flex-col gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                        {meta.label}
                      </span>
                      <span className="text-[14px] tracking-[-0.01em] text-stone-900">
                        {meta.value}
                      </span>
                    </div>
                  ))}
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                      Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-stone-200 px-3 py-1 text-[12px] tracking-[-0.01em] text-stone-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-stone-900 transition-colors hover:text-stone-500"
                  >
                    View Live
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[14px] tracking-[-0.01em] text-stone-400 transition-colors hover:text-stone-900"
                  >
                    Source Code
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </div>
              </motion.div>
            </aside>

            {/* Main — Content */}
            <div>
              <AnimatedSection>
                <p className="text-[20px] font-normal leading-[1.6] tracking-[-0.02em] text-stone-900">
                  {project.overview}
                </p>
              </AnimatedSection>

              <div className="mt-16">
                {project.sections.map((section, i) => (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <div className="grid gap-3 border-t border-stone-200 py-8 sm:grid-cols-[120px_1fr] sm:gap-10">
                      <p className="pt-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                        {section.label}
                      </p>
                      <p className="text-[16px] leading-[1.7] tracking-[-0.01em] text-stone-500">
                        {section.body}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Prev / Next Navigation ── */}
        <section className="border-t border-stone-200">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 md:px-10">
            {prevProject ? (
              <Link
                href={`/project/${prevProject.id}`}
                className="group flex flex-col gap-2 border-r border-stone-200 px-6 py-12 transition-colors hover:bg-white"
              >
                <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-stone-400">
                  Previous
                </span>
                <span className="flex items-center gap-2 text-[17px] font-medium tracking-[-0.02em] text-stone-900 transition-colors group-hover:text-stone-600">
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/project/${nextProject.id}`}
                className="group flex flex-col items-end gap-2 px-6 py-12 text-right transition-colors hover:bg-white"
              >
                <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-stone-400">
                  Next
                </span>
                <span className="flex items-center gap-2 text-[17px] font-medium tracking-[-0.02em] text-stone-900 transition-colors group-hover:text-stone-600">
                  {nextProject.title}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
