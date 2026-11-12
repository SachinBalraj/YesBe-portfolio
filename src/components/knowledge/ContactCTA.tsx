import { Link } from "react-router-dom";
import { CalendarCheck, MessageSquareText } from "lucide-react";
import { trackConsultationClick } from "@/utils/analytics";

export function ContactCTA() {
  return (
    <section
      aria-label="Get help implementing these insights"
      className="relative overflow-hidden rounded-none border border-primary/20 bg-navy px-6 py-12 text-center sm:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
      </div>

      <div className="relative mx-auto max-w-2xl">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Need help implementing this for your business?
        </h2>
        <p className="mb-8 text-[15px] leading-relaxed text-blue-100">
          Book a free consultation with YESBE today. Our experts will assess your
          needs and map out a clear plan — no strings attached.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            onClick={() => trackConsultationClick("knowledge_article")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-white px-8 py-3.5 text-sm font-bold text-[#1d4ed8] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:w-auto"
          >
            <CalendarCheck className="h-4 w-4" />
            Book a Free Consultation
          </Link>
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-none border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:w-auto"
          >
            <MessageSquareText className="h-4 w-4" />
            Contact YESBE
          </Link>
        </div>
      </div>
    </section>
  );
}
