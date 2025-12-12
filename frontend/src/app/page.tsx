import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/homepage/hero-section";
import { UseCasesSection } from "@/components/homepage/use-cases-section";
import { HowItWorksSection } from "@/components/homepage/how-it-works-section";
import { FeaturesDetailSection } from "@/components/homepage/features-detail-section";
import { LogoMarquee } from "@/components/homepage/logo-marquee";
import { TestimonialsSection } from "@/components/homepage/testimonials-section";
import { HomeFAQSection } from "@/components/homepage/faq-section";
import { CTASection } from "@/components/homepage/cta-section";
import { TrendingPills } from "@/components/homepage/trending-pills";
import { HomepageClient } from "@/components/homepage/homepage-client";

export const metadata: Metadata = {
  title: "MaxMate.ai - Free AI Toolkit Generator for Work & Life | 2,847+ Tools",
  description:
    "Generate your personalized AI toolkit in seconds. Tell us your profession and hobbies, get curated tool recommendations for 50+ professions. Free, no sign-up required.",
  keywords: [
    "AI toolkit",
    "AI tools",
    "productivity tools",
    "personalized AI",
    "work tools",
    "lifestyle AI",
    "product manager tools",
    "developer tools",
    "designer tools",
  ],
  openGraph: {
    title: "MaxMate.ai - Free AI Toolkit Generator",
    description:
      "Generate your personalized AI toolkit for work and life. 2,847+ tools, 50+ professions. Free, instant, no sign-up.",
    type: "website",
    url: "https://maxmate.ai",
    images: [
      {
        url: "https://maxmate.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "MaxMate AI Toolkit Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MaxMate.ai - Free AI Toolkit Generator",
    description:
      "Generate your personalized AI toolkit for work and life. 2,847+ tools, 50+ professions.",
  },
  alternates: {
    canonical: "https://maxmate.ai",
  },
};

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Search */}
        <HeroSection />

        {/* Trending Searches - Internal Linking */}
        <TrendingPills />

        {/* AI Tools Logo Marquee */}
        <LogoMarquee />

        {/* Use Cases by Profession */}
        <UseCasesSection />

        {/* How It Works */}
        <HowItWorksSection />

        {/* Features Detail with Images */}
        <FeaturesDetailSection />

        {/* Testimonials / Social Proof */}
        <TestimonialsSection />

        {/* FAQ Section - Schema.org enabled */}
        <HomeFAQSection />

        {/* Final CTA */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* First Visit Welcome Modal */}
      <HomepageClient />

      {/* Homepage Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "MaxMate.ai",
            url: "https://maxmate.ai",
            description:
              "The AI Operating System for Your Work & Life. Generate personalized AI toolkits in seconds.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://maxmate.ai/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </div>
  );
}
