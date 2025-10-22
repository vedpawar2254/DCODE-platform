import { create } from 'zustand';
import { getLeaderboardData } from '../services/statsService';

const useLeaderboardStore = create((set, get) => ({
  users: [],
  pagination: {
    currentPage: 1, // Start at page 1
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 20, // Keep track of limit
  },
  loading: false,     // Default to false, set true only during fetch
  error: null,
  isInitialized: false, // Tracks if the initial fetch has *ever* completed successfully

  filters: {
    leaderboardType: 'stats',
    timeRange: '30',
  },
  sortBy: 'totalCommits',
  sortOrder: 'desc', // API only supports desc

  getActiveFiltersCount: () => {
    const { filters } = get();
    let count = 0;
    if (filters.leaderboardType !== 'stats') count++;
    if (filters.timeRange !== '30') count++;
    return count;
  },

  // Fetches data for the CURRENT page stored in the state
  fetchCurrentPageUsers: async () => {
    // Prevent fetching if already loading
    if (get().loading) {
      console.log(`fetchCurrentPageUsers: Already loading page ${get().pagination.currentPage}, skipping.`);
      return;
    }

    const { filters, sortBy, pagination } = get(); // Get current state
    const pageToFetch = pagination.currentPage; // Use the page number from the state

    console.log(`fetchCurrentPageUsers: Setting loading=true for page ${pageToFetch}.`);
    set({ loading: true, error: null });

    let metric = sortBy;
    if (filters.leaderboardType === 'streak') {
      metric = sortBy;
    }

    const params = {
      metric: metric,
      period: filters.timeRange,
      limit: pagination.limit,
      page: pageToFetch, // Fetch the current page
      includeAll: 'true',
    };

    try {
      console.log(`fetchCurrentPageUsers: Calling API for page ${pageToFetch} with params:`, params);
      const data = await getLeaderboardData(params);
      console.log(`fetchCurrentPageUsers: Received data for page ${pageToFetch}:`, data);

      set((state) => {
        const firstFetchCompleted = !state.isInitialized;
        if (firstFetchCompleted) {
            console.log(`fetchCurrentPageUsers(${pageToFetch}): First fetch successful, setting isInitialized=true.`);
        }
        // Update users and the full pagination object from the API response
        return {
            users: data.users,
            pagination: data.pagination,
            totalUsers: data.pagination.totalCount,
            loading: false, // Set loading false on success
            isInitialized: state.isInitialized || firstFetchCompleted,
            error: null,
        };
      });

    } catch (error) {
       console.error(`fetchCurrentPageUsers(${pageToFetch}): Error fetching:`, error);
      set({ error: error.toString(), loading: false }); // Ensure loading is set false on error
    }
  },

  // Function to change page: Update state first, then fetch
  goToPage: (page) => {
    const { pagination, loading } = get();

    // Prevent action if loading, page is out of bounds, or same page
    if (loading || page < 1 || page > pagination.totalPages || page === pagination.currentPage) {
        console.log(`goToPage(${page}): Request ignored (loading=${loading}, currentPage=${pagination.currentPage}, totalPages=${pagination.totalPages})`);
        return;
    }

    console.log(`goToPage(${page}): Setting currentPage=${page} and triggering fetch.`);
    // **THE FIX**: Set the currentPage in the state *before* fetching
    set((state) => ({
        pagination: { ...state.pagination, currentPage: page }
    }));
    // Now call the fetch function which will use the updated currentPage from the state
    get().fetchCurrentPageUsers();
  },


  // bulkUpdate triggers refetch of page 1 by calling fetchCurrentPageUsers
  bulkUpdate: (newState) => {
    const oldFilters = get().filters;
    const oldSortBy = get().sortBy;
    const isLoading = get().loading;

    if (isLoading) {
        console.log("bulkUpdate: Currently loading, update skipped.");
        return;
    }

    const newFilters = newState.filters ? { ...oldFilters, ...newState.filters } : oldFilters;
    let newSortBy = newState.sortBy || oldSortBy;
    let mustRefetchPage1 = false; // Flag to refetch page 1

    // Check if filters changed
     if ( (newState.filters?.leaderboardType && newState.filters.leaderboardType !== oldFilters.leaderboardType) ||
         (newState.filters?.timeRange && newState.filters.timeRange !== oldFilters.timeRange) )
     {
      mustRefetchPage1 = true;
      if (newFilters.leaderboardType === 'stats') newSortBy = 'totalCommits';
      if (newFilters.leaderboardType === 'pr') newSortBy = 'totalMergedPRs';
      if (newFilters.leaderboardType === 'streak') newSortBy = 'currentStreak';
      console.log('bulkUpdate: Filters changed, mustRefetchPage1=true, newSortBy=', newSortBy);
    }

    // Check if sort criteria changed
    if (newState.sortBy && newState.sortBy !== oldSortBy) {
      mustRefetchPage1 = true;
       console.log('bulkUpdate: SortBy changed, mustRefetchPage1=true');
    }

    // Update state including filters and sort
    set((state) => ({
      ...state,
      ...newState,
      filters: newFilters,
      sortBy: newSortBy,
      // If refetching page 1, reset currentPage in pagination state
      pagination: mustRefetchPage1 ? { ...state.pagination, currentPage: 1 } : state.pagination,
    }));


    if (mustRefetchPage1) {
       console.log('bulkUpdate: Triggering fetchCurrentPageUsers for page 1 due to filter/sort change.');
      get().fetchCurrentPageUsers(); // Fetch page 1 (uses the updated state)
    } else {
        console.log('bulkUpdate called, but no refetch needed.');
    }
  },

  // Initialize fetches page 1 using fetchCurrentPageUsers
  initializeAndFetch: () => {
    if (!get().isInitialized && !get().loading) {
        console.log('initializeAndFetch: Initializing and fetching page 1.');
         // Explicitly set currentPage to 1 before fetching, just in case.
        set(state => ({ pagination: { ...state.pagination, currentPage: 1 } }));
        get().fetchCurrentPageUsers();
    } else {
        console.log(`initializeAndFetch: Skipped (isInitialized=${get().isInitialized}, loading=${get().loading})`);
    }
  },

  clearFilters: () => {
     const { filters, sortBy, loading } = get();
     if (loading) { console.log("clearFilters: Currently loading, clear skipped."); return; }

    if (filters.leaderboardType !== 'stats' || filters.timeRange !== '30' || sortBy !== 'totalCommits') {
        console.log('clearFilters: Clearing filters and fetching page 1.');
        // Set filters/sort and also reset currentPage to 1 before fetching
        set({
          filters: { leaderboardType: 'stats', timeRange: '30' },
          sortBy: 'totalCommits',
          pagination: { ...get().pagination, currentPage: 1 } // Reset page
        });
        get().fetchCurrentPageUsers(); // Fetch page 1
    } else {
        console.log('clearFilters: Filters already default, skipping clear fetch.');
    }
  },

  // --- Dummies ---
  fetchMoreUsers: () => {}, nextPage: () => {}, prevPage: () => {},
  debouncedSearch: () => {}, getURLParams: () => ({}), getSearchSummary: () => '',
  getUserStats: () => ({}),
  // Remove fetchUsersForPage from dummies if it exists
}));

export default useLeaderboardStore;