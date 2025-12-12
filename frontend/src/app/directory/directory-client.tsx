"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { fadeUp, staggerContainer } from "@/lib/animations";

const CATEGORIES = [
  { id: "all", label: "All Tools", icon: "apps" },
  { id: "writing", label: "Writing", icon: "edit_note" },
  { id: "coding", label: "Coding", icon: "code" },
  { id: "design", label: "Design", icon: "palette" },
  { id: "productivity", label: "Productivity", icon: "task_alt" },
  { id: "marketing", label: "Marketing", icon: "campaign" },
  { id: "research", label: "Research", icon: "science" },
  { id: "data", label: "Data", icon: "analytics" },
];

// Tool data with brand colors for logos
const ALL_TOOLS = [
  // Writing (12 tools)
  { name: "ChatGPT", category: "writing", rating: 5, color: "#10A37F", description: "Advanced conversational AI for writing and content creation", users: "100M+", pricing: "Free / $20/mo" },
  { name: "Claude", category: "writing", rating: 5, color: "#D97757", description: "Advanced AI assistant for complex writing and analysis", users: "10M+", pricing: "Free / $20/mo" },
  { name: "Grammarly", category: "writing", rating: 5, color: "#15C39A", description: "AI writing assistant for grammar, spelling, and style", users: "30M+", pricing: "Free / $12/mo" },
  { name: "Jasper AI", category: "writing", rating: 5, color: "#FF6B6B", description: "AI content platform for marketing teams", users: "100K+", pricing: "$49/mo" },
  { name: "Copy.ai", category: "writing", rating: 4, color: "#7C3AED", description: "AI copywriting for marketing content and emails", users: "500K+", pricing: "Free / $49/mo" },
  { name: "Quillbot", category: "writing", rating: 4, color: "#4CAF50", description: "AI paraphrasing and summarizing tool", users: "10M+", pricing: "Free / $10/mo" },
  { name: "Writesonic", category: "writing", rating: 4, color: "#6366F1", description: "AI writing for blogs, ads, and social media", users: "500K+", pricing: "Free / $16/mo" },
  { name: "Wordtune", category: "writing", rating: 4, color: "#FF7043", description: "AI-powered rewriting and editing tool", users: "1M+", pricing: "Free / $10/mo" },
  { name: "Rytr", category: "writing", rating: 4, color: "#E91E63", description: "AI writing assistant for 40+ use cases", users: "500K+", pricing: "Free / $9/mo" },
  { name: "Sudowrite", category: "writing", rating: 4, color: "#9C27B0", description: "AI writing partner for fiction authors", users: "100K+", pricing: "$10/mo" },
  { name: "Anyword", category: "writing", rating: 4, color: "#00BCD4", description: "AI copywriting with performance predictions", users: "100K+", pricing: "$49/mo" },
  { name: "Hemingway", category: "writing", rating: 4, color: "#FFC107", description: "Makes your writing bold and clear", users: "1M+", pricing: "Free" },
  // Coding (12 tools)
  { name: "GitHub Copilot", category: "coding", rating: 5, color: "#000000", description: "AI pair programmer in your IDE", users: "1.5M+", pricing: "$10/mo" },
  { name: "Cursor", category: "coding", rating: 5, color: "#7C3AED", description: "AI-first code editor with chat and edit", users: "500K+", pricing: "$20/mo" },
  { name: "Tabnine", category: "coding", rating: 4, color: "#6366F1", description: "AI code completion for any IDE", users: "1M+", pricing: "Free / $12/mo" },
  { name: "Replit AI", category: "coding", rating: 4, color: "#F26207", description: "AI-powered coding in the browser", users: "20M+", pricing: "Free / $7/mo" },
  { name: "Codeium", category: "coding", rating: 4, color: "#09B6A2", description: "Free AI code completion for 70+ languages", users: "500K+", pricing: "Free" },
  { name: "AWS CodeWhisperer", category: "coding", rating: 4, color: "#FF9900", description: "AI coding companion from Amazon", users: "500K+", pricing: "Free" },
  { name: "Sourcegraph Cody", category: "coding", rating: 4, color: "#FF5543", description: "AI coding assistant with codebase context", users: "200K+", pricing: "Free / $9/mo" },
  { name: "Pieces", category: "coding", rating: 4, color: "#000000", description: "AI code snippet manager and assistant", users: "100K+", pricing: "Free" },
  { name: "Codium AI", category: "coding", rating: 4, color: "#4338CA", description: "AI-powered test generation", users: "100K+", pricing: "Free / $19/mo" },
  { name: "Blackbox AI", category: "coding", rating: 4, color: "#1A1A1A", description: "AI code generation from prompts", users: "1M+", pricing: "Free" },
  { name: "Continue", category: "coding", rating: 4, color: "#3B82F6", description: "Open-source AI code assistant", users: "50K+", pricing: "Free" },
  { name: "Phind", category: "coding", rating: 4, color: "#8B5CF6", description: "AI search engine for developers", users: "500K+", pricing: "Free" },
  // Design (12 tools)
  { name: "Midjourney", category: "design", rating: 5, color: "#000000", description: "AI image generation from text prompts", users: "15M+", pricing: "$10/mo" },
  { name: "DALL-E 3", category: "design", rating: 5, color: "#10A37F", description: "Advanced AI image generation by OpenAI", users: "10M+", pricing: "Via ChatGPT+" },
  { name: "Figma AI", category: "design", rating: 4, color: "#F24E1E", description: "AI features built into Figma", users: "4M+", pricing: "Included" },
  { name: "Canva AI", category: "design", rating: 5, color: "#00C4CC", description: "AI design for graphics and presentations", users: "150M+", pricing: "Free / $13/mo" },
  { name: "Adobe Firefly", category: "design", rating: 4, color: "#FF0000", description: "AI generation in Adobe Creative Cloud", users: "5M+", pricing: "Included" },
  { name: "Stable Diffusion", category: "design", rating: 4, color: "#A855F7", description: "Open-source AI image generation", users: "10M+", pricing: "Free" },
  { name: "Leonardo AI", category: "design", rating: 4, color: "#8B5CF6", description: "AI image and asset generation", users: "5M+", pricing: "Free / $10/mo" },
  { name: "Runway", category: "design", rating: 5, color: "#000000", description: "AI video and image generation suite", users: "2M+", pricing: "$12/mo" },
  { name: "Pika", category: "design", rating: 4, color: "#FF6B35", description: "AI video generation from text", users: "1M+", pricing: "Free / $8/mo" },
  { name: "Ideogram", category: "design", rating: 4, color: "#6366F1", description: "AI image generation with text rendering", users: "2M+", pricing: "Free / $8/mo" },
  { name: "Photoroom", category: "design", rating: 4, color: "#4F46E5", description: "AI background removal and editing", users: "5M+", pricing: "Free / $10/mo" },
  { name: "Krea AI", category: "design", rating: 4, color: "#EC4899", description: "Real-time AI image generation", users: "500K+", pricing: "Free / $24/mo" },
  // Productivity (12 tools)
  { name: "Notion AI", category: "productivity", rating: 5, color: "#000000", description: "AI assistant in your Notion workspace", users: "30M+", pricing: "$10/mo" },
  { name: "Otter.ai", category: "productivity", rating: 4, color: "#4A90A4", description: "AI meeting transcription and notes", users: "1M+", pricing: "Free / $17/mo" },
  { name: "Zapier AI", category: "productivity", rating: 4, color: "#FF4A00", description: "AI-powered workflow automation", users: "2M+", pricing: "Free / $20/mo" },
  { name: "Motion", category: "productivity", rating: 4, color: "#6366F1", description: "AI calendar and project management", users: "100K+", pricing: "$19/mo" },
  { name: "Reclaim AI", category: "productivity", rating: 4, color: "#00A3FF", description: "AI scheduling for time management", users: "200K+", pricing: "Free / $10/mo" },
  { name: "Mem AI", category: "productivity", rating: 4, color: "#1A1A1A", description: "Self-organizing AI notes app", users: "100K+", pricing: "$15/mo" },
  { name: "Taskade", category: "productivity", rating: 4, color: "#FF6B6B", description: "AI-powered project collaboration", users: "500K+", pricing: "Free / $8/mo" },
  { name: "Superhuman", category: "productivity", rating: 4, color: "#5046E5", description: "AI-powered fastest email experience", users: "500K+", pricing: "$30/mo" },
  { name: "Clockwise", category: "productivity", rating: 4, color: "#6366F1", description: "AI calendar optimization", users: "100K+", pricing: "Free / $7/mo" },
  { name: "Krisp", category: "productivity", rating: 4, color: "#1A1A1A", description: "AI noise cancellation for calls", users: "1M+", pricing: "Free / $8/mo" },
  { name: "Fireflies.ai", category: "productivity", rating: 4, color: "#FF5722", description: "AI meeting assistant and notes", users: "500K+", pricing: "Free / $10/mo" },
  { name: "Tl;dv", category: "productivity", rating: 4, color: "#10B981", description: "AI meeting recorder and summarizer", users: "200K+", pricing: "Free / $20/mo" },
  // Marketing (12 tools)
  { name: "Surfer SEO", category: "marketing", rating: 4, color: "#00BFA5", description: "AI SEO content optimization", users: "100K+", pricing: "$89/mo" },
  { name: "Semrush", category: "marketing", rating: 4, color: "#FF642D", description: "AI SEO and competitive analysis", users: "1M+", pricing: "$130/mo" },
  { name: "HubSpot AI", category: "marketing", rating: 4, color: "#FF7A59", description: "AI features in HubSpot CRM", users: "200K+", pricing: "Included" },
  { name: "Persado", category: "marketing", rating: 4, color: "#00C4B4", description: "AI marketing language platform", users: "50K+", pricing: "Enterprise" },
  { name: "Phrasee", category: "marketing", rating: 4, color: "#6366F1", description: "AI copywriting for email marketing", users: "50K+", pricing: "Enterprise" },
  { name: "Lately AI", category: "marketing", rating: 4, color: "#F59E0B", description: "AI social media content creation", users: "100K+", pricing: "$49/mo" },
  { name: "AdCreative.ai", category: "marketing", rating: 4, color: "#8B5CF6", description: "AI ad creative generation", users: "500K+", pricing: "$29/mo" },
  { name: "Synthesia", category: "marketing", rating: 4, color: "#2563EB", description: "AI video generation with avatars", users: "200K+", pricing: "$22/mo" },
  { name: "Descript", category: "marketing", rating: 4, color: "#10B981", description: "AI video and podcast editing", users: "500K+", pricing: "Free / $12/mo" },
  { name: "Pictory", category: "marketing", rating: 4, color: "#EC4899", description: "AI video creation from text", users: "200K+", pricing: "$19/mo" },
  { name: "Lumen5", category: "marketing", rating: 4, color: "#3B82F6", description: "AI video maker for marketers", users: "500K+", pricing: "$19/mo" },
  { name: "Flick", category: "marketing", rating: 4, color: "#8B5CF6", description: "AI social media marketing tool", users: "100K+", pricing: "$14/mo" },
  // Research (12 tools)
  { name: "Perplexity AI", category: "research", rating: 5, color: "#20B2AA", description: "AI search engine with cited sources", users: "10M+", pricing: "Free / $20/mo" },
  { name: "Elicit", category: "research", rating: 5, color: "#6366F1", description: "AI research assistant for papers", users: "500K+", pricing: "Free / $10/mo" },
  { name: "Consensus", category: "research", rating: 4, color: "#10B981", description: "AI search for scientific research", users: "200K+", pricing: "Free / $10/mo" },
  { name: "Semantic Scholar", category: "research", rating: 4, color: "#1A73E8", description: "AI academic paper search", users: "1M+", pricing: "Free" },
  { name: "Scholarcy", category: "research", rating: 4, color: "#FF9800", description: "AI article summarizer", users: "100K+", pricing: "Free / $10/mo" },
  { name: "Research Rabbit", category: "research", rating: 4, color: "#E91E63", description: "AI literature mapping tool", users: "200K+", pricing: "Free" },
  { name: "Scite AI", category: "research", rating: 4, color: "#3B82F6", description: "AI citation analysis", users: "100K+", pricing: "$12/mo" },
  { name: "Connected Papers", category: "research", rating: 4, color: "#10B981", description: "Visual paper discovery tool", users: "500K+", pricing: "Free" },
  { name: "Iris AI", category: "research", rating: 4, color: "#8B5CF6", description: "AI research workspace", users: "50K+", pricing: "$25/mo" },
  { name: "Litmaps", category: "research", rating: 4, color: "#F59E0B", description: "AI literature review tool", users: "100K+", pricing: "Free / $10/mo" },
  { name: "Scispace", category: "research", rating: 4, color: "#6366F1", description: "AI for reading research papers", users: "500K+", pricing: "Free / $12/mo" },
  { name: "Undermind", category: "research", rating: 4, color: "#1A1A1A", description: "AI research search engine", users: "50K+", pricing: "Free" },
  // Data (12 tools)
  { name: "Tableau AI", category: "data", rating: 4, color: "#E97627", description: "AI-powered data visualization", users: "1M+", pricing: "$70/mo" },
  { name: "Power BI Copilot", category: "data", rating: 4, color: "#F2C811", description: "AI in Microsoft Power BI", users: "5M+", pricing: "Included" },
  { name: "ThoughtSpot", category: "data", rating: 4, color: "#3B82F6", description: "AI-powered analytics platform", users: "200K+", pricing: "Enterprise" },
  { name: "DataRobot", category: "data", rating: 5, color: "#00A67E", description: "Enterprise AI/ML platform", users: "100K+", pricing: "Enterprise" },
  { name: "Obviously AI", category: "data", rating: 4, color: "#6366F1", description: "No-code AI predictions", users: "50K+", pricing: "$75/mo" },
  { name: "Akkio", category: "data", rating: 4, color: "#10B981", description: "AI data analysis platform", users: "30K+", pricing: "$50/mo" },
  { name: "MonkeyLearn", category: "data", rating: 4, color: "#F59E0B", description: "AI text analysis", users: "50K+", pricing: "$299/mo" },
  { name: "Hex", category: "data", rating: 4, color: "#8B5CF6", description: "AI-powered data workspace", users: "100K+", pricing: "Free / $28/mo" },
  { name: "Julius AI", category: "data", rating: 4, color: "#3B82F6", description: "AI data analyst", users: "200K+", pricing: "Free / $20/mo" },
  { name: "Rows", category: "data", rating: 4, color: "#10B981", description: "AI-powered spreadsheets", users: "100K+", pricing: "Free / $15/mo" },
  { name: "Equals", category: "data", rating: 4, color: "#1A1A1A", description: "AI spreadsheet for startups", users: "50K+", pricing: "$49/mo" },
  { name: "Polymer", category: "data", rating: 4, color: "#EC4899", description: "AI data analysis and viz", users: "50K+", pricing: "$20/mo" },
];

