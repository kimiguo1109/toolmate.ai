"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string | null;
  highlighted: boolean;
  badge: string | null;
}

interface PricingCardsProps {
  plans: Plan[];
}

export function PricingCards({ plans }: PricingCardsProps) {
  return (
    <section className="py-12 px-4">
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={fadeUp}
            className={`relative rounded-2xl p-6 ${
              plan.highlighted
                ? "bg-primary text-white shadow-xl scale-105 z-10"
                : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                {plan.badge}
              </span>
            )}

            {/* Header */}
            <div className="text-center mb-6">
              <h3
                className={`text-xl font-bold mb-2 ${
                  plan.highlighted ? "text-white" : "text-slate-900 dark:text-white"
                }`}
              >
                {plan.name}
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className={`text-4xl font-bold ${
                    plan.highlighted ? "text-white" : "text-slate-900 dark:text-white"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.highlighted ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {plan.period}
                </span>
              </div>
              <p
                className={`text-sm mt-2 ${
                  plan.highlighted ? "text-white/80" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {plan.description}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span
                    className={`material-symbols-outlined text-base mt-0.5 ${
                      plan.highlighted ? "text-white" : "text-green-500"
                    }`}
                  >
                    check_circle
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-white/90" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            {plan.ctaLink ? (
              <Link href={plan.ctaLink} className="block">
                <motion.button
                  className={`w-full py-3 rounded-full font-semibold text-sm ${
                    plan.highlighted
                      ? "bg-white text-primary hover:shadow-lg"
                      : "bg-primary text-white hover:opacity-90"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.button>
              </Link>
            ) : (
              <button
                disabled
                className={`w-full py-3 rounded-full font-semibold text-sm cursor-not-allowed ${
                  plan.highlighted
                    ? "bg-white/20 text-white/80"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                }`}
              >
                {plan.cta}
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

