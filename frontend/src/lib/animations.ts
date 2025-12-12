import { Variants } from "framer-motion";

// ============================================
// Container Variants (用于子元素错落动画)
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// ============================================
// Item Variants (单个元素动画)
// ============================================

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// ============================================
// Hover & Tap Effects (交互动画)
// ============================================

export const hoverScale = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

export const hoverScaleSmall = {
  scale: 1.02,
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

export const tapScale = {
  scale: 0.98,
};

export const cardHover = {
  y: -4,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

export const buttonHover = {
  scale: 1.05,
  boxShadow: "0 4px 14px rgba(43, 108, 238, 0.4)",
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

// ============================================
// Background Animations (背景动画)
// ============================================

export const gradientAnimation = {
  background: [
    "linear-gradient(135deg, #f6f6f8 0%, #e8ebf0 100%)",
    "linear-gradient(135deg, #e8ebf0 0%, #f6f6f8 100%)",
    "linear-gradient(135deg, #f6f6f8 0%, #e8ebf0 100%)",
  ],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  },
};

// ============================================
// Page Transitions (页面过渡)
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// ============================================
// Special Effects (特殊效果)
// ============================================

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const shimmer = {
  backgroundPosition: ["200% 0", "-200% 0"],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear",
  },
};

// ============================================
// Utility Functions
// ============================================

export const getStaggerDelay = (index: number, baseDelay = 0.1) => ({
  transition: { delay: index * baseDelay },
});

