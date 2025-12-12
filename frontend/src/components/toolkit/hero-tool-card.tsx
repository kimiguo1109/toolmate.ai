"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroToolCardProps {
  tool: {
    name: string;
    description: string;
    backgroundImage: string;
    url?: string;  // Tool website URL for redirection
  };
}

// Fallback gradients for different tool themes
const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
];

export function HeroToolCard({ tool }: HeroToolCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Generate consistent fallback based on tool name
  const fallbackIndex = tool.name.charCodeAt(0) % FALLBACK_GRADIENTS.length;
  const fallbackGradient = FALLBACK_GRADIENTS[fallbackIndex];

  const handleLearnMore = () => {
    if (tool.url) {
      window.open(tool.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.article
      className="group relative flex flex-col justify-end min-h-[200px] rounded-xl overflow-hidden p-6 text-white shadow-lg cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleLearnMore}
    >
      {/* Background Image with Fallback */}
      {!imageError && tool.backgroundImage ? (
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={tool.backgroundImage}
            alt={tool.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0"
          style={{ background: fallbackGradient }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold drop-shadow-lg">{tool.name}</h3>
        <p className="mt-1 text-sm max-w-md opacity-90 line-clamp-2 drop-shadow">{tool.description}</p>
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleLearnMore();
          }}
          className="mt-4 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-4 border border-white/30 inline-flex items-center gap-2"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)", scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </motion.button>
      </motion.div>
    </motion.article>
  );
}
