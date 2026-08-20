import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHeader } from "@/components/common/PageHeader";
import { VideoCard } from "@/components/VideoCard";
import { videos, VIDEO_CATEGORIES } from "@/data/videos";
import { VideoSchema } from "@/components/VideoSchema";
import { trackConsultationClick } from "@/utils/analytics";

export function VideoPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Videos");

  useSEO({
    title: "Technology Explained Simply — AI, ERP & Automation Videos | YesBe",
    description: "Explore AI, ERP, automation, analytics, and digital transformation video guides from YesBe Technologies for business leaders and teams.",
    canonical: "https://www.yesbe.tech/videos",
  });

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory = category === "All Videos" || video.category === category;
      const query = search.trim().toLowerCase();
      if (!matchesCategory) return false;
      if (!query) return true;
      return [video.title, video.category, video.description, ...video.tags]
        .some((field) => field.toLowerCase().includes(query));
    });
  }, [category, search]);

  const featured = videos.find((video) => video.featured) ?? videos[0];
  const videoSchema = featured && {
    title: featured.title,
    description: featured.description,
    thumbnail: featured.thumbnail,
    url: featured.url,
    publishedDate: featured.publishedDate,
    duration: featured.duration,
  };

  return (
    <div className="bg-ice-gradient">
      <PageHeader
        badge="Videos"
        title="Technology Explained"
        highlight="Simply"
        description="Explore AI, ERP, Automation, Analytics, and digital transformation insights from YesBe."
      />

      {videoSchema && <VideoSchema video={videoSchema} />}

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Videos" }]} />

        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div className="space-y-10">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.05)]"
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Featured Video</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {featured.description}
                  </p>
                </div>
                <div className="rounded-[28px] overflow-hidden bg-slate-900">
                   <img src={featured.thumbnail} alt={featured.title} width={640} height={360} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-700">{featured.category}</span>
                <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-700">{featured.platform}</span>
                <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-700">{featured.duration}</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600"
                >
                  Watch Video
                </a>
                <Link
                  to="/contact"
                  onClick={() => trackConsultationClick("videos")}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary hover:text-primary"
                >
                  Book Free Consultation
                </Link>
              </div>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.05)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">Browse Videos</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Filter by category or search by topic.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {VIDEO_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${category === cat ? "border-primary bg-primary/10 text-primary" : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <label htmlFor="video-search" className="sr-only">Search videos</label>
                <input
                  id="video-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, category, or keyword..."
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredVideos.map((video) => (
                <VideoCard key={video.url} video={video} />
              ))}
            </motion.div>
          </div>

          <aside className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.05)]"
            >
              <h3 className="text-lg font-semibold text-foreground">Video Categories</h3>
              <ul className="mt-4 space-y-3">
                {VIDEO_CATEGORIES.slice(1).map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => setCategory(cat)}
                      className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-primary"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.05)]"
            >
              <h3 className="text-lg font-semibold text-foreground">About Our Videos</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                YesBe videos cover practical technology strategies for businesses, including AI, ERP, automation, analytics, and digital transformation.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">Trusted video insights for business leaders.</div>
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">Short walkthroughs, case studies, and founder stories.</div>
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">Easy to watch, easy to act on.</div>
              </div>
            </motion.div>
          </aside>
        </div>
      </section>
    </div>
  );
}
