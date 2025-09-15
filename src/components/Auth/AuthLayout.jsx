import { motion } from "framer-motion";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen w-screen overflow-hidden">
      {/* Background Gradient Circles */}
      <img
        src="/images/Group97.png"
        alt="DCODE BG"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      />

      {/* Content on top of background */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen bg-[#121212]">
        {/* Left Side - Hidden on mobile, shown on tablet and up */}
        <motion.div
          initial={{ opacity: 0.1, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:flex flex-1 justify-between items-center"
          style={{ mixBlendMode: "lighten" }}
        >
          <LeftSide />
        </motion.div>

        {/* Right Side - Full width on mobile, half width on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 w-full lg:w-1/2 min-h-screen lg:min-h-auto"
        >
          <RightSide />
        </motion.div>
      </div>
    </div>
  );
};
