"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const HOBBIES = [
  { id: "hiking", icon: "hiking", label: "Hiking" },
  { id: "gaming", icon: "stadia_controller", label: "Gaming" },
  { id: "reading", icon: "book", label: "Reading" },
  { id: "coding", icon: "code_blocks", label: "Coding" },
  { id: "cooking", icon: "restaurant_menu", label: "Cooking" },
  { id: "traveling", icon: "flight_takeoff", label: "Traveling" },
];

interface HobbyGridProps {
  onSelectionChange: (selected: string[]) => void;
  selected: string[];
}

export function HobbyGrid({ onSelectionChange, selected }: HobbyGridProps) {
  const toggleHobby = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    onSelectionChange(newSelected);
  };

  return (
    <motion.div
      className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 p-4"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {HOBBIES.map((hobby) => {
        const isSelected = selected.includes(hobby.id);
        return (
          <motion.button
            key={hobby.id}
            onClick={() => toggleHobby(hobby.id)}
            className={`flex flex-1 gap-3 rounded-lg p-4 flex-col items-center justify-center text-center cursor-pointer ${
              isSelected
                ? "border-2 border-primary bg-primary/10 dark:bg-primary/20"
                : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50"
            }`}
            variants={fadeUp}
            whileHover={{
              scale: 1.05,
              borderColor: "#2b6cee",
            }}
            whileTap={{ scale: 0.95 }}
            animate={
              isSelected
                ? {
                    scale: [1, 1.08, 1],
                    transition: { duration: 0.3 },
                  }
                : {}
            }
          >
            <motion.span
              className={`material-symbols-outlined text-2xl ${
                isSelected ? "text-primary" : "text-slate-900 dark:text-white"
              }`}
              animate={isSelected ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              {hobby.icon}
            </motion.span>
            <span
              className={`text-base leading-tight ${
                isSelected
                  ? "text-primary font-bold"
                  : "text-slate-900 dark:text-white font-medium"
              }`}
            >
              {hobby.label}
            </span>
            {isSelected && (
              <motion.span
                className="absolute top-2 right-2 text-primary text-sm"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
