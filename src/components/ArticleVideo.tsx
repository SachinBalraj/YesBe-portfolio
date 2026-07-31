import { useState } from "react";
import { Play } from "lucide-react";
import type { VideoItem } from "@/data/videos";

interface ArticleVideoProps {
  video: VideoItem;
}

export function ArticleVideo({ video }: ArticleVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] transition-all duration-300">
      <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-center">
        <div className="group relative overflow-hidden rounded-[28px] bg-slate-900">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute inset-x-0 bottom-6 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Play className="h-6 w-6" />
          </button>
        </div>

        <div>
          <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            {video.category}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {video.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            {video.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span>Duration: {video.duration}</span>
            <span>Published: {new Date(video.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span>Platform: {video.platform}</span>
          </div>
          <a
            href={video.url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600"
          >
            Watch Video
          </a>
        </div>
      </div>
    </section>
  );
}
