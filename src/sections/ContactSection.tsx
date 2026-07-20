import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send, CheckCircle, Loader2, Phone, MessageCircle,
  Mail, MapPin, ExternalLink, Paperclip,
} from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/animations";
import { sendEnquiryEmail } from "@/services/email";

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
  { icon: ExternalLink, label: "LinkedIn", value: "YesBe", href: SITE_CONFIG.social.linkedin, color: "bg-blue-50 text-blue-700" },
  { icon: MapPin, label: "Location", value: SITE_CONFIG.location, href: "#", color: "bg-rose-50 text-rose-600" },
];

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendEnquiryEmail(formData);
      setStatus("sent");
      setFormData(initialData);
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const update = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-white overflow-hidden"     aria-label="Contact YesBe — Get in touch for AI solutions, web development, and business consulting in Salem, Tamil Nadu">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Let&apos;s Build Your Next{" "}
            <span className="text-primary">Digital Solution</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Tell us about your project and we&apos;ll get back to you within 24 hours with a detailed proposal.
          </motion.p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            variants={fadeInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border/60 bg-card p-8 sm:p-10 shadow-card"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-foreground">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input id="c-name" type="text" required value={formData.name} onChange={(e) => update("name", e.target.value)} placeholder="John Doe" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="c-company" className="mb-1.5 block text-sm font-medium text-foreground">
                    Company
                  </label>
                  <input id="c-company" type="text" value={formData.company} onChange={(e) => update("company", e.target.value)} placeholder="Acme Corp" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="c-designation" className="mb-1.5 block text-sm font-medium text-foreground">
                    Designation
                  </label>
                  <input id="c-designation" type="text" value={formData.designation} onChange={(e) => update("designation", e.target.value)} placeholder="CTO" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-foreground">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input id="c-email" type="email" required value={formData.email} onChange={(e) => update("email", e.target.value)} placeholder="john@company.com" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium text-foreground">
                    Phone
                  </label>
                  <input id="c-phone" type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="c-service" className="mb-1.5 block text-sm font-medium text-foreground">
                    Required Service <span className="text-destructive">*</span>
                  </label>
                  <select id="c-service" required value={formData.service} onChange={(e) => update("service", e.target.value)} className={inputClass}>
                    <option value="">Select a service</option>
                    <option value="ai">AI Solutions</option>
                    <option value="web">Website Development</option>
                    <option value="erp">ERP Solutions</option>
                    <option value="powerbi">Power BI Dashboard</option>
                    <option value="analytics">Data Analytics</option>
                    <option value="cloud">Cloud & DevOps</option>
                    <option value="seo">SEO / Digital Marketing</option>
                    <option value="software">Custom Software</option>
                    <option value="consulting">Business Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="c-budget" className="mb-1.5 block text-sm font-medium text-foreground">
                    Budget
                  </label>
                  <select id="c-budget" value={formData.budget} onChange={(e) => update("budget", e.target.value)} className={inputClass}>
                    <option value="">Select budget range</option>
                    <option value="under-25k">Under ₹25,000</option>
                    <option value="25k-50k">₹25,000 – ₹50,000</option>
                    <option value="50k-1l">₹50,000 – ₹1 Lakh</option>
                    <option value="1l-5l">₹1 Lakh – ₹5 Lakhs</option>
                    <option value="5l+">₹5 Lakhs+</option>
                    <option value="flexible">Flexible / To be discussed</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="c-timeline" className="mb-1.5 block text-sm font-medium text-foreground">
                    Expected Timeline
                  </label>
                  <select id="c-timeline" value={formData.timeline} onChange={(e) => update("timeline", e.target.value)} className={inputClass}>
                    <option value="">Select timeline</option>
                    <option value="urgent">Urgent (1–2 weeks)</option>
                    <option value="1month">Within 1 month</option>
                    <option value="3months">Within 3 months</option>
                    <option value="6months">Within 6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="c-desc" className="mb-1.5 block text-sm font-medium text-foreground">
                  Project Description <span className="text-destructive">*</span>
                </label>
                <textarea id="c-desc" rows={3} required value={formData.projectDescription} onChange={(e) => update("projectDescription", e.target.value)} placeholder="Describe your project, its goals, and key requirements..." className={`${inputClass} resize-none`} />
              </div>

              <div className="mt-5">
                <label htmlFor="c-challenges" className="mb-1.5 block text-sm font-medium text-foreground">
                  Business Challenges
                </label>
                <textarea id="c-challenges" rows={2} value={formData.businessChallenges} onChange={(e) => update("businessChallenges", e.target.value)} placeholder="What problems are you trying to solve?" className={`${inputClass} resize-none`} />
              </div>

              <div className="mt-5">
                <label htmlFor="c-goals" className="mb-1.5 block text-sm font-medium text-foreground">
                  Goals &amp; Expected Outcomes
                </label>
                <textarea id="c-goals" rows={2} value={formData.goals} onChange={(e) => update("goals", e.target.value)} placeholder="What does success look like for this project?" className={`${inputClass} resize-none`} />
              </div>

              <div className="mt-5">
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Attachment
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                  <span>Attach documents, briefs, or references (optional)</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" && <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>}
                {status === "sent" && <><CheckCircle className="h-4 w-4" /> Request Sent!</>}
                {status === "error" && "Something went wrong. Try again."}
                {status === "idle" && <><Send className="h-4 w-4" /> Request Consultation</>}
              </button>
            </form>
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
