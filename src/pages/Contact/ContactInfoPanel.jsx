import { Check, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactInfoPanel = () => {
  const features = [
    'Student-Led Innovation',
    'Collaborative Community',
    'Open Source Friendly',
    'Hands-On Projects',
    'Transparent & Supportive'
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      x: 10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const checkIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contactItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // <Link
  //           to="/"
  //           className="inline-flex items-center text-gray-400 hover:text-[#7A900F] transition-colors"
  //         >
  //           <ArrowLeft className="w-4 h-4 mr-2" />
  //           <span className="text-sm font-medium">Go Back</span>
  //         </Link>
  return (
    <motion.div 
      className="text-white flex flex-col justify-center h-full w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 border border-[#7A900F]/20 rounded-full"
        animate={floatingVariants.float}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-12 h-12 border border-[#7A900F]/20 rounded-full"
        animate={{
          ...floatingVariants.float,
          transition: { ...floatingVariants.float.transition, delay: 1 }
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto md:max-w-md">
        {/* Header Section */}
        <motion.div 
          className="space-y-6 mb-10"
          variants={itemVariants}
        >
          <motion.p 
            className="text-sm font-medium text-gray-400 tracking-widest uppercase"
            variants={itemVariants}
          >
            CONTACT US
          </motion.p>
          <motion.h1 
            className="sm:text-3xl md:text-4xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            variants={titleVariants}
          >
            Get in Touch with Us
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-base leading-relaxed max-w-md"
            variants={itemVariants}
          >
            We're here to help. Whether you're interested in learning more about
            our initiative or need support, we're happy to assist you.
          </motion.p>
        </motion.div>

        {/* Features List */}
        <motion.div 
          className="space-y-4 mb-12"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex items-center cursor-pointer"
              variants={featureVariants}
              whileHover="hover"
              custom={index}
            >
              <motion.div 
                className="w-5 h-5 bg-[#7A900F] rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                variants={checkIconVariants}
                whileHover="hover"
              >
                <Check className="w-3 h-3 text-white font-bold" />
              </motion.div>
              <span className="text-white font-medium">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info Section */}
        <motion.div 
          className="space-y-6"
          variants={itemVariants}
        >
          <motion.h3 
            className="text-lg font-semibold text-white"
            variants={titleVariants}
          >
            General Contact Info
          </motion.h3>
          <motion.div 
            className="space-y-4 text-sm"
            variants={containerVariants}
          >
            <motion.div
              variants={contactItemVariants}
              whileHover="hover"
              className="group cursor-pointer"
            >
              <div className="flex items-center">
                <motion.div
                  className="w-8 h-8 bg-[#7A900F]/20 rounded-full flex items-center justify-center mr-3 group-hover:bg-[#7A900F]/30 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Phone className="w-4 h-4 text-[#7A900F]" />
                </motion.div>
                <div>
                  <span className="text-white font-medium">Phone: </span>
                  <a
                    href="tel:+919250021256"
                    className="text-gray-400 hover:text-[#7A900F] transition-colors"
                  >
                    +91 92500 21256 (Rohan Singh)
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={contactItemVariants}
              whileHover="hover"
              className="group cursor-pointer"
            >
              <div className="flex items-center">
                <motion.div
                  className="w-8 h-8 bg-[#7A900F]/20 rounded-full flex items-center justify-center mr-3 group-hover:bg-[#7A900F]/30 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Mail className="w-4 h-4 text-[#7A900F]" />
                </motion.div>
                <div>
                  <span className="text-white font-medium">Email: </span>
                  <a
                    href="mailto:dcode.codes@gmail.com"
                    className="text-gray-400 hover:text-[#7A900F] transition-colors"
                  >
                    dcode.codes@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={contactItemVariants}
              whileHover="hover"
              className="group cursor-pointer"
            >
              <div className="flex items-start">
                <motion.div
                  className="w-8 h-8 bg-[#7A900F]/20 rounded-full flex items-center justify-center mr-3 mt-1 group-hover:bg-[#7A900F]/30 transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <MapPin className="w-4 h-4 text-[#7A900F]" />
                </motion.div>
                <div>
                  <span className="text-white font-medium">Location: </span>
                  <span className="text-gray-400">
                    Rishihood University, NH44, Chowk, Bahalgarh, Sonipat, Kishora,
                    Haryana 131001
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactInfoPanel;
