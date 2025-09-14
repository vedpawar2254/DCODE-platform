import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import { toast } from "sonner";

const extractErrorMessage = (error, fallback = "Something went wrong") => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.errors) return error.response.data.errors;
  if (error?.message) return error.message;
  return fallback;
};

export const useAuthStore = create((set, get) => ({
  authUser: null,

  // loading states
  isCheckingAuth: null,
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isGitHubAuth: false,
  isLoggedIn: null,
  checkIfLoggedIn: () => {
    return new Promise(async (resolve, reject) => {
      if (!get().isCheckingAuth) {
        resolve({ status: get().isLoggedIn });
      } else {
        resolve({ status: null });
      }
    });
  },
  // === AUTH CHECK ===
  checkAuth: () => {
    return new Promise(async (resolve, reject) => {
      if (get().isCheckingAuth) return; // prevent duplicate calls
      set({ isCheckingAuth: true });

      try {
        const res = await axiosInstance.get("/auth/profile", {
          timeout: 8000, // safeguard slow network
        });
        set({ authUser: res.data, isLoggedIn: true });
        resolve({ status: true, is_signedup: res.data.is_signedup });
      } catch (error) {
        console.error("❌ Auth check failed:", error);
        set({ authUser: null, isLoggedIn: false });
        resolve({ status: false });
      } finally {
        set({ isCheckingAuth: false });
      }
    });
  },

  // === REGISTER ===
  register: async (data) => {
    if (get().isRegistering) return;
    set({ isRegistering: true });

    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data.user ?? res.data });

      if (res.data?.message) toast.success(res.data.message);
      return true;
    } catch (error) {
      const msg = extractErrorMessage(error, "Registration failed");
      console.error("❌ Registration error:", error);
      toast.error(msg);
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
      console.error("❌ Login error:", error);
      toast.error(extractErrorMessage(error, "Login failed"));
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
      console.log("res", res.data);
      if (res?.data?.redirect) {
        window.location.href = res.data.redirect;
        console.log("reloaded");
      }

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

  // === PASSWORD RESET ===
  resetPassword: async (email) => {
    if (get().loading) return { success: false, message: "Request already in progress" };
    
    set({ loading: true });

    try {
      // Validate email on client side
      if (!email || !email.trim()) {
        throw new Error("Email is required");
      }

      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(email.trim())) {
        throw new Error("Please enter a valid email address");
      }

      // Make API call to reset password
      const res = await axiosInstance.post("/auth/forgot-password", {
        email: email.trim().toLowerCase()
      });

      // Handle successful response
      if (res.data.success) {
        console.log("✅ Password reset email sent:", res.data.message);
        return {
          success: true,
          message: res.data.message || "Password reset email sent successfully"
        };
      } else {
        // Handle API-level errors
        const errorMessage = res.data.message || "Failed to send reset email";
        console.error("❌ Password reset failed:", errorMessage);
        return {
          success: false,
          message: errorMessage
        };
      }
    } catch (error) {
      console.error("❌ Password reset error:", error);
      
      // Extract detailed error information
      let errorMessage = "Failed to send reset email. Please try again.";
      
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const data = error.response.data;
        
        switch (status) {
          case 400:
            errorMessage = data.message || "Invalid email address";
            break;
          case 404:
            errorMessage = "No account found with this email address";
            break;
          case 429:
            errorMessage = "Too many requests. Please wait a few minutes before trying again";
            break;
          case 500:
            errorMessage = "Server error. Please try again later";
            break;
          default:
            errorMessage = data.message || extractErrorMessage(error, "Failed to send reset email");
        }
      } else if (error.request) {
        // Network error
        errorMessage = "Network error. Please check your connection and try again";
      } else if (error.message) {
        // Client-side validation or other errors
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage
      };
    } finally {
      set({ loading: false });
    }
  },

  // === LOADING STATE ===
  loading: false,
}));
