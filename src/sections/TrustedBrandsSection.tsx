import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations";
import apolloLogo from "@/assets/images/apollologo.png";
import fashionLogo from "@/assets/images/fflogo.png";
import rosisLogo from "@/assets/images/rosis46.png";
import balrajLogo from "@/assets/images/balraj.png";

interface Brand {
  logo: string;
  alt: string;
  name: string;
  category: string;
  status: string;
  statusColor: string;
}

const brands: Brand[] = [
  {
    logo: apolloLogo,
    alt: "Apollo Tyres Logo",
    name: "Apollo Tyres",
    category: "Corporate Business Website",
    status: "✔ Completed",
    statusColor: "text-emerald-600 bg-emerald-50",
  },
  {
    logo: fashionLogo,
    alt: "Fashion Fusion Logo",
    name: "Fashion Fusion",
    category: "E-Commerce Platform",
    status: "✔ Live Project",
    statusColor: "text-blue-600 bg-blue-50",
  },
  {
    logo: rosisLogo,
    alt: "Rosis Logo",
    name: "Rosis",
    category: "Business Website",
    status: "✔ Completed",
    statusColor: "text-emerald-600 bg-emerald-50",
  },
  {
    logo: balrajLogo,
    alt: "Balraj Logo",
    name: "Balraj",
    category: "Business Technology Consultancy",
    status: "✔ Portfolio Project",
    statusColor: "text-primary bg-primary/[0.06]",
  },
];

export function TrustedBrandsSection() {
  return (
    <section
      id="brands"
      className="relative overflow-hidden bg-white py-24 lg:py-28"
      aria-label="Trusted Projects and Brands — Businesses we've designed and developed for"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,#eaf6ff_0%,transparent_70%)]" />
        <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] h-[250px] w-[250px] rounded-full bg-[#ede9fe] opacity-[0.06] blur-[100px]" />
        {/* Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#2563eb]/[0.04]"
            style={{
              width: 4 + i * 2,
              height: 4 + i * 2,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Trusted Partners
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Trusted Projects &amp;{" "}
            <span className="text-primary">Brands</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
          />
          <motion.p variants={fadeInUp} className="mt-5 text-[15px] text-muted-foreground leading-relaxed">
            Businesses we&apos;ve built for — retail, automotive, fashion, consulting, and tech.
          </motion.p>
        </motion.div>

        {/* Logo Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="group relative flex flex-col items-center rounded-[20px] border border-white/40 bg-white p-6 transition-all duration-350 hover:border-[#2563eb]/40"
              style={{
                boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 4px 16px rgba(37,99,235,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.12), 0 16px 48px rgba(37,99,235,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(37,99,235,0.04), 0 4px 16px rgba(37,99,235,0.03)";
              }}
            >
              {/* Logo */}
              <div className="flex h-[170px] w-full items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.alt}
                  width={170}
                  height={90}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[90px] max-w-[170px] object-contain transition-transform duration-350 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="mt-4 text-center">
                <h3 className="text-sm font-bold text-foreground">{brand.name}</h3>
                <p className="mt-1 text-[12px] text-muted-foreground">{brand.category}</p>
                <span className={`mt-2.5 inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${brand.statusColor}`}>
                  {brand.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            We&apos;ve delivered digital solutions across retail, automotive, fashion, consulting, and tech.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb]/90 hover:shadow-md"
          >
            Contact YesBe
          </a>
        </motion.div>
      </div>
    </section>
  );
}
