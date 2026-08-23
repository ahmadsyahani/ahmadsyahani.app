"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <main className="min-h-screen pt-28 pb-24 md:pt-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          {/* ════════════════════════════════════════════════════
              HEADER SECTION
             ════════════════════════════════════════════════════ */}
          <div className="mb-16">
            <AnimatedSection>
              <h1 className="text-[44px] font-semibold leading-[1.05] tracking-[-0.04em] text-stone-900 md:text-[64px]">
                Crafted with care,
                <br />
                built to scale.
              </h1>
              <p className="mt-6 max-w-[620px] text-[17px] leading-[1.65] tracking-[-0.01em] text-stone-500 font-light md:text-[19px]">
                A curated archive of web applications, mobile platforms, and digital systems engineered with precision and modern UI aesthetics.
              </p>
            </AnimatedSection>

            {/* ════════════════════════════════════════════════════
                CATEGORY FILTER TABS
               ════════════════════════════════════════════════════ */}
            <AnimatedSection delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-stone-200 pb-6">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-stone-900 text-white shadow-sm"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900"
                      }`}
                    >
                      {cat}
                      {cat === "All" && (
                        <span className="ml-1.5 text-[11px] opacity-70">
                          ({projects.length})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>

          {/* ════════════════════════════════════════════════════
              PROJECTS GRID
             ════════════════════════════════════════════════════ */}
          <div className="grid gap-10 md:grid-cols-2 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: index * 0.05,
                  }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:border-stone-300 hover:shadow-xl md:p-8"
                >
                  <div>
                    {/* Image Preview Container */}
                    <Link
                      href={`/project/${project.id}`}
                      className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-100"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-950/0 transition-colors duration-300 group-hover:bg-stone-950/10" />

                      {/* Top Badges */}
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-800 backdrop-blur-md shadow-xs">
                          {project.num}
                        </span>
                        {project.category && (
                          <span className="rounded-full bg-stone-900/80 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                            {project.category}
                          </span>
                        )}
                      </div>

                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-stone-700 backdrop-blur-md shadow-xs">
                          {project.year}
                        </span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between gap-4">
                        <Link href={`/project/${project.id}`}>
                          <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-stone-900 transition-colors group-hover:text-stone-600 md:text-[28px]">
                            {project.title}
                          </h2>
                        </Link>
                      </div>

                      <p className="mt-2.5 text-[15px] leading-[1.6] text-stone-500 font-light">
                        {project.desc}
                      </p>

                      {/* Tech Tags */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-stone-200/80 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-5">
                    <Link
                      href={`/project/${project.id}`}
                      className="group/btn inline-flex items-center gap-2 text-[13px] font-semibold tracking-tight text-stone-900 transition-colors hover:text-stone-500"
                    >
                      View Case Study
                      <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                        →
                      </span>
                    </Link>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900"
                          title="View Source Code"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900"
                          title="Open Live Website"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ════════════════════════════════════════════════════
              BOTTOM CTA
             ════════════════════════════════════════════════════ */}
          <div className="mt-24 rounded-[40px] border border-stone-200 bg-stone-50 p-10 text-center md:p-16">
            <h2 className="text-[28px] font-semibold tracking-tight text-stone-900 md:text-[36px]">
              Have a project or collaboration in mind?
            </h2>
            <p className="mx-auto mt-3 max-w-[500px] text-[15px] text-stone-500 font-light">
              I am always open to discussing new opportunities, creative collaborations, or engineering challenges.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-stone-900 px-6 py-3 text-[14px] font-medium text-white shadow-sm transition-all hover:bg-stone-800 hover:shadow-md"
              >
                Get in touch →
              </Link>
              <Link
                href="/"
                className="rounded-full border border-stone-200 bg-white px-6 py-3 text-[14px] font-medium text-stone-800 shadow-sm transition-all hover:bg-stone-100"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
