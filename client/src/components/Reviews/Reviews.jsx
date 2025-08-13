import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

export default function Reviews() {
  const reviews = Array(5).fill({
    name: 'Rajesh Kumar',
    role: 'Senior Developer at Netflix',
    text: 'DCODE provided me with hands-on experience across multiple tech stacks. The mentorship was invaluable, and the projects I worked on directly led to my job offer.'
  });

  const infiniteReviews = [...reviews, ...reviews];

  return (
    <section className={`relative min-h-screen py-12 md:py-24 overflow-hidden ${window.innerWidth < 768 ? 'bg-transparent' : 'bg-black'} px-4 sm:px-6`}>
      {/* Header Content */}
      <div className="text-center max-w-3xl mx-auto relative z-10 mb-8 md:mb-16">
        <div className="text-green-400 text-sm md:text-base lg:text-xl font-normal mb-2 md:mb-3 opacity-70">
          OUR CONTRIBUTORS
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
          <span className="text-white">What our </span>
          <span className="bg-gradient-to-r from-[#BCDD19] to-[#65770D] bg-clip-text text-transparent">
            contributors
          </span>{' '}
          <span className="text-white">say</span>
        </h1>
        <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto opacity-70">
          A structured journey through open-source contribution, from exploration to production-level impact
        </p>
      </div>

      {/* Gradient Overlays - only show on desktop */}
      {window.innerWidth >= 768 && (
        <>
          <div className="pointer-events-none absolute top-0 left-0 h-full w-16 sm:w-24 md:w-40 bg-gradient-to-r from-black via-black/70 to-transparent z-30" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-16 sm:w-24 md:w-40 bg-gradient-to-l from-black via-black/70 to-transparent z-30" />
        </>
      )}

      {/* Mobile Infinite Carousel */}
      <div className="md:hidden w-full overflow-hidden py-4">
        <motion.div
          className="flex gap-4"
          animate={{ 
            x: ['0%', `-${100 * reviews.length / (reviews.length * 2)}%`]
          }}
          transition={{ 
            ease: 'linear',
            duration: 40,
            repeat: Infinity
          }}
        >
          {infiniteReviews.map((review, index) => (
            <div key={`mobile-${index}`} className="w-[85vw] max-w-[300px] flex-shrink-0">
              <TestimonialCard {...review} compact />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Desktop Carousels */}
      {window.innerWidth >= 768 && (
        <>
          <div className="hidden md:block w-full overflow-hidden mt-8 lg:mt-16">
            <motion.div
              className="flex gap-6"
              animate={{ 
                x: ['0%', '-50%']
              }}
              transition={{ 
                ease: 'linear',
                duration: 40,
                repeat: Infinity
              }}
            >
              {infiniteReviews.map((review, index) => (
                <TestimonialCard 
                  key={`top-${index}`} 
                  {...review} 
                  className="min-w-[400px]"
                />
              ))}
            </motion.div>
          </div>

          <div className="hidden md:block w-full overflow-hidden mt-6">
            <motion.div
              className="flex gap-6"
              animate={{ 
                x: ['-50%', '0%']
              }}
              transition={{ 
                ease: 'linear',
                duration: 40,
                repeat: Infinity
              }}
            >
              {infiniteReviews.map((review, index) => (
                <TestimonialCard 
                  key={`bottom-${index}`} 
                  {...review} 
                  className="min-w-[400px]"
                />
              ))}
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}