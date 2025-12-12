"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface RelatedToolkitsProps {
  professions: { name: string; slug: string }[];
}

const MORE_TOOLKITS = [
  {
    name: "Developer + Gaming",
    profession: "developer",
    hobby: "gaming",
    tools: ["GitHub Copilot", "ChatGPT", "Discord AI"],
    color: "bg-purple-500",
  },
  {
    name: "Designer + Photography",
    profession: "designer",
    hobby: "traveling",
    tools: ["Figma AI", "Midjourney", "Lightroom AI"],
    color: "bg-pink-500",
  },
  {
    name: "Marketer + Travel",
    profession: "marketer",
    hobby: "traveling",
    tools: ["Jasper AI", "Copy.ai", "TripIt AI"],
    color: "bg-orange-500",
  },
];

export function RelatedToolkits({ professions }: RelatedToolkitsProps) {
  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <motion.h2
        className="text-2xl font-bold text-slate-900 dark:text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Explore Similar AI Toolkits
      </motion.h2>

      {/* Related Professions */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
          Related Professions
        </h3>
        <div className="flex flex-wrap gap-2">
          {professions.map((profession) => (
            <Link
              key={profession.slug}
              href={`/onboarding?profession=${profession.slug}`}
              className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-primary hover:text-white transition-colors"
            >
              {profession.name}
            </Link>
          ))}
        </div>
      </div>

      {/* More Toolkits */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {MORE_TOOLKITS.map((toolkit) => (
          <motion.div key={toolkit.name} variants={fadeUp}>
            <Link 
              href={`/onboarding?profession=${toolkit.profession}`}
              onClick={() => {
                // Pre-select the hobby when navigating
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("preselected_hobby", toolkit.hobby);
                }
              }}
            >
              <motion.article
                className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800/50 group cursor-pointer"
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", borderColor: "#2b6cee" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 ${toolkit.color} rounded-lg flex items-center justify-center text-white font-bold`}
                  >
                    {toolkit.name.charAt(0)}
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {toolkit.name}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1">
                  {toolkit.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-700 text-slate-600 dark:text-slate-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                {/* CTA */}
                <div className="mt-3 flex items-center text-primary text-sm font-medium">
                  Generate Toolkit
                  <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Link */}
      <div className="mt-6 text-center">
        <Link
          href="/personas"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          Browse All 50+ Profession Toolkits
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
