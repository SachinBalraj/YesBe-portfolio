import { Mail, Phone, MapPin, ArrowUp, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/constants";
import logoImg from "@/assets/images/sblogo.png";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialLinks = [
  { icon: LinkedinIcon, href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${SITE_CONFIG.email}`, label: "Email" },
  { icon: MessageCircle, href: SITE_CONFIG.social.whatsapp, label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-white" role="contentinfo" aria-label="Site footer — Contact information, quick links, and services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start">
            <img
              src={logoImg}
              alt="Sachin Balraj Logo"
              width={60}
              height={60}
              loading="lazy"
              decoding="async"
              className="h-[60px] w-[60px] object-contain rounded-lg mb-3"
            />
            <p className="text-sm font-semibold text-foreground">Sachin Balraj</p>
            <p className="text-xs text-muted-foreground">AI Engineer | Solution Architect</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-4 flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground hover:border-primary/20 hover:text-primary hover:shadow-sm transition-all duration-200"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-3 space-y-2" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-3 space-y-2" role="list">
              {["AI Solutions", "Web Development", "ERP Systems", "Power BI", "SEO & Marketing", "Business Consulting"].map((s) => (
                <li key={s}>
                  <a href="#solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-3 space-y-2.5" role="list">
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                  +91 {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                {SITE_CONFIG.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Sachin Balraj. Building Intelligent Business Solutions.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary/20 hover:text-primary transition-all duration-200"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
