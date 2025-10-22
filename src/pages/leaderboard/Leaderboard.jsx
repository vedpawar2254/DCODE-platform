import React, { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// Removed useInView
import {
  SortAsc,
  SortDesc,
  MapPin,
  Github,
  Calendar,
  GitPullRequest,
  GitCommit,
  Trophy,
  Award,
  // TrendingUp, // Not used in metrics
  X,
  GitMerge,
  Package,
  ArrowRight,
  Code2,
  Flame,
  BarChart3,
  ChevronLeft, // Icon for Prev button
  ChevronRight // Icon for Next button
} from "lucide-react";
import useLeaderboardStore from "../../store/useLeaderboardStore";
import DashboardFooter from "../../components/dashboard/DashboardFooter";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

// Removed LoadMoreSpinner

export default function Leaderboard() {
  const navigate = useNavigate();

  // Zustand store - Added goToPage
  const {
    users,
    totalUsers,
    pagination,
    loading,
    error,
    sortBy,
    sortOrder,
    filters,
    clearFilters,
    getActiveFiltersCount,
    initializeAndFetch,
    bulkUpdate,
    // fetchUsers, // Renamed to fetchUsersForPage in store, used via goToPage/initializeAndFetch
    goToPage, // Added function to change pages
  } = useLeaderboardStore();

  const [headerRef, headerControls] = useScrollAnimation(0.8);

  // Removed Intersection Observer logic

  // Initialize component and fetch data on mount
  useEffect(() => {
    initializeAndFetch();
  }, []);

  // Handle filter changes (calls fetchUsersForPage(1) via bulkUpdate)
  const handleFilterChange = useCallback(
    (key, value) => {
      bulkUpdate({
        filters: {
          ...filters,
          [key]: value,
        },
      });
    },
    [filters, bulkUpdate]
  );

  // Handle sort changes (calls fetchUsersForPage(1) via bulkUpdate)
  const handleSortChange = useCallback(
    (newSortBy) => {
      bulkUpdate({ sortBy: newSortBy });
    },
    [bulkUpdate]
  );

  const handleSortOrderToggle = useCallback(() => {
    // API only supports 'desc', so this button remains disabled
  }, []);

  const activeFiltersCount = useMemo(
    () => getActiveFiltersCount(),
    [getActiveFiltersCount]
  );

  // --- Pagination Button Handlers ---
  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      goToPage(pagination.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      goToPage(pagination.currentPage + 1);
    }
  };
  // ---------------------------------

  // Animation variants (unchanged)
  const heroVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.9, filter: "blur(20px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } },
   };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Sort options (unchanged)
  const getSortOptions = useCallback((leaderboardType) => {
     if (leaderboardType === 'pr') {
      return [{ value: "totalMergedPRs", label: "Merged PRs" }];
    } else if (leaderboardType === 'stats') {
      return [
        { value: "totalCommits", label: "Commits" },
        { value: "totalLOC", label: "Lines of Code" },
        { value: "totalMergedPRs", label: "Merged PRs" },
        { value: "reposContributed", label: "Repositories" }, // Make sure backend returns this field name or adjust store
      ];
    } else if (leaderboardType === 'streak') {
      return [
        { value: "currentStreak", label: "Current Streak" },
        { value: "longestStreak", label: "Longest Streak" },
      ];
    }
    return [];
  }, []);

  // Memoized filter options (unchanged)
  const sortOptions = useMemo(() => getSortOptions(filters.leaderboardType), [filters.leaderboardType, getSortOptions]);
  const timeRangeOptions = useMemo(() => [
        { value: "7", label: "Last 7 Days" },
        { value: "30", label: "Last 30 Days" },
        { value: "90", label: "Last 90 Days" },
  ], []);
  const leaderboardTypeOptions = useMemo(() => [
        { value: "stats", label: "General Stats", icon: <BarChart3 size={16} /> },
        { value: "pr", label: "Pull Requests", icon: <GitPullRequest size={16} /> },
        { value: "streak", label: "Contribution Streak", icon: <Flame size={16} /> },
  ], []);


  // --- Helper to generate page numbers ---
  const getPageNumbers = () => {
    const total = pagination.totalPages;
    const current = pagination.currentPage;
    const delta = 2; // Number of pages around current
    const range = [];
    const rangeWithDots = [];

    range.push(1); // Always show first page
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
        // Ensure page numbers are within valid range and not duplicated
        if (i > 1 && i < total) {
             range.push(i);
        }
    }
     // Add last page only if total pages > 1
    if (total > 1) range.push(total);

    let l; // Keep track of the last number added
    range.forEach((i) => {
      if (l) {
        // If the gap between last number and current is exactly 2, add the missing page
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        // If the gap is larger than 1, add ellipsis
        } else if (i - l > 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i); // Add the current page number
      l = i; // Update the last number
    });

    return rangeWithDots;
  };

  const pageNumbers = useMemo(getPageNumbers, [pagination.totalPages, pagination.currentPage]);
  // --------------------------------------

  return (
    <motion.div
      className="min-h-screen max-w-7xl mx-auto bg-[#121212] p-4 sm:p-6 flex flex-col justify-between"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div>
        {/* Header */}
        <motion.div className="mb-6" variants={itemVariants}>
         <div className="flex items-center justify-between">
            <motion.div
              ref={headerRef}
              initial="hidden"
              animate={headerControls}
              variants={heroVariants}
              whileHover={{ rotateX: 2 }}
            >
              <motion.h1
                className="text-xl sm:text-2xl font-bold text-white"
                variants={itemVariants}
              >
                Developer Leaderboard
              </motion.h1>
              <motion.p
                className="text-gray-400 text-sm sm:text-base"
                variants={itemVariants}
              >
                Top contributors based on{" "}
                <span className="text-[#BCDD19]">pull requests</span>,{" "}
                <span className="text-[#BCDD19]"> contributions</span>, and
                other metrics
              </motion.p>
            </motion.div>
            <motion.div
              className="text-[#A1A1AA] text-sm"
              variants={itemVariants}
            >
              {/* Updated total users display */}
              Page {pagination.currentPage} of {pagination.totalPages} ({totalUsers} total)
            </motion.div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-[#1A1A1A] border border-[#23252B] rounded-lg p-6 mb-6"
          variants={itemVariants}
        >
           <div className="flex flex-wrap items-center gap-6">
            {/* Leaderboard Type Filter */}
            <div className="flex items-center gap-2">
              <label className="text-[#A1A1AA] text-sm">Type:</label>
              <div className="flex gap-2">
                {leaderboardTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleFilterChange("leaderboardType", option.value)
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.leaderboardType === option.value
                        ? "bg-[#C6FF3D] text-black"
                        : "bg-[#121212] text-[#A1A1AA] hover:text-white"
                    }`}
                    disabled={loading} // Disable when loading
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

             {/* Sort By Filter */}
            <div className="flex items-center gap-2">
              <label className="text-[#A1A1AA] text-sm">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-[#121212] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D]"
                disabled={loading} // Disable when loading
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {loading && ( // Show spinner if loading
                <div className="w-4 h-4 border-2 border-[#C6FF3D] border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>

             {/* Sort Order (Still Disabled) */}
            <button
              onClick={handleSortOrderToggle}
              disabled={true}
              className="flex items-center gap-1 transition-colors text-[#666] cursor-not-allowed"
            >
              <SortDesc size={16} />
              Descending
            </button>

            {/* Time Range Filter */}
            <div className="flex items-center gap-2">
              <label className="text-[#A1A1AA] text-sm">Time Range:</label>
              <select
                value={filters.timeRange}
                onChange={(e) =>
                  handleFilterChange("timeRange", e.target.value)
                }
                // Disable for streak or when loading
                disabled={loading || filters.leaderboardType === 'streak'}
                className="bg-[#121212] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D] disabled:opacity-50"
              >
                {timeRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear All Filters Button */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 bg-[#121212] text-white px-4 py-2 rounded-lg hover:bg-[#2A2A2A] transition-colors text-sm"
                disabled={loading} // Disable when loading
              >
                <X size={16} />
                Clear All Filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
             <motion.div
                className="flex items-center justify-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6FF3D]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && !loading && ( // Only show error if not initial loading
            <motion.div
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-red-400">{error}</p>
              <motion.button
                onClick={() => initializeAndFetch()} // Retry initial fetch
                className="mt-4 bg-[#C6FF3D] text-black px-6 py-2 rounded-lg hover:bg-[#B8E835] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Users List - Row-based */}
        <AnimatePresence mode="wait">
          {!loading && !error && (
            <>
              {!users || users.length === 0 ? (
                 // No Results
                <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                  <Trophy className="mx-auto text-[#A1A1AA] mb-4" size={48} />
                  <h3 className="text-white text-xl font-semibold mb-2">
                    No developers found
                  </h3>
                   <p className="text-[#A1A1AA] mb-6">
                    Try adjusting your filters.
                  </p>
                  <motion.button
                    onClick={clearFilters}
                    className="bg-[#C6FF3D] text-black px-6 py-3 rounded-lg hover:bg-[#B8E835] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Filters
                  </motion.button>
                </motion.div>
              ) : (
                // Display User Rows
                <>
                  <motion.div
                    className="space-y-4 mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {users.map((user, index) => (
                      <motion.div
                        key={user.id}
                        variants={itemVariants}
                        custom={index}
                        layout // Enables smooth reordering/filtering animations
                      >
                        <LeaderboardRow
                          user={user}
                          // Calculate rank based on page number and index
                           rank={(pagination.currentPage - 1) * pagination.limit + index + 1}
                          onClick={() =>
                            navigate(`/user/${user.github_username}`)
                          }
                          leaderboardType={filters.leaderboardType}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* --- Standard Pagination Controls --- */}
                  {pagination.totalPages > 1 && (
                     <motion.div
                        className="flex items-center justify-center gap-2 mt-8 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                      {/* Previous Button */}
                      <motion.button
                        onClick={handlePrevPage}
                        disabled={!pagination.hasPrevPage || loading}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          pagination.hasPrevPage && !loading
                            ? "bg-[#23252B] text-white hover:bg-[#2A2A2A]"
                            : "bg-[#1A1A1A] text-[#666] cursor-not-allowed"
                        }`}
                        whileHover={ pagination.hasPrevPage && !loading ? { scale: 1.05 } : {}}
                        whileTap={ pagination.hasPrevPage && !loading ? { scale: 0.95 } : {}}
                      >
                        <ChevronLeft size={16} />
                        Prev
                      </motion.button>

                      {/* Page Numbers */}
                      {pageNumbers.map((page, index) =>
                        page === '...' ? (
                           <span key={`dots-${index}`} className="text-[#666] px-2">...</span>
                        ) : (
                          <motion.button
                            key={page}
                            onClick={() => goToPage(page)}
                            disabled={loading}
                            className={`min-w-[36px] h-9 rounded-lg font-medium transition-colors duration-200 ${
                              pagination.currentPage === page
                                ? "bg-[#C6FF3D] text-black shadow-md"
                                : "bg-[#23252B] text-white hover:bg-[#2A2A2A]"
                            }`}
                             whileHover={{ scale: 1.1 }}
                             whileTap={{ scale: 0.9 }}
                          >
                            {page}
                          </motion.button>
                        )
                      )}

                      {/* Next Button */}
                      <motion.button
                        onClick={handleNextPage}
                        disabled={!pagination.hasNextPage || loading}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          pagination.hasNextPage && !loading
                            ? "bg-[#23252B] text-white hover:bg-[#2A2A2A]"
                            : "bg-[#1A1A1A] text-[#666] cursor-not-allowed"
                        }`}
                         whileHover={ pagination.hasNextPage && !loading ? { scale: 1.05 } : {}}
                         whileTap={ pagination.hasNextPage && !loading ? { scale: 0.95 } : {}}
                      >
                        Next
                        <ChevronRight size={16} />
                      </motion.button>
                    </motion.div>
                  )}
                  {/* ----------------------------------- */}
                </>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
      <DashboardFooter />
    </motion.div>
  );
}

// Leaderboard Row Component (Unchanged)
const LeaderboardRow = ({ user, rank, onClick, leaderboardType }) => {
  const joinedDate = (user.createdAt && user.createdAt !== 'N/A')
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  const getRankBadge = (rank) => {
    if (rank === 1) return { bg: "bg-gradient-to-r from-yellow-500 to-yellow-600", text: "text-white", icon: "🥇", shadow: "shadow-lg shadow-yellow-500/30" };
    if (rank === 2) return { bg: "bg-gradient-to-r from-gray-400 to-gray-500", text: "text-white", icon: "🥈", shadow: "shadow-lg shadow-gray-400/30" };
    if (rank === 3) return { bg: "bg-gradient-to-r from-orange-600 to-orange-700", text: "text-white", icon: "🥉", shadow: "shadow-lg shadow-orange-600/30" };
    return { bg: "bg-[#2A2A2A]", text: "text-[#A1A1AA]", icon: rank, shadow: "" };
  };

  const rankBadge = getRankBadge(rank);

  const renderMetrics = () => {
    if (leaderboardType === 'pr') {
      return (
        <div className="text-center min-w-[80px]">
          <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1"> <GitMerge size={14} /> <span className="text-xs font-medium">Merged</span> </div>
          <p className="text-white text-xl font-bold"> {user.stats?.totalMergedPRs || 0} </p>
        </div>
      );
    } else if (leaderboardType === 'stats') {
      return (
        <>
          <div className="text-center min-w-[80px]">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1"> <GitCommit size={14} /> <span className="text-xs font-medium">Commits</span> </div>
            <p className="text-white text-xl font-bold"> {user.stats?.totalCommits || 0} </p>
          </div>
          <div className="text-center min-w-[80px]">
            <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1"> <Code2 size={14} /> <span className="text-xs font-medium">Lines of Code</span> </div>
            <p className="text-white text-xl font-bold"> {user.stats?.totalLOC || 0} </p>
          </div>
          <div className="text-center min-w-[100px]">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 mb-1"> <GitMerge size={14} /> <span className="text-xs font-medium">Merged PRs</span> </div>
            <p className="text-white text-xl font-bold"> {user.stats?.totalMergedPRs || 0} </p>
          </div>
          <div className="text-center min-w-[80px]">
            <div className="flex items-center justify-center gap-1.5 text-orange-400 mb-1"> <Package size={14} /> <span className="text-xs font-medium">Repositories</span> </div>
            <p className="text-white text-xl font-bold"> {user.stats?.reposContributed || 0} </p>
          </div>
        </>
      );
    } else if (leaderboardType === 'streak') {
      return (
        <>
          <div className="text-center min-w-[120px]">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1"> <Flame size={14} /> <span className="text-xs font-medium">Current Streak</span> </div>
            <p className="text-white text-xl font-bold"> {user.stats?.currentStreak || 0} days </p>
          </div>
          <div className="text-center min-w-[120px]">
            <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1"> <Award size={14} /> <span className="text-xs font-medium">Longest Streak</span> </div>
            <p className="text-white text-xl font-bold"> {user.stats?.longestStreak || 0} days </p>
          </div>
          <div className="text-center min-w-[150px]">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 mb-1"> <Calendar size={14} /> <span className="text-xs font-medium">Last Commit</span> </div>
            <p className="text-white text-xl font-bold"> {user.stats?.lastCommitDate ? new Date(user.stats.lastCommitDate).toLocaleDateString() : "N/A"} </p>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <motion.div
      onClick={onClick}
      className="bg-[#1A1A1A] border border-[#23252B] rounded-xl overflow-hidden cursor-pointer group relative"
      whileHover={{ x: 4, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {rank <= 3 && ( <div className={`h-1 ${ rank === 1 ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : rank === 2 ? "bg-gradient-to-r from-gray-400 to-gray-500" : "bg-gradient-to-r from-orange-600 to-orange-700" }`} /> )}
      <div className="p-6">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0"> <div className={`flex items-center justify-center w-14 h-14 rounded-full ${rankBadge.bg} ${rankBadge.text} text-lg font-bold ${rankBadge.shadow}`}> {rankBadge.icon} </div> </div>
          <div className="flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <motion.img src={ user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}` } alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#2A2A2A]" />
                {user.github_username && ( <motion.div className="absolute -bottom-1 -right-1 bg-[#C6FF3D] rounded-full p-1.5"> <Github className="text-black" size={12} /> </motion.div> )}
              </div>
              <div className="min-w-0">
                <motion.h3 className="text-white font-semibold text-lg truncate transition-colors"> {user.name} </motion.h3>
                <p className="text-[#A1A1AA] text-sm truncate"> @{user.github_username || "no-github"} </p>
                {user.location && ( <div className="flex items-center gap-1 text-[#A1A1AA] text-xs mt-1"> <MapPin size={12} /> <span>{user.location}</span> </div> )}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0"> {user.bio && ( <p className="text-[#A1A1AA] text-sm line-clamp-2 leading-relaxed"> {user.bio} </p> )} </div>
          <div className="flex items-center gap-8"> {renderMetrics()} </div>
          <div className="flex-shrink-0 flex flex-col items-end justify-between">
            {joinedDate && ( <div className="flex items-center gap-1 text-[#666] text-xs"> <Calendar size={10} /> <span>Joined {joinedDate}</span> </div> )}
            <motion.div className="text-[#C6FF3D] text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-2"> View Profile <ArrowRight size={12} /> </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};