import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Mail,
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail, resendVerificationEmail, loading, authUser } =
    useAuthStore();

  const [verificationState, setVerificationState] = useState("verifying"); // verifying, success, error, expired
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Redirect if already verified
  useEffect(() => {
    if (authUser?.is_email_verified) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  // Start verification process
  useEffect(() => {
    if (!token) {
      setVerificationState("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }

    const verifyEmailToken = async () => {
      try {
        const result = await verifyEmail(token);

        if (result.success) {
          setVerificationState("success");
          setMessage(result.message);

          // Auto-redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 3000);
        } else {
          // Handle different error types
          if (
            result.message?.includes("expired") ||
            result.message?.includes("Expired")
          ) {
            setVerificationState("expired");
          } else {
            setVerificationState("error");
          }
          setMessage(result.message);
        }
      } catch (error) {
        setVerificationState("error");
        setMessage("An unexpected error occurred during verification.");
      }
    };

    verifyEmailToken();
  }, [token, verifyEmail]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle resend verification email
  const handleResendEmail = async () => {
    if (!authUser?.email) {
      setMessage("Unable to resend email. Please login again.");
      return;
    }

    setIsResending(true);
    try {
      const result = await resendVerificationEmail(authUser.email);

      if (result.success) {
        setMessage(
          "Verification email sent successfully! Please check your inbox."
        );
        setCountdown(60); // 60 second cooldown
      } else {
        setMessage(result.message || "Failed to resend verification email.");
      }
    } catch (error) {
      setMessage("Failed to resend verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  // Render different states
  const renderContent = () => {
    switch (verificationState) {
      case "verifying":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-8 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear" }}
              className="w-16 h-16 bg-[#C6FF3D]/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Loader2 className="w-8 h-8 text-[#C6FF3D]" />
            </motion.div>

            <h1 className="text-2xl font-bold text-white mb-4">
              Verifying Your Email
            </h1>

            <p className="text-[#A1A1AA] mb-6">
              Please wait while we verify your email address...
            </p>

            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 text-[#C6FF3D] animate-spin" />
            </div>
          </motion.div>
        );

      case "success":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-8 text-center"
          >
            <motion.div
              variants={iconVariants}
              className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-8 h-8 text-green-500" />
            </motion.div>

            <h1 className="text-2xl font-bold text-white mb-4">
              Email Verified Successfully!
            </h1>

            <p className="text-[#A1A1AA] mb-6 leading-relaxed">
              {message ||
                "Your email has been verified. You will be redirected to your dashboard shortly."}
            </p>

            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-4 mb-6">
              <p className="text-[#C6FF3D] text-sm flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Redirecting to dashboard in 3 seconds...
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-[#C6FF3D] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#B8E835] transition-colors duration-200"
            >
              Go to Dashboard Now
            </button>
          </motion.div>
        );

      case "expired":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-8 text-center"
          >
            <motion.div
              variants={iconVariants}
              className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </motion.div>

            <h1 className="text-2xl font-bold text-white mb-4">
              Verification Link Expired
            </h1>

            <p className="text-[#A1A1AA] mb-6 leading-relaxed">
              {message ||
                "Your verification link has expired. Please request a new verification email."}
            </p>

            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-4 mb-6 text-left">
              <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                What to do next:
              </h3>
              <ul className="text-[#A1A1AA] text-sm space-y-1">
                <li>• Click the "Resend Verification Email" button below</li>
                <li>• Check your inbox for a new verification email</li>
                <li>• Click the new verification link</li>
                <li>• Check your spam folder if you don't see the email</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleResendEmail}
                disabled={isResending || countdown > 0}
                className="w-full bg-[#C6FF3D] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#B8E835] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : countdown > 0 ? (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Resend in {countdown}s
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Resend Verification Email
                  </>
                )}
              </button>

              <Link
                to="/auth"
                className="w-full border border-[#3A3A3A] text-white font-semibold py-3 px-6 rounded-lg hover:border-[#C6FF3D] transition-colors duration-200 inline-block text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </motion.div>
        );

      case "error":
      default:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-8 text-center"
          >
            <motion.div
              variants={iconVariants}
              className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <XCircle className="w-8 h-8 text-red-500" />
            </motion.div>

            <h1 className="text-2xl font-bold text-white mb-4">
              Verification Failed
            </h1>

            <p className="text-[#A1A1AA] mb-6 leading-relaxed">
              {message ||
                "Unable to verify your email address. The verification link may be invalid or expired."}
            </p>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">
                If you continue to experience issues, please contact our support
                team.
              </p>
            </div>

            <div className="space-y-3">
              {authUser?.email && (
                <button
                  onClick={handleResendEmail}
                  disabled={isResending || countdown > 0}
                  className="w-full bg-[#C6FF3D] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#B8E835] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : countdown > 0 ? (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      Resend in {countdown}s
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send New Verification Email
                    </>
                  )}
                </button>
              )}

              <Link
                to="/auth"
                className="w-full border border-[#3A3A3A] text-white font-semibold py-3 px-6 rounded-lg hover:border-[#C6FF3D] transition-colors duration-200 inline-block text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Sign In</span>
        </motion.button>

        {/* Main Content */}
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </div>
  );
};

export default EmailVerification;
