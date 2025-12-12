import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import { ToolkitPageClient } from "./toolkit-page-client";

// Demo data - fallback when no session data
const DEMO_TOOLKITS: Record<string, {
  userName: string;
  profession: string;
  professionSlug: string;
  workContext: string;
  lifeContext: string;
  description: string;
  hobby: string;
}> = {
  "kimi-pm-hiker": {
    userName: "Kimi",
    profession: "Product Manager",
    professionSlug: "product-manager",
    workContext: "SaaS Management",
    lifeContext: "Outdoor Adventure",
    description: "A personalized AI toolkit for Product Managers who enjoy hiking.",
    hobby: "hiking",
  },
  "alex-developer-gaming": {
    userName: "Alex",
    profession: "Software Developer",
    professionSlug: "developer",
    workContext: "Code & Debug",
    lifeContext: "Gaming",
    description: "A personalized AI toolkit for Developers who enjoy gaming.",
    hobby: "gaming",
  },
  "sarah-designer-photography": {
    userName: "Sarah",
    profession: "UX Designer",
    professionSlug: "designer",
    workContext: "Design & Prototype",
    lifeContext: "Photography",
    description: "A personalized AI toolkit for Designers who enjoy photography.",
    hobby: "traveling",
  },
  "mike-marketer-cooking": {
    userName: "Mike",
    profession: "Marketer",
    professionSlug: "marketer",
    workContext: "Content & SEO",
    lifeContext: "Cooking",
    description: "A personalized AI toolkit for Marketers who enjoy cooking.",
    hobby: "cooking",
  },
};

interface PageProps {
  params: Promise<{ username: string }>;
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const demoData = DEMO_TOOLKITS[username];

  const title = demoData
    ? `${demoData.userName}'s AI Toolkit for ${demoData.profession}s | MaxMate`
    : `AI Toolkit | MaxMate`;

  const description = demoData?.description || "A personalized AI toolkit for work and life.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://maxmate.ai/u/${username}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://maxmate.ai/u/${username}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolkitPage({ params }: PageProps) {
  const { username } = await params;
  const demoData = DEMO_TOOLKITS[username];

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Navbar />

      <main className="flex-1">
        <ToolkitPageClient username={username} fallbackData={demoData || null} />
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for demo pages
export function generateStaticParams() {
  return Object.keys(DEMO_TOOLKITS).map((username) => ({ username }));
}
