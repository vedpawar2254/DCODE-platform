/**
 * Custom hook for managing sophisticated list and grid animations
 * Provides optimized animation controls for data-driven components
 * Performance optimized with reduced re-renders and debounced updates
 */

import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

export const useListAnimations = ({
  items = [],
  loading = false,
  error = null,
  animateOnDataChange = true,
}) => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousItemsLength = useRef(items.length);
  const animationTimeoutRef = useRef(null);

  // Debounced animation trigger to prevent excessive animations
  const triggerAnimation = useCallback(
    (variant) => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(true);
        controls.start(variant).then(() => {
          setIsAnimating(false);
        });
      }, 50); // Small debounce
    },
    [controls]
  );

  // Optimized data change detection
  const hasSignificantChange = useMemo(() => {
    const lengthDiff = Math.abs(items.length - previousItemsLength.current);
    return lengthDiff > 0 && lengthDiff < 10; // Only animate for reasonable changes
  }, [items.length]);

  // Animate when data changes - optimized
  useEffect(() => {
    if (!animateOnDataChange || !hasSignificantChange) return;

    if (!loading && !error) {
      triggerAnimation("visible");
    }

    previousItemsLength.current = items.length;
  }, [
    hasSignificantChange,
    loading,
    error,
    triggerAnimation,
    animateOnDataChange,
  ]);

  // Handle loading state - simplified
  useEffect(() => {
    if (loading) {
      setIsAnimating(true);
    } else if (!error && items.length > 0) {
      triggerAnimation("visible");
    }
  }, [loading, error, items.length, triggerAnimation]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Optimized scroll to top
  const scrollToTop = useCallback((smooth = true) => {
    if (containerRef.current) {
      const behavior = smooth ? "smooth" : "auto";
      containerRef.current.scrollIntoView({
        behavior,
        block: "start",
      });
    }
  }, []);

  // Simplified refresh without complex animations
  const triggerRefresh = useCallback(() => {
    triggerAnimation("visible");
  }, [triggerAnimation]);

  return {
    controls,
    containerRef,
    isAnimating,
    scrollToTop,
    triggerRefresh,

    // Animation states - memoized for performance
    shouldShowItems: !loading && !error && items.length > 0,
    shouldShowLoading: loading,
    shouldShowEmpty: !loading && !error && items.length === 0,
    shouldShowError: error && !loading,
  };
};

// Simplified pagination animations
export const usePaginationAnimations = (currentPage, totalPages) => {
  const controls = useAnimation();
  const [isPageChanging, setIsPageChanging] = useState(false);
  const previousPage = useRef(currentPage);

  useEffect(() => {
    if (currentPage !== previousPage.current && currentPage > 0) {
      setIsPageChanging(true);

      // Simple fade animation
      controls.start("visible").then(() => {
        setIsPageChanging(false);
      });
    }
    previousPage.current = currentPage;
  }, [currentPage, controls]);

  return {
    controls,
    isPageChanging,
    shouldAnimate: totalPages > 1,
  };
};

// Simplified search animations
export const useSearchAnimations = (searchQuery, hasResults) => {
  const controls = useAnimation();
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  const triggerSearchAnimation = useCallback(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(() => {
      controls.start("visible").then(() => {
        setIsSearching(false);
      });
    }, 100);
  }, [controls]);

  useEffect(() => {
    if (searchQuery) {
      triggerSearchAnimation();
    }
  }, [searchQuery, hasResults, triggerSearchAnimation]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return {
    controls,
    isSearching,
    triggerSearchAnimation,
  };
};
