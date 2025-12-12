"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { ReactNode } from "react";
import {
  staggerContainer,
  fadeUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  scaleIn,
} from "@/lib/animations";

// ============================================
// Stagger Container - 子元素错落进入
// ============================================

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerContainer({
  children,
  className,
  delay = 0.1,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: delay, delayChildren: delay },
        },
      }}
      initial="hidden"
      animate="show"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// Fade Up - 向上淡入
// ============================================

interface FadeUpProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeUp({ children, className, delay = 0, ...props }: FadeUpProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// Fade In - 淡入
// ============================================

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// Scroll Reveal - 滚动显示
// ============================================

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  ...props
}: ScrollRevealProps) {
  const variants: Record<string, Variants> = {
    up: fadeUp,
    down: {
      hidden: { opacity: 0, y: -20 },
      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    },
    left: slideInLeft,
    right: slideInRight,
  };

  return (
    <motion.div
      variants={variants[direction]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// Scale In - 缩放进入
// ============================================

interface ScaleInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleIn({ children, className, delay = 0, ...props }: ScaleInProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// Hover Card - 悬停卡片效果
// ============================================

interface HoverCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function HoverCard({ children, className, ...props }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// Animated Button - 动画按钮
// ============================================

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
}

export function AnimatedButton({ children, className, ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ============================================
// Background Gradient - 动态背景渐变
// ============================================

interface BackgroundGradientProps {
  className?: string;
  children?: ReactNode;
}

export function BackgroundGradient({ className, children }: BackgroundGradientProps) {
  return (
    <motion.div
      className={className}
      animate={{
        background: [
          "linear-gradient(135deg, #f6f6f8 0%, #e8ebf0 50%, #f6f6f8 100%)",
          "linear-gradient(135deg, #e8ebf0 0%, #f6f6f8 50%, #e8ebf0 100%)",
          "linear-gradient(135deg, #f6f6f8 0%, #e8ebf0 50%, #f6f6f8 100%)",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// Stagger Item - 错落动画子元素
// ============================================

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  return (
    <motion.div variants={fadeUp} className={className} {...props}>
      {children}
    </motion.div>
  );
}

