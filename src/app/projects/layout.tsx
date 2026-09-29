import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects", description: "Explore web applications, mobile experiences, and digital products built by Ahmad Syahani.", alternates: { canonical: "/projects" } };
export default function ProjectsLayout({ children }: { children: React.ReactNode }) { return children; }
