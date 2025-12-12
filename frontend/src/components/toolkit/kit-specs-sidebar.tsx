"use client";

import { useState } from "react";

interface KitSpecsSidebarProps {
  specs: {
    totalTools: number;
    monthlyCost: number;
    primaryGoal: string;
    updatedAt: string;
  };
  description?: string;
}

export function KitSpecsSidebar({ specs, description }: KitSpecsSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className="w-full lg:sticky top-10 self-start">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/30 p-6 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Kit Specs
        </h3>

        {/* Stats Table */}
        <table className="w-full text-sm">
          <tbody className="space-y-4">
            <tr className="flex justify-between items-center py-2">
              <td className="text-gray-600 dark:text-gray-400">Total Tools</td>
              <td className="font-semibold text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700/50 px-2 py-0.5 rounded-full">
                {specs.totalTools}
              </td>
            </tr>
            <tr className="flex justify-between items-center py-2">
              <td className="text-gray-600 dark:text-gray-400">Monthly Cost</td>
              <td className="font-semibold text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700/50 px-2 py-0.5 rounded-full">
                ${specs.monthlyCost}
              </td>
            </tr>
            <tr className="flex justify-between items-center py-2">
              <td className="text-gray-600 dark:text-gray-400">Primary Goal</td>
              <td className="font-semibold text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700/50 px-2 py-0.5 rounded-full">
                {specs.primaryGoal}
              </td>
            </tr>
            <tr className="flex justify-between items-center py-2">
              <td className="text-gray-600 dark:text-gray-400">Updated</td>
              <td className="font-semibold text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700/50 px-2 py-0.5 rounded-full">
                {specs.updatedAt}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="border-t border-gray-200 dark:border-gray-700/50" />

        {/* Expandable Section */}
        <details className="group">
          <summary
            className="flex justify-between items-center cursor-pointer list-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="font-semibold text-gray-900 dark:text-white">
              Why this kit?
            </span>
            <div className="transition-transform duration-300 group-open:rotate-45">
              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                add
              </span>
            </div>
          </summary>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description ||
              "This kit is curated for product managers who balance a demanding work week with an adventurous weekend. The Mon-Fri tools are selected to streamline workflows and boost team collaboration, while the Weekend apps focus on unplugging and exploring the outdoors."}
          </div>
        </details>
      </div>
    </aside>
  );
}

