import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, CheckCircle, AlertCircle, Loader2, Phone, MessageCircle,
  Mail, MapPin, ArrowRight, ArrowLeft, Check,
  User, Building2, Briefcase, FileText,
} from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import {
  BUDGET_LABELS as budgetLabels,
  SERVICE_LABELS as serviceLabels,
  TIMELINE_LABELS as timelineLabels,
} from "@/constants/enquiry";
import { useIsMobile } from "@/hooks/useIsMobile";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/animations";
import { trackGenerateLead, trackContactClick, trackPhoneClick, trackWhatsAppClick } from "@/utils/analytics";
import { ApiError, submitEnquiry } from "@/services/enquiries";

interface FormData {
  name: string;
  company: string;
  designation: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  businessChallenges: string;
  goals: string;
}

const initialData: FormData = {
  name: "", company: "", designation: "", email: "", phone: "",
  service: "", budget: "", timeline: "",
  projectDescription: "", businessChallenges: "", goals: "",
};

const inputClass =
  "w-full max-w-full box-border rounded-xl border border-border bg-card px-4 py-3.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10";

const contactCards = [
  { icon: Phone, label: "Phone", value: `+91 ${SITE_CONFIG.phone}`, href: SITE_CONFIG.phoneHref, color: "bg-blue-50 text-blue-600", onClick: () => trackPhoneClick("contact_section") },
  { icon: MessageCircle, label: "WhatsApp", value: `+91 ${SITE_CONFIG.phone}`, href: SITE_CONFIG.social.whatsapp, color: "bg-green-50 text-green-600", onClick: () => trackWhatsAppClick("contact_section") },
  { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}`, color: "bg-orange-50 text-orange-600", onClick: () => trackContactClick("contact_section") },
  { icon: MapPin, label: "Location", value: SITE_CONFIG.location, href: SITE_CONFIG.mapUrl, color: "bg-rose-50 text-rose-600" },
];

const STEPS = [
  { label: "Personal", fullLabel: "Personal Details", icon: User },
  { label: "Business", fullLabel: "Business Details", icon: Building2 },
  { label: "Project", fullLabel: "Project Details", icon: Briefcase },
  { label: "Requirements", fullLabel: "Review Requirements", icon: FileText },
];

const formatLabel = (value: string, options?: Record<string, string>) => {
  if (!value) return "Not specified";
  return options?.[value] ?? value;
};

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value || "Not specified"}</span>
    </div>
  );
}

export function ContactSection() {
  // Horizontal entrance transforms are replaced by a vertical fade until the
  // two-column desktop layout kicks in. Below lg these panels are full-width, and
  // framer-motion applies the X offset inline, so CSS cannot undo it — a 30px
  // shift is enough to push them past the viewport edge while off-screen.
  const fadeOnly = useIsMobile("(max-width: 1023px)");
  const enterForm = fadeOnly ? fadeInUp : fadeInLeft;
  const enterCards = fadeOnly ? fadeInUp : fadeInRight;
  const [formData, setFormData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const serviceOptions = Object.entries(serviceLabels);
  const budgetOptions = Object.entries(budgetLabels);
  const timelineOptions = Object.entries(timelineLabels);


  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.name.trim()) errors.name = "Full name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Please enter a valid email";
    } else if (step === 1) {
      if (!formData.service) errors.service = "Please select a service";
    } else if (step === 2) {
      const description = formData.projectDescription.trim();
      if (!description) errors.projectDescription = "Project description is required";
      else if (description.length < 10) errors.projectDescription = "Please describe your project in at least 10 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setFieldErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Honeypot: a hidden field bots fill in and humans never see. The server
  // discards the submission if it has any value.
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) {
      setCurrentStep(0);
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const result = await submitEnquiry({
        ...formData,
        formType: "consultation",
        pageSource: window.location.pathname,
        company_website: honeypot,
      });
      // Show the server's own confirmation rather than a hardcoded string.
      setSuccessMsg(result.message);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.fields.length > 0) setFieldErrors(err.fieldMap);
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
      return;
    }

    setStatus("sent");
    trackGenerateLead("contact_form");
    setFormData(initialData);
    setHoneypot("");
    setCurrentStep(0);
    setTimeout(() => {
      setStatus("idle");
      setSuccessMsg("");
    }, 6000);
  };

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputErrorClass = (field: string) =>
    fieldErrors[field] ? "border-destructive focus:border-destructive focus:ring-destructive/10" : "";

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
  };

  const [direction, setDirection] = useState(0);

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    if (step < currentStep || validateStep(currentStep)) {
      setFieldErrors({});
      setCurrentStep(step);
    }
  };

  return (
    <section id="contact" className="border-t border-border/70 bg-slate-50 py-16 sm:py-20 lg:py-24" aria-label="Contact YESBE">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mb-10"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-tight text-navy">
            Let&apos;s build your next{" "}
            <span className="text-primary">digital solution</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-[16px] text-muted-foreground leading-relaxed">
            Tell us about your project. We&apos;ll review your requirements and respond with clear next steps.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Wizard Form */}
          <motion.div
            variants={enterForm}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="min-w-0 lg:col-span-3"
          >
            <div className="w-full min-w-0 max-w-full border border-border bg-white overflow-hidden">
              {/* Progress Indicator */}
              <div className="border-b border-border/50 px-4 pt-5 pb-4 sm:px-8 sm:pt-8">
                {/*
                  Mobile (<640px): the four labels cannot fit one row, so only the
                  numbered circles are shown inline and the active step is named
                  underneath. Desktop keeps the full inline labels.
                */}
                <ol
                  className="flex items-center gap-1.5 sm:gap-2"
                  aria-label="Consultation progress"
                >
                  {STEPS.map((step, i) => (
                    <li key={step.label} className="flex min-w-0 flex-1 items-center gap-1.5 last:flex-none sm:gap-2">
                      <button
                        type="button"
                        onClick={() => goToStep(i)}
                        aria-current={i === currentStep ? "step" : undefined}
                        aria-label={`${step.label} — step ${i + 1} of ${STEPS.length}`}
                        className="group flex min-w-0 shrink items-center gap-2 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-none text-sm font-bold transition-all duration-300 sm:h-10 sm:w-10 sm:text-base ${
                            i < currentStep
                              ? "bg-primary text-primary-foreground"
                              : i === currentStep
                              ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {i < currentStep ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
                        </span>
                        <span
                          className={`hidden truncate text-xs font-semibold transition-colors sm:block ${
                            i <= currentStep ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </span>
                      </button>
                      {/* Connector: fills the remaining width, so the row can
                          never force the circles wider than the viewport. */}
                      {i < STEPS.length - 1 && (
                        <span
                          aria-hidden="true"
                          className={`h-0.5 min-w-0 flex-1 rounded-none transition-colors ${
                            i < currentStep ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </li>
                  ))}
                </ol>

                {/* Animated Progress Bar */}
                <div className="mt-4 h-1.5 w-full rounded-none bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={false}
                    animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                </div>

                {/* Mobile: name the active step explicitly. Desktop: keep the
                    existing compact "Step N of M" line only. */}
                <div className="mt-3 sm:hidden">
                  <p className="text-sm font-semibold text-foreground">{STEPS[currentStep].fullLabel}</p>
                  <p className="text-xs text-muted-foreground">
                    Step {currentStep + 1} of {STEPS.length}
                  </p>
                </div>
                <p className="mt-2 hidden text-xs text-muted-foreground sm:block">
                  Step {currentStep + 1} of {STEPS.length}
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="relative overflow-hidden">
              {/* Honeypot: hidden from users, catches naive bots */}
              <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
                <label htmlFor="company-website">Company website</label>
                <input
                  id="company-website"
                  name="company-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    className="px-4 py-5 sm:px-8 sm:py-8"
                  >
                    {/* Step 0: Personal Information */}
                    {currentStep === 0 && (
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                        <div className="sm:col-span-2">
                          <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-foreground">
                            Full Name <span className="text-destructive">*</span>
                          </label>
                          <input
                            id="c-name" name="name" type="text" value={formData.name}
                            autoComplete="name" aria-required="true"
                            aria-invalid={!!fieldErrors.name}
                            aria-describedby={fieldErrors.name ? "c-name-error" : undefined}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Your full name" className={`${inputClass} ${inputErrorClass("name")}`}
                          />
                          {fieldErrors.name && <p id="c-name-error" role="alert" className="mt-1 text-xs text-destructive">{fieldErrors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-foreground">
                            Email <span className="text-destructive">*</span>
                          </label>
                          <input
                            id="c-email" name="email" type="email" value={formData.email}
                            autoComplete="email" inputMode="email" aria-required="true"
                            aria-invalid={!!fieldErrors.email}
                            aria-describedby={fieldErrors.email ? "c-email-error" : undefined}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="you@company.com" className={`${inputClass} ${inputErrorClass("email")}`}
                          />
                          {fieldErrors.email && <p id="c-email-error" role="alert" className="mt-1 text-xs text-destructive">{fieldErrors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium text-foreground">
                            Phone <span className="font-normal text-muted-foreground">(optional)</span>
                          </label>
                          <input
                            id="c-phone" name="phone" type="tel" value={formData.phone}
                            autoComplete="tel" inputMode="tel"
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="+91 98765 43210" className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="c-company" className="mb-1.5 block text-sm font-medium text-foreground">
                            Company <span className="font-normal text-muted-foreground">(optional)</span>
                          </label>
                          <input
                            id="c-company" name="company" type="text" value={formData.company}
                            autoComplete="organization"
                            onChange={(e) => update("company", e.target.value)}
                            placeholder="Your company name" className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="c-designation" className="mb-1.5 block text-sm font-medium text-foreground">
                            Designation <span className="font-normal text-muted-foreground">(optional)</span>
                          </label>
                          <input
                            id="c-designation" name="designation" type="text" value={formData.designation}
                            autoComplete="organization-title"
                            onChange={(e) => update("designation", e.target.value)}
                            placeholder="Your role" className={inputClass}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 1: Business Information */}
                    {currentStep === 1 && (
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                        <div className="sm:col-span-2">
                          <label htmlFor="c-service" className="mb-1.5 block text-sm font-medium text-foreground">
                            Required Service <span className="text-destructive">*</span>
                          </label>
                          <select
                            id="c-service" name="service" value={formData.service}
                            aria-required="true"
                            aria-invalid={!!fieldErrors.service}
                            aria-describedby={fieldErrors.service ? "c-service-error" : undefined}
                            onChange={(e) => update("service", e.target.value)}
                            className={`${inputClass} ${inputErrorClass("service")}`}
                          >
                            <option value="">Select a service</option>
                            {serviceOptions.map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                          {fieldErrors.service && <p id="c-service-error" role="alert" className="mt-1 text-xs text-destructive">{fieldErrors.service}</p>}
                        </div>
                        <div>
                          <label htmlFor="c-budget" className="mb-1.5 block text-sm font-medium text-foreground">
                            Budget <span className="font-normal text-muted-foreground">(optional)</span>
                          </label>
                          <select
                            id="c-budget" name="budget" value={formData.budget}
                            onChange={(e) => update("budget", e.target.value)}
                            className={inputClass}
                          >
                            <option value="">Select budget range</option>
                            {budgetOptions.map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="c-timeline" className="mb-1.5 block text-sm font-medium text-foreground">
                            Expected Timeline <span className="font-normal text-muted-foreground">(optional)</span>
                          </label>
                          <select
                            id="c-timeline" name="timeline" value={formData.timeline}
                            onChange={(e) => update("timeline", e.target.value)}
                            className={inputClass}
                          >
                            <option value="">Select timeline</option>
                            {timelineOptions.map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Project Details */}
                    {currentStep === 2 && (
                      <div className="space-y-4 sm:space-y-5">
                        <div>
                          <label htmlFor="c-desc" className="mb-1.5 block text-sm font-medium text-foreground">
                            Project Description <span className="text-destructive">*</span>
                          </label>
                          <textarea
                            id="c-desc" name="projectDescription" rows={3} value={formData.projectDescription}
                            aria-required="true"
                            aria-invalid={!!fieldErrors.projectDescription}
                            aria-describedby={fieldErrors.projectDescription ? "c-desc-error" : undefined}
                            onChange={(e) => update("projectDescription", e.target.value)}
                            placeholder="Describe your project, its goals, and key requirements..."
                            className={`${inputClass} resize-none ${inputErrorClass("projectDescription")}`}
                          />
                          {fieldErrors.projectDescription && <p id="c-desc-error" role="alert" className="mt-1 text-xs text-destructive">{fieldErrors.projectDescription}</p>}
                        </div>
                        <div>
                          <label htmlFor="c-challenges" className="mb-1.5 block text-sm font-medium text-foreground">
                            Business Challenges <span className="font-normal text-muted-foreground">(optional)</span>
                          </label>
                          <textarea
                            id="c-challenges" name="businessChallenges" rows={2} value={formData.businessChallenges}
                            onChange={(e) => update("businessChallenges", e.target.value)}
                            placeholder="What problems are you trying to solve?"
                            className={`${inputClass} resize-none`}
                          />
                        </div>
                        <div>
                          <label htmlFor="c-goals" className="mb-1.5 block text-sm font-medium text-foreground">
                            Goals &amp; Expected Outcomes <span className="font-normal text-muted-foreground">(optional)</span>
                          </label>
                          <textarea
                            id="c-goals" name="goals" rows={2} value={formData.goals}
                            onChange={(e) => update("goals", e.target.value)}
                            placeholder="What does success look like for this project?"
                            className={`${inputClass} resize-none`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Review & Submit */}
                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Please review your information before submitting.
                        </p>
                        <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-0">
                          <h3 className="mb-2 text-[12px] font-semibold text-primary">Personal Information</h3>
                          <ReviewRow label="Full Name" value={formData.name} />
                          <ReviewRow label="Email" value={formData.email} />
                          <ReviewRow label="Phone" value={formData.phone} />
                          <ReviewRow label="Company" value={formData.company} />
                          <ReviewRow label="Designation" value={formData.designation} />
                        </div>
                        <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-0">
                          <h3 className="mb-2 text-[12px] font-semibold text-primary">Business Information</h3>
                          <ReviewRow label="Service" value={formatLabel(formData.service, serviceLabels)} />
                          <ReviewRow label="Budget" value={formatLabel(formData.budget, budgetLabels)} />
                          <ReviewRow label="Timeline" value={formatLabel(formData.timeline, timelineLabels)} />
                        </div>
                        <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-0">
                          <h3 className="mb-2 text-[12px] font-semibold text-primary">Project Details</h3>
                          <ReviewRow label="Description" value={formData.projectDescription} />
                          <ReviewRow label="Challenges" value={formData.businessChallenges} />
                          <ReviewRow label="Goals" value={formData.goals} />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Sticky Bottom Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 px-4 py-4 sm:flex-nowrap sm:px-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:flex-none sm:px-5"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  {currentStep < STEPS.length - 1 ? (
                    <button
                      /* Distinct key: without it React reuses this DOM node
                         when the last step swaps in the submit button, which
                         flips type to "submit" before the browser runs the
                         click's default action — so "Continue" would submit
                         the form instead of advancing. */
                      key="advance"
                      type="button"
                      onClick={handleNext}
                      className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:flex-none sm:px-6"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      key="submit"
                      type="submit"
                      disabled={status === "sending" || status === "sent"}
                      className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:flex-none sm:px-6"
                    >
                      {status === "sending" && <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>}
                      {status === "sent" && <><CheckCircle className="h-4 w-4" /> Sent!</>}
                      {status === "error" && <><AlertCircle className="h-4 w-4" /> Try Again</>}
                      {status === "idle" && <><Send className="h-4 w-4" /> Submit Request</>}
                    </button>
                  )}
                </div>

                {status === "error" && errorMsg && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 border-t border-destructive/20 bg-destructive/5 px-6 py-4 text-sm font-medium text-destructive sm:px-8"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div
                    role="status"
                    className="flex items-start gap-2 border-t border-border bg-emerald-50 px-6 py-4 text-sm font-medium text-emerald-800 sm:px-8"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{successMsg}</span>
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            variants={enterCards}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {contactCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={card.onClick}
                className="group flex items-center gap-4 border border-border bg-white p-5 transition-colors hover:border-slate-300"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-medium text-muted-foreground">
                    {card.label}
                  </div>
                  <div className="text-sm font-medium text-foreground truncate">
                    {card.value}
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
