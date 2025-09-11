import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Floating scroll-to-top button with smooth animations
 */
export const FloatingScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      className="fixed bottom-8 right-8 z-50 p-3 bg-[#C6FF3D] text-black rounded-full shadow-lg"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#B8E835",
        boxShadow: "0 8px 25px rgba(198, 255, 61, 0.3)",
      }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ y: -2 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <ChevronUp size={20} />
      </motion.div>
    </motion.button>
  );
};

/**
 * Floating particles background effect
 */
export const FloatingParticles = ({ count = 20 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#C6FF3D] opacity-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Floating action menu for quick actions
 */
export const FloatingActionMenu = ({ actions = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <motion.div
        className="flex flex-col gap-3"
        initial={false}
        animate={{ height: isOpen ? "auto" : 56 }}
      >
        {/* Action buttons */}
        <motion.div className="flex flex-col gap-2">
          {actions.map((action, index) => (
            <motion.button
              key={index}
              className="p-3 bg-[#23252B] text-white rounded-full shadow-lg hover:bg-[#2A2A2A] transition-colors"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0,
                y: isOpen ? 0 : 20,
              }}
              transition={{ delay: index * 0.1, duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={action.onClick}
              title={action.title}
            >
              <action.icon size={16} />
            </motion.button>
          ))}
        </motion.div>

        {/* Main toggle button */}
        <motion.button
          className="p-4 bg-[#C6FF3D] text-black rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            +
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};
