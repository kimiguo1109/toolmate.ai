"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ToolCardProps {
  tool: {
    name: string;
    logo: string;
    logoUrl?: string;  // Optional actual logo URL
    rating: number;
    description: string;
    ctaText: string;
  };
}

// Known tool logos (static imports would be better for production)
const KNOWN_LOGOS: Record<string, string> = {
  "github copilot": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  "chatgpt": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "chatgpt plus": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "notion ai": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
  "cursor": "/logos/cursor.svg",
  "figma ai": "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  "midjourney": "/logos/midjourney.svg",
  "claude": "/logos/claude.svg",
  "grammarly": "/logos/grammarly.svg",
  "slack ai": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
  "jira ai": "https://upload.wikimedia.org/wikipedia/commons/8/82/Jira_%28Software%29_logo.svg",
  "miro ai": "/logos/miro.svg",
};

export function ToolCard({ tool }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Check if logo is a URL or a color
  const isLogoUrl = tool.logoUrl || tool.logo?.startsWith("http") || tool.logo?.startsWith("/");
  const knownLogoUrl = KNOWN_LOGOS[tool.name.toLowerCase()];
  const logoUrl = tool.logoUrl || knownLogoUrl;
  
  return (
    <motion.article
      className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/30 p-5 h-full"
      whileHover={{
        y: -4,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <motion.div
          className="w-12 h-12 rounded-xl bg-center bg-cover bg-no-repeat shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm overflow-hidden"
          style={{ backgroundColor: !logoUrl || imageError ? tool.logo : "transparent" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {logoUrl && !imageError ? (
            <Image
              src={logoUrl}
              alt={tool.name}
              width={48}
              height={48}
              className="object-contain p-1"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <span>{tool.name.charAt(0)}</span>
          )}
        </motion.div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {tool.name}
          </h3>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < tool.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description - Fixed height for consistency */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 line-clamp-3">
        {tool.description}
      </p>

      {/* CTA */}
      <motion.button
        className="w-full text-center rounded-full bg-primary/10 text-primary font-semibold py-2.5 text-sm mt-auto"
        whileHover={{ backgroundColor: "rgba(43, 108, 238, 0.2)", scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {tool.ctaText}
      </motion.button>
    </motion.article>
  );
}
