"use client";

import Link from "next/link";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-16 md:grid-cols-3 md:px-10">
        {/* Col 1 — Identity */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="text-[15px] font-medium tracking-[-0.01em] text-stone-900"
          >
            {personalInfo.name}
          </Link>
          <p className="text-[13px] leading-relaxed tracking-[-0.01em] text-stone-400">
            {personalInfo.role}
            <br />
            {personalInfo.location}
          </p>
        </div>

        {/* Col 2 — Navigation */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
            Navigation
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="text-[13px] text-stone-500 transition-colors hover:text-stone-900"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[13px] text-stone-500 transition-colors hover:text-stone-900"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-[13px] text-stone-500 transition-colors hover:text-stone-900"
            >
              Projects
            </Link>
          </div>
        </div>

        {/* Col 3 — Connect */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
            Connect
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-[13px] text-stone-500 transition-colors hover:text-stone-900"
            >
              Email
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-stone-500 transition-colors hover:text-stone-900"
            >
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-stone-500 transition-colors hover:text-stone-900"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-200">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6 md:px-10">
          <p className="text-[12px] tracking-[-0.01em] text-stone-400">
            © {new Date().getFullYear()} {personalInfo.name}
          </p>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="text-[12px] tracking-[-0.01em] text-stone-400 transition-colors hover:text-stone-900"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
