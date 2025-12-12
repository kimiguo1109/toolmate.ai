"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ToolCardProps {
  tool: {
    name: string;
    logo: string;
    logoUrl?: string;
    rating: number;
    description: string;
    ctaText: string;
    url?: string;  // Tool website URL for redirection
  };
}

// Known tool logos with real URLs
const KNOWN_LOGOS: Record<string, string> = {
  "github copilot": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  "chatgpt": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "claude": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_Logo.svg",
  "notion": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
  "figma": "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  "slack": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
  "linear": "https://asset.brandfetch.io/idaeNz7NsW/id-dQuXyBh.svg",
  "raycast": "https://asset.brandfetch.io/idwCAv24ti/id3LDGCDoT.svg",
  "sentry": "https://asset.brandfetch.io/idJTTPJMgZ/idgdqcpBHW.svg",
  "postman": "https://asset.brandfetch.io/id49tNc6Hv/idKJzrqAZB.svg",
  "vercel": "https://asset.brandfetch.io/idJTTPJMgZ/idJNdZGPJW.svg",
  "amplitude": "https://asset.brandfetch.io/id_bxiZLxl/idoYfFfMn_.svg",
  "hotjar": "https://asset.brandfetch.io/idQnYz_rYw/idCdcXmGVS.svg",
  "semrush": "https://asset.brandfetch.io/idchmboHEZ/idKvP8Izqn.svg",
  "ahrefs": "https://asset.brandfetch.io/idOYLpTvIW/id7gzL2VSV.svg",
  "grammarly": "https://asset.brandfetch.io/idK-IqP5EU/idJl0Y0kBM.svg",
};

export function ToolCard({ tool }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Find logo URL from known logos or use provided logoUrl
  const toolNameLower = tool.name.toLowerCase();
  const knownLogoUrl = Object.entries(KNOWN_LOGOS).find(([key]) => 
    toolNameLower.includes(key)
  )?.[1];
  const logoUrl = tool.logoUrl || knownLogoUrl;
  
  const handleClick = () => {
    if (tool.url) {
      window.open(tool.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.article
      className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/30 p-5 h-full cursor-pointer"
      whileHover={{
        y: -4,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <motion.div
          className="w-12 h-12 rounded-xl bg-center bg-cover bg-no-repeat shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm overflow-hidden"
          style={{ backgroundColor: !logoUrl || imageError ? tool.logo : "#f3f4f6" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {logoUrl && !imageError ? (
            <Image
              src={logoUrl}
              alt={tool.name}
              width={40}
              height={40}
              className="object-contain"
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
                  i < Math.round(tool.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 line-clamp-3">
        {tool.description}
      </p>

      {/* CTA */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className="w-full text-center rounded-full bg-primary/10 text-primary font-semibold py-2.5 text-sm mt-auto inline-flex items-center justify-center gap-2"
        whileHover={{ backgroundColor: "rgba(43, 108, 238, 0.2)", scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {tool.ctaText}
        {tool.url && <span className="material-symbols-outlined text-sm">open_in_new</span>}
      </motion.button>
    </motion.article>
  );
}
