import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface VideoSource {
  src: string;
  type: string;
}

interface BackgroundVideoProps {
  sources: VideoSource[];
  poster: string;
  className?: string;
  ratio?: string;
  overlayClassName?: string;
  children?: ReactNode;
  lazy?: boolean;
}

export function BackgroundVideo({
  sources,
  poster,
  className,
  ratio = "aspect-video",
  overlayClassName,
  children,
  lazy = true,
}: BackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (prefersReducedMotion || connection?.saveData) return;

    setCanPlay(true);

    if (!lazy || !("IntersectionObserver" in window)) {
      video.play().catch(() => setFailed(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => setFailed(true));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [lazy]);

  return (
    <div
      ref={containerRef}
      className={cn("media-frame relative isolate", ratio, className)}
    >
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />

      {canPlay && !failed && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      )}

      <div className={cn("absolute inset-0 bg-navy-deep/45", overlayClassName)} />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
