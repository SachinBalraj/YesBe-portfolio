import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import type { VideoItem } from "@/data/videos";

interface FounderVideoProps {
  video: VideoItem;
  founderName: string;
  role: string;
  message: string;
}

export function FounderVideo({ video, founderName, role, message }: FounderVideoProps) {
  return (
    <section className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] transition-all duration-300">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
        <div className="relative overflow-hidden rounded-[28px] bg-slate-900">
          <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
          <button className="absolute inset-x-0 bottom-6 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-all duration-200 hover:scale-105">
            <Play className="h-5 w-5" />
          </button>
        </div>

        <div>
          <div className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Founder Video
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-foreground">{video.title}</h3>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{message}</p>
          <div className="mt-6 space-y-3 rounded-3xl bg-slate-50 p-5 text-sm text-muted-foreground">
            <div>
              <span className="block font-semibold text-foreground">Founder</span>
              <span>{founderName}</span>
            </div>
            <div>
              <span className="block font-semibold text-foreground">Role</span>
              <span>{role}</span>
            </div>
          </div>
          <Link
            to={video.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600"
          >
            Watch Founder Story
          </Link>
        </div>
      </div>
    </section>
  );
}
