import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
  Send,
  Eye,
  EyeOff,
  Loader2,
  Settings as SettingsIcon,
  ArrowLeft,
  Github,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";

// === CONSTANTS ===
const TABS = {
  ACCOUNT: "account",
  SECURITY: "security",
  EMAIL: "email",
};

const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideIn: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
};

// === COMPONENTS ===
const TabButton = ({ active, onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
      active
        ? "bg-[#C6FF3D] text-black font-semibold"
        : "text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
    }`}
  >
    <Icon className="w-5 h-5" />
    {children}
  </button>
);

const SettingsCard = ({ title, description, children, className = "" }) => (
  <motion.div
    className={`bg-[#1A1A1A] border border-[#23252B] rounded-xl p-6 ${className}`}
    variants={ANIMATION_VARIANTS.fadeIn}
    initial="initial"
    animate="animate"
    transition={{ duration: 0.3 }}
  >
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
    {children}
  </motion.div>
);

const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  error = null,
  children,
}) => (
  <div className="space-y-2">
    <label className="block text-white font-medium text-sm">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
          error
            ? "border-red-500 focus:border-red-400"
            : "border-[#3A3A3A] focus:border-[#C6FF3D]"
        }`}
      />
      {children}
    </div>
    {error && (
      <motion.p
        className="text-red-400 text-sm flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <AlertCircle className="w-4 h-4" />
        {error}
      </motion.p>
    )}
  </div>
);

const ActionButton = ({
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  children,
  className = "",
}) => {
  const baseClasses =
    "font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#C6FF3D] text-black hover:bg-[#B5E632]",
    secondary:
      "bg-transparent border border-[#3A3A3A] text-white hover:border-[#C6FF3D]",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

// === MAIN COMPONENT ===
const Settings = () => {
  const navigate = useNavigate();
  const {
    authUser,
    loading,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
    confirmPasswordReset,
    changePassword,
  } = useAuthStore();

  // State
  const [activeTab, setActiveTab] = useState(TABS.ACCOUNT);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Email verification state
  const [verificationState, setVerificationState] = useState({
    isResending: false,
    cooldown: 0,
  });

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Forgot password state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordState, setForgotPasswordState] = useState({
    isSubmitted: false,
    isLoading: false,
  });

  // === EFFECTS ===
  useEffect(() => {
    let timer;
    if (verificationState.cooldown > 0) {
      timer = setInterval(() => {
        setVerificationState((prev) => ({
          ...prev,
          cooldown: prev.cooldown - 1,
        }));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [verificationState.cooldown]);

  // === HELPER FUNCTIONS ===
  // Check if user is authenticated via GitHub only (no password functionality)
  const isGitHubOnlyUser = authUser?.data?.is_github_login === true;

  // === HANDLERS ===
  const handleResendVerification = useCallback(async () => {
    if (!authUser?.data?.email || verificationState.cooldown > 0) return;

    setVerificationState((prev) => ({ ...prev, isResending: true }));

    try {
      const result = await resendVerificationEmail(authUser.data.email);
      if (result.success) {
        setVerificationState((prev) => ({ ...prev, cooldown: 60 }));
        toast.success("Verification email sent successfully!");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
    } finally {
      setVerificationState((prev) => ({ ...prev, isResending: false }));
    }
  }, [authUser?.data?.email, verificationState.cooldown, resendVerificationEmail]);

  const validatePassword = useCallback((password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    return errors;
  }, []);

  const handlePasswordChange = useCallback(
    async (e) => {
      e.preventDefault();

      const errors = {};

      // Validate current password
      if (!passwordForm.currentPassword) {
        errors.currentPassword = "Current password is required";
      }

      // Validate new password
      const passwordValidationErrors = validatePassword(
        passwordForm.newPassword
      );
      if (passwordValidationErrors.length > 0) {
        errors.newPassword = passwordValidationErrors[0];
      }

      // Validate password confirmation
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      if (Object.keys(errors).length > 0) {
        setPasswordErrors(errors);
        return;
      }

      // Call the changePassword function from auth store
      try {
        const result = await changePassword(
          passwordForm.currentPassword,
          passwordForm.newPassword
        );
        if (result.success) {
          setPasswordForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setPasswordErrors({});
        }
      } catch (error) {
        console.error("Password change error:", error);
      }
    },
    [passwordForm, validatePassword]
  );

  const handleForgotPassword = useCallback(
    async (e) => {
      e.preventDefault();

      if (!forgotPasswordEmail.trim()) {
        toast.error("Please enter your email address");
        return;
      }

      setForgotPasswordState((prev) => ({ ...prev, isLoading: true }));

      try {
        const result = await resetPassword(forgotPasswordEmail);
        if (result.success) {
          setForgotPasswordState((prev) => ({ ...prev, isSubmitted: true }));
          toast.success("Password reset email sent!");
        }
      } catch (error) {
        console.error("Forgot password error:", error);
      } finally {
        setForgotPasswordState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [forgotPasswordEmail, resetPassword]
  );

  const togglePasswordVisibility = useCallback((field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  // === RENDER HELPERS ===
  const renderEmailSection = () => (
    <SettingsCard
      title="Email Verification"
      description="Manage your email verification status and resend verification emails"
    >
      <div className="space-y-4">
        {/* Current Email Status */}
        <div className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                authUser?.data?.is_email_verified ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            <div>
              <p className="text-white font-medium">{authUser?.data?.email}</p>
              <p className="text-sm text-gray-400">
                {authUser?.data?.is_email_verified ? "Verified" : "Pending verification"}
              </p>
            </div>
          </div>
          {authUser?.data?.is_email_verified && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </div>

        {/* Resend Verification */}
        {!authUser?.data?.is_email_verified && (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm">
              Didn't receive the verification email? Click below to resend it.
            </p>
            <ActionButton
              onClick={handleResendVerification}
              disabled={verificationState.cooldown > 0}
              loading={verificationState.isResending}
              variant="secondary"
              className="w-full"
            >
              {verificationState.cooldown > 0 ? (
                `Resend in ${verificationState.cooldown}s`
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Resend Verification Email
                </>
              )}
            </ActionButton>
          </div>
        )}
      </div>
    </SettingsCard>
  );

  const renderPasswordSection = () => (
    <SettingsCard
      title="Change Password"
      description={isGitHubOnlyUser ? "Password management is not available for GitHub accounts" : "Update your password to keep your account secure"}
    >
      {isGitHubOnlyUser ? (
        <div className="text-center space-y-4 py-8">
          <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto">
            <Github className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <h4 className="text-gray-400 font-semibold mb-2">GitHub Account</h4>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              You're signed in with GitHub. Password management is handled through your GitHub account settings.
            </p>
          </div>
          <ActionButton
            onClick={() => window.open('https://github.com/settings/security', '_blank')}
            variant="secondary"
            className="mt-4"
          >
            <Github className="w-4 h-4" />
            Manage on GitHub
          </ActionButton>
        </div>
      ) : (
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {/* Current Password */}
          <FormField
            label="Current Password"
            type={showPasswords.current ? "text" : "password"}
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
            placeholder="Enter your current password"
            error={passwordErrors.currentPassword}
          >
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPasswords.current ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </FormField>

          {/* New Password */}
          <FormField
            label="New Password"
            type={showPasswords.new ? "text" : "password"}
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            placeholder="Enter your new password"
            error={passwordErrors.newPassword}
          >
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPasswords.new ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </FormField>

          {/* Confirm Password */}
          <FormField
            label="Confirm New Password"
            type={showPasswords.confirm ? "text" : "password"}
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            placeholder="Confirm your new password"
            error={passwordErrors.confirmPassword}
          >
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPasswords.confirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </FormField>

          <ActionButton type="submit" loading={loading} className="w-full">
            <Lock className="w-4 h-4" />
            Update Password
          </ActionButton>
        </form>
      )}
    </SettingsCard>
  );

  const renderForgotPasswordSection = () => (
    <SettingsCard
      title="Forgot Password"
      description={isGitHubOnlyUser ? "Password reset is not available for GitHub accounts" : "If you can't remember your current password, use this option to reset it"}
    >
      {isGitHubOnlyUser ? (
        <div className="text-center space-y-4 py-8">
          <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto">
            <Github className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <h4 className="text-gray-400 font-semibold mb-2">GitHub Account</h4>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Password reset is handled through GitHub. You can reset your GitHub password or manage two-factor authentication in your GitHub settings.
            </p>
          </div>
          <ActionButton
            onClick={() => window.open('https://github.com/password_reset', '_blank')}
            variant="secondary"
            className="mt-4"
          >
            <Github className="w-4 h-4" />
            Reset on GitHub
          </ActionButton>
        </div>
      ) : (
        <>
          {forgotPasswordState.isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Reset Email Sent</h4>
                <p className="text-gray-400 text-sm">
                  Check your email for password reset instructions.
                </p>
              </div>
              <ActionButton
                onClick={() =>
                  setForgotPasswordState((prev) => ({
                    ...prev,
                    isSubmitted: false,
                  }))
                }
                variant="secondary"
              >
                Send Another Email
              </ActionButton>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <FormField
                label="Email Address"
                type="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                placeholder="Enter your email address"
              />
              <ActionButton
                type="submit"
                loading={forgotPasswordState.isLoading}
                className="w-full"
              >
                <Send className="w-4 h-4" />
                Send Reset Email
              </ActionButton>
            </form>
          )}
        </>
      )}
    </SettingsCard>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.EMAIL:
        return renderEmailSection();
      case TABS.SECURITY:
        return (
          <div className="space-y-6">
            {renderPasswordSection()}
            {renderForgotPasswordSection()}
          </div>
        );
      case TABS.ACCOUNT:
      default:
        return (
          <SettingsCard
            title="Account Information"
            description="View and manage your account details"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg">
                <img src={authUser?.data?.avatar} alt="" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="text-white font-medium">
                    {authUser?.data?.name || "User"}
                  </p>
                  <p className="text-gray-400 text-sm">{authUser?.data?.email}</p>
                </div>
              </div>
            </div>
          </SettingsCard>
        );
    }
  };

  // === MAIN RENDER ===
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-[#121212] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-[#A1A1AA] hover:text-[#C6FF3D] text-sm transition-colors group"
              >
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span>Go Back</span>
              </button>
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <motion.h1
                    className="text-xl sm:text-2xl font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    Profile Settings
                  </motion.h1>
                  <motion.p
                    className="text-gray-400 text-sm md:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Get your account,{" "}
                    <motion.span
                      className="text-[#C6FF3D]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                        Secure
                    </motion.span>{" "}
                    and{" "}
                    <motion.span
                      className="text-[#C6FF3D]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      Safe
                    </motion.span>{" "}
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

    <div className="w-full border-t border-[#23252B] my-6"></div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-4 space-y-2">
              <TabButton
                active={activeTab === TABS.ACCOUNT}
                onClick={() => setActiveTab(TABS.ACCOUNT)}
                icon={User}
              >
                Account
              </TabButton>
              <TabButton
                active={activeTab === TABS.EMAIL}
                onClick={() => setActiveTab(TABS.EMAIL)}
                icon={Mail}
              >
                Email
              </TabButton>
              <TabButton
                active={activeTab === TABS.SECURITY}
                onClick={() => setActiveTab(TABS.SECURITY)}
                icon={Shield}
              >
                Security
              </TabButton>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={ANIMATION_VARIANTS.slideIn}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
