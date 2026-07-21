import { useSEO } from "@/hooks/useSEO";
import { LegalPageLayout } from "@/components/common/LegalPageLayout";
import { SITE_CONFIG } from "@/constants";

const LAST_UPDATED = "July 21, 2026";

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "types-of-cookies", label: "Types of Cookies" },
  { id: "why-cookies", label: "Why We Use Cookies" },
  { id: "analytics", label: "Analytics & Performance" },
  { id: "third-party-cookies", label: "Third-Party Cookies" },
  { id: "user-controls", label: "Managing Your Preferences" },
  { id: "browser-settings", label: "Browser Settings" },
  { id: "updates", label: "Updates to This Policy" },
  { id: "contact", label: "Contact Us" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cookie Policy",
  description: "YesBe Cookie Policy — Learn about the types of cookies we use, why we use them, and how you can manage your cookie preferences.",
  url: "https://yesbe.com/cookie-policy",
  publisher: {
    "@type": "Organization",
    name: "YesBe",
    url: "https://yesbe.com",
  },
  dateModified: "2026-07-21",
};

export function CookiePolicyPage() {
  useSEO({
    title: "Cookie Policy — How We Use Cookies",
    description: "YesBe Cookie Policy. Understand the types of cookies we use, their purpose, analytics tools, and how to manage your cookie preferences.",
    canonical: "https://yesbe.com/cookie-policy",
  });

  return (
    <LegalPageLayout
      title="Cookie"
      highlight="Policy"
      badge="Legal"
      description="Understanding the cookies and tracking technologies we use."
      lastUpdated={LAST_UPDATED}
      toc={toc}
      schema={schema}
      breadcrumb={[{ label: "Cookie Policy" }]}
    >
      <div className="space-y-10">
        {/* Introduction */}
        <section id="introduction">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Introduction</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              This Cookie Policy explains how <strong>YesBe</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar tracking technologies when you visit our website <strong>yesbe.com</strong>. We believe in transparency about the technologies we use, and this policy provides you with clear information about our cookie practices.
            </p>
            <p>
              For information about how we handle your personal data more broadly, please refer to our <a href="/privacy-policy" className="text-primary font-medium hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Types of Cookies */}
        <section id="types-of-cookies">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm mt-4">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-4 font-semibold text-foreground">Cookie Type</th>
                    <th className="py-3 pr-4 font-semibold text-foreground">Purpose</th>
                    <th className="py-3 font-semibold text-foreground">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Essential Cookies</td>
                    <td className="py-3 pr-4">Required for basic website functionality, security, and session management</td>
                    <td className="py-3">Session / 1 year</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Analytics Cookies</td>
                    <td className="py-3 pr-4">Help us understand how visitors interact with our website to improve performance</td>
                    <td className="py-3">Up to 2 years</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Functional Cookies</td>
                    <td className="py-3 pr-4">Remember your preferences and settings to provide a personalized experience</td>
                    <td className="py-3">Up to 1 year</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">Marketing Cookies</td>
                    <td className="py-3 pr-4">Used to deliver relevant advertisements and track campaign effectiveness</td>
                    <td className="py-3">Up to 2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Why We Use Cookies */}
        <section id="why-cookies">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Why We Use Cookies</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>Cookies serve several important purposes on our website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Security:</strong> To protect against cross-site scripting (XSS) attacks and maintain secure sessions</li>
              <li><strong>Performance:</strong> To monitor website performance and identify areas for improvement</li>
              <li><strong>Functionality:</strong> To remember your preferences and provide a smoother browsing experience</li>
              <li><strong>Analytics:</strong> To understand visitor behavior, popular content, and traffic sources</li>
              <li><strong>Communication:</strong> To enable WhatsApp chat widgets and contact form functionality</li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Analytics */}
        <section id="analytics">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Analytics &amp; Performance</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>We use <strong>Google Analytics</strong> to collect anonymous information about how visitors use our website. Google Analytics uses cookies to track:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Number of visitors and page views</li>
              <li>Time spent on pages and average session duration</li>
              <li>Traffic sources and referring websites</li>
              <li>Geographic location (country/city level)</li>
              <li>Device types and browser information</li>
              <li>User navigation patterns and popular content</li>
            </ul>
            <p>
              This data is aggregated and anonymized, meaning it cannot be used to identify individual users. We use this information solely to improve our website and services.
            </p>
            <p>
              Google Analytics operates under the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Google Privacy Policy</a>. You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Google Analytics Opt-out Browser Add-on</a>.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Third-Party Cookies */}
        <section id="third-party-cookies">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Third-Party Cookies</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics &amp; Google Tag Manager</strong> — for website analytics and tag management</li>
              <li><strong>WhatsApp Business</strong> — for our live chat widget functionality</li>
            </ul>
            <p>
              We do not control third-party cookies. Please refer to the respective third-party&apos;s privacy policy for more information about their cookie practices.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* User Controls */}
        <section id="user-controls">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Managing Your Cookie Preferences</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Browser Controls:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to block or delete cookies</li>
              <li><strong>Opt-out Links:</strong> Use opt-out mechanisms provided by analytics services (e.g., Google Analytics Opt-out)</li>
              <li><strong>Incognito/Private Mode:</strong> Browse in incognito or private mode to prevent cookies from being stored</li>
            </ul>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mt-4">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Disabling certain cookies may impact the functionality of our website. Essential cookies cannot be disabled as they are necessary for basic site operations.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Browser Settings */}
        <section id="browser-settings">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Browser-Specific Instructions</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>Here are links to cookie management instructions for popular browsers:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Microsoft Edge</a></li>
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* Updates */}
        <section id="updates">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Updates to This Policy</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. Any changes will be posted on this page with a revised &quot;Last Updated&quot; date.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Contact */}
        <section id="contact">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Contact Us</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>If you have any questions about our use of cookies, please contact us:</p>
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
