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
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProjects: 0,
  },
  filters: {
    search: '',
    tags: [],
    tech: [], 
  },
  sort: 'newest', 
  loadingList: false,
  error: null,

  // ACTIONS
  fetchProjects: async () => {
    set({ loadingList: true, error: null });
    const { filters, sort, pagination } = get();

    try {
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 9,
        search: filters.search,
        sort: sort,
      });

      if (filters.tags.length > 0) params.append('tags', filters.tags.join(','));
      if (filters.tech.length > 0) params.append('tech_stack', filters.tech.join(','));

      
      const response = await axiosInstance.get(`/project/get-all/?${params.toString()}`);
      
      const responseData = response.data.data || {};
      
      const projects = Array.isArray(responseData.projects) ? responseData.projects : [];
      const total = responseData.total || 0;
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
      console.error('Fetch Projects Error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch projects.';
      set({ error: errorMessage, loadingList: false, projects: [] });
    }
  },

  // Filter and Sort Actions
  setSearch: (query) => {
    set((state) => ({
      filters: { ...state.filters, search: query },
      pagination: { ...state.pagination, currentPage: 1 } 
    }));
    get().debouncedFetchProjects();
  },

  setFilter: (type, value) => {
    set(state => ({
        filters: { ...state.filters, [type]: value },
        pagination: { ...state.pagination, currentPage: 1 }
    }));
    get().fetchProjects();
  },

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
  
  debouncedFetchProjects: debounce(() => get().fetchProjects(), 500),

  clearFiltersAndSearch: () => {
    set({
      filters: { search: '', tags: [], tech: [] },
      sort: 'newest',
      pagination: { ...get().pagination, currentPage: 1 },
    });
    get().fetchProjects();
  },
}));