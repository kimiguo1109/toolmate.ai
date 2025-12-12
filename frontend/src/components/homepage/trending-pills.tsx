"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const TRENDING = [
  { text: "Product Manager + Gaming", profession: "product-manager", hobby: "gaming" },
  { text: "Developer + Cooking", profession: "developer", hobby: "cooking" },
  { text: "Designer + Hiking", profession: "designer", hobby: "hiking" },
  { text: "Marketer + Traveling", profession: "marketer", hobby: "traveling" },
  { text: "Student + Coding", profession: "student", hobby: "coding" },
];

export function TrendingPills() {
  const router = useRouter();

  const handleClick = (item: typeof TRENDING[0]) => {
    sessionStorage.setItem("preselected_hobby", item.hobby);
    router.push(`/onboarding?profession=${item.profession}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 px-4 py-8">
      <span className="text-slate-600 text-sm mr-2 self-center font-medium">Trending:</span>
      {TRENDING.map((item) => (
        <motion.button
          key={item.text}
          onClick={() => handleClick(item)}
          className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 text-slate-800 dark:text-slate-300 text-sm font-medium shadow-sm cursor-pointer select-none"
          whileHover={{
            scale: 1.05,
            borderColor: "#2b6cee",
            color: "#2b6cee",
            boxShadow: "0 4px 12px rgba(43, 108, 238, 0.25)",
            transition: { duration: 0 },
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0 },
          }}
          transition={{ duration: 0 }}
        >
          {item.text}
        </motion.button>
      ))}
    </div>
  );
}
