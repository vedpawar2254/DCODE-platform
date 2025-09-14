import { motion } from "framer-motion";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  var navigate = useNavigate();
  const { checkAuth, isLoggedIn } = useAuthStore();
  useEffect(() => {
    (async () => {
      window.addEventListener("DOMContentLoaded", async () => {
        var check = await checkAuth();
        if (check) {
          console.log("hiii from authlayout");
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
          console.log("hiii from authlayoutrfewd");
        }
      });
    })();
  }, []);
  return (
    <div className="relative flex flex-col lg:flex-row h-screen w-screen overflow-hidden">
      {/* Background Gradient Circles */}
      <img
        src="/images/Group97.png"
        alt="DCODE BG"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      />

      {/* Content on top of background */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full h-full bg-[#121212]">
        {/* Left Side - Hidden on mobile, shown on desktop */}
        <motion.div
          initial={{ opacity: 0.1, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex lg:flex-1 justify-between items-center"
          style={{ mixBlendMode: "lighten" }}
        >
          <LeftSide />
        </motion.div>

        {/* Mobile Logo - Only shown on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:hidden flex justify-center pt-8 pb-4"
        >
          <img src="/images/d.png" alt="DCODE Logo" className="h-8" />
        </motion.div>

        {/* Right Side - Full width on mobile, half width on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 lg:flex-1"
        >
          <RightSide />
        </motion.div>
      </div>
    </div>
  );
};
