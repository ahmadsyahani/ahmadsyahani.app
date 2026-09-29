"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";

type WipePhase = "idle" | "cover" | "reveal";

const COVER_MS = 680;
const REVEAL_MS = 680;
const NavigationContext = createContext<((href: string, replace?: boolean, scroll?: boolean) => void) | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<WipePhase>("idle");
  const busy = useRef(false);
  const routeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failsafeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (routeTimer.current) clearTimeout(routeTimer.current);
    if (finishTimer.current) clearTimeout(finishTimer.current);
    if (failsafeTimer.current) clearTimeout(failsafeTimer.current);
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    busy.current = false;
    setPhase("idle");
  }, [clearTimers]);

  useEffect(() => {
    if (!busy.current) return;
    if (routeTimer.current) clearTimeout(routeTimer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    setPhase("reveal");
    finishTimer.current = setTimeout(finish, REVEAL_MS);
  }, [pathname, finish]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const navigate = useCallback((href: string, replace = false, scroll = true) => {
    if (busy.current) return;
    busy.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) setPhase("cover");
    routeTimer.current = setTimeout(() => {
      if (replace) router.replace(href, { scroll });
      else router.push(href, { scroll });
    }, reduced ? 0 : COVER_MS);
    // Keep the current page usable if a route cannot finish loading.
    failsafeTimer.current = setTimeout(finish, 8000);
  }, [router, finish]);

  return <NavigationContext.Provider value={navigate}>
    {children}
    <div className="page-wipe" data-phase={phase} aria-hidden="true">
      <span className="page-wipe-panel" />
      <span className="page-wipe-panel" />
      <span className="page-wipe-panel" />
    </div>
  </NavigationContext.Provider>;
}

export function TransitionPage({ children }: { children: ReactNode }) {
  return <div className="transition-page">{children}</div>;
}

export default function TransitionLink({ onClick, onNavigate, ...props }: ComponentProps<typeof NextLink>) {
  const navigate = useContext(NavigationContext);
  const pathname = usePathname();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = props.href;
    if (!navigate || typeof href !== "string" || !href.startsWith("/") || href.startsWith("//") || href.split(/[?#]/)[0] === pathname) return;
    event.preventDefault();
    navigate(href, props.replace, props.scroll);
  };
  return <NextLink {...props} onClick={handleClick} onNavigate={onNavigate} />;
}
