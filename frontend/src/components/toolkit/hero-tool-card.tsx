"use client";

import { motion } from "framer-motion";

interface HeroToolCardProps {
  tool: {
    name: string;
    description: string;
    backgroundImage: string;
  };
}

export function HeroToolCard({ tool }: HeroToolCardProps) {
  return (
    <motion.article
      className="group relative flex flex-col justify-end min-h-[200px] rounded-lg overflow-hidden p-6 text-white"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${tool.backgroundImage})` }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold">{tool.name}</h3>
        <p className="mt-1 text-sm max-w-md opacity-90">{tool.description}</p>
        <motion.button
          className="mt-4 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-4 border border-white/30"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)", scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>
    </motion.article>
  );
}
