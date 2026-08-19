import { Link } from "react-router-dom";
import { CalendarCheck, MessageSquareText } from "lucide-react";
import { trackConsultationClick } from "@/utils/analytics";

export function ContactCTA() {
  return (
    <section
      aria-label="Get help implementing these insights"
      className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#1e40af] px-6 py-12 text-center sm:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
        <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Need help implementing this for your business?
        </h2>
        <p className="mb-8 text-[15px] leading-relaxed text-blue-100">
          Book a free consultation with YesBe today. Our experts will assess your
          needs and map out a clear plan — no strings attached.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            onClick={() => trackConsultationClick("knowledge_article")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#1d4ed8] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:w-auto"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Free Consultation
          </Link>
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 sm:w-auto"
          >
            <MessageSquareText className="h-4 w-4" />
            Contact YesBe
          </Link>
        </div>
      </div>
    </section>
  );
}
