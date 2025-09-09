import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [showFilters, setShowFilters] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

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
  }, [searchQuery, sortBy, sortOrder, filters, currentPage, isInitialized, setSearchParams, getURLParams]);

  // Fetch users when dependencies change (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      fetchUsers();
    }
  }, [currentPage, searchQuery, sortBy, sortOrder, filters, isInitialized, fetchUsers]);

  // Handle filter changes
  const handleFilterChange = useCallback((key, value) => {
    setFilter(key, value);
  }, [setFilter]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
  }, [localSearchQuery, setSearchQuery]);

  // Real-time search as user types (debounced)
  const handleSearchInputChange = useCallback((e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    
    // Debounced search for real-time feedback
    if (value.trim().length >= 2 || value.trim().length === 0) {
      debouncedSearch(value.trim());
    }
  }, [debouncedSearch]);

  const handleSortChange = useCallback((newSortBy) => {
    const newSortOrder = newSortBy === sortBy 
      ? (sortOrder === "asc" ? "desc" : "asc")
      : "desc";
    
    bulkUpdate({
      sortBy: newSortBy,
      sortOrder: newSortOrder,
    });
  }, [sortBy, sortOrder, bulkUpdate]);

  // Memoized values for performance
  const stats = useMemo(() => getUserStats(), [getUserStats]);
  const activeFiltersCount = useMemo(() => getActiveFiltersCount(), [getActiveFiltersCount]);
  const searchSummary = useMemo(() => getSearchSummary(), [getSearchSummary]);
  
  // Memoized filter options to prevent unnecessary re-renders
  const sortOptions = useMemo(() => [
    { value: "createdAt", label: "Join Date" },
    { value: "name", label: "Name" },
    { value: "location", label: "Location" },
  ], []);

  const experienceLevelOptions = useMemo(() => [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Expert", label: "Expert" },
  ], []);

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-[#121212] p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl text-white font-semibold flex items-center gap-3">
              <Users className="text-[#C6FF3D]" size={32} />
              Discover Developers
            </h1>
            <p className="text-[#D5D5D5] text-sm md:text-base mt-2">
              Find and connect with talented developers from around the world
            </p>
          </div>
          <div className="text-[#A1A1AA] text-sm">
            {totalUsers} developer{totalUsers !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#1A1A1A] border border-[#23252B] rounded-lg p-6 mb-6">
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
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-[#23252B] text-white px-4 py-3 rounded-lg hover:bg-[#2A2A2A] transition-colors relative"
          >
            <Filter size={20} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C6FF3D] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </form>

        {/* Sort Controls */}
        <div className="flex flex-wrap items-center gap-4">
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
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-[#23252B]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-[#A1A1AA] hover:text-white transition-colors text-sm"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-[#A1A1AA] text-sm mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  placeholder="City, Country"
                  className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D]"
                />
              </div>

              <div>
                <label className="block text-[#A1A1AA] text-sm mb-2">
                  College
                </label>
                <input
                  type="text"
                  value={filters.college}
                  onChange={(e) =>
                    handleFilterChange("college", e.target.value)
                  }
                  placeholder="University name"
                  className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D]"
                />
              </div>

              <div>
                <label className="block text-[#A1A1AA] text-sm mb-2">
                  Experience Level
                </label>
                <select
                  value={filters.experience_level}
                  onChange={(e) =>
                    handleFilterChange("experience_level", e.target.value)
                  }
                  className="w-full bg-[#23252B] border border-[#3A3A3A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C6FF3D]"
                >
                  <option value="">Any Level</option>
                  {experienceLevelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.hasGithub}
                    onChange={(e) =>
                      handleFilterChange("hasGithub", e.target.checked)
                    }
                    className="rounded border-[#3A3A3A] bg-[#23252B] text-[#C6FF3D] focus:ring-[#C6FF3D] focus:ring-offset-0"
                  />
                  <span className="text-[#A1A1AA] text-sm">
                    Has GitHub Profile
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6FF3D]"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-4 bg-[#C6FF3D] text-black px-6 py-2 rounded-lg hover:bg-[#B8E835] transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Users Grid */}
      {!loading && !error && (
        <>
          {users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto text-[#A1A1AA] mb-4" size={48} />
              <h3 className="text-white text-xl font-semibold mb-2">
                No developers found
              </h3>
              <p className="text-[#A1A1AA] mb-6">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearFilters}
                className="bg-[#C6FF3D] text-black px-6 py-3 rounded-lg hover:bg-[#B8E835] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onClick={() => navigate(`/user/${user.github_username}`)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => prevPage()}
                    disabled={!stats.hasPrevPage}
                    className="px-4 py-2 bg-[#23252B] text-white rounded-lg hover:bg-[#2A2A2A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const pageNum =
                        currentPage > 3 ? currentPage - 2 + i : i + 1;
                      if (pageNum > totalPages) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? "bg-[#C6FF3D] text-black"
                              : "bg-[#23252B] text-white hover:bg-[#2A2A2A]"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => nextPage()}
                    disabled={!stats.hasNextPage}
                    className="px-4 py-2 bg-[#23252B] text-white rounded-lg hover:bg-[#2A2A2A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// User Card Component
const UserCard = ({ user, onClick }) => {
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div
      onClick={onClick}
      className="bg-[#1A1A1A] border border-[#23252B] rounded-lg p-6 hover:border-[#C6FF3D] transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-[#C6FF3D]/10"
    >
      {/* Avatar and Basic Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={
            user.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
          }
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#C6FF3D]"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold truncate">{user.name}</h3>
          <p className="text-[#A1A1AA] text-sm truncate">
            @{user.github_username || "no-github"}
          </p>
        </div>
        {user.github_username && (
          <Github className="text-[#A1A1AA]" size={16} />
        )}
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-[#A1A1AA] text-sm mb-4 line-clamp-2">{user.bio}</p>
      )}

      {/* User Info */}
      <div className="space-y-3 mb-4">
        {/* Experience Level */}
        {user.experience_level && (
          <div className="flex items-center gap-2">
            <GraduationCap className="text-[#C6FF3D]" size={14} />
            <span className="text-white text-sm">{user.experience_level}</span>
          </div>
        )}

        {/* Location */}
        {user.location && (
          <div className="flex items-center gap-2">
            <MapPin className="text-[#A1A1AA]" size={14} />
            <span className="text-[#A1A1AA] text-sm truncate">
              {user.location}
            </span>
          </div>
        )}

        {/* College Info */}
        {user.collegeInfo?.name && (
          <div>
            <div className="text-[#A1A1AA] text-xs mb-1">Education</div>
            <div className="text-white text-sm truncate">
              {user.collegeInfo.name}
            </div>
            {user.collegeInfo.currentYear && (
              <div className="text-[#A1A1AA] text-xs">
                {user.collegeInfo.currentYear}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Join Date */}
      <div className="flex items-center gap-1 text-[#A1A1AA] text-xs">
        <Calendar size={12} />
        <span>Joined {joinedDate}</span>
      </div>
    </div>
  );
};
