"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface Profession {
  name: string;
  slug: string;
  icon: string;
  color: string;
  toolCount: number;
  description: string;
  popularTools: string[];
  image: string;
}

interface PersonasGridProps {
  professions: Profession[];
}

export function PersonasGrid({ professions }: PersonasGridProps) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {professions.map((profession) => (
            <motion.div key={profession.slug} variants={fadeUp}>
              <Link href={`/onboarding?profession=${profession.slug}`}>
                <motion.article
                  className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 h-full"
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={profession.image}
                      alt={`AI tools for ${profession.name}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className={`absolute top-4 left-4 w-10 h-10 ${profession.color} rounded-lg flex items-center justify-center shadow-lg`}>
                      <span className="material-symbols-outlined text-white text-xl">
                        {profession.icon}
                      </span>
                    </div>

                    {/* Tool Count Badge */}
                    <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 dark:bg-slate-900/90 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {profession.toolCount} tools
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {profession.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {profession.description}
                    </p>

                    {/* Popular Tools */}
                    <div className="flex flex-wrap gap-1.5">
                      {profession.popularTools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-slate-600 dark:text-slate-400"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
                      Generate Toolkit
                      <motion.span 
                        className="material-symbols-outlined text-base ml-1"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        arrow_forward
                      </motion.span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

