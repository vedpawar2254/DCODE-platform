import React, { useState } from 'react';
import { ChevronDown, Send, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance } from '../../utils/axios';

const ContactFormPanel = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    subject: 'Select one',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    isError: false
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    rest: { scale: 1, borderColor: "#374151" },
    focus: { 
      scale: 1.02, 
      borderColor: "#7A900F",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    error: {
      scale: 1.01,
      borderColor: "#ef4444",
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.95 },
    loading: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const toastVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const checkboxVariants = {
    unchecked: { scale: 1, rotate: 0 },
    checked: { 
      scale: 1.1, 
      rotate: 360,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const subjectOptions = [
    'Select one',
    'Programme Related Inquiry',
    'Partnership Inquiry',
    'Sponsorship Request',
    'Project Collaboration',
    'General Feedback',
    'Press or Media Inquiry',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.subject === 'Select one') newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubjectSelect = option => {
    setFormData(prev => ({ ...prev, subject: option }));
    setErrors(prev => ({ ...prev, subject: undefined }));
    setIsSubjectOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (!agreedToTerms) {
      setToast({ show: true, message: 'Please agree to the terms and conditions.', isError: true });
      setTimeout(() => setToast({ show: false, message: '', isError: false }), 3000);
      return;
    }

    setIsSubmitting(true);
    try {
      const API_URL = '/contact';
      await axiosInstance.post(API_URL, formData);

      setToast({ show: true, message: 'Message sent successfully!', isError: false });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        subject: 'Select one',
        message: ''
      });
      setAgreedToTerms(false);
    } catch (err) {
      console.error("Contact form submit failed:", err);
      setToast({ show: true, message: 'Failed to send message. Please try again.', isError: true });
    } finally {
      setTimeout(() => setToast({ show: false, message: '', isError: false }), 3000);
      setIsSubmitting(false);
    }
  };

  const inputClasses = hasError =>
    `w-full px-3 py-2 lg:py-3 border-2 rounded-lg text-white bg-transparent focus:outline-none text-sm lg:text-base transition-colors ${
      hasError
        ? 'border-red-500 focus:border-red-500'
        : 'border-gray-800 focus:border-[#7A900F]'
    }`;

  return (
    <motion.div 
      className="text-white flex flex-col justify-center h-full w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-80px)] lg:max-h-[calc(100vh-80px)] relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background decoration - Hidden on mobile for cleaner look */}
      <motion.div
        className="hidden lg:block absolute top-20 right-5 w-16 h-16 border border-[#7A900F]/20 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="hidden lg:block absolute bottom-32 left-5 w-10 h-10 border border-[#7A900F]/20 rounded-full"
        animate={{
          y: [-5, 5, -5],
          rotate: [0, -180, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 max-w-lg w-full mx-auto lg:max-w-md">
        <AnimatePresence>
          {toast.show && (
            <motion.div
              role="alert"
              aria-live="polite"
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-sm sm:text-base z-50 flex items-center gap-2 ${
                toast.isError ? 'bg-red-500/90 text-white' : 'bg-[#7A900F] text-white'
              }`}
              variants={toastVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {toast.isError ? (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <Check className="w-5 h-5 flex-shrink-0" />
              )}
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4 lg:space-y-6"
          variants={containerVariants}
        >
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4"
            variants={formItemVariants}
          >
            {['firstName', 'lastName'].map((field, index) => (
              <motion.div 
                key={field}
                variants={formItemVariants}
                custom={index}
              >
                <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-1 lg:mb-2 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <motion.input
                  id={field}
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  className={inputClasses(errors[field])}
                  variants={inputVariants}
                  initial="rest"
                  whileFocus="focus"
                  animate={errors[field] ? "error" : "rest"}
                />
                <AnimatePresence>
                  {errors[field] && (
                    <motion.p 
                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors[field]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          
          <motion.div variants={formItemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 lg:mb-2">
              Email Address
            </label>
            <motion.input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email"
              className={inputClasses(errors.email)}
              variants={inputVariants}
              initial="rest"
              whileFocus="focus"
              animate={errors.email ? "error" : "rest"}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p 
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          
          <motion.div variants={formItemVariants}>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1 lg:mb-2">
              Which best describes you?
            </label>
            <div className="relative">
              <motion.button
                id="subject"
                type="button"
                onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                aria-expanded={isSubjectOpen}
                className={`${inputClasses(errors.subject)} flex items-center justify-between`}
              >
                <span className={formData.subject === 'Select one' ? 'text-gray-500' : 'text-white'}>
                  {formData.subject}
                </span>
                <motion.div
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {errors.subject && (
                  <motion.p 
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject}
                  </motion.p>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {isSubjectOpen && (
                  <motion.div 
                    className="absolute top-full left-0 right-0 mt-1 border border-gray-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto bg-black"
                  >
                    {subjectOptions.map((option, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        onClick={() => handleSubjectSelect(option)}
                        className="w-full px-3 py-2 text-left bg-black hover:bg-gray-900 transition-colors text-sm text-white"
                        whileHover={{ backgroundColor: "#1f2937", x: 5 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          
          <motion.div variants={formItemVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <motion.textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Write your message"
              rows={4}
              className={`${inputClasses(errors.message)} resize-none`}
              variants={inputVariants}
              initial="rest"
              whileFocus="focus"
              animate={errors.message ? "error" : "rest"}
            />
            <AnimatePresence>
              {errors.message && (
                <motion.p 
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          
          <motion.div 
            className="flex items-start space-x-3"
            variants={formItemVariants}
          >
            <motion.input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={e => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 text-[#7A900F] bg-gray-800 border-gray-600 rounded accent-[#7A900F]"
            />
            <label htmlFor="terms" className="text-xs text-gray-400 leading-4">
              I agree to DCODE's{' '}
              <a href="#" className="text-[#7A900F] hover:underline">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#7A900F] hover:underline">
                Privacy Policy
              </a>
            </label>
          </motion.div>

          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#7A900F] hover:bg-[#7A900F] text-white font-semibold py-2.5 lg:py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#7A900F] focus:ring-offset-2 focus:ring-offset-gray-900 text-sm lg:text-base flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            variants={buttonVariants}
            initial="rest"
            whileHover={!isSubmitting ? "hover" : undefined}
            whileTap={!isSubmitting ? "tap" : undefined}
            animate={isSubmitting ? "loading" : "rest"}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ContactFormPanel;