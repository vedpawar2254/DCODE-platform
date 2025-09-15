import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FeatureCards } from "./FeatureCards";
import {
  useScrollAnimation,
  scrollAnimations,
} from "../../hooks/useScrollAnimation";

const Benefits = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  // Scroll animation hooks for different sections
  const [headerRef, headerControls] = useScrollAnimation(0.2);
  const [videoRef2, videoControls] = useScrollAnimation(0.3);
  const [leftCardsRef, leftCardsControls] = useScrollAnimation(0.2);
  const [rightCardsRef, rightCardsControls] = useScrollAnimation(0.2);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isVideoOpen &&
        videoRef.current &&
        !videoRef.current.contains(event.target)
      ) {
        setIsVideoOpen(false);
        setShowVideo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVideoOpen]);

  return (
    <section
      id="About"
      className="relative flex flex-col items-center w-full min-h-screen px-6 pt-24 text-center bg-[#121212] md:px-16"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 z-0 bottom-[0%] left-1/2 -translate-x-1/2 translate-y-[20%] rounded-full"
        style={{
          /* Ellipse 11 */
          background: `radial-gradient(50% 50% at 50% 50%, rgba(1, 255, 128, 0.06) 0%, rgba(1, 153, 77, 0) 100%)`,
          opacity: 0.7,
        }}
      ></div>

      {/* Heading & Intro */}
      <motion.div
        ref={headerRef}
        initial="hidden"
        animate={headerControls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.2,
            },
          },
        }}
        className="max-w-7xl mx-auto"
      >
        <motion.h3
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mb-4 text-sm tracking-widest text-[#37CD5A]"
        >
          WHY DCODE
        </motion.h3>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-4xl font-bold text-white md:text-5xl"
        >
          Build.
          <span className="bg-gradient-to-r from-[#A2C00C] to-[#098E28] bg-clip-text text-transparent">
            {" "}
            Contribute.
          </span>{" "}
          Lead.
        </motion.h2>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mt-6 text-[#D5D5D5] max-w-4xl mx-auto -mb-10"
        >
          Make your first contributions, and ship actual changes. You'll work
          alongside peers, mentors, and maintainers — and if you keep at it, you
          could <strong>become a maintainer yourself</strong>.
        </motion.p>
      </motion.div>

      <div className="relative flex flex-col w-full md:flex-row md:justify-center md:items-center pt-0">
        <AnimatePresence mode="wait">
          {!isVideoOpen && (
            <motion.div
              key="leftCards"
              ref={leftCardsRef}
              initial={{ opacity: 0, x: -80 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  staggerChildren: 0.2,
                },
              }}
              exit={{ opacity: 0, x: -200, transition: { duration: 0.4 } }}
              className="flex flex-col flex-1 items-center md:items-center pr-20"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0.1 },
                }}
              >
                <FeatureCards
                  icon="/images/Group2.svg"
                  title="Boost Resume"
                  description="Create a resume that stands out from the crowd."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0.2 },
                }}
              >
                <FeatureCards
                  icon="/images/Group.svg"
                  title="Grow and Learn"
                  description="Learn tools and workflows used by top open-source teams."
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          ref={videoRef2}
          initial="hidden"
          animate={videoControls}
          variants={scrollAnimations.scaleIn}
          className="hidden md:flex relative flex-shrink-0 mt-24 items-center justify-center"
          style={{ height: "520px" }}
        >
          <motion.div
            ref={videoRef}
            initial={{ width: 680, height: 680, borderRadius: "50%" }}
            animate={
              isVideoOpen
                ? { width: 900, height: 506, borderRadius: "20px" }
                : { width: 340, height: 340, borderRadius: "200px" }
            }
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => {
              if (isVideoOpen) {
                setTimeout(() => setShowVideo(true), 150);
              } else {
                setShowVideo(false);
              }
            }}
            className="absolute flex items-center justify-center"
            style={{
              /* Rectangle 107 */

              background:
                "linear-gradient(134.93deg, rgba(90, 101, 37, 0.6) 14.29%, rgba(51, 61, 0, 0.1) 85.45%)",
              // boxShadow: "6px 12px 12px rgba(0, 0, 0, 0.5)",
              border: "1px solid #000000",
              overflow: "hidden",
            }}
          >
            {!isVideoOpen && (
              <>
                <motion.div
                  className="absolute z-10 rounded-full border-[1px] border-[rgba(55,205,90,0.15)] w-[280px] h-[280px]"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.button
                  onClick={() => setIsVideoOpen(true)}
                  className="z-20 w-[120px] h-[120px] rounded-full flex items-center justify-center hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                  style={{
                    background: "rgba(55, 205, 90, 0.701961)",
                    "box-shadow": "inset 0px 0px 10px 4px rgba(0, 0, 0, 0.25)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  // transition={{
                  //   type: "spring",
                  //   stiffness: 260,
                  //   damping: 20,
                  //   delay: 0.8,
                  // }}
                >
                  <img
                    src="/images/playbutton.svg"
                    alt="play button"
                    className="w-8 h-8"
                  />
                </motion.button>
              </>
            )}

            {showVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full flex items-center justify-center p-2"
                style={{
                  background: "black",
                }}
              >
                <video
                  className="w-[calc(100%-20px)] h-[calc(100%-20px)] object-cover rounded-lg"
                  src="/videos/DCODE_ROHAN_LANDSCAPE.mp4"
                  autoPlay
                  loop
                  playsInline
                  controls={false}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isVideoOpen && (
            <motion.div
              key="rightCards"
              ref={rightCardsRef}
              initial={{ opacity: 0, x: 80 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  staggerChildren: 0.2,
                  delayChildren: 0.1,
                },
              }}
              exit={{ opacity: 0, x: 200, transition: { duration: 0.4 } }}
              className="flex flex-col gap-4 flex-1 items-center md:items-center pl-20"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0.3 },
                }}
              >
                <FeatureCards
                  icon="/images/Group5.svg"
                  title="Stand Apart"
                  description="Your Contributions speaks for you, We make sure of that."
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0.4 },
                }}
              >
                <FeatureCards
                  icon="/images/Group6.svg"
                  title="Collaborate Globally"
                  description="Work with contributors mentors, and orgs from across the globe."
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Benefits;
