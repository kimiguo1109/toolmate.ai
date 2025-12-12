"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const STEPS = [
  {
    step: "01",
    icon: "person",
    title: "Describe Yourself",
    description:
      "Tell us your profession and what you enjoy outside of work. Our AI understands both your professional needs and personal interests.",
  },
  {
    step: "02",
    icon: "psychology",
    title: "AI Matches Tools",
    description:
      "Our SmartMatch™ algorithm scans 2,847+ AI tools and scores them against your unique profile for relevance and quality.",
  },
  {
    step: "03",
    icon: "dashboard",
    title: "Get Your Toolkit",
    description:
      "Receive a personalized, SEO-optimized toolkit page you can share, edit, and use to boost your productivity.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How MaxMate Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Generate your AI toolkit in <strong>under 30 seconds</strong>. No sign-up required.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative"
              variants={fadeUp}
            >
              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
              )}

              <motion.div
                className="relative bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center"
                whileHover={{ y: -4 }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {step.step}
                </div>

                {/* Icon */}
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center mt-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {step.icon}
                  </span>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

