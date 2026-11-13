import { memo } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import logoImg from "@/assets/images/YBlogo.png";
import { trackContactClick, trackPhoneClick } from "@/utils/analytics";

/* ─── SVG Icons ─── */

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ─── Data ─── */

const solutionsLinks = [
  { label: "AI Solutions", href: "/services/ai-solutions" },
  { label: "AI Chatbots", href: "/services/ai-chatbots" },
  { label: "ERP Systems", href: "/services/erp-systems" },
  { label: "Website Development", href: "/services/website-development" },
  { label: "Web Applications", href: "/services/web-applications" },
  { label: "E-Commerce", href: "/services/ecommerce" },
  { label: "Business Automation", href: "/services/business-automation" },
  { label: "Data Analytics", href: "/services/data-analytics" },
  { label: "Power BI", href: "/services/power-bi-dashboards" },
  { label: "Cloud & DevOps", href: "/services/cloud-devops" },
  { label: "Database Management", href: "/services/database-management" },
  { label: "API Development", href: "/services/api-development" },
  { label: "SEO", href: "/services/seo" },
  { label: "GEO", href: "/services/geo" },
  { label: "AEO", href: "/services/aeo" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Custom Software", href: "/services/custom-software" },
];

const companyLinks = [
  { label: "About YESBE", href: "/about" },
  { label: "Founder", href: "/sachin-balraj" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/contact#faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const socialLinks = [
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin, icon: LinkedInIcon },
  { label: "Instagram", href: "https://www.instagram.com/yesbe.co", icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/yesbe.co", icon: FacebookIcon },
  { label: "X", href: "https://x.com/yesbe_co", icon: XIcon },
];

/* ─── Footer Column Link ─── */

function FooterLink({ href, label }: { href: string; label: string }) {
  const className =
    "inline-block py-0.5 text-[13px] leading-relaxed text-slate-400 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:text-white focus-visible:underline";

  return (
    <li>
      {href.startsWith("/") ? (
        <Link to={href} className={className}>
          {label}
        </Link>
      ) : (
        <a href={href} className={className}>
          {label}
        </a>
      )}
    </li>
  );
}

/* ─── Main Footer ─── */

function FooterComponent() {
  return (
    <footer className="bg-navy text-slate-400" role="contentinfo" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" aria-label="YESBE Technologies home" className="flex items-center gap-3 mb-4">
              <img src={logoImg} loading="lazy" alt="YESBE Technologies Logo" width={40} height={40} className="h-10 w-10" />
              <span className="text-lg font-semibold tracking-tight text-white">YESBE Technologies</span>
            </Link>
            <p className="mb-5 max-w-xs text-[13px] leading-relaxed text-slate-400">
              IT consulting and software development for businesses that need practical technology partners.
            </p>
            <p className="mb-6 text-[12px] leading-relaxed text-slate-500">
              Founded by{" "}
              <Link to="/sachin-balraj" className="font-medium text-slate-300 transition-colors hover:text-white">
                Sachin Balraj
              </Link>
            </p>

            <div className="mt-6 flex gap-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center border border-white/15 text-slate-400 transition-colors hover:border-border hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h2 className="mb-4 text-[13px] font-semibold text-white">Solutions</h2>
            <ul className="space-y-2.5">
              {solutionsLinks.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="mb-4 text-[13px] font-semibold text-white">Company</h2>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="mb-4 text-[13px] font-semibold text-white">Support</h2>
            <ul className="space-y-2.5">
              {supportLinks.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-4 text-[13px] font-semibold text-white">Contact</h2>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <a href={`mailto:${SITE_CONFIG.email}`} onClick={() => trackContactClick("footer")} className="text-[13px] text-slate-400 transition-colors hover:text-white">{SITE_CONFIG.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <a href={SITE_CONFIG.phoneHref} onClick={() => trackPhoneClick("footer")} className="text-[13px] text-slate-400 transition-colors hover:text-white">+91 {SITE_CONFIG.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} YESBE Technologies. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <Link to="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
              <Link to="/cookie-policy" className="transition-colors hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
