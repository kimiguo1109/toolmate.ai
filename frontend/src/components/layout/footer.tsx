"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FOOTER_LINKS = {
  Product: [
    { label: "AI Toolkit Generator", href: "/onboarding" },
    { label: "Browse Professions", href: "/personas" },
    { label: "Tool Directory", href: "/directory" },
    { label: "Pricing", href: "/pricing" },
  ],
  Professions: [
    { label: "Product Manager", href: "/personas/product-manager" },
    { label: "Software Developer", href: "/personas/developer" },
    { label: "Designer", href: "/personas/designer" },
    { label: "Marketer", href: "/personas/marketer" },
    { label: "View All 50+", href: "/personas" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "AI Tool Reviews", href: "/reviews" },
    { label: "API Documentation", href: "/docs" },
    { label: "Help Center", href: "/help" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">
                all_inclusive
              </span>
              <span className="text-xl font-bold">MaxMate</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              The AI Operating System for Your Work & Life. Generate personalized toolkits in seconds.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <span className="block font-semibold mb-4 text-white">{category}</span>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} MaxMate.ai. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://twitter.com/maxmate_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                𝕏
              </motion.a>
              <motion.a
                href="https://github.com/maxmate-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="material-symbols-outlined text-lg">code</span>
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/maxmate-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                in
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MaxMate.ai",
            url: "https://maxmate.ai",
            logo: "https://maxmate.ai/logo.png",
            description:
              "The AI Operating System for Your Work & Life. Generate personalized AI toolkits in seconds.",
            sameAs: [
              "https://twitter.com/maxmate_ai",
              "https://github.com/maxmate-ai",
              "https://linkedin.com/company/maxmate-ai",
            ],
          }),
        }}
      />
    </footer>
  );
}

