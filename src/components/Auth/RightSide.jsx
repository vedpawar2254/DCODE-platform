import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { axiosInstance } from "../../utils/axios";

export const RightSide = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessingGitHubCallback, setIsProcessingGitHubCallback] =
    useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      password: "",
      acceptTerms: false,
    });
  };
  const {
    loading,
    error,
    register,
    login,
    githubAuth,
    checkAuth,
    isRegistering,
    isLoggingIn,
    isGitHubAuth,
  } = useAuthStore();
  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const response = await login({
          email: formData.email,
          password: formData.password,
        });
        if (response) {
          navigate("/dashboard");
        }
      } else {
        if (!formData.acceptTerms) {
          toast.error("Please accept the terms and conditions");
          return;
        }
        const response = await register({
          name: formData.username,
          email: formData.email,
          password: formData.password,
        });
        if (response) {
          navigate("/onboarding");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);

      // Handle errors from the auth store
      if (error?.response?.data?.errors) {
        if (Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach((err) => {
            toast.error(err.message || err);
          });
        } else {
          toast.error(
            error.response.data.errors.message || error.response.data.errors
          );
        }
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          isLogin
            ? "Login failed. Please try again."
            : "Registration failed. Please try again."
        );
      }
    }
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleLogout = async () => {
    await axiosInstance.post("/auth/logout");
  };

  const handleGithub = async () => {
    try {
      handleLogout();
      await githubAuth();
    } catch (error) {
      console.error("GitHub auth initiation error:", error);

      if (error?.response?.data?.errors) {
        if (Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach((err) => {
            toast.error(err.message || err);
          });
        } else {
          toast.error(
            error.response.data.errors.message || error.response.data.errors
          );
        }
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Failed to initiate GitHub authentication. Please try again."
        );
      }
    }
  };
  useEffect(() => {
    (async () => {
      var check = await checkAuth();
          if (check.status) {
            navigate("/dashboard");
          }
      window.onload = async () => {
        if (window?.location?.search) {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get("code");
          if (code) {
            setIsProcessingGitHubCallback(true);
            try {
              var axres = await axiosInstance
                .get("/auth/github/callback?code=" + code, {
                  withCredentials: true,
                })
                .then((d) => d.data);

              // Check for errors in the response
              if (axres?.errors) {
                // Display all errors as toast notifications
                if (Array.isArray(axres.errors)) {
                  axres.errors.forEach((error) => {
                    toast.error(error.message || error);
                  });
                } else {
                  toast.error(axres.errors.message || axres.errors);
                }
                setIsProcessingGitHubCallback(false);
                return;
              }

              var check = await checkAuth();
              if (axres?.data?.is_signedup) {
                if (check.status) {
                  navigate("/onboarding");
                }
              } else {
                if (check.status) {
                  navigate("/dashboard");
                }
              }
            } catch (error) {
              console.error("GitHub auth error:", error);

              // Show toast error for network or other errors
              if (error.response?.data?.errors) {
                if (Array.isArray(error.response.data.errors)) {
                  error.response.data.errors.forEach((err) => {
                    toast.error(err.message || err);
                  });
                } else {
                  toast.error(
                    error.response.data.errors.message ||
                      error.response.data.errors
                  );
                }
              } else if (error.response?.data?.message) {
                toast.error(error.response.data.message);
              } else {
                toast.error(
                  "Failed to authenticate with GitHub. Please try again."
                );
              }

              setIsProcessingGitHubCallback(false);
            }
          }
        }
      };
    })();
    return () => {};
  }, [window]);

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen px-4 py-6 lg:p-8">
      <div className="w-full max-w-md">{isProcessingGitHubCallback ? (
          /* GitHub Callback Loading State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-[#BCDD19] border-t-transparent rounded-full animate-spin"></div>
              <h2 className="text-xl lg:text-2xl font-bold text-white">Logging in...</h2>
              <p className="text-gray-400 text-sm lg:text-base">
                Please wait while we sign you in with GitHub
              </p>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6 lg:space-y-8"
            >
              {/* Header */}
              <div className="text-center space-y-4 lg:space-y-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight px-2">
                  {isLogin ? (
                    <>
                      Welcome Back to the{" "}
                      <span className="text-[#BCDD19]">Fastest Growing</span>{" "}
                      Online Community
                    </>
                  ) : (
                    <>
                      Join & Connect the{" "}
                      <span className="text-[#BCDD19]">Fastest Growing</span>{" "}
                      Online Community
                    </>
                  )}
                </h1>

                {/* GitHub Button */}
                <button
                  onClick={handleGithub}
                  className="w-full max-w-xs mx-auto flex items-center justify-center gap-3 bg-transparent border border-gray-300 text-white py-3 px-4 lg:px-6 rounded-full hover:border-gray-500 transition-colors duration-200 mt-6 lg:mt-15 mb-6 lg:mb-15 cursor-pointer text-sm lg:text-base"
                  disabled={loading}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>
                    {isLogin ? "Sign in with Github" : "Sign up with Github"}
                    {loading ? "..." : ""}
                  </span>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Form */}
              <div className="space-y-4 lg:space-y-6 mt-6 lg:mt-8">
                {/* Username Field (Only for Signup) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className=""
                  >
                    <label className="block text-gray-300 text-sm">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="johndev"
                      className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-2 lg:py-3 px-0 focus:outline-none focus:border-[#918EF4] transition-colors duration-200"
                      disabled={loading}
                    />
                  </motion.div>
                )}

                {/* Email Field */}
                <div className="">
                  <label className="block text-gray-300 text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-2 lg:py-3 px-0 focus:outline-none focus:border-[#918EF4] transition-colors duration-200"
                    disabled={loading}
                  />
                </div>

                {/* Password Field */}
                <div className="">
                  <label className="block text-gray-300 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••••••••••"
                      className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-2 lg:py-3 px-0 focus:outline-none focus:border-[#918EF4] transition-colors duration-200"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer p-1"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox and Button Inline (Only for Signup) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 pt-4"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-[#918EF4] cursor-pointer"
                        disabled={loading}
                      />
                      <label
                        className="text-gray-400 text-sm cursor-pointer"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            acceptTerms: !prev.acceptTerms,
                          }))
                        }
                      >
                        I accept the terms & Condition
                      </label>
                    </div>
                    {/* Inline Submit Button for Signup */}
                    <button
                      onClick={handleSubmit}
                      className="bg-[#7A900F] text-white font-semibold py-3 px-6 lg:px-8 rounded-full hover:bg-[#7A900F]/80 transition-colors duration-200 text-sm flex-shrink-0 cursor-pointer"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "SIGN UP"}
                    </button>
                  </motion.div>
                )}

                {/* Full Width Submit Button for Login */}
                {isLogin && (
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#7A900F] text-white font-semibold py-3 lg:py-4 px-6 rounded-full hover:bg-[#7A900F]/80 transition-colors duration-200 text-base lg:text-lg mt-8 lg:mt-15 cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "SIGN IN"}
                  </button>
                )}
              </div>

              {/* Toggle Mode */}
              <div className="text-center pt-6 lg:pt-8 mt-4">
                <span className="text-gray-400 text-sm lg:text-base">
                  {isLogin ? "Don't have an Account? " : "Own an Account? "}
                  <button
                    onClick={toggleMode}
                    className="hover:text-lime-300 transition-colors duration-200 font-medium underline cursor-pointer"
                    disabled={loading}
                  >
                    {isLogin ? "SIGN UP" : "JUMP RIGHT IN"}
                  </button>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
