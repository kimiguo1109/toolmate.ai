"use client";

import { useEffect, useState } from "react";

interface MatchingIndicatorProps {
  selectedCount: number;
}

export function MatchingIndicator({ selectedCount }: MatchingIndicatorProps) {
  const [count, setCount] = useState(0);
  const targetCount = selectedCount > 0 ? 200 + selectedCount * 250 : 0;

  useEffect(() => {
    if (targetCount === 0) {
      setCount(0);
      return;
    }

    const duration = 500;
    const steps = 20;
    const increment = targetCount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetCount]);

  if (selectedCount === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
        Select your interests to see matching tools
      </p>
    );
  }

  return (
    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
      Matching with{" "}
      <span className="text-primary font-semibold">{count}+</span> AI tools...
    </p>
  );
}

