"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GeoBox } from "@/components/seo/geo-box";
import { FAQSection } from "@/components/seo/faq-section";
import { ToolkitContent } from "./toolkit-content";
import { RelatedToolkits } from "./related-toolkits";
import { ToolkitCTA } from "./toolkit-cta";

interface ToolkitData {
  userName: string;
  slug: string;
  profession: string;
  professionSlug: string;
  workContext: string;
  lifeContext: string;
  description: string;
  longDescription?: string;
  workTools: {
    name: string;
    logo: string;
    rating: number;
    description: string;
    ctaText: string;
    category?: string;
    price?: number;
  }[];
  lifeTools: {
    name: string;
    description: string;
    backgroundImage: string;
  }[];
  specs: {
    totalTools: number;
    monthlyCost: number;
    primaryGoal: string;
    updatedAt: string;
    freeTools?: number;
    paidTools?: number;
  };
  faq?: { question: string; answer: string }[];
  relatedProfessions?: { name: string; slug: string }[];
}

interface FallbackData {
  userName: string;
  profession: string;
  professionSlug: string;
  workContext: string;
  lifeContext: string;
  description: string;
  hobby: string;
}

interface ToolkitPageClientProps {
  username: string;
  fallbackData: FallbackData | null;
}

// Default toolkit generator for fallback
function generateDefaultToolkit(fallback: FallbackData): ToolkitData {
  const WORK_TOOLS: Record<string, { name: string; logo: string; rating: number; description: string; ctaText: string; category: string; price: number }[]> = {
    "product-manager": [
      { name: "Jira AI", logo: "#0052CC", rating: 4, description: "Automates sprint planning and summarizes backlog.", ctaText: "Try Free", category: "PM", price: 0 },
      { name: "Notion AI", logo: "#000000", rating: 5, description: "Summarizes documents and generates action items.", ctaText: "Try Free", category: "Docs", price: 10 },
      { name: "Miro AI", logo: "#FFD02F", rating: 5, description: "Generates mind maps and diagrams from text.", ctaText: "Try Free", category: "Collab", price: 0 },
      { name: "Slack AI", logo: "#4A154B", rating: 4, description: "Channel recaps and conversation summaries.", ctaText: "Try Free", category: "Chat", price: 0 },
    ],
    "developer": [
      { name: "GitHub Copilot", logo: "#000000", rating: 5, description: "AI pair programmer for faster coding.", ctaText: "Try Free", category: "Code", price: 10 },
      { name: "Cursor", logo: "#7C3AED", rating: 5, description: "AI-first code editor with chat.", ctaText: "Try Free", category: "IDE", price: 20 },
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "General AI for coding and debugging.", ctaText: "Try Free", category: "AI", price: 0 },
      { name: "Tabnine", logo: "#6366F1", rating: 4, description: "AI completion in any IDE.", ctaText: "Try Free", category: "Code", price: 0 },
    ],
    "designer": [
      { name: "Figma AI", logo: "#F24E1E", rating: 5, description: "AI design features in Figma.", ctaText: "Try Free", category: "Design", price: 15 },
      { name: "Midjourney", logo: "#000000", rating: 5, description: "Generate images for design.", ctaText: "Try Free", category: "Gen", price: 10 },
      { name: "Framer AI", logo: "#0055FF", rating: 4, description: "Generate and publish websites.", ctaText: "Try Free", category: "Web", price: 0 },
      { name: "Uizard", logo: "#7C3AED", rating: 4, description: "Transform sketches to designs.", ctaText: "Try Free", category: "Proto", price: 0 },
    ],
    "marketer": [
      { name: "Jasper AI", logo: "#FF6B6B", rating: 5, description: "AI writing for marketing.", ctaText: "Try Free", category: "Write", price: 49 },
      { name: "Copy.ai", logo: "#7C3AED", rating: 4, description: "Generate marketing copy.", ctaText: "Try Free", category: "Copy", price: 0 },
      { name: "Surfer SEO", logo: "#10B981", rating: 4, description: "AI-powered SEO optimization.", ctaText: "Try Free", category: "SEO", price: 89 },
      { name: "Canva AI", logo: "#00C4CC", rating: 5, description: "Create graphics with AI.", ctaText: "Try Free", category: "Design", price: 0 },
    ],
  };

  const LIFE_TOOLS: Record<string, { name: string; description: string; backgroundImage: string }[]> = {
    hiking: [
      { name: "AllTrails AI", description: "Find hiking routes based on weather and fitness.", backgroundImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80" },
      { name: "Mountain Project", description: "AI hiking route recommendations.", backgroundImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
    ],
    gaming: [
      { name: "Discord AI", description: "Smart moderation for gaming servers.", backgroundImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" },
      { name: "Parsec", description: "Low-latency game streaming.", backgroundImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80" },
    ],
    cooking: [
      { name: "ChefGPT", description: "Generate recipes from your ingredients.", backgroundImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" },
      { name: "Whisk", description: "AI meal planning.", backgroundImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80" },
    ],
    traveling: [
      { name: "TripIt AI", description: "Smart travel planning.", backgroundImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80" },
      { name: "Hopper", description: "AI flight price predictions.", backgroundImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" },
    ],
  };

  const workTools = WORK_TOOLS[fallback.professionSlug] || WORK_TOOLS["product-manager"];
  const lifeTools = LIFE_TOOLS[fallback.hobby] || LIFE_TOOLS["hiking"];

  return {
    userName: fallback.userName,
    slug: "",
    profession: fallback.profession,
    professionSlug: fallback.professionSlug,
    workContext: fallback.workContext,
    lifeContext: fallback.lifeContext,
    description: fallback.description,
    longDescription: `This AI toolkit is designed for ${fallback.profession}s who enjoy ${fallback.lifeContext.toLowerCase()}. Work tools optimize your daily workflow, while life tools enhance your hobbies.`,
    workTools,
    lifeTools,
    specs: {
      totalTools: workTools.length + lifeTools.length + 6,
      monthlyCost: workTools.reduce((sum, t) => sum + t.price, 0),
      primaryGoal: "Productivity",
      updatedAt: "Dec 2025",
      freeTools: workTools.filter((t) => t.price === 0).length + lifeTools.length,
      paidTools: workTools.filter((t) => t.price > 0).length,
    },
    faq: [
      { question: `Why these tools for ${fallback.profession}s?`, answer: `Our SmartMatch™ algorithm selected these based on real ${fallback.profession} workflows and user ratings.` },
      { question: "Can I customize this toolkit?", answer: "Yes! Swap, add, or remove tools to fit your needs." },
      { question: "Is it really free?", answer: "Yes, generating toolkits is free. Individual tools have their own pricing." },
    ],
    relatedProfessions: [
      { name: "Technical PM", slug: "technical-pm" },
      { name: "Project Manager", slug: "project-manager" },
    ],
  };
}

export function ToolkitPageClient({ username, fallbackData }: ToolkitPageClientProps) {
  const [toolkit, setToolkit] = useState<ToolkitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to load from sessionStorage first (dynamically generated)
    const stored = sessionStorage.getItem("generated_toolkit");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // Check if this is the right toolkit by slug match
        if (data.slug === username || !data.slug) {
          setToolkit(data);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.error("Failed to parse stored toolkit");
      }
    }

    // Fall back to demo data
    if (fallbackData) {
      setToolkit(generateDefaultToolkit(fallbackData));
    }
    setIsLoading(false);
  }, [username, fallbackData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!toolkit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Toolkit Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          This toolkit doesn&apos;t exist yet. Create your own!
        </p>
        <Link
          href="/onboarding"
          className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:opacity-90"
        >
          Create My Toolkit
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-40 py-10">
      <article className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap gap-2 text-sm mb-4" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/personas" className="text-gray-500 hover:text-primary">Personas</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/personas/${toolkit.professionSlug}`} className="text-gray-500 hover:text-primary">
              {toolkit.profession}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 dark:text-gray-300">{toolkit.userName}&apos;s Kit</span>
          </nav>

          {/* Title & Actions */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {toolkit.userName}&apos;s AI Toolkit: {toolkit.workContext} &amp; {toolkit.lifeContext}
            </h1>
            <div className="flex items-center gap-3">
              <motion.button
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-white text-sm font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="material-symbols-outlined text-base">content_copy</span>
                Clone Kit
              </motion.button>
              <motion.button
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="material-symbols-outlined text-base">share</span>
                Share
              </motion.button>
              <motion.button
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="material-symbols-outlined text-base">edit</span>
                Edit
              </motion.button>
            </div>
          </motion.div>

          {/* GEO Box */}
          <GeoBox
            profession={toolkit.profession}
            hobby={toolkit.lifeContext}
            toolCount={toolkit.specs.totalTools}
            freeToolCount={toolkit.specs.freeTools || 6}
            primaryGoal={toolkit.specs.primaryGoal}
            avgCost={toolkit.specs.monthlyCost}
            updatedAt={toolkit.specs.updatedAt}
          />

          {/* Long Description */}
          {toolkit.longDescription && (
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              {toolkit.longDescription}
            </p>
          )}
        </header>

        {/* Main Content */}
        <ToolkitContent toolkit={toolkit} />

        {/* Related Toolkits */}
        {toolkit.relatedProfessions && (
          <RelatedToolkits professions={toolkit.relatedProfessions} />
        )}

        {/* FAQ */}
        {toolkit.faq && (
          <FAQSection faqs={toolkit.faq} profession={toolkit.profession} />
        )}

        {/* CTA */}
        <ToolkitCTA />
      </article>
    </div>
  );
}

