import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import { ArrowRight, ChevronDown, Mail, Phone, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { SITE_CONFIG } from "@/constants";
import { INDUSTRY_LINKS, PRIMARY_NAV, SOLUTION_GROUPS } from "@/constants/navigation";
import { trackConsultationClick, trackContactClick, trackPhoneClick } from "@/utils/analytics";
import logoImg from "@/assets/images/YBlogo.webp";
import type { MegaMenuKey } from "./MegaMenu";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

function mobileLinkClass(isActive: boolean) {
  return cn(
    "flex w-full items-center justify-between border-b border-line py-3.5 text-left text-[15px] font-medium transition-colors",
    isActive ? "text-primary" : "text-ink hover:text-primary",
  );
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<MegaMenuKey | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();

  const solutionsActive = location.pathname === "/services" || location.pathname.startsWith("/services/");
  const industriesActive =
    location.pathname === "/industries" || location.pathname.startsWith("/industries/");

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const getFocusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    drawer.addEventListener("keydown", handleKeyDown);
    return () => {
      drawer.removeEventListener("keydown", handleKeyDown);
      const previous = previouslyFocusedRef.current;
      if (previous && document.contains(previous)) previous.focus();
    };
  }, [open, onClose]);

  const handleNavigate = (href: string) => {
    onClose();
    navigate(href);
  };

  const toggleAccordion = (menu: MegaMenuKey) => {
    setExpanded((current) => (current === menu ? null : menu));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-40 bg-navy-deep/35 backdrop-blur-[2px] lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={drawerRef}
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[60] flex w-[min(92vw,26rem)] flex-col border-l border-line bg-paper shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-5">
              <Link
                to="/"
                onClick={onClose}
                aria-label="YESBE Technologies home"
                className="flex items-center gap-3"
              >
                <img
                  src={logoImg}
                  alt="YESBE Technologies Logo"
                  width={40}
                  height={40}
                  loading="eager"
                  decoding="async"
                  className="h-10 w-10 object-contain"
                />
                <span className="text-sm font-semibold tracking-[-0.01em] text-ink">YESBE</span>
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              <nav aria-label="Mobile navigation">
                <ul>
                  {PRIMARY_NAV.map((item) => {
                    if (item.label === "Solutions" || item.label === "Industries") {
                      const menu: MegaMenuKey = item.label === "Solutions" ? "solutions" : "industries";
                      const isActive = menu === "solutions" ? solutionsActive : industriesActive;
                      const isExpanded = expanded === menu;

                      return (
                        <li key={item.label}>
                          <button
                            type="button"
                            onClick={() => toggleAccordion(menu)}
                            aria-expanded={isExpanded}
                            aria-controls={`mobile-menu-${menu}`}
                            className={mobileLinkClass(isActive)}
                          >
                            {item.label}
                            <ChevronDown
                              className={cn(
                                "size-4 transition-transform duration-300",
                                isExpanded && "rotate-180",
                              )}
                              aria-hidden="true"
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                id={`mobile-menu-${menu}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                                className="overflow-hidden"
                              >
                                {menu === "solutions" ? (
                                  <div className="space-y-5 pb-5 pt-4">
                                    <Link
                                      to="/services"
                                      onClick={() => handleNavigate("/services")}
                                      className="link-arrow text-[13px]"
                                    >
                                      View all solutions
                                      <ArrowRight className="size-4" aria-hidden="true" />
                                    </Link>
                                    {SOLUTION_GROUPS.map((group) => (
                                      <div key={group.title}>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-body">
                                          {group.title}
                                        </p>
                                        <ul className="mt-2 space-y-0.5">
                                          {group.links.map((link) => (
                                            <li key={link.href}>
                                              <Link
                                                to={link.href}
                                                onClick={() => handleNavigate(link.href)}
                                                className="block py-1.5 text-[14px] text-ink-soft transition-colors hover:text-primary"
                                              >
                                                {link.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="pb-5 pt-4">
                                    <Link
                                      to="/industries"
                                      onClick={() => handleNavigate("/industries")}
                                      className="link-arrow text-[13px]"
                                    >
                                      View all industries
                                      <ArrowRight className="size-4" aria-hidden="true" />
                                    </Link>
                                    <ul className="mt-4 grid grid-cols-2 gap-x-4">
                                      {INDUSTRY_LINKS.map((link) => (
                                        <li key={link.href}>
                                          <Link
                                            to={link.href}
                                            onClick={() => handleNavigate(link.href)}
                                            className="block py-1.5 text-[14px] text-ink-soft transition-colors hover:text-primary"
                                          >
                                            {link.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }

                    return (
                      <li key={item.label}>
                        <NavLink
                          to={item.href}
                          end={item.href === "/"}
                          className={({ isActive }) => mobileLinkClass(isActive)}
                          onClick={onClose}
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-body">
                  Start a conversation
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    onClick={() => trackContactClick("navbar_mobile")}
                    className="flex items-center gap-2.5 text-[13px] text-ink-soft transition-colors hover:text-primary"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {SITE_CONFIG.email}
                  </a>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    onClick={() => trackPhoneClick("navbar_mobile")}
                    className="flex items-center gap-2.5 text-[13px] text-ink-soft transition-colors hover:text-primary"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    +91 {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-line bg-paper px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  trackConsultationClick("navbar_mobile");
                  handleNavigate("/contact");
                }}
                className="btn-primary w-full"
              >
                Book a Free Consultation
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
