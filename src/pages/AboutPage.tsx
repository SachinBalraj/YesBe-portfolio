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
  Hourglass,
  Layers,
  Mail,
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
  Zap,
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
import { HERO_FALLBACK, SYSTEMS_FILM, INDUSTRY_VISUALS, SERVICE_VISUALS, type ServiceVisualKey } from "@/data/media";
import { getIndustryBySlug } from "@/data/industries";
import { trackConsultationClick } from "@/utils/analytics";
import { localSrcSet } from "@/utils/images";
import { cn } from "@/utils/cn";

const horizontals: Array<{
  number: string;
  title: string;
  description: string;
  to: string;
  icon: typeof Code2;
}> = [
  {
    number: "01",
    title: "Custom Software",
    description:
      "Purpose-built platforms and internal tools for processes that generic software cannot fit without compromise.",
    to: "/services/custom-software",
    icon: Code2,
  },
  {
    number: "02",
    title: "AI & Automation",
    description:
      "Grounded AI, document intelligence and workflow automation that remove repeat work and make information easier to act on.",
    to: "/services/ai-solutions",
    icon: Brain,
  },
  {
    number: "03",
    title: "ERP & CRM Systems",
    description:
      "One operational system for finance, inventory, sales and customer records, shaped around how teams actually work.",
    to: "/services/erp-systems",
    icon: Layers,
  },
  {
    number: "04",
    title: "Digital Transformation",
    description:
      "A costed sequence for changing systems, process and ownership without creating a larger operational gap.",
    to: "/services/digital-transformation",
    icon: Compass,
  },
  {
    number: "05",
    title: "Web Applications",
    description:
      "Corporate sites, commerce and customer-facing applications built around clarity, speed and a useful next action.",
    to: "/services/web-applications",
    icon: Globe,
  },
  {
    number: "06",
    title: "Cloud & Integrations",
    description:
      "Infrastructure, APIs and data connections that keep systems available, current and maintainable.",
    to: "/services/cloud-devops",
    icon: Cloud,
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


function AboutHero() {
  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-76px)] overflow-hidden bg-[#050c23] pt-[76px] text-white sm:min-h-[88vh] lg:min-h-[calc(100vh-76px)]"
      aria-label="About YESBE Technologies"
    >
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videoabout-poster.png"
        aria-hidden="true"
      >
        <source src="/videoabout.mp4" type="video/mp4" />
      </video>
      <img
        src="/videoabout-poster.png"
        alt=""
        aria-hidden="true"
        width={1280}
        height={720}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 hidden h-full w-full object-cover object-center motion-reduce:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,12,35,0.88)_0%,rgba(5,12,35,0.60)_55%,rgba(5,12,35,0.25)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,12,35,0.18)_0%,rgba(5,12,35,0.04)_35%,rgba(5,12,35,0.28)_100%)]"
      />

      <div className="container-page relative z-10 flex w-full items-center justify-center py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[1.14] tracking-[-0.04em]">
            <span className="block text-white">We Imagine.</span>
            <span className="mt-1 block text-white sm:mt-2">We Engineer.</span>
            <span className="mt-1 block text-[#91B6FF] sm:mt-2">We Deliver.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.6] text-white/80 sm:text-[18px]">
            Building future-ready technology for ambitious businesses.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              to="/contact"
              onClick={() => trackConsultationClick("about_hero")}
              className="group inline-flex h-14 w-full items-center justify-center gap-2.5 bg-white px-8 text-sm font-semibold text-[#05132E] shadow-[0_10px_30px_rgba(5,19,46,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f4f8ff] hover:shadow-[0_14px_34px_rgba(5,19,46,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#05132e] sm:w-auto sm:min-w-[220px]"
            >
              Discuss Your Project
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              to="/services"
              className="group inline-flex h-14 w-full items-center justify-center gap-2.5 border border-white/35 bg-[#05132E]/20 px-8 text-sm font-semibold text-white backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#05132e] sm:w-auto sm:min-w-[220px]"
            >
              Explore Capabilities
              <ArrowRight className="size-4 text-[#91B6FF] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mx-auto mt-11 h-px w-full max-w-[720px] bg-white/15" aria-hidden="true" />
          <p className="mt-6 text-[11px] font-semibold tracking-[0.22em] text-white/65 sm:text-[12px] sm:whitespace-nowrap">
            CONSULTING &middot; SOFTWARE &middot; ERP &amp; CRM &middot; AI &middot; AUTOMATION &middot; CLOUD
          </p>
        </div>
      </div>
    </section>
  );
}

