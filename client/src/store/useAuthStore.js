import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

const extractErrorMessage = (error, fallback = "Something went wrong") => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return fallback;
};

export const useAuthStore = create((set, get) => ({
  authUser: null,

  // loading states
  isCheckingAuth: false,
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isGitHubAuth: false,

  // === AUTH CHECK ===
  checkAuth: async () => {
    if (get().isCheckingAuth) return; // prevent duplicate calls
    set({ isCheckingAuth: true });

    try {
      const res = await axiosInstance.get("/auth/profile", {
        timeout: 8000, // safeguard slow network
      });
      set({ authUser: res.data });
    } catch (error) {
      //   console.error("❌ Auth check failed:", error);
      set({ authUser : null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // === REGISTER ===
  register: async (data) => {
    if (get().isRegistering) return;
    set({ isRegistering: true });

    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data.user ?? res.data });

      //   if (res.data?.message) toast.success(res.data.message);
      return true;
    } catch (error) {
      const msg = extractErrorMessage(error, "Registration failed");
      //   console.error("❌ Registration error:", error);
      //   toast.error(msg);
      return false;
    } finally {
      set({ isRegistering: false });
    }
  },

  // === LOGIN ===
  login: async (data) => {
    if (get().isLoggingIn) return;
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });

        if (res.data?.message) toast.success(res.data.message);
      return true;
    } catch (error) {

      // console.warn("⚠️ Login failed, attempting auto-register...");
      // if (data?.image) {
      //   try {
      //     const res = await axiosInstance.post("/auth/register", data);
      //     set({ verifiedUser: res.data.user ?? res.data });
      //     return true;
      //   } catch (regErr) {
      //     console.error("❌ Auto-register after login failed:", regErr);
      //     toast.error(extractErrorMessage(regErr, "Login failed"));
      //     return false;
      //   }
      // }

        // console.error("❌ Login error:", error);
      //   toast.error(extractErrorMessage(error, "Login failed"));
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // === LOGOUT ===
  logout: async () => {
    if (get().isLoggingOut) return;
    set({ isLoggingOut: true });

    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful");
      return true;
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast.error(extractErrorMessage(error, "Logout failed"));
      return false;
    } finally {
      set({ isLoggingOut: false });
    }
  },

  // === GITHUB LOGIN/REGISTER ===
  githubAuth: async (code) => {
    if (get().isGitHubAuth) return;
    set({ isGitHubAuth: true });

    try {
      // backend should handle both login & register internally
      const res = await axiosInstance.get("/auth/github");
      set({ authUser: res.data.user ?? res.data });
      if (res.data?.message) toast.success(res.data.message);
      return true;
    } catch (error) {
      const msg = extractErrorMessage(error, "GitHub authentication failed");
      console.error("❌ GitHub auth error:", error);
      toast.error(msg);
      return false;
    } finally {
      set({ isGitHubAuth: false });
    }
  },

}));
