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
      
      <div
        className="absolute inset-0 z-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(86, 255, 0, 0.15) 0%, rgba(86, 255, 0, 0) 70%)`,
          opacity: 0.7
        }}
      ></div>

      
      <div className="max-w-7xl mx-auto mb-16">
        <h3 className="mb-8 text-sm tracking-widest text-[#37CD5A]">
          WHY CHOOSE US
        </h3>
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Experience{' '}
          <span className="bg-gradient-to-r from-[#A2C00C] to-[#098E28] bg-clip-text text-transparent">
            DCODE
          </span>
        </h2>
        <p className="mt-6 text-[#D5D5D5] max-w-7xl mx-auto">
          DCODE is an open-source initiative by Dev Club that empowers students
          to contribute to real-world projects and build industry-level skills.
          It fosters collaboration, learning, and a lasting culture of
          open-source development.
        </p>
      </div>

      
      <div className="relative flex flex-col w-full md:flex-row md:justify-center md:items-center gap-8">
       
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
                title="Accelerate Growth"
                description="Build meaningful projects that advance your career trajectory"
              />
              <FeatureCards
                icon="/images/spirals.svg"
                title="Unlock Potential"
                description="Maximize your impact with cutting-edge development tools"
              />
            </motion.div>
          )}
        </AnimatePresence>

        
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
            // onClick={() => setIsVideoOpen(true)}
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
                description="Distinguish yourself in the competitive development landscape"
              />
              <FeatureCards
                icon="/images/globe.svg"
                title="Collaborate Globally"
                description="Work with diverse peers and mentors from across the tech ecosystem"
              />
            </motion.div>
          )}
        </AnimatePresence>

        
        {/* <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-50 flex items-center justify-center"
            >
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsVideoOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 0.4,
                    duration: 0.6,
                    ease: 'easeOut'
                  }
                }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(76, 175, 80, 0.5) 0%, transparent 75%)',
                  filter: 'blur(40px)'
                }}
              />

              <motion.div
                ref={videoRef}
                className="relative w-full max-w-4xl mx-4"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <video
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    controls
                    autoPlay
                    className="w-full shadow-xl rounded-2xl"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
    </section>
  );
};

export default Benefits;
