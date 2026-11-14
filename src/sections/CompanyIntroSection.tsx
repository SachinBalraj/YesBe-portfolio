import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

const IMAGE_WIDTHS = [480, 720, 960, 1280, 1600];
const IMAGE_SIZES = "(min-width: 1024px) 45vw, 100vw";
const AVIF_SRC_SET = IMAGE_WIDTHS.map((w) => `/images/company/yesbe-consultation-${w}.avif ${w}w`).join(", ");
const WEBP_SRC_SET = IMAGE_WIDTHS.map((w) => `/images/company/yesbe-consultation-${w}.webp ${w}w`).join(", ");
const JPEG_SRC_SET = IMAGE_WIDTHS.map((w) => `/images/company/yesbe-consultation-${w}.jpg ${w}w`).join(", ");

export function CompanyIntroSection() {
  return (
    <section id="about-yesbe" className="bg-white py-16 sm:py-20 lg:py-24" aria-label="About YESBE Technologies">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">
          <div>
            <SectionHeading
              title="A technology partner, not just a vendor"
              description="YESBE Technologies is an IT consulting and software development company. We design and build custom software, ERP systems, web applications, AI and automation tooling, and analytics dashboards."
            />

            <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.75] text-muted-foreground">
              We work with a small, senior team and keep scope explicit. That means honest timelines,
              maintainable code, and a clear handover — whether you are launching a first website or
              replacing spreadsheets with a proper system.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 py-1 text-[14px] font-semibold text-primary hover:text-[#1d4ed8]"
              >
                More about YESBE
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/sachin-balraj"
                className="inline-flex items-center gap-2 py-1 text-[14px] font-semibold text-primary hover:text-[#1d4ed8]"
              >
                Meet the founder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <figure className="w-full lg:self-start">
            <div className="aspect-[5/4] w-full overflow-hidden rounded-md bg-slate-100">
              <picture>
                <source type="image/avif" srcSet={AVIF_SRC_SET} sizes={IMAGE_SIZES} />
                <source type="image/webp" srcSet={WEBP_SRC_SET} sizes={IMAGE_SIZES} />
                <img
                  src="/images/company/yesbe-consultation-960.jpg"
                  srcSet={JPEG_SRC_SET}
                  sizes={IMAGE_SIZES}
                  alt="Business owner collaborating with an IT consultant on digital solutions"
                  width={1600}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
