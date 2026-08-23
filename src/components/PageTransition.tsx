"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import GreetingLoader from "@/components/GreetingLoader";

const routes: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/contact": "Contact",
};

// In-memory session tracking across client navigations
let hasSeenIntro = false;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const isHome = pathname === "/";

  const [shouldShowGreeting, setShouldShowGreeting] = useState(() => {
    if (typeof window === "undefined") return pathname === "/";
    if (hasSeenIntro) return false;
    const stored = sessionStorage.getItem("portfolio_greeting_seen");
    return pathname === "/" && !stored;
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleGreetingComplete = () => {
    hasSeenIntro = true;
    try {
      sessionStorage.setItem("portfolio_greeting_seen", "true");
    } catch {
      // ignore
    }
    setShouldShowGreeting(false);
  };

  const w = dimensions.width;
  const h = dimensions.height;

  // SVG Curve Paths for standard route transitions
  const initialPath = `
    M 0 0 
    L ${w} 0 
    L ${w} ${h} 
    Q ${w / 2} ${h + 300} 0 ${h} 
    Z
  `;

  const targetPath = `
    M 0 0 
    L ${w} 0 
    L ${w} 0 
    Q ${w / 2} 0 0 0 
    Z
  `;

  const easeCurve = [0.76, 0, 0.24, 1] as const;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.85, ease: easeCurve },
    },
    exit: {
      d: targetPath,
      transition: { duration: 1.0, ease: easeCurve, delay: 0.2 },
    },
  };

  const textVariants = {
    initial: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -24,
      transition: { duration: 0.5, ease: easeCurve, delay: 0.1 },
    },
  };

  const getPageTitle = (path: string) => {
    if (routes[path]) return routes[path];
    if (path.startsWith("/project/")) return "Project";
    return "";
  };

  return (
    <>
      {/* Multi-language Greeting Loader only on FIRST arrival to Home */}
      {isHome && shouldShowGreeting && (
        <GreetingLoader onComplete={handleGreetingComplete} />
      )}

      {/* Standard Route Transition curtain ONLY for subpage navigation (About, Projects, Project Details) */}
      {!isHome && dimensions.width > 0 && (
        <div className="pointer-events-none fixed inset-0 z-[99999] h-screen w-screen">
          <motion.p
            variants={textVariants}
            initial="initial"
            animate="exit"
            className="absolute left-1/2 top-[40%] z-20 -translate-x-1/2 -translate-y-1/2 text-[24px] md:text-[32px] font-medium tracking-tight text-stone-100"
          >
            {getPageTitle(pathname)}
          </motion.p>
          <svg className="h-full w-full fill-stone-900">
            <motion.path
              variants={curveVariants}
              initial="initial"
              animate="exit"
            />
          </svg>
        </div>
      )}

      {/* Page Content Animation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: isHome && shouldShowGreeting ? 2.8 : 0.45,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
