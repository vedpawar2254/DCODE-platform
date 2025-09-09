import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

const useAllUsersStore = create((set, get) => ({
  // State
  users: [],
  totalUsers: 0,
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 12,
  loading: false,
  error: null,
  
  // Loading states for different operations
  searchLoading: false,
  filterLoading: false,
  
  // Search and filters
  searchQuery: "",
  sortBy: "createdAt", // Join date
  sortOrder: "desc",
  filters: {
    location: "",
    college: "",
    experience_level: "",
    hasGithub: false,
  },
  
  // Cache for performance
  cache: new Map(),
  lastFetchTime: null,
  cacheExpiry: 30 * 60 * 1000, // 30 minutes
  
  // URL sync state
  isInitialized: false,
  
  // Performance state
  searchDebounceTimer: null,

  // Actions
  setUsers: (users) => set({ users }),
  
  setLoading: (loading) => set({ loading }),
  
  setSearchLoading: (searchLoading) => set({ searchLoading }),
  
  setFilterLoading: (filterLoading) => set({ filterLoading }),
  
  setError: (error) => set({ error }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  setSearchQuery: (query) => set({ 
    searchQuery: query,
    currentPage: 1 // Reset to first page on search
  }),
  
  setSortBy: (sortBy) => set({ 
    sortBy,
    currentPage: 1 // Reset to first page on sort change
  }),
  
  setSortOrder: (sortOrder) => set({ sortOrder }),
  
  setFilter: (key, value) => set((state) => ({
    filters: {
      ...state.filters,
      [key]: value
    },
    currentPage: 1 // Reset to first page on filter change
  })),
  
  setFilters: (filters) => set({ 
    filters,
    currentPage: 1 
  }),
  
  clearFilters: () => set({
    searchQuery: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    filters: {
      location: "",
      college: "",
      experience_level: "",
      hasGithub: false,
    },
    currentPage: 1,
  }),
  
  // Initialize store from URL parameters
  initializeFromURL: (searchParams) => set((state) => {
    const urlSearchQuery = searchParams.get('search') || '';
    const urlSortBy = searchParams.get('sortBy') || 'createdAt';
    const urlSortOrder = searchParams.get('sortOrder') || 'desc';
    const urlPage = parseInt(searchParams.get('page')) || 1;
    const urlFilters = {
      location: searchParams.get('location') || '',
      college: searchParams.get('college') || '',
      experience_level: searchParams.get('experience_level') || '',
      hasGithub: searchParams.get('hasGithub') === 'true',
    };

    return {
      searchQuery: urlSearchQuery,
      sortBy: urlSortBy,
      sortOrder: urlSortOrder,
      currentPage: urlPage,
      filters: urlFilters,
      isInitialized: true,
    };
  }),
  
  // Get URL parameters from current state
  getURLParams: () => {
    const state = get();
    const params = new URLSearchParams();

    if (state.searchQuery) params.set('search', state.searchQuery);
    if (state.sortBy !== 'joinedAt') params.set('sortBy', state.sortBy);
    if (state.sortOrder !== 'desc') params.set('sortOrder', state.sortOrder);
    if (state.currentPage !== 1) params.set('page', state.currentPage.toString());
    if (state.filters.location) params.set('location', state.filters.location);
    if (state.filters.college) params.set('college', state.filters.college);
    if (state.filters.experience_level) params.set('experience_level', state.filters.experience_level);
    if (state.filters.hasGithub) params.set('hasGithub', 'true');

    return params;
  },

  // Generate cache key based on current filters and search
  getCacheKey: () => {
    const state = get();
    const params = {
      page: state.currentPage,
      search: state.searchQuery,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
      ...state.filters,
    };
    
    // Remove empty values
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === false || 
          (Array.isArray(params[key]) && params[key].length === 0)) {
        delete params[key];
      }
    });
    
    return JSON.stringify(params);
  },

  // Check if cache is valid
  isCacheValid: (cacheKey) => {
    const state = get();
    const cached = state.cache.get(cacheKey);
    if (!cached) return false;
    
    const now = Date.now();
    return (now - cached.timestamp) < state.cacheExpiry;
  },

  // Fetch users from API
  fetchUsers: async () => {
    const state = get();
    const cacheKey = state.getCacheKey();
    
    // Check cache first
    if (state.isCacheValid(cacheKey)) {
      const cached = state.cache.get(cacheKey);
      set({
        users: cached.users,
        totalUsers: cached.totalUsers,
        totalPages: cached.totalPages,
        loading: false,
        error: null,
      });
      return;
    }

    try {
      set({ loading: true, error: null });

      const params = {
        page: state.currentPage,
        limit: state.itemsPerPage,
        search: state.searchQuery,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
        ...state.filters,
      };

      // Remove empty params
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === false || 
            (Array.isArray(params[key]) && params[key].length === 0)) {
          delete params[key];
        }
      });

      const response = await axiosInstance.get('/users', { params });
      
      if (response.data.success) {
        const users = response.data.data.users || [];
        const totalUsers = response.data.data.total || 0;
        const totalPages = Math.ceil(totalUsers / state.itemsPerPage);

        // Cache the result
        state.cache.set(cacheKey, {
          users,
          totalUsers,
          totalPages,
          timestamp: Date.now(),
        });

        set({
          users,
          totalUsers,
          totalPages,
          loading: false,
          error: null,
          lastFetchTime: Date.now(),
        });
      } else {
        throw new Error(response.data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      set({
        loading: false,
        error: error.response?.data?.message || error.message || 'Failed to load users. Please try again.',
        users: [],
        totalUsers: 0,
        totalPages: 0,
      });
    }
  },

  // Fetch single user by username
  fetchUserByUsername: async (username) => {
    try {
      const response = await axiosInstance.get(`/users/github/${username}`);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'User not found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Search users by query
  searchUsers: async (query) => {
    set({ searchQuery: query, currentPage: 1 });
    await get().fetchUsers();
  },
  
  // Debounced search for real-time search
  debouncedSearch: (query, delay = 300) => {
    const state = get();
    
    // Clear existing timer
    if (state.searchDebounceTimer) {
      clearTimeout(state.searchDebounceTimer);
    }
    
    // Set new timer
    const timer = setTimeout(async () => {
      await state.searchUsers(query);
      set({ searchDebounceTimer: null });
    }, delay);
    
    set({ searchDebounceTimer: timer });
  },
  
  // Initialize and fetch - optimized for component mounting
  initializeAndFetch: async (searchParams) => {
    const state = get();
    
    // Only initialize from URL if not already done
    if (!state.isInitialized) {
      state.initializeFromURL(searchParams);
    }
    
    // Fetch users
    await state.fetchUsers();
  },

  // Apply filters and fetch
  applyFilters: async (newFilters) => {
    set({ 
      filters: { ...get().filters, ...newFilters },
      currentPage: 1 
    });
    await get().fetchUsers();
  },
  
  // Bulk update multiple state values and fetch once
  bulkUpdate: async (updates) => {
    const currentState = get();
    const newState = { ...updates };
    
    // Reset to page 1 if filters/search/sort changed
    if (updates.filters || updates.searchQuery || updates.sortBy || updates.sortOrder) {
      newState.currentPage = 1;
    }
    
    set(newState);
    await currentState.fetchUsers();
  },

  // Sort users and fetch
  sortUsers: async (sortBy, sortOrder = null) => {
    const currentSortOrder = sortOrder || (get().sortBy === sortBy 
      ? (get().sortOrder === 'asc' ? 'desc' : 'asc') 
      : 'desc');
    
    set({ 
      sortBy, 
      sortOrder: currentSortOrder,
      currentPage: 1 
    });
    await get().fetchUsers();
  },

  // Go to specific page
  goToPage: async (page) => {
    if (page >= 1 && page <= get().totalPages) {
      set({ currentPage: page });
      await get().fetchUsers();
    }
  },

  // Go to next page
  nextPage: async () => {
    const state = get();
    if (state.currentPage < state.totalPages) {
      await state.goToPage(state.currentPage + 1);
    }
  },

  // Go to previous page
  prevPage: async () => {
    const state = get();
    if (state.currentPage > 1) {
      await state.goToPage(state.currentPage - 1);
    }
  },

  // Refresh data (bypass cache)
  refreshUsers: async () => {
    const state = get();
    const cacheKey = state.getCacheKey();
    state.cache.delete(cacheKey);
    await state.fetchUsers();
  },

  // Clear cache
  clearCache: () => set((state) => {
    state.cache.clear();
    return { cache: new Map() };
  }),

  // Get user stats
  getUserStats: () => {
    const state = get();
    return {
      totalUsers: state.totalUsers,
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      itemsPerPage: state.itemsPerPage,
      hasNextPage: state.currentPage < state.totalPages,
      hasPrevPage: state.currentPage > 1,
      startIndex: (state.currentPage - 1) * state.itemsPerPage + 1,
      endIndex: Math.min(state.currentPage * state.itemsPerPage, state.totalUsers),
    };
  },

  // Get active filters count
  getActiveFiltersCount: () => {
    const state = get();
    let count = 0;
    
    if (state.searchQuery) count++;
    if (state.filters.location) count++;
    if (state.filters.college) count++;
    if (state.filters.experience_level) count++;
    if (state.filters.hasGithub) count++;
    
    return count;
  },
  
  // Get search and filter summary
  getSearchSummary: () => {
    const state = get();
    const stats = state.getUserStats();
    return {
      ...stats,
      hasActiveFilters: state.getActiveFiltersCount() > 0,
      hasSearchQuery: Boolean(state.searchQuery),
      isFiltered: state.getActiveFiltersCount() > 0 || Boolean(state.searchQuery),
      displayText: state.searchQuery 
        ? `Search results for "${state.searchQuery}"` 
        : state.getActiveFiltersCount() > 0 
          ? `Filtered results (${state.getActiveFiltersCount()} filters active)`
          : "All developers",
    };
  },

  // Export current state (for debugging)
  exportState: () => {
    const state = get();
    return {
      users: state.users,
      totalUsers: state.totalUsers,
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      searchQuery: state.searchQuery,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
      filters: state.filters,
      loading: state.loading,
      error: state.error,
      stats: state.getUserStats(),
      activeFiltersCount: state.getActiveFiltersCount(),
    };
  },
}));

export default useAllUsersStore;