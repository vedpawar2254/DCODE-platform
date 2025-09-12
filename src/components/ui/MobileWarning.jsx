import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useEffect, useState } from "react";

export const MobileWarning = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth initial render
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const iconVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (!isVisible) return null;

  return (
    // Show only on small screens (< md breakpoint)
    <div className="md:hidden fixed inset-0 z-50 bg-[#121212] flex items-center justify-center p-6">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-md w-full text-center space-y-8"
      >
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <img
            src="/images/d.png"
            alt="DCODE Logo"
            className="h-10 mx-auto mb-8"
          />
        </motion.div>

        {/* Device Icons Animation */}
        <motion.div 
          className="flex justify-center items-center space-x-4 mb-8"
          variants={itemVariants}
        >
          <motion.div
            variants={iconVariants}
            className="p-3 bg-[#1A1A1A] rounded-xl border border-[#23252B]"
          >
            <Smartphone className="w-6 h-6 text-red-400" />
          </motion.div>
          
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#666] text-2xl"
          >
            →
          </motion.div>
          
          <motion.div
            variants={iconVariants}
            className="p-3 bg-[#C6FF3D] rounded-xl"
          >
            <Monitor className="w-6 h-6 text-black" />
          </motion.div>
        </motion.div>

        {/* Main Message */}
        <motion.div variants={itemVariants} className="space-y-4">
          <motion.h1 
            className="text-2xl font-bold text-white leading-tight"
            variants={pulseVariants}
            animate="animate"
          >
            Hey there, Developer! 👋
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-[#A1A1AA] text-lg leading-relaxed"
          >
            Please continue with a{" "}
            <span className="text-[#C6FF3D] font-medium">larger screen device</span>{" "}
            to get an immersive experience
          </motion.p>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          variants={itemVariants}
          className="space-y-3 bg-[#1A1A1A] border border-[#23252B] rounded-xl p-6"
        >
          <h3 className="text-white font-semibold text-sm mb-4">
            ✨ What you'll get on desktop:
          </h3>
          
          <motion.div className="space-y-3 text-left">
            {[
              "Full dashboard with rich analytics",
              "Interactive code editor experience", 
              "Complete project management tools",
              "Enhanced collaboration features"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-2 h-2 bg-[#C6FF3D] rounded-full flex-shrink-0"></div>
                <span className="text-[#A1A1AA] text-sm">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Device Recommendation */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-6 pt-4"
        >
          {[
            { icon: Monitor, label: "Desktop", recommended: true },
            { icon: Tablet, label: "Tablet", recommended: false }
          ].map(({ icon: Icon, label, recommended }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center space-y-2 p-4 rounded-xl border transition-colors ${
                recommended 
                  ? "bg-[#C6FF3D]/10 border-[#C6FF3D]/30 text-[#C6FF3D]" 
                  : "bg-[#1A1A1A] border-[#23252B] text-[#666]"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{label}</span>
              {recommended && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-xs bg-[#C6FF3D] text-black px-2 py-1 rounded-full font-medium"
                >
                  Recommended
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-10 right-10 w-20 h-20 border border-[#C6FF3D]/20 rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute bottom-20 left-10 w-16 h-16 border border-[#666]/20 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};