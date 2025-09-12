/**
 * Professional animation performance utilities and advanced patterns
 * Optimized for smooth, professional user experiences
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * High-performance scroll-triggered animations
 */
export const useScrollAnimation = (offset = 100) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once for performance
        }
      },
      {
        threshold: 0.1,
        rootMargin: `0px 0px -${offset}px 0px`,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [offset]);

  return { ref, isVisible };
};

/**
 * Smooth mouse tracking for advanced hover effects
 */
export const useMouseTracking = (strength = 0.1) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      mouseX.set(x * strength);
      mouseY.set(y * strength);
    },
    [mouseX, mouseY, strength]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return {
    mouseTrackingProps: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
    rotateX,
    rotateY,
    springX,
    springY,
  };
};

/**
 * Advanced stagger animations with custom patterns
 */
export const createAdvancedStagger = (pattern = "linear", itemCount = 0) => {
  const patterns = {
    linear: (index) => index * 0.1,
    reverse: (index) => (itemCount - 1 - index) * 0.1,
    center: (index) => Math.abs(index - Math.floor(itemCount / 2)) * 0.1,
    random: () => Math.random() * 0.3,
    wave: (index) => Math.sin((index / itemCount) * Math.PI) * 0.2,
  };

  return {
    delayChildren: 0.1,
    staggerChildren: 0.05,
    custom: patterns[pattern] || patterns.linear,
  };
};

/**
 * Performance-optimized animation variants
 */
export const createOptimizedVariants = ({
  translateDistance = 20,
  scaleAmount = 0.95,
  duration = 0.3,
  ease = [0.25, 0.1, 0.25, 1],
} = {}) => ({
  hidden: {
    opacity: 0,
    y: translateDistance,
    scale: scaleAmount,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration,
      ease,
    },
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
});

/**
 * Smart loading states with progressive enhancement
 */
export const useSmartLoading = (isLoading, minimumDelay = 500) => {
  const [showLoading, setShowLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isLoading) {
      setIsComplete(false);
      setShowLoading(true);
    } else {
      // Ensure minimum loading time for smooth UX
      timeoutId = setTimeout(() => {
        setShowLoading(false);
        setIsComplete(true);
      }, minimumDelay);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading, minimumDelay]);

  return { showLoading, isComplete };
};

/**
 * Gesture-aware animations for better mobile experience
 */
export const useGestureAnimations = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  const gestureVariants = {
    idle: { scale: 1, rotate: 0 },
    pressed: { scale: 0.95, transition: { duration: 0.1 } },
    dragging: {
      scale: 1.05,
      rotate: dragProgress * 2,
      transition: { duration: 0 },
    },
  };

  const handleDrag = useCallback((_, info) => {
    const progress = Math.min(Math.abs(info.offset.x) / 100, 1);
    setDragProgress(progress);
  }, []);

  return {
    gestureVariants,
    currentVariant: isPressed ? "pressed" : "idle",
    dragHandlers: {
      onDrag: handleDrag,
      onDragStart: () => setIsPressed(true),
      onDragEnd: () => {
        setIsPressed(false);
        setDragProgress(0);
      },
    },
  };
};

/**
 * Context-aware animation timing
 */
export const useAdaptiveTiming = () => {
  const [performanceLevel, setPerformanceLevel] = useState("high");

  useEffect(() => {
    // Detect device performance capabilities
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const isLowEnd =
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isLowEnd || isReducedMotion) {
      setPerformanceLevel("low");
    } else if (connection?.effectiveType === "3g") {
      setPerformanceLevel("medium");
    }
  }, []);

  const timingConfigs = {
    low: {
      duration: 0.15,
      stagger: 0.02,
      complexity: "minimal",
    },
    medium: {
      duration: 0.25,
      stagger: 0.05,
      complexity: "moderate",
    },
    high: {
      duration: 0.3,
      stagger: 0.1,
      complexity: "full",
    },
  };

  return timingConfigs[performanceLevel];
};

/**
 * Professional layout animations
 */
export const layoutAnimationConfig = {
  type: "spring",
  stiffness: 700,
  damping: 30,
  mass: 1,
};

export const sharedLayoutTransition = {
  layoutId: "shared-element",
  transition: layoutAnimationConfig,
};

/**
 * Advanced micro-interactions
 */
export const microInteractionVariants = {
  button: {
    idle: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  },
  icon: {
    idle: { rotate: 0, scale: 1 },
    hover: { rotate: 5, scale: 1.1, transition: { duration: 0.2 } },
    tap: { rotate: -5, scale: 0.9, transition: { duration: 0.1 } },
  },
  card: {
    idle: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: {
      y: -4,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  },
};
