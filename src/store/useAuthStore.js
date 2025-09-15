import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import { toast } from "sonner";

const extractErrorMessage = (error, fallback = "Something went wrong") => {
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
  loading: false,
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
        resolve({ status: true });
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
      console.log("res----", res);
      set({ authUser: res.data.data ?? res.data });
      if (res.data?.message) toast.success(res.data.message);
      return true;
    } catch (error) {
      console.error("❌ Registration error:", error);
      toast.error(error.response?.data?.errors || "Registration failed");
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
      //     set({ authUser: res.data.user ?? res.data });
      //     return true;
      //   } catch (regErr) {
      //     console.error("❌ Auto-register after login failed:", regErr);
      //     toast.error(extractErrorMessage(regErr, "Login failed"));
      //     return false;
      //   }
      // }

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

  // === EMAIL VERIFICATION ===
  verifyEmail: async (token) => {
    if (get().loading)
      return { success: false, message: "Request already in progress" };

    set({ loading: true });

    try {
      // Validate token on client side
      if (!token || !token.trim()) {
        throw new Error("Verification token is required");
      }

      // Make API call to verify email
      const res = await axiosInstance.post("/auth/verify-email", {
        token: token.trim(),
      });

      // Handle successful response
      if (res.data.success) {
        console.log("✅ Email verified successfully:", res.data.message);

        // Update user in store to reflect verification status
        // const currentUser = get().authUser;
        // if (currentUser) {
        //   set({
        //     authUser: {
        //       ...currentUser,
        //       is_verified: true,
        //       email_verified_at: new Date().toISOString(),
        //     },
        //   });
        // }
        toast.success(res.data.message || "Email verified successfully");
        return {
          success: true,
          message: res.data.message || "Email verified successfully",
        };
      } else {
        // Handle API-level errors
        const errorMessage = res.data.message || "Failed to verify email";
        console.error("❌ Email verification failed:", errorMessage);
        toast.error(errorMessage);
        return {
          success: false,
        };
      }
    } catch (error) {
      console.error("❌ Email verification error:", error);
      toast.error(extractErrorMessage(error, "Email verification failed"));
      return {
        success: false,
      };
    } finally {
      set({ loading: false });
    }
  },

  // === RESEND VERIFICATION EMAIL ===
  resendVerificationEmail: async (email) => {
    if (get().loading)
      return { success: false, message: "Request already in progress" };

    set({ loading: true });

    try {
      // Validate email on client side
      if (!email || !email.trim()) {
        throw new Error("Email is required");
      }

      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(email.trim())) {
        throw new Error("Please enter a valid email address");
      }

      // Make API call to resend verification email
      const res = await axiosInstance.post("/auth/resend-verification", {
        email: email.trim().toLowerCase(),
      });

      // Handle successful response
      if (res.data.success) {
        console.log("✅ Verification email resent:", res.data.message);
        return {
          success: true,
          message: res.data.message || "Verification email sent successfully",
        };
      } else {
        // Handle API-level errors
        const errorMessage =
          res.data.message || "Failed to send verification email";
        console.error("❌ Resend verification failed:", errorMessage);
        return {
          success: false,
          message: errorMessage,
        };
      }
    } catch (error) {
      console.error("❌ Resend verification email error:", error);

      // Extract detailed error information
      toast.error(extractErrorMessage(error, "Failed to resend email"));

      return {
        success: false,
      };
    } finally {
      set({ loading: false });
    }
  },

  // === PASSWORD RESET ===
  resetPassword: async (email) => {
    if (get().loading)
      return { success: false, message: "Request already in progress" };

    set({ loading: true });

    try {
      // Validate email on client side
      if (!email || !email.trim()) {
        const message = "Email is required";
        toast.error(message);
        return { success: false, message };
      }

      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(email.trim())) {
        const message = "Please enter a valid email address";
        toast.error(message);
        return { success: false, message };
      }

      // Make API call to reset password
      const res = await axiosInstance.post("/auth/forgot-password", {
        email: email.trim().toLowerCase(),
      });

      // Handle successful response
      if (res.data.success) {
        console.log("✅ Password reset email sent:", res.data.message);
        const message = res.data.message || "Password reset email sent successfully";
        toast.success(message);
        return { success: true, message };
      } else {
        // Handle API-level errors
        const message = res.data.message || "Failed to send reset email";
        console.error("❌ Password reset failed:", message);
        toast.error(message);
        return { success: false, message };
      }
    } catch (error) {
      console.error("❌ Password reset error:", error);

      // Extract detailed error information
      const message = extractErrorMessage(error, "Failed to send reset email. Please try again.");
      toast.error(message);

      return { success: false, message };
    } finally {
      set({ loading: false });
    }
  },

  // === CONFIRM PASSWORD RESET ===
  confirmPasswordReset: async (token, newPassword) => {
    if (get().loading)
      return { success: false, message: "Request already in progress" };

    set({ loading: true });

    try {
      // Validate inputs on client side
      if (!token || !token.trim()) {
        const message = "Reset token is required";
        toast.error(message);
        return { success: false, message };
      }

      if (!newPassword || !newPassword.trim()) {
        const message = "New password is required";
        toast.error(message);
        return { success: false, message };
      }

      // Make API call to confirm password reset
      const res = await axiosInstance.post("/auth/reset-password", {
        token: token.trim(),
        password: newPassword.trim(),
      });

      // Handle successful response
      if (res.data.success) {
        console.log("✅ Password reset confirmed:", res.data.message);

        // Clear any existing user session since password has changed
        set({ authUser: null });
        const message = res.data.message || "Password has been reset successfully";
        toast.success(message);
        return { success: true, message };
      } else {
        // Handle API-level errors
        const message = res.data.message || "Failed to reset password";
        console.error("❌ Password reset confirmation failed:", message);
        toast.error(message);
        return { success: false, message };
      }
    } catch (error) {
      console.error("❌ Password reset confirmation error:", error);

      const message = extractErrorMessage(error, "Failed to reset password. Please try again.");
      toast.error(message);
      return { success: false, message };
    } finally {
      set({ loading: false });
    }
  },

  // === CHANGE PASSWORD (for authenticated users) ===
  changePassword: async (currentPassword, newPassword) => {
    if (get().loading)
      return { success: false, message: "Request already in progress" };

    set({ loading: true });

    try {
      // Validate inputs on client side
      if (!currentPassword || !currentPassword.trim()) {
        const message = "Current password is required";
        toast.error(message);
        return { success: false, message };
      }

      if (!newPassword || !newPassword.trim()) {
        const message = "New password is required";
        toast.error(message);
        return { success: false, message };
      }

      if (currentPassword.trim() === newPassword.trim()) {
        const message = "New password must be different from current password";
        toast.error(message);
        return { success: false, message };
      }

      // Make API call to change password
      const res = await axiosInstance.post("/auth/change-password", {
        oldPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
      });

      // Handle successful response
      if (res.data.success) {
        console.log("✅ Password changed successfully:", res.data.message);
        const message = res.data.message || "Password changed successfully";
        toast.success(message);
        return { success: true, message };
      } else {
        // Handle API-level errors
        const message = res.data.message || "Failed to change password";
        console.error("❌ Password change failed:", message);
        toast.error(message);
        return { success: false, message };
      }
    } catch (error) {
      console.error("❌ Password change error:", error);

      const message = extractErrorMessage(error, "Failed to change password. Please try again.");
      toast.error(message);
      return { success: false, message };
    } finally {
      set({ loading: false });
    }
  },
}));
