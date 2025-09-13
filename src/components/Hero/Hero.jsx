import Button from "../ui/Button/Button";
import { motion } from "framer-motion";

const Hero = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      },
    },
  };

  const highlightVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative flex flex-col justify-between h-screen px-6 py-10 overflow-hidden bg-[#121212] select-none md:px-14">
      {/* Top Heading Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full mb-6"
      >
        <motion.h1
          variants={fadeInUpVariants}
          className="max-w-[70rem] text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "poppins" }}
        >
          The{" "}
          <motion.span
            variants={highlightVariants}
            className="text-[#BCDD19] inline-block"
          >
            Open Source
          </motion.span>{" "}
          Platform Where
          <br />
          {`Builders Shape `}
          <motion.span
            variants={highlightVariants}
            className="text-[#BCDD19] inline-block"
          >
            {` Tomorrow's `}
          </motion.span>
          {` World`}
        </motion.h1>

        <motion.p
          variants={fadeInUpVariants}
          className="max-w-2xl mt-3 text-base text-gray-300 sm:text-md"
        >
          Work on <span className="text-[#BCDD19]">large projects</span>, ship
          code that matters, and{" "}
          <span className="text-[#BCDD19]">
            build a public track record of your skills.
          </span>{" "}
          DCODE is where you start small, level up fast, and make <br /> your
          mark in the <span className="text-[#BCDD19]">open source world</span>.
        </motion.p>
      </motion.div>

      {/* Call to Action Section */}
      <div className="z-10 py-6 mt-1 space-y-5 md:py-10 md:mb-[2rem] md:space-y-6 md:w-5/12 animate-fadeInUp">
        <p className="mb-2 text-lg text-white sm:text-md md:text-md">
          From first commit to maintainer.
          <br />
          Learn, build, and inspire.
          <br />
          <span className="text-[#BCDD19] font-semibold">That's DCODE.</span>
        </p>
        <div className="flex flex-col pt-3 space-y-3 sm:pt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button className="w-full sm:w-auto !py-2 !px-4">
            <a href="/dashboard">Get Started</a>
          </Button>
        </div>
      </div>

      {/* Floating Image */}
      <motion.div
        initial={{ filter: "blur(20px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        exit={{ filter: "blur(0px)", opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ mixBlendMode: "lighten" }}
        className="absolute right-0 z-0 bottom-[5.2rem] animate-float hidden sm:block"
      >
        <div className="">
          <img
            src="/images/Hero.png"
            alt="Hero graphic"
            className="w-[600px] sm:w-[800px] md:w-[850px] max-w-none"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
