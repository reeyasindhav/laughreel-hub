import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/page-shell";

const TITLE = "Laughreel Terms of Service";
const DESC =
  "The rules, rights, and responsibilities for using Laughreel. Please read before you laugh.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using Laughreel, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our platform.",
  },
  {
    title: "Account Responsibilities",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account and keep your details up to date.",
  },
  {
    title: "Subscription and Payments",
    body: "Paid membership plans renew automatically unless cancelled before the billing date. Refunds are handled on a case-by-case basis. Laughreel reserves the right to adjust pricing with reasonable notice to existing subscribers.",
  },
  {
    title: "Content and Conduct",
    body: "You agree not to use Laughreel for unlawful purposes, to distribute harmful content, or to interfere with the platform's operation. User-generated content, including comments and reviews, must respect community standards and the rights of others.",
  },
  {
    title: "Intellectual Property",
    body: "All content on Laughreel, including videos, graphics, logos, and software, is owned by Laughreel or its licensors. You may not reproduce, distribute, or create derivative works without explicit written permission.",
  },
  {
    title: "Termination",
    body: "We reserve the right to suspend or terminate accounts that violate these terms or engage in abusive behaviour. Upon termination, your right to access the platform will cease immediately, and any outstanding payments remain due.",
  },
  {
    title: "Limitation of Liability",
    body: "Laughreel is provided on an as-is basis. We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including loss of data or interruption of service.",
  },
  {
    title: "Changes to Terms",
    body: "We may revise these Terms of Service from time to time. Significant changes will be communicated via email or platform notice. Continued use of Laughreel after updates implies acceptance of the revised terms.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of India. Any disputes arising from these terms or your use of Laughreel shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.",
  },
  {
    title: "Contact Us",
    body: "For questions about these Terms of Service, please contact our legal team at legal@laughreel.com. We aim to respond to all inquiries within 5 business days.",
  },
];

function TermsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Play fair, laugh loud"
        title={
          <>
            TERMS OF <span className="text-primary">SERVICE</span>
          </>
        }
        subtitle="The ground rules for using Laughreel. Clear, fair, and written in plain language."
      />
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="space-y-10">
          {sections.map((section, i) => (
            <div
              key={section.title}
              className="rounded-3xl border border-border bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <h2 className="mb-3 font-display text-2xl">{section.title}</h2>
              <p className="leading-relaxed text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-block rounded-xl bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-neon)]"
          >
            Back to Laughreel
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
