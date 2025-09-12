/**
 * Advanced animation utilities for professional React applications
 * Provides sophisticated animation patterns and optimizations
 */

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Create a staggered animation sequence with custom delays
 */
export const createStaggeredSequence = (
  items,
  baseDelay = 0,
  staggerDelay = 0.1
) => {
  return items.map((item, index) => ({
    ...item,
    transition: {
      ...item.transition,
      delay: baseDelay + index * staggerDelay,
    },
  }));
};

/**
 * Optimized viewport animations with intersection observer
 */
export const useViewportAnimation = (threshold = 0.1, triggerOnce = true) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    once: triggerOnce,
    margin: "0px 0px -50px 0px",
  });

  return { ref, isInView };
};

/**
 * Performance-optimized hover animations
 */
export const useOptimizedHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 50); // Small delay to prevent rapid state changes
  };

  return {
    isHovered,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
};

/**
 * Smooth state transitions with loading states
 */
export const useAnimatedTransition = (value, delay = 300) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsTransitioning(true);

      const timeout = setTimeout(() => {
        setDisplayValue(value);
        setIsTransitioning(false);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [value, displayValue, delay]);

  return { displayValue, isTransitioning };
};

/**
 * Advanced grid animations with responsive staggering
 */
export const useResponsiveGridAnimation = (itemCount, breakpoints = {}) => {
  const [gridColumns, setGridColumns] = useState(4);

  useEffect(() => {
    const updateGridColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setGridColumns(1);
      else if (width < 768) setGridColumns(2);
      else if (width < 1024) setGridColumns(3);
      else setGridColumns(4);
    };

    updateGridColumns();
    window.addEventListener("resize", updateGridColumns);
    return () => window.removeEventListener("resize", updateGridColumns);
  }, []);

  // Calculate optimal stagger delay based on grid layout
  const staggerDelay = Math.max(0.03, 0.15 / gridColumns);

  return {
    gridColumns,
    staggerDelay,
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.1,
        },
      },
    },
  };
};

/**
 * Professional loading sequence animations
 */
export const createLoadingSequence = (steps = 3, duration = 0.6) => {
  const stepDuration = duration / steps;

  return {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 1, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1],
      },
    },
  };
};

/**
 * Micro-interaction animations for better UX
 */
export const microInteractions = {
  // Subtle press feedback
  pressDown: {
    scale: 0.98,
    transition: { duration: 0.1, ease: "easeOut" },
  },

  // Gentle hover lift
  hoverLift: {
    y: -1,
    transition: { duration: 0.2, ease: "easeOut" },
  },

  // Attention-grabbing pulse
  attentionPulse: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 0.8,
      repeat: 2,
      ease: "easeInOut",
    },
  },

  // Success confirmation
  successPop: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

/**
 * Smart animation controller that adapts to user preferences
 */
export const useAdaptiveAnimations = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const getAnimationProps = (variants, options = {}) => {
    if (reducedMotion) {
      return {
        initial: false,
        animate: false,
        transition: { duration: 0 },
        ...options.reducedMotionOverride,
      };
    }

    return {
      variants,
      initial: "hidden",
      animate: "visible",
      exit: "exit",
      ...options,
    };
  };

  return { reducedMotion, getAnimationProps };
};
