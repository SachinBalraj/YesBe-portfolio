import { useSEO } from "@/hooks/useSEO";
import { LegalPageLayout } from "@/components/common/LegalPageLayout";
import { SITE_CONFIG } from "@/constants";

const LAST_UPDATED = "July 21, 2026";

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "information-collected", label: "Information We Collect" },
  { id: "how-information-is-used", label: "How We Use Your Information" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "data-protection", label: "Data Protection" },
  { id: "user-rights", label: "Your Rights" },
  { id: "data-retention", label: "Data Retention" },
  { id: "changes-to-policy", label: "Changes to This Policy" },
  { id: "contact-details", label: "Contact Details" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  description: "YesBe Privacy Policy — Learn how we collect, use, and protect your personal information when you use our services.",
  url: "https://yesbe.com/privacy-policy",
  publisher: {
    "@type": "Organization",
    name: "YesBe",
    url: "https://yesbe.com",
  },
  dateModified: "2026-07-21",
};

export function PrivacyPolicyPage() {
  useSEO({
    title: "Privacy Policy — How We Protect Your Data",
    description: "YesBe Privacy Policy. Learn how we collect, use, store, and protect your personal information. Understand your rights and our data practices.",
    canonical: "https://yesbe.com/privacy-policy",
  });

  return (
    <LegalPageLayout
      title="Privacy"
      highlight="Policy"
      badge="Legal"
      description="How we collect, use, and protect your personal information."
      lastUpdated={LAST_UPDATED}
      toc={toc}
      schema={schema}
      breadcrumb={[{ label: "Privacy Policy" }]}
    >
      <div className="space-y-10">
        {/* Introduction */}
        <section id="introduction">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Introduction</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              Welcome to <strong>YesBe</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website <strong>yesbe.com</strong> and use our services.
            </p>
            <p>
              By accessing or using our website and services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our practices, please do not use our services.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Information We Collect */}
        <section id="information-collected">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Information We Collect</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>We may collect the following types of information:</p>

            <h3 className="text-lg font-semibold mt-6 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full name, email address, and phone number</li>
              <li>Company name and designation</li>
              <li>Billing and payment information</li>
              <li>Project requirements and business details</li>
              <li>Any information you voluntarily provide through contact forms</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address, browser type, and operating system</li>
              <li>Pages visited, time spent on pages, and navigation patterns</li>
              <li>Referring website or source</li>
              <li>Device type and screen resolution</li>
              <li>Location data (country/city level)</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* How We Use Your Information */}
        <section id="how-information-is-used">
          <h2 className="text-2xl font-bold tracking-tight mb-4">How We Use Your Information</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, operate, and maintain our services</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send project proposals, quotations, and contracts</li>
              <li>To process payments and manage billing</li>
              <li>To improve our website, services, and user experience</li>
              <li>To analyze website usage and optimize performance</li>
              <li>To send newsletters and marketing communications (with your consent)</li>
              <li>To comply with legal obligations and enforce our terms</li>
              <li>To detect, prevent, and address technical issues or fraud</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Cookies */}
        <section id="cookies">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Cookies &amp; Tracking Technologies</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you interact with our website.
            </p>
            <p>
              For detailed information about the cookies we use, please refer to our dedicated <a href="/cookie-policy" className="text-primary font-medium hover:underline">Cookie Policy</a>.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Third-Party Services */}
        <section id="third-party-services">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Third-Party Services</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>We may use third-party services that collect information to help us improve our services. These include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics</strong> — for website usage analysis and reporting</li>
              <li><strong>Google Tag Manager</strong> — for managing analytics and marketing tags</li>
              <li><strong>WhatsApp Business</strong> — for communication and customer support</li>
              <li><strong>Email Services</strong> — for transactional and marketing emails</li>
            </ul>
            <p>
              These third-party providers have their own privacy policies governing the use of your information. We encourage you to review their policies.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Data Protection */}
        <section id="data-protection">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Data Protection</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSL/TLS encryption for data in transit</li>
              <li>Secure hosting infrastructure with regular security audits</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Regular security assessments and vulnerability testing</li>
              <li>Limited access to personal data on a need-to-know basis</li>
            </ul>
            <p>
              While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest standards.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* User Rights */}
        <section id="user-rights">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Your Rights</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right to Access</strong> — Request a copy of the personal data we hold about you</li>
              <li><strong>Right to Rectification</strong> — Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to Erasure</strong> — Request deletion of your personal data</li>
              <li><strong>Right to Restrict Processing</strong> — Request limitation of how we process your data</li>
              <li><strong>Right to Data Portability</strong> — Request transfer of your data in a structured format</li>
              <li><strong>Right to Object</strong> — Object to processing of your personal data for certain purposes</li>
              <li><strong>Right to Withdraw Consent</strong> — Withdraw previously given consent at any time</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary font-medium hover:underline">{SITE_CONFIG.email}</a>.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Data Retention */}
        <section id="data-retention">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Data Retention</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.
            </p>
            <p>
              Project-related data is retained for the duration of the business relationship and for a period of up to 3 years after project completion, unless a longer retention period is required by law.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Changes to Policy */}
        <section id="changes-to-policy">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Changes to This Policy</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page with a revised &quot;Last Updated&quot; date.
            </p>
            <p>
              We encourage you to review this page periodically for the latest information on our privacy practices.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Contact Details */}
        <section id="contact-details">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Contact Details</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
            <div className="rounded-2xl border border-border/60 bg-[#f8fafc] p-6 mt-4">
              <ul className="space-y-2">
                <li><strong>Company:</strong> {SITE_CONFIG.name}</li>
                <li><strong>Email:</strong> <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">{SITE_CONFIG.email}</a></li>
                <li><strong>Phone:</strong> <a href={`tel:${SITE_CONFIG.phone}`} className="text-primary hover:underline">+91 {SITE_CONFIG.phone}</a></li>
                <li><strong>Location:</strong> {SITE_CONFIG.location}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
