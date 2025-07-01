import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureCards } from './FeatureCards';
import playbutton from '../../../assets/playbutton.svg';
import star from '../../../assets/star.svg';
import spirals from '../../../assets/spirals.svg';
import accelerate from '../../../assets/accelerate.svg';
import globe from '../../../assets/globe.svg';

const Bennefits = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative w-full px-6 md:px-16 bg-black text-center overflow-hidden min-h-screen flex flex-col justify-center items-center pt-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 max-w-3xl mx-auto z-10">
        <h3 className="text-green-500 text-sm tracking-widest mb-8">
          WHY CHOOSE US
        </h3>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Experience <span className="text-[#BCDD19]">DCODE</span>
        </h2>
        <p className="text-gray-400 mt-4">
          DCODE is an open-source initiative by Dev Club that empowers students
          to contribute to real-world projects and build industry-level skills.
          It fosters collaboration, learning, and a lasting culture of
          open-source development.
        </p>
      </div>

      <div className="relative w-full mx-16">
        <AnimatePresence>
          {!isVideoOpen && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex flex-col md:flex-row md:flex-wrap md:justify-between items-center gap-12 w-full "
            >
              <motion.div
                exit={{ x: -800, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col space-y-12 md:space-y-40"
              >
                <FeatureCards
                  icon={accelerate}
                  title="Accelerate Growth"
                  description="Build meaningful projects that advance your career trajectory"
                />
                <FeatureCards
                  icon={spirals}
                  title="Unlock Potential"
                  description="Maximize your impact with cutting-edge development tools"
                />
              </motion.div>

              <motion.div
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative flex items-center justify-center"
              >
                <div className="w-64 h-64 rounded-full bg-gradient-to-b from-[#5A6525] to-[#333D00] flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full flex items-center justify-center border border-[#37CD5A]">
                    <button
                      onClick={() => setIsVideoOpen(true)}
                      className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center hover:scale-105 transition"
                      style={{
                        background:
                          'radial-gradient(circle, #37CD5A 0%, transparent 100%)'
                      }}
                    >
                      <img
                        src={playbutton}
                        alt="play button"
                        className="w-8 h-8"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                exit={{ y: -200, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute w-8 h-8 rounded-full"
                style={{
                  top: '140px',
                  left: '60%',
                  transform: 'translateX(-50%)',
                  background:
                    'radial-gradient(circle, #37CD5A 0%, transparent 100%)'
                }}
              ></motion.div>

              <motion.div
                exit={{ y: 200, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute w-6 h-6 rounded-full"
                style={{
                  bottom: '140px',
                  right: '60%',
                  background:
                    'radial-gradient(circle, #37CD5A 0%, transparent 100%)'
                }}
              ></motion.div>

              <motion.div
                exit={{ x: 800, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col space-y-12 md:space-y-40"
              >
                <FeatureCards
                  icon={star}
                  title="Stand Apart"
                  description="Distinguish yourself in the competitive development landscape"
                />
                <FeatureCards
                  icon={globe}
                  title="Collaborate Globally"
                  description="Work with diverse peers and mentors from across the tech ecosystem"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute inset-0 -z-10 rounded-xl blur-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse at bottom, rgba(76, 175, 80, 0.6) 0%, transparent 70%)'
                }}
              ></motion.div>
              <video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                controls
                autoPlay
                className="rounded-2xl shadow-xl w-full max-w-4xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Bennefits;
