import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/constants";

/**
 * No professional photograph of the founder exists in the project yet, so a
 * monogram tile is used rather than a stock photo of an unrelated person.
 *
 * TODO(founder-photo): once a real professional headshot is added to
 * `src/assets/images/`, swap the monogram below for an <img> (or Vite asset
 * import) with descriptive alt text, and pass the same file as `ogImage` on
 * the founder page so social previews match.
 */
function FounderMonogram() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[180px] w-[180px] items-center justify-center rounded-[28px] border border-white/40 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] shadow-[0_8px_40px_rgba(37,99,235,0.22)] sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px]"
    >
      <span className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
        SB
      </span>
    </div>
  );
}

const roleLines = [
  { label: "Founder of YESBE Technologies", primary: true },
  { label: "Solution Architect at Springreen", primary: false },
];

export function FounderHeroSection() {
  return (
    <section
      id="founder-hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#f8fbff] to-white py-14 lg:py-20"
      aria-label="Sachin Balraj — Founder of YESBE Technologies and Solution Architect at Springreen"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-[#dbeafe] opacity-[0.10] blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] h-[280px] w-[280px] rounded-full bg-[#ede9fe] opacity-[0.08] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-12"
        >
          {/* ── Monogram / photo slot ── */}
          <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
            <FounderMonogram />
          </motion.div>

          {/* ── Identity + roles ── */}
          <div>
            <motion.p
              variants={fadeInUp}
              className="text-xl font-extrabold text-foreground sm:text-2xl"
            >
              Founder of YESBE Technologies
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="mt-1.5 text-base font-medium text-muted-foreground sm:text-lg"
            >
              Solution Architect at Springreen
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-6 rounded-[20px] border border-white/40 bg-gradient-to-br from-[#f8fbff] to-[#eff6ff] p-6"
            >
              <p className="flex items-start gap-2.5 text-[15px] leading-relaxed text-foreground">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  Sachin Balraj is the Founder of YESBE Technologies and a Solution
                  Architect at Springreen. His work focuses on software
                  architecture, artificial intelligence, web technologies and
                  digital solutions designed to solve practical business
                  challenges.
                </span>
              </p>

              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {SITE_CONFIG.location}
                </li>
                <li className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="transition-colors hover:text-primary"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb]/90 hover:shadow-md"
              >
                Discuss Your Project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
              >
                View Services
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Role summary chips (visible, indexable text — not decorative only) ── */}
        <motion.ul
          variants={fadeInUp}
          className="mt-10 flex flex-wrap gap-2.5"
          aria-label="Professional roles"
        >
          {roleLines.map((r) => (
            <li
              key={r.label}
              className={
                r.primary
                  ? "rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-2 text-[13px] font-semibold text-primary"
                  : "rounded-full border border-white/40 bg-white px-4 py-2 text-[13px] font-semibold text-muted-foreground"
              }
            >
              {r.label}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
