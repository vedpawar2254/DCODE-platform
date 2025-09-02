import React from "react";

const ProfileCard = ({ user }) => (
  <div className="bg-transparent rounded-md p-6 flex flex-col items-center shadow border border-[#23252B] w-full max-w-md backdrop-blur-md">
    <div className="relative mb-4">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-28 h-28 rounded-full object-cover border-2 border-[#23252B]"
      />
      <div className="absolute top-2 right-2 bg-[#23252B] text-[#C6FF3D] rounded px-2 py-0.5 text-xs font-semibold border border-[#23252B]">
        85%
      </div>
    </div>
    <h2 className="text-lg font-semibold text-white text-center mb-1">
      {user.name}
    </h2>
    <div className="text-[#C6FF3D] text-xs mb-2 text-center">
      @{user.username}
    </div>
    <p className="text-[#A1A1AA] text-center text-xs mb-4">{user.bio}</p>
    <div className="flex items-center justify-center gap-2 mb-2">
      <span className="flex items-center gap-1 text-[#C6FF3D] text-xs">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#C6FF3D" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="#C6FF3D" />
        </svg>
        {user.location}
      </span>
    </div>
    <div className="flex items-center gap-2 text-[#A1A1AA] text-xs mb-4">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
        <rect
          x="4"
          y="8"
          width="16"
          height="12"
          rx="2"
          stroke="#C6FF3D"
          strokeWidth="2"
        />
        <path d="M8 12h8" stroke="#C6FF3D" strokeWidth="2" />
      </svg>
      Joined {user.joined}
    </div>
    <div className="flex gap-3 mb-6">
      {user.socials.map((icon, i) => (
        <a
          key={i}
          href={icon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#A1A1AA] hover:text-[#C6FF3D]"
        >
          {icon.svg}
        </a>
      ))}
    </div>
    <div className="flex justify-between w-full mt-4">
      <div className="text-center">
        <div className="text-[#C6FF3D] text-xl font-bold">
          {user.contributions}
        </div>
        <div className="text-[#A1A1AA] text-xs">Contributions</div>
      </div>
      <div className="text-center">
        <div className="text-[#C6FF3D] text-xl font-bold">
          {user.linesOfCode}
        </div>
        <div className="text-[#A1A1AA] text-xs">Lines of code</div>
      </div>
    </div>

    <div className="w-full border-t border-[#23252B] my-6"></div>

    {/* Education Section */}
    <div className="w-full mb-6">
      <div className="flex items-center mb-4">
        <span className="bg-[#23252B] p-2 rounded-lg mr-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2H6C4.89543 2 4 2.89543 4 4V22L12 18L20 22V4C20 2.89543 19.1046 2 18 2Z"
              stroke="#818CF8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="text-white font-semibold text-lg">Education</h3>
      </div>
      <div>
        <p className="text-white font-medium text-lg">
          {user.education.college}
        </p>
        <p className="text-[#A1A1AA] text-sm mt-1">{user.education.degree}</p>
        <div className="mt-3 inline-flex items-center bg-[#1C2A1E] text-[#7CFF79] text-xs font-medium px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 mr-1.5 bg-[#7CFF79] rounded-full"></span>
          {user.education.year}
        </div>
      </div>
    </div>

    {/* Contact Section */}
    <div className="w-full">
      <div className="flex items-center mb-4">
        <span className="bg-[#23252B] p-2 rounded-lg mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
              stroke="#C6FF3D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="#C6FF3D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <h3 className="text-white font-semibold text-lg">Contact</h3>
      </div>
      <div className="bg-[#23252B] p-3 rounded-lg flex items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
            stroke="#A1A1AA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="#A1A1AA"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <a
          href={`mailto:${user.contact.email}`}
          className="text-[#A1A1AA] text-sm"
        >
          {user.contact.email}
        </a>
      </div>
    </div>
  </div>
);

const ContributionHighlights = ({ highlights }) => (
  <div className="bg-transparent rounded-lg p-6 shadow-lg border border-[#23252B] w-full backdrop-blur-md">
    <div className="flex justify-between items-center mb-2">
      <div>
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M4 12l6 6L20 6" stroke="#C6FF3D" strokeWidth="2" />
          </svg>
          Contribution Highlights
        </h3>
        <p className="text-[#A1A1AA] text-xs">Your impact across DCODE</p>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-[#C6FF3D] text-xl font-bold">
          {highlights.total}
        </div>
        <div className="text-[#A1A1AA] text-xs">Total Contributions</div>
      </div>
    </div>
    {/* Main content cards */}
    <div className="flex flex-row gap-6 mt-6">
      {/* Pull Requests */}
      <div className="border border-[#23252B] rounded-lg p-6 min-w-[220px] flex-1">
        <div className="text-white font-semibold mb-2 flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4V4z" stroke="#C6FF3D" strokeWidth="2" />
          </svg>
          Pull Requests
          <a href="#" className="ml-auto text-[#C6FF3D] text-xs underline">
            View
          </a>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#23FF7A] inline-block" />
              Merged
            </span>
            <span className="font-bold text-[#23FF7A]">23</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] inline-block" />
              Open
            </span>
            <span className="font-bold text-[#3B82F6]">5</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A1A1AA] inline-block" />
              Closed
            </span>
            <span className="font-bold text-[#A1A1AA]">2</span>
          </div>
        </div>
        <div className="mt-4 text-xs">Success Rate</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#23FF7A] font-bold">92%</span>
          <div className="flex-1 h-2 bg-[#23252B] rounded-full overflow-hidden">
            <div
              className="h-2 bg-[#23FF7A] rounded-full"
              style={{ width: "92%" }}
            ></div>
          </div>
        </div>
      </div>
      {/* Contribution Types */}
      <div className="border border-[#23252B] rounded-lg p-6 min-w-[220px] flex-1">
        <div className="text-white font-semibold mb-2 flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#C6FF3D" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="#C6FF3D" />
          </svg>
          Contribution Types
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#23C6FF] inline-block" />
              Code
            </span>
            <span className="font-bold text-[#23C6FF]">34 (40%)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#23FF7A] inline-block" />
              Documentation
            </span>
            <span className="font-bold text-[#23FF7A]">26 (30%)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2323] inline-block" />
              Bug Fixes
            </span>
            <span className="font-bold text-[#FF2323]">17 (20%)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD923] inline-block" />
              Reviews
            </span>
            <span className="font-bold text-[#FFD923]">9 (10%)</span>
          </div>
        </div>
      </div>
      {/* Activity Metrics */}
      <div className="border border-[#23252B] rounded-lg p-6 min-w-[220px] flex-1">
        <div className="text-white font-semibold mb-2 flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <rect
              x="4"
              y="8"
              width="16"
              height="12"
              rx="2"
              stroke="#C6FF3D"
              strokeWidth="2"
            />
            <path d="M8 12h8" stroke="#C6FF3D" strokeWidth="2" />
          </svg>
          Activity Metrics
        </div>
        <div className="mt-4 mb-2">
          <div className="bg-[#23252B] rounded-lg p-4 text-center">
            <div className="text-[#23FF7A] text-2xl font-bold">2,847</div>
            <div className="text-[#A1A1AA] text-xs">Lines of Code</div>
          </div>
        </div>
        <div className="flex gap-4 mb-2">
          <div className="bg-[#23252B] rounded-lg p-2 flex-1 text-center">
            <div className="text-[#7A6FF4] text-lg font-bold">15</div>
            <div className="text-[#A1A1AA] text-xs">Reviews</div>
          </div>
          <div className="bg-[#23252B] rounded-lg p-2 flex-1 text-center">
            <div className="text-[#FF7A6F] text-lg font-bold">8</div>
            <div className="text-[#A1A1AA] text-xs">Issues</div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs">
          <span>This Month</span>
          <span className="text-[#23FF7A] font-bold">+12%</span>
        </div>
      </div>
    </div>
    {/* Top Contributing Repositories */}
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-white font-semibold">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L17.18 22 12 18.56 6.82 22 8 14.14l-5-4.87 6.91-1.01L12 2z"
              stroke="#FFD923"
              strokeWidth="2"
            />
          </svg>
          Top Contributing Repositories
        </div>
        <a href="#" className="text-[#C6FF3D] text-xs underline">
          View All
        </a>
      </div>
      <div className="flex flex-row gap-6">
        {/* Repo 1 */}
        <div className="border border-[#23252B] rounded-lg p-4 flex-1 min-w-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white font-semibold">dcode-core</span>
            <span className="text-[#FFD923] text-xs">JavaScript</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#C6FF3D] font-bold text-lg">34</span>
            <span className="text-[#A1A1AA] text-xs">commits</span>
          </div>
          <div className="w-full h-2 bg-[#23252B] rounded-full overflow-hidden mb-2">
            <div
              className="h-2 bg-[#23C6FF] rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
          <div className="text-[#A1A1AA] text-xs">Last commit: 2 days ago</div>
          <div className="text-[#C6FF3D] text-xs">#1</div>
        </div>
        {/* Repo 2 */}
        <div className="border border-[#23252B] rounded-lg p-4 flex-1 min-w-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white font-semibold">dcode-ui</span>
            <span className="text-[#23C6FF] text-xs">TypeScript</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#C6FF3D] font-bold text-lg">18</span>
            <span className="text-[#A1A1AA] text-xs">commits</span>
          </div>
          <div className="w-full h-2 bg-[#23252B] rounded-full overflow-hidden mb-2">
            <div
              className="h-2 bg-[#23C6FF] rounded-full"
              style={{ width: "50%" }}
            ></div>
          </div>
          <div className="text-[#A1A1AA] text-xs">Last commit: 2 days ago</div>
          <div className="text-[#C6FF3D] text-xs">#2</div>
        </div>
        {/* Repo 3 */}
        <div className="border border-[#23252B] rounded-lg p-4 flex-1 min-w-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white font-semibold">dcode-docs</span>
            <span className="text-[#FFD923] text-xs">Markdown</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#C6FF3D] font-bold text-lg">15</span>
            <span className="text-[#A1A1AA] text-xs">commits</span>
          </div>
          <div className="w-full h-2 bg-[#23252B] rounded-full overflow-hidden mb-2">
            <div
              className="h-2 bg-[#FFD923] rounded-full"
              style={{ width: "40%" }}
            ></div>
          </div>
          <div className="text-[#A1A1AA] text-xs">Last commit: 2 days ago</div>
          <div className="text-[#C6FF3D] text-xs">#3</div>
        </div>
      </div>
    </div>
  </div>
);

