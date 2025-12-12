"use client";

import { motion } from "framer-motion";

// AI Tools with real brand colors and proper logos
const AI_TOOLS = [
  { 
    name: "ChatGPT", 
    color: "#10A37F",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.6 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    )
  },
  { 
    name: "Claude", 
    color: "#CC785C",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
      </svg>
    )
  },
  { 
    name: "Gemini", 
    color: "#4285F4",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  { 
    name: "Midjourney", 
    color: "#000000",
    logo: <span className="text-lg font-bold">M</span>
  },
  { 
    name: "Notion AI", 
    color: "#000000",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.038c-.42-.326-.98-.7-2.055-.607L3.01 2.686c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
      </svg>
    )
  },
  { 
    name: "GitHub Copilot", 
    color: "#000000",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  { 
    name: "Jasper", 
    color: "#FF6B6B",
    logo: <span className="text-lg font-bold">J</span>
  },
  { 
    name: "Perplexity", 
    color: "#20808D",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.08 5.1 7.63 12 4.18zM4 8.45l7 3.5v7.6l-7-3.5v-7.6zm9 11.1v-7.6l7-3.5v7.6l-7 3.5z"/>
      </svg>
    )
  },
  { 
    name: "Runway", 
    color: "#6366F1",
    logo: <span className="text-lg font-bold">R</span>
  },
  { 
    name: "Stability AI", 
    color: "#7B61FF",
    logo: <span className="text-lg font-bold">S</span>
  },
  { 
    name: "Hugging Face", 
    color: "#FFD21E",
    logo: <span className="text-xl">🤗</span>
  },
  { 
    name: "Replicate", 
    color: "#0F172A",
    logo: <span className="text-lg font-bold">R</span>
  },
  { 
    name: "Figma AI", 
    color: "#F24E1E",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v4.49c0 2.476-2.014 4.49-4.588 4.49zm0-7.51a3.023 3.023 0 0 0-3.019 3.019 3.023 3.023 0 0 0 3.019 3.019c1.665 0 3.019-1.355 3.019-3.019v-3.019H8.148zm0-1.471H3.658c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.49v8.98zm-4.49-7.51a3.023 3.023 0 0 0-3.019 3.019 3.023 3.023 0 0 0 3.019 3.019h3.019V7.51H3.658zM8.148 0h4.588v8.981H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0zm0 7.51c1.665 0 3.019-1.355 3.019-3.019S9.813 1.471 8.148 1.471a3.023 3.023 0 0 0-3.019 3.019 3.023 3.023 0 0 0 3.019 3.019zm7.704 1.471c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49zm0 7.51a3.023 3.023 0 0 0 3.019-3.019 3.023 3.023 0 0 0-3.019-3.019 3.023 3.023 0 0 0-3.019 3.019 3.023 3.023 0 0 0 3.019 3.019z"/>
      </svg>
    )
  },
];

export function LogoMarquee() {
  // Double the array for seamless loop
  const logos = [...AI_TOOLS, ...AI_TOOLS];

  return (
    <div className="py-12 bg-white dark:bg-slate-900/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-8 uppercase tracking-wider">
          Trusted AI Tools in Our Database
        </p>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-slate-900/50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-slate-900/50 to-transparent z-10" />

          {/* Scrolling Track */}
          <motion.div
            className="flex gap-10 items-center"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {logos.map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="flex items-center gap-2.5 shrink-0 opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
              >
                {/* Logo */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow"
                  style={{ backgroundColor: tool.color }}
                >
                  {tool.logo}
                </div>
                {/* Name */}
                <span className="text-slate-800 dark:text-slate-300 font-medium whitespace-nowrap text-sm">
                  {tool.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-10 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">2,847+</div>
            <div className="text-sm text-slate-500">AI Tools</div>
          </div>
          <div className="w-px bg-gray-200 dark:bg-gray-700" />
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
            <div className="text-sm text-slate-500">LLM Providers</div>
          </div>
          <div className="w-px bg-gray-200 dark:bg-gray-700" />
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">50+</div>
            <div className="text-sm text-slate-500">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
}
