"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const FEATURES = [
  {
    icon: "work",
    title: "Work Mode",
    description: "Curated tools for 50+ professions.",
  },
  {
    icon: "favorite",
    title: "Life Mode",
    description: "Weekend hobby planners & lifestyle AI.",
  },
  {
    icon: "public",
    title: "GEO Ready",
    description: "Pages optimized for AI Search.",
  },
];

export function FeatureGrid() {
  return (
    <section className="flex flex-col gap-10 px-4 py-16">
      <motion.div
        className="flex flex-col gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight sm:text-4xl">
          Your Personalized AI Toolkit
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal max-w-2xl mx-auto sm:text-lg">
          One prompt, endless possibilities. We generate a personalized toolkit
          for your professional and personal life, optimized for discovery.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.title}
            className="flex flex-1 gap-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 flex-col cursor-pointer"
            variants={fadeUp}
            whileHover={{
              y: -4,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="text-primary"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "28px" }}
              >
                {feature.icon}
              </span>
            </motion.div>
            <div className="flex flex-col gap-1">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
