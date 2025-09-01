import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "production"
      ? `${import.meta.env.VITE_BACKEND_URL}/api/v1`
      : `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  withCredentials: true,
});
