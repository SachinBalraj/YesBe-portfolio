import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { ApiError, submitEnquiry } from "@/services/enquiries";

interface DetailEnquiryCardProps {
  kind?: "industry" | "service";
  name?: string;
  subject?: string;
  slug?: string;
  route?: string;
  heading?: string;
  support?: string;
  buttonLabel?: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectDescription: string;
}

const initial: FormState = { name: "", email: "", phone: "", company: "", projectDescription: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function DetailEnquiryCard({ kind = "service", name, subject, slug, route, heading: headingProp, support: supportProp, buttonLabel = "Send Enquiry" }: DetailEnquiryCardProps) {
  const resolvedName = name ?? subject ?? "Project";
  const resolvedSlug = slug ?? resolvedName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const resolvedRoute = route ?? (typeof window !== "undefined" ? window.location.pathname : "/contact");
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const submitting = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const heading = headingProp ??
    (kind === "industry"
      ? `Let's Build Your ${resolvedName} Technology Solution.`
      : `Let's Build Your ${resolvedName} Solution.`);
  const support = supportProp ??
    (kind === "industry"
      ? "Tell us about your operational challenges or project requirements. Our team can discuss a suitable technology approach for your organization."
      : "Tell us about your project requirements or business challenges. Our team can discuss a suitable technology approach for your organization.");

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (form.name.trim().length < 2) errors.name = "Please enter your full name";
    if (!EMAIL.test(form.email.trim())) errors.email = "Please enter a valid business email";
    if (form.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number";
    if (form.company.trim().length < 2) errors.company = "Please enter your company or organization";
    if (form.projectDescription.trim().length < 10) errors.projectDescription = "Please describe your project requirements (at least 10 characters)";
    setFieldErrors(errors);
    return errors;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting.current || status === "sending" || status === "sent") return;
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      const first = Object.keys(errors)[0];
      document.getElementById(`detail-enquiry-${first}`)?.focus();
      return;
    }

    submitting.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("sending");
    setMessage("");
    try {
      const result = await submitEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        service: resolvedName,
        projectDescription: form.projectDescription,
        formType: "contact",
        pageSource: resolvedRoute,
        company_website: honeypot,
      }, controller.signal);
      setStatus("sent");
      setMessage(result.message);
      setForm(initial);
      setHoneypot("");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      if (err instanceof ApiError) {
        if (err.fields.length > 0) setFieldErrors(err.fieldMap);
        setMessage(err.message);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
      setStatus("error");
    } finally {
      submitting.current = false;
      abortRef.current = null;
    }
  };

  const input = (field: keyof FormState) =>
    `w-full rounded-xl border bg-white/95 px-4 py-3.5 text-[15px] text-[#101828] placeholder:text-[#667085] outline-none transition-all duration-200 focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/15 ${fieldErrors[field] ? "border-[#F04438]" : "border-white/20"}`;

  return (
    <section className="bg-[#11124D] py-14 sm:py-16 lg:py-20" aria-labelledby={`enquiry-${slug}`}>
      <div className="container-page">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8EB5FF]">
              {kind === "industry" ? "Industry enquiry" : "Service enquiry"}
            </p>
            <h2 id={`enquiry-${resolvedSlug}`} className="mt-4 max-w-xl text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.12] tracking-[-0.035em] text-white">
              {heading}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/72 sm:text-[16px]">{support}</p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-[13px] leading-6 text-white/68">
              <p><span className="font-semibold text-white/86">Page:</span> {resolvedRoute}</p>
              <p className="mt-1"><span className="font-semibold text-white/86">{kind === "industry" ? "Industry" : "Service"}:</span> {resolvedName}</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-7">
            {status === "sent" ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                  <CheckCircle2 className="size-7" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">Enquiry sent</h3>
                <p className="mt-3 max-w-md text-[15px] leading-7 text-white/72">{message}</p>
                <button type="button" onClick={() => { setStatus("idle"); setMessage(""); }} className="mt-6 text-sm font-semibold text-[#8EB5FF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EB5FF]">
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor={`company-website-${slug}`}>Website</label>
                  <input id={`company-website-${resolvedSlug}`} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>
                <input type="hidden" name="sourcePage" value={resolvedRoute} />
                <input type="hidden" name={kind} value={resolvedName} />
                <div>
                  <label htmlFor={`detail-enquiry-name`} className="mb-1.5 block text-sm font-medium text-white/88">Full Name</label>
                  <input id="detail-enquiry-name" autoComplete="name" className={input("name")} value={form.name} onChange={(e) => update("name", e.target.value)} />
                  {fieldErrors.name && <p className="mt-1.5 text-xs text-[#FDA29B]">{fieldErrors.name}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="detail-enquiry-email" className="mb-1.5 block text-sm font-medium text-white/88">Business Email</label>
                    <input id="detail-enquiry-email" type="email" autoComplete="email" className={input("email")} value={form.email} onChange={(e) => update("email", e.target.value)} />
                    {fieldErrors.email && <p className="mt-1.5 text-xs text-[#FDA29B]">{fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="detail-enquiry-phone" className="mb-1.5 block text-sm font-medium text-white/88">Phone Number</label>
                    <input id="detail-enquiry-phone" type="tel" autoComplete="tel" className={input("phone")} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                    {fieldErrors.phone && <p className="mt-1.5 text-xs text-[#FDA29B]">{fieldErrors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="detail-enquiry-company" className="mb-1.5 block text-sm font-medium text-white/88">Company / Organization</label>
                  <input id="detail-enquiry-company" autoComplete="organization" className={input("company")} value={form.company} onChange={(e) => update("company", e.target.value)} />
                  {fieldErrors.company && <p className="mt-1.5 text-xs text-[#FDA29B]">{fieldErrors.company}</p>}
                </div>
                <div>
                  <label htmlFor="detail-enquiry-projectDescription" className="mb-1.5 block text-sm font-medium text-white/88">Project Requirements</label>
                  <textarea id="detail-enquiry-projectDescription" rows={5} className={`${input("projectDescription")} resize-y`} value={form.projectDescription} onChange={(e) => update("projectDescription", e.target.value)} />
                  {fieldErrors.projectDescription && <p className="mt-1.5 text-xs text-[#FDA29B]">{fieldErrors.projectDescription}</p>}
                </div>

                {status === "error" && message && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <span>{message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#155DFC] px-6 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#1B67FF] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#11124D] motion-reduce:transition-none"
                >
                  {status === "sending" ? <><Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending...</> : <>{buttonLabel} <ArrowRight className="size-4" aria-hidden="true" /></>}
                </button>
                <p className="text-[12px] leading-5 text-white/52">By submitting, you agree to be contacted about this enquiry. We handle your information according to our Privacy Policy.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
