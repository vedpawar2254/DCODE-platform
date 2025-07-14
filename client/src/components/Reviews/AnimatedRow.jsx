import { motion } from 'framer-motion';

export default function Marquee({ children }) {
  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex w-max gap-8" 
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          ease: 'linear',
          duration: 30,
          repeat: Infinity
        }}
      >
        <div className="flex gap-8">
          {children.map((c, i) => (
            <div key={i} className="flex-shrink-0">{c}</div>
          ))}
        </div>
        <div className="flex gap-8">
          {children.map((c, i) => (
            <div key={i + '-dup'} className="flex-shrink-0">{c}</div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