function DeliverablesSection() {
  return (
    <section
      className="bg-[#FFF9F4] py-14 sm:py-16 lg:py-20"
      aria-label="Our Horizontals"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10">
            <h2 className="text-left text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#17154C] sm:text-[3rem] lg:text-[4rem]">
              Our Horizontals
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-5 sm:gap-6">
          {horizontals.map((item, index) => {
            const Icon = item.icon;
            const reverse = index % 2 === 1;
            return (
              <Reveal key={item.title} delay={index * 40}>
                <Link
                  to={item.to}
                  className={cn(
                    "group flex min-h-[115px] w-full items-stretch border border-[#171717] bg-[#FFF9F4] text-left text-[#080808] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(11,31,68,0.12)] focus-visible:-translate-y-[3px] focus-visible:shadow-[0_12px_30px_rgba(11,31,68,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4DB8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9F4] motion-reduce:transform-none motion-reduce:transition-none lg:min-h-[122px]",
                    reverse ? "lg:ml-auto lg:w-[calc(100%-48px)]" : "lg:w-[calc(100%-48px)]",
                  )}
                >
                  {reverse ? (
                    <>
                      <div className="flex w-[72px] shrink-0 items-center justify-center border-r border-[#171717]/15 px-3 sm:w-[88px] sm:px-4 lg:w-[96px]">
                        <Icon className="size-7 stroke-[1.5] text-[#080808] sm:size-8" aria-hidden="true" />
                      </div>
                      <div className="flex w-[72px] shrink-0 items-center justify-center bg-[#1D4DB8] text-[1.75rem] font-semibold leading-none text-white transition-colors duration-300 group-hover:bg-[#163E96] group-focus-visible:bg-[#163E96] sm:w-[84px] sm:text-[2rem] lg:w-[90px]">
                        {item.number}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex w-[72px] shrink-0 items-center justify-center bg-[#1D4DB8] text-[1.75rem] font-semibold leading-none text-white transition-colors duration-300 group-hover:bg-[#163E96] group-focus-visible:bg-[#163E96] sm:w-[84px] sm:text-[2rem] lg:w-[90px]">
                        {item.number}
                      </div>
                      <div className="flex w-[72px] shrink-0 items-center justify-center border-r border-[#171717]/15 px-3 sm:w-[88px] sm:px-4 lg:w-[96px]">
                        <Icon className="size-7 stroke-[1.5] text-[#080808] sm:size-8" aria-hidden="true" />
                      </div>
                    </>
                  )}

                  <div className="flex min-w-0 flex-1 items-center gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1.2rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#080808] sm:text-[1.5rem] lg:text-[1.75rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-[14px] leading-6 text-[#252525] sm:text-[15px] sm:leading-7">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="size-5 shrink-0 text-[#080808] transition-transform duration-300 ease-out group-hover:translate-x-[5px] group-focus-visible:translate-x-[5px] motion-reduce:transform-none motion-reduce:transition-none sm:size-6"
                      aria-hidden="true"
                    />
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


function TransformationSection() {
  const beforeItems = [
    { text: "Requests arrive through inboxes, calls and individual memory.", icon: Mail },
    { text: "The same information is re-entered in more than one system.", icon: RefreshCw },
    { text: "Approvals wait for someone to notice the next handoff.", icon: Hourglass },
    { text: "Reporting is assembled manually after the decision was needed.", icon: BarChart3 },
  ] as const;
  const afterItems = [
    { text: "A defined intake path makes ownership and status visible.", icon: Check },
    { text: "A shared data model replaces re-entry and reconciliation.", icon: Layers },
    { text: "Approvals move through a known sequence with an audit trail.", icon: Zap },
    { text: "Reporting reads from current operational data.", icon: BarChart3 },
  ] as const;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-20" aria-label="Business transformation">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="max-w-4xl text-left text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-black">
            What changes is the path <span className="text-[#17154C]">the work takes.</span>
          </h2>
          <p className="mt-4 w-full max-w-full text-left text-[18px] leading-[1.6] text-[#4B5563] sm:text-[19px] lg:text-[20px]">
            Transformation is more than introducing new technology or changing existing processes. It is about connecting people, systems, data, and decisions into a seamless workflow that improves efficiency, strengthens accountability, and reduces operational complexity. By eliminating unnecessary steps and simplifying collaboration, businesses can operate smarter, respond faster, and achieve sustainable growth.
          </p>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-5 lg:mt-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-[20px] border border-[#D9DEE7] bg-white p-8 sm:p-10">
              <span className="inline-flex w-fit rounded-full bg-[#F3F4F6] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4B5563]">
                BEFORE
              </span>
              <h3 className="mt-5 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827] sm:text-[2rem]">
                Fragmented handoffs
              </h3>
              <ul className="mt-6 divide-y divide-[#E5E7EB]">
                {beforeItems.map(({ text, icon: Icon }) => (
                  <li key={text} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <Icon className="mt-0.5 size-5 shrink-0 text-[#6B7280]" strokeWidth={1.7} aria-hidden="true" />
                    <span className="text-[15px] leading-6 text-[#374151] sm:text-[16px]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={60} className="flex items-center justify-center py-1 lg:py-0">
            <span className="flex size-12 items-center justify-center rounded-full bg-[#17154C] text-white shadow-[0_8px_24px_rgba(23,21,76,0.18)] sm:size-14" aria-hidden="true">
              <ArrowDown className="size-5 sm:size-6 lg:hidden" strokeWidth={2} />
              <ArrowRight className="hidden size-5 sm:size-6 lg:block" strokeWidth={2} />
            </span>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="flex h-full flex-col rounded-[20px] bg-[#17154C] p-8 text-white sm:p-10">
              <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#17154C]">
                AFTER
              </span>
              <h3 className="mt-5 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[2rem]">
                Connected workflow
              </h3>
              <ul className="mt-6 divide-y divide-white/15">
                {afterItems.map(({ text, icon: Icon }) => (
                  <li key={text} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-white/35 text-white">
                      <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="text-[15px] leading-6 text-white/92 sm:text-[16px]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


function ProcessSection() {
  const milestones = [
    {
      number: "01",
      title: "Discover",
      description: "Understand business requirements, identify challenges and define project objectives.",
      x: 9.5,
      y: 28,
      labelClass: "left-[9.5%] top-[2%] w-[14%] -translate-x-1/2 text-center",
    },
    {
      number: "02",
      title: "Plan",
      description: "Establish the project scope, priorities, resources and delivery roadmap.",
      x: 34.8,
      y: 66,
      labelClass: "left-[34.8%] top-[75%] w-[13%] -translate-x-1/2 text-center",
    },
    {
      number: "03",
      title: "Architect",
      description: "Design scalable system architecture, workflows, databases and integrations.",
      x: 64.5,
      y: 67.5,
      labelClass: "left-[64.5%] top-[76.5%] w-[14%] -translate-x-1/2 text-center",
    },
    {
      number: "04",
      title: "Develop",
      description: "Build custom software, implement features and connect business systems.",
      x: 32.4,
      y: 30,
      labelClass: "left-[32.4%] top-[39%] w-[13%] -translate-x-1/2 text-center",
    },
    {
      number: "05",
      title: "Test",
      description: "Verify functionality, security, performance and reliability before release.",
      x: 63.1,
      y: 33.5,
      labelClass: "left-[63.1%] top-[42.5%] w-[13%] -translate-x-1/2 text-center",
    },
    {
      number: "06",
      title: "Deploy",
      description: "Launch the solution, configure production systems and complete the handover.",
      x: 86.2,
      y: 30,
      labelClass: "left-[86.2%] top-[3%] w-[13%] -translate-x-1/2 text-center",
    },
    {
      number: "07",
      title: "Support",
      description: "Provide maintenance, monitoring, issue resolution and continuous improvements.",
      x: 84.6,
      y: 71.5,
      labelClass: "left-[84.6%] top-[80.5%] w-[14%] -translate-x-1/2 text-center",
    },
  ] as const;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20" aria-label="How We Work">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8 text-center lg:mb-10">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.03em] text-[#17154C]">
              How We Work
            </h2>
            <p className="mt-3 text-[16px] font-medium text-[#30343B] sm:text-[18px]">
              From Discovery to Continuous Support
            </p>
          </div>
        </Reveal>

        <Reveal className="hidden lg:block">
          <div className="relative mx-auto w-full max-w-[1400px] aspect-[1754/897]">
            <img
              src="/pathimage.png"
              alt="How We Work roadmap showing seven stages from Discovery to Support"
              width={1754}
              height={897}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full select-none object-contain"
              draggable={false}
            />
            <div className="absolute inset-0">
              {milestones.map((item) => (
                <div key={item.number} className="group contents">
                  <div
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  >
                    <div className="flex size-[clamp(3rem,4.4vw,4.75rem)] items-center justify-center rounded-full text-[clamp(1.05rem,1.45vw,1.8rem)] font-bold text-white transition-[transform,box-shadow] duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0_10px_24px_rgba(23,21,76,0.28)] motion-reduce:transform-none motion-reduce:transition-none">
                      {item.number}
                    </div>
                  </div>
                  <div className={`absolute z-20 ${item.labelClass}`}>
                    <p className="text-[clamp(0.95rem,1.15vw,1.2rem)] font-bold leading-tight text-[#17154C] transition-colors duration-300 group-hover:text-[#2A277A]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[clamp(0.72rem,0.82vw,0.875rem)] leading-[1.45] text-[#30343B]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="lg:hidden">
          <ol className="relative mx-auto max-w-xl border-l border-[#17154C]/20 pl-6">
            {milestones.map((item, index) => (
              <Reveal key={item.number} as="li" delay={index * 40} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[calc(1.5rem+1.125rem)] top-0 flex size-9 items-center justify-center rounded-full bg-[#1D4DB8] text-sm font-bold text-white shadow-[0_6px_16px_rgba(23,21,76,0.18)]">
                  {item.number}
                </span>
                <h3 className="text-[1.05rem] font-bold leading-tight text-[#17154C]">{item.title}</h3>
                <p className="mt-1.5 text-[14px] leading-6 text-[#30343B]">{item.description}</p>
              </Reveal>
            ))}
          </ol>
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
      <TransformationSection />
      <ProcessSection />
      <ClosingCta
        eyebrow="Start a conversation"
        title="Bring us the operating problem."
        description="We will review the requirement, ask the questions that change the shape of the work, and recommend a practical next step."
      />
    </>
  );
}
