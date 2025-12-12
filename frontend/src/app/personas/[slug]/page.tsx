import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProfessionToolkits } from "./profession-toolkits";

// Demo data - in production this would come from API/database
const PROFESSION_DATA: Record<string, {
  name: string;
  description: string;
  longDescription: string;
  toolCount: number;
  image: string;
  icon: string;
  color: string;
  topTools: { name: string; logo: string; description: string; rating: number }[];
  sampleToolkits: { name: string; slug: string; hobby: string; toolCount: number }[];
}> = {
  "product-manager": {
    name: "Product Manager",
    description: "AI tools for sprint planning, roadmapping, and stakeholder communication.",
    longDescription: "Product Managers need AI tools that streamline sprint planning, automate documentation, and improve stakeholder communication. Our curated collection includes tools for backlog management, user research analysis, and roadmap visualization. Whether you're managing agile teams or coordinating cross-functional projects, these AI assistants help you focus on strategy while automating repetitive tasks.",
    toolCount: 24,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    icon: "inventory_2",
    color: "bg-blue-500",
    topTools: [
      { name: "Jira AI", logo: "#0052CC", description: "Automates sprint planning and backlog summarization", rating: 4 },
      { name: "Notion AI", logo: "#000000", description: "Document summarization and action item generation", rating: 5 },
      { name: "Miro AI", logo: "#FFD02F", description: "Mind maps and diagrams from text prompts", rating: 5 },
      { name: "Slack AI", logo: "#4A154B", description: "Channel recaps and conversation summaries", rating: 4 },
    ],
    sampleToolkits: [
      { name: "Kimi's PM + Hiking Kit", slug: "kimi-pm-hiker", hobby: "Hiking", toolCount: 12 },
      { name: "Alex's PM + Gaming Kit", slug: "alex-pm-gaming", hobby: "Gaming", toolCount: 10 },
      { name: "Sarah's PM + Photography Kit", slug: "sarah-pm-photography", hobby: "Photography", toolCount: 11 },
    ],
  },
  "developer": {
    name: "Software Developer",
    description: "AI tools for code assistance, debugging, and documentation.",
    longDescription: "Software Developers benefit from AI tools that accelerate coding, catch bugs early, and generate documentation automatically. Our collection includes code completion assistants, debugging helpers, and documentation generators. From pair programming with AI to automated code reviews, these tools help you ship faster while maintaining code quality.",
    toolCount: 32,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    icon: "code",
    color: "bg-purple-500",
    topTools: [
      { name: "GitHub Copilot", logo: "#000000", description: "AI pair programmer for code completion", rating: 5 },
      { name: "Cursor", logo: "#7C3AED", description: "AI-first code editor with chat integration", rating: 5 },
      { name: "ChatGPT", logo: "#10A37F", description: "General-purpose coding assistant", rating: 5 },
      { name: "Tabnine", logo: "#6366F1", description: "AI code completion for any IDE", rating: 4 },
    ],
    sampleToolkits: [
      { name: "Mike's Dev + Gaming Kit", slug: "mike-dev-gaming", hobby: "Gaming", toolCount: 14 },
      { name: "Lisa's Dev + Music Kit", slug: "lisa-dev-music", hobby: "Music", toolCount: 12 },
      { name: "Tom's Dev + Fitness Kit", slug: "tom-dev-fitness", hobby: "Fitness", toolCount: 11 },
    ],
  },
  "designer": {
    name: "UX Designer",
    description: "AI tools for design generation, prototyping, and user research.",
    longDescription: "UX Designers can leverage AI to accelerate design workflows, generate variations, and analyze user feedback. Our curated tools help with everything from wireframing to high-fidelity mockups, user testing analysis, and design system management. Create more, iterate faster, and make data-driven design decisions.",
    toolCount: 28,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    icon: "palette",
    color: "bg-pink-500",
    topTools: [
      { name: "Figma AI", logo: "#F24E1E", description: "AI-powered design features in Figma", rating: 5 },
      { name: "Midjourney", logo: "#000000", description: "Image generation for design inspiration", rating: 5 },
      { name: "Framer AI", logo: "#0055FF", description: "Generate websites and prototypes", rating: 4 },
      { name: "Uizard", logo: "#7C3AED", description: "Transform sketches into digital designs", rating: 4 },
    ],
    sampleToolkits: [
      { name: "Emma's Design + Photography Kit", slug: "emma-design-photography", hobby: "Photography", toolCount: 13 },
      { name: "Chris's Design + Travel Kit", slug: "chris-design-travel", hobby: "Travel", toolCount: 11 },
      { name: "Nina's Design + Art Kit", slug: "nina-design-art", hobby: "Art", toolCount: 12 },
    ],
  },
};

// Default data for unknown professions
const DEFAULT_PROFESSION = {
  name: "Professional",
  description: "AI tools curated for your profession.",
  longDescription: "Discover AI tools tailored for your specific role and workflow needs.",
  toolCount: 20,
  image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&q=80",
  icon: "work",
  color: "bg-gray-500",
  topTools: [],
  sampleToolkits: [],
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profession = PROFESSION_DATA[slug] || DEFAULT_PROFESSION;

  return {
    title: `AI Tools for ${profession.name}s | ${profession.toolCount}+ Tools | MaxMate`,
    description: `${profession.description} Discover ${profession.toolCount}+ curated AI tools for ${profession.name}s.`,
    keywords: [
      `AI tools for ${profession.name}`,
      `${profession.name} AI toolkit`,
      `best AI tools ${profession.name}`,
      "AI productivity tools",
      "MaxMate",
    ],
  };
}

export default async function ProfessionPage({ params }: PageProps) {
  const { slug } = await params;
  const profession = PROFESSION_DATA[slug] || DEFAULT_PROFESSION;

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 px-4">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={profession.image}
              alt={`AI tools for ${profession.name}`}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background-light/80 via-background-light to-background-light dark:from-background-dark/80 dark:via-background-dark dark:to-background-dark" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-slate-500 hover:text-primary">Home</Link>
              <span className="text-slate-400">/</span>
              <Link href="/personas" className="text-slate-500 hover:text-primary">Personas</Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-700 dark:text-slate-300">{profession.name}</span>
            </nav>

            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 ${profession.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="material-symbols-outlined text-white text-3xl">
                  {profession.icon}
                </span>
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                  AI Tools for {profession.name}s
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {profession.toolCount}+ curated tools • Updated Dec 2025
                </p>
              </div>
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed mb-8">
              {profession.longDescription}
            </p>

            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Generate Your {profession.name} Toolkit
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* Top Tools */}
        {profession.topTools.length > 0 && (
          <section className="py-12 px-4 bg-white dark:bg-slate-900/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Most Popular Tools for {profession.name}s
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {profession.topTools.map((tool) => (
                  <article
                    key={tool.name}
                    className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800/50 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: tool.logo }}
                      >
                        {tool.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-xs ${i < tool.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{tool.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sample Toolkits */}
        <ProfessionToolkits 
          profession={profession.name} 
          toolkits={profession.sampleToolkits} 
        />

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Build Your Perfect {profession.name} Toolkit
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Tell us your hobbies and interests to get a personalized AI toolkit that balances work and life.
            </p>
            <Link
              href="/onboarding"
              className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full hover:shadow-lg transition-shadow"
            >
              Get Started — Free
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: "product-manager" },
    { slug: "developer" },
    { slug: "designer" },
    { slug: "marketer" },
    { slug: "writer" },
    { slug: "student" },
  ];
}

