import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "About MaxMate - AI Toolkit Generator for Work & Life | Our Mission",
  description: "Learn how MaxMate helps professionals discover the perfect AI tools. Our AI matching engine analyzes 2,847+ tools to create personalized toolkits for your profession and hobbies.",
  keywords: ["MaxMate", "AI toolkit", "about us", "AI tool matching", "productivity tools", "personalized AI"],
  openGraph: {
    title: "About MaxMate - AI Toolkit Generator",
    description: "Discover how we match professionals with the perfect AI tools for work and life.",
    type: "website",
    url: "https://maxmate.ai/about",
  },
  alternates: {
    canonical: "https://maxmate.ai/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
