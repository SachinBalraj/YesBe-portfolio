import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Brain,
  Check,
  ClipboardList,
  Cloud,
  CloudUpload,
  Code2,
  Compass,
  Database,
  Globe,
  Layers,
  Map,
  Network,
  RefreshCw,
  Rocket,
  Search,
  Shield,
  Target,
  TestTube2,
  Users,
  Waypoints,
  Workflow,
} from "lucide-react";
import {
  SiDocker,
  SiExpress,
  SiGithubactions,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { TbBrandAws, TbBrandOpenai } from "react-icons/tb";
import { useSEO } from "@/hooks/useSEO";
import { SEO_DESCRIPTIONS, SEO_TITLES } from "@/constants/seoTitles";
import { JsonLd } from "@/components/common/JsonLd";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FilmPlayer } from "@/components/phase2/FilmPlayer";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import { Reveal } from "@/components/system/Reveal";
import { ServiceVisual } from "@/components/phase2/ServiceVisual";
import { HERO_FILM, SYSTEMS_FILM, INDUSTRY_VISUALS, SERVICE_VISUALS, type ServiceVisualKey } from "@/data/media";
import { getIndustryBySlug } from "@/data/industries";
import { trackConsultationClick } from "@/utils/analytics";
import { localSrcSet } from "@/utils/images";
import { cn } from "@/utils/cn";

const deliverables: Array<{
  title: string;
  description: string;
  to: string;
  visual: ServiceVisualKey;
  icon: typeof Code2;
}> = [
  {
    title: "Custom software",
    description:
      "Purpose-built platforms and internal tools for processes that generic software cannot fit without compromise.",
    to: "/services/custom-software",
    visual: "product",
    icon: Code2,
  },
  {
    title: "AI & automation",
    description:
      "Grounded AI, document intelligence and workflow automation that remove repeat work and make information easier to act on.",
    to: "/services/ai-solutions",
    visual: "intelligence",
    icon: Brain,
  },
  {
    title: "ERP & CRM systems",
    description:
      "One operational system for finance, inventory, sales and customer records, shaped around how teams actually work.",
    to: "/services/erp-systems",
    visual: "enterprise",
    icon: Boxes,
  },
  {
    title: "Digital transformation",
    description:
      "A costed sequence for changing systems, process and ownership without creating a larger operational gap.",
    to: "/services/digital-transformation",
    visual: "transformation",
    icon: Compass,
  },
  {
    title: "Web applications",
    description:
      "Corporate sites, commerce and customer-facing applications built around clarity, speed and a useful next action.",
    to: "/services/web-applications",
    visual: "web",
    icon: Globe,
  },
  {
    title: "Cloud & integrations",
    description:
      "Infrastructure, APIs and data connections that keep systems available, current and maintainable.",
    to: "/services/cloud-devops",
    visual: "cloud",
    icon: Cloud,
  },
];

const reasons = [
  {
    title: "Business first, technology second",
    description:
      "We start with the operating constraint, the people affected and the decision that needs to improve. The stack follows the requirement, not the other way around.",
    icon: Target,
  },
  {
    title: "Senior people in the work",
    description:
      "The people shaping the solution stay involved through delivery. You are not handed from a senior conversation into an unconnected build team.",
    icon: Users,
  },
  {
    title: "Scope before spend",
    description:
      "The problem, boundaries, dependencies and first useful release are agreed before a larger programme is committed.",
    icon: Search,
  },
  {
    title: "Systems designed to be maintained",
    description:
      "Clear architecture, documented decisions and code another team can understand, operate and extend.",
    icon: Layers,
  },
  {
    title: "An honest handover",
    description:
      "Access, credentials, documentation and open decisions are transferred clearly. The system should not depend on our continued presence.",
    icon: Shield,
  },
  {
    title: "Support beyond launch",
    description:
      "Launch is a monitored transition. We plan for fixes, adoption, performance and the next iteration.",
    icon: Rocket,
  },
];

