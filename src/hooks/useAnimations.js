import { useEffect, useState } from "react";
import { useAnimation, useInView } from "framer-motion";

/**
 * Custom hook for managing scroll-based animations
 */
export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return [ref, controls, inView];
};

/**
 * Hook for staggered animations with custom delays
 */
export const useStaggerAnimation = (
  items = [],
  baseDelay = 0,
  staggerDelay = 0.1
) => {
  const [animatedItems, setAnimatedItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedItems(
        items.map((item, index) => ({
          ...item,
          delay: baseDelay + index * staggerDelay,
        }))
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [items, baseDelay, staggerDelay]);

  return animatedItems;
};

/**
 * Hook for managing modal animations
 */
export const useModalAnimation = (isOpen) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return { shouldRender, isOpen };
};

/**
 * Hook for parallax scroll effects
 */
export const useParallax = (speed = 0.5) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset * speed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offsetY;
};

/**
 * Hook for typewriter effect
 */
export const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

/**
 * Hook for managing loading states with animations
 */
export const useLoadingAnimation = (isLoading, delay = 0) => {
  const [showLoading, setShowLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowLoading(true), delay);
      setShowContent(false);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
      const timer = setTimeout(() => setShowContent(true), 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading, delay]);

  return { showLoading, showContent };
};
