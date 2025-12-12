"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface Toolkit {
  name: string;
  slug: string;
  hobby: string;
  toolCount: number;
}

interface ProfessionToolkitsProps {
  profession: string;
  toolkits: Toolkit[];
}

export function ProfessionToolkits({ profession, toolkits }: ProfessionToolkitsProps) {
  if (toolkits.length === 0) return null;

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Example {profession} Toolkits
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          See how other {profession}s have combined work tools with their hobbies.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {toolkits.map((toolkit) => (
            <motion.div key={toolkit.slug} variants={fadeUp}>
              <Link href={`/u/${toolkit.slug}`}>
                <motion.article
                  className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800/50 h-full"
                  whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      + {toolkit.hobby}
                    </span>
                    <span className="text-sm text-slate-500">{toolkit.toolCount} tools</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                    {toolkit.name}
                  </h3>
                  <div className="flex items-center text-sm text-primary font-medium">
                    View Toolkit
                    <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
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