const transformation = {
  before: [
    "Requests arrive through inboxes, calls and individual memory.",
    "The same information is re-entered in more than one system.",
    "Approvals wait for someone to notice the next handoff.",
    "Reporting is assembled manually after the decision was needed.",
  ],
  after: [
    "A defined intake path makes ownership and status visible.",
    "A shared data model replaces re-entry and reconciliation.",
    "Approvals move through a known sequence with an audit trail.",
    "Reporting reads from current operational data.",
  ],
};

const technologyGroups = [
  {
    label: "Frontend",
    icon: Globe,
    items: [
      ["React", SiReact],
      ["TypeScript", SiTypescript],
      ["Tailwind CSS", SiTailwindcss],
      ["Vite", SiVite],
    ],
  },
  {
    label: "Backend",
    icon: Code2,
    items: [
      ["Node.js", SiNodedotjs],
      ["Express", SiExpress],
      ["Python", SiPython],
      ["REST APIs", Network],
    ],
  },
  {
    label: "Data",
    icon: Database,
    items: [
      ["MongoDB", SiMongodb],
      ["PostgreSQL", SiPostgresql],
      ["MySQL", SiMysql],
      ["Power BI", BarChart3],
    ],
  },
  {
    label: "AI & automation",
    icon: Brain,
    items: [
      ["OpenAI", TbBrandOpenai],
      ["LangChain", SiLangchain],
      ["RAG", Layers],
      ["Workflow automation", Workflow],
    ],
  },
  {
    label: "Cloud & delivery",
    icon: Cloud,
    items: [
      ["AWS", TbBrandAws],
      ["Docker", SiDocker],
      ["Vercel", SiVercel],
      ["GitHub Actions", SiGithubactions],
    ],
  },
  {
    label: "Enterprise",
    icon: Boxes,
    items: [
      ["ERP", Boxes],
      ["CRM", Users],
      ["Integrations", Waypoints],
      ["Business intelligence", BarChart3],
    ],
  },
] as const;

const stages = [
  {
    title: "Discover",
    summary: "Understand the work before proposing the technology.",
    detail:
      "We speak to the people doing the work, review the systems in use and separate the visible symptom from the underlying constraint.",
    outputs: ["Stakeholder interviews", "System and process map", "Prioritised problem statement"],
    icon: Search,
  },
  {
    title: "Plan",
    summary: "Agree the boundary, sequence and decision points.",
    detail:
      "The first useful release, explicit exclusions, dependencies and acceptance measures are agreed in writing before a larger programme is committed.",
    outputs: ["Scope and exclusions", "Delivery sequence", "Acceptance measures"],
    icon: ClipboardList,
  },
  {
    title: "Architect",
    summary: "Design the system around the operating reality.",
    detail:
      "Data ownership, integrations, access rules and failure states are decided before implementation. Architecture is recorded so another team can follow it.",
    outputs: ["Architecture decision", "Integration map", "Permission and recovery rules"],
    icon: Map,
  },
  {
    title: "Develop",
    summary: "Build in visible increments with review built in.",
    detail:
      "Design and engineering move together in short cycles. Working software is reviewed against the actual workflow, not a slide.",
    outputs: ["Working increments", "Design system", "Implementation notes"],
    icon: Code2,
  },
  {
    title: "Test",
    summary: "Verify the workflow, not only the happy path.",
    detail:
      "Acceptance, integration, access and failure scenarios are checked against the agreed measures before the system is promoted.",
    outputs: ["Acceptance evidence", "Test coverage", "Known limitations"],
    icon: TestTube2,
  },
  {
    title: "Deploy",
    summary: "Make the transition controlled and observable.",
    detail:
      "Performance, monitoring, rollback and user preparation are checked before go-live. Deployment is a managed transition, not an announcement.",
    outputs: ["Deployment checklist", "Monitoring and recovery plan", "User preparation"],
    icon: CloudUpload,
  },
  {
    title: "Support",
    summary: "Use evidence from operation to decide what comes next.",
    detail:
      "After release we review behaviour, support issues and operational signals. Improvements are prioritised against the business outcome.",
    outputs: ["Support review", "Usage and performance review", "Next-stage roadmap"],
    icon: RefreshCw,
  },
];

const industrySlugs = ["healthcare", "education", "retail", "manufacturing", "logistics", "finance"];

