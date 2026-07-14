import { useEffect, useRef, useCallback, useState } from "react";

/* ─── Variant types ─── */
type CursorVariant = "default" | "button" | "card" | "link" | "image";

/* ─── Variant config ─── */
const VARIANT_CONFIG: Record<CursorVariant, { ring: number; glow: number; dot: number }> = {
  default: { ring: 48, glow: 0.45, dot: 8 },
  button:  { ring: 56, glow: 0.65, dot: 8 },
  card:    { ring: 60, glow: 0.55, dot: 8 },
  link:    { ring: 36, glow: 0.50, dot: 6 },
  image:   { ring: 70, glow: 0.60, dot: 10 },
};

/* ─── Lerp helper ─── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ─── Detect element under cursor ─── */
function detectVariant(el: Element | null): CursorVariant {
  if (!el) return "default";
  const node = el.closest(
    'a, button, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer'
  );
  if (node) {
    if (node.tagName === "A" || node.tagName === "BUTTON" || node.getAttribute("role") === "button") {
      // Check if it's an image link
      if (node.querySelector("img") || (node as HTMLElement).querySelector("video")) return "image";
      // Check if it's a large button (CTA)
      const rect = node.getBoundingClientRect();
      if (rect.width > 120 || rect.height > 44) return "button";
      return "link";
    }
  }
  if (
    el.closest('[data-cursor="card"]') ||
    el.closest(".group") ||
    el.closest("[class*='rounded-']") ||
    el.closest("section > div > div > div")
  ) {
    // Only trigger card for substantial elements
    const rect = el.getBoundingClientRect();
    if (rect.width > 200 && rect.height > 150) return "card";
  }
  return "default";
}

/* ─── Subtle trail ─── */
const TRAIL_LENGTH = 5;
const TRAIL_LERP = 0.15;

/* ─── Component ─── */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPos = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })));

  const [variant, setVariant] = useState<CursorVariant>("default");
  const [clicking, setClicking] = useState(false);
  const [ripple, setRipple] = useState(false);

  const variantRef = useRef<CursorVariant>("default");
  const clickingRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => { variantRef.current = variant; }, [variant]);
  useEffect(() => { clickingRef.current = clicking; }, [clicking]);

  /* ── Animation loop ── */
  const tick = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const v = variantRef.current;
    const cfg = VARIANT_CONFIG[v];

    // Dot follows instantly
    pos.current.x = target.current.x;
    pos.current.y = target.current.y;

    if (dot) {
      dot.style.transform = `translate(${pos.current.x - cfg.dot / 2}px, ${pos.current.y - cfg.dot / 2}px)`;
    }

    // Ring follows with lerp
    const ringLerp = v === "image" ? 0.08 : v === "link" ? 0.12 : 0.10;
    ringPos.current.x = lerp(ringPos.current.x, pos.current.x, ringLerp);
    ringPos.current.y = lerp(ringPos.current.y, pos.current.y, ringLerp);

    if (ring) {
      const scale = clickingRef.current ? 0.7 : 1;
      ring.style.transform = `translate(${ringPos.current.x - cfg.ring / 2}px, ${ringPos.current.y - cfg.ring / 2}px) scale(${scale})`;
      ring.style.width = `${cfg.ring}px`;
      ring.style.height = `${cfg.ring}px`;
      ring.style.boxShadow = `0 0 ${cfg.ring * 0.6}px rgba(37,99,235,${cfg.glow}), 0 0 ${cfg.ring}px rgba(37,99,235,${cfg.glow * 0.5})`;
    }

    // Trail
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const prev = i === 0 ? ringPos.current : trailPos.current[i - 1];
      trailPos.current[i].x = lerp(trailPos.current[i].x, prev.x, TRAIL_LERP);
      trailPos.current[i].y = lerp(trailPos.current[i].y, prev.y, TRAIL_LERP);

      const t = trailRefs.current[i];
      if (t) {
        const size = 4 - i * 0.5;
        const opacity = 0.12 - i * 0.02;
        t.style.transform = `translate(${trailPos.current[i].x - size / 2}px, ${trailPos.current[i].y - size / 2}px)`;
        t.style.width = `${size}px`;
        t.style.height = `${size}px`;
        t.style.opacity = `${opacity}`;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  /* ── Setup ── */
  useEffect(() => {
    // Touch device check
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    // Reduced motion check
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setVariant(detectVariant(el));
    };

    const onDown = () => {
      setClicking(true);
      setRipple(true);
      setTimeout(() => setClicking(false), 150);
      setTimeout(() => setRipple(false), 600);
    };

    const onLeave = () => {
      pos.current.x = -100;
      pos.current.y = -100;
      target.current.x = -100;
      target.current.y = -100;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    // Hide default cursor globally
    document.documentElement.style.cursor = "none";

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.style.cursor = "";
    };
  }, [tick]);

  // Don't render on touch devices or reduced motion
  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) return null;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  const cfg = VARIANT_CONFIG[variant];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "normal" }}
      aria-hidden="true"
    >
      {/* Trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 rounded-full"
          style={{
            width: 4 - i * 0.5,
            height: 4 - i * 0.5,
            background: "#2563eb",
            opacity: 0.12 - i * 0.02,
            willChange: "transform",
          }}
        />
      ))}

      {/* Glow ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full"
        style={{
          width: cfg.ring,
          height: cfg.ring,
          border: "2px solid rgba(37,99,235,0.5)",
          background: "transparent",
          boxShadow: `0 0 ${cfg.ring * 0.6}px rgba(37,99,235,${cfg.glow}), 0 0 ${cfg.ring}px rgba(37,99,235,${cfg.glow * 0.5})`,
          willChange: "transform, width, height, box-shadow",
          transition: "width 0.3s cubic-bezier(0.25, 0.4, 0.25, 1), height 0.3s cubic-bezier(0.25, 0.4, 0.25, 1), border 0.3s, background 0.3s",
        }}
      />

      {/* Click ripple */}
      {ripple && (
        <div
          className="fixed top-0 left-0 rounded-full"
          style={{
            width: cfg.ring * 1.8,
            height: cfg.ring * 1.8,
            border: "1px solid rgba(37,99,235,0.25)",
            background: "transparent",
            transform: `translate(${ringPos.current.x - (cfg.ring * 1.8) / 2}px, ${ringPos.current.y - (cfg.ring * 1.8) / 2}px)`,
            animation: "cursorRipple 0.6s ease-out forwards",
            willChange: "transform, opacity",
          }}
        />
      )}

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full"
        style={{
          width: cfg.dot,
          height: cfg.dot,
          background: "#ffffff",
          boxShadow: "0 0 6px rgba(37,99,235,0.4), 0 0 12px rgba(37,99,235,0.2)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
