"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Briefcase, User, Mail } from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/Dock";
import { personalInfo } from "@/lib/data";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
    </svg>
  );
}

const data = [
  {
    title: "Home",
    icon: <Home className="h-[50%] w-[50%]" />,
    href: "/",
  },
  {
    title: "Projects",
    icon: <Briefcase className="h-[50%] w-[50%]" />,
    href: "/#projects",
  },
  {
    title: "About",
    icon: <User className="h-[50%] w-[50%]" />,
    href: "/about",
  },
  {
    title: "Contact",
    icon: <Mail className="h-[50%] w-[50%]" />,
    href: "/#contact",
  },
];

const socials = [
  {
    title: "GitHub",
    icon: <GithubIcon className="h-[50%] w-[50%]" />,
    href: personalInfo.github,
  },
  {
    title: "LinkedIn",
    icon: <LinkedinIcon className="h-[50%] w-[50%]" />,
    href: personalInfo.linkedin,
  },
];

export default function Navbar() {
  return (
    <motion.div 
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed bottom-6 left-1/2 z-50 pointer-events-none"
    >
      <Dock className="pointer-events-auto" distance={100} magnification={60} panelHeight={56}>
        {data.map((item) => (
          <DockItem key={item.title} className="aspect-square rounded-full">
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>
              <Link href={item.href} className="flex h-full w-full items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors">
                {item.icon}
              </Link>
            </DockIcon>
          </DockItem>
        ))}
        
        <div className="mx-2 flex h-full items-center">
          <div className="h-3/5 w-[1px] bg-stone-200" />
        </div>

        {socials.map((item) => (
          <DockItem key={item.title} className="aspect-square rounded-full">
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex h-full w-full items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors">
                {item.icon}
              </a>
            </DockIcon>
          </DockItem>
        ))}
      </Dock>
    </motion.div>
  );
}