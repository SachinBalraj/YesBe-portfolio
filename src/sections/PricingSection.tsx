import { motion } from "framer-motion";
import { Rocket, Bot, BarChart3, Building2, ArrowRight, MessageCircle, Info } from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import type { LucideIcon } from "lucide-react";

/* ─── Pricing data ─── */

const pricingRows = [
  { service: "Landing Page", from: "₹4,999", to: "₹12,999" },
  { service: "Portfolio Website", from: "₹6,999", to: "₹18,999" },
  { service: "Business Website", from: "₹9,999", to: "₹35,999" },
  { service: "Corporate Website", from: "₹15,999", to: "₹59,999" },
  { service: "E-Commerce Website", from: "₹19,999", to: "₹99,999+" },
  { service: "Custom Web Application", from: "₹29,999", to: "₹2,50,000+" },
  { service: "ERP System", from: "₹39,999", to: "₹10,00,000+" },
  { service: "Power BI Dashboard", from: "₹7,999", to: "₹49,999" },
  { service: "Business Analytics Dashboard", from: "₹9,999", to: "₹1,50,000+" },
  { service: "AI Chatbot Integration", from: "₹9,999", to: "₹75,000+" },
  { service: "RAG Implementation", from: "₹14,999", to: "₹2,00,000+" },
  { service: "Database Design & Management", from: "₹5,999", to: "₹75,000+" },
  { service: "Cloud Deployment (AWS/Azure)", from: "₹4,999", to: "₹60,000+" },
  { service: "API Integration", from: "₹2,999", to: "₹50,000+" },
  { service: "Business Automation", from: "₹14,999", to: "₹3,00,000+" },
  { service: "SEO Optimization", from: "₹3,999/mo", to: "₹35,000/mo" },
  { service: "GEO Optimization", from: "₹4,999/mo", to: "₹45,000/mo" },
  { service: "AEO Optimization", from: "₹4,999/mo", to: "₹35,000/mo" },
  { service: "Digital Marketing", from: "₹5,999/mo", to: "₹1,00,000/mo" },
  { service: "Technical Consultation", from: "₹499/hr", to: "₹5,000/hr" },
];

/* ─── Highlight cards ─── */

interface HighlightCard {
  icon: LucideIcon;
  label: string;
  price: string;
  gradient: string;
  iconColor: string;
}

const highlights: HighlightCard[] = [
  {
    icon: Rocket,
    label: "Website Development",
    price: "₹4,999",
    gradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    iconColor: "#2563eb",
  },
  {
    icon: Bot,
    label: "AI Solutions",
    price: "₹9,999",
    gradient: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
    iconColor: "#7c3aed",
  },
  {
    icon: BarChart3,
    label: "Power BI Dashboards",
    price: "₹7,999",
    gradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    iconColor: "#d97706",
  },
  {
    icon: Building2,
    label: "ERP Solutions",
    price: "₹39,999",
    gradient: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    iconColor: "#059669",
  },
];

/* ─── Note bullet items ─── */

const noteItems = [
  "Business requirements",
  "Features",
  "Number of modules",
  "Third-party integrations",
  "Design complexity",
  "Timeline",
  "Deployment requirements",
  "Maintenance and support",
];

