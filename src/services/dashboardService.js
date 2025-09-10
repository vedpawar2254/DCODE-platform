import { axiosInstance } from "../utils/axios";

export const dashboardService = {
  // Get user aggregate stats
  getUserStats: async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/stats/user/${userId}/aggregate`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user stats:", error);
      throw error;
    }
  },

  // Get user profile data
  getUserProfile: async () => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  // Get latest PRs
  getLatestPRs: async (limit = 5) => {
    try {
      const response = await axiosInstance.get(
        `/prs/my/latest?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching latest PRs:", error);
      throw error;
    }
  },
};
