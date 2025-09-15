import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, Github } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { axiosInstance } from "../../utils/axios";

// === CONSTANTS ===
const INITIAL_FORM_DATA = {
  username: "",
  email: "",
  password: "",
  acceptTerms: false,
};

const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideIn: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  },
};

// === COMPONENTS ===
const LoadingSpinner = ({ size = "w-5 h-5", className = "" }) => (
  <Loader2 className={`${size} animate-spin ${className}`} />
);

const GitHubIcon = ({ className = "w-5 h-5" }) => (
  <Github className={className} />
);

const FormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  children,
}) => (
  <div className="space-y-2">
    <label className="block text-gray-300 text-sm font-medium">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-3 px-0 focus:outline-none focus:border-[#C6FF3D] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {children}
    </div>
  </div>
);

const ActionButton = ({
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "default",
  children,
  className = "",
}) => {
  const baseClasses =
    "font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#C6FF3D] text-black hover:bg-[#B5E632]",
    secondary:
      "bg-transparent border border-gray-300 text-white hover:border-gray-500",
    link: "text-[#C6FF3D] hover:text-[#B5E632] underline bg-transparent",
  };

  const sizes = {
    default: "py-3 px-6",
    large: "py-4 px-8 text-lg",
    small: "py-2 px-4 text-sm",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && <LoadingSpinner size="w-4 h-4" />}
      {children}
    </button>
  );
};