/* ─── Main component ─── */

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-24 lg:py-32" aria-label="Pricing — Transparent pricing for web development, AI solutions, ERP, Power BI, and consulting services">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,#eaf6ff_0%,transparent_50%)]" />
        <div className="absolute top-[20%] right-[5%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.12] blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.10] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="mb-16 text-center lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5F0FF] bg-[#eff6ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#2563eb]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
            Pricing
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[56px]"
          >
            <span className="bg-gradient-to-r from-[#0f172a] via-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
              Pricing
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#64748B]"
          >
            Flexible Pricing for Businesses of Every Size
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mt-3 max-w-3xl text-[15px] leading-relaxed text-[#94a3b8]"
          >
            Every project is unique. Below are our estimated pricing ranges. Final pricing depends on project scope, required features, integrations, timeline, and business requirements.
          </motion.p>
        </div>

        {/* ── Pricing table ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto mb-16 max-w-5xl overflow-hidden rounded-[24px] border border-[#E5F0FF] bg-white"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 8px 32px rgba(37,99,235,0.06), 0 24px 60px rgba(0,0,0,0.02)",
          }}
        >
          {/* Sticky header */}
          <div className="sticky top-0 z-20 grid grid-cols-[1fr_140px_140px] border-b border-[#E5F0FF] bg-[#f8fbff]/90 backdrop-blur-md sm:grid-cols-[1fr_160px_160px]">
            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#64748B] sm:px-8 sm:py-5 sm:text-sm">
              Service
            </div>
            <div className="px-4 py-4 text-right text-xs font-bold uppercase tracking-widest text-[#64748B] sm:px-6 sm:py-5 sm:text-sm">
              Starting From
            </div>
            <div className="px-4 py-4 text-right text-xs font-bold uppercase tracking-widest text-[#64748B] sm:px-6 sm:py-5 sm:text-sm">
              Up To
            </div>
          </div>

          {/* Rows */}
          {pricingRows.map((row, i) => (
            <motion.div
              key={row.service}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.4), ease: [0.25, 0.4, 0.25, 1] }}
              className={`group grid cursor-default grid-cols-[1fr_140px_140px] items-center transition-all duration-300 hover:bg-[#eff6ff]/60 sm:grid-cols-[1fr_160px_160px] ${
                i < pricingRows.length - 1 ? "border-b border-[#E5F0FF]/70" : ""
              }`}
            >
              <div className="flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4">
                <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]/25 transition-all duration-300 group-hover:h-2 group-hover:w-2 group-hover:bg-[#2563eb]/60 sm:block" />
                <span className="text-[14px] font-medium text-[#0F172A] transition-colors duration-300 group-hover:text-[#2563eb] sm:text-[15px]">
                  {row.service}
                </span>
              </div>
              <div className="px-4 py-3.5 text-right sm:px-6 sm:py-4">
                <span className="text-[14px] font-bold text-[#0F172A] transition-colors duration-300 group-hover:text-[#2563eb] sm:text-[15px]">
                  {row.from}
                </span>
              </div>
              <div className="px-4 py-3.5 text-right sm:px-6 sm:py-4">
                <span className="text-[14px] font-semibold text-[#64748B] transition-colors duration-300 group-hover:text-[#2563eb]/80 sm:text-[15px]">
                  {row.to}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Highlight cards ── */}
        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
              className="group relative overflow-hidden rounded-[24px] border border-[#E5F0FF] bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: "0 1px 2px rgba(0,0,0,0.02), 0 4px 16px rgba(37,99,235,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.10), 0 16px 48px rgba(37,99,235,0.05)";
                e.currentTarget.style.borderColor = "#bfdbfe";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.02), 0 4px 16px rgba(37,99,235,0.04)";
                e.currentTarget.style.borderColor = "#E5F0FF";
              }}
            >
              {/* Decorative glow */}
              <div
                className="absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: card.gradient, filter: "blur(30px)" }}
              />

              <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: card.gradient }}>
                <card.icon className="h-6 w-6" style={{ color: card.iconColor }} strokeWidth={1.8} />
              </div>
              <p className="mb-1 text-[14px] font-semibold text-[#0F172A]">{card.label}</p>
              <p className="text-xs font-medium text-[#94a3b8]">Starting From</p>
              <p className="mt-1 text-xl font-extrabold text-[#2563eb]">{card.price}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Note card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-4xl overflow-hidden rounded-[24px] border border-[#E5F0FF] bg-gradient-to-br from-[#f8fbff] to-[#eff6ff]"
          style={{
            boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 8px 32px rgba(37,99,235,0.03)",
          }}
        >
          <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-start sm:p-10">
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eff6ff]">
              <Info className="h-5 w-5 text-[#2563eb]" strokeWidth={2} />
            </div>

            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold text-[#0F172A]">Pricing Transparency</h3>
              <p className="mb-5 text-[15px] leading-relaxed text-[#64748B]">
                Pricing shown above is indicative only. The final quotation depends on:
              </p>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {noteItems.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[10px] font-bold text-[#2563eb]">
                      ✓
                    </span>
                    <span className="text-[14px] font-medium text-[#0F172A]">{item}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[14px] leading-relaxed text-[#64748B]">
                A detailed proposal with transparent pricing and milestones will be shared after understanding your project.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── CTA section ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-[#E5F0FF] bg-gradient-to-br from-white via-[#f8fbff] to-[#eff6ff] p-10 text-center sm:p-14"
          style={{
            boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 12px 40px rgba(37,99,235,0.06), 0 32px 80px rgba(0,0,0,0.02)",
          }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl"
          >
            Need a Custom Quote?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mb-10 max-w-xl text-[15px] leading-relaxed text-[#64748B]"
          >
            Every business is unique. Let's discuss your requirements and provide a personalized solution tailored to your goals and budget.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            {/* Primary CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-[#2563eb]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2563eb]/30"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#E5F0FF] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0F172A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:shadow-md"
            >
              Get Custom Quote
              <ArrowRight className="h-4 w-4 text-[#2563eb] transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            {/* WhatsApp CTA */}
            <a
              href={SITE_CONFIG.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#E5F0FF] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0F172A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfdbfe] hover:shadow-md"
            >
              <MessageCircle className="h-4 w-4 text-[#25c06c]" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
