import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, loading } = useAuthStore();

  // Form state
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // UI state
  const [focusedField, setFocusedField] = useState(null);

  // Rate limiting - basic client-side cooldown
  const COOLDOWN_SECONDS = 60; // 1 minute cooldown between requests

  // Cooldown timer effect
  useEffect(() => {
    let timer;
    if (cooldownRemaining > 0) {
      timer = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldownRemaining]);

  // Simple email validation
  const validateEmail = useCallback((email) => {
    if (!email || !email.trim()) {
      return "Email address is required";
    }

    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }

    return null;
  }, []);

  // Form submission handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Reset previous errors
      setErrors({});

      // Validate email
      const emailError = validateEmail(email);
      if (emailError) {
        setErrors({ email: emailError });
        return;
      }

      // Check cooldown
      if (cooldownRemaining > 0) {
        setErrors({
          general: `Please wait ${cooldownRemaining} seconds before requesting another reset email`,
        });
        return;
      }

      try {
        // Call the reset password API
        const result = await resetPassword(email);

        if (result.success) {
          // Start cooldown and show success state
          setCooldownRemaining(COOLDOWN_SECONDS);
          setIsSubmitted(true);
          setEmail("");
          setErrors({});
        } else {
          // Handle API errors
          const errorMessage =
            result.message || "Failed to send reset email. Please try again.";

          // Handle specific error cases
          if (
            errorMessage.toLowerCase().includes("not found") ||
            errorMessage.toLowerCase().includes("does not exist")
          ) {
            setErrors({
              email:
                "No account found with this email address. Please check your email or sign up for a new account.",
            });
          } else if (
            errorMessage.toLowerCase().includes("rate limit") ||
            errorMessage.toLowerCase().includes("too many")
          ) {
            setErrors({
              general:
                "Too many requests. Please wait a few minutes before trying again.",
            });
            setCooldownRemaining(COOLDOWN_SECONDS);
          } else {
            setErrors({ general: errorMessage });
          }
        }
      } catch (error) {
        console.error("Password reset error:", error);
        setErrors({
          general: "Something went wrong. Please try again later.",
        });
      }
    },
    [email, validateEmail, cooldownRemaining, resetPassword]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const successVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Render success state
  if (isSubmitted) {
    return (
      <motion.div
        className="min-h-screen bg-[#121212] flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-md">
          <motion.div
            className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-8 text-center"
            variants={successVariants}
          >
            {/* Success Icon */}
            <motion.div
              className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <CheckCircle className="w-8 h-8 text-green-500" />
            </motion.div>

            {/* Success Message */}
            <motion.h1
              className="text-2xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              Check Your Email
            </motion.h1>

            <motion.p
              className="text-[#A1A1AA] mb-6 leading-relaxed"
              variants={itemVariants}
            >
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
            </motion.p>

            {/* Additional Instructions */}
            <motion.div
              className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-4 mb-6 text-left"
              variants={itemVariants}
            >
              <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                What to do next:
              </h3>
              <ul className="text-[#A1A1AA] text-sm space-y-1">
                <li>• Check your inbox for an email from DCODE</li>
                <li>• Click the reset link in the email</li>
                <li>• Follow the instructions to set a new password</li>
                <li>• Check your spam folder if you don't see the email</li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <button
                onClick={() => navigate("/auth")}
                className="w-full bg-[#C6FF3D] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#B8E835] transition-colors"
              >
                Back to Login
              </button>

              {cooldownRemaining === 0 && (
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-transparent border border-[#3A3A3A] text-white py-3 px-6 rounded-lg hover:border-[#C6FF3D] transition-colors"
                >
                  Send Another Email
                </button>
              )}

              {cooldownRemaining > 0 && (
                <div className="text-[#A1A1AA] text-sm">
                  You can request another email in {cooldownRemaining} seconds
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Render form state
  return (
    <motion.div
      className="min-h-screen bg-[#121212] flex items-center justify-center p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 border border-[#C6FF3D]/10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 border border-[#C6FF3D]/5 rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/auth")}
          className="inline-flex items-center gap-2 mb-8 text-[#A1A1AA] hover:text-[#C6FF3D] transition-colors group"
          variants={itemVariants}
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Login</span>
        </motion.button>

        {/* Main Form */}
        <motion.div
          className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-8"
          variants={itemVariants}
        >
          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h1 className="text-3xl font-bold text-white mb-4">
              Forgot Password?
            </h1>
            <p className="text-[#A1A1AA] leading-relaxed">
              No worries! Enter your email address and we'll send you a link to
              reset your password.
            </p>
          </motion.div>

          {/* General Error */}
          <AnimatePresence>
            {errors.general && (
              <motion.div
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-start gap-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{errors.general}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={itemVariants}
          >
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-white font-medium mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email address"
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-[#666] transition-colors focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:border-red-400"
                      : focusedField === "email"
                        ? "border-[#C6FF3D] focus:border-[#C6FF3D]"
                        : "border-[#3A3A3A] focus:border-[#C6FF3D]"
                  }`}
                  disabled={loading}
                  autoComplete="email"
                  required
                />
                {focusedField === "email" && (
                  <motion.div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Mail className="w-5 h-5 text-[#C6FF3D]" />
                  </motion.div>
                )}
              </div>

              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || cooldownRemaining > 0 || !email.trim()}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                loading || cooldownRemaining > 0 || !email.trim()
                  ? "bg-[#3A3A3A] text-[#666] cursor-not-allowed"
                  : "bg-[#C6FF3D] text-black hover:bg-[#B8E835] hover:shadow-lg hover:shadow-[#C6FF3D]/20"
              }`}
              whileHover={
                !loading && cooldownRemaining === 0 && email.trim()
                  ? { scale: 1.02 }
                  : {}
              }
              whileTap={
                !loading && cooldownRemaining === 0 && email.trim()
                  ? { scale: 0.98 }
                  : {}
              }
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Reset Email...
                </>
              ) : cooldownRemaining > 0 ? (
                <>Wait {cooldownRemaining}s</>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Reset Email
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Help Text */}
          <motion.div
            className="mt-6 pt-6 border-t border-[#2A2A2A] text-center"
            variants={itemVariants}
          >
            <p className="text-[#A1A1AA] text-sm mb-4">
              Remember your password?{" "}
              <Link
                to="/auth"
                className="text-[#C6FF3D] hover:underline font-medium"
              >
                Sign in instead
              </Link>
            </p>

            <p className="text-[#666] text-xs">
              If you don't receive an email within a few minutes, check your
              spam folder or{" "}
              <a
                href="mailto:dcode.codes@gmail.com"
                className="text-[#C6FF3D] hover:underline"
              >
                contact support
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
