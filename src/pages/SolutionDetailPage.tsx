import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Layers,
  Mail,
  MessageCircle,
  Target,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import {
  getSolutionSeoDescription,
  getSolutionSeoTitle,
  SEO_DESCRIPTIONS,
  SEO_TITLES,
} from "@/constants/seoTitles";
import { getSolutionBySlug, solutions, type SolutionDetail } from "@/data/solutions";
import { RELATED_ARTICLE_SLUGS, SERVICE_PILLAR_BY_SLUG } from "@/data/phase2";
import { articleBySlug } from "@/knowledge/articles";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { JsonLd } from "@/components/common/JsonLd";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/system/Reveal";
import { Eyebrow } from "@/components/system/Eyebrow";
import { ButtonLink } from "@/components/system/ButtonLink";
import { ClosingCta } from "@/components/phase2/ClosingCta";
import { ServiceVisual } from "@/components/phase2/ServiceVisual";
import { imageAt } from "@/utils/images";
import { trackConsultationClick, trackContactClick } from "@/utils/analytics";


function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `solution-faq-panel-${index}`;
  const buttonId = `solution-faq-button-${index}`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="group flex w-full items-start justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:py-6"
        >
          <span className="text-[14.5px] font-semibold leading-6 tracking-[-0.01em] text-ink transition-colors group-hover:text-primary sm:text-[15.5px]">
            {question}
          </span>
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center border border-line text-body transition-colors group-hover:border-primary/30 group-hover:text-primary">
            <ChevronDown
              className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-6 pr-8"
      >
        <p className="max-w-2xl text-[13.5px] leading-6 text-body">{answer}</p>
      </div>
    </div>
  );
}

