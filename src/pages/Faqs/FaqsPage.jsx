import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Mail, Users,ArrowLeft } from 'lucide-react';
import {useNavigate} from "react-router-dom"

// --- Data for the FAQs (Expanded for a more complete page) ---
const faqData = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is the DCODE platform?',
          a: 'The DCODE platform is a modern, collaborative open-source hub designed for student developers. It helps you connect with a community of innovators, learn new skills, and build real-world projects together.',
        },
        {
          q: 'Who can use the DCODE platform?',
          a: 'While the platform is primarily for student developers, anyone passionate about contributing to open-source is welcome to join, learn, and collaborate.',
        },
        {
          q: 'Is the platform free to use?',
          a: 'Absolutely. The DCODE platform is an open-source project and is completely free for everyone to use.',
        },
        {
          q: 'How does DCODE foster collaboration?',
          a: 'DCODE provides features like project listings, user profiles with skill matching, and integrated communication tools to help developers find teams, contribute to projects, and share knowledge effectively.',
        },
      ],
    },
    {
      category: 'Onboarding & Accounts',
      questions: [
        {
          q: 'How do I get started?',
          a: 'To get started, simply sign up for a new account using your GitHub profile. Our onboarding process is designed to be quick and easy, helping you set up your developer profile in minutes.',
        },
        {
          q: 'Why is a GitHub account required?',
          a: 'DCODE is built around open-source collaboration. Integrating with GitHub allows us to track your contributions, showcase your projects, and help you build a credible developer portfolio automatically.',
        },
        {
          q: 'Can I change my username or profile picture?',
          a: 'Yes, you can update your profile information, including your username and profile picture, directly from your dashboard settings page. Changes linked to GitHub may require a sync.',
        },
        {
          q: 'What if I forget my password?',
          a: 'If you signed up with email/password, you can use the "Forgot Password" link on the login page to reset it. If you use GitHub for authentication, you manage your credentials directly through GitHub.',
        },
      ],
    },
    {
      category: 'Dashboard & Profile',
      questions: [
        {
          q: 'What can I do on my dashboard?',
          a: 'The dashboard is your personal hub for tracking progress. You can monitor your contribution streaks, view project milestones, and see an overview of your pull request activity across connected repositories.',
        },
        {
          q: 'How can I make my profile stand out?',
          a: 'Your profile is your developer portfolio. To make it stand out, ensure your skills are up-to-date, add a compelling bio, and link your social profiles. The more you contribute to projects on DCODE, the more impressive your activity feed will become.',
        },
        {
          q: 'How are my contributions tracked?',
          a: 'DCODE integrates with your linked GitHub account to automatically track your pull requests, issues, and commits on repositories you contribute to, reflecting them on your profile and dashboard.',
        },
      ],
    },
    {
      category: 'Contributing to Projects',
      questions: [
        {
          q: 'How do I find projects to contribute to?',
          a: 'You can browse the "Repositories" or "Projects" section to find a curated list of projects. You can filter them by technology, tags, or difficulty to find one that matches your skills and interests.',
        },
        {
          q: 'I found an error or bug. What should I do?',
          a: "That's a great way to contribute! You can report any bugs by creating an 'Issue' on the project's GitHub repository. Please provide as much detail as possible to help the maintainers understand and fix the problem.",
        },
        {
          q: 'What is a good first issue?',
          a: 'Many open-source projects tag issues suitable for new contributors as "good first issue" or "beginner-friendly." These are usually simpler tasks designed to help you get familiar with the codebase and contribution process.',
        },
      ],
    },
];



// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-[#23252B] last:border-b-0"
      variants={itemVariants}
      layout
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5 px-1"
      >
        <span className="text-base font-medium text-white">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-[#C6FF3D] min-w-[20px]" />
        ) : (
          <Plus className="w-5 h-5 text-[#A1A1AA] min-w-[20px]" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-[#A1A1AA] pb-6 px-1 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqPage = () => {
    const navigate = useNavigate();
  return (
    
    <div className="flex min-h-screen bg-[#121212] text-white">
        
      
      <main className="flex-1 overflow-y-auto">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-[#A1A1AA] hover:text-[#BCDD19] transition-colors group pt-5 pl-10"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Go Back</span>
      </button>
        
        <motion.div
          className="max-w-4xl mx-auto p-4 sm:p-6 lg:py-16 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#A1A1AA]">
              Find answers to common questions about the DCODE platform and its features.
            </p>
          </motion.div>

          

          <div className="space-y-10">
            {faqData.map((categoryItem) => (
              <motion.div key={categoryItem.category} variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-white mb-4 border-l-4 border-[#C6FF3D] pl-4">
                  {categoryItem.category}
                </h2>
                <div className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-4 sm:p-6">
                  {categoryItem.questions.map((item, index) => (
                    <AccordionItem key={index} question={item.q} answer={item.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>


          <motion.div
            className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-6 mt-12 flex flex-col sm:flex-row items-center justify-between shadow-lg"
            variants={itemVariants}
          >
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h3 className="text-xl font-semibold text-white mb-2">Can't find your answer?</h3>
              <p className="text-[#A1A1AA] text-sm">
                Our community and support team are here to help you out.
              </p>
            </div>
            <motion.a
              href="mailto:dcode.codes@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#C6FF3D] text-[#121212] font-semibold py-2 px-5 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:bg-[#aaff00]"
            >
              <Mail className="w-5 h-5" />
              Get Support
            </motion.a>
          </motion.div>
        </motion.div>

        
      </main>
    </div>
  );
};

export default FaqPage;