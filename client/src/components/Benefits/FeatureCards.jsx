import { motion } from "framer-motion";

export function FeatureCards({ icon, title, description }) {
  return (
    <motion.div
      className="flex flex-shrink-0 items-start space-x-4 w-[280px] md:w-[320px] mt-26"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-12 flex items-center justify-center rounded-lg overflow-hidden"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
      >
        <img
          src={icon}
          alt={title}
          className="max-w-full max-h-full object-contain"
          loading="lazy"
        />
      </motion.div>
      <div className="text-left">
        <motion.h3
          className="text-white text-base md:text-lg font-semibold"
          whileHover={{
            color: "#37CD5A",
            transition: { duration: 0.2 },
          }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-400 text-sm md:text-base mt-1">{description}</p>
      </div>
    </motion.div>
  );
}
