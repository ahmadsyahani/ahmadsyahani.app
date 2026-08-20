"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const routes: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
};

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

  const w = dimensions.width;
  const h = dimensions.height;

  // SVG Curve Paths
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
      transition: { duration: 0.9, ease: easeCurve },
    },
    exit: {
      d: targetPath,
      transition: { duration: 1.1, ease: easeCurve, delay: 0.25 },
    },
  };

  const textVariants = {
    initial: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.55, ease: easeCurve, delay: 0.1 },
    },
  };

  // Determine current page title
  const getPageTitle = (path: string) => {
    if (routes[path]) return routes[path];
    if (path.startsWith("/project/")) return "Project";
    return "";
  };

  return (
    <>
      {/* SVG Curtain Overlay */}
      {dimensions.width > 0 && (
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
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
      >
        {children}
      </motion.div>
    </>
  );
}
