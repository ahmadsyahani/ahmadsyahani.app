import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScrolling from "@/components/SmoothScrolling";
import { Signature, StudioFooter, StudioNav } from "@/components/studio/Studio";
import { NavigationProvider, TransitionPage } from "@/components/studio/Navigation";
import "lenis/dist/lenis.css";
import "./globals.css";

const headingFont = localFont({ src: "./fonts/neue-montreal-medium.woff2", variable: "--font-heading", weight: "500", display: "swap" });
const bodyFont = localFont({ src: [{ path: "./fonts/inter-regular.woff2", weight: "400" }, { path: "./fonts/inter-medium.woff2", weight: "500" }], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmadsyahani.app"),
  title: { default: "Ahmad Syahani — Full Stack Developer", template: "%s | Ahmad Syahani" },
  description: "Portfolio of Ahmad Syahani. I design and build fast, reliable, and beautiful digital products — from architecture to UI.",
  keywords: ["Ahmad Syahani", "Syahani", "Full Stack Developer", "Software Engineer", "Portfolio", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Ahmad Syahani", url: "https://ahmadsyahani.app" }],
  creator: "Ahmad Syahani",
  openGraph: { type: "website", locale: "en_US", url: "https://ahmadsyahani.app", title: "Ahmad Syahani — Full Stack Developer", description: "Thoughtful interfaces. Reliable systems. A portfolio of work by Ahmad Syahani.", siteName: "Ahmad Syahani" },
  twitter: { card: "summary_large_image", title: "Ahmad Syahani — Full Stack Developer", description: "Thoughtful interfaces. Reliable systems. A portfolio of work by Ahmad Syahani." },
  alternates: { canonical: "https://ahmadsyahani.app" },
};

const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: "Ahmad Syahani", url: "https://ahmadsyahani.app", jobTitle: "Full Stack Developer", sameAs: ["https://github.com/ahmadsyahani", "https://www.linkedin.com/in/ahmad-syahani"] };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth" className={`${headingFont.variable} ${bodyFont.variable}`}><head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head><body><a href="#main-content" className="skip-link">Skip to content</a><SmoothScrolling><NavigationProvider><Signature /><TransitionPage>{children}<StudioFooter /></TransitionPage><StudioNav /></NavigationProvider></SmoothScrolling></body></html>;
}
