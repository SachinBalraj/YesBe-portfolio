import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Send, MapPin, Phone, Mail, Globe,
  Clock, ChevronUp,
} from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import logoImg from "@/assets/images/YBlogo.png";

/* ─── SVG Icons ─── */

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ─── Data ─── */

const solutionsLinks = [
  { label: "AI Solutions", href: "/services" },
  { label: "ERP Systems", href: "/services" },
  { label: "Website Development", href: "/services" },
  { label: "Business Automation", href: "/services" },
  { label: "Cloud Solutions", href: "/services" },
  { label: "Power BI", href: "/services" },
  { label: "SEO", href: "/services" },
  { label: "GEO", href: "/services" },
  { label: "AEO", href: "/services" },
];

const companyLinks = [
  { label: "About YesBe", href: "/about" },
  { label: "Founder", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Knowledge Center", href: "/knowledge-center" },
  { label: "Pricing", href: "/pricing" },
  { label: "Careers", href: "/contact", badge: "Coming Soon" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Book Consultation", href: "/contact" },
  { label: "FAQs", href: "/pricing" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Sitemap", href: "#" },
];

const socialLinks = [
  { label: "GitHub", href: SITE_CONFIG.social.github, icon: GithubIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
];

const quickLinks = [
  { label: "GitHub", href: SITE_CONFIG.social.github, external: true },
  { label: "Email", href: `mailto:${SITE_CONFIG.email}` },
];

/* ─── Footer Column Link ─── */

function FooterLink({ href, label, badge, onNavigate }: { href: string; label: string; badge?: string; onNavigate: (h: string) => void }) {
  return (
    <li>
      <button
        onClick={() => onNavigate(href)}
        className="group flex items-center gap-2 text-[13px] text-gray-400 transition-colors duration-200 hover:text-white"
      >
        <span className="relative">
          {label}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#60A5FA] to-[#2563EB] transition-all duration-300 group-hover:w-full" />
        </span>
        {badge && (
          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">{badge}</span>
        )}
      </button>
    </li>
  );
}

/* ─── Main Footer ─── */

export function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (href: string) => {
    if (href === "#") return;
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#0B1120]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(37,99,235,0.08)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* ── Top Section: Logo + Newsletter ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]"
        >
          {/* ── Column 1: Brand + Newsletter + Social ── */}
          <div className="lg:col-span-1">
            <button onClick={() => handleNav("/")} className="group flex items-center gap-3 mb-5">
              <img src={logoImg} alt="YesBe" width={44} height={44} className="h-11 w-11 rounded-xl" />
              <span className="text-xl font-bold text-white tracking-tight">YESBE</span>
            </button>
            <p className="text-[13px] leading-relaxed text-gray-400 mb-6 max-w-xs">
              AI, ERP, web development, analytics, and automation — built for businesses that want to move faster.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mb-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 min-w-0 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  className="flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                  {subscribed ? "Subscribed!" : <><Send className="h-3.5 w-3.5" /> Subscribe</>}
                </button>
              </div>
            </form>

            {/* Social Icons */}
            <div className="flex gap-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-white hover:shadow-[0_0_16px_rgba(37,99,235,0.2)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Column 2: Solutions ── */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Solutions</h4>
            <ul className="space-y-3">
              {solutionsLinks.map((l) => (
                <FooterLink key={l.label} {...l} onNavigate={handleNav} />
              ))}
            </ul>
          </div>

          {/* ── Column 3: Company ── */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <FooterLink key={l.label} {...l} onNavigate={handleNav} />
              ))}
            </ul>
          </div>

          {/* ── Column 4: Support ── */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((l) => (
                <FooterLink key={l.label} {...l} onNavigate={handleNav} />
              ))}
            </ul>
          </div>

          {/* ── Column 5: Contact ── */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-[13px] text-gray-400 hover:text-white transition-colors">{SITE_CONFIG.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-[13px] text-gray-400 hover:text-white transition-colors">+91 {SITE_CONFIG.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-[13px] text-gray-400">{SITE_CONFIG.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-[13px] text-gray-400">Serving Clients Worldwide</span>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Business Hours</span>
              </div>
              <p className="text-[13px] text-gray-400">Mon – Sat</p>
              <p className="text-[13px] font-medium text-white">9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; 2026 YesBe. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-500">
            Designed &amp; Developed with <span className="text-red-400">❤️</span> by{" "}
            <button onClick={() => handleNav("/")} className="font-semibold text-primary hover:text-white transition-colors">YesBe</button>
          </p>
          <nav className="flex gap-4" aria-label="Quick links">
            {quickLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={(e) => { if (!l.external) { e.preventDefault(); handleNav(l.href); } }}
                className="text-xs text-gray-500 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Back to Top ── */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0F172A]/90 text-gray-400 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/20 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:-translate-y-0.5"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
