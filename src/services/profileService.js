import { axiosInstance } from "../utils/axios";

export const profileService = {
  // Get user aggregate stats
  getTopProjects: async (userId) => {
    try {
      const response = await axiosInstance.get(userId ? `/prs/user/${userId}/top-repositories?limit=2` : `/prs/my/top-repositories?limit=2`);
      if (response.data.success) {
        return response.data.message.repositories;
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching user stats:", error);
      throw error;
    }
  },
  // Get user profile by ID
  getUserByUsername: async (username) => {
    try {
      const response = await axiosInstance.get(`/users/github/${username}`);
      if (response.data.success) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },
};









// import { axiosInstance } from "../utils/axios";

// export const profileService = {
//   // Get user aggregate stats
//   getTopProjects: async (userId = null) => {
//     try {
//       const endpoint = userId
//         ? `/prs/user/${userId}/top-repositories`
//         : `/prs/my/top-repositories`;
//       const response = await axiosInstance.get(endpoint);
//       if (response.data.success) {
//         return response.data.message.repositories;
//       }
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching user stats:", error);
//       throw error;
//     }
//   },

//   // Get user profile by ID
//   getUserById: async (userId) => {
//     try {
//       const response = await axiosInstance.get(`/users/${userId}`);
//       if (response.data.success) {
//         return response.data.data;
//       }
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       throw error;
//     }
//   },
// };
