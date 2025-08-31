import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RightSide = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    acceptTerms: false
  });

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      acceptTerms: false
    });
  };
  const { user, loading, error, register, login, logout, githubLogin } =
    useAuth();
  const handleSubmit = async () => {
    if (isLogin) {
      await login({
        email: formData.email,
        password: formData.password
      });
    } else {
      if (!formData.acceptTerms) {
        alert('Please accept the terms and conditions');
        return;
      }
      await register({
        name: formData.username,
        email: formData.email,
        password: formData.password
      });
    }
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold text-white leading-tight">
                {isLogin ? (
                  <>
                    Welcome Back to the{' '}
                    <span className="text-[#7A900F]">Fastest Growing</span>{' '}
                    Online Community
                  </>
                ) : (
                  <>
                    Join & Connect the{' '}
                    <span className="text-[#7A900F]">Fastest Growing</span>{' '}
                    Online Community
                  </>
                )}
              </h1>

              {/* GitHub Button */}
              <button
                onClick={githubLogin}
                className="w-full max-w-sm mx-auto flex items-center justify-center gap-3 bg-transparent border border-gray-600 text-white py-3 px-6 rounded-full hover:border-gray-500 transition-colors duration-200 mt-15 mb-15"
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
                  {isLogin ? 'Sign in with Github' : 'Sign up with Github'}
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
            <div className="space-y-6 mt-8">
              {/* Username Field (Only for Signup) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <label className="block text-gray-300 text-sm">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-3 px-0 focus:outline-none focus:border-[#918EF4] transition-colors duration-200"
                    disabled={loading}
                  />
                </motion.div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-gray-300 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=""
                  className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-3 px-0 focus:outline-none focus:border-[#918EF4] transition-colors duration-200"
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-gray-300 text-sm">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••••••••••"
                    className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 py-3 px-0 pr-10 focus:outline-none focus:border-[#918EF4] transition-colors duration-200"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
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
                  animate={{ opacity: 1, height: 'auto' }}
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
                        setFormData(prev => ({
                          ...prev,
                          acceptTerms: !prev.acceptTerms
                        }))
                      }
                    >
                      I accept the terms & Condition
                    </label>
                  </div>
                  {/* Inline Submit Button for Signup */}
                  <button
                    onClick={handleSubmit}
                    className="bg-[#7A900F] text-white font-semibold py-3 px-8 rounded-full hover:bg-lime-300 transition-colors duration-200 text-sm flex-shrink-0"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'SIGN UP'}
                  </button>
                </motion.div>
              )}

              {/* Full Width Submit Button for Login */}
              {isLogin && (
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#7A900F] text-white font-semibold py-4 px-6 rounded-full hover:bg-lime-300 transition-colors duration-200 text-lg mt-15"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'SIGN IN'}
                </button>
              )}
            </div>

            {/* Toggle Mode */}
            <div className="text-center pt-8 mt-4">
              <span className="text-gray-400">
                {isLogin ? "Don't have an Account? " : 'Own an Account? '}
                <button
                  onClick={toggleMode}
                  className="text-[#7A900F] hover:text-lime-300 transition-colors duration-200 font-medium"
                  disabled={loading}
                >
                  {isLogin ? 'SIGN UP' : 'JUMP RIGHT IN'}
                </button>
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
