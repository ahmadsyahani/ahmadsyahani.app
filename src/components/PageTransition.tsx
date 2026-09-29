"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import GreetingLoader from "@/components/GreetingLoader";
import { projects } from "@/lib/data";

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
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -28,
      scale: 0.96,
      transition: { duration: 0.5, ease: easeCurve, delay: 0.15 },
    },
  };

  // Get dynamic transition information based on route / project
  const getTransitionDetails = (path: string) => {
    if (path.startsWith("/project/")) {
      const slug = path.replace("/project/", "").split("/")[0].split("?")[0];
      const found = projects.find((p) => p.id === slug);
      if (found) {
        return {
          subtitle: `Case Study • ${found.year}`,
          title: found.title,
          tag: found.category,
        };
      }
      return {
        subtitle: "Case Study",
        title: "Project Overview",
        tag: "Selected Work",
      };
    }

    if (routes[path]) {
      return {
        subtitle: "Ahmad Syahani",
        title: routes[path],
        tag: "",
      };
    }

    return {
      subtitle: "",
      title: "",
      tag: "",
    };
  };

  const details = getTransitionDetails(pathname);

  return (
    <>
      {/* Multi-language Greeting Loader only on FIRST arrival to Home */}
      {isHome && shouldShowGreeting && (
        <GreetingLoader onComplete={handleGreetingComplete} />
      )}

      {/* Route Transition Curtain with Dynamic Project Details */}
      {!isHome && dimensions.width > 0 && details.title && (
        <div className="pointer-events-none fixed inset-0 z-[99999] h-screen w-screen">
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="exit"
            className="absolute left-1/2 top-[42%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center px-6"
          >
            {details.subtitle && (
              <span className="mb-2.5 inline-block text-[11px] md:text-[12px] font-mono font-medium uppercase tracking-[0.2em] text-stone-400">
                {details.subtitle}
              </span>
            )}
            <h2 className="text-[28px] md:text-[44px] font-medium tracking-tight text-white leading-tight">
              {details.title}
            </h2>
            {details.tag && (
              <span className="mt-3 rounded-full border border-stone-700/80 bg-stone-800/80 px-3.5 py-1 text-[12px] font-medium text-stone-300 backdrop-blur-md">
                {details.tag}
              </span>
            )}
          </motion.div>

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
