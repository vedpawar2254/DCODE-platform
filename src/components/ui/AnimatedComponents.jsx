import { motion } from "framer-motion";
import { forwardRef } from "react";
import {
  fadeUpVariants,
  fadeVariants,
  scaleVariants,
  cardVariants,
  buttonVariants,
  containerVariants,
  viewportConfig,
} from "../../lib/animations";

/**
 * Animated wrapper components for consistent animations
 */

// Basic animated div with fade up
export const AnimatedDiv = forwardRef(
  ({ children, className = "", variant = fadeUpVariants, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exit"
      viewport={viewportConfig}
      {...props}
    >
      {children}
    </motion.div>
  )
);

// Animated div that triggers on scroll
export const AnimatedSection = forwardRef(
  ({ children, className = "", variant = fadeUpVariants, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      {...props}
    >
      {children}
    </motion.div>
  )
);

// Animated container for staggered children
export const AnimatedContainer = forwardRef(
  (
    {
      children,
      className = "",
      variant = containerVariants,
      staggerChildren = true,
      ...props
    },
    ref
  ) => (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerChildren ? variant : undefined}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  )
);

// Animated card component
export const AnimatedCard = forwardRef(
  ({ children, className = "", hover = true, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={hover ? "hover" : undefined}
      viewport={viewportConfig}
      {...props}
    >
      {children}
    </motion.div>
  )
);

// Animated button
export const AnimatedButton = forwardRef(
  ({ children, className = "", disabled = false, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={className}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
);

// Animated text component
export const AnimatedText = forwardRef(
  ({ children, className = "", as = "div", ...props }, ref) => {
    // Map string element names to motion components
    const getMotionComponent = (elementType) => {
      const componentMap = {
        div: motion.div,
        p: motion.p,
        h1: motion.h1,
        h2: motion.h2,
        h3: motion.h3,
        h4: motion.h4,
        h5: motion.h5,
        h6: motion.h6,
        span: motion.span,
        strong: motion.strong,
        em: motion.em,
        small: motion.small,
      };
      return componentMap[elementType] || motion.div;
    };

    const Component = getMotionComponent(as);

    return (
      <Component
        ref={ref}
        className={className}
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

// Animated modal backdrop
export const AnimatedBackdrop = ({ children, onClick, ...props }) => (
  <motion.div
    className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4"
    variants={fadeVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    onClick={onClick}
    {...props}
  >
    {children}
  </motion.div>
);

// Animated modal content
export const AnimatedModal = forwardRef(
  ({ children, className = "", ...props }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      variants={scaleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </motion.div>
  )
);

// Animated list for staggered items
export const AnimatedList = forwardRef(
  ({ children, className = "", ...props }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      {...props}
    >
      {children}
    </motion.div>
  )
);

// Animated list item
export const AnimatedListItem = forwardRef(
  ({ children, className = "", ...props }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUpVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
);

// Loading spinner component
export const AnimatedSpinner = ({ size = 12, className = "" }) => (
  <motion.div
    className={`border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}
    style={{ width: size * 4, height: size * 4 }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

// Animated badge/chip component
export const AnimatedBadge = forwardRef(
  ({ children, className = "", ...props }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      variants={scaleVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      viewport={viewportConfig}
      {...props}
    >
      {children}
    </motion.div>
  )
);

// Page transition wrapper
export const PageTransition = ({ children, className = "" }) => (
  <motion.div
    className={className}
    variants={fadeUpVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
  </motion.div>
);

AnimatedDiv.displayName = "AnimatedDiv";
AnimatedSection.displayName = "AnimatedSection";
AnimatedContainer.displayName = "AnimatedContainer";
AnimatedCard.displayName = "AnimatedCard";
AnimatedButton.displayName = "AnimatedButton";
AnimatedText.displayName = "AnimatedText";
AnimatedModal.displayName = "AnimatedModal";
AnimatedList.displayName = "AnimatedList";
AnimatedListItem.displayName = "AnimatedListItem";
AnimatedBadge.displayName = "AnimatedBadge";
