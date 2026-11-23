import {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  lazy,
  Suspense,
} from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { ButtonLink } from "@/components/system/ButtonLink";
import { PRIMARY_NAV } from "@/constants/navigation";
import { trackConsultationClick } from "@/utils/analytics";
import logoImg from "@/assets/images/YBlogo.webp";

const MobileNav = lazy(() => import("./MobileNav").then((m) => ({ default: m.MobileNav })));

const SearchModal = lazy(() =>
  import("@/components/knowledge/SearchModal").then((m) => ({ default: m.SearchModal })),
);

function navLinkClass(isActive: boolean) {
  return cn(
    "relative inline-flex items-center gap-1 px-3 py-2 text-[13.5px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:text-[#11124D]",
    "after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:bg-[#11124D] after:transition-transform after:duration-[250ms]",
    isActive
      ? "text-[#11124D] after:scale-x-100"
      : "text-[#171717] after:scale-x-0 hover:text-[#11124D] hover:after:scale-x-100",
  );
}

function NavbarComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchMounted, setSearchMounted] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (isSearchOpen) setSearchMounted(true);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isMobileOpen) setMobileMounted(true);
  }, [isMobileOpen]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("prerender")) return;

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
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleSearchShortcut);
    return () => window.removeEventListener("keydown", handleSearchShortcut);
  }, []);

  const closeMobileNav = useCallback(() => setIsMobileOpen(false), []);

  const handleNavigate = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-[#E8EAF0]! bg-white transition-all duration-300 ease-out",
          isScrolled
            ? "shadow-[0_10px_30px_-24px_rgba(10,18,32,0.45)]"
            : "",
          hidden ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="container-page">
          <nav
            className="flex h-[76px] items-center"
            aria-label="Main navigation"
            role="navigation"
          >
            <Link
              to="/"
              aria-label="YESBE Technologies home"
              className="relative z-10 mr-5 flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={handleNavigate}
            >
              <img
                src={logoImg}
                alt="YESBE Technologies Logo"
                width={40}
                height={40}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-10 w-10 object-contain transition-opacity duration-200 hover:opacity-80"
              />
            </Link>

            <div className="hidden items-center gap-0.5 lg:flex">
              {PRIMARY_NAV.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) => navLinkClass(isActive)}
                  onClick={handleNavigate}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="flex-1" aria-hidden="true" />

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex min-h-10 items-center gap-2 border border-[#E5E7EB]! bg-white px-3 py-2 text-[13px] font-medium text-[#171717] transition-colors duration-200 hover:border-[#CBD5E1]! hover:bg-white hover:text-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2454E6] focus-visible:ring-offset-2"
                title="Search Articles (⌘ K)"
                aria-haspopup="dialog"
                aria-keyshortcuts="Meta+K Control+K"
              >
                <Search className="size-4 text-[#171717]" aria-hidden="true" />
                <span className="hidden sm:inline">Search</span>
                <kbd
                  aria-hidden="true"
                  className="hidden border border-[#E5E7EB]! bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#171717] md:inline-block"
                >
                  ⌘K
                </kbd>
              </button>

              <div className="hidden xl:block">
                <ButtonLink
                  onClick={() => {
                    trackConsultationClick("navbar");
                    navigate("/contact");
                  }}
                  variant="primary"
                  className="btn-compact whitespace-nowrap border-[#11124D]! bg-[#11124D]! text-white! shadow-[0_12px_28px_-20px_rgba(17,18,77,0.45)]! transition-colors duration-200 hover:border-[#1D246B]! hover:bg-[#1D246B]! hover:shadow-[0_18px_38px_-20px_rgba(29,36,107,0.5)]! focus-visible:shadow-[0_0_0_2px_#FFFFFF,0_0_0_4px_rgba(17,18,77,0.45)]!"
                  withArrow
                >
                  Book a Free Consultation
                </ButtonLink>
              </div>

              <button
                type="button"
                className="inline-flex size-10 items-center justify-center text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                onClick={() => setIsMobileOpen((open) => !open)}
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
              >
                {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </div>

      </header>

      {mobileMounted && (
        <Suspense fallback={null}>
          <MobileNav open={isMobileOpen} onClose={closeMobileNav} />
        </Suspense>
      )}

      {searchMounted && (
        <Suspense fallback={null}>
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </Suspense>
      )}
    </>
  );
}

export const Navbar = memo(NavbarComponent);
