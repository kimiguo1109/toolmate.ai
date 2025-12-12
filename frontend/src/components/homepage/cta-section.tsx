"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary to-blue-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your AI Toolkit?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 100,000+ professionals who have discovered their perfect AI stack. 
            It&apos;s free, fast, and no sign-up required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <motion.button
                className="px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.98 }}
              >
                Generate My Toolkit — Free
              </motion.button>
            </Link>
            <Link href="/directory">
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                Browse Toolkits
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

