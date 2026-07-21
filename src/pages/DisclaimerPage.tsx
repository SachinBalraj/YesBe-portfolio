import { useSEO } from "@/hooks/useSEO";
import { LegalPageLayout } from "@/components/common/LegalPageLayout";
import { SITE_CONFIG } from "@/constants";

const LAST_UPDATED = "July 21, 2026";

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "general-information", label: "General Information" },
  { id: "pricing-disclaimer", label: "Pricing Disclaimer" },
  { id: "technology-recommendations", label: "Technology Recommendations" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "professional-advice", label: "Professional Advice" },
  { id: "contact", label: "Contact Us" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Disclaimer",
  description: "YesBe Disclaimer — Important information about general disclaimers, pricing, technology recommendations, and limitation of liability.",
  url: "https://yesbe.com/disclaimer",
  publisher: {
    "@type": "Organization",
    name: "YesBe",
    url: "https://yesbe.com",
  },
  dateModified: "2026-07-21",
};

export function DisclaimerPage() {
  useSEO({
    title: "Disclaimer — Important Legal Information",
    description: "YesBe Disclaimer. Read about general information disclaimers, pricing policies, technology recommendations, third-party services, and liability limitations.",
    canonical: "https://yesbe.com/disclaimer",
  });

  return (
    <LegalPageLayout
      title="Legal"
      highlight="Disclaimer"
      badge="Legal"
      description="Important notices and limitations regarding our services and website content."
      lastUpdated={LAST_UPDATED}
      toc={toc}
      schema={schema}
      breadcrumb={[{ label: "Disclaimer" }]}
    >
      <div className="space-y-10">
        {/* Introduction */}
        <section id="introduction">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Introduction</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              The information provided on <strong>yesbe.com</strong> and through our services is intended for general informational purposes only. <strong>YesBe</strong> makes every effort to ensure that the information on this website is accurate and up to date; however, we make no warranties or representations of any kind regarding the completeness, accuracy, reliability, or availability of the information, services, or related graphics contained on this website.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* General Information */}
        <section id="general-information">
          <h2 className="text-2xl font-bold tracking-tight mb-4">General Information</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>The content on this website is provided &quot;as is&quot; without any express or implied warranties.</li>
              <li>Any reliance you place on information from this website is strictly at your own risk.</li>
              <li>We reserve the right to make changes, corrections, and improvements to the information, services, and products offered at any time without prior notice.</li>
              <li>The examples, case studies, and results presented on this website are for illustrative purposes and do not guarantee similar outcomes for all clients.</li>
              <li>Past project results and client testimonials represent individual experiences and should not be considered as typical or guaranteed results.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Pricing Disclaimer */}
        <section id="pricing-disclaimer">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Pricing Disclaimer</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>All pricing information displayed on this website is indicative and subject to change without prior notice.</li>
              <li>Actual project costs may vary based on specific requirements, scope, complexity, and timeline.</li>
              <li>Quoted prices are valid for <strong>15 business days</strong> from the date of issue unless otherwise specified.</li>
              <li>Additional costs may apply for scope changes, expedited timelines, or additional features requested during the project.</li>
              <li>All prices are quoted in <strong>Indian Rupees (INR)</strong> unless explicitly stated otherwise.</li>
              <li>Final pricing will be confirmed in a written proposal or contract before any work begins.</li>
            </ul>
            <p>
              For detailed payment and refund terms, please refer to our <a href="/terms-and-conditions" className="text-primary font-medium hover:underline">Terms &amp; Conditions</a> and <a href="/refund-policy" className="text-primary font-medium hover:underline">Refund Policy</a>.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Technology Recommendations */}
        <section id="technology-recommendations">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Technology Recommendations</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>Technology recommendations provided by YesBe are based on our professional expertise and assessment of client requirements at the time of consultation.</li>
              <li>The technology landscape evolves rapidly. Recommendations that are current at the time of proposal may be subject to changes in the broader technology ecosystem.</li>
              <li>Clients are encouraged to perform their own due diligence and seek independent advice where appropriate before making technology adoption decisions.</li>
              <li>YesBe is not responsible for any third-party technology changes, deprecations, or service discontinuations that may affect delivered solutions.</li>
              <li>Compatibility with future technologies or systems is not guaranteed unless explicitly stated in the project agreement.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Third-Party Services */}
        <section id="third-party-services">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Third-Party Services</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>Our website and services may contain links to third-party websites or services that are not owned or controlled by YesBe.</li>
              <li>We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</li>
              <li>We strongly advise you to read the terms and conditions and privacy policies of any third-party service you use.</li>
              <li>YesBe does not endorse or assume any responsibility for any third-party products, services, or content.</li>
              <li>Any transactions or interactions between you and a third-party service are solely between you and the third party.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Limitation of Liability */}
        <section id="limitation-of-liability">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Limitation of Liability</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              To the maximum extent permitted by applicable law, YesBe and its directors, employees, partners, agents, suppliers, and affiliates shall not be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill</li>
              <li>Any damages resulting from the use of or inability to use our services or website</li>
              <li>Any damages resulting from unauthorized access to or alteration of your data or transmissions</li>
              <li>Any damages resulting from third-party products, services, or content accessed through our services</li>
              <li>Any business losses, including loss of revenue, profit, or anticipated savings</li>
            </ul>
            <p>
              Our total aggregate liability for any claims arising from or related to our services shall not exceed the total amount paid by the client for the specific service giving rise to the claim.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Professional Advice */}
        <section id="professional-advice">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Professional Advice</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <ul className="list-disc pl-6 space-y-2">
              <li>The information on this website does not constitute professional, legal, financial, or tax advice.</li>
              <li>Consultants and experts at YesBe provide technology and business consulting services. Our advice should not be substituted for professional advice in regulated fields.</li>
              <li>Clients should consult with appropriate qualified professionals for advice specific to their situation.</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Contact */}
        <section id="contact">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Contact Us</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>If you have any questions about this Disclaimer, please contact us:</p>
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
