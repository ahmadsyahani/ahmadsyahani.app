"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  { text: "Hello", lang: "English" },
  { text: "Halo", lang: "Indonesian" },
  { text: "Bonjour", lang: "French" },
  { text: "Ciao", lang: "Italian" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "Olá", lang: "Portuguese" },
  { text: "Guten Tag", lang: "German" },
];

export default function GreetingLoader({ onComplete }: { onComplete?: () => void }) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", resize);

    function resize() {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  useEffect(() => {
    if (index === greetings.length - 1) {
      // Hold the final greeting slightly longer for luxury feel before lifting the curtain
      const timeout = setTimeout(() => {
        setIsFinished(true);
      }, 550);
      return () => clearTimeout(timeout);
    }

    // Relaxed, silky pacing (~380ms - 420ms)
    const intervalTime = index === 0 ? 420 : 380;
    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, intervalTime);

    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    if (isFinished) {
      // Wait for exit curtain morph animation to fully finish before calling onComplete
      const exitTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1100);
      return () => clearTimeout(exitTimer);
    }
  }, [isFinished, onComplete]);

  const w = dimension.width;
  const h = dimension.height;

  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
  const targetPath = `M0 0 L${w} 0 L${w} 0 Q${w / 2} -300 0 0 L0 0`;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] as const, delay: 0.1 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isFinished && dimension.width > 0 && (
        <motion.div
          key="greeting-loader"
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.95 } }}
          className="fixed inset-0 z-[999999] flex h-screen w-screen items-center justify-center bg-transparent pointer-events-none"
        >
          {/* Centered Clean Greeting Typography */}
          <div className="relative z-20 flex items-center justify-center select-none px-6 text-center">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-semibold tracking-[-0.03em] text-white"
            >
              {greetings[index].text}
            </motion.p>
          </div>

          {/* SVG Curved Background Curtain */}
          <svg className="absolute top-0 left-0 h-full w-full fill-stone-950 pointer-events-none">
            <motion.path
              variants={curveVariants}
              initial="initial"
              exit="exit"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
