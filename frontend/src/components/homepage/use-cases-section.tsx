"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";

const USE_CASES = [
  {
    profession: "Product Manager",
    professionSlug: "product-manager",
    hobby: "Hiking",
    hobbySlug: "hiking",
    icon: "inventory_2",
    color: "bg-blue-500",
    tools: ["Jira AI", "Notion AI", "AllTrails"],
    description: "Sprint planning automation + trail recommendations",
  },
  {
    profession: "Software Developer",
    professionSlug: "developer",
    hobby: "Gaming",
    hobbySlug: "gaming",
    icon: "code",
    color: "bg-purple-500",
    tools: ["GitHub Copilot", "ChatGPT", "Discord AI"],
    description: "Code assistance + gaming community management",
  },
  {
    profession: "Designer",
    professionSlug: "designer",
    hobby: "Photography",
    hobbySlug: "traveling",
    icon: "palette",
    color: "bg-pink-500",
    tools: ["Figma AI", "Midjourney", "Lightroom AI"],
    description: "Design generation + photo editing automation",
  },
  {
    profession: "Marketer",
    professionSlug: "marketer",
    hobby: "Cooking",
    hobbySlug: "cooking",
    icon: "campaign",
    color: "bg-orange-500",
    tools: ["Jasper AI", "Copy.ai", "ChefGPT"],
    description: "Content creation + recipe recommendations",
  },
  {
    profession: "Student",
    professionSlug: "student",
    hobby: "Fitness",
    hobbySlug: "hiking",
    icon: "school",
    color: "bg-green-500",
    tools: ["Quillbot", "Grammarly", "FitGPT"],
    description: "Academic writing + workout planning",
  },
  {
    profession: "Writer",
    professionSlug: "writer",
    hobby: "Travel",
    hobbySlug: "traveling",
    icon: "edit_note",
    color: "bg-teal-500",
    tools: ["Claude", "Hemingway", "TripIt AI"],
    description: "Content refinement + itinerary generation",
  },
];

export function UseCasesSection() {
  const router = useRouter();

  const handleClick = (useCase: typeof USE_CASES[0]) => {
    // Pre-select the hobby for this use case
    sessionStorage.setItem("preselected_hobby", useCase.hobbySlug);
    router.push(`/onboarding?profession=${useCase.professionSlug}`);
  };

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            AI Toolkits for Every Profession
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover pre-built toolkits for <strong>50+ professions</strong> combined with lifestyle interests. 
            Each kit is optimized for your unique work-life balance.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {USE_CASES.map((useCase) => (
            <motion.div key={useCase.professionSlug + useCase.hobbySlug} variants={fadeUp}>
              <motion.article
                onClick={() => handleClick(useCase)}
                className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800/50 h-full flex flex-col cursor-pointer"
                whileHover={{
                  y: -4,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  borderColor: "#2b6cee",
                  transition: { duration: 0 },
                }}
                whileTap={{ scale: 0.98, transition: { duration: 0 } }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className={`w-12 h-12 ${useCase.color} rounded-lg flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0 } }}
                  >
                    <span className="material-symbols-outlined text-white text-2xl">
                      {useCase.icon}
                    </span>
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {useCase.profession}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      + {useCase.hobby}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">
                  {useCase.description}
                </p>

                {/* Tools Preview */}
                <div className="flex flex-wrap gap-2">
                  {useCase.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-primary text-sm font-medium flex items-center">
                    Generate Toolkit
                    <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                  </span>
                  <span className="text-xs text-slate-400">30s • Free</span>
                </div>
              </motion.article>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/personas"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Browse All 50+ Professions
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
