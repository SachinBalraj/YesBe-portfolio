import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import type { VideoItem } from "@/data/videos";

interface VideoCardProps {
  video: VideoItem;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_16px_48px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_64px_rgba(15,23,42,0.12)]">
      <div className="relative overflow-hidden rounded-t-[28px] bg-slate-100">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 backdrop-blur-sm">
          <Play className="h-3.5 w-3.5 text-primary" />
          {video.duration}
        </div>
        <span className="absolute top-4 right-4 rounded-full bg-white/95 px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-sm">
          {video.platform}
        </span>
      </div>

      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">
          <span>{video.category}</span>
        </div>
        <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">{video.title}</h3>
        <p className="mb-6 text-sm leading-6 text-muted-foreground">{video.description}</p>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>{new Date(video.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          <Link
            to={video.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600"
          >
            Watch Video
          </Link>
        </div>
      </div>
    </article>
  );
}