// === MAIN COMPONENT ===
export const RightSide = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessingGitHubCallback, setIsProcessingGitHubCallback] =
    useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const navigate = useNavigate();
  const {
    authUser,
    register,
    login,
    githubAuth,
    checkAuth,
    isRegistering,
    isLoggingIn,
    isGitHubAuth,
    isLoggedIn,
  } = useAuthStore();

  // === COMPUTED VALUES ===
  const isLoading = useMemo(
    () => isRegistering || isLoggingIn || isGitHubAuth,
    [isRegistering, isLoggingIn, isGitHubAuth]
  );

  const canSubmit = useMemo(() => {
    if (isLogin) {
      return formData.email.trim() && formData.password.trim();
    }
    return (
      formData.username.trim() &&
      formData.email.trim() &&
      formData.password.trim() &&
      formData.acceptTerms
    );
  }, [isLogin, formData]);

  // === EVENT HANDLERS ===
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const toggleMode = useCallback(() => {
    setIsLogin((prev) => !prev);
    setFormData(INITIAL_FORM_DATA);
    setShowPassword(false);
  }, []);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();

      if (!canSubmit || isLoading) return;

      try {
        let response;

        if (isLogin) {
          response = await login({
            email: formData.email.trim(),
            password: formData.password,
          });

          if (response) {
            navigate("/dashboard");
          }
        } else {
          response = await register({
            name: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password,
          });
          console.log("after register", response);
          if (response) navigate("/onboarding");
        }
      } catch (error) {
        console.error("Auth error:", error);
        // Error handling is done in the auth store
      }
    },
    [isLogin, formData, canSubmit, isLoading, login, register, navigate]
  );

  const handleGithubAuth = useCallback(async () => {
    if (isGitHubAuth) return;

    try {
      // Silent logout before GitHub auth
      // await axiosInstance.post("/auth/logout").catch(() => {});
      await githubAuth();
    } catch (error) {
      console.error("GitHub auth error:", error);
      // Error handling is done in the auth store
    }
  }, [isGitHubAuth, githubAuth]);

  const handleGitHubCallback = useCallback(
    async (code) => {
      setIsProcessingGitHubCallback(true);

      try {
        const response = await axiosInstance.get(
          `/auth/github/callback?code=${code}`,
          {
            withCredentials: true,
          }
        );
        console.log("GitHub callback response:--------", response);
        const data = response?.data;
        const user = response?.data?.data;

        // const authCheck = await checkAuth();
        if (isLoggedIn) {
          const destination = user?.is_signedup ? "/onboarding" : "/dashboard";
          navigate(destination);
          toast.success(
            data?.message || "Successfully authenticated with GitHub"
          );
        }
      } catch (error) {
        console.error("GitHub callback error:", error);
        toast.error(
          error.response?.data?.errors ||
            "Failed to authenticate with GitHub. Please try again."
        );
      } finally {
        setIsProcessingGitHubCallback(false);
      }
    },
    [checkAuth, isLoggedIn]
  );

  // === EFFECTS ===
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/dashboard");
  //     return;
  //   }

  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get("code");
  //   if (code) {
  //     handleGitHubCallback(code);
  //   }
  // }, [isLoggedIn]);
  useEffect(() => {
    (async () => {
      // window.addEventListener("loadeddata", async () => {
      // window.onload = async () => {
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
              .then((d) => d?.data);

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
            setIsProcessingGitHubCallback(false);
          }
        }
      } else {
        var check = await checkAuth();
        if (check.status) {
          navigate("/dashboard");
        }
      }
      // });
      // };
    })();
    return () => {};
  }, [window]);

  // === RENDER HELPERS ===
  const renderGitHubLoadingState = () => (
    <div className="flex-1 flex items-center justify-center min-h-screen px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-6"
      >
        <LoadingSpinner size="w-12 h-12" className="text-[#C6FF3D] mx-auto" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Signing you in...</h2>
          <p className="text-gray-400">
            Please wait while we authenticate with GitHub
          </p>
        </div>
      </motion.div>
    </div>
  );

  const renderHeader = () => (
    <div className="text-center space-y-6">
      <h1 className="text-3xl font-bold text-white leading-tight">
        {isLogin ? (
          <>
            Welcome Back to the{" "}
            <span className="text-[#C6FF3D]">Fastest Growing</span> Online
            Community
          </>
        ) : (
          <>
            Join the <span className="text-[#C6FF3D]">Fastest Growing</span>{" "}
            Developer Community
          </>
        )}
      </h1>

      <ActionButton
        onClick={handleGithubAuth}
        disabled={isLoading}
        loading={isGitHubAuth}
        variant="secondary"
        className="w-full max-w-xs mx-auto"
      >
        {!isGitHubAuth && <GitHubIcon />}
        {isLogin ? "Sign in with GitHub" : "Sign up with GitHub"}
      </ActionButton>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username Field - Signup Only */}
      {!isLogin && (
        <motion.div
          variants={ANIMATION_VARIANTS.slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <FormField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            disabled={isLoading}
          />
        </motion.div>
      )}

      {/* Email Field */}
      <FormField
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        disabled={isLoading}
      />

      {/* Password Field */}
      <FormField
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        disabled={isLoading}
      >
        <button
          type="button"
          onClick={togglePassword}
          disabled={isLoading}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1 disabled:opacity-50"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </FormField>

      {/* Terms & Submit - Signup Only */}
      {!isLogin && (
        <motion.div
          variants={ANIMATION_VARIANTS.slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-4 h-4 mt-1 accent-[#C6FF3D] disabled:opacity-50"
            />
            <span className="text-gray-400 text-sm leading-relaxed">
              I accept the{" "}
              <Link to="/terms" className="text-[#C6FF3D] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[#C6FF3D] hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
        </motion.div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <ActionButton
          onClick={handleSubmit}
          disabled={!canSubmit}
          loading={isLogin ? isLoggingIn : isRegistering}
          size="large"
          className="w-full"
        >
          {isLogin ? "Sign In" : "Create Account"}
        </ActionButton>
      </div>

      {/* Forgot Password - Login Only */}
      {isLogin && (
        <div className="text-center">
          <ActionButton
            onClick={() => navigate("/forgot-password")}
            disabled={isLoading}
            variant="link"
            size="small"
          >
            Forgot your password?
          </ActionButton>
        </div>
      )}
    </form>
  );

  const renderToggle = () => (
    <div className="text-center">
      <span className="text-gray-400">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <ActionButton
          onClick={toggleMode}
          disabled={isLoading}
          variant="link"
          size="small"
          className="inline"
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </ActionButton>
      </span>
    </div>
  );

  // === MAIN RENDER ===
  if (isProcessingGitHubCallback) {
    return renderGitHubLoadingState();
  }

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen px-4 py-6">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            variants={ANIMATION_VARIANTS.fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-8"
          >
            {renderHeader()}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#121212] text-gray-400">or</span>
              </div>
            </div>
            {renderForm()}
            {renderToggle()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
