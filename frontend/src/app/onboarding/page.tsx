"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { ProgressBar } from "@/components/onboarding/progress-bar";
import { HobbyGrid } from "@/components/onboarding/hobby-grid";
import { MatchingIndicator } from "@/components/onboarding/matching-indicator";
import { fadeUp, staggerContainer } from "@/lib/animations";

const PROFESSIONS = [
  { id: "product-manager", label: "Product Manager", icon: "inventory_2" },
  { id: "developer", label: "Software Developer", icon: "code" },
  { id: "designer", label: "UX Designer", icon: "palette" },
  { id: "marketer", label: "Marketer", icon: "campaign" },
  { id: "writer", label: "Content Writer", icon: "edit_note" },
  { id: "student", label: "Student", icon: "school" },
  { id: "entrepreneur", label: "Entrepreneur", icon: "rocket_launch" },
  { id: "data-scientist", label: "Data Scientist", icon: "analytics" },
  { id: "sales", label: "Sales Rep", icon: "handshake" },
  { id: "hr-manager", label: "HR Manager", icon: "groups" },
  { id: "financial-analyst", label: "Finance", icon: "trending_up" },
  { id: "customer-support", label: "Support", icon: "support_agent" },
  { id: "consultant", label: "Consultant", icon: "business_center" },
  { id: "researcher", label: "Researcher", icon: "science" },
  { id: "teacher", label: "Teacher", icon: "cast_for_education" },
  { id: "other", label: "Other", icon: "more_horiz" },
];

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check URL parameters
  const mode = searchParams.get("mode"); // "quick" = AI already parsed
  const professionFromUrl = searchParams.get("profession");
  const hobbyFromUrl = searchParams.get("hobby");
  
  // Quick mode: AI already parsed profession + hobby, just need name
  const isQuickMode = mode === "quick" && professionFromUrl && hobbyFromUrl;
  
  const [step, setStep] = useState(isQuickMode ? 3 : professionFromUrl ? 2 : 1);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState(professionFromUrl || "");
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(hobbyFromUrl ? [hobbyFromUrl] : []);
  const [customHobby, setCustomHobby] = useState("");
  const [parsedIntent, setParsedIntent] = useState<{professionLabel?: string; hobbyLabel?: string} | null>(null);

  // Load parsed intent from AI (for quick mode display)
  useEffect(() => {
    const stored = sessionStorage.getItem("parsed_intent");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setParsedIntent(parsed);
        sessionStorage.removeItem("parsed_intent");
      } catch (e) {
        console.error("Failed to parse intent");
      }
    }
  }, []);

  // Load preselected hobby from trending pills
  useEffect(() => {
    const preselectedHobby = sessionStorage.getItem("preselected_hobby");
    if (preselectedHobby) {
      setSelectedHobbies([preselectedHobby]);
      sessionStorage.removeItem("preselected_hobby");
    }
  }, []);

  // Load initial data from homepage input
  useEffect(() => {
    const stored = sessionStorage.getItem("persona_input");
    if (stored) {
      const match = stored.match(/I am a ([^w]+)/i);
      if (match) {
        const professionText = match[1].trim().toLowerCase();
        const found = PROFESSIONS.find(
          (p) => p.label.toLowerCase().includes(professionText) || p.id.includes(professionText)
        );
        if (found) setProfession(found.id);
      }
    }
  }, []);

  // If coming from personas page, set profession from URL
  useEffect(() => {
    if (professionFromUrl) {
      setProfession(professionFromUrl);
    }
  }, [professionFromUrl]);

  // Progress calculation
  const progress = step === 1 
    ? (name && profession ? 40 : 20) 
    : step === 2 
      ? Math.min(60 + selectedHobbies.length * 10, 95)
      : (name.trim() ? 95 : 70); // Step 3 (quick mode)

  const canProceedStep1 = name.trim().length > 0 && profession !== "";
  // Allow proceeding if hobbies selected OR custom hobby entered, AND name is filled
  const canProceedStep2 = (selectedHobbies.length > 0 || customHobby.trim().length > 0) && name.trim().length > 0;
  // Quick mode: just need name
  const canProceedQuickMode = name.trim().length > 0;

  const handleStep1Continue = () => {
    if (!canProceedStep1) return;
    setStep(2);
  };

  const handleGenerate = () => {
    // Quick mode only needs name
    if (isQuickMode && !canProceedQuickMode) return;
    // Normal mode needs hobbies
    if (!isQuickMode && !canProceedStep2) return;

    // Use custom hobby if no preset hobby selected
    const primaryHobby = selectedHobbies[0] || customHobby.toLowerCase().replace(/\s+/g, "-") || "general";
    const allHobbies = customHobby.trim() 
      ? [...selectedHobbies, customHobby.toLowerCase()]
      : selectedHobbies;

    // Generate slug from name + profession + hobby
    const slug = `${name.toLowerCase().replace(/\s+/g, "-")}-${profession}-${primaryHobby}`;

    const data = {
      name,
      profession,
      professionLabel: PROFESSIONS.find((p) => p.id === profession)?.label || profession,
      hobbies: allHobbies.length > 0 ? allHobbies : [primaryHobby],
      customHobby: customHobby || undefined,
      slug,
    };

    sessionStorage.setItem("onboarding_data", JSON.stringify(data));
    router.push("/generate");
  };

  return (
    <motion.div
      className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          className="w-full max-w-2xl"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Progress Bar */}
          <motion.div variants={fadeUp} className="mb-6">
            <ProgressBar progress={progress} />
            <p className="text-center text-sm text-slate-500 mt-2">
              {isQuickMode ? "Almost there!" : `Step ${step} of 2`}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Step 3: Quick Mode - Just Name Input (profession + hobby already set) */}
            {step === 3 ? (
              <motion.div
                key="step3"
                className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Selected Profile Badge - same style as Step 2 */}
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                    <span className="material-symbols-outlined text-base">
                      {PROFESSIONS.find(p => p.id === profession)?.icon || "work"}
                    </span>
                    {parsedIntent?.professionLabel || PROFESSIONS.find(p => p.id === profession)?.label || profession}
                    <span className="text-slate-400 mx-1">+</span>
                    <span className="text-orange-500">
                      {parsedIntent?.hobbyLabel || selectedHobbies[0]?.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) || "Hobby"}
                    </span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">
                  Almost there! 🎉
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
                  Enter your name to personalize your toolkit
                </p>

                {/* Name Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    What&apos;s your name?
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && canProceedQuickMode && handleGenerate()}
                    className="w-full h-14 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-lg"
                    placeholder="e.g., Alex, Kimi, Sarah..."
                    autoFocus
                  />
                </div>

                {/* Matching Indicator */}
                <MatchingIndicator selectedCount={1} />

                {/* Generate Button */}
                <motion.button
                  onClick={handleGenerate}
                  disabled={!canProceedQuickMode}
                  className={`w-full h-14 rounded-full font-bold text-lg mt-6 transition-all ${
                    canProceedQuickMode
                      ? "bg-primary text-white hover:opacity-90"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                  whileHover={canProceedQuickMode ? { scale: 1.02, boxShadow: "0 4px 20px rgba(43, 108, 238, 0.4)" } : {}}
                  whileTap={canProceedQuickMode ? { scale: 0.98 } : {}}
                >
                  Generate My Toolkit ✨
                </motion.button>

                {/* Switch to manual mode - more subtle */}
                <button
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-slate-400 hover:text-slate-600 mt-4 transition-colors"
                >
                  Change selection
                </button>
              </motion.div>
            ) : step === 1 ? (
              /* Step 1: Name & Profession */
              <motion.div
                key="step1"
                className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">
                  Let&apos;s build your AI toolkit
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
                  Tell us about yourself to get personalized recommendations
                </p>

                {/* Name Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    What&apos;s your name?
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-14 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-lg"
                    placeholder="e.g., Alex, Kimi, Sarah..."
                  />
                </div>

                {/* Profession Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    What&apos;s your profession?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PROFESSIONS.map((prof) => (
                      <motion.button
                        key={prof.id}
                        onClick={() => setProfession(prof.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          profession === prof.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-400 hover:border-primary/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {prof.icon}
                        </span>
                        <span className="text-xs font-medium text-center leading-tight">
                          {prof.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Continue Button */}
                <motion.button
                  onClick={handleStep1Continue}
                  disabled={!canProceedStep1}
                  className={`w-full h-14 rounded-full font-bold text-lg transition-all ${
                    canProceedStep1
                      ? "bg-primary text-white hover:opacity-90"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                  whileHover={canProceedStep1 ? { scale: 1.02 } : {}}
                  whileTap={canProceedStep1 ? { scale: 0.98 } : {}}
                >
                  Continue
                </motion.button>
              </motion.div>
            ) : (
              /* Step 2: Hobbies */
              <motion.div
                key="step2"
                className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Back Button - only show if not from URL */}
                {!professionFromUrl && (
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-slate-500 hover:text-primary mb-4 text-sm"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back
                  </button>
                )}

                {/* Profession Badge */}
                {professionFromUrl && (
                  <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                      <span className="material-symbols-outlined text-base">
                        {PROFESSIONS.find(p => p.id === profession)?.icon || "work"}
                      </span>
                      {PROFESSIONS.find(p => p.id === profession)?.label || profession}
                    </span>
                  </div>
                )}

                {/* Show name input if coming from personas page - ALWAYS show until filled */}
                {professionFromUrl && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      What&apos;s your name?
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-base text-center"
                      placeholder="Enter your name..."
                      autoFocus={false}
                    />
                  </div>
                )}

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">
                  {name ? `Hey ${name}! 👋` : "What do you enjoy?"}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
                  Select your hobbies & interests
                </p>

                {/* Hobby Grid */}
                <HobbyGrid
                  selected={selectedHobbies}
                  onSelectionChange={setSelectedHobbies}
                />

                {/* Custom Hobby Input */}
                <div className="mt-4 px-4">
                  <input
                    type="text"
                    value={customHobby}
                    onChange={(e) => setCustomHobby(e.target.value)}
                    className="w-full h-12 px-4 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-center"
                    placeholder="Or type your own hobby..."
                  />
                  {customHobby.trim() && selectedHobbies.length === 0 && (
                    <p className="text-center text-xs text-green-600 mt-2">
                      ✓ Using &quot;{customHobby}&quot; as your hobby
                    </p>
                  )}
                </div>

                {/* Matching Indicator */}
                <div className="mt-6">
                  <MatchingIndicator selectedCount={selectedHobbies.length + (customHobby.trim() ? 1 : 0)} />
                </div>

                {/* Generate Button */}
                <motion.button
                  onClick={handleGenerate}
                  disabled={!canProceedStep2}
                  className={`w-full h-14 rounded-full font-bold text-lg mt-6 transition-all ${
                    canProceedStep2
                      ? "bg-primary text-white hover:opacity-90"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                  whileHover={canProceedStep2 ? { scale: 1.02, boxShadow: "0 4px 20px rgba(43, 108, 238, 0.4)" } : {}}
                  whileTap={canProceedStep2 ? { scale: 0.98 } : {}}
                >
                  Generate My Toolkit ✨
                </motion.button>

                {!name.trim() && (selectedHobbies.length > 0 || customHobby.trim()) && (
                  <p className="text-center text-xs text-orange-500 mt-2">
                    ↑ Please enter your name above to continue
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
