import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateFork = () => {
  const [isForked, setIsForked] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navigate = useNavigate();

  // Simulate fork completion after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsForked(true);
      setShowContinue(true); // <-- show continue immediately after fork
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true);

        setTimeout(() => {
          navigate('/onboarding/createBranch');
        }, 1000);
      }
    };

    if (showContinue) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showContinue, hasScrolled, navigate]);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="min-h-screen"
          >
            {/* Main content section */}
            <div className="min-h-screen flex flex-col items-center justify-center p-8">
              {/* Big content area for video and explanation */}
              <div className="w-full max-w-4xl rounded-3xl p-12 border mb-8">
                <h1 className="text-4xl font-bold text-white text-center mb-8">
                  Creating Your Branch
                </h1>

                {/* Video placeholder */}
                <div className="w-full aspect-video rounded-2xl mb-8 flex items-center justify-center border border-white/10">
                  <span className="text-white/60 text-xl">
                    Video Placeholder
                  </span>
                </div>
              </div>

              {/* Fork status */}
              <div className="flex items-center gap-4 mb-8">
                {!isForked ? (
                  <>
                    <Loader2 className="animate-spin text-gray-400" size={24} />
                    <span className="text-gray-400 text-lg">
                      Waiting for fork...
                    </span>
                  </>
                ) : null}
              </div>

              {/* Continue button */}
              <AnimatePresence>
                {showContinue && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    {/* Animated down arrow */}
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mt-8"
                    >
                      <ChevronDown
                        className="text-white/60 mx-auto"
                        size={32}
                      />
                      <p className="text-white/60 mt-2">Scroll to continue</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next page simulation */}
      {hasScrolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex items-center justify-center"
        ></motion.div>
      )}
    </div>
  );
};
