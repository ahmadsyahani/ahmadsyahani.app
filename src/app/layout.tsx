import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScrolling from "@/components/SmoothScrolling";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmadsyahani.com"),
  title: "Ahmad Syahani — Full Stack Developer",
  description:
    "Portfolio of Ahmad Syahani. I design and build fast, reliable, and beautiful digital products — from architecture to UI.",
  keywords: [
    "Ahmad Syahani",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} data-scroll-behavior="smooth">
      <body>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}