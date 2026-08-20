import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScrolling from "@/components/SmoothScrolling";
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
    <html
      lang="en"
      className={`${stackSansNotch.variable} font-sans`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased">
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}