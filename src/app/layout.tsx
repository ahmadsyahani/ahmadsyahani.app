import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/Navbar";
import "./globals.css";

const stackSansNotch = localFont({
  src: [
    {
      path: "./fonts/StackSansNotch-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/StackSansNotch-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/StackSansNotch-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/StackSansNotch-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/StackSansNotch-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/StackSansNotch-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-stack-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmadsyahani.app"),
  title: {
    default: "Ahmad Syahani — Full Stack Developer",
    template: "%s | Ahmad Syahani",
  },
  description:
    "Portfolio of Ahmad Syahani. I design and build fast, reliable, and beautiful digital products — from architecture to UI.",
  keywords: [
    "Ahmad Syahani",
    "Syahani",
    "Full Stack Developer",
    "Software Engineer",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Ahmad Syahani", url: "https://ahmadsyahani.app" }],
  creator: "Ahmad Syahani",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ahmadsyahani.app",
    title: "Ahmad Syahani — Full Stack Developer",
    description:
      "Portfolio of Ahmad Syahani. I design and build fast, reliable, and beautiful digital products.",
    siteName: "Ahmad Syahani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Syahani — Full Stack Developer",
    description:
      "Portfolio of Ahmad Syahani. I design and build fast, reliable, and beautiful digital products.",
  },
  alternates: {
    canonical: "https://ahmadsyahani.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ahmad Syahani",
  "url": "https://ahmadsyahani.app",
  "jobTitle": "Full Stack Developer",
  "sameAs": [
    "https://github.com/ahmadsyahani",
    "https://linkedin.com/in/ahmadsyahani",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${stackSansNotch.variable} font-sans`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SmoothScrolling>
          {children}
          <Navbar />
        </SmoothScrolling>
      </body>
    </html>
  );
}