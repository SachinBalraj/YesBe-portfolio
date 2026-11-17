import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/utils/cn";

interface FilmPlayerProps {
  webm: string;
  mp4: string;
  poster: string;
  label: string;
  autoPlay?: boolean;
  className?: string;
  videoClassName?: string;
  showFrame?: boolean;
  showScrim?: boolean;
  controlClassName?: string;
}

export function FilmPlayer({
  webm,
  mp4,
  poster,
  label,
  autoPlay = false,
  className,
  videoClassName,
  showFrame = false,
  showScrim = true,
  controlClassName,
}: FilmPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;

    if (new URLSearchParams(window.location.search).has("prerender")) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reducedMotion.matches || connection?.saveData) return;

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      video.muted = true;
      video.play().catch(() => setIsPlaying(false));
    };
    const stopForReducedMotion = () => {
      if (reducedMotion.matches) video.pause();
    };
    reducedMotion.addEventListener("change", stopForReducedMotion);
    if (video.readyState >= 2) start();
    else {
      video.preload = "metadata";
      video.load();
      video.addEventListener("canplay", start, { once: true });
    }

    return () => {
      cancelled = true;
      reducedMotion.removeEventListener("change", stopForReducedMotion);
      video.removeEventListener("canplay", start);
      video.pause();
    };
  }, [autoPlay]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <div className={cn("group/film relative overflow-hidden", showFrame && "border border-white/12", className)}>
      <img
        src={poster}
        alt=""
        width={1600}
        height={1000}
        loading={autoPlay ? "eager" : "lazy"}
        fetchPriority={autoPlay ? "high" : "auto"}
        decoding={autoPlay ? "sync" : "async"}
        className={cn("absolute inset-0 size-full object-cover", videoClassName)}
      />
      <video
        ref={videoRef}
        muted
        suppressHydrationWarning
        loop
        playsInline
        poster={poster}
        preload="none"
        disablePictureInPicture
        aria-label={`${label}. Muted looping visual.`}
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-500",
          isPlaying ? "opacity-100" : "opacity-0",
          videoClassName,
        )}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={mp4} type="video/mp4" />
        <source src={webm} type="video/webm" />
      </video>

      {showScrim && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,24,0.08),rgba(3,10,24,0.3))]" />
      )}

      {!isPlaying && !autoPlay && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play ${label}`}
          className="absolute inset-0 z-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        >
          <span className="flex size-16 items-center justify-center rounded-full border border-white/30 bg-[#05132e]/70 text-white shadow-[0_16px_50px_rgba(0,8,24,0.4)] backdrop-blur-md transition-transform duration-300 group-hover/film:scale-105 sm:size-20">
            <Play className="ml-1 size-6" fill="currentColor" aria-hidden="true" />
          </span>
        </button>
      )}

      {(isPlaying || autoPlay) && (
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
          aria-pressed={isPlaying}
          className={cn(
            "absolute bottom-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-[#041022]/65 text-white/85 opacity-100 backdrop-blur-md transition-all hover:border-white/40 hover:bg-[#041022]/85 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:opacity-0 sm:group-hover/film:opacity-100 sm:group-focus-within/film:opacity-100",
            controlClassName,
          )}
        >
          {isPlaying ? (
            <Pause className="size-4" fill="currentColor" aria-hidden="true" />
          ) : (
            <Play className="ml-0.5 size-4" fill="currentColor" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
