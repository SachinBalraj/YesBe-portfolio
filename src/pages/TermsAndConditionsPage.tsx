import { useSEO } from "@/hooks/useSEO";
import { LegalPageLayout } from "@/components/common/LegalPageLayout";

const LAST_UPDATED = "July 21, 2026";

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "services", label: "Our Services" },
  { id: "quotations", label: "Quotations & Proposals" },
  { id: "payments", label: "Payments & Billing" },
  { id: "client-responsibilities", label: "Client Responsibilities" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "revisions", label: "Revisions & Changes" },
  { id: "timelines", label: "Project Timelines" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms & Conditions",
  description: "YesBe Terms & Conditions governing the use of our services, payments, intellectual property, and client responsibilities.",
  url: "https://yesbe.com/terms-and-conditions",
  publisher: {
    "@type": "Organization",
    name: "YesBe",
    url: "https://yesbe.com",
  },
  dateModified: "2026-07-21",
};

export function TermsAndConditionsPage() {
  useSEO({
    title: "Terms & Conditions — Service Agreement",
    description: "YesBe Terms & Conditions. Read about our service terms, payment policies, intellectual property rights, project timelines, and legal obligations.",
    canonical: "https://yesbe.com/terms-and-conditions",
  });

  return (
    <LegalPageLayout
      title="Terms &"
      highlight="Conditions"
      badge="Legal"
      description="The terms governing your use of YesBe services and website."
      lastUpdated={LAST_UPDATED}
      toc={toc}
      schema={schema}
      breadcrumb={[{ label: "Terms & Conditions" }]}
    >
      <div className="space-y-10">
        {/* Introduction */}
        <section id="introduction">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Introduction</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              These Terms and Conditions (&quot;Terms&quot;) govern your use of the services provided by <strong>YesBe</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) and the website <strong>yesbe.com</strong>. By engaging our services or using our website, you agree to be bound by these Terms.
            </p>
            <p>
              Please read these Terms carefully before using our services. If you do not agree with any part of these Terms, you should not proceed with our services.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Services */}
        <section id="services">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Our Services</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>YesBe provides technology consulting and development services, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI Solutions and Machine Learning implementations</li>
              <li>ERP System development and deployment</li>
              <li>Website and Web Application development</li>
              <li>Business Process Automation</li>
              <li>Data Analytics and Power BI Dashboards</li>
              <li>Cloud Infrastructure and DevOps solutions</li>
              <li>SEO, GEO, and AEO optimization services</li>
              <li>Custom Software Development</li>
              <li>Business Consulting and Strategy</li>
            </ul>
            <p>
              The scope, deliverables, and specifications of each project will be defined in a separate proposal or contract agreed upon by both parties.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Quotations */}
        <section id="quotations">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Quotations &amp; Proposals</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>All quotations and proposals are valid for <strong>15 business days</strong> from the date of issue unless otherwise specified.</li>
              <li>Quotations are estimates and may be subject to change based on final project requirements and scope.</li>
              <li>Any changes to the project scope after acceptance may result in revised pricing, which will be communicated and agreed upon before proceeding.</li>
              <li>Verbal agreements are subject to written confirmation via a signed proposal or contract.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Payments */}
        <section id="payments">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Payments &amp; Billing</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Advance Payment:</strong> A minimum advance payment of <strong>50%</strong> of the total project cost is required before work commences, unless otherwise agreed in writing.</li>
              <li><strong>Milestone Payments:</strong> For larger projects, payments may be structured around agreed milestones as outlined in the project proposal.</li>
              <li><strong>Final Payment:</strong> The remaining balance is due upon project completion and before delivery of final assets or source code.</li>
              <li><strong>Payment Methods:</strong> Payments can be made via bank transfer, UPI, or other methods agreed upon.</li>
              <li><strong>Late Payments:</strong> Invoices not paid within <strong>15 days</strong> of the due date may incur a late fee of <strong>1.5% per month</strong>.</li>
              <li>All prices are quoted in <strong>Indian Rupees (INR)</strong> unless otherwise specified.</li>
            </ul>
            <p>
              For complete payment and refund details, please refer to our <a href="/refund-policy" className="text-primary font-medium hover:underline">Refund Policy</a>.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Client Responsibilities */}
        <section id="client-responsibilities">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Client Responsibilities</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>Clients are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing accurate and complete project requirements and information in a timely manner</li>
              <li>Designating a primary point of contact for project communications</li>
              <li>Reviewing and providing feedback on deliverables within agreed timeframes</li>
              <li>Ensuring they have the legal rights to any content, materials, or data provided to YesBe</li>
              <li>Timely decision-making to avoid project delays</li>
              <li>Ensuring compliance with applicable laws and regulations for their business</li>
            </ul>
            <p>
              Delays caused by the client in providing required information, feedback, or approvals may result in adjusted timelines and additional costs.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Intellectual Property */}
        <section id="intellectual-property">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Intellectual Property</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Ownership:</strong> Upon full and final payment, the client retains ownership of the final deliverables as specified in the project agreement.</li>
              <li><strong>Pre-existing IP:</strong> YesBe retains all rights to pre-existing intellectual property, frameworks, tools, and methodologies used in the development process.</li>
              <li><strong>Third-party Components:</strong> Deliverables may include third-party libraries, frameworks, or assets that are subject to their own licenses. The client agrees to comply with such licenses.</li>
              <li><strong>Portfolio Rights:</strong> YesBe reserves the right to display completed projects in its portfolio, case studies, and marketing materials, unless otherwise agreed in writing.</li>
              <li><strong>Source Code:</strong> Transfer of source code ownership is subject to full payment and must be explicitly agreed upon in the project contract.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Revisions */}
        <section id="revisions">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Revisions &amp; Changes</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard project proposals include a defined number of revision rounds, typically <strong>2–3 rounds</strong>, as specified in the project agreement.</li>
              <li>Additional revisions beyond the agreed scope will be billed separately at our standard hourly rate.</li>
              <li>Scope changes requested after project commencement will be evaluated for impact on timeline and cost, and a revised quote will be provided.</li>
              <li>Major changes that fundamentally alter the project scope may be treated as a new project requiring a separate agreement.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Timelines */}
        <section id="timelines">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Project Timelines</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>Project timelines are estimates and are subject to change based on scope, complexity, and client responsiveness.</li>
              <li>Delays in client feedback, approvals, or content delivery may push project completion dates accordingly.</li>
              <li>We will communicate any anticipated delays promptly and work to find mutually agreeable solutions.</li>
              <li>Timeline commitments are binding only when specified in a signed project agreement.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Liability */}
        <section id="liability">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Limitation of Liability</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>YesBe shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.</li>
              <li>Our total liability shall not exceed the total amount paid by the client for the specific service giving rise to the claim.</li>
              <li>We are not responsible for losses resulting from third-party services, hosting outages, or circumstances beyond our reasonable control.</li>
              <li>Clients are responsible for maintaining appropriate backups of their data and content.</li>
            </ul>
            <p>
              For a complete understanding of liability limitations, please review our <a href="/disclaimer" className="text-primary font-medium hover:underline">Disclaimer</a>.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Termination */}
        <section id="termination">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Termination</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>Either party may terminate the agreement with <strong>14 days&apos; written notice</strong>.</li>
              <li>In the event of termination, the client is responsible for payment for all work completed up to the date of termination.</li>
              <li>Advance payments are subject to our <a href="/refund-policy" className="text-primary font-medium hover:underline">Refund Policy</a>.</li>
              <li>Upon termination, all completed work and materials will be delivered to the client upon full payment of outstanding amounts.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Governing Law */}
        <section id="governing-law">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Governing Law</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes arising from these Terms or the services provided shall be subject to the exclusive jurisdiction of the courts in <strong>Salem, Tamil Nadu, India</strong>.
            </p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
