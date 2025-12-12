import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PricingCards } from "./pricing-cards";

export const metadata: Metadata = {
  title: "Pricing - MaxMate.ai | Free AI Toolkit Generator",
  description:
    "MaxMate is free to use. Generate personalized AI toolkits at no cost. Premium features available for power users and teams.",
  keywords: ["MaxMate pricing", "AI toolkit free", "AI tools pricing", "free AI generator"],
  openGraph: {
    title: "Pricing - Free AI Toolkit Generator | MaxMate",
    description: "Generate unlimited AI toolkits for free. Premium plans available for power users.",
    type: "website",
    url: "https://maxmate.ai/pricing",
  },
  alternates: {
    canonical: "https://maxmate.ai/pricing",
  },
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to get started",
    features: [
      "Unlimited toolkit generations",
      "Access to 2,847+ AI tools database",
      "Personalized recommendations",
      "Shareable toolkit pages",
      "Basic SEO optimization",
      "Community support",
    ],
    cta: "Get Started",
    ctaLink: "/onboarding",
    highlighted: false,
    badge: null,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For power users who want more",
    features: [
      "Everything in Free",
      "Custom branding on toolkit pages",
      "Advanced analytics",
      "Priority tool recommendations",
      "API access",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Coming Soon",
    ctaLink: null,
    highlighted: true,
    badge: "Popular",
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Shared toolkit libraries",
      "Admin dashboard",
      "SSO integration",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Us",
    ctaLink: "/contact",
    highlighted: false,
    badge: null,
  },
];

const FAQS = [
  {
    question: "Is MaxMate really free?",
    answer:
      "Yes! Generating personalized AI toolkits is completely free. You can create unlimited toolkits, access our full database of 2,847+ AI tools, and share your toolkit pages with anyone.",
  },
  {
    question: "What's included in the Pro plan?",
    answer:
      "Pro plan adds custom branding, advanced analytics, API access, and priority support. It's perfect for creators and professionals who want to showcase their AI stack professionally.",
  },
  {
    question: "Do I need a credit card to sign up?",
    answer:
      "No credit card required for the Free plan. You can start generating toolkits immediately without any payment information.",
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer:
      "Yes, you can change your plan at any time. When you upgrade, you'll be charged a prorated amount. When you downgrade, your new rate takes effect at the next billing cycle.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-10 px-4 text-center bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full mb-3">
              Free Forever
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Simple, Transparent Pricing
            </h1>
            
            {/* GEO Direct Answer Box */}
            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 border border-primary/20 rounded-xl p-4 mb-4 text-left">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>How much does MaxMate cost?</strong> Core features are <strong>completely free</strong> — 
                unlimited toolkit generations, 2,847+ AI tools, and shareable pages. 
                Premium plans ($9-$29/mo) available for power users.
              </p>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Start for free. Upgrade when you need more.
            </p>
          </div>
        </section>

        {/* Pricing Cards - reduced spacing */}
        <div className="-mt-4">
          <PricingCards plans={PLANS} />
        </div>

        {/* Feature Comparison */}
        <section className="py-16 px-4 bg-white dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
              What&apos;s Included
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-medium text-slate-600 dark:text-slate-400">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-medium text-slate-600 dark:text-slate-400">
                      Free
                    </th>
                    <th className="text-center py-4 px-4 font-medium text-primary">
                      Pro
                    </th>
                    <th className="text-center py-4 px-4 font-medium text-slate-600 dark:text-slate-400">
                      Team
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    ["Toolkit Generations", "Unlimited", "Unlimited", "Unlimited"],
                    ["AI Tools Database", "2,847+", "2,847+", "2,847+"],
                    ["Shareable Pages", "✓", "✓", "✓"],
                    ["Custom Branding", "—", "✓", "✓"],
                    ["Analytics", "Basic", "Advanced", "Advanced"],
                    ["API Access", "—", "✓", "✓"],
                    ["Team Workspaces", "—", "—", "✓"],
                    ["Support", "Community", "Priority", "Dedicated"],
                  ].map(([feature, free, pro, team]) => (
                    <tr key={feature}>
                      <td className="py-4 px-4 text-slate-900 dark:text-white">{feature}</td>
                      <td className="py-4 px-4 text-center text-slate-600 dark:text-slate-400">{free}</td>
                      <td className="py-4 px-4 text-center text-primary font-medium">{pro}</td>
                      <td className="py-4 px-4 text-center text-slate-600 dark:text-slate-400">{team}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800/50"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Join 100,000+ professionals who have discovered their perfect AI toolkit. It&apos;s
              free, fast, and no credit card required.
            </p>
            <Link
              href="/onboarding"
              className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full hover:shadow-lg transition-shadow"
            >
              Generate My Toolkit — Free
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "MaxMate AI Toolkit Generator",
            description: "Personalized AI toolkit generator for professionals",
            offers: [
              {
                "@type": "Offer",
                name: "Free",
                price: "0",
                priceCurrency: "USD",
                description: "Unlimited toolkit generations, full database access",
              },
              {
                "@type": "Offer",
                name: "Pro",
                price: "9",
                priceCurrency: "USD",
                description: "Custom branding, advanced analytics, API access",
              },
              {
                "@type": "Offer",
                name: "Team",
                price: "29",
                priceCurrency: "USD",
                description: "Team workspaces, SSO, dedicated support",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}

