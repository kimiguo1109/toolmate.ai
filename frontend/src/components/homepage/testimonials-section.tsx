"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Product Manager @ Notion",
    avatar: "S",
    color: "bg-purple-500",
    quote:
      "MaxMate found AI tools I didn't even know existed. The hiking planner integration with my work calendar is genius!",
    rating: 5,
  },
  {
    name: "Alex Rivera",
    role: "Senior Developer @ Stripe",
    avatar: "A",
    color: "bg-blue-500",
    quote:
      "Finally, a toolkit that understands both my coding workflow AND my gaming hobby. Saved hours of research.",
    rating: 5,
  },
  {
    name: "Emma Watson",
    role: "UX Designer @ Figma",
    avatar: "E",
    color: "bg-pink-500",
    quote:
      "The SEO-optimized page is perfect for my portfolio. Clients can see my full AI stack at a glance.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join <strong>100,000+ professionals</strong> who have generated their personalized AI toolkits.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.article
              key={testimonial.name}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800/50"
              variants={fadeUp}
              whileHover={{ y: -4 }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-slate-800 dark:text-slate-300 mb-6 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
