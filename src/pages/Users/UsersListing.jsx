import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Users,
  MapPin,
  Github,
  Calendar,
  GraduationCap,
  X,
} from "lucide-react";
import useAllUsersStore from "../../store/useAllUsersStore";
import DashboardFooter from "../../components/dashboard/DashboardFooter";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function UsersListing() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Zustand store
  const {
    users,
    totalUsers,
    currentPage,
    totalPages,
    loading,
    error,
    searchLoading,
    filterLoading,
    searchQuery,
    sortBy,
    sortOrder,
    filters,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setFilter,
    clearFilters,
    fetchUsers,
    goToPage,
    nextPage,
    prevPage,
    getUserStats,
    getActiveFiltersCount,
    initializeAndFetch,
    getURLParams,
    isInitialized,
    debouncedSearch,
    bulkUpdate,
    getSearchSummary,
  } = useAllUsersStore();

  // Local UI state
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [headerRef, headerControls] = useScrollAnimation(0.1);

  // Sync localSearchQuery with store searchQuery
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Initialize component and fetch data
  useEffect(() => {
    initializeAndFetch(searchParams);
  }, []);

  // Update URL params when store state changes
  useEffect(() => {
    if (isInitialized) {
      const params = getURLParams();
      setSearchParams(params);
    }
  }, [
    searchQuery,
    sortBy,
    sortOrder,
    filters,
    currentPage,
    isInitialized,
    setSearchParams,
    getURLParams,
  ]);

  // Fetch users when dependencies change (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      fetchUsers();
    }
  }, [
    currentPage,
    searchQuery,
    sortBy,
    sortOrder,
    filters,
    isInitialized,
    fetchUsers,
  ]);

  // Handle filter changes
  const handleFilterChange = useCallback(
    (key, value) => {
      setFilter(key, value);
    },
    [setFilter]
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setSearchQuery(localSearchQuery);
    },
    [localSearchQuery, setSearchQuery]
  );

  // Real-time search as user types (debounced)
  const handleSearchInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setLocalSearchQuery(value);

      // Debounced search for real-time feedback
      if (value.trim().length >= 2 || value.trim().length === 0) {
        debouncedSearch(value.trim());
      }
    },
    [debouncedSearch]
  );

  const handleSortChange = useCallback(
    (newSortBy) => {
      const newSortOrder =
        newSortBy === sortBy ? (sortOrder === "asc" ? "desc" : "asc") : "desc";

      bulkUpdate({
        sortBy: newSortBy,
        sortOrder: newSortOrder,
      });
    },
    [sortBy, sortOrder, bulkUpdate]
  );

  // Memoized values for performance
  const stats = useMemo(() => getUserStats(), [getUserStats]);
  const activeFiltersCount = useMemo(
    () => getActiveFiltersCount(),
    [getActiveFiltersCount]
  );
  const searchSummary = useMemo(() => getSearchSummary(), [getSearchSummary]);

  // Animation variants
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Memoized filter options to prevent unnecessary re-renders
  const sortOptions = useMemo(
    () => [
      { value: "createdAt", label: "Join Date" },
      { value: "name", label: "Name" },
      { value: "location", label: "Location" },
    ],
    []
  );

  const experienceLevelOptions = useMemo(
    () => [
      { value: "Beginner", label: "Beginner" },
      { value: "Intermediate", label: "Intermediate" },
      { value: "Advanced", label: "Advanced" },
      { value: "Expert", label: "Expert" },
    ],
    []
  );

  return (
    <motion.div
      className="min-h-screen max-w-7xl mx-auto bg-[#121212] p-4 sm:p-6 flex flex-col justify-between"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <div>
        <motion.div className="mb-6" variants={itemVariants}>
          <div className="flex items-center justify-between">
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
              <motion.h1
                className="text-xl sm:text-2xl font-bold text-white"
                variants={itemVariants}
              >
                Discover Developers
              </motion.h1>
              <motion.p
                className="text-gray-400 text-sm sm:text-base"
                variants={itemVariants}
              >
                Find and <span className="text-[#BCDD19]">connect</span> with
                talented<span className="text-[#BCDD19]"> developers</span> from
                around the world
              </motion.p>
            </motion.div>
            <motion.div
              className="text-[#A1A1AA] text-sm"
              variants={itemVariants}
            >
              {totalUsers} developer{totalUsers !== 1 ? "s" : ""} found
            </motion.div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-[#1A1A1A] border border-[#23252B] rounded-lg p-6 mb-6"
          variants={itemVariants}
        >
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A1A1AA]"
                size={20}
              />
              <input
                type="text"
                value={localSearchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search by name, bio, or location..."
                className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg pl-10 pr-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#C6FF3D] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-[#C6FF3D] text-black px-6 py-3 rounded-lg hover:bg-[#B8E835] transition-colors font-medium"
            >
              Search
            </button>
          </form>

          {/* Sort Controls and Filters */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-[#A1A1AA] text-sm">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-1 text-[#A1A1AA] hover:text-white transition-colors"
            >
              {sortOrder === "asc" ? (
                <SortAsc size={16} />
              ) : (
                <SortDesc size={16} />
              )}
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </button>

            {/* Experience Level Filter */}
            <div className="flex items-center gap-2">
              <label className="text-[#A1A1AA] text-sm">Experience:</label>
              <select
                value={filters.experience_level}
                onChange={(e) =>
                  handleFilterChange("experience_level", e.target.value)
                }
                className="bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D]"
              >
                <option value="">Any Level</option>
                {experienceLevelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Has GitHub Filter */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.hasGithub}
                onChange={(e) =>
                  handleFilterChange("hasGithub", e.target.checked)
                }
                className="rounded border-[#3A3A3A] bg-[#23252B] text-[#C6FF3D] focus:ring-[#C6FF3D] focus:ring-offset-0"
              />
              <span className="text-[#A1A1AA] text-sm">Has GitHub Profile</span>
            </label>

            {/* Clear All Filters Button */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 bg-[#23252B] text-white px-4 py-2 rounded-lg hover:bg-[#2A2A2A] transition-colors text-sm"
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
          {error && (
            <motion.div
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-red-400">{error}</p>
              <motion.button
                onClick={fetchUsers}
                className="mt-4 bg-[#C6FF3D] text-black px-6 py-2 rounded-lg hover:bg-[#B8E835] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Users Grid */}
        <AnimatePresence mode="wait">
          {!loading && !error && (
            <>
              {users.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="mx-auto text-[#A1A1AA] mb-4" size={48} />
                  <h3 className="text-white text-xl font-semibold mb-2">
                    No developers found
                  </h3>
                  <p className="text-[#A1A1AA] mb-6">
                    Try adjusting your search criteria or filters
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
                <>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {users.map((user, index) => (
                      <motion.div
                        key={user.id}
                        variants={cardVariants}
                        custom={index}
                        layout
                      >
                        <UserCard
                          user={user}
                          onClick={() =>
                            navigate(`/user/${user.github_username}`)
                          }
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <motion.button
                        onClick={() => prevPage()}
                        disabled={!stats.hasPrevPage}
                        className="px-4 py-2 bg-[#23252B] text-white rounded-lg hover:bg-[#2A2A2A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        whileHover={stats.hasPrevPage ? { scale: 1.05 } : {}}
                        whileTap={stats.hasPrevPage ? { scale: 0.95 } : {}}
                      >
                        Previous
                      </motion.button>

                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.min(totalPages, 5) },
                          (_, i) => {
                            const pageNum =
                              currentPage > 3 ? currentPage - 2 + i : i + 1;
                            if (pageNum > totalPages) return null;

                            return (
                              <motion.button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={`px-3 py-2 rounded-lg transition-colors ${
                                  currentPage === pageNum
                                    ? "bg-[#C6FF3D] text-black"
                                    : "bg-[#23252B] text-white hover:bg-[#2A2A2A]"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {pageNum}
                              </motion.button>
                            );
                          }
                        )}
                      </div>

                      <motion.button
                        onClick={() => nextPage()}
                        disabled={!stats.hasNextPage}
                        className="px-4 py-2 bg-[#23252B] text-white rounded-lg hover:bg-[#2A2A2A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        whileHover={stats.hasNextPage ? { scale: 1.05 } : {}}
                        whileTap={stats.hasNextPage ? { scale: 0.95 } : {}}
                      >
                        Next
                      </motion.button>
                    </motion.div>
                  )}
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

// User Card Component
const UserCard = ({ user, onClick }) => {
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      onClick={onClick}
      className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-5 cursor-pointer group flex flex-col justify-between min-h-full"
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header with Avatar and Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <motion.img
            src={
              user.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
            }
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#2A2A2A] transition-colors"
          />
          {user.github_username && (
            <motion.div
              className="absolute -bottom-1 -right-1 bg-[#C6FF3D] rounded-full p-1"
            >
              <Github className="text-black" size={12} />
            </motion.div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <motion.h3
            className="text-white font-semibold text-lg truncate transition-colors"
          >
            {user.name}
          </motion.h3>
          <p className="text-[#A1A1AA] text-sm truncate">
            @{user.github_username || "no-github"}
          </p>
        </div>
      </div>

      {/* Bio - Clean and minimal */}
      {user.bio && (
        <p className="text-[#A1A1AA] text-sm mb-4 line-clamp-2 leading-relaxed">
          {user.bio}
        </p>
      )}

      {/* Key Info - Simplified layout */}
      <div className="space-y-2 mb-4">
        {user.location && (
          <motion.div
            className="flex items-center gap-2 text-[#A1A1AA] text-sm"
          >
            <MapPin size={14} className="flex-shrink-0" />
            <span className="truncate">{user.location}</span>
          </motion.div>
        )}

        {user.collegeInfo?.name && (
          <motion.div
            className="flex items-center gap-2 text-[#A1A1AA] text-sm"
          >
            <GraduationCap size={14} className="flex-shrink-0" />
            <span className="truncate">
              {user.collegeInfo.name}
              {user.collegeInfo.currentYear &&
                ` • Year ${user.collegeInfo.currentYear}`}
            </span>
          </motion.div>
        )}
      </div>

      {/* Footer with join date - Minimal */}
      <div className="flex items-center justify-between pt-3 border-t border-[#23252B]">
        <div className="flex items-center gap-1 text-[#666] text-xs">
          <Calendar size={12} />
          <span>Joined {joinedDate}</span>
        </div>
        <motion.div
          className="text-[#C6FF3D] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        >
          View Profile →
        </motion.div>
      </div>
    </motion.div>
  );
};
