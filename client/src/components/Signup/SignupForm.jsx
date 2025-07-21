import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return (
    <>
      {/* Username Field */}
      <div className="pt-12">
        <label className="block text-white text-sm mb-2">Username</label>
        <div className="relative">
          <input
            type="text"
            value={formData.username}
            onChange={e => handleInputChange('username', e.target.value)}
            className="w-full bg-transparent border-b-2 border-gray-600 text-[#D5D5D5] pb-2 focus:border-[#918EF4]  focus:outline-none text-lg"
            placeholder="Your name"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="pt-12">
        <label className="block text-white text-sm mb-2">Email</label>
        <div className="relative">
          <input
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            className="w-full bg-transparent border-b-2 border-gray-600 text-[#D5D5D5] pb-2 focus:border-[#918EF4] focus:outline-none text-lg"
            placeholder="Your email"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="mb-8 pt-12">
        <label className="block text-white text-sm mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={e => handleInputChange('password', e.target.value)}
            className="w-full bg-transparent border-b-2 border-gray-600 text-[#D5D5D5] pb-2 focus:border-[#918EF4] focus:outline-none text-lg pr-10"
            placeholder="Your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-0 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Terms + Sign Up in one row */}
      <div className="flex items-center justify-between mb-8 gap-4">
        {/* Checkbox + Label */}
        <div className="flex items-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={e => setAcceptTerms(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                acceptTerms
                  ? 'bg-[#7B76F119] border-[#7B76F140]'
                  : 'border-gray-600'
              }`}
              onClick={() => setAcceptTerms(!acceptTerms)}
            >
              {acceptTerms && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9F7AEA"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>

          <label
            className="ml-3 text-gray-400 text-xs cursor-pointer"
            onClick={() => setAcceptTerms(!acceptTerms)}
          >
            I accept the terms & Condition
          </label>
        </div>

        {/* Sign Up Button (larger but not full width) */}
        <button className="bg-[#7A900F] text-white py-3 px-10 rounded-full text-base hover:bg-[#a8c516] transition-colors">
          SIGN UP
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center mt-8 text-gray-400">
        Own an Account?{' '}
        <a href="#" className="underline">
          JUMP RIGHT IN
        </a>
      </div>
    </>
  );
}
