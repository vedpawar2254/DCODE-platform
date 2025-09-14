import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiGitPullRequest,
  FiGitMerge,
  FiActivity,
  FiFolder,
  FiTarget,
  FiAward,
  FiCode,
  FiCalendar,
  FiRefreshCw,
} from "react-icons/fi";
import {
  StatCard,
  DailyStreakCard,
  SkillsSummaryCard,
  DailyPRActivityCard,
  RecentPRsCard,
  MilestoneTrackerCard,
  DashboardHeader,
  DashboardFooter,
} from "../../components/dashboard";
import {
  useScrollAnimation,
  scrollAnimations,
} from "../../hooks/useScrollAnimation";
import { dashboardService } from "../../services/dashboardService";
import { useAuthStore } from "../../store/useAuthStore";

export default () => {
  // Auth store
  const { authUser } = useAuthStore();

  // State for dynamic data
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    profile: null,
    recentPRs: null,
    loading: true,
    error: null,
  });

  const [headerRef, headerControls] = useScrollAnimation(0.1);
  const [statsRef, statsControls] = useScrollAnimation(0.2);
  const [topRowRef, topRowControls] = useScrollAnimation(0.2);
  const [middleRowRef, middleRowControls] = useScrollAnimation(0.2);
  const [bottomRowRef, bottomRowControls] = useScrollAnimation(0.2);
  const [footerRef, footerControls] = useScrollAnimation(0.1);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const heroVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const statsGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const statCardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -30,
      scale: 0.8,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const contentRowVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      rotateY: -15,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2,
      },
    },
  };
  const cardHoverEffects = {};

  // Fetch dashboard data
  useEffect(() => {
    console.log(dashboardData.loading, !dashboardData.error);
    const fetchDashboardData = async () => {
      if (!authUser?.data?.id) return;

      try {
        setDashboardData((prev) => ({ ...prev, loading: true, error: null }));

        const [statsResponse, profileResponse, prsResponse] = await Promise.all(
          [
            dashboardService.getUserStats(authUser.data.id),
            dashboardService.getUserProfile(),
            dashboardService.getLatestPRs(8),
          ]
        );
        setDashboardData({
          stats: statsResponse.message,
          profile: profileResponse.data,
          recentPRs: prsResponse.message.recentPR,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setDashboardData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load dashboard data",
        }));
      }
    };

    fetchDashboardData();
  }, [authUser?.data?.id]);

  // Refresh function
  const refreshDashboard = async () => {
    if (!authUser?.data?.id || dashboardData.loading) return;

    try {
      setDashboardData((prev) => ({ ...prev, loading: true, error: null }));

      const [statsResponse, profileResponse, prsResponse] = await Promise.all([
        dashboardService.getUserStats(authUser.data.id),
        dashboardService.getUserProfile(),
        dashboardService.getLatestPRs(8),
      ]);

      setDashboardData({
        stats: statsResponse.message,
        profile: profileResponse.data,
        recentPRs: prsResponse.message.recentPR,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
      setDashboardData((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to refresh dashboard data",
      }));
    }
  };

  // Transform API data for components
  const transformedStats = dashboardData.stats
    ? {
        openPRs: dashboardData.stats.totalOpenPRs || 0,
        mergedPRs: dashboardData.stats.totalMergedPRs || 0,
        contributions: dashboardData.stats.totalCommits || 0,
        repositories: dashboardData.stats.avgReposContributed || 0,
        linesOfCode: dashboardData.stats.totalLOC || 0,
        dailyStreak: dashboardData.profile?.streak?.current || 0,
        longest: dashboardData.profile?.streak?.longest || 0,
        projectCount: dashboardData.stats.projectCount || 0,
        todayContributions:
          dashboardData.profile?.streak?.currentStreakData
            ?.totalContributions ||
          dashboardData.profile?.streak?.currentStreakData?.totalCommits ||
          0,
        todayLinesOfCode:
          dashboardData.profile?.streak?.currentStreakData?.totalLinesOfCode ||
          0,
      }
    : {
        openPRs: 0,
        mergedPRs: 0,
        contributions: 0,
        repositories: 0,
        linesOfCode: 0,
        dailyStreak: 0,
        todayContributions: 0,
        todayLinesOfCode: 0,
      };

  // Transform PR activity data
  const transformedActivityData = dashboardData.stats?.prActivityLast7Days
    ? dashboardData.stats.prActivityLast7Days.map((item, index) => ({
        day: item.day,
        prs: item.prs,
      }))
    : [
        { day: "Mon", prs: 0 },
        { day: "Tue", prs: 0 },
        { day: "Wed", prs: 0 },
        { day: "Thu", prs: 0 },
        { day: "Fri", prs: 0 },
        { day: "Sat", prs: 0 },
        { day: "Sun", prs: 0 },
      ];

  // Transform languages data with proper colors
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

  const transformedLanguages =
    dashboardData.stats?.languagesWithPercentage?.length > 0
      ? dashboardData.stats.languagesWithPercentage
          .map((lang) => ({
            name: lang.language,
            percentage: lang.percentage,
            color: getLanguageColor(lang.language),
          }))
          .sort((a, b) => b.percentage - a.percentage)
      : [{ name: "N/A", percentage: 100, color: "#6B7280" }];

  // Transform recent PRs data
  const transformedRecentPRs = dashboardData.recentPRs
    ? dashboardData.recentPRs
        .map((pr) => ({
          name: pr.title,
          status:
            pr.state === "open" ? "open" : pr.isMerged ? "merged" : "closed",
          date: new Date(pr.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          pullRequestUrl: pr.pullRequestUrl,
        }))
        .reverse()
    : [{ title: "No recent PRs", status: "open", date: "N/A" }];

  // Generate milestones based on actual data
  const generateMilestones = (stats) => {
    if (!stats) return [];

    return [
      {
        icon: <FiGitMerge className="w-5 h-5 text-[#BCDD19]" />,
        title: "30 PRs Merged",
        progress: `${stats.totalMergedPRs} / 30`,
        percentage: Math.min((stats.totalMergedPRs / 30) * 100, 100),
        status: `${Math.min((stats.totalMergedPRs / 30) * 100, 100).toFixed(2)}%`,
        color: "[#BCDD19]",
        remaining:
          stats.totalMergedPRs >= 30
            ? "Achieved"
            : `${30 - stats.totalMergedPRs} remaining to achieve`,
      },
      {
        icon: <FiCode className="w-5 h-5 text-orange-400" />,
        title: "5,000 Lines of Code",
        progress: `${stats.totalLOC.toLocaleString()} / 5,000`,
        percentage: Math.min((stats.totalLOC / 5000) * 100, 100),
        status: `${Math.min((stats.totalLOC / 5000) * 100, 100).toFixed(2)}%`,
        color: "orange-400",
        remaining:
          stats.totalLOC >= 5000
            ? "Achieved"
            : `${(5000 - stats.totalLOC).toLocaleString()} remaining to achieve`,
      },
      {
        icon: <FiFolder className="w-5 h-5 text-blue-400" />,
        title: "30 Unique Repositories",
        progress: `${stats.projectCount} / 30`,
        percentage: Math.min((stats.projectCount / 30) * 100, 100),
        status: `${Math.min((stats.projectCount / 30) * 100, 100).toFixed(2)}%`,
        color: "blue-400",
        remaining:
          stats.projectCount >= 30
            ? "Achieved"
            : `${30 - stats.projectCount} remaining to achieve`,
      },
      {
        icon: <FiTarget className="w-5 h-5 text-purple-400" />,
        title: "50 Open PRs",
        progress: `${stats.totalOpenPRs} / 50`,
        percentage: Math.min((stats.totalOpenPRs / 50) * 100, 100),
        status: `${Math.min((stats.totalOpenPRs / 50) * 100, 100).toFixed(2)}%`,
        color: "purple-400",
        remaining:
          stats.totalOpenPRs >= 50
            ? "Achieved"
            : `${50 - stats.totalOpenPRs} remaining to achieve`,
      },
      {
        icon: <FiCalendar className="w-5 h-5 text-teal-400" />,
        title: "100 Total Commits",
        progress: `${stats.totalCommits} / 100`,
        percentage: Math.min((stats.totalCommits / 100) * 100, 100),
        status: `${Math.min((stats.totalCommits / 100) * 100, 100).toFixed(2)}%`,
        color: "teal-400",
        remaining:
          stats.totalCommits >= 100
            ? "Achieved"
            : `${100 - stats.totalCommits} remaining to achieve`,
      },
      {
        icon: <FiAward className="w-5 h-5 text-[#BCDD19]" />,
        title: "First Project",
        progress: `${stats.projectCount} / 1`,
        percentage: stats.projectCount > 0 ? 100 : 0,
        status: `${stats.projectCount > 0 ? 100 : 0}%`,
        color: "[#BCDD19]",
        remaining:
          stats.projectCount > 0 ? "Achieved" : "1 remaining to achieve",
      },
    ];
  };

  const transformedMilestones = generateMilestones(dashboardData.stats);

  // Show loading spinner if user is not yet available
  // if (!authUser?.data?.id) {
  //   return (
  //     <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <motion.div
      className="bg-[#121212] text-white p-4 sm:p-6 relative min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Loading Overlay */}
      {/* {dashboardData.loading && (
        <motion.div
          className="absolute inset-0 bg-[#121212]/80 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-white/60 text-sm">Loading dashboard...</p>
          </div>
        </motion.div>
      )} */}

      <div className="max-w-7xl mx-auto ">
        {/* Error State */}
        {dashboardData.error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
            <p className="text-red-400 mb-4">{dashboardData.error}</p>
            <button
              onClick={refreshDashboard}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors duration-200"
            >
              <FiRefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}

        {/* Dashboard Content - Always Mounted */}
        <div
          className={`transition-opacity duration-300 space-y-4 sm:space-y-6 ${
            dashboardData.loading
              ? "opacity-30 /pointer-events-none"
              : "opacity-100"
          }`}
        >
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerControls}
            variants={heroVariants}
            whileHover={{
              rotateX: 2,
            }}
            // className="flex-1"
          >
            <DashboardHeader stats={transformedStats} user={authUser?.data} />
          </motion.div>
          {/* Stats Cards */}
          <motion.div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
            initial="hidden"
            animate={statsControls}
            variants={statsGridVariants}
          >
            <motion.div
              variants={statCardVariants}
              whileHover={{
                ...cardHoverEffects.hover,
                boxShadow: "0 25px 25px rgba(59, 130, 246, 0.1)",
              }}
              whileTap={cardHoverEffects.tap}
            >
              <StatCard
                icon={<FiGitPullRequest className="w-5 h-5" />}
                title="Open PRs"
                value={transformedStats.openPRs}
                subtitle="This Month"
                bgColor="bg-[#4D7DE7]/20 border-blue-500/30"
                textColor="text-blue-400"
              />
            </motion.div>
            <motion.div
              variants={statCardVariants}
              whileHover={{
                ...cardHoverEffects.hover,
                boxShadow: "0 25px 25px rgba(34, 197, 94, 0.1)",
              }}
              whileTap={cardHoverEffects.tap}
            >
              <StatCard
                icon={<FiGitMerge className="w-5 h-5" />}
                title="Merged PRs"
                value={transformedStats.mergedPRs}
                subtitle="This Month"
                bgColor="bg-[#16A34A]/20 border-green-500/30"
                textColor="text-green-400"
              />
            </motion.div>
            <motion.div
              variants={statCardVariants}
              whileHover={{
                ...cardHoverEffects.hover,
                boxShadow: "0 25px 25px rgba(20, 184, 166, 0.1)",
              }}
              whileTap={cardHoverEffects.tap}
            >
              <StatCard
                icon={<FiActivity className="w-5 h-5" />}
                title="Contributions"
                value={transformedStats.contributions}
                subtitle="This Month"
                bgColor="bg-[#6ACEBD]/20 border-cyan-500/30"
                textColor="text-cyan-400"
              />
            </motion.div>
            <motion.div
              variants={statCardVariants}
              whileHover={{
                ...cardHoverEffects.hover,
                boxShadow: "0 25px 25px rgba(249, 115, 22, 0.1)",
              }}
              whileTap={cardHoverEffects.tap}
            >
              <StatCard
                icon={<FiFolder className="w-5 h-5" />}
                title="Repositories"
                value={transformedStats.projectCount}
                subtitle="Contributing to"
                bgColor="bg-[#EA580C]/20 border-orange-500/30"
                textColor="text-orange-400"
              />
            </motion.div>
          </motion.div>
          {/* Main Content Grid */}
          <div className="space-y-4 sm:space-y-6">
            {/* Top Row - Daily Streak and PR Activity */}
            <motion.div
              ref={topRowRef}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
              initial="hidden"
              animate={topRowControls}
              variants={contentRowVariants}
            >
              <motion.div
                className="lg:col-span-1"
                variants={scrollAnimations.fadeInLeft}
              >
                <DailyStreakCard stats={transformedStats} />
                {/* {console.log(transformedStats)} */}
              </motion.div>
              <motion.div
                className="lg:col-span-2"
                variants={scrollAnimations.fadeInRight}
              >
                <DailyPRActivityCard activityData={transformedActivityData} />
              </motion.div>
            </motion.div>
            {/* Middle Row - Milestones and Skills */}
            <motion.div
              ref={middleRowRef}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
              initial="hidden"
              animate={middleRowControls}
              variants={contentRowVariants}
            >
              <motion.div
                className="lg:col-span-2"
                variants={scrollAnimations.scaleIn}
              >
                <MilestoneTrackerCard milestones={transformedMilestones} />
              </motion.div>
              <motion.div
                className="lg:col-span-1"
                variants={scrollAnimations.fadeInRight}
              >
                <SkillsSummaryCard languages={transformedLanguages} />
              </motion.div>
            </motion.div>
            {/* Bottom Row - Recent PRs */}
            <motion.div
              ref={bottomRowRef}
              className="w-full"
              initial="hidden"
              animate={bottomRowControls}
              variants={scrollAnimations.slideInBlur}
            >
              <RecentPRsCard recentPRs={transformedRecentPRs} />
            </motion.div>
          </div>
          {/* Footer */}
          <motion.div
            ref={footerRef}
            initial="hidden"
            animate={footerControls}
            variants={scrollAnimations.fadeInUp}
          >
            <DashboardFooter />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
