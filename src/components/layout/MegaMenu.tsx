import type { RefObject } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { INDUSTRY_LINKS, SOLUTION_GROUPS } from "@/constants/navigation";
import { Eyebrow } from "@/components/system/Eyebrow";

export type MegaMenuKey = "solutions" | "industries";

interface MegaMenuProps {
  menu: MegaMenuKey;
  panelRef: RefObject<HTMLDivElement | null>;
  onNavigate: () => void;
}

export function MegaMenu({ menu, panelRef, onNavigate }: MegaMenuProps) {
  const isSolutions = menu === "solutions";

  return (
    <motion.div
      ref={panelRef}
      id={`desktop-menu-${menu}`}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full hidden border-b border-line bg-paper/95 shadow-[0_30px_60px_-30px_rgba(10,18,32,0.28)] backdrop-blur-xl lg:block"
    >
      <div className="container-page py-9">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_2.35fr] lg:gap-14">
          <div>
            <Eyebrow>{isSolutions ? "Capabilities" : "Sectors"}</Eyebrow>
            <p className="display-sm mt-4 max-w-xs">
              {isSolutions ? "Build the right system for the work." : "Technology shaped by the operating context."}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-body">
              {isSolutions
                ? "Explore the capabilities YESBE delivers across strategy, engineering, data and growth."
                : "See how engagements are adapted for different teams, constraints and stages of growth."}
            </p>
            <Link
              to={isSolutions ? "/services" : "/industries"}
              onClick={onNavigate}
              className="link-arrow mt-6"
            >
              {isSolutions ? "View all solutions" : "View all industries"}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {isSolutions ? (
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
              {SOLUTION_GROUPS.map((group) => (
                <nav key={group.title} aria-label={`${group.title} solutions`}>
                  <h3 className="border-b border-line pb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                    {group.title}
                  </h3>
                  <ul className="mt-3 space-y-1">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          onClick={onNavigate}
                          className="group flex items-center justify-between gap-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary focus-visible:underline"
                        >
                          {link.label}
                          <ArrowUpRight
                            className="size-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          ) : (
            <div>
              <h3 className="border-b border-line pb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                Industry experience
              </h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3 xl:grid-cols-4">
                {INDUSTRY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={onNavigate}
                      className="group flex items-center justify-between gap-3 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary focus-visible:underline"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="size-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
