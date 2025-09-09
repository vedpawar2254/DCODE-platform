import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button/Button";
import { useAuthStore } from "../../store/useAuthStore";
import { axiosInstance } from "../../utils/axios";

export default function ConnectGithub() {
  const navigate = useNavigate();
  const { authUser, githubAuth } = useAuthStore();

  // Dummy handleGithub function (replace with your actual logic)
  const handleGithub = async () => {
    // Redirect to GitHub OAuth or your auth logic
    await githubAuth();
  };
  const handleLogout = async () => {
    await axiosInstance.post("/auth/logout");
    navigate("/auth");
  };

  return (
    <motion.div
      className="p-8 text-center h-full flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 32, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -32, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        className="mx-auto mb-8 h-20 w-20 rounded-full border-2 border-[#01FF80] flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-[#01FF80]20 to-[#C6FF3D]20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            fill="#23252B"
          />
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            fill="#C6FF3D"
          />
        </svg>
      </motion.div>

      <motion.h2
        className="text-3xl md:text-4xl font-bold text-balance mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Connect Your GitHub Account
      </motion.h2>

      <motion.p
        className="text-[#A1A1AA] text-lg mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        To complete your onboarding and start contributing, please connect your
        GitHub account. This allows us to:
      </motion.p>
      <motion.ul
        className="text-[#A1A1AA] text-base mb-8 list-disc list-inside text-left max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <li>Verify your identity and link your contributions</li>
        <li>Show your GitHub profile and stats on DCODE</li>
        <li>Enable you to fork, clone, and submit pull requests</li>
        <li>Track your open source progress and achievements</li>
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-5"
      >
        <Button
          className="rounded-xl bg-gradient-to-r from-[#C6FF3D] to-[#01FF80] text-black font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
          onClick={handleGithub}
        >
          Connect with GitHub
        </Button>
        <Button
          className="rounded-xl border-none bg-gray-800 hover:bg-gray-700 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </motion.div>
    </motion.div>
  );
}
