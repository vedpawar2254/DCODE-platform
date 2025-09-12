/**
 * Professional animation variants and utilities for framer-motion
 * Designed to be reusable, scalable, and maintainable
 */

// Base easing configurations for consistent motion design
export const easings = {
  smooth: [0.25, 0.1, 0.25, 1], // Smooth, natural easing
  spring: [0.6, -0.05, 0.01, 0.99], // Subtle spring effect
  ease: [0.4, 0, 0.2, 1], // Material design easing
  sharp: [0.4, 0, 0.6, 1], // Sharp, quick motion
  gentle: [0.25, 0.46, 0.45, 0.94], // Very gentle motion
};

// Duration constants for consistent timing
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
};

// Stagger configurations for sequential animations
export const stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
};

/**
 * Fade animations with different directions
 */
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easings.sharp,
    },
  },
};

export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: durations.fast,
      ease: easings.sharp,
    },
  },
};

export const fadeDownVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
};

export const fadeLeftVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
};

export const fadeRightVariants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
};

/**
 * Scale animations for interactive elements
 */
export const scaleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.normal,
      ease: easings.spring,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: durations.fast,
      ease: easings.sharp,
    },
  },
};

export const hoverScaleVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: durations.fast,
      ease: easings.ease,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: easings.sharp,
    },
  },
};

/**
 * Container variants for staggered children animations
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.1,
    },
  },
};

export const fastContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.fast,
      delayChildren: 0.05,
    },
  },
};

export const slowContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.2,
    },
  },
};

/**
 * Modal and overlay animations
 */
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.spring,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: durations.fast,
      ease: easings.sharp,
    },
  },
};

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.fast,
      ease: easings.ease,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easings.ease,
    },
  },
};

/**
 * Loading and progress animations
 */
export const spinVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const pulseVariants = {
  animate: {
    scale: 1.05,
    opacity: 0.8,
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: easings.gentle,
    },
  },
};

/**
 * Card and list item animations
 */
export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: durations.fast,
      ease: easings.ease,
    },
  },
};

export const listItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
};

/**
 * Text animations
 */
export const textVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
};

/**
 * Button and interactive element animations
 */
export const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: durations.fast,
      ease: easings.ease,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: easings.sharp,
    },
  },
};

export const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: durations.fast,
      ease: easings.spring,
    },
  },
};

/**
 * Custom hooks for consistent animation usage
 */
export const getStaggerDelay = (index, baseDelay = 0) => ({
  delay: baseDelay + index * stagger.normal,
});

export const getRandomStagger = (index, min = 0, max = 0.3) => ({
  delay: min + Math.random() * (max - min) + index * stagger.fast,
});

/**
 * Utility function to create custom variants
 */
export const createVariant = ({
  hidden = {},
  visible = {},
  exit = {},
  duration = durations.normal,
  ease = easings.smooth,
  delay = 0,
}) => ({
  hidden,
  visible: {
    ...visible,
    transition: {
      duration,
      ease,
      delay,
      ...visible.transition,
    },
  },
  exit: {
    ...exit,
    transition: {
      duration: durations.fast,
      ease: easings.sharp,
      ...exit.transition,
    },
  },
});

/**
 * Viewport animation configurations
 */
export const viewportConfig = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -50px 0px",
};

export const viewportConfigPartial = {
  once: true,
  amount: 0.3,
};

export const viewportConfigFull = {
  once: true,
  amount: 0.8,
};