export function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const solution = slug ? getSolutionBySlug(slug) : undefined;

  useSEO({
    title: solution ? getSolutionSeoTitle(solution.slug, solution.title) : SEO_TITLES.solutionNotFound,
    description: solution
      ? getSolutionSeoDescription(solution.slug, solution.title)
      : SEO_DESCRIPTIONS.solutionNotFound,
    canonical: solution
      ? `https://www.yesbe.tech/services/${solution.slug}`
      : "https://www.yesbe.tech/services",
  });

  if (!solution) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-paper px-6 pt-24">
        <div className="max-w-md text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-ink">Solution not found</h1>
          <p className="mt-3 text-sm leading-6 text-body">
            The service you are looking for does not exist or has moved.
          </p>
          <button
            type="button"
            onClick={() => navigate("/services")}
            className="btn-primary mt-7"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to services
          </button>
        </div>
      </div>
    );
  }

  const Icon = solution.icon;
  const visual = SERVICE_PILLAR_BY_SLUG[solution.slug] ?? "transformation";
  const serviceIndex = solutions.findIndex((item) => item.slug === solution.slug) + 1;
  const relatedSolutionsData = solution.relatedSolutions
    .map((relatedSlug) => getSolutionBySlug(relatedSlug))
    .filter((item): item is SolutionDetail => Boolean(item));
  const relatedArticles = (RELATED_ARTICLE_SLUGS[solution.slug] ?? [])
    .map((articleSlug) => articleBySlug(articleSlug))
    .filter((article): article is NonNullable<ReturnType<typeof articleBySlug>> => Boolean(article));

  return (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${solution.title} — YESBE Technologies`,
        description: solution.description,
        url: `https://www.yesbe.tech/services/${solution.slug}`,
        publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
      }} />
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: solution.title,
        description: solution.description,
        provider: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
        url: `https://www.yesbe.tech/services/${solution.slug}`,
      }} />
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: solution.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />

      <section className="relative isolate overflow-hidden bg-[#05132e] pt-[76px] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 top-8 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(31,78,216,0.26),transparent_66%)]"
        />
        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <Breadcrumbs
            items={[{ label: "Services", href: "/services" }, { label: solution.title }]}
            className="text-white/50 [&_[aria-current=page]]:text-white"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex size-10 items-center justify-center border border-white/15 bg-white/[0.06] text-[#8eb5ff]">
                  <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8eb5ff]">
                  {solution.category}
                </span>
                <span className="h-px w-6 bg-white/20" aria-hidden="true" />
                <span className="font-mono text-[10px] font-medium tracking-[0.1em] text-white/35">
                  {`Service ${String(serviceIndex).padStart(2, "0")} / ${String(solutions.length).padStart(2, "0")}`}
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-[clamp(2.55rem,5.2vw,4.65rem)] font-semibold leading-[1] tracking-[-0.052em] text-white">
                {solution.title}
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/65 sm:text-[17px] sm:leading-8">
                {solution.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  to="/contact"
                  onClick={() => trackConsultationClick("solution_hero")}
                  variant="inverted"
                  withArrow
                  className="w-full sm:w-auto"
                >
                  Discuss Your Project
                </ButtonLink>
                <a
                  href="#process"
                  className="btn-on-dark group w-full sm:w-auto"
                >
                  See the delivery process
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative border border-white/12 bg-white/[0.045] p-2">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#071a3a]">
                <ServiceVisual
                  variant={visual}
                  tone="dark"
                  className="absolute inset-0 h-full w-full"
                  compact
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,19,46,0.08)_45%,rgba(5,19,46,0.92))]"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 border-t border-white/15 pt-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
                      Capability area
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium text-white/90">{solution.shortTitle}</p>
                  </div>
                  <span className="flex size-8 items-center justify-center border border-white/15 text-[#8eb5ff]">
                    <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-7 sm:grid-cols-4 sm:gap-0">
            <div className="sm:border-r sm:border-white/10 sm:pr-6">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/40">Category</dt>
              <dd className="mt-1.5 text-[12.5px] font-medium text-white/80">{solution.category}</dd>
            </div>
            <div className="sm:border-r sm:border-white/10 sm:px-6">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/40">Capabilities</dt>
              <dd className="mt-1.5 text-[12.5px] font-medium text-white/80">{`${solution.features.length} focus areas`}</dd>
            </div>
            <div className="sm:border-r sm:border-white/10 sm:px-6">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/40">Delivery</dt>
              <dd className="mt-1.5 text-[12.5px] font-medium text-white/80">{`${solution.process.length} stages`}</dd>
            </div>
            <div className="sm:pl-6">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/40">Starts with</dt>
              <dd className="mt-1.5 text-[12.5px] font-medium text-white/80">A working session</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section-py border-b border-line bg-paper">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="The brief"
              title="What the work has to change."
              description="The service is not a fixed package. It is a response to the operating problem, the systems already in place and the outcome the business needs."
              className="mb-10 lg:mb-14"
            />
          </Reveal>

          <div className="grid gap-10 border-t border-line pt-9 lg:grid-cols-[0.47fr_0.53fr] lg:gap-16 lg:pt-12">
            <Reveal>
              <h3 className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                <Target className="size-3.5" aria-hidden="true" />
                What this solution is
              </h3>
              <p className="mt-5 text-[16px] leading-8 text-body sm:text-[17px]">{solution.overview}</p>
            </Reveal>
            <Reveal delay={70}>
              <h3 className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                <MessageCircle className="size-3.5" aria-hidden="true" />
                Why businesses need it
              </h3>
              <p className="mt-5 text-[16px] leading-8 text-body sm:text-[17px]">{solution.whyNeeded}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#05132e] py-12 text-white sm:py-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-25" />
        <div className="container-page relative">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="The constraint"
                title="The problems this work has to solve."
                tone="dark"
                description="We begin by identifying which of these is the actual constraint. Building around the wrong one creates activity without movement."
              />
            </Reveal>
            <Reveal delay={70}>
              <ol className="divide-y divide-white/10 border-t border-white/15">
                {solution.challenges.map((challenge, index) => (
                  <li key={challenge} className="grid grid-cols-[2.4rem_1fr] gap-4 py-5 sm:grid-cols-[3.5rem_1fr] sm:py-6">
                    <span className="pt-0.5 font-mono text-[10px] font-semibold tracking-[0.1em] text-[#8eb5ff]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-6 text-white/70 sm:text-[15px] sm:leading-7">{challenge}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="What the engagement can include."
              description="Each capability is selected against the scope. The work is sequenced so that dependencies are resolved before they become expensive."
              className="mb-10 lg:mb-14"
            />
          </Reveal>

          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {solution.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Reveal key={feature.title} as="article" delay={index * 35} className="h-full bg-white">
                  <div className="flex h-full flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex size-10 items-center justify-center border border-line bg-paper text-primary">
                        <FeatureIcon className="size-4.5" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-body/85">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[15.5px] font-semibold tracking-[-0.02em] text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-6 text-body">{feature.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-py border-y border-line bg-paper">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Outcomes"
                title="What changes when it works."
                description="The measure is not the number of features shipped. It is whether the work becomes faster, clearer and easier to operate."
              />
            </Reveal>
            <Reveal delay={60}>
              <ul className="grid gap-x-10 gap-y-5 border-t border-line pt-7 sm:grid-cols-2">
                {solution.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center bg-primary/10 text-primary">
                      <Check className="size-2.5" strokeWidth={2.8} aria-hidden="true" />
                    </span>
                    <span className="text-[13.5px] leading-6 text-body">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="process" className="section-py bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>The process</Eyebrow>
              <h2 className="mt-5 text-[clamp(2rem,3.7vw,3.15rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-ink">
                A sequence built around evidence.
              </h2>
              <p className="mt-5 max-w-md text-[14.5px] leading-7 text-body">
                The exact shape changes with scope. The principle does not: each stage produces
                something concrete enough to review, challenge and build on.
              </p>
              <div className="mt-8 flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.12em] text-body/85">
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                Scope adapted to the engagement
              </div>
            </Reveal>

            <Reveal delay={60}>
              <ol className="border-t border-line">
                {solution.process.map((step, index) => (
                  <li
                    key={step.step}
                    className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[5rem_1fr] sm:gap-6 sm:py-7"
                  >
                    <span className="flex size-9 items-center justify-center border border-line bg-paper font-mono text-[10px] font-semibold text-primary sm:size-10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-ink sm:text-base">
                        {step.step}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[13.5px] leading-6 text-body">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-py border-y border-line bg-paper">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Technology approach"
              title="Chosen for the environment, not for novelty."
              description="The stack has to fit the existing systems, the people who will operate it and the pace at which the business can absorb change."
              className="mb-10 lg:mb-12"
            />
          </Reveal>

          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {solution.technologies.map((technology, index) => (
              <Reveal key={technology.name} as="article" delay={index * 40} className="h-full bg-white">
                <div className="flex h-full flex-col p-6">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 text-[14px] font-semibold leading-5 tracking-[-0.015em] text-ink">
                    {technology.name}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] leading-5 text-body">{technology.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-paper">
        <div className="container-page">
          <Reveal className="relative overflow-hidden bg-[#05132e] p-6 text-white shadow-dark-panel sm:p-10 lg:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-dark opacity-35" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(49,108,255,0.24),transparent_66%)]"
            />
            <div className="relative grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-14">
              <div>
                <Eyebrow tone="dark">Why YESBE</Eyebrow>
                <h2 className="mt-5 text-[clamp(1.95rem,3.4vw,2.8rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-white">
                  Senior involvement does not end at the proposal.
                </h2>
                <p className="mt-5 max-w-md text-[14px] leading-6 text-white/60">
                  The people who scope the work remain close enough to the delivery to make
                  decisions with context.
                </p>
                <ButtonLink
                  to="/contact"
                  onClick={() => trackConsultationClick("solution_why")}
                  variant="on-dark"
                  withArrow
                  className="mt-7 w-full sm:w-auto"
                >
                  Talk through the work
                </ButtonLink>
              </div>

              <ul className="divide-y divide-white/10 border-t border-white/15">
                {solution.whyYESBE.map((item) => (
                  <li key={item.title} className="py-5 first:pt-5 last:pb-0">
                    <h3 className="text-[14px] font-semibold text-white">{item.title}</h3>
                    <p className="mt-1.5 max-w-xl text-[13px] leading-6 text-white/55">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-py border-b border-line bg-white">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Representative scope</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.9rem,3.3vw,2.7rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink">
                How an engagement can be shaped.
              </h2>
              <p className="mt-4 max-w-sm text-[13.5px] leading-6 text-body">
                This is an illustrative scope, not a client claim. It shows the kind of boundary
                we define before work begins.
              </p>
            </Reveal>

            <Reveal delay={60} className="border border-line bg-paper p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Illustrative engagement
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-body/85">
                  <Layers className="size-3.5 text-primary" aria-hidden="true" />
                  {solution.category}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-ink">
                {solution.exampleProject.title}
              </h3>
              <p className="mt-3 text-[14px] leading-7 text-body">{solution.exampleProject.scope}</p>
              <div className="mt-5 inline-flex items-center gap-2 border border-primary/15 bg-primary/[0.06] px-3 py-2">
                <Target className="size-3.5 text-primary" aria-hidden="true" />
                <span className="text-[12px] font-semibold text-primary">{solution.exampleProject.focus}</span>
              </div>
              <div className="mt-6 border-t border-line pt-5">
                <Link to="/case-studies" className="link-arrow">
                  Review selected work
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-py bg-paper">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                title="The things worth asking before you commit."
                description="If your question is not here, ask it directly. A useful answer is better than a longer brochure."
                action={
                  <Link
                    to="/contact"
                    onClick={() => trackContactClick("solution_faq")}
                    className="link-arrow"
                  >
                    Ask a question
                    <Mail className="size-4" aria-hidden="true" />
                  </Link>
                }
              />
            </Reveal>
            <Reveal delay={60}>
              <div className="border-t border-line">
                {solution.faq.map((faq, index) => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={index} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {relatedSolutionsData.length > 0 && (
        <section className="section-py border-y border-line bg-white">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="Related services"
                title="Adjacent capabilities."
                description="These services often form part of the same engagement."
                className="mb-9 lg:mb-11"
              />
            </Reveal>

            <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {relatedSolutionsData.map((related, index) => {
                const RelatedIcon = related.icon;
                return (
                  <Reveal key={related.slug} as="article" delay={index * 40} className="h-full bg-white">
                    <Link
                      to={`/services/${related.slug}`}
                      className="group flex h-full flex-col p-6 transition-colors hover:bg-paper sm:p-7"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex size-10 items-center justify-center border border-line bg-paper text-primary">
                          <RelatedIcon className="size-4.5" strokeWidth={1.7} aria-hidden="true" />
                        </span>
                        <ArrowUpRight className="size-4 text-body/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                      </div>
                      <span className="mt-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-body/85">
                        {related.category}
                      </span>
                      <h3 className="mt-1.5 text-[15.5px] font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-primary">
                        {related.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[12.5px] leading-5 text-body">{related.description}</p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section className="section-py bg-paper">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="Further reading"
                title="Useful context before the first meeting."
                action={
                  <Link to="/insights" className="link-arrow">
                    Browse insights
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                }
                className="mb-9 lg:mb-11"
              />
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {relatedArticles.map((article, index) => (
                <Reveal key={article.slug} as="article" delay={index * 50}>
                  <Link
                    to={`/insights/article/${article.slug}`}
                    className="group grid h-full grid-cols-[7.5rem_1fr] overflow-hidden border border-line bg-white transition-colors hover:border-line-strong hover:bg-white sm:grid-cols-[10rem_1fr]"
                  >
                    <div className="relative min-h-36 overflow-hidden bg-paper-deep">
                      <img
                        src={imageAt(article.featuredImage, 480, 480)}
                        alt=""
                        width={480}
                        height={480}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-4 sm:p-5">
                      <div>
                        <span className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-primary">
                          {article.category}
                        </span>
                        <h3 className="mt-2 line-clamp-3 text-[13px] font-semibold leading-5 tracking-[-0.01em] text-ink transition-colors group-hover:text-primary sm:text-[14px]">
                          {article.title}
                        </h3>
                      </div>
                      <span className="mt-4 flex items-center gap-1.5 text-[10px] font-medium text-body/85">
                        <Clock className="size-3" aria-hidden="true" />
                        {article.readingTimeText}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCta
        eyebrow="Service enquiry"
        title="Let's define the first useful release."
        description={`Bring the context behind ${solution.shortTitle.toLowerCase()}. We will separate the constraint from the symptom and recommend a practical starting point.`}
      />

    </>
  );
}
