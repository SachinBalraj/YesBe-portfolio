import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { isHydrationTargetPath } from "@/utils/hydration";

type RevealTag = "div" | "section" | "article" | "li" | "figure";

interface RevealProps {
  children: ReactNode;
  as?: RevealTag;
  delay?: number;
  className?: string;
  threshold?: number;
}

type RevealState = "idle" | "hidden" | "visible";

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
  threshold = 0.15,
}: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const hydratedRoute = isHydrationTargetPath(window.location.pathname);
  const [state, setState] = useState<RevealState>(hydratedRoute ? "visible" : "idle");

  useEffect(() => {
    if (hydratedRoute) return;
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setState("visible");
      return;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (element.getBoundingClientRect().top < viewportHeight * 0.92) {
      setState("visible");
      return;
    }

    setState("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, hydratedRoute]);

  return (
    <Tag
      ref={elementRef as React.RefObject<never>}
      className={cn(state === "hidden" && "reveal-init", state === "visible" && "reveal-in", className)}
      style={delay && !hydratedRoute ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
