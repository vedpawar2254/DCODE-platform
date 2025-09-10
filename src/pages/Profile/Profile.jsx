import React, { useState, useCallback, useEffect } from "react";
import { Pencil, X, Upload, Github, Twitter, Linkedin } from "lucide-react";
import ContributionHighlights from "../../components/Profile/ContributionHighlights";
import ProfileCard from "../../components/Profile/ProfileCard";
import AchievementsRecognition from "../../components/Profile/AchievementsRecognition";
import { useAuthStore } from "../../store/useAuthStore";
import SkillsSummaryCard from "@/components/Profile/SkillSummaryCard";
import { dashboardService } from "../../services/dashboardService";
import { profileService } from "../../services/profileService";
import { axiosInstance } from "../../utils/axios";

export default function Profile() {
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
    },
  });
  const [user, setUser] = useState(null);
  const [ProfileStats, setProfileStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [badgesLoading, setBadgesLoading] = useState(false);
  const { authUser, isLoggedIn } = useAuthStore();
  useEffect(() => {
    setUser(authUser?.data);
  }, [isLoggedIn]);

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
              ? statsResponse.message.languagesWithPercentage.map((lang) => ({
                  name: sanitizeLangName(lang.language),
                  percentage: lang.percentage,
                  color: getLanguageColor(lang.language),
                }))
              : [
                  {
                    name: "No data available",
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
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setBadges([]);
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

        // Optional: Show success toast/notification
        // toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);

      // Handle different error scenarios
      if (error.response?.status === 401) {
        console.error("Unauthorized: Please log in again");
        // Optional: Redirect to login or refresh token
      } else if (error.response?.status === 400) {
        console.error("Bad request: Invalid data provided");
      } else {
        console.error("Network error or server issue");
      }

      // Optional: Show error toast/notification
      // toast.error("Failed to update profile. Please try again.");
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

  if (!user) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6FF3D] mx-auto mb-4"></div>
          <p className="text-[#A1A1AA] text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-[#121212] p-4">
      <div className="">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl text-white font-semibold">
                My Profile
              </h1>
              <p className="text-[#D5D5D5] text-sm md:text-base mt-2">
                Welcome back,{" "}
                <span className="text-[#C6FF3D] ">{user.name || "User"}!</span>{" "}
                Here's your <span className="text-[#C6FF3D] ">Profile</span>{" "}
                overview.
              </p>
            </div>
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 bg-[#C6FF3D] text-black px-4 py-2 rounded-lg hover:bg-[#B8E835] transition-colors font-medium"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          </div>
        </div>
        <div className="w-full border-t border-[#23252B] my-6"></div>
        <div className="grid md:grid-cols-3 grid-cols-1 /gap-[2] /flex /flex-row gap-5 /items-stretch">
          <div className="flex flex-col gap-5 /w-full /max-w-100">
            <ProfileCard
              contributions={ProfileStats?.stats?.totalCommits}
              linesOfCode={ProfileStats?.stats?.totalLOC}
              user={user}
            />
            {/* <SkillsOverview /> */}
          </div>
          <div className="flex flex-col gap-5 w-full col-span-2">
            {ProfileStats?.stats && (
              <ContributionHighlights
                highlights={ProfileStats.stats}
                topProjects={ProfileStats.topProjects}
              />
            )}
            <AchievementsRecognition badges={badges} />
            {ProfileStats?.stats?.languagesWithPercentage && (
              <SkillsSummaryCard
                skills={ProfileStats?.stats?.languagesWithPercentage}
              />
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#23252B] rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-xl">Edit Profile</h3>
              <button
                onClick={handleCloseModal}
                className="text-[#A1A1AA] hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium text-lg border-b border-[#23252B] pb-2">
                    Basic Information
                  </h4>

                  {/* Read-only Name Field */}
                  <div>
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
                  </div>

                  {/* Read-only Email Field */}
                  <div>
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
                  </div>

                  {/* Editable GitHub Username */}
                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      GitHub Username
                    </label>
                    <input
                      type="text"
                      value={editFormData.github_username}
                      onChange={handleInputChange("github_username")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="Enter your GitHub username"
                    />
                  </div>

                  {/* College Information */}
                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      College/University Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.collegeInfo.name}
                      onChange={handleInputChange("collegeInfo.name")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="Enter your college or university name"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      Your Location
                    </label>
                    <input
                      type="text"
                      value={editFormData.location}
                      onChange={handleInputChange("location")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="Enter Your location (City/State/Country)"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      Current Year
                    </label>
                    <select
                      value={editFormData.collegeInfo.currentYear || ""}
                      onChange={handleInputChange("collegeInfo.currentYear")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                    >
                      <option value="">Select your current year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={editFormData.collegeInfo.degree}
                      onChange={handleInputChange("collegeInfo.degree")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="e.g., B.Tech Computer Science Engineering"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium text-lg border-b border-[#23252B] pb-2">
                    Social Links
                  </h4>

                  <div>
                    <label className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-2">
                      <Twitter size={16} />X (Twitter)
                    </label>
                    <input
                      type="url"
                      value={editFormData.socialLinks.x}
                      onChange={handleInputChange("socialLinks.x")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="https://x.com/username"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-2">
                      <Linkedin size={16} />
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={editFormData.socialLinks.linkedin}
                      onChange={handleInputChange("socialLinks.linkedin")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-2">
                      <Github size={16} />
                      GitHub
                    </label>
                    <input
                      type="url"
                      value={editFormData.socialLinks.github}
                      onChange={handleInputChange("socialLinks.github")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      Upwork
                    </label>
                    <input
                      type="url"
                      value={editFormData.socialLinks.upwork}
                      onChange={handleInputChange("socialLinks.upwork")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="https://upwork.com/freelancers/username"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      Fiverr
                    </label>
                    <input
                      type="url"
                      value={editFormData.socialLinks.fiverr}
                      onChange={handleInputChange("socialLinks.fiverr")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="https://fiverr.com/username"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div>
                <label className="block text-[#A1A1AA] text-sm mb-2">Bio</label>
                <textarea
                  value={editFormData.bio}
                  onChange={handleInputChange("bio")}
                  rows="4"
                  className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors resize-none"
                  placeholder="Write a short bio about yourself..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleCloseModal}
                  disabled={isSaving}
                  className="flex-1 bg-[#23252B] text-white py-3 px-4 rounded-lg hover:bg-[#2A2A2A] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex-1 bg-[#C6FF3D] text-black py-3 px-4 rounded-lg hover:bg-[#B8E835] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
