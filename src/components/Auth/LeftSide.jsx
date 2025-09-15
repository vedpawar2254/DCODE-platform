import { motion } from "framer-motion";

export const LeftSide = () => {
  return (
    <div className="relative flex-1 flex flex-col items-center px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10 overflow-hidden">
      {/* Logo */}
      <div className="w-full flex justify-center mb-2 mt-4 md:mt-6 lg:mt-10">
        <img
          src="/images/d.png"
          alt="DCODE Logo"
          className="h-6 md:h-7 lg:h-8"
        />
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center text-center max-w-xs md:max-w-sm lg:max-w-md flex-grow justify-center">
        {/* Illustration with floating symbols */}
        <motion.div
          className="relative inline-block mb-6 md:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            src="/images/Illustration.png"
            alt="Developer Illustration"
            className="rounded-lg w-full max-w-[280px] md:max-w-[320px] lg:max-w-full"
            style={{ mixBlendMode: "lighten" }}
            // animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Symbols (relative to the illustration) */}
          <div className="absolute inset-0 pointer-events-none select-none">
            {/* Top-left {} */}
            <motion.div
              className="absolute top-1 md:top-2 left-1 md:left-2 text-gray-500 text-lg md:text-xl lg:text-2xl"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.8 },
                scale: { duration: 0.6, delay: 0.8 },
                rotate: { duration: 0.8, delay: 0.8 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {`{}`}
            </motion.div>

            {/* Top-right ; */}
            <motion.div
              className="absolute top-1 md:top-2 right-1 md:right-2 text-gray-500 text-lg md:text-xl lg:text-2xl"
              initial={{ opacity: 0, scale: 0, x: 50 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, -6, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 1.0 },
                scale: { duration: 0.6, delay: 1.0 },
                x: { duration: 0.8, delay: 1.0 },
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              ;
            </motion.div>

            {/* Bottom-left <> */}
            <motion.div
              className="absolute bottom-1 md:bottom-2 left-1 md:left-2 text-gray-500 text-lg md:text-xl lg:text-2xl"
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 1.2 },
                scale: { duration: 0.6, delay: 1.2 },
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {`<>`}
            </motion.div>

            {/* Bottom-center 0x3234 */}
            <motion.div
              className="absolute bottom-6 md:bottom-8 lg:bottom-10 left-1/3 -translate-x-1/2 text-gray-500 text-sm md:text-base lg:text-xl"
              initial={{ opacity: 0, scale: 0, rotate: 45 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: [0, -12, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 1.4 },
                scale: { duration: 0.6, delay: 1.4 },
                rotate: { duration: 0.8, delay: 1.4 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              0x3234
            </motion.div>

            {/* Bottom-right $ */}
            <motion.div
              className="absolute bottom-1 md:bottom-2 right-1 md:right-2 text-gray-500 text-lg md:text-xl lg:text-2xl"
              initial={{ opacity: 0, scale: 0, x: -50, rotate: 90 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                rotate: 0,
                y: [0, -7, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 1.6 },
                scale: { duration: 0.6, delay: 1.6 },
                x: { duration: 0.8, delay: 1.6 },
                rotate: { duration: 0.8, delay: 1.6 },
                y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              $
            </motion.div>
          </div>
        </motion.div>

        {/* Heading + text */}
        <motion.h2
          className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-3 md:mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Online Community For <br />
          <span className="text-[#BCDD19]">OPEN SOURCE</span> Developers
        </motion.h2>
        <motion.p
          className="text-xs md:text-sm text-[#F5F5F5]/50 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          They raise motivational levels, thereby efficiently fighting
          procrastination and laziness.
        </motion.p>
      </div>
    </div>
  );
};
