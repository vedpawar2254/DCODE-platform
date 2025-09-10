import {
  Calendar,
  CalendarDays,
  Github,
  GitPullRequest,
  GraduationCap,
  Linkedin,
  Locate,
  Mail,
  Star,
  TrendingUp,
  Twitter,
} from "lucide-react";

const ContributionHighlights = ({ highlights, topProjects }) => (
  <div className="bg-[#FFFFFF05] rounded-lg p-6 shadow-lg border border-[#23252B] w-full backdrop-blur-md">
    <div className="flex justify-between items-center mb-2">
      <div className="flex gap-2 items-center">
        <TrendingUp color="#C6FF3D" />
        <div>
          <h3 className="text-white text-lg flex items-center gap-2">
            Contribution Highlights
          </h3>
          <p className="text-[#A1A1AA] text-xs">Your impact across DCODE</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-[#C6FF3D] text-xl font-semibold">
          {highlights.totalCommits || 0}
        </div>
        <div className="text-[#A1A1AA] text-xs">Total Contributions</div>
      </div>
    </div>
    {/* Main content cards */}
    <div className="flex flex-row gap-6 mt-6">
      {/* Pull Requests */}
      <div className="border border-[#23252B] rounded-lg p-6 min-w-[220px] flex-1 flex flex-col bg-[#FFFFFF05] hover:bg-[#FFFFFF08] transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg /bg-[#01FF80]/10 /border border-[#01FF80]/20">
              <GitPullRequest color="#01FF80" size={18} />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                Pull Requests
              </h4>
              <p className="text-[#A1A1AA] text-xs mt-0.5">
                Contribution activity
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-2 flex-1">
          {/* Merged PRs */}
          <div className="bg-[#23FF7A]/5 border border-[#23FF7A]/20 rounded-lg px-4 py-2 hover:bg-[#23FF7A]/10 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#23FF7A] shadow-lg shadow-[#23FF7A]/30"></div>
                <span className="text-white text-sm font-medium">Merged</span>
              </div>
              <div className="text-right">
                <div className="text-[#23FF7A] font-bold text-lg">
                  {highlights?.totalMergedPRs || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Open PRs */}
          <div className="bg-[#3B82F6]/5 border border-[#3B82F6]/20 rounded-lg px-4 py-2 hover:bg-[#3B82F6]/10 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6] shadow-lg shadow-[#3B82F6]/30"></div>
                <span className="text-white text-sm font-medium">Open</span>
              </div>
              <div className="text-right">
                <div className="text-[#3B82F6] font-bold text-lg">
                  {highlights?.totalOpenPRs || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Closed PRs */}
          <div className="bg-[#A1A1AA]/5 border border-[#A1A1AA]/20 rounded-lg px-4 py-2 hover:bg-[#A1A1AA]/10 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#A1A1AA] shadow-lg shadow-[#A1A1AA]/30"></div>
                <span className="text-white text-sm font-medium">Closed</span>
              </div>
              <div className="text-right">
                <div className="text-[#A1A1AA] font-bold text-lg">
                  {highlights?.totalClosedPRs || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Rate Indicator */}
        <div className="mt-6 pt-4 border-t border-[#23252B]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A1A1AA]">Merge Rate</span>
            <span className="text-[#23FF7A] font-semibold">
              {highlights?.totalMergedPRs &&
              highlights?.totalMergedPRs +
                highlights?.totalClosedPRs +
                highlights?.totalOpenPRs >
                0
                ? Math.round(
                    (highlights.totalMergedPRs /
                      (highlights.totalMergedPRs +
                        highlights.totalClosedPRs +
                        highlights.totalOpenPRs)) *
                      100
                  )
                : 0}
              %
            </span>
          </div>
          <div className="mt-2 h-1.5 bg-[#23252B] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#23FF7A] to-[#01FF80] rounded-full transition-all duration-500"
              style={{
                width: `${
                  highlights?.totalMergedPRs &&
                  highlights?.totalMergedPRs +
                    highlights?.totalClosedPRs +
                    highlights?.totalOpenPRs >
                    0
                    ? (highlights.totalMergedPRs /
                        (highlights.totalMergedPRs +
                          highlights.totalClosedPRs +
                          highlights.totalOpenPRs)) *
                      100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* Activity Metrics  */}
      <div className="border border-[#23252B] rounded-lg p-6 min-w-[220px] flex-1 flex flex-col justify-between bg-[#FFFFFF05] hover:bg-[#FFFFFF08] transition-all duration-300">
        <div className="text-white mb-2 flex items-center gap-2">
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
        <div>
          <div className="mt-4 mb-2">
            <div className="bg-[#23252B] rounded-lg p-5 text-center">
              <div className="text-[#23FF7A] text-2xl font-bold">
                {(highlights.totalLOC || 0).toLocaleString()}
              </div>
              <div className="text-[#A1A1AA] text-xs">Lines of Code</div>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="bg-[#23252B] rounded-lg p-3 flex-1 text-center">
              <div className="text-[#7A6FF4] text-lg font-bold">
                {highlights.projectCount || 0}
              </div>
              <div className="text-[#A1A1AA] text-xs">Projects</div>
            </div>
            <div className="bg-[#23252B] rounded-lg p-3 flex-1 text-center">
              <div className="text-[#FF7A6F] text-lg font-bold">
                {highlights.avgReposContributed || 0}
              </div>
              <div className="text-[#A1A1AA] text-xs">Avg Contributions</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-white font-light">
          <span>PR's Last 7 days</span>
          <span className="text-[#23FF7A] font-bold">
            {highlights.prActivityLast7Days.reduce(
              (pre, cur) => cur.prs + pre,
              0
            )}
          </span>
        </div>
      </div>
    </div>
    {/* Top Contributing Repositories */}
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Star color="#C6FF3D" size={20} />
          Top Contributing Repositories
        </div>
        {/* <a href="#" className="text-[#C6FF3D] text-xs underline">
          View All
        </a> */}
      </div>
      <div className="flex flex-row gap-6">
        {/* Repo 1 */}
        {topProjects.map((el, idx) => {
          return (
            <div className="border border-[#23252B] rounded-lg p-4 flex-1 min-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white font-semibold line-clamp-1">
                  {el.repositoryName}
                </span>
                {/* <span className="text-[#FFD923] text-xs">JavaScript</span> */}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#C6FF3D] font-bold text-lg">
                  {el.statistics.totalCommits}
                </span>
                <span className="text-[#A1A1AA] text-xs">commits</span>
              </div>
              <div className="w-full h-2 bg-[#23252B] rounded-full overflow-hidden mb-2">
                <div
                  className="h-2 bg-[#23C6FF] rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="text-[#A1A1AA] text-xs">
                Merged PR's: {el.statistics.mergedPRs}
              </div>
              <div className="text-[#C6FF3D] text-xs">#{idx + 1}</div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default ContributionHighlights;
