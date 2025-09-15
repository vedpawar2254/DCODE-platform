/**
 * Recharts animation utilities for consistent chart animations
 * Provides standard animation configurations and helpers
 */

/**
 * Standard animation configuration for Recharts components
 */
export const chartAnimations = {
  // Area/Line charts - reduced delay for smoother experience
  area: {
    animationBegin: 100,
    animationDuration: 1200,
    animationEasing: "ease-out",
    isAnimationActive: true,
  },

  // Grid animations
  grid: {
    animationBegin: 0,
    animationDuration: 600,
  },

  // Axis animations
  xAxis: {
    animationBegin: 50,
    animationDuration: 500,
  },

  yAxis: {
    animationBegin: 75,
    animationDuration: 500,
  },

  // Tooltip animations
  tooltip: {
    animationDuration: 200,
  },

  // Bar charts
  bar: {
    animationBegin: 150,
    animationDuration: 1000,
    animationEasing: "ease-out",
    isAnimationActive: true,
  },

  // Pie charts
  pie: {
    animationBegin: 200,
    animationDuration: 800,
    animationEasing: "ease-out",
    isAnimationActive: true,
  },
};

/**
 * Animation variants for framer-motion chart containers
 */
export const chartContainerVariants = {
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
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Generate a stable key for chart that only changes when data structure changes significantly
 * @param {Array} data - Chart data array
 * @param {string} prefix - Optional prefix for the key
 * @returns {string} Stable key for chart
 */
export const generateChartKey = (data, prefix = "chart") => {
  if (!data || !Array.isArray(data)) {
    return `${prefix}-loading`;
  }

  // Only change key when data length changes significantly or data is completely new
  // This prevents unnecessary re-mounting of the chart
  return `${prefix}-${data.length}`;
};

/**
 * Enhanced animation props for smooth chart transitions
 * @param {string} type - Type of chart element ('area', 'bar', 'pie', etc.)
 * @returns {object} Animation props object
 */
export const getChartAnimationProps = (type) => {
  const baseProps = chartAnimations[type] || chartAnimations.area;

  return {
    ...baseProps,
    // Ensure animation is always active
    isAnimationActive: true,
    // Remove random delay to prevent inconsistent animations
  };
};

/**
 * Responsive animation durations based on screen size
 * @param {boolean} isMobile - Whether the device is mobile
 * @returns {object} Adjusted animation configuration
 */
export const getResponsiveAnimations = (isMobile = false) => {
  const multiplier = isMobile ? 0.7 : 1; // Faster animations on mobile

  return Object.keys(chartAnimations).reduce((acc, key) => {
    acc[key] = {
      ...chartAnimations[key],
      animationDuration: Math.round(
        chartAnimations[key].animationDuration * multiplier
      ),
    };
    return acc;
  }, {});
};

/**
 * Hook for managing chart animation state
 * @param {Array} data - Chart data
 * @param {object} options - Animation options
 * @returns {object} Animation state and controls
 */
export const useChartAnimation = (data, options = {}) => {
  const { enableReanimation = true, type = "area", isMobile = false } = options;

  const chartKey = enableReanimation ? generateChartKey(data) : "static-chart";
  const animations = isMobile ? getResponsiveAnimations(true) : chartAnimations;
  const animationProps = animations[type] || animations.area;

  return {
    key: chartKey,
    animationProps,
    containerVariants: chartContainerVariants,
  };
};
