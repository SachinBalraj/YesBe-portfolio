import { useState, useEffect, useRef } from "react";
import logoImg from "@/assets/images/YBlogo.png";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Progress bar */
  useEffect(() => {
    const start = Date.now();
    const duration = 1600;
    let rafId: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p < 100) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* Dismiss */
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    const safety = setTimeout(() => setVisible(false), 4000);
    return () => {
      clearTimeout(t);
      clearTimeout(safety);
    };
  }, []);

  /* Call onComplete after exit transition ends */
  useEffect(() => {
    if (visible) return;
    const el = containerRef.current;
    if (!el) return;
    const handler = () => onCompleteRef.current();
    el.addEventListener("transitionend", handler);
    const fallback = setTimeout(() => onCompleteRef.current(), 500);
    return () => {
      el.removeEventListener("transitionend", handler);
      clearTimeout(fallback);
    };
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white transition-opacity duration-400 ease-out ${visible ? "opacity-100" : "opacity-0"}`}
      aria-label="Loading"
      role="status"
    >
      <div className="pointer-events-none absolute inset-0 bg-aurora" />

      <div className="relative flex flex-col items-center">
        <div className="relative mb-8">
          <div className="h-20 w-20 sm:h-[110px] sm:w-[110px] relative z-10">
            <img
              src={logoImg}
              alt="YesBe Technologies Logo"
              width={110}
              height={110}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          YesBe
        </h1>

        <div className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground">
          <span>AI Solutions</span>
          <span className="text-primary">&middot;</span>
          <span>ERP Systems</span>
          <span className="text-primary">&middot;</span>
          <span>Business Solutions</span>
        </div>

        <p className="mt-8 text-sm font-medium text-muted-foreground animate-pulse">
          Loading...
        </p>

        <div className="mt-4 h-[3px] w-48 overflow-hidden rounded-full bg-primary/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-6 text-[11px] tracking-wide text-muted-foreground opacity-50">
          Building Intelligent Business Solutions
        </p>
      </div>
    </div>
  );
}
