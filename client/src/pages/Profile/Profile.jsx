import React, { useState, useCallback, useEffect } from "react";
import {
  Pencil,
  X,
  Upload,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import SkillsOverview from "../../components/Profile/SkillsOverview";
import ContributionHighlights from "../../components/Profile/ContributionHighlights";
import ProfileCard from "../../components/Profile/ProfileCard";
import AchievementsRecognition from "../../components/Profile/AchievementsRecognition";
import { useAuthStore } from "../../store/useAuthStore";
import SkillsSummaryCard from "@/components/Profile/SkillSummaryCard";

export default function Profile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Aditya Kumar",
    email: "aditya@example.com",
    github_username: "adityainnovates",
    college: {
      name: "Jorhat Engineering College",
      location: "Jorhat, Assam, India",
      currentYear: "3rd Year",
      degree: "B.Tech Computer Science Engineering",
    },
    bio: "Passionate coder learning Rust and JavaScript. Building the future one commit at a time.",
    avatar: "https://avatar.iran.liara.run/public",
    links: {
      twitter: "https://twitter.com/adityainnovates",
      linkedin: "https://linkedin.com/in/adityainnovates",
      github: "https://github.com/adityainnovates",
    },
  });
  const [user, setuser] = useState(null);
  const { authUser, isLoggedIn } = useAuthStore();
  useEffect(() => {
    setuser(authUser?.data);
  }, [isLoggedIn]);

  // const user = {
  //   avatar: profileData.avatar,
  //   name: profileData.name,
  //   username: profileData.github_username,
  //   bio: profileData.bio,
  //   location: "Delhi, India",
  //   joined: "January 2024",
  //   contributions: 86,
  //   linesOfCode: 2847,
  //   education: {
  //     college: profileData.college.name,
  //     degree: profileData.college.degree,
  //     year: profileData.college.currentYear,
  //   },
  //   contact: {
  //     email: profileData.email,
  //   },
  //   socials: {
  //     twitter: profileData.links.twitter,
  //     linkedin: profileData.links.linkedin,
  //     github: profileData.links.github,
  //   },
  // };

  const handleEditProfile = useCallback(() => {
    setIsEditingProfile(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsEditingProfile(false);
  }, []);

  const handleSaveProfile = useCallback(() => {
    // Here you would typically save to your backend/state management
    setIsEditingProfile(false);
    // You can add an API call here to save the profileData
  }, [profileData]);

  const handleInputChange = useCallback(
    (field) => (e) => {
      if (field.includes(".")) {
        const fieldParts = field.split(".");
        if (fieldParts.length === 2) {
          const [parent, child] = fieldParts;
          setProfileData((prev) => ({
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: e.target.value,
            },
          }));
        }
      } else {
        setProfileData((prev) => ({ ...prev, [field]: e.target.value }));
      }
    },
    []
  );

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const highlights = {
    total: 86,
  };
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
            <ProfileCard user={user} />
            {/* <SkillsOverview /> */}
          </div>
          <div className="flex flex-col gap-5 w-full col-span-2">
            <ContributionHighlights highlights={highlights} />
            <AchievementsRecognition />
            <SkillsSummaryCard />
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
              {/* Profile Image Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#C6FF3D]"
                  />
                  <label className="absolute bottom-0 right-0 bg-[#C6FF3D] text-black p-2 rounded-full cursor-pointer hover:bg-[#B8E835] transition-colors">
                    <Upload size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-[#A1A1AA] text-sm">
                  Click the upload icon to change your profile picture
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium text-lg border-b border-[#23252B] pb-2">
                    Basic Information
                  </h4>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={handleInputChange("name")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={handleInputChange("email")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      GitHub Username
                    </label>
                    <input
                      type="text"
                      value={user.github_username}
                      onChange={handleInputChange("github_username")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="Enter your GitHub username"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      College/University Name
                    </label>
                    <input
                      type="text"
                      value={profileData.college.name}
                      onChange={handleInputChange("college.name")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="Enter your college or university name"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      College Location
                    </label>
                    <input
                      type="text"
                      value={profileData.college.location}
                      onChange={handleInputChange("college.location")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="Enter college location (City, State, Country)"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      Current Year
                    </label>
                    <select
                      value={profileData.college.currentYear}
                      onChange={handleInputChange("college.currentYear")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                    >
                      <option value="">Select your current year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Post Graduate">Post Graduate</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={profileData.college.degree}
                      onChange={handleInputChange("college.degree")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="e.g., B.Tech Computer Science Engineering"
                    />
                  </div>
                </div>

                {/* Social Links */}
                {/* Social Links */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium text-lg border-b border-[#23252B] pb-2">
                    Social Links
                  </h4>

                  <div>
                    <label className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-2">
                      <Twitter size={16} />
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={profileData.links.twitter}
                      onChange={handleInputChange("links.twitter")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="https://twitter.com/username"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-2">
                      <Linkedin size={16} />
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={profileData.links.linkedin}
                      onChange={handleInputChange("links.linkedin")}
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
                      value={profileData.links.github}
                      onChange={handleInputChange("links.github")}
                      className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div>
                <label className="block text-[#A1A1AA] text-sm mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
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
                  className="flex-1 bg-[#23252B] text-white py-3 px-4 rounded-lg hover:bg-[#2A2A2A] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-[#C6FF3D] text-black py-3 px-4 rounded-lg hover:bg-[#B8E835] transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// function AchievementsRecognition() {
//   const achievements = [
//     {
//       icon: "🏆",
//       title: "First PR Merged",
//       desc: "Successfully merged your first pull request",
//       date: "2024-01-15",
//       rarity: "COMMON",
//       rarityColor: "bg-[#23252B] text-[#A1A1AA]",
//     },
//     {
//       icon: "🐛",
//       title: "Bug Slayer",
//       desc: "Fixed 10+ critical bugs across repositories",
//       date: "2024-02-20",
//       rarity: "RARE",
//       rarityColor: "bg-[#23252B] text-[#3B82F6]",
//     },
//     {
//       icon: "📚",
//       title: "Documentation Master",
//       desc: "Contributed extensively to project documentation",
//       date: "2024-03-10",
//       rarity: "EPIC",
//       rarityColor: "bg-[#23252B] text-[#FF7A6F]",
//     },
//   ];
//   const quests = [
//     {
//       title: "Resolve 5 Issues",
//       percent: 100,
//       color: "#23FF7A",
//       reward: "Bug Hunter Badge",
//       done: true,
//     },
//     {
//       title: "Review 10 PRs",
//       percent: 80,
//       color: "#FFD923",
//       reward: "Code Reviewer Badge",
//       done: false,
//     },
//     {
//       title: "Contribute to 3 Repos",
//       percent: 100,
//       color: "#23FF7A",
//       reward: "Multi-Repo Contributor",
//       done: true,
//     },
//     {
//       title: "Maintain 30-day streak",
//       percent: 60,
//       color: "#FFD923",
//       reward: "Consistency Master",
//       done: false,
//     },
//   ];
//   return (
//     <div className="bg-transparent rounded-md p-6 shadow border border-[#23252B] w-full backdrop-blur-md">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-2">
//           <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
//             <circle cx="12" cy="12" r="10" stroke="#FFD923" strokeWidth="2" />
//             <path d="M12 7v5l3 3" stroke="#FFD923" strokeWidth="2" />
//           </svg>
//           <span className="text-white font-semibold text-lg">
//             Achievements & Recognition
//           </span>
//         </div>
//         <a href="#" className="text-[#23FF7A] text-xs font-semibold">
//           View All
//         </a>
//       </div>
//       <div className="flex flex-row gap-6 mb-8">
//         {achievements.map((a, i) => (
//           <div
//             key={i}
//             className="flex flex-col items-center justify-center bg-[#23252B]/40 rounded-lg p-6 flex-1 min-w-[180px]"
//           >
//             <span role="img" aria-label={a.title} className="text-3xl">
//               {a.icon}
//             </span>
//             <div className="text-white font-semibold text-base mt-2 mb-1 text-center">
//               {a.title}
//             </div>
//             <div className="text-[#A1A1AA] text-xs mb-2 text-center">
//               {a.desc}
//             </div>
//             <div className="text-[#A1A1AA] text-xs mb-2">{a.date}</div>
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-semibold ${a.rarityColor}`}
//             >
//               {a.rarity}
//             </span>
//           </div>
//         ))}
//       </div>
//       <div className="text-[#A1A1AA] font-semibold text-xs mb-4">
//         ACTIVE QUESTS
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {quests.map((q, i) => (
//           <div
//             key={i}
//             className="bg-[#23252B]/40 rounded-lg p-4 flex flex-col gap-2"
//           >
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center gap-2">
//                 <span
//                   className={`w-2 h-2 rounded-full ${q.done ? "bg-[#23FF7A]" : "bg-[#FFD923]"}`}
//                 ></span>
//                 <span className="text-white font-medium text-sm">
//                   {q.title}
//                 </span>
//               </div>
//               <span className="text-[#23FF7A] font-bold text-xs">
//                 {q.done ? "✓" : `${q.percent}%`}
//               </span>
//             </div>
//             <div className="w-full h-2 bg-[#23252B] rounded-full overflow-hidden">
//               <div
//                 className="h-2 rounded-full"
//                 style={{ width: `${q.percent}%`, background: q.color }}
//               ></div>
//             </div>
//             <div className="text-[#A1A1AA] text-xs mt-1">
//               Reward:{" "}
//               <span className="underline text-[#23FF7A]">{q.reward}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
