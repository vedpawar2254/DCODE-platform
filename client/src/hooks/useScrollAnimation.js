import { useEffect, useRef } from 'react';
import { useAnimation, useInView } from 'framer-motion';

export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    threshold,
    once: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return [ref, controls];
};

// Predefined animation variants for common use cases
export const scrollAnimations = {
  fadeInUp: {
    hidden: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.6 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  fadeInLeft: {
    hidden: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.6 }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  fadeInRight: {
    hidden: {
      opacity: 0,
      x: 100,
      transition: { duration: 0.6 }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.6 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  rotateIn: {
    hidden: {
      opacity: 0,
      rotate: -180,
      scale: 0.8,
      transition: { duration: 0.6 }
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  slideInBlur: {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(10px)',
      transition: { duration: 0.6 }
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }
};
