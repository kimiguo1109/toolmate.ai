"use client";

import { motion } from "framer-motion";

interface ToolCardProps {
  tool: {
    name: string;
    logo: string;
    rating: number;
    description: string;
    ctaText: string;
  };
}

export function ToolCard({ tool }: ToolCardProps) {
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
          className="w-12 h-12 rounded-xl bg-center bg-cover bg-no-repeat shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm"
          style={{ backgroundColor: tool.logo }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {tool.name.charAt(0)}
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
