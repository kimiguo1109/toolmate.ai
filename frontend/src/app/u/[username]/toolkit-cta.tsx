"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ToolkitCTA() {
  return (
    <motion.section
      className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary to-blue-600 text-white text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">
        Want Your Own AI Toolkit?
      </h2>
      <p className="text-white/90 mb-6 max-w-xl mx-auto">
        Generate a personalized toolkit based on your profession and hobbies. 
        It&apos;s free, takes 30 seconds, and no sign-up required.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/onboarding">
          <motion.button
            className="px-8 py-3 bg-white text-primary font-bold rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Create My Toolkit — Free
          </motion.button>
        </Link>
        <motion.button
          className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full"
          whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.98 }}
        >
          Clone This Kit
        </motion.button>
      </div>
    </motion.section>
  );
}

