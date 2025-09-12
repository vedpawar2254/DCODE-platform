import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useRouteError, useLocation } from "react-router-dom";
import { 
  Home, 
  ArrowLeft, 
  AlertTriangle, 
  Bug, 
  Wifi, 
  RefreshCw,
  Search,
  FileX
} from "lucide-react";

const ErrorPage = ({ errorType = "unknown", customMessage = null }) => {
  const navigate = useNavigate();
  const routeError = useRouteError();
  const location = useLocation();
  
  // Get error info from route state if available
  const stateError = location.state?.error;
  const stateErrorType = location.state?.errorType;
  
  // Determine error type and details
  const getErrorDetails = () => {
    const finalErrorType = stateErrorType || errorType || (routeError?.status === 404 ? "404" : "unknown");
    
    if (finalErrorType === "404" || routeError?.status === 404) {
      return {
        type: "404",
        title: "Page Not Found",
        message: "The page you're looking for doesn't exist or has been moved.",
        icon: FileX,
        suggestion: "Double-check the URL or navigate back to safety."
      };
    } else if (finalErrorType === "500" || routeError?.status === 500) {
      return {
        type: "500",
        title: "Server Error",
        message: "Something went wrong on our end. We're working to fix it.",
        icon: Bug,
        suggestion: "Try refreshing the page or come back later."
      };
    } else if (finalErrorType === "network") {
      return {
        type: "network",
        title: "Connection Lost",
        message: "Check your internet connection and try again.",
        icon: Wifi,
        suggestion: "Make sure you're connected to the internet."
      };
    } else {
      return {
        type: "unknown",
        title: "Something Went Wrong",
        message: stateError || customMessage || routeError?.message || "An unexpected error occurred.",
        icon: AlertTriangle,
        suggestion: "Try refreshing the page or going back."
      };
    }
  };

  const errorDetails = getErrorDetails();
  const IconComponent = errorDetails.icon;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#C6FF3D] rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-[#C6FF3D] rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-[#C6FF3D] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-[#C6FF3D] rounded-full"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        {/* Error Icon */}
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="mb-8 flex justify-center"
        >
          <motion.div
            variants={floatingVariants}
            animate="float"
            className="relative"
          >
            <div className="w-32 h-32 bg-[#C6FF3D]/10 rounded-full flex items-center justify-center border-2 border-[#C6FF3D]/20">
              <IconComponent 
                size={64} 
                className="text-[#C6FF3D]"
              />
            </div>
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 w-32 h-32 bg-[#C6FF3D]/5 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Error Code */}
        <motion.div
          variants={itemVariants}
          className="mb-4"
        >
          <span className="text-[#C6FF3D] text-6xl md:text-8xl font-bold tracking-wider">
            {errorDetails.type.toUpperCase()}
          </span>
        </motion.div>

        {/* Error Title */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          {errorDetails.title}
        </motion.h1>

        {/* Error Message */}
        <motion.p
          variants={itemVariants}
          className="text-[#A1A1AA] text-lg md:text-xl mb-2"
        >
          {errorDetails.message}
        </motion.p>

        {/* Error Suggestion */}
        <motion.p
          variants={itemVariants}
          className="text-[#A1A1AA] text-sm md:text-base mb-8"
        >
          {errorDetails.suggestion}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleGoHome}
            className="flex items-center gap-2 bg-[#C6FF3D] text-black px-6 py-3 rounded-lg hover:bg-[#B8E835] transition-colors font-medium min-w-[150px] justify-center"
          >
            <Home size={20} />
            Go Home
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleGoBack}
            className="flex items-center gap-2 bg-[#23252B] text-white px-6 py-3 rounded-lg hover:bg-[#2A2A2A] transition-colors font-medium min-w-[150px] justify-center"
          >
            <ArrowLeft size={20} />
            Go Back
          </motion.button>

          {(errorDetails.type === "500" || errorDetails.type === "network" || errorDetails.type === "unknown") && (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-[#23252B] text-white px-6 py-3 rounded-lg hover:bg-[#2A2A2A] transition-colors font-medium min-w-[150px] justify-center"
            >
              <RefreshCw size={20} />
              Refresh
            </motion.button>
          )}
        </motion.div>

        {/* Additional Help for 404 */}
        {errorDetails.type === "404" && (
          <motion.div
            variants={itemVariants}
            className="mt-8 pt-8 border-t border-[#23252B]"
          >
            <p className="text-[#A1A1AA] text-sm mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: "Dashboard", path: "/dashboard" },
                { label: "Community", path: "/users" },
                { label: "Profile", path: "/profile" },
                { label: "Repositories", path: "/repositories" }
              ].map((link, index) => (
                <motion.button
                  key={link.path}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => navigate(link.path)}
                  className="text-[#C6FF3D] hover:text-white text-sm px-3 py-1 rounded border border-[#C6FF3D]/30 hover:border-[#C6FF3D] transition-colors"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === 'development' && routeError && (
          <motion.div
            variants={itemVariants}
            className="mt-8 p-4 bg-[#1A1A1A] border border-[#23252B] rounded-lg text-left"
          >
            <h3 className="text-white font-medium mb-2">Debug Info:</h3>
            <pre className="text-[#A1A1AA] text-xs overflow-auto">
              {JSON.stringify(routeError, null, 2)}
            </pre>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorPage;
