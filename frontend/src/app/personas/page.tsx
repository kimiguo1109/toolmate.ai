import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PersonasGrid } from "./personas-grid";

export const metadata: Metadata = {
  title: "AI Toolkits by Profession | 50+ Personas | MaxMate",
  description:
    "Discover personalized AI toolkits for 50+ professions. Product Managers, Developers, Designers, Marketers, and more. Find the perfect AI stack for your role.",
  keywords: [
    "AI tools by profession",
    "product manager AI tools",
    "developer AI tools",
    "designer AI tools",
    "marketer AI tools",
    "AI toolkit",
  ],
  openGraph: {
    title: "AI Toolkits by Profession - 50+ Personas",
    description: "Find the perfect AI toolkit for your profession. Curated tools for 50+ roles.",
    type: "website",
    url: "https://maxmate.ai/personas",
  },
  alternates: {
    canonical: "https://maxmate.ai/personas",
  },
};

const PERSONAS_FAQ = [
  { question: "How are these profession toolkits curated?", answer: "Each toolkit is curated by analyzing the typical workflows, challenges, and goals of professionals in that role. We combine data from 100K+ generated toolkits with expert reviews to recommend the most impactful AI tools for each profession." },
  { question: "Can I combine tools from different professions?", answer: "Absolutely! After generating your toolkit, you can easily add tools from any category. Many users combine work-focused tools with lifestyle tools for a complete AI stack." },
  { question: "How often are profession toolkits updated?", answer: "We update our recommendations weekly based on new tool releases, user feedback, and changes in the AI landscape. You'll always get the most current and relevant recommendations." },
  { question: "What if my profession isn't listed?", answer: "Use our custom toolkit generator! Enter your specific role and interests, and our AI will match you with relevant tools from our database of 2,847+ applications." },
];

const PROFESSIONS = [
  {
    name: "Product Manager",
    slug: "product-manager",
    icon: "inventory_2",
    color: "bg-blue-500",
    toolCount: 24,
    description: "Sprint planning, roadmapping, and stakeholder communication tools.",
    popularTools: ["Jira AI", "Notion AI", "Miro AI"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    name: "Software Developer",
    slug: "developer",
    icon: "code",
    color: "bg-purple-500",
    toolCount: 32,
    description: "Code assistance, debugging, and documentation generation tools.",
    popularTools: ["GitHub Copilot", "ChatGPT", "Cursor"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
  },
  {
    name: "UX Designer",
    slug: "designer",
    icon: "palette",
    color: "bg-pink-500",
    toolCount: 28,
    description: "Design generation, prototyping, and user research tools.",
    popularTools: ["Figma AI", "Midjourney", "Framer AI"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    name: "Marketing Manager",
    slug: "marketer",
    icon: "campaign",
    color: "bg-orange-500",
    toolCount: 26,
    description: "Content creation, SEO optimization, and analytics tools.",
    popularTools: ["Jasper AI", "Copy.ai", "Surfer SEO"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    name: "Content Writer",
    slug: "writer",
    icon: "edit_note",
    color: "bg-teal-500",
    toolCount: 22,
    description: "Writing assistance, editing, and research tools.",
    popularTools: ["Claude", "Grammarly", "Hemingway"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
  },
  {
    name: "Data Scientist",
    slug: "data-scientist",
    icon: "analytics",
    color: "bg-green-500",
    toolCount: 18,
    description: "Data analysis, visualization, and ML model development tools.",
    popularTools: ["ChatGPT", "Julius AI", "Hex"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    name: "Sales Representative",
    slug: "sales",
    icon: "handshake",
    color: "bg-red-500",
    toolCount: 20,
    description: "Lead generation, CRM automation, and outreach tools.",
    popularTools: ["Apollo AI", "Gong", "Outreach"],
    image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=600&q=80",
  },
  {
    name: "HR Manager",
    slug: "hr-manager",
    icon: "groups",
    color: "bg-indigo-500",
    toolCount: 16,
    description: "Recruitment, onboarding, and employee engagement tools.",
    popularTools: ["HireVue AI", "Textio", "Culture Amp"],
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
  },
  {
    name: "Student",
    slug: "student",
    icon: "school",
    color: "bg-amber-500",
    toolCount: 24,
    description: "Study assistance, research, and writing tools.",
    popularTools: ["Quillbot", "Notion AI", "Perplexity"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
  },
  {
    name: "Entrepreneur",
    slug: "entrepreneur",
    icon: "rocket_launch",
    color: "bg-cyan-500",
    toolCount: 30,
    description: "Business planning, market research, and automation tools.",
    popularTools: ["ChatGPT", "Canva AI", "Zapier AI"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
  },
  {
    name: "Customer Support",
    slug: "customer-support",
    icon: "support_agent",
    color: "bg-lime-500",
    toolCount: 14,
    description: "Ticket management, chatbots, and knowledge base tools.",
    popularTools: ["Zendesk AI", "Intercom", "Freshdesk"],
    image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=600&q=80",
  },
  {
    name: "Financial Analyst",
    slug: "financial-analyst",
    icon: "trending_up",
    color: "bg-emerald-500",
    toolCount: 12,
    description: "Financial modeling, forecasting, and reporting tools.",
    popularTools: ["Bloomberg GPT", "AlphaSense", "Visible Alpha"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
];

export default function PersonasPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              AI Toolkits by Profession
            </h1>
            
            {/* GEO Direct Answer Box */}
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-primary/20 rounded-xl p-6 mb-8 text-left">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>What are AI Toolkits by Profession?</strong> Pre-curated collections of AI tools 
                specifically selected for different professional roles. Each toolkit includes <strong>10-30 AI tools</strong> optimized 
                for your daily workflow — from coding assistants for developers to content generators for marketers. 
                <strong> 100K+ professionals</strong> have used these toolkits to boost their productivity.
              </p>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4">
              Select your profession below to see your recommended AI toolkit
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm">
                <span className="font-bold text-primary">2,847+</span>
                <span className="text-slate-600 dark:text-slate-400 ml-1">AI Tools</span>
              </div>
              <div className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm">
                <span className="font-bold text-primary">50+</span>
                <span className="text-slate-600 dark:text-slate-400 ml-1">Professions</span>
              </div>
              <div className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm">
                <span className="font-bold text-primary">100K+</span>
                <span className="text-slate-600 dark:text-slate-400 ml-1">Toolkits Created</span>
              </div>
            </div>
          </div>
        </section>

        {/* Personas Grid - reduced top margin */}
        <div className="-mt-6">
          <PersonasGrid professions={PROFESSIONS} />
        </div>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-slate-900/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {PERSONAS_FAQ.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5"
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Don&apos;t See Your Profession?
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Create a custom AI toolkit tailored to your unique role and interests. 
              It&apos;s free and takes just 30 seconds.
            </p>
            <Link
              href="/onboarding"
              className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full hover:shadow-lg transition-shadow"
            >
              Create Custom Toolkit
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
            "@type": "CollectionPage",
            name: "AI Toolkits by Profession",
            description: "Curated AI toolkits for 50+ professional roles",
            url: "https://maxmate.ai/personas",
            numberOfItems: PROFESSIONS.length,
            provider: {
              "@type": "Organization",
              name: "MaxMate.ai",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PERSONAS_FAQ.map((faq) => ({
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

