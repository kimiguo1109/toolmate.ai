"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEMO_STEPS = [
  {
    step: 1,
    title: "Tell us about yourself",
    description: "Enter your name and select profession",
    mockUI: (
      <div className="space-y-3">
        <div className="text-xs text-white/50">What's your name?</div>
        <div className="h-8 bg-white/10 rounded-lg flex items-center px-3 text-white/70 text-sm">Kimi</div>
        <div className="text-xs text-white/50">Profession</div>
        <div className="grid grid-cols-4 gap-1.5">
          {["PM", "Dev", "UX", "Mkt"].map((p, i) => (
            <motion.div key={i} className={`h-10 rounded-lg flex items-center justify-center text-xs ${i === 1 ? "bg-primary/40 ring-2 ring-primary text-white" : "bg-white/10 text-white/60"}`} animate={i === 1 ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 0.5, delay: 0.5 }}>{p}</motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    step: 2,
    title: "Select hobbies",
    description: "Choose what you enjoy",
    mockUI: (
      <div className="space-y-3">
        <div className="text-center text-white text-sm">Hey Kimi! 👋</div>
        <div className="grid grid-cols-3 gap-2">
          {["🥾", "🎮", "📚", "💻", "🍳", "✈️"].map((emoji, i) => (
            <motion.div key={i} className={`h-12 rounded-lg flex items-center justify-center text-lg ${i === 1 ? "bg-primary/40 ring-2 ring-primary" : "bg-white/10"}`} animate={i === 1 ? { scale: [1, 1.08, 1] } : {}} transition={{ duration: 0.4, delay: 0.3 }}>{emoji}</motion.div>
          ))}
        </div>
        <motion.div className="h-9 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 0.6, delay: 0.8 }}>Generate ✨</motion.div>
      </div>
    ),
  },
  {
    step: 3,
    title: "AI generates toolkit",
    description: "Matching best AI tools",
    mockUI: (
      <div className="space-y-3 py-2">
        <motion.div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }}><motion.span className="material-symbols-outlined text-primary text-xl" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>auto_awesome</motion.span></motion.div>
        <div className="text-center text-white text-sm font-medium">Building Kimi's Toolkit</div>
        <div className="text-center text-primary text-xs">Developer + Gaming</div>
        <div className="h-2 bg-white/10 rounded-full"><motion.div className="h-full bg-primary rounded-full" initial={{ width: "0%" }} animate={{ width: "70%" }} transition={{ duration: 2 }} /></div>
        <div className="grid grid-cols-2 gap-2">{[0, 1, 2, 3].map((i) => <motion.div key={i} className="h-12 bg-white/5 rounded-lg" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />)}</div>
      </div>
    ),
  },
  {
    step: 4,
    title: "Your toolkit is ready!",
    description: "Personalized AI tools",
    mockUI: (
      <div className="space-y-2">
        <div className="text-center text-white text-sm font-bold">Kimi's AI Toolkit</div>
        {[{ name: "GitHub Copilot", color: "bg-gray-700" }, { name: "Cursor", color: "bg-purple-600" }, { name: "Discord AI", color: "bg-indigo-600" }].map((tool, i) => (
          <motion.div key={tool.name} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}>
            <div className={`w-6 h-6 ${tool.color} rounded flex items-center justify-center text-white text-xs font-bold`}>{tool.name.charAt(0)}</div>
            <span className="text-white/90 text-sm">{tool.name}</span>
            <div className="ml-auto flex">{[1, 2, 3, 4, 5].map((s) => <span key={s} className="text-yellow-400 text-xs">★</span>)}</div>
          </motion.div>
        ))}
        <div className="flex justify-between text-xs text-white/50 pt-1"><span>12 Tools</span><span>$30/mo</span></div>
      </div>
    ),
  },
];

export function DemoPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Auto-advance steps when demo is open
  useEffect(() => {
    if (!isOpen || !isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % DEMO_STEPS.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isOpen, isAutoPlaying]);

  // Start autoplay when opened
  useEffect(() => {
    if (isOpen) {
      setIsAutoPlaying(true);
      setCurrentStep(0);
    } else {
      setIsAutoPlaying(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="material-symbols-outlined text-primary text-base">play_arrow</span>
        </motion.span>
        See How It Works
      </motion.button>

      {/* Demo Modal/Drawer */}
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Content */}
            <motion.div
              className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors z-10"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              {/* Header */}
              <div className="p-6 pb-0">
                <h3 className="text-white text-xl font-bold mb-1">
                  How MaxMate Works
                </h3>
                <p className="text-white/60 text-sm">
                  Generate your personalized AI toolkit in 4 simple steps
                </p>
              </div>

              {/* Step Indicators */}
              <div className="flex gap-2 px-6 py-4">
                {DEMO_STEPS.map((step, index) => (
                  <button
                    key={step.step}
                    onClick={() => setCurrentStep(index)}
                    className="flex-1"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          index === currentStep
                            ? "bg-primary text-white"
                            : index < currentStep
                            ? "bg-primary/50 text-white"
                            : "bg-white/10 text-white/50"
                        }`}
                      >
                        {step.step}
                      </div>
                      <span
                        className={`text-xs font-medium transition-colors ${
                          index === currentStep ? "text-white" : "text-white/50"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    <div
                      className={`h-1 rounded-full transition-colors ${
                        index <= currentStep ? "bg-primary" : "bg-white/10"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Demo Content */}
              <div className="p-6 pt-2 min-h-[240px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Mock Phone Frame */}
                    <div className="bg-slate-800 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-1 mb-3">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="ml-2 text-white/40 text-xs">maxmate.ai</span>
                      </div>
                      {DEMO_STEPS[currentStep].mockUI}
                    </div>
                    <p className="text-white/60 text-sm text-center mt-4">
                      {DEMO_STEPS[currentStep].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = "/onboarding";
                  }}
                  className="w-full py-3 bg-primary text-white font-semibold rounded-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try It Now — Free
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

