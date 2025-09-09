import { motion } from "framer-motion";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  var navigate = useNavigate();
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    (async () => {
      window.addEventListener("DOMContentLoaded", async () => {
        var check = await checkAuth();
        if (check.status) {
          if (check?.is_signedup) {
            navigate("/onboarding");
          } else {
            navigate("/dashboard");
          }
        }
      });
    })();
  }, []);
  return (
    <div className="relative flex flex-row h-screen w-screen overflow-hidden">
      {/* Background Gradient Circles */}
      <img
        src="/images/Group97.png"
        alt="DCODE BG"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      />

      {/* Content on top of background */}
      <div className="relative z-10 flex flex-row w-full h-full bg-[#121212]">
        <motion.div
          initial={{ opacity: 0.1, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex justify-between items-center"
          style={{ mixBlendMode: "lighten" }}
        >
          <LeftSide />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1"
        >
          <RightSide />
        </motion.div>
      </div>
    </div>
  );
};
