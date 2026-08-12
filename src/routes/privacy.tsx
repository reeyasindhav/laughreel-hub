import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/page-shell";

const TITLE = "Laughreel Privacy Policy";
const DESC =
  "How Laughreel collects, uses, and protects your personal data. Your privacy matters to us.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly, such as your name, email address, and payment details when you create an account or make a purchase. We also collect usage data, including pages visited, features used, and interaction patterns, to improve the Laughreel experience.",
  },
  {
    title: "How We Use Your Information",
    body: "Your data helps us personalise recommendations, process payments, send important account updates, and analyse platform performance. We do not sell your personal data to third parties. We may share anonymised, aggregated insights with comedians and partners to understand audience preferences.",
  },
  {
    title: "Data Storage and Security",
    body: "Laughreel stores data on secure servers with encryption at rest and in transit. We implement industry-standard security measures to protect against unauthorised access, alteration, or disclosure. While no system is completely infallible, we continuously monitor and upgrade our security practices.",
  },
  {
    title: "Cookies and Tracking",
    body: "We use cookies and similar technologies to maintain session state, remember preferences, and understand how users interact with the platform. You can manage cookie preferences through your browser settings. Disabling certain cookies may affect functionality.",
  },
  {
    title: "Third-Party Services",
    body: "Laughreel integrates with payment processors, analytics providers, and content delivery networks. These services have their own privacy policies, and we encourage you to review them. We only share data necessary for the specific service to function.",
  },
  {
    title: "Your Rights",
    body: "You have the right to access, correct, or delete your personal data. You may request a copy of your stored information or ask us to remove your account at any time by contacting our support team. We will respond within 30 days.",
  },
  {
    title: "Children's Privacy",
    body: "Laughreel is not intended for users under the age of 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal information, please contact us immediately so we can delete it.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations. We will notify users of significant changes via email or a prominent notice on the platform. Continued use of Laughreel after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "Contact Us",
    body: "If you have questions or concerns about this Privacy Policy or your data, please reach out to our privacy team at privacy@laughreel.com. We take your privacy seriously and will do our best to address your inquiry promptly.",
  },
];

function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Your data, your rules"
        title={
          <>
            PRIVACY <span className="text-primary">POLICY</span>
          </>
        }
        subtitle="Transparent about what we collect, why we collect it, and how we keep it safe."
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
