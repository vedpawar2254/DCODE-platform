import { create } from 'zustand';
import { axiosInstance } from '@/utils/axios';

// Debounce function to prevent API calls on every keystroke
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const useRepositoriesStore = create((set, get) => ({
  // STATE
  projects: [],
  currentProject: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProjects: 0,
  },
  filters: {
    search: '',
    tags: [],
    tech: [], // Frontend state can be 'tech' for simplicity
  },
  // Simplified sort to match backend ('newest', 'oldest', 'stars')
  sort: 'newest', 
  loadingList: false,
  loadingDetails: false,
  error: null,

  // ACTIONS
  fetchProjects: async () => {
    set({ loadingList: true, error: null });
    const { filters, sort, pagination } = get();

    try {
      // Construct params to match the backend controller
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 9,
        search: filters.search,
        sort: sort,
      });

      if (filters.tags.length > 0) params.append('tags', filters.tags.join(','));
      // Send 'tech_stack' as the parameter name to the backend
      if (filters.tech.length > 0) params.append('tech_stack', filters.tech.join(','));

      const response = await axiosInstance.get(`/project/get-all?${params.toString()}`);
      
      console.log('API Response:', response.data);

      // --- FIX: Intelligently parse the API response ---
      const responseData = response.data.data || {};
      
      // Check if the response data is an object with a 'projects' array (paginated response)
      // or if it's the array directly (simple response).
      const projects = Array.isArray(responseData.projects) ? responseData.projects : (Array.isArray(responseData) ? responseData : []);
      const total = responseData.total || projects.length;
      const page = responseData.page || 1;
      const totalPages = responseData.totalPages || 1;

      set({
        projects: projects,
        pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalProjects: total,
        },
        loadingList: false,
      });
    } catch (err) {
      console.error('Fetch Projects Error:', err); // Log the full error object
      const errorMessage = err.response?.data?.message || 'Failed to fetch projects.';
      set({ error: errorMessage, loadingList: false, projects: [] }); // Also ensure projects is an array on error
    }
  },

  fetchProjectById: async (id) => {
    set({ loadingDetails: true, error: null, currentProject: null });
    try {
      // This endpoint is for fetching a single project by its ID
      const response = await axiosInstance.get(`/project/${id}`);
      set({ currentProject: response.data.data, loadingDetails: false });
    } catch (err)      {
      const errorMessage = err.response?.data?.message || 'Failed to fetch project details.';
      set({ error: errorMessage, loadingDetails: false });
    }
  },

  // Filter and Sort Actions
  setSearch: (query) => {
    set((state) => ({
      filters: { ...state.filters, search: query },
      pagination: { ...state.pagination, currentPage: 1 } // Reset to first page
    }));
    // Debounce the fetch call for better UX
    get().debouncedFetchProjects();
  },

  // `type` should be 'tags' or 'tech'
  setFilter: (type, value) => {
    set(state => ({
        filters: { ...state.filters, [type]: value },
        pagination: { ...state.pagination, currentPage: 1 }
    }));
    get().fetchProjects();
  },

  // `newSort` will be 'newest', 'oldest', or 'stars'
  setSort: (newSort) => {
    set({ sort: newSort });
    get().fetchProjects();
  },

  goToPage: (page) => {
    set((state) => ({
      pagination: { ...state.pagination, currentPage: page },
    }));
    get().fetchProjects();
  },
  
  // A debounced version of fetchProjects for use with the search input
  debouncedFetchProjects: debounce(() => get().fetchProjects(), 500),

  // Action to clear all filters and search
  clearFiltersAndSearch: () => {
    set({
      filters: { search: '', tags: [], tech: [] },
      sort: 'newest',
      pagination: { ...get().pagination, currentPage: 1 },
    });
    get().fetchProjects();
  },
}));