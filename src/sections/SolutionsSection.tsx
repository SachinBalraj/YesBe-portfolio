import { Link } from "react-router-dom";
import {
  Brain, Globe, Boxes, BarChart3, Database, TrendingUp,
  Megaphone, Cloud, Workflow, Smartphone, Briefcase, ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

interface Solution {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
}

const solutions: Solution[] = [
  {
    title: "AI Solutions",
    description: "Custom AI tools that automate decisions and surface insights from your data.",
    icon: Brain,
    slug: "ai-solutions",
  },
  {
    title: "Website Development",
    description: "Fast, responsive websites built to convert visitors into customers.",
    icon: Globe,
    slug: "website-development",
  },
  {
    title: "ERP Systems",
    description: "Enterprise resource planning tailored to how your business actually works.",
    icon: Boxes,
    slug: "erp-systems",
  },
  {
    title: "Data Analytics & BI",
    description: "Turn raw data into dashboards and KPIs your team can act on.",
    icon: BarChart3,
    slug: "data-analytics",
  },
  {
    title: "Database Management",
    description: "Database design, optimization, and maintenance that scales with you.",
    icon: Database,
    slug: "database-management",
  },
  {
    title: "SEO & Search",
    description: "Grow organic traffic through technical SEO, GEO and AEO strategies.",
    icon: TrendingUp,
    slug: "seo",
  },
  {
    title: "Digital Marketing",
    description: "Marketing campaigns that generate qualified leads and real revenue.",
    icon: Megaphone,
    slug: "digital-marketing",
  },
  {
    title: "Cloud & DevOps",
    description: "Cloud infrastructure and deployment pipelines that just work.",
    icon: Cloud,
    slug: "cloud-devops",
  },
  {
    title: "Business Automation",
    description: "Cut manual work with automated workflows and integrations.",
    icon: Workflow,
    slug: "business-automation",
  },
  {
    title: "Custom Software",
    description: "Applications built around your specific business processes.",
    icon: Smartphone,
    slug: "custom-software",
  },
  {
    title: "Digital Transformation",
    description: "Modernise legacy systems in phases, without stopping the business.",
    icon: Workflow,
    slug: "digital-transformation",
  },
  {
    title: "IT Consulting",
    description: "Technology advisory that ties IT decisions to business needs.",
    icon: Briefcase,
    slug: "it-consulting",
  },
];

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="border-y border-border/70 bg-slate-50 py-16 sm:py-20 lg:py-24"
      aria-label="Business solutions"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Business solutions"
          description="From a single website to a full ERP rollout — we scope the work around the outcome you need."
          action={
            <Link
              to="/services"
              className="inline-flex items-center gap-2 py-1 text-[14px] font-semibold text-primary hover:text-[#1d4ed8]"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <Link
                key={solution.slug}
                to={`/services/${solution.slug}`}
                className="group flex flex-col border border-border bg-white p-6 transition-colors hover:border-slate-300 hover:bg-white"
              >
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.7} aria-hidden="true" />
                <h3 className="mt-4 text-[16px] font-semibold text-navy">{solution.title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">
                  {solution.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
