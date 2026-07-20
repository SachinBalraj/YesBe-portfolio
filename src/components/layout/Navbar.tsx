import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu, X, ArrowRight, ChevronDown,
  Bot, Brain, Building2, Globe, Code2, Workflow,
  BarChart3, Cloud, Database, LayoutDashboard,
  Rocket, Users, TrendingUp, Heart, GraduationCap,
  ShoppingBag, Factory, Truck, Utensils, Home,
  Briefcase, Megaphone, Search, Link2,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/utils/cn";
import logoImg from "@/assets/images/YBlogo.png";

/* ─── Navigation Data ─── */

interface NavDropdownItem {
  label: string;
  href: string;
  icon: typeof Brain;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "Company Overview", href: "/about", icon: Building2, description: "Who we are and what we do" },
      { label: "Founder", href: "/about", icon: Users, description: "Meet the founder" },
      { label: "Why YesBe", href: "/about", icon: TrendingUp, description: "What sets us apart" },
      { label: "Our Process", href: "/about", icon: Workflow, description: "How we deliver results" },
    ],
  },
  {
    label: "Solutions",
    href: "/services",
    dropdown: [
      { label: "AI Solutions", href: "/services", icon: Brain, description: "AI tools that automate decisions" },
      { label: "AI Chatbots", href: "/services", icon: Bot, description: "Chatbots for support and leads" },
      { label: "ERP Systems", href: "/services", icon: LayoutDashboard, description: "Enterprise resource planning" },
      { label: "Website Development", href: "/services", icon: Globe, description: "Fast, responsive web apps" },
      { label: "Custom Software", href: "/services", icon: Code2, description: "Software built for your business" },
      { label: "Business Automation", href: "/services", icon: Workflow, description: "Cut repetitive manual tasks" },
      { label: "Data Analytics", href: "/services", icon: BarChart3, description: "Data into actionable insights" },
      { label: "Power BI Dashboards", href: "/services", icon: BarChart3, description: "Interactive BI reporting" },
      { label: "Cloud & DevOps", href: "/services", icon: Cloud, description: "Cloud infrastructure and CI/CD" },
      { label: "Database Management", href: "/services", icon: Database, description: "Optimized data storage" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    dropdown: [
      { label: "Startups", href: "/industries", icon: Rocket, description: "MVPs and scaling" },
      { label: "SMEs", href: "/industries", icon: Briefcase, description: "Affordable enterprise tools" },
      { label: "Large Enterprises", href: "/industries", icon: Building2, description: "Complex system integration" },
      { label: "Healthcare", href: "/industries", icon: Heart, description: "Hospital and clinic systems" },
      { label: "Education", href: "/industries", icon: GraduationCap, description: "School and college ERP" },
      { label: "Retail", href: "/industries", icon: ShoppingBag, description: "POS, inventory, e-commerce" },
      { label: "Manufacturing", href: "/industries", icon: Factory, description: "Production and supply chain" },
      { label: "Logistics", href: "/industries", icon: Truck, description: "Fleet and warehouse ops" },
      { label: "Restaurants", href: "/industries", icon: Utensils, description: "Order and menu management" },
      { label: "Real Estate", href: "/industries", icon: Home, description: "Property and CRM tools" },
    ],
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    dropdown: [
      { label: "AI Projects", href: "/case-studies", icon: Brain, description: "Intelligent solutions we built" },
      { label: "ERP Projects", href: "/case-studies", icon: LayoutDashboard, description: "Enterprise resource planning" },
      { label: "Web Applications", href: "/case-studies", icon: Globe, description: "Full-stack web platforms" },
      { label: "E-Commerce", href: "/case-studies", icon: ShoppingBag, description: "Online store implementations" },
      { label: "Data Analytics", href: "/case-studies", icon: BarChart3, description: "Dashboard and reporting projects" },
      { label: "Automation Solutions", href: "/case-studies", icon: Workflow, description: "Workflow automation case studies" },
    ],
  },
  {
    label: "Knowledge Center",
    href: "/knowledge-center",
    dropdown: [
      { label: "AI", href: "/knowledge-center", icon: Brain, description: "AI guides and insights" },
      { label: "ERP", href: "/knowledge-center", icon: LayoutDashboard, description: "ERP explained" },
      { label: "Web Development", href: "/knowledge-center", icon: Globe, description: "Frontend and backend guides" },
      { label: "Power BI", href: "/knowledge-center", icon: BarChart3, description: "BI and analytics guides" },
      { label: "SEO", href: "/knowledge-center", icon: Search, description: "Search optimization" },
      { label: "GEO", href: "/knowledge-center", icon: Megaphone, description: "AI search optimization" },
      { label: "AEO", href: "/knowledge-center", icon: MessageCircle, description: "Answer engine optimization" },
      { label: "LangChain", href: "/knowledge-center", icon: Link2, description: "AI framework guides" },
      { label: "RAG", href: "/knowledge-center", icon: Database, description: "Retrieval-augmented generation" },
      { label: "Business Automation", href: "/knowledge-center", icon: Workflow, description: "Workflow automation guides" },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

/* ─── Desktop Dropdown ─── */

function DesktopDropdown({ item, isActive, onNavigate }: { item: NavItem; isActive: boolean; onNavigate: (href: string) => void }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current ?? undefined);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current ?? undefined);
  }, []);

  if (!item.dropdown) {
    return (
      <button
        onClick={() => onNavigate(item.href)}
        className={cn(
          "relative shrink-0 px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-200",
          isActive
            ? "text-[#2563EB]"
            : "text-[#1E293B] hover:text-[#2563EB]",
        )}
        style={{ letterSpacing: "0.2px" }}
      >
        {item.label}
        {isActive && (
          <motion.div
            layoutId="nav-active"
            className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#2563EB]"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
      </button>
    );
  }

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className={cn(
          "relative flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-200",
          isActive
            ? "text-[#2563EB]"
            : "text-[#1E293B] hover:text-[#2563EB]",
        )}
        style={{ letterSpacing: "0.2px" }}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => onNavigate(item.href)}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200 opacity-50",
            open && "rotate-180",
          )}
        />
        {isActive && (
          <motion.div
            layoutId="nav-active"
            className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#2563EB]"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute left-1/2 top-full z-50 mt-3 w-[420px] -translate-x-1/2 rounded-2xl border border-[#e2e8f0] bg-white/95 p-3 shadow-[0_8px_40px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="grid grid-cols-2 gap-1">
              {item.dropdown.map((sub) => (
                <button
                  key={sub.label}
                  onClick={() => { onNavigate(sub.href); setOpen(false); }}
                  className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-[#f1f5f9] text-left"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#2563EB] transition-colors duration-200 group-hover:bg-[#2563EB] group-hover:text-white">
                    <sub.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-[#1E293B] group-hover:text-[#2563EB] transition-colors">{sub.label}</p>
                    {sub.description && (
                      <p className="mt-0.5 text-[11px] leading-snug text-[#64748B]">{sub.description}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile Accordion ─── */

function MobileAccordion({ item, isActive, onNavigate }: { item: NavItem; isActive: boolean; onNavigate: (href: string) => void }) {
  const [open, setOpen] = useState(false);

  if (!item.dropdown) {
    return (
      <button
        onClick={() => onNavigate(item.href)}
        className={cn(
          "flex w-full items-center rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 text-left",
          isActive ? "bg-[#eff6ff] text-[#2563EB]" : "text-[#1E293B] hover:bg-[#f8fafc]",
        )}
        style={{ letterSpacing: "0.2px" }}
      >
        {item.label}
        {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#2563EB]" />}
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200",
          isActive ? "bg-[#eff6ff] text-[#2563EB]" : "text-[#1E293B] hover:bg-[#f8fafc]",
        )}
        style={{ letterSpacing: "0.2px" }}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200 opacity-50", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-[#e2e8f0] pl-3">
              {item.dropdown.map((sub) => (
                <button
                  key={sub.label}
                  onClick={() => onNavigate(sub.href)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-[#64748B] transition-colors hover:bg-[#f8fafc] hover:text-[#1E293B] text-left"
                >
                  <sub.icon className="h-3.5 w-3.5 shrink-0 text-[#2563EB]/60" />
                  <span>{sub.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Navbar ─── */

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 10);

      if (currentY > 200) {
        setHidden(currentY > lastScrollY.current && currentY - lastScrollY.current > 5);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleNavigate = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.header
        role="banner"
        initial={false}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-[#e2e8f0]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_24px_rgba(0,0,0,0.03)]"
            : "bg-white",
        )}
      >
        <nav
          className="mx-auto flex h-[80px] items-center px-10"
          style={{ maxWidth: "1280px" }}
          aria-label="Main navigation"
          role="navigation"
        >
          {/* ── Logo ── */}
          <button
            onClick={() => handleNavigate("/")}
            className="relative z-10 flex shrink-0 items-center group mr-8"
          >
            <img
              src={logoImg}
              alt="YesBe Logo"
              width={60}
              height={60}
              loading="eager"
              decoding="async"
              className="h-[56px] w-[56px] object-contain rounded-xl transition-all duration-300 ease-out group-hover:scale-105"
            />
          </button>

          {/* ── Desktop Navigation ── */}
          <div className="hidden shrink items-center gap-1 xl:flex">
            {NAV_ITEMS.map((item) => (
              <DesktopDropdown
                key={item.label}
                item={item}
                isActive={location.pathname === item.href}
                onNavigate={handleNavigate}
              />
            ))}
          </div>

          {/* ── Spacer ── */}
          <div className="flex-1" aria-hidden="true" />

          {/* ── CTA + Mobile Toggle ── */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => handleNavigate("/contact")}
              className="hidden xl:inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] px-7 py-[14px] text-[15px] font-semibold leading-[1.2] tracking-[0.2px] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25),0_8px_24px_rgba(37,99,235,0.12)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(37,99,235,0.35),0_16px_48px_rgba(37,99,235,0.15)] hover:-translate-y-0.5"
            >
              Book Free Consultation
              <ArrowRight className="h-[18px] w-[18px] shrink-0" />
            </button>
            <button
              className="xl:hidden rounded-lg p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#f1f5f9] transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Slide-Over ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm xl:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed right-0 top-0 z-50 h-full w-80 border-l border-[#e2e8f0] bg-white backdrop-blur-2xl shadow-2xl xl:hidden"
              role="dialog"
              aria-label="Mobile navigation"
            >
              <div className="flex h-[80px] items-center justify-between px-6">
                <img
                  src={logoImg}
                  alt="YesBe Logo"
                  width={44}
                  height={44}
                  loading="eager"
                  decoding="async"
                  className="h-11 w-11 object-contain rounded-xl"
                />
                <button
                  className="rounded-lg p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#f1f5f9] transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-1 px-4 pb-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <MobileAccordion
                        item={item}
                        isActive={isActive}
                        onNavigate={handleNavigate}
                      />
                    </motion.div>
                  );
                })}
              </div>

              <div className="border-t border-[#e2e8f0] px-5 py-6">
                <button
                  onClick={() => handleNavigate("/contact")}
                  className="flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] px-6 py-3.5 text-[15px] font-semibold leading-[1.2] tracking-[0.2px] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)]"
                >
                  Book Free Consultation
                  <ArrowRight className="h-[18px] w-[18px] shrink-0" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
