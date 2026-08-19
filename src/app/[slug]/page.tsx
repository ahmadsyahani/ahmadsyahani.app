import Link from "next/link";

const projectDetails: Record<
  string,
  { title: string; category: string; description: string }
> = {
  pensmate: {
    title: "PensMate",
    category: "Web Community",
    description:
      "A growing online community platform designed to help users discover conversations, resources, and common interests with a clean and engaging experience.",
  },
  "dapur-ai": {
    title: "Dapur AI",
    category: "AI Recipe Generator",
    description:
      "An AI-powered recipe assistant that transforms ingredients and preferences into useful cooking suggestions with a user-friendly interface.",
  },
  "mis-bytes": {
    title: "MIS Bytes",
    category: "Management System",
    description:
      "A management information system focused on structured data, reporting, and operational visibility for internal business workflows.",
  },
  "scm-project": {
    title: "SCM App",
    category: "Supply Chain",
    description:
      "A supply chain management application built to streamline operational coordination, inventory oversight, and process efficiency.",
  },
};

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectDetails[slug];

  if (!project) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-white">Project not found</h1>
        <Link href="/" className="mt-6 inline-block text-cyan-400 hover:text-cyan-300">
          ← Back to home
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300">
        <span aria-hidden="true">←</span>
        <span className="ml-2">Back</span>
      </Link>

      <header className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">{project.category}</p>
        <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">{project.description}</p>
      </header>

      <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-10 text-center text-slate-400">
        Hero Image / Video Showcase
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-semibold text-white">Overview</h2>
          <p className="mt-4 text-slate-300">
            Proyek ini dibangun untuk menyelesaikan masalah spesifik dengan arsitektur yang solid.
            Menggunakan React dan Next.js untuk memastikan performa dan SEO yang maksimal di sisi
            frontend, serta integrasi database relasional seperti MySQL untuk manajemen data yang
            stabil.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-semibold text-white">Key Challenges</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
            <li>Designing a smooth user experience</li>
            <li>Building a scalable frontend structure</li>
            <li>Ensuring maintainable data workflows</li>
          </ul>
        </article>
      </div>
    </section>
  );
}