function SkillsOverview() {
  const languages = [
    { name: "JavaScript", color: "#FFD923", percent: 28 },
    { name: "Rust", color: "#FF6F61", percent: 22 },
    { name: "TypeScript", color: "#3B82F6", percent: 20 },
    { name: "Python", color: "#60A5FA", percent: 18 },
    { name: "Other", color: "#A78BFA", percent: 12 },
  ];
  const techStack = [
    "React",
    "Node.js",
    "Rust",
    "PostgreSQL",
    "Docker",
    "AWS",
    "GraphQL",
    "MongoDB",
  ];
  // Donut chart SVG
  const donutData = [28, 22, 20, 18, 12];
  const donutColors = ["#FFD923", "#FF6F61", "#3B82F6", "#60A5FA", "#A78BFA"];
  const total = donutData.reduce((a, b) => a + b, 0);
  let acc = 0;
  const arcs = donutData.map((val, i) => {
    const start = (acc / total) * 2 * Math.PI;
    acc += val;
    const end = (acc / total) * 2 * Math.PI;
    const largeArc = end - start > Math.PI ? 1 : 0;
    const x1 = 40 + 32 * Math.cos(start - Math.PI / 2);
    const y1 = 40 + 32 * Math.sin(start - Math.PI / 2);
    const x2 = 40 + 32 * Math.cos(end - Math.PI / 2);
    const y2 = 40 + 32 * Math.sin(end - Math.PI / 2);
    return `<path d="M${x1},${y1} A32,32 0 ${largeArc} 1 ${x2},${y2}" stroke="${donutColors[i]}" stroke-width="8" fill="none" />`;
  });
  return (
    <div className="bg-transparent rounded-md p-6 shadow border border-[#23252B] w-full max-w-md backdrop-blur-md flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M4 4h16v16H4V4z" stroke="#C6FF3D" strokeWidth="2" />
        </svg>
        <span className="text-white font-semibold text-lg">
          Skills Overview
        </span>
      </div>
      <div className="flex flex-col items-center mb-4">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <g dangerouslySetInnerHTML={{ __html: arcs.join("") }} />
          <circle cx="40" cy="40" r="24" fill="#181A20" />
          <text
            x="40"
            y="40"
            textAnchor="middle"
            dy=".3em"
            fontSize="1.5em"
            fill="#fff"
          >
            5
          </text>
          <text
            x="40"
            y="54"
            textAnchor="middle"
            fontSize="0.9em"
            fill="#A1A1AA"
          >
            Languages
          </text>
        </svg>
      </div>
      <div className="mb-4">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="flex items-center justify-between text-sm mb-1"
          >
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: lang.color }}
              />
              {lang.name}
            </span>
            <span className="text-[#A1A1AA]">{lang.percent}%</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="text-white font-semibold mb-2">Tech Stack</div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="bg-[#23252B] text-[#A1A1AA] px-3 py-1 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const user = {
    avatar: "/images/profile.png",
    name: "Aditya Kumar",
    username: "adityainnovates",
    bio: "Passionate coder learning Rust and JavaScript. Building the future one commit at a time.",
    location: "Delhi, India",
    joined: "January 2024",
    socials: [
      {
        link: "#",
        svg: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" stroke="#A1A1AA" strokeWidth="2" />
          </svg>
        ),
      },
      {
        link: "#",
        svg: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="8"
              stroke="#A1A1AA"
              strokeWidth="2"
            />
          </svg>
        ),
      },
      {
        link: "#",
        svg: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <rect
              x="2"
              y="6"
              width="20"
              height="12"
              rx="6"
              stroke="#A1A1AA"
              strokeWidth="2"
            />
          </svg>
        ),
      },
      {
        link: "#",
        svg: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#A1A1AA" strokeWidth="2" />
          </svg>
        ),
      },
    ],
    contributions: 86,
    linesOfCode: 2847,
    education: {
      college: "Jorhat Engineering College",
      degree: "B.Tech Computer Science Engineering",
      year: "3rd Year",
    },
    contact: {
      email: "aditya@example.com",
    },
  };
  const highlights = {
    total: 86,
  };
  return (
    <div className="min-h-screen bg-[#121212] p-4">
      <div className="">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            My Profile
          </h1>
          <p className="text-[#A1A1AA] text-sm md:text-base mt-2">
            Welcome back,{" "}
            <span className="text-[#C6FF3D] font-semibold">Aditya!</span>{" "}
            <span className="text-[#C6FF3D] font-semibold">Profile</span>{" "}
            overview.
          </p>
        </div>
        <div className="flex flex-row gap-6 items-stretch">
          <div className="flex flex-col gap-6 w-full max-w-md">
            <ProfileCard user={user} />
            <SkillsOverview />
          </div>
          <div className="flex flex-col gap-8 w-full">
            <ContributionHighlights highlights={highlights} />
            <AchievementsRecognition />
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementsRecognition() {
  const achievements = [
    {
      icon: "🏆",
      title: "First PR Merged",
      desc: "Successfully merged your first pull request",
      date: "2024-01-15",
      rarity: "COMMON",
      rarityColor: "bg-[#23252B] text-[#A1A1AA]",
    },
    {
      icon: "🐛",
      title: "Bug Slayer",
      desc: "Fixed 10+ critical bugs across repositories",
      date: "2024-02-20",
      rarity: "RARE",
      rarityColor: "bg-[#23252B] text-[#3B82F6]",
    },
    {
      icon: "📚",
      title: "Documentation Master",
      desc: "Contributed extensively to project documentation",
      date: "2024-03-10",
      rarity: "EPIC",
      rarityColor: "bg-[#23252B] text-[#FF7A6F]",
    },
  ];
  const quests = [
    {
      title: "Resolve 5 Issues",
      percent: 100,
      color: "#23FF7A",
      reward: "Bug Hunter Badge",
      done: true,
    },
    {
      title: "Review 10 PRs",
      percent: 80,
      color: "#FFD923",
      reward: "Code Reviewer Badge",
      done: false,
    },
    {
      title: "Contribute to 3 Repos",
      percent: 100,
      color: "#23FF7A",
      reward: "Multi-Repo Contributor",
      done: true,
    },
    {
      title: "Maintain 30-day streak",
      percent: 60,
      color: "#FFD923",
      reward: "Consistency Master",
      done: false,
    },
  ];
  return (
    <div className="bg-transparent rounded-md p-6 shadow border border-[#23252B] w-full backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#FFD923" strokeWidth="2" />
            <path d="M12 7v5l3 3" stroke="#FFD923" strokeWidth="2" />
          </svg>
          <span className="text-white font-semibold text-lg">
            Achievements & Recognition
          </span>
        </div>
        <a href="#" className="text-[#23FF7A] text-xs font-semibold">
          View All
        </a>
      </div>
      <div className="flex flex-row gap-6 mb-8">
        {achievements.map((a, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-[#23252B]/40 rounded-lg p-6 flex-1 min-w-[180px]"
          >
            <span role="img" aria-label={a.title} className="text-3xl">
              {a.icon}
            </span>
            <div className="text-white font-semibold text-base mt-2 mb-1 text-center">
              {a.title}
            </div>
            <div className="text-[#A1A1AA] text-xs mb-2 text-center">
              {a.desc}
            </div>
            <div className="text-[#A1A1AA] text-xs mb-2">{a.date}</div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${a.rarityColor}`}
            >
              {a.rarity}
            </span>
          </div>
        ))}
      </div>
      <div className="text-[#A1A1AA] font-semibold text-xs mb-4">
        ACTIVE QUESTS
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quests.map((q, i) => (
          <div
            key={i}
            className="bg-[#23252B]/40 rounded-lg p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${q.done ? "bg-[#23FF7A]" : "bg-[#FFD923]"}`}
                ></span>
                <span className="text-white font-medium text-sm">
                  {q.title}
                </span>
              </div>
              <span className="text-[#23FF7A] font-bold text-xs">
                {q.done ? "✓" : `${q.percent}%`}
              </span>
            </div>
            <div className="w-full h-2 bg-[#23252B] rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full"
                style={{ width: `${q.percent}%`, background: q.color }}
              ></div>
            </div>
            <div className="text-[#A1A1AA] text-xs mt-1">
              Reward:{" "}
              <span className="underline text-[#23FF7A]">{q.reward}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
