import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MaxMate.ai - The AI Operating System for Your Work & Life",
  description:
    "Tell us who you are. We generate your personalized AI toolkit in seconds. SEO-optimized, ready to share.",
  keywords: ["AI tools", "productivity", "personalized toolkit", "MaxMate"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Explicit meta tags for SEO - ensures Lighthouse detection */}
        <meta name="description" content="Generate your personalized AI toolkit in seconds. Tell us your profession and hobbies, get curated tool recommendations for 50+ professions. Free, no sign-up required." />
        <meta name="keywords" content="AI toolkit, AI tools, productivity tools, personalized AI, work tools, lifestyle AI, MaxMate" />
        
        {/* Preconnect to improve font loading performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-display bg-background-light dark:bg-background-dark min-h-screen">
        {children}
      </body>
    </html>
  );
}
