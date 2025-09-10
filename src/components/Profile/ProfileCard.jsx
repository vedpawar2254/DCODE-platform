import {
  BriefcaseBusiness,
  Calendar,
  Github,
  GitPullRequest,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";

const ProfileCard = ({ user, linesOfCode, contributions, isPublicView = false }) => {
  // console.log(contributions);
  const completionPercentage = user?.profileCompleteness || 69; // Default to 69% if not provided

  return (
    <>
      <div className="bg-[#FFFFFF05] rounded-md px-2 flex flex-col items-center shadow border border-[#23252B] w-full backdrop-blur-sm">
        <div className="py-10 px-14 flex flex-col items-center w-full">
          {/* Only show completion percentage on own profile, not on public view */}
          {!isPublicView && (
            <div className="absolute right-4 top-4 w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-0" viewBox="0 0 36 36">
                <path
                  className="text-[#23252B]"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#C6FF3D]"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${completionPercentage}, 100`}
                  strokeLinecap="round"
                  d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-white font-medium text-xs">
                {completionPercentage}%
              </span>
            </div>
          )}
          <div className="relative mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 rounded-full object-cover border-2 border-[#C6FF3D]"
            />
          </div>
          <h2 className="text-lg font-semibold text-white text-center">
            {user.name}
          </h2>
          {user.github_username && (
            <div className="text-[#A1A1AA] text-xs mb-6 text-center">
              @{user.github_username}
            </div>
          )}
          {user.bio && (
            <p className="text-[#A1A1AA] text-center text-xs mb-8 font-light">
              {user.bio}
            </p>
          )}
          {user.location && (
            <div className="flex items-center justify-center gap-1 mb-2 text-xs text-[#A1A1AA]">
              <MapPin color="#A1A1AA" className="w-4 h-4" />
              {user.location}
            </div>
          )}
          <div className="flex items-center gap-2 text-[#A1A1AA] text-xs mb-4">
            <Calendar color="#A1A1AA" className="w-4 h-4" />
            Joined{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </div>

          {/* Social Icons Section */}
          <div className="flex items-center justify-center gap-2 mt-3 mb-6">
            {[
              {
                icon: Globe,
                link: user.socialLinks?.portfolio || null,
              },
              {
                icon: Twitter,
                link: user.socialLinks?.x || null,
              },
              {
                icon: Linkedin,
                link: user.socialLinks?.linkedin || null,
              },
              {
                icon: Github,
                link: user.socialLinks?.github || null,
              },
              {
                icon: BriefcaseBusiness,
                link: user.socialLinks?.upwork || null,
              },
              {
                icon: BriefcaseBusiness,
                link: user.socialLinks?.fiverr || null,
              },
            ].map(
              ({ icon: Icon, link }, index) =>
                link && (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 /border group border-[#A1A1AA] bg-[#23252B] transition"
                  >
                    <Icon
                      size={16}
                      className="text-[#A1A1AA] group-hover:text-[#C6FF3D] transition-all duration-300"
                    />
                  </a>
                )
            )}
          </div>

          <div className="flex justify-between w-full mt-4">
            <div className="text-center">
              <div className="text-[#C6FF3D] text-xl font-semibold">
                {contributions || 0}
              </div>
              <div className="text-white text-xs">Contributions</div>
            </div>
            <div className="text-center">
              <div className="text-[#FACC15] text-xl font-semibold">
                {(linesOfCode && linesOfCode.toLocaleString()) || 0}
              </div>
              <div className="text-white text-xs">Lines of code</div>
            </div>
          </div>
        </div>
      </div>
      {(user.collegeInfo?.name ||
        user.collegeInfo?.degree ||
        user.collegeInfo?.currentYear ||
        user.college_info?.name ||
        user.college_info?.degree ||
        user.college_info?.current_year) && (
        <div className="w-full /mt-2 bg-[#FFFFFF05] border border-[#23252B] p-6 backdrop-blur-sm rounded-md">
          <div className="flex items-center mb-2 gap-2 justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap color="#C6FF3D" />
              <h3 className="text-white font-semibold text-lg">Education</h3>
            </div>
            {(user.collegeInfo?.currentYear ||
              user.college_info?.current_year) && (
              <div className="inline-flex items-center bg-[#1C2A1E] text-[#7CFF79] text-xs px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 mr-1.5 bg-[#7CFF79] rounded-full"></span>
                {(() => {
                  const year =
                    user.collegeInfo?.currentYear ||
                    user.college_info?.current_year;
                  const yearNum = parseInt(year);
                  let suffix = "";

                  if (yearNum === 1) suffix = "st";
                  else if (yearNum === 2) suffix = "nd";
                  else if (yearNum === 3) suffix = "rd";
                  else if (yearNum === 4) suffix = "th";

                  return `${year}${suffix} Year`;
                })()}
              </div>
            )}
          </div>
          <div>
            {(user.collegeInfo?.name || user.college_info?.name) && (
              <p className="text-white text-lg">
                {user.collegeInfo?.name || user.college_info?.name}
              </p>
            )}
            {(user.collegeInfo?.degree || user.college_info?.degree) && (
              <p className="text-[#A1A1AA] text-sm mt-1">
                {user.collegeInfo?.degree || user.college_info?.degree}
              </p>
            )}
          </div>
        </div>
      )}
      {user.email && (
        <div className="w-full /mt-2 bg-[#FFFFFF05] border border-[#23252B] p-6 backdrop-blur-sm rounded-md">
          <div className="flex items-center mb-2 gap-2">
            <Mail color="#C6FF3D" className="w-6 h-6" />
            <h3 className="text-white font-semibold text-lg">Email</h3>
          </div>
          <div>
            <div className="flex gap-2 items-center mt-[1rem] bg-white/3 rounded-lg border-white/10 border  p-4">
              <Mail color="#99a1af" className="w-4 h-4" />
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
