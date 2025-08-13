import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureCards } from './FeatureCards';

const Benefits = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isVideoOpen &&
        videoRef.current &&
        !videoRef.current.contains(event.target)
      ) {
        setIsVideoOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVideoOpen]);

  return (
    <section className="relative flex flex-col items-center w-full min-h-screen px-6 pt-24 text-center bg-black md:px-16">
      {/* Background glow */}
      <div
        className="absolute inset-0 z-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(86, 255, 0, 0.15) 0%, rgba(86, 255, 0, 0) 70%)`,
          opacity: 0.7
        }}
      ></div>

      {/* Heading & Intro */}
      <div className="max-w-7xl mx-auto mb-16">
        <h3 className="mb-8 text-sm tracking-widest text-[#37CD5A]">
          WHY DCODE
        </h3>
        
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Build.<span className="bg-gradient-to-r from-[#A2C00C] to-[#098E28] bg-clip-text text-transparent"> Contribute.</span> Lead.</h2>
        <p className="mt-6 text-[#D5D5D5] max-w-4xl mx-auto">
          Make your first contributions, and ship actual changes.
          You’ll work alongside peers, mentors, and maintainers — and if you
          keep at it, you could <strong>become a maintainer yourself</strong>.
          <br /><br />
          
        </p>
      </div>

      {/* Features */}
      <div className="relative flex flex-col w-full md:flex-row md:justify-center md:items-center gap-8">
        {/* Left Features */}
        <AnimatePresence>
          {!isVideoOpen && (
            <motion.div
              className="flex flex-col gap-4 flex-1 items-center md:items-start"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
            >
              <FeatureCards
                icon="/images/accelerate.svg"
                title="Boost Resume"
                description="Create a resume that stands out from the crowd."
              />
              <FeatureCards
                icon="/images/spirals.svg"
                title="Grow and Learn"
                description="Learn tools and workflows used by top open-source teams."
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Video Button */}
        <div className="hidden md:flex relative items-center justify-center flex-shrink-0 w-[340px] h-[340px] rounded-full mt-24">
          <div
            className="absolute inset-0 rounded-full border-2 border-black z-10"
            style={{
              background: 'linear-gradient(60deg, #5A6525 0%, #272f01ff 100%)',
              boxShadow: '6px 12px 12px rgba(0, 0, 0, 0.5)'
            }}
          ></div>

          <div className="absolute z-10 rounded-full border border-[#37CD5A] w-[280px] h-[280px]"></div>

          <button
            className="z-20 w-[120px] h-[120px] rounded-full flex items-center justify-center hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            style={{
              background:
                'radial-gradient(circle at center, #37CD5A 0%, #1e864dff 70%, #074627ff 100%)'
            }}
          >
            <img
              src="/images/playbutton.svg"
              alt="play button"
              className="w-8 h-8"
            />
          </button>
        </div>

        {/* Right Features */}
        <AnimatePresence>
          {!isVideoOpen && (
            <motion.div
              className="flex flex-col gap-4 flex-1 items-center md:items-start"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
            >
              <FeatureCards
                icon="/images/star.svg"
                title="Stand Apart"
                description="Your Contributions speaks for you, We make sure of that."
              />
              <FeatureCards
                icon="/images/globe.svg"
                title="Collaborate Globally"
                description="Work with contributors mentors, and orgs from across the globe."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Benefits;
