"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { DemoPreview } from "./demo-preview";
import { parseInput } from "@/lib/api";

const STATS = [
  { value: "2,847+", label: "AI Tools Indexed" },
  { value: "50+", label: "Professions Covered" },
  { value: "100K+", label: "Toolkits Generated" },
];

export function HeroSection() {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!value.trim()) return;
    
    setIsLoading(true);
    
    try {
      // 🤖 AI parses natural language to extract profession + hobby
      const parsed = await parseInput(value);
      
      // Store parsed intent for onboarding
      sessionStorage.setItem("parsed_intent", JSON.stringify(parsed));
      
      // Go to onboarding - but skip to name input step (profession/hobby already parsed)
      router.push(`/onboarding?mode=quick&profession=${parsed.profession}&hobby=${parsed.hobby}`);
      
    } catch (error) {
      console.error("Parse failed, using manual flow:", error);
      // Fallback: Go to onboarding for full manual selection
      sessionStorage.setItem("persona_input", value);
      router.push("/onboarding");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 px-4 max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col gap-8 items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            variants={fadeUp}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-primary text-sm font-medium">
              Free AI Toolkit Generator • No Sign-up Required
            </span>
          </motion.div>

          {/* Hero Title - H1 for SEO */}
          <motion.div className="flex flex-col gap-4 max-w-4xl" variants={fadeUp}>
            <h1 className="text-slate-900 dark:text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">
              Generate Your Personalized{" "}
              <span className="text-primary">AI Toolkit</span> in Seconds
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Tell us your profession and hobbies. Our AI matches you with the
              perfect tools for work and life from <strong>2,847+ AI applications</strong>.
            </p>
          </motion.div>

          {/* Search Input */}
          <motion.div className="w-full max-w-xl" variants={fadeUp}>
            <motion.div
              className="flex w-full items-stretch rounded-full h-16 transition-shadow duration-300"
              animate={{
                boxShadow: isFocused
                  ? "0 10px 40px rgba(43, 108, 238, 0.3)"
                  : "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="text-slate-600 flex bg-white dark:bg-slate-900 items-center justify-center pl-6 rounded-l-full border-y border-l border-gray-200 dark:border-gray-700">
                <span className="material-symbols-outlined">person_search</span>
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-slate-900 dark:text-white focus:outline-none focus:ring-0 border-y border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 h-full placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 text-base font-normal leading-normal"
                placeholder="I am a Product Manager who loves hiking..."
              />
              <div className="flex items-center justify-center rounded-r-full border-y border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 pr-2">
                <motion.button
                  onClick={handleGenerate}
                  disabled={isLoading || !value.trim()}
                  className={`flex min-w-[100px] cursor-pointer items-center justify-center gap-2 rounded-full h-12 px-6 text-white text-base font-bold leading-normal transition-all ${
                    isLoading || !value.trim() 
                      ? "bg-primary/50 cursor-not-allowed" 
                      : "bg-primary"
                  }`}
                  whileHover={!isLoading && value.trim() ? { scale: 1.05, boxShadow: "0 4px 14px rgba(43, 108, 238, 0.4)" } : {}}
                  whileTap={!isLoading && value.trim() ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <motion.span
                        className="material-symbols-outlined text-lg"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        progress_activity
                      </motion.span>
                      <span>AI Parsing...</span>
                    </>
                  ) : (
                    "Generate"
                  )}
                </motion.button>
              </div>
            </motion.div>
            
            {/* Helper text + Demo button */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <p className="text-slate-600 text-sm">
                Example: &quot;Software Engineer + Gaming&quot;
              </p>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <DemoPreview />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 sm:gap-12 pt-8 border-t border-gray-200 dark:border-gray-800 mt-4"
            variants={fadeUp}
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
