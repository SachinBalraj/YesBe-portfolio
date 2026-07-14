import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Home, MessageCircle, ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/images/sblogo.png";

const suggestions = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Projects", href: "/#projects" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Knowledge Center", href: "/#knowledge" },
  { label: "Contact", href: "/#contact" },
];

export function NotFound() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/#${encodeURIComponent(query.trim().toLowerCase())}`;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,#eaf6ff_0%,transparent_70%)]" />
        <div className="absolute top-[15%] left-[10%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.10] blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.08] blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#2563eb]/[0.04]"
            style={{ width: 4 + i * 2, height: 4 + i * 2, left: `${12 + i * 16}%`, top: `${18 + (i % 3) * 22}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.12, 0.3, 0.12] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        {/* Floating illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative mb-8"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-28 w-28 items-center justify-center rounded-[28px] border border-[#E5F0FF] bg-white/80 backdrop-blur-sm shadow-lg"
            style={{ boxShadow: "0 8px 40px rgba(37,99,235,0.10), 0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <Compass className="h-12 w-12 text-[#2563eb]" strokeWidth={1.5} />
          </motion.div>
          <div className="absolute -inset-4 -z-10 rounded-full bg-[#2563eb]/[0.06] blur-[30px] animate-glow-pulse" />
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-7xl font-extrabold tracking-tight text-[#0F172A] sm:text-8xl"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-3 text-xl font-bold text-[#0F172A]"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#64748B]"
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 w-full max-w-sm"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search my website..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E5F0FF] bg-white py-3 pl-11 pr-4 text-sm text-[#0F172A] outline-none shadow-sm transition-all duration-200 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10"
              aria-label="Search my website"
            />
          </div>
        </motion.form>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb]/90 hover:shadow-md hover:-translate-y-0.5"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-[#E5F0FF] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all duration-200 hover:border-[#bfdbfe] hover:shadow-md hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4 text-[#2563eb]" />
            Contact Me
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-[#E5F0FF] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all duration-200 hover:border-[#bfdbfe] hover:shadow-md hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </motion.div>

        {/* Suggested links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10 w-full"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">Popular Pages</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E5F0FF] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#2563eb] transition-all duration-200 hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb]"
              >
                {s.label}
                <ArrowRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 flex flex-col items-center"
        >
          <img src={logoImg} alt="Sachin Balraj Logo" width={40} height={40} className="h-10 w-10 object-contain rounded-lg opacity-60" />
          <p className="mt-2 text-[11px] text-[#64748B]">&copy; 2026 Sachin Balraj</p>
        </motion.div>
      </div>
    </div>
  );
}
