"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, ArrowUpRight, Copy, Check, Clock, MessageSquare, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { personalInfo } from "@/lib/data";

const projectTypes = [
  "Web Application",
  "Mobile App",
  "Full-Stack Platform",
  "Consulting",
  "Other",
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
    </svg>
  );
}

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("Web Application");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");
    }, 1100);
  };

  return (
    <>
      <main className="min-h-screen pt-24 pb-32 md:pt-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          {/* ════════════════════════════════════════════════════
              NAVIGATION PILL
             ════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 rounded-full border border-stone-200/70 bg-white/70 px-2 py-1.5 pr-4 text-[13px] font-medium tracking-[-0.01em] text-stone-600 shadow-xs backdrop-blur-md transition-all duration-200 hover:border-stone-300 hover:bg-white hover:text-stone-900"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors group-hover:bg-stone-200 group-hover:text-stone-900">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </div>
              Back to Home
            </Link>
          </motion.div>

          {/* ════════════════════════════════════════════════════
              MAIN ASYMMETRICAL GRID
             ════════════════════════════════════════════════════ */}
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20 items-start">
            {/* Left Column: Typography, Context & Fast Actions */}
            <div className="flex flex-col gap-10">
              <AnimatedSection>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                  Contact & Inquiry
                </p>
                <h1 className="mt-3 text-[46px] font-semibold leading-[1.04] tracking-[-0.04em] text-stone-900 md:text-[62px]">
                  Let&apos;s build
                  <br />
                  something great.
                </h1>
                <p className="mt-5 text-[16px] leading-[1.65] text-stone-500 font-light md:text-[18px]">
                  Have a new project in mind, an engineering problem to solve, or looking to scale your digital product? Drop a message and let&apos;s talk.
                </p>
              </AnimatedSection>

              {/* Direct Email Display & Copy */}
              <AnimatedSection delay={0.1}>
                <div className="group relative overflow-hidden rounded-[28px] border border-stone-200/80 bg-stone-50/60 p-6 md:p-8 transition-all duration-300 hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                        Email Address
                      </span>
                      <p className="mt-1 text-[17px] md:text-[19px] font-medium tracking-tight text-stone-900">
                        {personalInfo.email}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-[12px] font-medium text-stone-700 shadow-xs transition-colors hover:bg-stone-100 hover:text-stone-900 cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-stone-500" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-[12px] font-medium text-white shadow-xs transition-colors hover:bg-stone-800"
                      >
                        Send Mail
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Quick Details & Socials */}
              <AnimatedSection delay={0.15}>
                <div className="grid grid-cols-2 gap-4 border-t border-stone-200 pt-8">
                  <div>
                    <div className="flex items-center gap-2 text-stone-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                        Location
                      </span>
                    </div>
                    <p className="mt-1.5 text-[14px] font-medium text-stone-800">
                      {personalInfo.location} (GMT+7)
                    </p>
                    <p className="text-[12px] text-stone-400">Remote worldwide</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-stone-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                        Response Time
                      </span>
                    </div>
                    <p className="mt-1.5 text-[14px] font-medium text-stone-800">
                      Within 24 Hours
                    </p>
                    <p className="text-[12px] text-stone-400">Mon — Fri</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-[13px] font-medium text-stone-700 transition-all hover:border-stone-400 hover:text-stone-900"
                  >
                    <GithubIcon className="h-4 w-4" />
                    GitHub
                    <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-[13px] font-medium text-stone-700 transition-all hover:border-stone-400 hover:text-stone-900"
                  >
                    <LinkedinIcon className="h-4 w-4 text-sky-700" />
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
                  </a>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: Premium Interactive Form */}
            <AnimatedSection delay={0.1}>
              <div className="rounded-[36px] border border-stone-200/90 bg-white p-8 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-6 mb-8">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 text-stone-900">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-semibold text-stone-900">
                      Send a Message
                    </h2>
                    <p className="text-[13px] text-stone-400 font-light">
                      I will respond back to your email directly.
                    </p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {formStatus === "success" ? (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h3 className="text-[22px] font-semibold text-stone-900">
                        Message Sent Successfully!
                      </h3>
                      <p className="mt-2 max-w-[360px] text-[15px] leading-relaxed text-stone-500 font-light">
                        Thank you for reaching out. I have received your message and will review it shortly.
                      </p>
                      <button
                        onClick={() => {
                          setFormStatus("idle");
                          setFormData({ name: "", email: "", message: "" });
                        }}
                        className="mt-8 rounded-full bg-stone-900 px-6 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-stone-800 cursor-pointer"
                      >
                        Send Another Note
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      {/* Project Type Chips */}
                      <div className="flex flex-col gap-2.5">
                        <label className="text-[12px] font-semibold uppercase tracking-[0.06em] text-stone-400">
                          Topic / Requirement
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {projectTypes.map((type) => {
                            const isSelected = selectedType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setSelectedType(type)}
                                className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all duration-200 cursor-pointer ${isSelected
                                    ? "bg-stone-900 text-white shadow-xs"
                                    : "border border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                                  }`}
                              >
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Name & Email Fields */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="user-name" className="text-[13px] font-medium text-stone-700">
                            Name <span className="text-stone-400">*</span>
                          </label>
                          <input
                            id="user-name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-3.5 text-[14px] text-stone-900 outline-none transition-all focus:border-stone-900 focus:bg-white focus:ring-1 focus:ring-stone-900"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="user-email" className="text-[13px] font-medium text-stone-700">
                            Email <span className="text-stone-400">*</span>
                          </label>
                          <input
                            id="user-email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-3.5 text-[14px] text-stone-900 outline-none transition-all focus:border-stone-900 focus:bg-white focus:ring-1 focus:ring-stone-900"
                          />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="user-message" className="text-[13px] font-medium text-stone-700">
                          Message <span className="text-stone-400">*</span>
                        </label>
                        <textarea
                          id="user-message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell me a bit about your goals, timelines, or questions..."
                          className="w-full resize-none rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-3.5 text-[14px] text-stone-900 outline-none transition-all focus:border-stone-900 focus:bg-white focus:ring-1 focus:ring-stone-900"
                        />
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 py-4 text-[14px] font-medium text-white shadow-xs transition-all hover:bg-stone-800 hover:shadow-md disabled:opacity-70 cursor-pointer"
                      >
                        {formStatus === "submitting" ? (
                          <span>Sending message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
