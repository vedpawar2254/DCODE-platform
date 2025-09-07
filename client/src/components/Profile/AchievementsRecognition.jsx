
import {
  Calendar,
  CalendarDays,
  Github,
  GitPullRequest,
  GraduationCap,
  Linkedin,
  Locate,
  Mail,
  TrendingUp,
  Twitter,
} from "lucide-react";

export default function AchievementsRecognition() {
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
    <div className="bg-[#FFFFFF05] rounded-md p-6 shadow border border-[#23252B] w-full backdrop-blur-md">
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
        {/* <a href="#" className="text-[#23FF7A] text-xs font-semibold">
          View All
        </a> */}
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
      {/* <div className="text-[#A1A1AA] font-semibold text-xs mb-4">
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
      </div> */}
    </div>
  );
}