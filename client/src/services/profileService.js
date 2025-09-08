import { axiosInstance } from "../utils/axios";

export const profileService = {
  // Get user aggregate stats
  getTopProjects: async () => {
    try {
      const response = await axiosInstance.get(`/prs/my/top-repositories`);
      if (response.data.success) {
        return response.data.message.repositories;
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching user stats:", error);
      throw error;
    }
  },
};
