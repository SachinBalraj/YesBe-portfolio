import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { subscribeNewsletter } from "@/services/newsletter";

const benefits = [
  "Weekly Technology Insights",
  "AI & Automation Updates",
  "Business Growth Strategies",
  "Industry Trends",
];

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setMessage("Please enter your email address.");
      setStatus("error");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const response = await subscribeNewsletter({ email: trimmedEmail, source: "YesBe Knowledge Center" });

    if (!response.success) {
      setMessage(response.message);
      setStatus("error");
      return;
    }

    setMessage(response.message);
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white px-6 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition-all duration-300 sm:px-10 sm:py-14 lg:px-14">
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#eff6ff] to-transparent opacity-80" />
      <div className="absolute left-1/2 top-8 h-32 w-32 -translate-x-1/2 rounded-full bg-blue-100 opacity-80 blur-[90px]" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center justify-center rounded-3xl bg-blue-50 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/10">
            Subscribe to YesBe Insights
          </div>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Stay Updated
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Get the latest insights on AI, ERP, Business Automation, Power BI, Digital Transformation, and technology trends directly in your inbox.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded-3xl border border-slate-200/80 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 shadow-sm transition-colors duration-200 hover:border-primary/20 hover:bg-white">
                ✓ {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-xl rounded-[28px] border border-slate-200/80 bg-slate-50/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
          <div className="absolute -right-8 top-6 h-24 w-24 rounded-full bg-gradient-to-br from-[#2563eb] to-[#60a5fa] opacity-10 blur-3xl" />
          <div className="absolute -bottom-8 left-4 h-24 w-24 rounded-full bg-gradient-to-br from-[#93c5fd] to-[#bfdbfe] opacity-20 blur-3xl" />

          <div className="mb-6 flex items-center gap-3 rounded-3xl bg-white/90 px-4 py-3 shadow-sm ring-1 ring-slate-200/70">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white shadow-sm">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Subscribe to the Knowledge Center</p>
              <p className="text-sm text-muted-foreground">No spam, only high-value technology insights.</p>
            </div>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-6 py-5 text-sm font-semibold text-emerald-900"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5" />
                <div>
                  <p>Thank you for subscribing!</p>
                  <p className="mt-1 text-sm font-normal text-emerald-800">You will receive the latest insights from YesBe.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="newsletter-email" className="sr-only">
                Enter your email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                placeholder="Enter your email address"
                aria-label="Enter your email address"
                aria-invalid={status === "error"}
                className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(37,99,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(37,99,235,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
                <Send className="h-4 w-4" />
              </button>

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-red-600"
                >
                  {message}
                </motion.p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
