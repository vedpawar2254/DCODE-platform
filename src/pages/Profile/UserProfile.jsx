import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import ContributionHighlights from "../../components/Profile/ContributionHighlights";
import ProfileCard from "../../components/Profile/ProfileCard";
import AchievementsRecognition from "../../components/Profile/AchievementsRecognition";
import SkillsSummaryCard from "@/components/Profile/SkillSummaryCard";
import { dashboardService } from "../../services/dashboardService";
import { profileService } from "../../services/profileService";
import { axiosInstance } from "../../utils/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

export default function UserProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [user, setUser] = useState(null);
  const [profileStats, setProfileStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLanguageColor = (language) => {
    const colorMap = {
      JavaScript: "#F7DF1E",
      TypeScript: "#3178C6",
      Python: "#3776AB",
      Java: "#ED8B00",
      "C++": "#00599C",
      C: "#A8B9CC",
      "C#": "#239120",
      Go: "#00ADD8",
      Rust: "#CE422B",
      PHP: "#777BB4",
      Ruby: "#CC342D",
      Swift: "#FA7343",
      Kotlin: "#A97BFF",
      Dart: "#0175C2",
      HTML: "#E34F26",
      HTML5: "#E34F26",
      CSS: "#1572B6",
      SQL: "#336791",
      Shell: "#89E051",
      R: "#276DC3",
      MATLAB: "#E16737",
      Scala: "#DC322F",
      Perl: "#39457E",
      Lua: "#2C2D72",
      Haskell: "#5E5086",
      Clojure: "#5881D8",
      Erlang: "#B83998",
      Elixir: "#6E4A7E",
      "F#": "#B845FC",
      OCaml: "#3BE133",
      Vue: "#4FC08D",
      React: "#61DAFB",
      Angular: "#DD0031",
    };
    return colorMap[language] || "#6B7280";
  };

  const sanitizeLangName = (lang) => {
    if (lang === "HTML") {
      return "HTML5";
    }
    return lang;
  };

  // Check if user is viewing their own profile and redirect to /profile
  useEffect(() => {
    if (authUser?.data?.github_username && username) {
      if (authUser.data.github_username === username) {
        navigate("/profile", { replace: true });
      }
    }
  }, [authUser, username, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user details by username
        const userData = await profileService.getUserByUsername(username);

        if (!userData) {
          setError("User not found");
          return;
        }

        setUser(userData);
        // Fetch user stats, projects, and badges
        const [statsResponse, prsResponse, topProjects, badgesResponse] =
          await Promise.all([
            dashboardService.getUserStats(userData._id),
            dashboardService.getLatestPRs(8),
            profileService.getTopProjects(userData._id),
            axiosInstance.get(`/badges/user/${userData._id}`),
          ]);

        const transformedLanguages =
          statsResponse.message?.languagesWithPercentage?.length > 0
            ? statsResponse.message.languagesWithPercentage.map((lang) => ({
                name: sanitizeLangName(lang.language),
                percentage: lang.percentage,
                color: getLanguageColor(lang.language),
              }))
            : [
                {
                  name: "N/A",
                  percentage: 100,
                  color: "#6B7280",
                },
              ];

        if (statsResponse.message) {
          statsResponse.message.languagesWithPercentage = transformedLanguages;
        }

        setProfileStats({
          stats: statsResponse.message,
          recentPRs: prsResponse.message.recentPR,
          topProjects,
          loading: false,
          error: null,
        });

        // Set badges from API response
        if (badgesResponse.data.success) {
          setBadges(badgesResponse.data.message || []);
        } else {
          setBadges([]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setBadges([]); // Reset badges on error
        if (error.response?.status === 404) {
          setError("User not found");
        } else {
          setError("Failed to load user profile");
        }
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6FF3D] mx-auto mb-4"></div>
          <p className="text-[#A1A1AA] text-lg">Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-semibold mb-2">{error}</h2>
          <p className="text-[#A1A1AA] mb-6">
            The user you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-[#C6FF3D] text-black px-6 py-3 rounded-lg hover:bg-[#B8E835] transition-colors font-medium mx-auto"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#A1A1AA] text-lg">No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-[#121212] p-4 sm:p-6">
      <div className="">
        {/* Header with back button */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-[#A1A1AA] hover:text-[#C6FF3D] text-sm transition-colors group"
              >
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span>Go Back</span>
              </button>
              {/* Back Button */}
              {/* <h1 className="text-2xl md:text-3xl text-white font-semibold">
                {user.name}'s <span className="text-[#C6FF3D]">Profile</span>
              </h1> */}
              <div>
              <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.h1
                className="text-xl sm:text-2xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Contributor Profile
              </motion.h1>
              <motion.p
                className="text-gray-400 text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Welcome back,{" "}
                <motion.span
                  className="text-[#C6FF3D]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  {user.name || "User"}!
                </motion.span>{" "}
                Here's your{" "}
                <motion.span
                  className="text-[#C6FF3D]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  Profile
                </motion.span>{" "}
                overview.
              </motion.p>
            </motion.div>
            </div>
            </div>
            {/* Social Links */}

            {/* <div className="flex items-center gap-3">
              {user.social_links?.github && (
                <a
                  href={user.social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#23252B] hover:bg-[#2A2A2A] rounded-lg transition-colors"
                >
                  <Github size={20} className="text-white" />
                </a>
              )}
              {user.social_links?.linkedin && (
                <a
                  href={user.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#23252B] hover:bg-[#2A2A2A] rounded-lg transition-colors"
                >
                  <Linkedin size={20} className="text-white" />
                </a>
              )}
              {user.social_links?.x && (
                <a
                  href={user.social_links.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#23252B] hover:bg-[#2A2A2A] rounded-lg transition-colors"
                >
                  <Twitter size={20} className="text-white" />
                </a>
              )}
            </div> */}
          </div>
        </div>

        <div className="w-full border-t border-[#23252B] my-6"></div>

        {/* Profile Content */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          <div className="flex flex-col gap-5">
            <ProfileCard
              contributions={profileStats?.stats?.totalCommits}
              linesOfCode={profileStats?.stats?.totalLOC}
              user={user}
              isPublicView={true}
            />
          </div>
          <div className="flex flex-col gap-5 w-full col-span-2">
            {profileStats?.stats && (
              <ContributionHighlights
                highlights={profileStats.stats}
                topProjects={profileStats.topProjects}
              />
            )}
            <AchievementsRecognition badges={badges} />
            {profileStats?.stats?.languagesWithPercentage && (
              <SkillsSummaryCard
                skills={profileStats?.stats?.languagesWithPercentage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
