"use client";

import { motion } from "framer-motion";
import { ToolCard } from "@/components/toolkit/tool-card";
import { HeroToolCard } from "@/components/toolkit/hero-tool-card";
import { KitSpecsSidebar } from "@/components/toolkit/kit-specs-sidebar";
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";

interface Toolkit {
  workTools: {
    name: string;
    logo: string;
    rating: number;
    description: string;
    ctaText: string;
  }[];
  lifeTools: {
    name: string;
    description: string;
    backgroundImage: string;
  }[];
  specs: {
    totalTools: number;
    monthlyCost: number;
    primaryGoal: string;
    updatedAt: string;
  };
}

interface ToolkitContentProps {
  toolkit: Toolkit;
}

export function ToolkitContent({ toolkit }: ToolkitContentProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      {/* Left Main Column (70%) */}
      <main className="w-full lg:w-[70%] space-y-12">
        {/* Section A: Mon-Fri Workflow */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideInLeft}
        >
          <h2 className="text-primary text-2xl font-bold leading-tight tracking-tight pb-4 pt-5 border-b-2 border-primary/20 mb-6">
            Mon-Fri Workflow
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {toolkit.workTools.map((tool, index) => (
              <motion.div key={tool.name} variants={fadeUp}>
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Section B: Weekend Mode */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideInRight}
        >
          <h2 className="text-orange-500 text-2xl font-bold leading-tight tracking-tight pb-4 pt-5 border-b-2 border-orange-500/20 mb-6">
            Weekend Mode
          </h2>
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {toolkit.lifeTools.map((tool, index) => (
              <motion.div key={tool.name} variants={fadeUp}>
                <HeroToolCard tool={tool} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </main>

      {/* Right Sidebar (30%) */}
      <motion.div
        className="w-full lg:w-[30%]"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <KitSpecsSidebar specs={toolkit.specs} />
      </motion.div>
    </div>
  );
}

