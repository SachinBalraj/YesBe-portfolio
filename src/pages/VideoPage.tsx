import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Briefcase, MessageCircle, PlayCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHeader } from "@/components/common/PageHeader";

const resources = [
  {
    icon: BookOpen,
    title: "Written Insights",
    description: "Practical guides on AI, ERP, automation, analytics, and web development.",
    href: "/insights",
    cta: "Read the insights",
  },
  {
    icon: Briefcase,
    title: "Project Breakdowns",
    description: "How selected projects were scoped, designed, and delivered.",
    href: "/case-studies",
    cta: "View case studies",
  },
  {
    icon: MessageCircle,
    title: "Talk to YESBE",
    description: "Ask about a specific technology or project requirement directly.",
    href: "/contact",
    cta: "Start a conversation",
  },
];

export function VideoPage() {
  useSEO({
    title: "Video Library | YESBE Technologies",
    description:
      "YESBE does not currently publish a public video library. Explore our written insights, project breakdowns, and direct consultation instead.",
    canonical: "https://www.yesbe.tech/videos",
    noindex: true,
  });

  return (
    <div className="bg-ice-gradient">
      <PageHeader
        badge="Videos"
        title="Video Library"
        description="A public video library is not available yet. Our written insights and project breakdowns cover the same practical ground."
      />

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Videos" }]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-none border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.05)] sm:p-10"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
              <PlayCircle className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                No public videos yet
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                We have not published a public video library, so there are no video players or
                links here to mislead you. In the meantime, the resources below contain the
                detailed guidance you would expect from a walkthrough.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                to={resource.href}
                className="group rounded-3xl border border-slate-200/80 bg-slate-50 p-5 transition-all duration-200 hover:border-primary/30 hover:bg-white hover:shadow-card"
              >
                <resource.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-foreground">{resource.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{resource.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {resource.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
