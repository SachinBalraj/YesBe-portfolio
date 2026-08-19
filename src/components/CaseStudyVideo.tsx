import type { VideoItem } from "@/data/videos";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

interface CaseStudyVideoProps {
  video: VideoItem;
}

export function CaseStudyVideo({ video }: CaseStudyVideoProps) {
  return (
    <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] transition-all duration-300">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
        <div className="relative overflow-hidden rounded-[28px] bg-slate-900">
          <img src={video.thumbnail} alt={video.title} width={280} height={158} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          <button className="absolute inset-x-0 bottom-6 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-all duration-200 hover:scale-105">
            <Play className="h-5 w-5" />
          </button>
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700">{video.category}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">{video.platform}</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">{video.title}</h3>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{video.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
            <div>
              <span className="block font-semibold text-foreground">Duration</span>
              <span>{video.duration}</span>
            </div>
            <div>
              <span className="block font-semibold text-foreground">Published</span>
              <span>{new Date(video.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
          <Link
            to={video.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600"
          >
            Watch Project Walkthrough
          </Link>
        </div>
      </div>
    </div>
  );
}