const aboutIndustries = industrySlugs
  .map((slug) => {
    const industry = getIndustryBySlug(slug);
    const visual = INDUSTRY_VISUALS[slug];
    return industry && visual ? { ...industry, visual } : null;
  })
  .filter((industry): industry is NonNullable<typeof industry> => Boolean(industry));

function AboutHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#05132e] pt-[76px] text-white"
      aria-label="About YESBE Technologies"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-8 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(31,78,216,0.3),transparent_66%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-[42%] bg-[linear-gradient(118deg,transparent,rgba(122,167,255,0.07))]"
      />

      <div className="container-page relative py-10 sm:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-14">
          <div>
            <span className="eyebrow text-[#8eb5ff]">Company profile</span>
            <h1 className="mt-5 max-w-[47rem] text-[clamp(2.65rem,6vw,5.2rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-white">
              Technology Built Around <span className="text-[#8eb5ff]">Your Business.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/68 sm:text-[17px] sm:leading-8">
              YESBE Technologies is an IT consulting and software development company. We design
              custom software, ERP systems, web applications, AI and automation, and analytics around
              the way a business actually operates.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                onClick={() => trackConsultationClick("about_hero")}
                className="group inline-flex min-h-[3.25rem] items-center justify-between gap-8 bg-white px-5 py-3 text-sm font-semibold text-[#05132e] transition-colors hover:bg-[#dce8ff] sm:min-w-56"
              >
                Discuss Your Project
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="group inline-flex min-h-[3.25rem] items-center justify-between gap-8 border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/[0.06] sm:min-w-56"
              >
                Explore capabilities
                <ArrowRight className="size-4 text-[#8eb5ff] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>

            <dl className="mt-8 grid max-w-xl grid-cols-3 border-t border-white/10 pt-5">
              {[
                ["Consult", "Diagnose the constraint"],
                ["Engineer", "Build the useful release"],
                ["Support", "Operate and improve"],
              ].map(([term, detail]) => (
                <div key={term} className="border-r border-white/10 pr-4 last:border-r-0 last:pl-4 first:pl-0">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8eb5ff]">
                    {term}
                  </dt>
                  <dd className="mt-1.5 text-[11px] leading-5 text-white/60">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="border border-white/14 bg-white/[0.035] p-2 backdrop-blur-sm">
              <img
                src={SERVICE_VISUALS.company.src}
                alt="Glass-like operating system architecture connecting modules, data and interfaces"
                width={1600}
                height={1000}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="grid grid-cols-[1fr_auto] items-end gap-4 border-t border-white/10 px-3 py-3">
                <p className="max-w-xs text-[11px] leading-5 text-white/62">
                  Systems, interfaces and data designed as one operating model.
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#8eb5ff]/75">
                  YESBE / 01
                </span>
              </div>
            </div>
            <div aria-hidden="true" className="absolute -right-3 -top-3 hidden size-16 border-r border-t border-[#8eb5ff]/35 lg:block" />
            <div aria-hidden="true" className="absolute -bottom-3 -left-3 hidden size-16 border-b border-l border-white/15 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliverablesSection() {
  return (
    <section className="section-py border-b border-line bg-white" aria-label="What YESBE delivers">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="What we deliver"
            title="Six capabilities that connect strategy to operation."
            description="Most engagements combine more than one. A website needs an integration, an ERP needs reporting, and an AI workflow usually needs a process redesign underneath it."
            className="mb-8 lg:mb-10"
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((deliverable, index) => {
            const Icon = deliverable.icon;
            const large = index === 0;
            return (
              <Reveal
                key={deliverable.title}
                as="article"
                delay={index * 35}
                className={cn("h-full bg-white", large && "lg:col-span-2 lg:row-span-2")}
              >
                <Link
                  to={deliverable.to}
                  className={cn(
                    "group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                    large && "sm:grid sm:grid-cols-[0.95fr_1.05fr] lg:grid-cols-1",
                  )}
                >
                  <ServiceVisual
                    variant={deliverable.visual}
                    compact
                    className={cn(
                      "border-b border-line sm:border-b-0",
                      large ? "h-48 sm:h-full sm:border-r lg:h-64 lg:border-b lg:border-r-0" : "h-40",
                    )}
                  />
                  <div className={cn("flex flex-1 flex-col p-5 sm:p-6", large && "sm:justify-center sm:p-8 lg:justify-start")}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex size-8 items-center justify-center border border-line bg-paper text-primary">
                        <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-body/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className={cn("mt-4 font-semibold leading-[1.24] tracking-[-0.025em] text-ink transition-colors group-hover:text-primary", large ? "text-[1.35rem] sm:text-[1.5rem]" : "text-[1.12rem]")}>
                      {deliverable.title}
                    </h2>
                    <p className={cn("mt-2.5 leading-6 text-body", large ? "max-w-md text-[13.5px]" : "text-[12.5px]")}>
                      {deliverable.description}
                    </p>
                    <span className="mt-auto flex items-center justify-between gap-4 pt-5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
                      Explore
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ReasonsSection() {
  return (
    <section className="section-py bg-paper" aria-label="Why businesses choose YESBE">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why YESBE"
            title="A partner chosen for judgement, not just capacity."
            description="The difference is how decisions are made, how scope is controlled and what remains usable after the project leaves the proposal stage."
            className="mb-8 lg:mb-10"
          />
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7 lg:row-span-2">
            <div className="relative h-full min-h-[26rem] overflow-hidden bg-[#05132e] p-6 text-white sm:p-8">
              <img
                src={HERO_FILM.poster}
                alt=""
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover opacity-45"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(160deg,rgba(5,19,46,0.72),rgba(5,19,46,0.95))]" />
              <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-30" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center border border-white/20 text-[#8eb5ff]">
                    <Target className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-white/50">01</span>
                </div>
                <div className="mt-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8eb5ff]">
                    Working principle
                  </p>
                  <h3 className="mt-4 max-w-md text-[1.8rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[2.2rem]">
                    {reasons[0].title}
                  </h3>
                  <p className="mt-4 max-w-md text-[14px] leading-7 text-white/70">
                    {reasons[0].description}
                  </p>
                  <Link to="/services" className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold text-[#9fc0ff] transition-colors hover:text-white">
                    See how the work starts
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {reasons.slice(1, 3).map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={40 + index * 40} className="lg:col-span-5">
                <div className="flex h-full min-h-48 flex-col border border-line bg-white p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-9 items-center justify-center border border-line bg-paper text-primary">
                      <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-body/75">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">{reason.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-body">{reason.description}</p>
                </div>
              </Reveal>
            );
          })}

          {reasons.slice(3).map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={100 + index * 35} className="lg:col-span-4">
                <div className="flex h-full min-h-44 flex-col border border-line bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="size-4 text-primary" strokeWidth={1.7} aria-hidden="true" />
                    <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-body/75">
                      {String(index + 4).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[14px] font-semibold tracking-[-0.015em] text-ink">{reason.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-5 text-body">{reason.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TransformationSection() {
  return (
    <section className="section-py border-y border-line bg-paper-deep" aria-label="Business transformation">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Business transformation"
            title="What changes is the path the work takes."
            description="Transformation is not a new logo on the same process. It is a different sequence of ownership, data and decisions — with fewer places for work to stall."
            className="mb-8 lg:mb-10"
          />
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <Reveal className="border border-line bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-body/75">Before</p>
                <h3 className="mt-1 text-[1.1rem] font-semibold text-ink">Fragmented handoffs</h3>
              </div>
              <span className="flex size-9 items-center justify-center border border-line bg-paper text-body/60">
                <Layers className="size-4" strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>
            <ul className="mt-3 divide-y divide-line">
              {transformation.before.map((item, index) => (
                <li key={item} className="flex gap-3 py-3.5">
                  <span className="pt-0.5 font-mono text-[10px] tracking-[0.1em] text-body/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12.5px] leading-5 text-body">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={60} className="flex items-center justify-center">
            <span className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-primary">
              <ArrowDown className="size-4 lg:hidden" aria-hidden="true" />
              <ArrowRight className="hidden size-4 lg:block" aria-hidden="true" />
            </span>
          </Reveal>

          <Reveal delay={80} className="border border-line bg-[#05132e] p-5 text-white sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8eb5ff]">After</p>
                <h3 className="mt-1 text-[1.1rem] font-semibold text-white">Connected workflow</h3>
              </div>
              <span className="flex size-9 items-center justify-center border border-white/15 text-[#8eb5ff]">
                <Waypoints className="size-4" strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>
            <ul className="mt-3 divide-y divide-white/10">
              {transformation.after.map((item, index) => (
                <li key={item} className="flex gap-3 py-3.5">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-[#8eb5ff]" strokeWidth={2} aria-hidden="true" />
                  <span className="text-[12.5px] leading-5 text-white/78">{item}</span>
                  <span className="ml-auto hidden font-mono text-[10px] tracking-[0.1em] text-white/30 sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <p className="mt-4 text-[10.5px] leading-5 text-body/75">
            A working model for the change, not a maturity score. Each transformation is scoped against the systems and constraints already in place.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function TechnologySection() {
  return (
    <section className="relative overflow-hidden bg-[#05132e] py-12 text-white sm:py-16 lg:py-20" aria-label="Technology capabilities">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-25" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(31,78,216,0.24),transparent_66%)]"
      />
      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <Reveal>
            <span className="eyebrow text-[#8eb5ff]">Technology capabilities</span>
            <h2 className="mt-5 max-w-lg text-[2.05rem] font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-[2.65rem] lg:text-[2.95rem]">
              The stack follows the requirement.
            </h2>
            <p className="mt-5 max-w-md text-[14.5px] leading-7 text-white/70">
              We work with established tools where they fit and introduce something new only when the
              constraint justifies it. These are the technologies currently used across YESBE
              engagements.
            </p>
            <div className="mt-7 border border-white/12 bg-white/[0.035] p-3">
              <FilmPlayer
                {...SYSTEMS_FILM}
                className="aspect-[16/9] w-full"
                videoClassName="object-cover"
              />
              <p className="mt-2.5 px-1 text-[9.5px] font-medium uppercase tracking-[0.13em] text-white/60">
                Systems visual study / original YESBE composition
              </p>
            </div>
          </Reveal>

          <div className="grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2">
            {technologyGroups.map((group) => {
              const GroupIcon = group.icon;
              return (
                <div key={group.label} className="bg-[#071833] p-5">
                  <div className="flex items-center gap-2.5">
                    <GroupIcon className="size-4 text-[#8eb5ff]" strokeWidth={1.7} aria-hidden="true" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                      {group.label}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {group.items.map(([name, Icon]) => (
                      <li key={name} className="flex items-center gap-2.5 text-[12.5px] text-white/85">
                        <Icon className="size-3.5 shrink-0 text-[#9fc0ff]" aria-hidden="true" />
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = stages[activeStage] ?? stages[0];
  const StageIcon = stage.icon;

  return (
    <section className="section-py bg-white" aria-label="How YESBE works">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="How we work"
            title="A visible path from first conversation to operating system."
            description="Each stage produces something you can inspect, question and decide on. Select a stage to see the work and the artefacts it creates."
            className="mb-8 lg:mb-10"
          />
        </Reveal>

        <Reveal>
          <div className="border border-line bg-white">
            <div className="overflow-x-auto scrollbar-none border-b border-line">
              <div className="flex min-w-max" role="tablist" aria-label="Delivery stages">
                {stages.map((item, index) => (
                  <button
                    key={item.title}
                    id={`about-stage-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={index === activeStage}
                    aria-controls={`about-stage-panel-${index}`}
                    tabIndex={index === activeStage ? 0 : -1}
                    onClick={() => setActiveStage(index)}
                    className={cn(
                      "group relative flex min-w-[9.5rem] flex-1 items-center gap-3 border-r border-line px-4 py-4 text-left transition-colors last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:min-w-[10.5rem]",
                      index === activeStage ? "bg-paper" : "bg-white hover:bg-paper/60",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[10px] font-semibold tracking-[0.11em]",
                        index === activeStage ? "text-primary" : "text-body/65",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("text-[12.5px] font-semibold", index === activeStage ? "text-ink" : "text-body")}>
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-0.5 bg-primary transition-transform",
                        index === activeStage ? "scale-x-100" : "scale-x-0",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div
              key={stage.title}
              id={`about-stage-panel-${activeStage}`}
              role="tabpanel"
              aria-labelledby={`about-stage-tab-${activeStage}`}
              className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:p-9"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center border border-line bg-paper text-primary">
                    <StageIcon className="size-4.5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.13em] text-body/70">
                    {`Stage ${String(activeStage + 1).padStart(2, "0")} / ${String(stages.length).padStart(2, "0")}`}
                  </span>
                </div>
                <h3 className="mt-5 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[2.1rem]">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-md text-[14px] leading-6 text-body">{stage.summary}</p>
                <p className="mt-4 max-w-lg text-[14px] leading-7 text-body">{stage.detail}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStage((current) => (current + 1) % stages.length)}
                    className="btn-secondary btn-compact"
                  >
                    Next stage
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </button>
                  <Link to="/contact" className="link-arrow self-center">
                    Discuss the sequence
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                  What this stage produces
                </p>
                <ul className="mt-4 divide-y divide-line">
                  {stage.outputs.map((output, index) => (
                    <li key={output} className="flex items-center gap-3 py-3.5">
                      <span className="flex size-6 items-center justify-center border border-line bg-paper font-mono text-[9px] text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] font-medium text-ink-soft">{output}</span>
                      <Check className="ml-auto size-3.5 text-primary" strokeWidth={2} aria-hidden="true" />
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] leading-5 text-body/75">
                  The exact artefacts change with the service. The principle does not: each stage ends with evidence for the next decision.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="section-py bg-paper" aria-label="Industries served">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Industry context"
            title="Technology shaped by the operating environment."
            description="A hospital, a factory and a retail business do not need the same system. Constraints, compliance and daily workflows change what good looks like."
            action={
              <Link to="/industries" className="link-arrow">
                View all industries
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            }
            className="mb-8 lg:mb-10"
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {aboutIndustries.map((industry, index) => {
            const Icon = industry.icon;
            const feature = index < 2;
            return (
              <Reveal
                key={industry.slug}
                delay={index * 35}
                className={cn(feature ? "lg:col-span-6" : "lg:col-span-3")}
              >
                <Link
                  to={`/industries/${industry.slug}`}
                  className={cn(
                    "group relative flex h-full flex-col justify-end overflow-hidden bg-[#05132e] p-5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white",
                    feature ? "min-h-[19rem] sm:min-h-[21rem]" : "min-h-[15rem]",
                  )}
                >
                  <img
                    src={industry.visual.src}
                    srcSet={localSrcSet(industry.visual.src, [640, 960])}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    alt={industry.visual.alt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover opacity-75 transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,19,46,0.12)_10%,rgba(5,19,46,0.86)_78%,rgba(5,19,46,0.96))]" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex size-9 items-center justify-center border border-white/20 bg-[#05132e]/45 text-[#9fc0ff] backdrop-blur-sm">
                        <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <ArrowUpRight className="size-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                    </div>
                    <h3 className={cn("mt-5 font-semibold leading-[1.12] tracking-[-0.025em] text-white", feature ? "text-[1.45rem] sm:text-[1.7rem]" : "text-[1.15rem]")}>
                      {industry.title}
                    </h3>
                    <p className={cn("mt-2 line-clamp-2 max-w-sm leading-5 text-white/70", feature ? "text-[12.5px]" : "text-[11.5px]")}>
                      {industry.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  useSEO({
    title: SEO_TITLES.about,
    description: SEO_DESCRIPTIONS.about,
    canonical: "https://www.yesbe.tech/about",
  });

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: SEO_TITLES.about,
        description: SEO_DESCRIPTIONS.about,
        url: "https://www.yesbe.tech/about",
        about: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <AboutHero />
      <DeliverablesSection />
      <ReasonsSection />
      <TransformationSection />
      <TechnologySection />
      <ProcessSection />
      <IndustriesSection />
      <ClosingCta
        eyebrow="Start a conversation"
        title="Bring us the operating problem."
        description="We will review the requirement, ask the questions that change the shape of the work, and recommend a practical next step."
      />
    </>
  );
}
