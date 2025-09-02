import React from "react";
import { cn } from "../../utils/cn";

const RecentPRsCard = ({ recentPRs, className }) => {
  // Default data if recentPRs is not provided
  const defaultPRs = [
    {
      name: "Fixed the navbar uyhcy7fh7cyfhvc8uehucidmoklcxmscuhrefb hbu",
      date: "3 July, 2025",
      merged: false,
    },
    {
      name: "Backend initial",
      date: "9 July, 2025",
      merged: true,
    },
    {
      name: "Responsive",
      date: "12 July, 2025",
      merged: false,
    },
    {
      name: "Chatting Func",
      date: "14 July, 2025",
      merged: false,
    },
    {
      name: "DB Connection",
      date: "7 July, 2025",
      merged: true,
    },
    {
      name: "Landing page",
      date: "11 July, 2025",
      merged: false,
    },
    {
      name: "Frontend bugs",
      date: "13 July, 2025",
      merged: true,
    },
    {
      name: "AI integrations",
      date: "5 July, 2025",
      merged: false,
    },
  ];

  const prsData = recentPRs || defaultPRs;

  const getStatusColor = (status) => {
    switch (status) {
      case "merged":
        return "bg-green-500";
      case "closed":
        return "bg-red-500";
      case "opened":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCurveColor = (status) => {
    switch (status) {
      case "merged":
        return "#10b981"; // green
      case "closed":
        return "#ef4444"; // red
      case "opened":
        return "#eab308"; // yellow
      default:
        return "#6b7280"; // gray
    }
  };

  return (
    <div
      className={cn(
        "bg-white/[0.02] border border-gray-800 rounded-xl p-4 sm:p-6",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
        <h3 className="text-base sm:text-lg font-semibold">
          Recent <span className="text-[#BCDD19]">PR</span>'s
        </h3>
        <span className="text-xs sm:text-sm text-gray-400">
          {prsData.length} Total
        </span>
      </div>

      {/* Timeline Container - Hidden on mobile, simplified view instead */}
      <div className="hidden lg:block">
        <div className="relative w-full h-40 mb-8">
          <div
            className="w-full h-[4px] absolute top-1/2 -translate-y-1/2  rounded-full z-2"
            style={{
              background:
                "linear-gradient(to right, transparent,rgb(188 221 25 / 50%),rgb(188 221 25 / 50%), #BCDD19,rgb(188 221 25 / 50%),rgb(188 221 25 / 50%), transparent)",
            }}
          ></div>
          <div
            className="w-full blur-[4px] h-[4px] absolute top-1/2 -translate-y-1/2  rounded-full z-2"
            style={{
              background:
                "linear-gradient(to right, transparent,rgb(188 221 25 / 50%),rgb(188 221 25 / 50%), #BCDD19,rgb(188 221 25 / 50%),rgb(188 221 25 / 50%), transparent)",
            }}
          ></div>

          {prsData.length === 0 && (
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 z-10">
              <p className="text-gray-400">No recent PRs</p>
            </div>
          )}
          <div className="flex items-center justify-between h-[100%] z-0 p-[3rem]">
            {prsData.map((pr, index) => {
              const status = pr.merged ? "merged" : pr.status || "open";
              return (
                <div className="flex flex-col relative w-[10rem] " key={index}>
                  <div
                    onClick={() =>
                      pr.pullRequestUrl && window.open(pr.pullRequestUrl)
                    }
                    className={`absolute w-[10rem] ${pr.pullRequestUrl ? "cursor-pointer hover:border-green-700" : ""} transition-all duration-300 flex items-center bg-white/5 px-2 py-1 rounded-full border border-white/10 justify-center  right-[-28%] ${index % 2 == 0 ? "top-[-90%]" : "bottom-[-90%]"}`}
                  >
                    <h3 className="text-xs line-clamp-1">{`${status === "open" ? "○" : status === "merged" ? "✓" : "✗"} ${pr.name}`}</h3>
                  </div>
                  <h3
                    className={`absolute text-[0.6rem] text-gray-700 bottom-1/2 -left-[38%]  ${index % 2 == 0 ? "bottom-[53%]" : "top-[53%]"}`}
                  >
                    {pr.date}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="106"
                    height="60"
                    viewBox="0 0 106 60"
                    fill="none"
                    className={`-translate-y-[48%] ${index % 2 == 0 ? "" : "scale-y-[-1] translate-y-[48%]"} overflow-visible`}
                  >
                    <path
                      d="M0.451194 58.5C26.6919 58.4387 104.211 42.5 104.211 0.561342"
                      stroke={`url(#paint0_linear_917_82_${index})`}
                      strokeWidth="2"
                    />

                    <defs>
                      <linearGradient
                        id={`paint0_linear_917_82_${index}`}
                        x1="4.76658"
                        y1="66.3737"
                        x2="108.977"
                        y2="9.25827"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="rgb(188 221 25 / 0%)" />
                        <stop offset="30%" stopColor={getCurveColor(status)} />
                        <stop offset="100%" stopColor="#153885" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet simplified list view */}
      <div className="lg:hidden mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prsData.length === 0 ? (
            <div>
              <p className="text-gray-400">No recent PRs</p>
            </div>
          ) : (
            prsData.slice(0, 6).map((pr, index) => {
              const status = pr.merged ? "merged" : pr.status || "open";
              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3 border border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}
                    ></div>
                    <span className="text-sm text-white truncate">
                      {pr.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {pr.date.split(",")[0]}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 sm:mt-6 pt-4 border-t border-gray-800 gap-3 sm:gap-0">
        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
          {(() => {
            const openedCount = prsData.filter(
              (pr) => !pr.merged && (pr.status === "open" || !pr.status)
            ).length;
            const mergedCount = prsData.filter(
              (pr) => pr.merged || pr.status === "merged"
            ).length;
            const closedCount = prsData.filter(
              (pr) => pr.status === "closed"
            ).length;

            return (
              <>
                <span className="text-gray-400">
                  {openedCount} <span className="text-white">Opened</span>
                </span>
                <span className="text-gray-400">
                  {mergedCount} <span className="text-purple-400">Merged</span>
                </span>
                <span className="text-gray-400">
                  {closedCount} <span className="text-red-400">Closed</span>
                </span>
              </>
            );
          })()}
        </div>
        <button className="text-[#BCDD19] text-xs sm:text-sm hover:underline text-left sm:text-right">
          View all →
        </button>
      </div>
    </div>
  );
};

export default RecentPRsCard;
