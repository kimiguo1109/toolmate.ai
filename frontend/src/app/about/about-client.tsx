"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { fadeUp, staggerContainer } from "@/lib/animations";

const FEATURES = [
  { 
    icon: "psychology", 
    title: "AI Matching Engine", 
    description: "Our SmartMatch™ algorithm analyzes your profession, workflow, and interests to recommend the most relevant AI tools from our database of 2,847+ applications." 
  },
  { 
    icon: "storage", 
    title: "Curated Tool Database", 
    description: "Every tool is reviewed, rated, and categorized by our team. We update pricing, features, and ratings weekly to ensure accuracy." 
  },
  { 
    icon: "groups", 
    title: "Community Insights", 
    description: "Benefit from 100K+ professionals who've shared their toolkits. See what tools work best for people in similar roles." 
  },
  { 
    icon: "trending_up", 
    title: "Always Current", 
    description: "The AI landscape changes fast. We track new releases, shutdowns, and major updates so your toolkit stays relevant." 
  },
];

const STATS = [
  { value: "2,847+", label: "AI Tools Indexed" },
  { value: "50+", label: "Professions Covered" },
  { value: "100K+", label: "Toolkits Generated" },
  { value: "4.9/5", label: "Average Rating" },
];

const ABOUT_FAQ = [
  { question: "How does MaxMate's AI matching work?", answer: "Our SmartMatch™ algorithm analyzes your profession, typical workflows, and personal interests. It then cross-references this with our database of 2,847+ AI tools, considering factors like integration capabilities, user ratings, pricing, and real-world productivity gains to recommend the most impactful tools for your specific situation." },
  { question: "Is MaxMate free to use?", answer: "Yes! Generating your personalized AI toolkit is completely free with no sign-up required. We offer premium features for power users, including toolkit sharing, team dashboards, and advanced customization options." },
  { question: "How do I share my toolkit with others?", answer: "Every generated toolkit has a unique shareable URL (e.g., maxmate.ai/u/your-name-profession-hobby). Simply copy and share this link with colleagues, friends, or on social media. Recipients can view your complete toolkit and even clone it to customize for themselves." },
  { question: "How do you keep tool recommendations up to date?", answer: "Our team continuously monitors the AI tool landscape. We update our database weekly with new tools, pricing changes, feature updates, and user reviews. Tools that are discontinued or receive poor feedback are flagged or removed to ensure you always get relevant recommendations." },
];

export function AboutClient() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-1">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-40 py-16">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Hero */}
            <motion.header className="text-center mb-12" variants={fadeUp}>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                About <span className="text-primary">MaxMate</span>
              </h1>
              
              {/* GEO Direct Answer Box */}
              <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>What is MaxMate?</strong> MaxMate is a free AI toolkit generator that helps professionals 
                  discover the perfect AI tools for their work and life. Tell us your profession and hobbies, 
                  and we'll match you with personalized tool recommendations from our database of <strong>2,847+ AI applications</strong>.
                </p>
              </div>
            </motion.header>

            {/* Mission */}
            <motion.section 
              className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 mb-12 border border-gray-200 dark:border-gray-700"
              variants={fadeUp}
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                The AI tool landscape is exploding. With thousands of new tools launching every month, 
                finding the right ones for your specific needs is overwhelming. You could spend hours 
                researching, testing, and comparing – or you could let us do the work.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>MaxMate solves this</strong> by using AI to match you with tools that fit your profession, 
                workflow, and even your hobbies. In 30 seconds, you get a personalized toolkit that would 
                take hours to research manually.
              </p>
            </motion.section>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
              variants={fadeUp}
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Features */}
            <motion.section className="mb-12" variants={fadeUp}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                How It Works
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {FEATURES.map((feature) => (
                  <div 
                    key={feature.title}
                    className="p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-primary text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* FAQ */}
            <motion.section className="mb-12" variants={fadeUp}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {ABOUT_FAQ.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-5"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-slate-900 dark:text-white">
                      {faq.question}
                      <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">
                        expand_more
                      </span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </motion.section>

            {/* CTA */}
            <motion.div 
              className="text-center bg-primary/10 rounded-2xl p-8"
              variants={fadeUp}
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Ready to find your perfect AI toolkit?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                It takes 30 seconds and no sign-up required
              </p>
              <Link href="/onboarding">
                <motion.button
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started — Free
                  <span className="material-symbols-outlined">arrow_forward</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MaxMate.ai",
            url: "https://maxmate.ai",
            description: "AI toolkit generator for professionals",
            foundingDate: "2024",
            sameAs: [],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ABOUT_FAQ.map((faq) => ({
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

