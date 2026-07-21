import { useSEO } from "@/hooks/useSEO";
import { LegalPageLayout } from "@/components/common/LegalPageLayout";
import { SITE_CONFIG } from "@/constants";

const LAST_UPDATED = "July 21, 2026";

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "advance-payment", label: "Advance Payment Policy" },
  { id: "refund-eligibility", label: "Refund Eligibility" },
  { id: "non-refundable", label: "Non-Refundable Services" },
  { id: "cancellation", label: "Cancellation Terms" },
  { id: "project-termination", label: "Project Termination" },
  { id: "third-party-costs", label: "Third-Party Costs" },
  { id: "contact", label: "Contact for Refund Requests" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Refund Policy",
  description: "YesBe Refund Policy — Learn about our advance payment terms, refund eligibility, cancellation terms, and project termination policies.",
  url: "https://yesbe.com/refund-policy",
  publisher: {
    "@type": "Organization",
    name: "YesBe",
    url: "https://yesbe.com",
  },
  dateModified: "2026-07-21",
};

export function RefundPolicyPage() {
  useSEO({
    title: "Refund Policy — Payment & Cancellation Terms",
    description: "YesBe Refund Policy. Understand our advance payment requirements, refund eligibility criteria, cancellation terms, and third-party cost policies.",
    canonical: "https://yesbe.com/refund-policy",
  });

  return (
    <LegalPageLayout
      title="Refund"
      highlight="Policy"
      badge="Legal"
      description="Our advance payment, cancellation, and refund terms."
      lastUpdated={LAST_UPDATED}
      toc={toc}
      schema={schema}
      breadcrumb={[{ label: "Refund Policy" }]}
    >
      <div className="space-y-10">
        {/* Introduction */}
        <section id="introduction">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Introduction</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              At <strong>YesBe</strong>, we value transparency in all our business dealings. This Refund Policy outlines the terms and conditions governing refunds, cancellations, and payment disputes for our services. We encourage all clients to review this policy carefully before engaging our services.
            </p>
            <p>
              By making a payment for our services, you acknowledge and agree to the terms outlined in this policy.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Advance Payment Policy */}
        <section id="advance-payment">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Advance Payment Policy</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>A minimum advance payment of <strong>50%</strong> of the total quoted amount is required before any project work begins.</li>
              <li>For projects exceeding ₹2,00,000, a milestone-based payment schedule will be agreed upon in the project contract.</li>
              <li>The advance payment secures your project slot and allocates dedicated resources to your project.</li>
              <li>Work will not commence until the advance payment has been received and confirmed.</li>
              <li>Payment receipts will be provided for all transactions.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Refund Eligibility */}
        <section id="refund-eligibility">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Refund Eligibility</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>Refunds may be issued under the following circumstances:</p>

            <h3 className="text-lg font-semibold mt-6 mb-3">Full Refund</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>If work has not yet commenced and a cancellation request is received within <strong>48 hours</strong> of making the advance payment</li>
              <li>If YesBe is unable to deliver the agreed-upon services due to unforeseen circumstances</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">Partial Refund</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>If the client cancels after work has commenced, a partial refund may be issued based on the percentage of work completed</li>
              <li>The refund amount will be calculated as: <strong>Advance Paid minus (Cost of Work Completed + Administrative Fees)</strong></li>
              <li>An administrative fee of <strong>10%</strong> of the advance payment may be deducted to cover processing costs</li>
            </ul>

            <div className="rounded-2xl border border-border/60 bg-[#f8fafc] p-5 mt-4">
              <p className="text-sm text-foreground/70">
                <strong>Note:</strong> Refund requests are typically processed within <strong>7–10 business days</strong> from the date of approval. Refunds will be made using the original payment method.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Non-Refundable Services */}
        <section id="non-refundable">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Non-Refundable Services</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>The following services and payments are non-refundable:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consulting fees for sessions already delivered</li>
              <li>Domain name registration and renewal fees</li>
              <li>Third-party software licenses purchased on behalf of the client</li>
              <li>Cloud hosting and infrastructure setup costs</li>
              <li>SEO, GEO, and AEO services that have already been initiated</li>
              <li>Custom development work that has been delivered and approved</li>
              <li>Setup and configuration fees</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Cancellation Terms */}
        <section id="cancellation">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Cancellation Terms</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Before work begins:</strong> Full refund of advance payment (minus administrative fee)</li>
              <li><strong>Within the first 25% of project timeline:</strong> Up to 50% refund of advance payment</li>
              <li><strong>After 25% of project timeline:</strong> No refund; client is responsible for full project cost</li>
              <li>Cancellation requests must be submitted in writing via email to <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary font-medium hover:underline">{SITE_CONFIG.email}</a></li>
              <li>The effective date of cancellation is the date we receive and acknowledge the written request</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Project Termination */}
        <section id="project-termination">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Project Termination</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>Either party may terminate the project agreement with <strong>14 days&apos; written notice</strong>.</li>
              <li>Upon termination, all completed work up to that date will be delivered to the client upon payment of outstanding amounts.</li>
              <li>YesBe retains the right to withhold deliverables until all outstanding payments are settled.</li>
              <li>In the event of a dispute, both parties agree to attempt resolution through good-faith negotiation before pursuing further remedies.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Third-Party Costs */}
        <section id="third-party-costs">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Third-Party Costs</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>Third-party costs (including but not limited to domain registration, hosting, SSL certificates, and software licenses) are <strong>non-refundable</strong> once incurred.</li>
              <li>Any third-party services procured on behalf of the client will be billed at actual cost with no markup.</li>
              <li>Clients will be provided with receipts/invoices for all third-party purchases.</li>
              <li>YesBe is not liable for refunds from third-party service providers. Any such claims must be directed to the respective provider.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Contact */}
        <section id="contact">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Contact for Refund Requests</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>To request a refund or for any questions regarding this policy, please contact us:</p>
            <div className="rounded-2xl border border-border/60 bg-[#f8fafc] p-6 mt-4">
              <ul className="space-y-2">
                <li><strong>Company:</strong> {SITE_CONFIG.name}</li>
                <li><strong>Email:</strong> <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">{SITE_CONFIG.email}</a></li>
                <li><strong>Phone:</strong> <a href={`tel:${SITE_CONFIG.phone}`} className="text-primary hover:underline">+91 {SITE_CONFIG.phone}</a></li>
                <li><strong>Response Time:</strong> We aim to respond to all refund requests within 2 business days</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