const DIRECTORY_FAQ = [
  { question: "How do you select tools for this directory?", answer: "We evaluate AI tools based on user ratings, feature set, pricing transparency, company reputation, and real-world performance. Each tool undergoes review before being added to our curated database." },
  { question: "How often is the directory updated?", answer: "Our directory is updated weekly with new tools, pricing changes, and feature updates. We also remove tools that are discontinued or no longer meet our quality standards." },
  { question: "Are the ratings based on user reviews?", answer: "Yes, ratings combine user reviews, expert analysis, and our internal testing. We consider factors like ease of use, feature depth, customer support, and value for money." },
  { question: "Can I suggest a tool to add?", answer: "Absolutely! We welcome tool suggestions from our community. Use our contact form to submit a tool for review, and we'll evaluate it for inclusion in our directory." },
];

export function DirectoryClient() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_TOOLS.length };
    CATEGORIES.forEach(cat => {
      if (cat.id !== "all") {
        counts[cat.id] = ALL_TOOLS.filter(t => t.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-1">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-40 py-10">
          <div className="max-w-7xl mx-auto">
            {/* Header with GEO Box */}
            <header className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                AI Tool Directory
              </h1>
              
              {/* GEO Direct Answer Box */}
              <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/20 rounded-xl p-5 mb-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>What is MaxMate's AI Tool Directory?</strong> A curated database of <strong>2,847+</strong> AI tools 
                  across {CATEGORIES.length - 1} categories including writing, coding, design, and productivity. 
                  This page showcases {ALL_TOOLS.length} featured tools. Each is rated, reviewed, and updated weekly.
                </p>
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-400">
                Compare features, pricing, and user ratings to find the best AI tools for your needs
              </p>
            </header>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools by name or feature..."
                  className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{cat.icon}</span>
                  {cat.label}
                  <span className="text-xs opacity-70">({categoryCounts[cat.id] || 0})</span>
                </button>
              ))}
            </div>

            {/* Tools Grid */}
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              initial="hidden"
              animate="show"
              variants={staggerContainer}
            >
              {filteredTools.map((tool) => (
                <motion.article
                  key={tool.name}
                  className="p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary/50 transition-all group"
                  variants={fadeUp}
                  whileHover={{ y: -2 }}
                  layout
                >
                  <div className="flex items-start gap-3 mb-2">
                    {/* Brand color logo */}
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-lg"
                      style={{ backgroundColor: tool.color }}
                    >
                      {tool.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate">
                        {tool.name}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{tool.category}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= tool.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                      ))}
                    </div>
                    <span className="text-primary font-medium">{tool.pricing}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                    <span className="text-xs text-slate-500">{tool.users} users</span>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* Results count - align with homepage claim */}
            <div className="text-center mt-8">
              <p className="text-slate-500 dark:text-slate-400">
                Showing {filteredTools.length} of <strong className="text-primary">2,847+</strong> tools in our database
                {selectedCategory !== "all" && ` (filtered by ${CATEGORIES.find(c => c.id === selectedCategory)?.label})`}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                This page shows featured tools. Use the search or generate a personalized toolkit to explore more.
              </p>
            </div>

            {/* FAQ Section */}
            <section className="mt-16 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {DIRECTORY_FAQ.map((faq, index) => (
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
            </section>

            {/* CTA */}
            <div className="mt-16 text-center bg-primary/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Not sure which tools to pick?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Let AI match you with the perfect toolkit based on your profession and interests
              </p>
              <Link href="/onboarding">
                <motion.button
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Generate My Toolkit
                  <span className="material-symbols-outlined">arrow_forward</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "AI Tool Directory",
            description: "Comprehensive directory of 2,847+ AI tools across all categories",
            url: "https://maxmate.ai/directory",
            numberOfItems: ALL_TOOLS.length,
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
            mainEntity: DIRECTORY_FAQ.map((faq) => ({
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

