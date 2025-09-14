import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle, Lock, Loader2, Shield } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { confirmPasswordReset, loading } = useAuthStore();

  // Form state
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);
  const [tokenError, setTokenError] = useState(null);

  // UI state
  const [focusedField, setFocusedField] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
    isValid: false
  });

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      setTokenError('Invalid reset link. Please request a new password reset.');
      return;
    }

    // Basic token format validation (you can enhance this based on your token format)
    if (token.length < 10) {
      setTokenError('Invalid reset token format.');
      return;
    }

    setTokenValidated(true);
  }, [token]);

  // Password strength validation
  const validatePasswordStrength = useCallback((password) => {
    const feedback = [];
    let score = 0;

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Password must be at least 8 characters long');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Add at least one uppercase letter');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Add at least one lowercase letter');
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('Add at least one number');
    }

    // Special character check
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Add at least one special character');
    }

    // Common patterns check
    const commonPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /abc123/i,
      /(\w)\1{2,}/ // repeated characters
    ];

    if (commonPatterns.some(pattern => pattern.test(password))) {
      feedback.push('Avoid common patterns and repeated characters');
      score = Math.max(0, score - 1);
    }

    const isValid = score >= 4 && password.length >= 8;

    return {
      score,
      feedback,
      isValid
    };
  }, []);

  // Update password strength when password changes
  useEffect(() => {
    if (formData.password) {
      const strength = validatePasswordStrength(formData.password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, feedback: [], isValid: false });
    }
  }, [formData.password, validatePasswordStrength]);

  // Real-time validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordStrength.isValid) {
      newErrors.password = 'Password does not meet security requirements';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, passwordStrength.isValid]);

  // Validate on form data change
  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [formData, isSubmitted, validateForm]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!tokenValidated) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const result = await confirmPasswordReset(token, formData.password);
      
      if (result.success) {
        setShowSuccessAnimation(true);
        
        // Navigate to login after success animation
        setTimeout(() => {
          navigate('/auth', { 
            state: { 
              message: 'Password reset successful! Please sign in with your new password.',
              type: 'success'
            }
          });
        }, 2000);
      } else {
        // Handle API errors
        if (result.message.includes('token')) {
          setTokenError(result.message);
        } else {
          setErrors({ submit: result.message });
        }
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    }
  };

  // Get password strength color and text
  const getPasswordStrengthInfo = () => {
    const { score } = passwordStrength;
    
    if (score === 0) return { color: 'text-[#A1A1AA]', text: '', bgColor: 'bg-[#2A2A2A]' };
    if (score <= 2) return { color: 'text-red-500', text: 'Weak', bgColor: 'bg-red-500' };
    if (score <= 3) return { color: 'text-yellow-500', text: 'Fair', bgColor: 'bg-yellow-500' };
    if (score <= 4) return { color: 'text-blue-500', text: 'Good', bgColor: 'bg-blue-500' };
    return { color: 'text-[#C6FF3D]', text: 'Strong', bgColor: 'bg-[#C6FF3D]' };
  };

  // Show token error if token is invalid
  if (tokenError) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">Invalid Reset Link</h1>
            
            <p className="text-[#A1A1AA] mb-8 leading-relaxed">
              {tokenError}
            </p>
            
            <div className="space-y-4">
              <Link
                to="/forgot-password"
                className="w-full bg-[#C6FF3D] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#B8E835] transition-colors duration-200 inline-block text-center"
              >
                Request New Reset Link
              </Link>
              
              <Link
                to="/auth"
                className="w-full border border-[#3A3A3A] text-white font-semibold py-3 px-6 rounded-lg hover:border-[#C6FF3D] transition-colors duration-200 inline-block text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const strengthInfo = getPasswordStrengthInfo();

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <AnimatePresence mode="wait">
          {showSuccessAnimation ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-8 h-8 text-green-500" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-white mb-4"
              >
                Password Reset Successful!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-[#A1A1AA] mb-6"
              >
                Your password has been successfully updated. You will be redirected to the sign-in page.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center"
              >
                <Loader2 className="w-6 h-6 text-[#C6FF3D] animate-spin" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-8"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#C6FF3D]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-[#C6FF3D]" />
                </div>
                
                <h1 className="text-3xl font-bold text-white mb-2">Reset Your Password</h1>
                <p className="text-[#A1A1AA]">
                  Please enter your new password below
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Submit Error */}
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3 mb-6"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-400 text-sm">{errors.submit}</span>
                  </motion.div>
                )}

                {/* New Password Field */}
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">
                    New Password
                  </label>
                  
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-5 h-5 text-[#A1A1AA]" />
                    </div>
                    
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-[#0A0A0A] border rounded-lg pl-12 pr-12 py-3 text-white placeholder-[#666] focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.password
                          ? 'border-red-500/50 focus:ring-red-500/30'
                          : focusedField === 'password'
                          ? 'border-[#C6FF3D]/50 focus:ring-[#C6FF3D]/30'
                          : 'border-[#2A2A2A] hover:border-[#3A3A3A]'
                      }`}
                      placeholder="Enter your new password"
                      disabled={loading}
                    />
                    
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#A1A1AA] hover:text-white transition-colors duration-200"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#A1A1AA]">Password Strength:</span>
                        <span className={`text-sm font-medium ${strengthInfo.color}`}>
                          {strengthInfo.text}
                        </span>
                      </div>
                      
                      <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.bgColor}`}
                        />
                      </div>
                      
                      {passwordStrength.feedback.length > 0 && (
                        <ul className="text-xs text-[#A1A1AA] space-y-1 mt-2">
                          {passwordStrength.feedback.map((feedback, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#A1A1AA] rounded-full flex-shrink-0" />
                              {feedback}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}

                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium">
                    Confirm New Password
                  </label>
                  
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-5 h-5 text-[#A1A1AA]" />
                    </div>
                    
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-[#0A0A0A] border rounded-lg pl-12 pr-12 py-3 text-white placeholder-[#666] focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.confirmPassword
                          ? 'border-red-500/50 focus:ring-red-500/30'
                          : focusedField === 'confirmPassword'
                          ? 'border-[#C6FF3D]/50 focus:ring-[#C6FF3D]/30'
                          : 'border-[#2A2A2A] hover:border-[#3A3A3A]'
                      }`}
                      placeholder="Confirm your new password"
                      disabled={loading}
                    />
                    
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#A1A1AA] hover:text-white transition-colors duration-200"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-green-500">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-red-500">Passwords do not match</span>
                        </>
                      )}
                    </motion.div>
                  )}

                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading || !passwordStrength.isValid || formData.password !== formData.confirmPassword}
                  className="w-full bg-[#C6FF3D] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#B8E835] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Update Password
                    </>
                  )}
                </motion.button>

                {/* Back to Sign In */}
                <div className="text-center pt-4">
                  <Link
                    to="/auth"
                    className="text-[#A1A1AA] hover:text-[#C6FF3D] text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResetPassword;