import { Metadata } from "next";
import { DirectoryClient } from "./directory-client";

export const metadata: Metadata = {
  title: "AI Tool Directory - Browse 2,847+ AI Tools by Category | MaxMate",
  description: "Explore our comprehensive AI tool directory. Find the best AI tools for writing, coding, design, productivity, marketing, and more. Compare ratings, pricing, and user reviews.",
  keywords: ["AI tools", "AI directory", "ChatGPT alternatives", "AI writing tools", "AI coding tools", "productivity AI", "AI software"],
  openGraph: {
    title: "AI Tool Directory - 2,847+ Tools",
    description: "Find the perfect AI tool for any task. Browse by category, compare features, and discover new tools.",
    type: "website",
    url: "https://maxmate.ai/directory",
  },
  alternates: {
    canonical: "https://maxmate.ai/directory",
  },
};

export default function DirectoryPage() {
  return <DirectoryClient />;
}
