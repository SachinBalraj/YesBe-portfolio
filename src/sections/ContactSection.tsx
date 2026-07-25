import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, CheckCircle, Loader2, Phone, MessageCircle,
  Mail, MapPin, ArrowRight, ArrowLeft, Check,
  User, Building2, Briefcase, FileText,
} from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/animations";

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
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10";

const contactCards = [
  { icon: Phone, label: "Phone", value: `+91 ${SITE_CONFIG.phone}`, href: `tel:${SITE_CONFIG.phone}`, color: "bg-blue-50 text-blue-600" },
  { icon: MessageCircle, label: "WhatsApp", value: `+91 ${SITE_CONFIG.phone}`, href: SITE_CONFIG.social.whatsapp, color: "bg-green-50 text-green-600" },
  { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}`, color: "bg-orange-50 text-orange-600" },
  { icon: MapPin, label: "Location", value: SITE_CONFIG.location, href: "#", color: "bg-rose-50 text-rose-600" },
];

const STEPS = [
  { label: "Personal", icon: User },
  { label: "Business", icon: Building2 },
  { label: "Project", icon: Briefcase },
  { label: "Review", icon: FileText },
];

const serviceLabels: Record<string, string> = {
  ai: "AI Solutions", web: "Website Development", erp: "ERP Solutions",
  powerbi: "Power BI Dashboard", analytics: "Data Analytics",
  cloud: "Cloud & DevOps", seo: "SEO / Digital Marketing",
  software: "Custom Software", consulting: "Business Consulting", other: "Other",
};

const budgetLabels: Record<string, string> = {
  "under-25k": "Under ₹25,000", "25k-50k": "₹25,000 – ₹50,000",
  "50k-1l": "₹50,000 – ₹1 Lakh", "1l-5l": "₹1 Lakh – ₹5 Lakhs",
  "5l+": "₹5 Lakhs+", flexible: "Flexible / To be discussed",
};

const timelineLabels: Record<string, string> = {
  urgent: "Urgent (1–2 weeks)", "1month": "Within 1 month",
  "3months": "Within 3 months", "6months": "Within 6 months", flexible: "Flexible",
};

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
  const [formData, setFormData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const firstInputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const serviceOptions = Object.entries(serviceLabels);
  const budgetOptions = Object.entries(budgetLabels);
  const timelineOptions = Object.entries(timelineLabels);

  const buildMessage = (data: FormData): string => {
    const lines = [
      "🚀 *New Consultation Request — YESBE*",
      "",
      `👤 *Full Name:* ${data.name}`,
      `🏢 *Company:* ${formatLabel(data.company)}`,
      `💼 *Designation:* ${formatLabel(data.designation)}`,
      `📧 *Email:* ${data.email}`,
      `📞 *Phone:* ${formatLabel(data.phone)}`,
      `🛠 *Service Required:* ${formatLabel(data.service, serviceLabels)}`,
      `💰 *Budget:* ${formatLabel(data.budget, budgetLabels)}`,
      `📅 *Timeline:* ${formatLabel(data.timeline, timelineLabels)}`,
      "",
      `📝 *Project Description:* ${data.projectDescription || "Not specified"}`,
      "",
      `⚠️ *Business Challenges:* ${data.businessChallenges || "Not specified"}`,
      "",
      `🎯 *Goals & Expected Outcomes:* ${data.goals || "Not specified"}`,
      "",
      "---",
      "Submitted via *YESBE Official Website*",
    ];
    return lines.join("\n");
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.name.trim()) errors.name = "Full name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Please enter a valid email";
    } else if (step === 1) {
      if (!formData.service) errors.service = "Please select a service";
    } else if (step === 2) {
      if (!formData.projectDescription.trim()) errors.projectDescription = "Project description is required";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) {
      setCurrentStep(0);
      return;
    }

    setStatus("sending");

    setTimeout(() => {
      const message = buildMessage(formData);
      const encoded = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/919087795970?text=${encoded}`;

      try {
        const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        if (!opened) throw new Error("Popup blocked");
      } catch {
        setErrorMsg("Unable to open WhatsApp. Please contact us directly at +91 90877 95970.");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }

      setStatus("sent");
      setFormData(initialData);
      setCurrentStep(0);
      setTimeout(() => setStatus("idle"), 4000);
    }, 800);
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
    <section id="contact" className="relative py-12 lg:py-16 bg-white overflow-hidden" aria-label="Contact YesBe — Get in touch for AI solutions, web development, and business consulting in Salem, Tamil Nadu">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Let&apos;s Build Your Next{" "}
            <span className="text-primary">Digital Solution</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Tell us about your project. We&apos;ll get back within 24 hours with a proposal.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Wizard Form */}
          <motion.div
            variants={fadeInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border border-border/60 bg-card shadow-card overflow-hidden">
              {/* Progress Indicator */}
              <div className="border-b border-border/50 px-6 pt-6 pb-4 sm:px-8 sm:pt-8">
                <div className="flex items-center justify-between mb-3">
                  {STEPS.map((step, i) => (
                    <button
                      key={step.label}
                      type="button"
                      onClick={() => goToStep(i)}
                      className="flex items-center gap-2 group"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                          i < currentStep
                            ? "bg-primary text-primary-foreground"
                            : i === currentStep
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
                      </div>
                      <span
                        className={`hidden sm:block text-xs font-semibold transition-colors ${
                          i <= currentStep ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                    </button>
                  ))}
                </div>
                {/* Animated Progress Bar */}
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400"
                    initial={false}
                    animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Step {currentStep + 1} of {STEPS.length}
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    className="px-6 py-6 sm:px-8 sm:py-8"
                  >
                    {/* Step 0: Personal Information */}
                    {currentStep === 0 && (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-foreground">
                            Full Name <span className="text-destructive">*</span>
                          </label>
                          <input
                            ref={firstInputRef as React.RefObject<HTMLInputElement>}
                            id="c-name" type="text" value={formData.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="John Doe" className={`${inputClass} ${inputErrorClass("name")}`}
                          />
                          {fieldErrors.name && <p className="mt-1 text-xs text-destructive">{fieldErrors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-foreground">
                            Email <span className="text-destructive">*</span>
                          </label>
                          <input
                            id="c-email" type="email" value={formData.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="john@company.com" className={`${inputClass} ${inputErrorClass("email")}`}
                          />
                          {fieldErrors.email && <p className="mt-1 text-xs text-destructive">{fieldErrors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium text-foreground">
                            Phone
                          </label>
                          <input
                            id="c-phone" type="tel" value={formData.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="+91 98765 43210" className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="c-company" className="mb-1.5 block text-sm font-medium text-foreground">
                            Company
                          </label>
                          <input
                            id="c-company" type="text" value={formData.company}
                            onChange={(e) => update("company", e.target.value)}
                            placeholder="Acme Corp" className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="c-designation" className="mb-1.5 block text-sm font-medium text-foreground">
                            Designation
                          </label>
                          <input
                            id="c-designation" type="text" value={formData.designation}
                            onChange={(e) => update("designation", e.target.value)}
                            placeholder="CTO" className={inputClass}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 1: Business Information */}
                    {currentStep === 1 && (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label htmlFor="c-service" className="mb-1.5 block text-sm font-medium text-foreground">
                            Required Service <span className="text-destructive">*</span>
                          </label>
                          <select
                            ref={firstInputRef as React.RefObject<HTMLSelectElement>}
                            id="c-service" value={formData.service}
                            onChange={(e) => update("service", e.target.value)}
                            className={`${inputClass} ${inputErrorClass("service")}`}
                          >
                            <option value="">Select a service</option>
                            {serviceOptions.map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                          {fieldErrors.service && <p className="mt-1 text-xs text-destructive">{fieldErrors.service}</p>}
                        </div>
                        <div>
                          <label htmlFor="c-budget" className="mb-1.5 block text-sm font-medium text-foreground">
                            Budget
                          </label>
                          <select
                            id="c-budget" value={formData.budget}
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
                            Expected Timeline
                          </label>
                          <select
                            id="c-timeline" value={formData.timeline}
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
                      <div className="space-y-5">
                        <div>
                          <label htmlFor="c-desc" className="mb-1.5 block text-sm font-medium text-foreground">
                            Project Description <span className="text-destructive">*</span>
                          </label>
                          <textarea
                            ref={firstInputRef as unknown as React.RefObject<HTMLTextAreaElement>}
                            id="c-desc" rows={3} value={formData.projectDescription}
                            onChange={(e) => update("projectDescription", e.target.value)}
                            placeholder="Describe your project, its goals, and key requirements..."
                            className={`${inputClass} resize-none ${inputErrorClass("projectDescription")}`}
                          />
                          {fieldErrors.projectDescription && <p className="mt-1 text-xs text-destructive">{fieldErrors.projectDescription}</p>}
                        </div>
                        <div>
                          <label htmlFor="c-challenges" className="mb-1.5 block text-sm font-medium text-foreground">
                            Business Challenges
                          </label>
                          <textarea
                            id="c-challenges" rows={2} value={formData.businessChallenges}
                            onChange={(e) => update("businessChallenges", e.target.value)}
                            placeholder="What problems are you trying to solve?"
                            className={`${inputClass} resize-none`}
                          />
                        </div>
                        <div>
                          <label htmlFor="c-goals" className="mb-1.5 block text-sm font-medium text-foreground">
                            Goals &amp; Expected Outcomes
                          </label>
                          <textarea
                            id="c-goals" rows={2} value={formData.goals}
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
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Personal Information</h4>
                          <ReviewRow label="Full Name" value={formData.name} />
                          <ReviewRow label="Email" value={formData.email} />
                          <ReviewRow label="Phone" value={formData.phone} />
                          <ReviewRow label="Company" value={formData.company} />
                          <ReviewRow label="Designation" value={formData.designation} />
                        </div>
                        <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-0">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Business Information</h4>
                          <ReviewRow label="Service" value={formatLabel(formData.service, serviceLabels)} />
                          <ReviewRow label="Budget" value={formatLabel(formData.budget, budgetLabels)} />
                          <ReviewRow label="Timeline" value={formatLabel(formData.timeline, timelineLabels)} />
                        </div>
                        <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-0">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Project Details</h4>
                          <ReviewRow label="Description" value={formData.projectDescription} />
                          <ReviewRow label="Challenges" value={formData.businessChallenges} />
                          <ReviewRow label="Goals" value={formData.goals} />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Sticky Bottom Navigation */}
                <div className="border-t border-border/50 px-6 py-4 sm:px-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  {currentStep < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === "sending" || status === "sent"}
                      className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "sending" && <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>}
                      {status === "sent" && <><CheckCircle className="h-4 w-4" /> Sent!</>}
                      {status === "error" && errorMsg}
                      {status === "idle" && <><Send className="h-4 w-4" /> Submit Request</>}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            variants={fadeInRight}
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
                className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card hover:shadow-card-hover hover:border-primary/20 transition-all duration-200"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.color} group-hover:scale-110 transition-transform duration-200`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
