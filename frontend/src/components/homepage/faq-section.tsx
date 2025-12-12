"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "Is MaxMate free to use?",
    answer:
      "Yes! Generating your personalized AI toolkit is completely free with no sign-up required. Individual tools in your kit may have their own pricing (free, freemium, or paid), but MaxMate itself charges nothing.",
  },
  {
    question: "How does MaxMate select tools for my toolkit?",
    answer:
      "Our SmartMatch™ algorithm analyzes your profession and hobbies against our database of 2,847+ AI tools. We score each tool based on relevance, user ratings, integration capabilities, and pricing to create a balanced toolkit for work and life.",
  },
  {
    question: "Can I customize my toolkit after it's generated?",
    answer:
      "Absolutely! After receiving your initial recommendations, you can swap tools, add new ones from our catalog, remove tools that don't fit, and rearrange your toolkit. Your page automatically updates.",
  },
  {
    question: "Why are the toolkit pages SEO-optimized?",
    answer:
      "Each toolkit page includes Schema.org markup, proper heading structure, and AI-friendly formatting. This helps your toolkit get discovered by traditional search engines AND cited in AI-generated answers from ChatGPT, Perplexity, and Google AI.",
  },
  {
    question: "What professions does MaxMate support?",
    answer:
      "We support 50+ professions including Product Managers, Software Developers, Designers, Marketers, Writers, Students, Entrepreneurs, and many more. Each profession has tailored tool recommendations based on common workflows.",
  },
  {
    question: "How often is the tool database updated?",
    answer:
      "We continuously update our database with new AI tools, pricing changes, and user feedback. Your toolkit recommendations can be refreshed at any time to get the latest suggestions.",
  },
];

export function HomeFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-16 px-4"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about MaxMate AI Toolkit Generator.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800/50"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <h3
                  itemProp="name"
                  className="text-base font-semibold text-slate-900 dark:text-white pr-4"
                >
                  {faq.question}
                </h3>
                <motion.span
                  className="material-symbols-outlined text-gray-500 flex-shrink-0"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  expand_more
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p
                      itemProp="text"
                      className="px-5 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed"
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

