import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import { ArrowRight, Mail, Phone, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { SITE_CONFIG } from "@/constants";
import { PRIMARY_NAV } from "@/constants/navigation";
import { trackConsultationClick, trackContactClick, trackPhoneClick } from "@/utils/analytics";
import logoImg from "@/assets/images/YBlogo.webp";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

function mobileLinkClass(isActive: boolean) {
  return cn(
    "flex w-full items-center justify-between border-b border-[#E8EAF0]! py-3.5 text-left text-[15px] font-medium transition-colors",
    isActive
      ? "text-[#2454E6] hover:text-[#2454E6]"
      : "text-[#171717] hover:text-[#171717]",
  );
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();

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
            className="fixed inset-y-0 right-0 z-[60] flex w-[min(92vw,26rem)] flex-col border-l border-[#E8EAF0]! bg-white shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#E8EAF0]! px-5">
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
                <span className="text-sm font-semibold tracking-[-0.01em] text-[#171717]">YESBE</span>
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex size-10 items-center justify-center border border-[#E5E7EB]! text-[#171717] transition-colors hover:border-[#CBD5E1]! hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2454E6]"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              <nav aria-label="Mobile navigation">
                <ul>
                  {PRIMARY_NAV.map((item) => (
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
                  ))}
                </ul>
              </nav>

              <div className="mt-6 border-t border-[#E8EAF0]! pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-body">
                  Start a conversation
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    onClick={() => trackContactClick("navbar_mobile")}
                    className="flex items-center gap-2.5 text-[13px] text-[#171717] transition-colors hover:text-[#171717]"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {SITE_CONFIG.email}
                  </a>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    onClick={() => trackPhoneClick("navbar_mobile")}
                    className="flex items-center gap-2.5 text-[13px] text-[#171717] transition-colors hover:text-[#171717]"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {`+91 ${SITE_CONFIG.phone}`}
                  </a>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-[#E8EAF0]! bg-white px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  trackConsultationClick("navbar_mobile");
                  handleNavigate("/contact");
                }}
                className="btn-primary w-full border-[#2454E6]! bg-[#2454E6]! text-white! shadow-[0_12px_28px_-20px_rgba(36,84,230,0.9)]! hover:border-[#1D43C5]! hover:bg-[#1D43C5]! hover:shadow-[0_18px_38px_-20px_rgba(29,67,197,0.9)]!"
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
