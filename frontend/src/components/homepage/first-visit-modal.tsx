"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const STEPS = [
  {
    emoji: "👋",
    title: "Welcome to MaxMate!",
    description: "Your personal AI toolkit generator",
  },
  {
    emoji: "1️⃣",
    title: "Tell us about yourself",
    description: "Your profession + hobbies",
  },
  {
    emoji: "2️⃣",
    title: "We match AI tools for you",
    description: "From 2,847+ applications",
  },
  {
    emoji: "3️⃣",
    title: "Get your personalized toolkit",
    description: "Shareable, SEO-optimized page",
  },
];

export function FirstVisitModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("maxmate_visited");
    if (!hasVisited) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("maxmate_visited", "true");
    setIsOpen(false);
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handleSkip = () => {
    localStorage.setItem("maxmate_visited", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 pt-6">
              {STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === step ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-5xl mb-4">{STEPS[step].emoji}</div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {STEPS[step].title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {STEPS[step].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="px-8 pb-8 space-y-3">
              {step < STEPS.length - 1 ? (
                <>
                  <motion.button
                    onClick={handleNext}
                    className="w-full py-3 bg-primary text-white font-semibold rounded-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next
                  </motion.button>
                  <button
                    onClick={handleSkip}
                    className="w-full py-2 text-slate-500 text-sm hover:text-slate-700"
                  >
                    Skip intro
                  </button>
                </>
              ) : (
                <>
                  <Link href="/onboarding" onClick={handleClose}>
                    <motion.button
                      className="w-full py-3 bg-primary text-white font-semibold rounded-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started — Free
                    </motion.button>
                  </Link>
                  <button
                    onClick={handleClose}
                    className="w-full py-2 text-slate-500 text-sm hover:text-slate-700"
                  >
                    Explore first
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

