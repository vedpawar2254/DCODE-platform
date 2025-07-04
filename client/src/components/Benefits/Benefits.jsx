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
    <section className="relative flex flex-col items-center w-full min-h-screen px-6 pt-32 text-center bg-black md:px-16">
      <div className="max-w-3xl mx-auto mb-16">
        <h3 className="mb-8 text-sm tracking-widest text-green-500">
          WHY CHOOSE US
        </h3>
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Experience <span className="text-[#BCDD19]">DCODE</span>
        </h2>
        <p className="mt-4 text-gray-400">
          DCODE is an open-source initiative by Dev Club that empowers students
          to contribute to real-world projects and build industry-level skills.
          It fosters collaboration, learning, and a lasting culture of
          open-source development.
        </p>
      </div>

      <div className="relative flex flex-col w-full gap-12 md:flex-row md:justify-center md:items-center">
        {/* --- BACKGROUND GLOW --- */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div
            className="w-[600px] h-[600px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(55, 205, 90, 0.15) 0%, transparent 70%)',
              filter: 'blur(150px)'
            }}
          ></div>
        </div>

        {/* --- Decorative Small Circles --- */}
        <div
          className="absolute top-[80px] right-[40%] w-8 h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, #5A6525 0%, transparent 100%)',
            border: '1px solid #000000'
          }}
        ></div>
        <div
          className="absolute bottom-[80px] left-[40%] w-6 h-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, #5A6525 0%, transparent 100%)',
            border: '1px solid #000000'
          }}
        ></div>

        {/* --- LEFT FEATURE CARDS --- */}
        <div className="flex flex-col space-y-12 md:space-y-40">
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
        </div>

        {/* --- CENTER CIRCLE --- */}
        <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden border border-black flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(135deg, rgba(90,101,37,0.6) 0%, rgba(51,61,0,0.1) 100%)'
            }}
          ></div>
          <button
            onClick={() => setIsVideoOpen(true)}
            className="w-[82px] h-[82px] rounded-full flex items-center justify-center hover:scale-105 transition hover:cursor-pointer"
            style={{
              background:
                'radial-gradient(circle, #37CD5A 0%, transparent 100%)'
            }}
          >
            <img src="/images/playbutton.svg" alt="play button" className="w-6 h-6" />
          </button>
        </div>

        {/* --- RIGHT FEATURE CARDS --- */}
        <div className="flex flex-col space-y-12 md:space-y-40">
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
        </div>

        {/* --- VIDEO MODAL --- */}
        <AnimatePresence>
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
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Benefits;
