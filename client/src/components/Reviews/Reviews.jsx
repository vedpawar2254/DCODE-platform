import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

export default function Reviews() {
  const reviews = Array(5).fill({
    name: 'Rajesh Kumar',
    role: 'Senior Developer at Netflix',
    text: 'DCODE provided me with hands-on experience across multiple tech stacks. The mentorship was invaluable, and the projects I worked on directly led to my job offer.'
  });

  return (
    <section className="relative h-screen py-24 overflow-hidden bg-black">
      {/* Top Text */}
      <div className="text-center pb-12 px-4 relative z-10">
        <div className="text-green-400 text-xl font-normal mb-2 opacity-70">
          OUR CONTRIBUTORS
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          <span className="text-white">What our </span>
          <span className="bg-gradient-to-r from-[#BCDD19] to-[#65770D] bg-clip-text text-transparent">
            contributors
          </span>{' '}
          <span className="text-white">say</span>
        </h1>
        <p className="text-gray-300 text-sm max-w-2xl mx-auto opacity-70">
          A structured journey through open-source contribution, from exploration to production-level impact
        </p>
      </div>

      {/* Fading edges */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-black via-black/70 via-black/40 via-black/20 to-transparent z-30" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-black via-black/70 via-black/40 via-black/20 to-transparent z-30" />

      {/* Top Row */}
      <div className="w-full overflow-hidden mb-8">
        <motion.div
          className="flex gap-6"
          style={{ translateX: '-200px' }}  
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
        >
          {[...reviews, ...reviews].map((review, index) => (
            <TestimonialCard key={`top-${index}`} {...review} />
          ))}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 40, repeat: Infinity }} // same as top row!
        >
          {[...reviews, ...reviews].map((review, index) => (
            <TestimonialCard key={`bottom-${index}`} {...review} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
