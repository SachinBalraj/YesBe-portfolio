import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "@/styles/case-studies-rail.css";

const services = [
  {
    category: "BLOCKCHAIN TECHNOLOGY",
    title: "Blockchain & Data Privacy",
    description:
      "Build trust in digital operations with blockchain solutions designed for secure record-keeping, data integrity, transparency, and privacy-focused information sharing.",
    href: "/services/blockchain",
    image: "/images/challenges/web-experience-glass.webp",
    alt: "Blockchain and data privacy visual",
  },
  {
    category: "ENTERPRISE SOLUTIONS",
    title: "ERP, CRM & Business Automation",
    description:
      "Connect your business processes through integrated ERP, CRM, and automation solutions that improve productivity, reduce manual work, and simplify management.",
    href: "/services/erp-systems",
    image: "/images/case-rail/erp-management-card.webp",
    alt: "ERP, CRM and business automation visual",
  },
  {
    category: "INTELLIGENT TECHNOLOGY",
    title: "AI Solutions & Digital Transformation",
    description:
      "Transform the way your business operates with practical AI, intelligent automation, data analytics, and technology consulting.",
    href: "/services/ai-solutions",
    image: "/images/case-rail/erp-management-card.webp",
    alt: "AI solutions and digital transformation visual",
  },
] as const;

export function CaseStudiesRail() {
  return (
    <section id="selected-work" aria-label="Selected work" className="portfolio-showcase bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <h2 className="text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-[#17154C] sm:text-[2.75rem] lg:text-[3.5rem]">
            Selected Work
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#454550] sm:text-[17px]">
            A closer look at digital platforms and systems designed to solve practical business challenges.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3 lg:mt-12">
          {services.map((service) => (
            <article key={service.title} className="group h-full">
              <Link
                to={service.href}
                className="portfolio-card flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E7E7EE] bg-white text-left shadow-[0_1px_2px_rgba(16,16,24,0.04)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#17154C]/25 hover:shadow-[0_20px_45px_rgba(23,21,76,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17154C] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F5FA]">
                  <img
                    src={service.image}
                    alt={service.alt}
                    width={1600}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101018]/18 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#17154C]">
                    {service.category}
                  </p>

                  <h3 className="mt-4 text-[1.5rem] font-bold leading-[1.2] tracking-[-0.03em] text-[#101018] sm:text-[1.75rem]">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-[38ch] text-[15px] leading-7 text-[#454550]">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 pt-2 text-[14px] font-semibold text-[#17154C] sm:mt-auto sm:pt-6">
                    <span>Explore Solutions</span>
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
