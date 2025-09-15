import React, { useState, useCallback, useEffect } from "react";
import { Pencil, X, Github, Twitter, Linkedin, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContributionHighlights from "../../components/Profile/ContributionHighlights";
import ProfileCard from "../../components/Profile/ProfileCard";
import AchievementsRecognition from "../../components/Profile/AchievementsRecognition";
import { useAuthStore } from "../../store/useAuthStore";
import SkillsSummaryCard from "../../components/Profile/SkillSummaryCard";
import { dashboardService } from "../../services/dashboardService";
import { profileService } from "../../services/profileService";
import { axiosInstance } from "../../utils/axios";
import { toast } from "sonner";
import {
  AnimatedDiv,
  AnimatedContainer,
  AnimatedText,
  AnimatedBackdrop,
  AnimatedModal,
  AnimatedSpinner,
  PageTransition,
} from "../../components/ui/AnimatedComponents";
import {
  fadeLeftVariants,
  fadeRightVariants,
  containerVariants,
  modalVariants,
} from "../../lib/animations";
import {
  useModalAnimation,
  useLoadingAnimation,
} from "../../hooks/useAnimations";
import {
  FloatingScrollToTop,
} from "../../components/ui/FloatingElements";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editFormData, setEditFormData] = useState({
    github_username: "",
    bio: "",
    location: "",
    collegeInfo: {
      name: "",
      currentYear: null,
      degree: "",
    },
    socialLinks: {
      x: "",
      linkedin: "",
      github: "",
      upwork: "",
      fiverr: "",
      portfolio: "",
    },
  });
  const [user, setUser] = useState(null);
  const [ProfileStats, setProfileStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [badgesLoading, setBadgesLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { authUser, isLoggedIn } = useAuthStore();

  // Animation state management
  const { shouldRender: shouldRenderModal, isOpen: isModalOpen } =
    useModalAnimation(isEditingProfile);
  const { showLoading, showContent } = useLoadingAnimation(!user, 200);
  useEffect(() => {
    setUser(authUser?.data);
    if (authUser?.data) {
      // Set a small delay to ensure animations are visible
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 100);
    }
  }, [authUser, isLoggedIn]);

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
    if (lang == "HTML") {
      return "HTML5";
    }
    return lang;
  };
  useEffect(() => {
    (async () => {
      if (authUser?.data) {
        setBadgesLoading(true);
        try {
          const [statsResponse, prsResponse, topProjects, badgesResponse] =
            await Promise.all([
              dashboardService.getUserStats(authUser.data.id),
              dashboardService.getLatestPRs(8),
              profileService.getTopProjects(),
              axiosInstance.get("/badges/my"),
            ]);

          const transformedLanguages =
            statsResponse.message?.languagesWithPercentage?.length > 0
              ? statsResponse.message.languagesWithPercentage
                  .map((lang) => ({
                    name: sanitizeLangName(lang.language),
                    percentage: lang.percentage,
                    color: getLanguageColor(lang.language),
                  }))
                  .sort((a, b) => b.percentage - a.percentage)
              : [
                  {
                    name: "N/A",
                    percentage: 100,
                    color: "#6B7280",
                  },
                ];
          statsResponse.message.languagesWithPercentage = transformedLanguages;
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
          }

          // Set data loaded to trigger animations
          setIsDataLoaded(true);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setBadges([]);
          // Still set data loaded even if there's an error
          setIsDataLoaded(true);
        } finally {
          setBadgesLoading(false);
        }
      }
    })();
  }, [isLoggedIn]);

  const handleEditProfile = useCallback(() => {
    // Initialize edit form with current user data from authUser
    const userData = authUser?.data || {};

    setEditFormData({
      github_username: userData.github_username || "",
      bio: userData.bio || "",
      location: userData?.location || "",
      collegeInfo: {
        name: userData.collegeInfo?.name || userData.college_info?.name || "",
        currentYear:
          userData.collegeInfo?.currentYear ||
          userData.college_info?.currentYear ||
          "",
        degree:
          userData.collegeInfo?.degree || userData.college_info?.degree || "",
      },
      socialLinks: {
        x: userData.socialLinks?.x || userData.social_links?.x || "",
        linkedin:
          userData.socialLinks?.linkedin ||
          userData.social_links?.linkedin ||
          "",
        github:
          userData.socialLinks?.github || userData.social_links?.github || "",
        upwork:
          userData.socialLinks?.upwork || userData.social_links?.upwork || "",
        fiverr:
          userData.socialLinks?.fiverr || userData.social_links?.fiverr || "",
        portfolio:
          userData.socialLinks?.portfolio ||
          userData.social_links?.portfolio ||
          "",
      },
    });
    setIsEditingProfile(true);
  }, [authUser]);

  const handleCloseModal = useCallback(() => {
    setIsEditingProfile(false);
    setIsSaving(false);
  }, []);

  const handleSaveProfile = useCallback(async () => {
    setIsSaving(true);
    try {
      // Helper function to check if a value is valid (not null, undefined, or empty string)
      const isValidValue = (value) => {
        return value !== null && value !== undefined && value !== "";
      };

      // Helper function to check if an object has any valid values
      const hasValidValues = (obj) => {
        return Object.values(obj).some((value) => isValidValue(value));
      };

      // Build update data object with only valid values
      const updateData = {};

      // Add github_username if valid
      if (isValidValue(editFormData.github_username)) {
        updateData.github_username = editFormData.github_username;
      }

      // Add bio if valid
      if (isValidValue(editFormData.bio)) {
        updateData.bio = editFormData.bio;
      }

      // Build college_info object with only valid fields
      const collegeInfo = {};
      if (isValidValue(editFormData.collegeInfo.name)) {
        collegeInfo.name = editFormData.collegeInfo.name;
      }
      if (isValidValue(editFormData.location)) {
        updateData.location = editFormData.location;
      }
      if (isValidValue(editFormData.collegeInfo.currentYear)) {
        collegeInfo.currentYear = parseInt(
          editFormData.collegeInfo.currentYear
        );
      }
      if (isValidValue(editFormData.collegeInfo.degree)) {
        collegeInfo.degree = editFormData.collegeInfo.degree;
      }

      // Add collegeInfo only if it has valid values
      if (hasValidValues(collegeInfo)) {
        updateData.collegeInfo = collegeInfo;
      }

      // Build socialLinks object with only valid fields
      const socialLinks = {};
      if (isValidValue(editFormData.socialLinks.x)) {
        socialLinks.x = editFormData.socialLinks.x;
      }
      if (isValidValue(editFormData.socialLinks.linkedin)) {
        socialLinks.linkedin = editFormData.socialLinks.linkedin;
      }
      if (isValidValue(editFormData.socialLinks.github)) {
        socialLinks.github = editFormData.socialLinks.github;
      }
      if (isValidValue(editFormData.socialLinks.upwork)) {
        socialLinks.upwork = editFormData.socialLinks.upwork;
      }
      if (isValidValue(editFormData.socialLinks.fiverr)) {
        socialLinks.fiverr = editFormData.socialLinks.fiverr;
      }
      if (isValidValue(editFormData.socialLinks.portfolio)) {
        socialLinks.portfolio = editFormData.socialLinks.portfolio;
      }

      // Add socialLinks only if it has valid values
      if (hasValidValues(socialLinks)) {
        updateData.socialLinks = socialLinks;
      }

      // Check if there's anything to update
      if (Object.keys(updateData).length === 0) {
        console.log("No valid changes to save");
        setIsEditingProfile(false);
        return;
      }

      // Make PATCH request to auth/update-profile
      console.log("update data", updateData);
      const response = await axiosInstance.patch(
        "/auth/update-profile",
        updateData
      );

      if (response.data) {
        // Update local user state with the new data
        setUser((prev) => ({
          ...prev,
          ...updateData,
          ...(updateData.college_info && {
            college_info: { ...prev.college_info, ...updateData.college_info },
          }),
          ...(updateData.social_links && {
            social_links: { ...prev.social_links, ...updateData.social_links },
          }),
        }));

        console.log("Profile updated successfully:", response.data);
        setIsEditingProfile(false);

        // Show success toast notification
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);

      // Handle different error scenarios
      if (error.response?.status === 401) {
        console.error("Unauthorized: Please log in again");
        toast.error("Please log in again to continue");
      } else if (error.response?.status === 400) {
        console.error("Bad request: Invalid data provided");
        toast.error("Invalid data provided. Please check your input.");
      } else {
        console.error("Network error or server issue");
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  }, [editFormData, authUser]);

  const handleInputChange = useCallback(
    (field) => (e) => {
      const value = e.target.value;
      if (field.includes(".")) {
        const fieldParts = field.split(".");
        if (fieldParts.length === 2) {
          const [parent, child] = fieldParts;
          setEditFormData((prev) => ({
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: value,
            },
          }));
        }
      } else {
        setEditFormData((prev) => ({ ...prev, [field]: value }));
      }
    },
    []
  );

  // Debug logging - remove in production
  // console.log("Profile render - isDataLoaded:", isDataLoaded, "user:", !!user);

  if (!user) {
    return (
      <PageTransition className="min-h-screen bg-[#121212] flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedSpinner
            size={12}
            className="border-[#C6FF3D] mx-auto mb-4"
          />
          <motion.p
            className="text-[#A1A1AA] text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Loading profile...
          </motion.p>
        </motion.div>
      </PageTransition>
    );
  }

  return (
    <motion.div
      className="min-h-screen max-w-7xl mx-auto bg-[#121212] p-4 sm:p-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Floating scroll to top button */}
      <FloatingScrollToTop />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.6,
          ease: [0.6, -0.05, 0.01, 0.99], // Custom spring easing
        }}
      >
        {/* Header Section */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          <motion.div
            className="flex items-center justify-between"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
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
                My Profile
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

            <div className="flex items-center gap-3">
              <motion.button
              onClick={() => navigate('/settings')}
                className="flex items-center gap-2 bg-neutral-700 text-white p-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium"
                initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Settings size={16} />
              </motion.button>

            <motion.button
              onClick={handleEditProfile}
              className="flex items-center gap-2 bg-[#C6FF3D] text-black px-4 py-2 rounded-lg hover:bg-[#B8E835] transition-colors font-medium"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Pencil size={16} />
              Edit Profile
            </motion.button>
            </div>

          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full border-t border-[#23252B] my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        {/* Main Content Grid */}
        <motion.div
          className="grid md:grid-cols-3 grid-cols-1 gap-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {/* Left Column */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <ProfileCard
                contributions={ProfileStats?.stats?.totalCommits}
                linesOfCode={ProfileStats?.stats?.totalLOC}
                user={user}
              />
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="flex flex-col gap-5 w-full col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {/* {console.log("ProfileStats", ProfileStats)} */}

            <AnimatePresence mode="wait">
              {ProfileStats?.stats && (
                <motion.div
                  key="contribution-highlights"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <ContributionHighlights
                    highlights={ProfileStats.stats}
                    topProjects={ProfileStats.topProjects}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <AchievementsRecognition badges={badges} />
            </motion.div>

            <AnimatePresence mode="wait">
              {ProfileStats?.stats?.languagesWithPercentage && (
                <motion.div
                  key="skills-summary"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                >
                  <SkillsSummaryCard
                    skills={ProfileStats?.stats?.languagesWithPercentage}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {shouldRenderModal && (
          <AnimatedBackdrop onClick={handleCloseModal}>
            <AnimatedModal
              className="bg-[#1A1A1A] border border-[#23252B] rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              variant={modalVariants}
            >
              {/* Modal Header */}
              <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <AnimatedText
                  as="h3"
                  className="text-white font-semibold text-xl"
                >
                  Edit Profile
                </AnimatedText>
                <motion.button
                  onClick={handleCloseModal}
                  className="text-[#A1A1AA] hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.button>
              </motion.div>

              <AnimatedContainer
                className="space-y-6"
                variant={containerVariants}
              >
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={containerVariants}
                >
                  {/* Basic Information */}
                  <AnimatedDiv className="space-y-4" variant={fadeLeftVariants}>
                    <motion.h4
                      className="text-white font-medium text-lg border-b border-[#23252B] pb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Basic Information
                    </motion.h4>

                    {/* Read-only Name Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-[#A1A1AA] text-sm mb-2">
                        Full Name <span className="text-xs">(Read-only)</span>
                      </label>
                      <input
                        type="text"
                        value={user.name || ""}
                        disabled
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-[#666] text-sm cursor-not-allowed"
                        placeholder="Enter your full name"
                      />
                    </motion.div>

                    {/* Read-only Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <label className="block text-[#A1A1AA] text-sm mb-2">
                        Email <span className="text-xs">(Read-only)</span>
                      </label>
                      <input
                        type="email"
                        value={user.email || ""}
                        disabled
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-[#666] text-sm cursor-not-allowed"
                        placeholder="Enter your email address"
                      />
                    </motion.div>

                    {/* Editable GitHub Username */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-[#A1A1AA] text-sm mb-2">
                        GitHub Username
                      </label>
                      <motion.input
                        type="text"
                        value={editFormData.github_username}
                        onChange={handleInputChange("github_username")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        placeholder="Enter your GitHub username"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    {/* College Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <label className="block text-[#A1A1AA] text-sm mb-2">
                        College/University Name
                      </label>
                      <motion.input
                        type="text"
                        value={editFormData.collegeInfo.name}
                        onChange={handleInputChange("collegeInfo.name")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        placeholder="Enter your college or university name"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-[#A1A1AA] text-sm mb-2">
                        Your Location
                      </label>
                      <motion.input
                        type="text"
                        value={editFormData.location}
                        onChange={handleInputChange("location")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        placeholder="Enter Your location (City/State/Country)"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <label className="block text-[#A1A1AA] text-sm mb-2">
                        Current Year
                      </label>
                      <motion.select
                        value={editFormData.collegeInfo.currentYear || ""}
                        onChange={handleInputChange("collegeInfo.currentYear")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="">Select your current year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </motion.select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-[#A1A1AA] text-sm mb-2">
                        Degree
                      </label>
                      <motion.input
                        type="text"
                        value={editFormData.collegeInfo.degree}
                        onChange={handleInputChange("collegeInfo.degree")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        placeholder="e.g., B.Tech Computer Science Engineering"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>
                  </AnimatedDiv>

                  {/* Social Links */}
                  <AnimatedDiv
                    className="space-y-4"
                    variant={fadeRightVariants}
                  >
                    <motion.h4
                      className="text-white font-medium text-lg border-b border-[#23252B] pb-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Social Links
                    </motion.h4>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-2">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Twitter size={16} />
                        </motion.div>
                        X (Twitter)
                      </label>
                      <motion.input
                        type="url"
                        value={editFormData.socialLinks.x}
                        onChange={handleInputChange("socialLinks.x")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        placeholder="https://x.com/username"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <label className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-2">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Linkedin size={16} />
                        </motion.div>
                        LinkedIn
                      </label>
                      <motion.input
                        type="url"
                        value={editFormData.socialLinks.linkedin}
                        onChange={handleInputChange("socialLinks.linkedin")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        placeholder="https://linkedin.com/in/username"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-2">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Github size={16} />
                        </motion.div>
                        GitHub
                      </label>
                      <motion.input
                        type="url"
                        value={editFormData.socialLinks.github}
                        onChange={handleInputChange("socialLinks.github")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        placeholder="https://github.com/username"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <label className="block text-[#A1A1AA] text-sm mb-2">
                        Upwork
                      </label>
                      <motion.input
                        type="url"
                        value={editFormData.socialLinks.upwork}
                        onChange={handleInputChange("socialLinks.upwork")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        placeholder="https://upwork.com/freelancers/username"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-[#A1A1AA] text-sm mb-2">
                        Fiverr
                      </label>
                      <motion.input
                        type="url"
                        value={editFormData.socialLinks.fiverr}
                        onChange={handleInputChange("socialLinks.fiverr")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        placeholder="https://fiverr.com/username"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <label className="block text-[#A1A1AA] text-sm mb-2">
                        Portfolio Website
                      </label>
                      <motion.input
                        type="url"
                        value={editFormData.socialLinks.portfolio}
                        onChange={handleInputChange("socialLinks.portfolio")}
                        className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        placeholder="https://yourportfolio.com"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>
                  </AnimatedDiv>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-[#A1A1AA] text-sm mb-2">
                    Bio
                  </label>
                  <motion.textarea
                    value={editFormData.bio}
                    onChange={handleInputChange("bio")}
                    rows="4"
                    className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors resize-none"
                    placeholder="Write a short bio about yourself..."
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    onClick={handleCloseModal}
                    disabled={isSaving}
                    className="flex-1 bg-[#23252B] text-white py-3 px-4 rounded-lg hover:bg-[#2A2A2A] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="flex-1 bg-[#C6FF3D] text-black py-3 px-4 rounded-lg hover:bg-[#B8E835] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {isSaving ? (
                        <motion.div
                          key="saving"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <AnimatedSpinner size={4} className="border-black" />
                          Saving...
                        </motion.div>
                      ) : (
                        <motion.span
                          key="save"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Save Changes
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </AnimatedContainer>
            </AnimatedModal>
          </AnimatedBackdrop>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
