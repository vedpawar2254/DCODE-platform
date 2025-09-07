import {
  Calendar,
  CalendarDays,
  Github,
  GitPullRequest,
  GraduationCap,
  Linkedin,
  Locate,
  Mail,
  MapPin,
  TrendingUp,
  Twitter,
} from "lucide-react";

const ProfileCard = ({ user }) => (
  <div className="bg-[#FFFFFF05] rounded-md px-2 flex flex-col items-center shadow border border-[#23252B] w-full backdrop-blur-sm">
    <div className="py-10 px-14 flex flex-col items-center">
      <div className=" absolute right-4 top-4  text-[#C6FF3D] p-2 text-xs font-semibold border-2 border-[#C6FF3D] h-10 w-10 rounded-full flex items-center justify-center">
        <span className="text-white font-extralight">85%</span>
      </div>
      <div className="relative mb-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-28 h-28 rounded-full object-cover border border-[#C6FF3D]"
        />
      </div>
      <h2 className="text-lg font-semibold text-white text-center">
        {user.name}
      </h2>
      <div className="text-[#A1A1AA] text-xs mb-6 text-center">
        @{user.username}
      </div>
      <p className="text-[#A1A1AA] text-center text-xs mb-8 font-light">
        {user.bio}
      </p>
      <div className="flex items-center justify-center gap-1 mb-2 text-xs text-[#FFFFFF]">
        <MapPin color="#BCDD19" />
        {user.location}
      </div>
      <div className="flex items-center gap-2 text-[#FFFFFF] text-xs mb-4">
        <Calendar color="#C6FF3D" className="text-5xl" />
        Joined {user.joined}
      </div>

      {/* Social Icons Section */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <a
          href={`mailto:${user.contact.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#A1A1AA] p-1 bg-[#23252B] hover:border-[#C6FF3D] transition"
        >
          <Mail color="#A1A1AA" size={14} />
        </a>
        <a
          href={user.socials?.twitter || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#A1A1AA] p-1 bg-[#23252B] hover:border-[#C6FF3D] transition"
        >
          <Twitter color="#A1A1AA" size={14} />
        </a>
        <a
          href={user.socials?.linkedin || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#A1A1AA] p-1 bg-[#23252B] hover:border-[#C6FF3D] transition"
        >
          <Linkedin color="#A1A1AA" size={14} />
        </a>
        <a
          href={user.socials?.github || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#A1A1AA] p-1 bg-[#23252B] hover:border-[#C6FF3D] transition"
        >
          <Github color="#A1A1AA" size={14} />
        </a>
      </div>

      <div className="flex justify-between w-full mt-4">
        <div className="text-center">
          <div className="text-[#C6FF3D] text-xl font-semibold">
            {user.contributions}
          </div>
          <div className="text-white text-xs">Contributions</div>
        </div>
        <div className="text-center">
          <div className="text-[#FACC15] text-xl font-semibold">
            {user.linesOfCode}
          </div>
          <div className="text-white text-xs">Lines of code</div>
        </div>
      </div>
    </div>

    {/* Education Section */}
    <div className="w-full mt-2 mb-4 border border-[#23252B] p-6 backdrop-blur-sm rounded-md">
      <div className="flex items-center mb-2 gap-2">
        <GraduationCap color="#C6FF3D" />
        <h3 className="text-white font-semibold text-lg">Education</h3>
      </div>
      <div>
        <p className="text-white text-lg">{user.education.college}</p>
        <p className="text-[#A1A1AA] text-sm mt-1">{user.education.degree}</p>
        <div className="mt-3 inline-flex items-center bg-[#1C2A1E] text-[#7CFF79] text-xs px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 mr-1.5 bg-[#7CFF79] rounded-full"></span>
          {user.education.year}
        </div>
      </div>
    </div>
    {/* Contact Section */}
      <div className="bg-[#23252B] w-full p-3 rounded-lg flex items-center gap-2 mb-4">
        <Mail color="#A1A1AA" height="16" width="16" />
        <a
          href={`mailto:${user.contact.email}`}
          className="text-[#A1A1AA] text-sm"
        >
          {user.contact.email}
        </a>
      </div>
  </div>
);

export default ProfileCard;
