"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FEATURES = [
  {
    icon: "work",
    title: "Work Mode Toolkit",
    description:
      "Curated AI tools for 50+ professions including Product Managers, Developers, Designers, Marketers, and more. Each toolkit is optimized for real-world workflows.",
    benefits: [
      "Role-specific tool recommendations",
      "Integration-aware suggestions",
      "Pricing transparency",
    ],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    imageAlt: "Professional workspace with AI tools dashboard",
  },
  {
    icon: "weekend",
    title: "Life Mode Toolkit",
    description:
      "AI tools for your hobbies and personal interests. From hiking planners to recipe generators, we help you enjoy life outside of work.",
    benefits: [
      "Hobby-matched recommendations",
      "Weekend activity planners",
      "Personal growth tools",
    ],
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
    imageAlt: "Person enjoying outdoor activities with AI assistance",
  },
  {
    icon: "language",
    title: "GEO-Optimized Pages",
    description:
      "Every toolkit page is optimized for AI search engines (ChatGPT, Perplexity, Google AI). Get discovered and cited in AI-generated answers.",
    benefits: [
      "Schema markup included",
      "AI-friendly formatting",
      "Shareable public URLs",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    imageAlt: "SEO analytics dashboard showing search performance",
  },
];

export function FeaturesDetailSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900/50 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need in One Toolkit
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            MaxMate combines professional productivity with personal lifestyle tools, 
            all optimized for AI search visibility.
          </p>
        </motion.div>

        <div className="space-y-20">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`flex flex-col ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-8 lg:gap-12 items-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Image */}
              <motion.div
                className="w-full lg:w-1/2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Feature badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 rounded-full text-sm font-medium text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">{feature.icon}</span>
                    {feature.title}
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-5">
                <div className="inline-flex items-center gap-2 text-primary font-medium">
                  <span className="material-symbols-outlined">{feature.icon}</span>
                  Feature {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
                <ul className="space-y-3 pt-2">
                  {feature.benefits.map((benefit) => (
                    <motion.li
                      key={benefit}
                      className="flex items-center gap-3 text-slate-800 dark:text-slate-300"
                      whileHover={{ x: 4 }}
                    >
                      <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">
                          check
                        </span>
                      </span>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
