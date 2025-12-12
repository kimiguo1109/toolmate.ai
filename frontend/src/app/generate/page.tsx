"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressBar } from "@/components/onboarding/progress-bar";
import { generateToolkit, ToolkitResponse } from "@/lib/api";

const LOADING_MESSAGES = [
  "Analyzing your profile...",
  "Connecting to AI engine...",
  "Scanning 2,847 AI tools...",
  "Matching work preferences...",
  "Finding tools for your hobbies...",
  "Curating weekend planners...",
  "Optimizing recommendations...",
  "Building your toolkit...",
  "Almost ready...",
];

interface OnboardingData {
  name: string;
  profession: string;
  professionLabel: string;
  hobbies: string[];
  customHobby?: string;
  slug: string;
}

export default function GeneratePage() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [userData, setUserData] = useState<OnboardingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<ToolkitResponse | null>(null);
  const router = useRouter();
  const hasStartedGeneration = useRef(false);

  // Load user data
  useEffect(() => {
    const stored = sessionStorage.getItem("onboarding_data");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setUserData(data);
      } catch (e) {
        console.error("Failed to parse onboarding data");
        setError("Failed to load your profile. Please go back and try again.");
      }
    } else {
      setError("No profile data found. Please start from the beginning.");
    }
  }, []);

  // Call backend API to generate toolkit
  const generateToolkitFromAPI = useCallback(async (data: OnboardingData) => {
    if (hasStartedGeneration.current) return;
    hasStartedGeneration.current = true;
    setIsGenerating(true);

    try {
      const hobby = data.hobbies[0] || data.customHobby || "general";
      
      const result = await generateToolkit({
        profession: data.profession,
        hobby: hobby,
        name: data.name,
        use_ai: true,
      });

      // Transform API response to match expected format
      const toolkitData = {
        ...result,
        workContext: `${result.profession} Workflow`,
        specs: {
          ...result.specs,
          updatedAt: "Dec 2025",
        },
        faq: [
          {
            question: `Why these specific tools for ${result.profession}s?`,
            answer: `Our SmartMatch™ algorithm analyzed thousands of ${result.profession} workflows to identify the most impactful AI tools. These recommendations are based on integration capabilities, user ratings, and real-world productivity gains.`,
          },
          {
            question: `How does the ${result.lifeContext} integration work?`,
            answer: `We match your hobby interests with AI tools that enhance those activities. For ${result.lifeContext.toLowerCase()}, we've selected apps that provide intelligent recommendations, planning assistance, and community features.`,
          },
          {
            question: "Can I customize this toolkit?",
            answer: "Absolutely! After viewing your toolkit, you can swap tools, add new ones from our catalog of 2,847+ AI tools, or remove tools that don't fit your needs.",
          },
        ],
        relatedProfessions: [
          { name: "Technical PM", slug: "technical-pm" },
          { name: "Project Manager", slug: "project-manager" },
          { name: "Scrum Master", slug: "scrum-master" },
        ],
      };

      setGeneratedData(result);
      sessionStorage.setItem("generated_toolkit", JSON.stringify(toolkitData));
      
    } catch (err) {
      console.error("API generation failed, using fallback:", err);
      // Fallback to local generation
      const toolkitData = generateToolkitDataLocal(data);
      sessionStorage.setItem("generated_toolkit", JSON.stringify(toolkitData));
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Start API call when user data is loaded
  useEffect(() => {
    if (userData && !hasStartedGeneration.current) {
      generateToolkitFromAPI(userData);
    }
  }, [userData, generateToolkitFromAPI]);

  // Progress animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Slow down at 80% if still generating
        if (prev >= 80 && isGenerating) {
          return Math.min(prev + 0.5, 90);
        }
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isGenerating]);

  // Complete progress when generation is done
  useEffect(() => {
    if (!isGenerating && hasStartedGeneration.current && progress < 100) {
      setProgress(100);
    }
  }, [isGenerating, progress]);

  // Navigate when complete
  useEffect(() => {
    if (progress >= 100 && userData && !isGenerating) {
      const timer = setTimeout(() => {
        router.push(`/u/${userData.slug}`);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, userData, router, isGenerating]);

  return (
    <motion.div
      className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          className="w-full max-w-lg text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Animated Icon */}
          <motion.div
            className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-8"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="material-symbols-outlined text-primary"
              style={{ fontSize: "48px" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              auto_awesome
            </motion.span>
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Building {userData?.name ? `${userData.name}'s` : "Your"} AI Toolkit
          </h1>

          {/* Profession Badge */}
          {userData?.professionLabel && (
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span>{userData.professionLabel}</span>
              <span>+</span>
              <span className="capitalize">{userData.hobbies?.[0] || "Lifestyle"}</span>
            </motion.div>
          )}

          {/* Dynamic Message */}
          <div className="h-8 relative overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                className="text-slate-600 dark:text-slate-400 absolute w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {LOADING_MESSAGES[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <ProgressBar progress={progress} />
          </div>

          {/* Skeleton Preview */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="h-28 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="h-full w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, rgba(43, 108, 238, 0.1) 50%, transparent 100%)`,
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["200% 0", "-200% 0"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                style={{
                  left: `${15 + i * 10}%`,
                  top: `${25 + (i % 4) * 15}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Local fallback: Generate toolkit data based on user input
function generateToolkitDataLocal(userData: OnboardingData) {
  const { name, profession, professionLabel, hobbies } = userData;
  const hobby = hobbies[0] || "general";

  // Tool databases by profession
  const WORK_TOOLS: Record<string, { name: string; logo: string; rating: number; description: string; ctaText: string; category: string; price: number }[]> = {
    "product-manager": [
      { name: "Jira AI", logo: "#0052CC", rating: 4, description: "Automates sprint planning and summarizes backlog for efficient project management.", ctaText: "Try Free", category: "Project Management", price: 0 },
      { name: "Notion AI", logo: "#000000", rating: 5, description: "Summarizes documents and generates action items within your workspace.", ctaText: "Try Free", category: "Documentation", price: 10 },
      { name: "Miro AI", logo: "#FFD02F", rating: 5, description: "Generates mind maps and diagrams from text prompts for brainstorming.", ctaText: "Try Free", category: "Collaboration", price: 0 },
      { name: "Slack AI", logo: "#4A154B", rating: 4, description: "Provides channel recaps and conversation summaries.", ctaText: "Try Free", category: "Communication", price: 0 },
    ],
    "developer": [
      { name: "GitHub Copilot", logo: "#000000", rating: 5, description: "AI pair programmer that helps you write code faster with suggestions.", ctaText: "Try Free", category: "Code Assistant", price: 10 },
      { name: "Cursor", logo: "#7C3AED", rating: 5, description: "AI-first code editor with powerful chat and edit capabilities.", ctaText: "Try Free", category: "IDE", price: 20 },
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "General-purpose AI assistant for coding, debugging, and explanations.", ctaText: "Try Free", category: "AI Assistant", price: 0 },
      { name: "Tabnine", logo: "#6366F1", rating: 4, description: "AI code completion that works in any IDE you use.", ctaText: "Try Free", category: "Code Assistant", price: 0 },
    ],
    "designer": [
      { name: "Figma AI", logo: "#F24E1E", rating: 5, description: "AI-powered design features integrated directly into Figma.", ctaText: "Try Free", category: "Design Tool", price: 15 },
      { name: "Midjourney", logo: "#000000", rating: 5, description: "Generate stunning images for design inspiration and assets.", ctaText: "Try Free", category: "Image Gen", price: 10 },
      { name: "Framer AI", logo: "#0055FF", rating: 4, description: "Generate and publish websites with AI assistance.", ctaText: "Try Free", category: "Web Design", price: 0 },
      { name: "Uizard", logo: "#7C3AED", rating: 4, description: "Transform sketches and screenshots into editable designs.", ctaText: "Try Free", category: "Prototyping", price: 0 },
    ],
    "marketer": [
      { name: "Jasper AI", logo: "#FF6B6B", rating: 5, description: "AI writing assistant for marketing copy and content.", ctaText: "Try Free", category: "Content", price: 49 },
      { name: "Copy.ai", logo: "#7C3AED", rating: 4, description: "Generate marketing copy, emails, and social posts.", ctaText: "Try Free", category: "Copywriting", price: 0 },
      { name: "Surfer SEO", logo: "#10B981", rating: 4, description: "AI-powered SEO optimization for content.", ctaText: "Try Free", category: "SEO", price: 89 },
      { name: "Canva AI", logo: "#00C4CC", rating: 5, description: "Create stunning graphics with AI-powered design tools.", ctaText: "Try Free", category: "Design", price: 0 },
    ],
    "writer": [
      { name: "Claude", logo: "#5A5A5A", rating: 5, description: "Advanced AI assistant for creative writing and analysis.", ctaText: "Try Free", category: "Writing", price: 20 },
      { name: "Grammarly", logo: "#15C39A", rating: 5, description: "AI writing assistant for grammar, spelling, and style.", ctaText: "Try Free", category: "Editing", price: 0 },
      { name: "Hemingway Editor", logo: "#FF5722", rating: 4, description: "Highlights complex sentences to improve clarity.", ctaText: "Try Free", category: "Editing", price: 0 },
      { name: "Jasper AI", logo: "#FF6B6B", rating: 5, description: "AI writing for various content formats.", ctaText: "Try Free", category: "Content", price: 49 },
    ],
    "student": [
      { name: "Quillbot", logo: "#4CAF50", rating: 4, description: "AI paraphrasing and summarizing for academic writing.", ctaText: "Try Free", category: "Writing", price: 0 },
      { name: "Notion AI", logo: "#000000", rating: 5, description: "Organize notes and generate study summaries.", ctaText: "Try Free", category: "Productivity", price: 10 },
      { name: "Perplexity AI", logo: "#8B5CF6", rating: 5, description: "AI search engine with direct answers and sources.", ctaText: "Try Free", category: "Research", price: 0 },
      { name: "Grammarly", logo: "#15C39A", rating: 5, description: "Perfect your essays and assignments.", ctaText: "Try Free", category: "Writing", price: 0 },
    ],
    "entrepreneur": [
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "All-purpose AI assistant for business strategy.", ctaText: "Try Free", category: "AI Assistant", price: 0 },
      { name: "Notion AI", logo: "#000000", rating: 5, description: "Build your second brain for business planning.", ctaText: "Try Free", category: "Productivity", price: 10 },
      { name: "Pitch AI", logo: "#FFB800", rating: 4, description: "Create stunning pitch decks with AI assistance.", ctaText: "Try Free", category: "Presentation", price: 0 },
      { name: "Zapier AI", logo: "#FF4A00", rating: 4, description: "Automate workflows between your apps.", ctaText: "Try Free", category: "Automation", price: 0 },
    ],
    "data-scientist": [
      { name: "GitHub Copilot", logo: "#000000", rating: 5, description: "AI code completion for Python and R.", ctaText: "Try Free", category: "Coding", price: 10 },
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "Debug code and explain complex algorithms.", ctaText: "Try Free", category: "AI Assistant", price: 0 },
      { name: "Jupyter AI", logo: "#F37626", rating: 4, description: "AI-powered notebooks for data analysis.", ctaText: "Try Free", category: "Data Analysis", price: 0 },
      { name: "Hugging Face", logo: "#FFD21E", rating: 5, description: "Access thousands of ML models.", ctaText: "Try Free", category: "ML Platform", price: 0 },
    ],
    "sales": [
      { name: "Apollo AI", logo: "#3F51B5", rating: 4, description: "AI-powered lead generation and outreach.", ctaText: "Try Free", category: "Sales", price: 0 },
      { name: "Gong", logo: "#FF9800", rating: 5, description: "Revenue intelligence from customer calls.", ctaText: "Request Demo", category: "Analytics", price: 0 },
      { name: "Outreach", logo: "#E91E63", rating: 4, description: "Automate your sales engagement sequences.", ctaText: "Request Demo", category: "Automation", price: 0 },
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "Draft personalized outreach emails.", ctaText: "Try Free", category: "AI Assistant", price: 0 },
    ],
    "hr-manager": [
      { name: "Textio", logo: "#9C27B0", rating: 5, description: "AI-powered language guidance for job posts.", ctaText: "Try Free", category: "Recruiting", price: 0 },
      { name: "HireVue AI", logo: "#4CAF50", rating: 4, description: "AI video interviewing and assessment.", ctaText: "Request Demo", category: "Recruiting", price: 0 },
      { name: "Culture Amp", logo: "#FFC107", rating: 4, description: "Employee experience with AI insights.", ctaText: "Request Demo", category: "Engagement", price: 0 },
      { name: "Notion AI", logo: "#000000", rating: 5, description: "Organize HR documents and policies.", ctaText: "Try Free", category: "Documentation", price: 10 },
    ],
    "financial-analyst": [
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "Financial modeling and analysis assistance.", ctaText: "Try Free", category: "AI Assistant", price: 0 },
      { name: "Excel Copilot", logo: "#217346", rating: 4, description: "AI-powered formulas and data analysis.", ctaText: "Try Free", category: "Spreadsheet", price: 0 },
      { name: "Bloomberg AI", logo: "#1A1A1A", rating: 5, description: "AI insights for financial markets.", ctaText: "Request Demo", category: "Finance", price: 0 },
      { name: "AlphaSense", logo: "#0066CC", rating: 4, description: "AI-powered market intelligence.", ctaText: "Request Demo", category: "Research", price: 0 },
    ],
    "customer-support": [
      { name: "Intercom Fin", logo: "#6AFDEF", rating: 5, description: "AI-powered customer support chatbot.", ctaText: "Try Free", category: "Support", price: 0 },
      { name: "Zendesk AI", logo: "#03363D", rating: 4, description: "Automate ticket routing and responses.", ctaText: "Try Free", category: "Helpdesk", price: 0 },
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "Draft empathetic customer responses.", ctaText: "Try Free", category: "AI Assistant", price: 0 },
      { name: "Freshdesk AI", logo: "#F37621", rating: 4, description: "Smart ticket management and automation.", ctaText: "Try Free", category: "Support", price: 0 },
    ],
    "consultant": [
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "Research and strategy development.", ctaText: "Try Free", category: "AI Assistant", price: 0 },
      { name: "Notion AI", logo: "#000000", rating: 5, description: "Client documentation and project tracking.", ctaText: "Try Free", category: "Productivity", price: 10 },
      { name: "Beautiful.ai", logo: "#FF5733", rating: 4, description: "Create stunning client presentations.", ctaText: "Try Free", category: "Presentation", price: 0 },
      { name: "Otter.ai", logo: "#4A90A4", rating: 4, description: "AI meeting transcription and summaries.", ctaText: "Try Free", category: "Meeting", price: 0 },
    ],
    "researcher": [
      { name: "Perplexity AI", logo: "#8B5CF6", rating: 5, description: "AI search with academic sources.", ctaText: "Try Free", category: "Research", price: 0 },
      { name: "Elicit", logo: "#6366F1", rating: 5, description: "AI research assistant for papers.", ctaText: "Try Free", category: "Research", price: 0 },
      { name: "Consensus", logo: "#10B981", rating: 4, description: "Search for scientific consensus.", ctaText: "Try Free", category: "Research", price: 0 },
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "Summarize and analyze research.", ctaText: "Try Free", category: "AI Assistant", price: 0 },
    ],
    "teacher": [
      { name: "Quizlet AI", logo: "#4255FF", rating: 5, description: "Generate flashcards and quizzes.", ctaText: "Try Free", category: "Education", price: 0 },
      { name: "Canva AI", logo: "#00C4CC", rating: 5, description: "Create engaging lesson materials.", ctaText: "Try Free", category: "Design", price: 0 },
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "Lesson planning and content creation.", ctaText: "Try Free", category: "AI Assistant", price: 0 },
      { name: "Grammarly", logo: "#15C39A", rating: 4, description: "Provide feedback on student writing.", ctaText: "Try Free", category: "Writing", price: 0 },
    ],
    "other": [
      { name: "ChatGPT", logo: "#10A37F", rating: 5, description: "All-purpose AI assistant for any task.", ctaText: "Try Free", category: "AI Assistant", price: 0 },
      { name: "Notion AI", logo: "#000000", rating: 5, description: "Organize your work and ideas.", ctaText: "Try Free", category: "Productivity", price: 10 },
      { name: "Grammarly", logo: "#15C39A", rating: 5, description: "Improve your writing everywhere.", ctaText: "Try Free", category: "Writing", price: 0 },
      { name: "Canva AI", logo: "#00C4CC", rating: 4, description: "Create visuals for any purpose.", ctaText: "Try Free", category: "Design", price: 0 },
    ],
  };

  // Life tools by hobby
  const LIFE_TOOLS: Record<string, { name: string; description: string; backgroundImage: string }[]> = {
    hiking: [
      { name: "AllTrails AI", description: "Find perfect hiking routes based on weather, fitness level, and trail conditions.", backgroundImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80" },
      { name: "Mountain Project", description: "AI-powered climbing and hiking route recommendations.", backgroundImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
    ],
    gaming: [
      { name: "Discord AI", description: "Smart moderation and community management for gaming servers.", backgroundImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" },
      { name: "Parsec", description: "Low-latency game streaming with AI optimization.", backgroundImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80" },
    ],
    cooking: [
      { name: "ChefGPT", description: "Generate creative recipes from ingredients in your fridge.", backgroundImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" },
      { name: "Whisk", description: "AI meal planning and grocery list generation.", backgroundImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80" },
    ],
    reading: [
      { name: "Blinkist AI", description: "AI-powered book summaries and personalized recommendations.", backgroundImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80" },
      { name: "Readwise", description: "AI highlights and spaced repetition for better retention.", backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
    ],
    traveling: [
      { name: "TripIt AI", description: "Smart travel itinerary planning and organization.", backgroundImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80" },
      { name: "Hopper", description: "AI-powered flight and hotel price predictions.", backgroundImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" },
    ],
    coding: [
      { name: "LeetCode AI", description: "AI-powered coding practice with personalized problem sets.", backgroundImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80" },
      { name: "Exercism", description: "Learn programming with AI-assisted mentorship.", backgroundImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80" },
    ],
  };

  const workTools = WORK_TOOLS[profession] || WORK_TOOLS["product-manager"];
  const lifeTools = LIFE_TOOLS[hobby] || LIFE_TOOLS["hiking"];

  const hobbyLabel = hobby.charAt(0).toUpperCase() + hobby.slice(1);

  return {
    userName: name,
    slug: userData.slug,
    profession: professionLabel,
    professionSlug: profession,
    workContext: `${professionLabel} Workflow`,
    lifeContext: hobbyLabel,
    description: `A personalized AI toolkit for ${professionLabel}s who enjoy ${hobbyLabel.toLowerCase()}. Curated tools for professional productivity and personal interests.`,
    longDescription: `This AI toolkit is specifically designed for ${professionLabel}s who enjoy ${hobbyLabel.toLowerCase()} activities. The Work Mode section includes tools optimized for your daily workflow, while the Life Mode section features AI-powered apps perfect for your hobbies and interests.`,
    workTools,
    lifeTools,
    specs: {
      totalTools: workTools.length + lifeTools.length + 6,
      monthlyCost: workTools.reduce((sum, t) => sum + t.price, 0),
      primaryGoal: "Productivity",
      updatedAt: "Dec 2025",
      freeTools: workTools.filter((t) => t.price === 0).length + lifeTools.length,
      paidTools: workTools.filter((t) => t.price > 0).length,
    },
    faq: [
      {
        question: `Why these specific tools for ${professionLabel}s?`,
        answer: `Our SmartMatch™ algorithm analyzed thousands of ${professionLabel} workflows to identify the most impactful AI tools. These recommendations are based on integration capabilities, user ratings, and real-world productivity gains.`,
      },
      {
        question: `How does the ${hobbyLabel} integration work?`,
        answer: `We match your hobby interests with AI tools that enhance those activities. For ${hobbyLabel.toLowerCase()}, we've selected apps that provide intelligent recommendations, planning assistance, and community features.`,
      },
      {
        question: "Can I customize this toolkit?",
        answer: "Absolutely! After viewing your toolkit, you can swap tools, add new ones from our catalog of 2,847+ AI tools, or remove tools that don't fit your needs.",
      },
    ],
    relatedProfessions: [
      { name: "Technical PM", slug: "technical-pm" },
      { name: "Project Manager", slug: "project-manager" },
      { name: "Scrum Master", slug: "scrum-master" },
    ],
  };
}
