import React from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiGitPullRequest,
  FiGitMerge,
  FiActivity,
  FiFolder,
  FiTarget,
  FiAward,
  FiCode,
  FiCalendar
} from 'react-icons/fi';
import {
  StatCard,
  DailyStreakCard,
  SkillsSummaryCard,
  DailyPRActivityCard,
  RecentPRsCard,
  MilestoneTrackerCard,
  DashboardHeader,
  DashboardFooter
} from '../../components/dashboard';
import {
  useScrollAnimation,
  scrollAnimations
} from '../../hooks/useScrollAnimation';

export default () => {
  // Hook for scroll-triggered animations
  const [headerRef, headerControls] = useScrollAnimation(0.1);
  const [statsRef, statsControls] = useScrollAnimation(0.2);
  const [topRowRef, topRowControls] = useScrollAnimation(0.2);
  const [middleRowRef, middleRowControls] = useScrollAnimation(0.2);
  const [bottomRowRef, bottomRowControls] = useScrollAnimation(0.2);
  const [footerRef, footerControls] = useScrollAnimation(0.1);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const heroVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      filter: 'blur(20px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const statsGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const statCardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -30,
      scale: 0.8,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const contentRowVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2
      }
    }
  };
  const cardHoverEffects = {};

  // Static data for demonstration
  const stats = {
    openPRs: 5,
    mergedPRs: 23,
    contributions: 86,
    repositories: 12,
    linesOfCode: 2567,
    dailyStreak: 62,
    todayContributions: 42,
    todayLinesOfCode: 200
  };

  const milestones = [
    {
      title: '100 PRs Merged',
      progress: 80,
      current: 80,
      total: 100,
      color: 'bg-red-500',
      icon: <FiGitMerge className="w-4 h-4" />
    },
    {
      title: '5,000 Lines of Code',
      progress: 90,
      current: 4500,
      total: 5000,
      color: 'bg-green-500',
      icon: <FiCode className="w-4 h-4" />
    },
    {
      title: '30 Unique Repositories',
      progress: 40,
      current: 12,
      total: 30,
      color: 'bg-yellow-500',
      icon: <FiFolder className="w-4 h-4" />
    },
    {
      title: 'JS Mastery',
      progress: 30,
      current: 30,
      total: 100,
      color: 'bg-blue-500',
      icon: <FiTarget className="w-4 h-4" />
    },
    {
      title: '100 Days Contribution',
      progress: 65,
      current: 65,
      total: 100,
      color: 'bg-purple-500',
      icon: <FiCalendar className="w-4 h-4" />
    },
    {
      title: 'First PR Reviewed',
      progress: 100,
      current: 1,
      total: 1,
      color: 'bg-green-500',
      icon: <FiAward className="w-4 h-4" />
    }
  ];

  const languages = [
    { name: 'JavaScript', percentage: 28, color: '#F7DF1E' },
    { name: 'Rust', percentage: 18, color: '#CE422B' },
    { name: 'Go', percentage: 15, color: '#00ADD8' },
    { name: 'Python', percentage: 18, color: '#3776AB' },
    { name: 'Others', percentage: 15, color: '#6B7280' }
  ];

  const recentPRs = [
    { title: 'Fixed the reducer', status: 'closed', date: '3 July 2025' },
    { title: 'Backend initial', status: 'merged', date: '2 July 2025' },
    { title: 'Repositories', status: 'open', date: '1 July 2025' },
    { title: 'Creating Frontend', status: 'closed', date: '30 June 2025' }
  ];

  const activityData = [
    { day: 'Mon', value: 150 },
    { day: 'Tue', value: 380 },
    { day: 'Wed', value: 220 },
    { day: 'Thu', value: 460 },
    { day: 'Fri', value: 160 },
    { day: 'Sat', value: 320 },
    { day: 'Sun', value: 120 }
  ];

  return (
    <motion.div
      className="min-h-screen bg-[#121212] text-white p-4 sm:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerControls}
          variants={heroVariants}
          whileHover={{
            rotateX: 2
          }}
        >
          <DashboardHeader stats={stats} />
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          initial="hidden"
          animate={statsControls}
          variants={statsGridVariants}
        >
          <motion.div
            variants={statCardVariants}
            whileHover={{
              ...cardHoverEffects.hover,
              boxShadow: '0 25px 25px rgba(59, 130, 246, 0.1)'
            }}
            whileTap={cardHoverEffects.tap}
          >
            <StatCard
              icon={<FiGitPullRequest className="w-5 h-5" />}
              title="Open PRs"
              value={stats.openPRs}
              subtitle="This Month"
              bgColor="bg-[#4D7DE7]/20 border-blue-500/30"
              textColor="text-blue-400"
            />
          </motion.div>

          <motion.div
            variants={statCardVariants}
            whileHover={{
              ...cardHoverEffects.hover,
              boxShadow: '0 25px 25px rgba(34, 197, 94, 0.1)'
            }}
            whileTap={cardHoverEffects.tap}
          >
            <StatCard
              icon={<FiGitMerge className="w-5 h-5" />}
              title="Merged PRs"
              value={stats.mergedPRs}
              subtitle="This Month"
              bgColor="bg-[#16A34A]/20 border-green-500/30"
              textColor="text-green-400"
            />
          </motion.div>

          <motion.div
            variants={statCardVariants}
            whileHover={{
              ...cardHoverEffects.hover,
              boxShadow: '0 25px 25px rgba(20, 184, 166, 0.1)'
            }}
            whileTap={cardHoverEffects.tap}
          >
            <StatCard
              icon={<FiActivity className="w-5 h-5" />}
              title="Contributions"
              value={stats.contributions}
              subtitle="This Month"
              bgColor="bg-[#6ACEBD]/20 border-cyan-500/30"
              textColor="text-cyan-400"
            />
          </motion.div>

          <motion.div
            variants={statCardVariants}
            whileHover={{
              ...cardHoverEffects.hover,
              boxShadow: '0 25px 25px rgba(249, 115, 22, 0.1)'
            }}
            whileTap={cardHoverEffects.tap}
          >
            <StatCard
              icon={<FiFolder className="w-5 h-5" />}
              title="Repositories"
              value={stats.repositories}
              subtitle="Contributing to"
              bgColor="bg-[#EA580C]/20 border-orange-500/30"
              textColor="text-orange-400"
            />
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="space-y-4 sm:space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Top Row - Daily Streak and PR Activity */}
          <motion.div
            ref={topRowRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
            initial="hidden"
            animate={topRowControls}
            variants={contentRowVariants}
          >
            <motion.div
              className="lg:col-span-1"
              variants={scrollAnimations.fadeInLeft}
              // whileHover={{
              //   scale: 1.05,
              //   rotateY: 8,
              //   rotateX: 5,
              //   z: 50,
              //   boxShadow: '0 30px 60px rgba(168, 85, 247, 0.3)',
              //   transition: { type: 'spring', stiffness: 300, damping: 20 }
              // }}
              // whileTap={{ scale: 0.98 }}
            >
              <DailyStreakCard stats={stats} />
            </motion.div>
            <motion.div
              className="lg:col-span-2"
              variants={scrollAnimations.fadeInRight}
              // whileHover={{
              //   scale: 1.03,
              //   rotateY: -3,
              //   rotateX: 3,
              //   z: 50,
              //   boxShadow: '0 30px 60px rgba(59, 130, 246, 0.3)',
              //   transition: { type: 'spring', stiffness: 300, damping: 20 }
              // }}
              // whileTap={{ scale: 0.98 }}
            >
              <DailyPRActivityCard activityData={activityData} />
            </motion.div>
          </motion.div>

          {/* Middle Row - Milestones and Skills */}
          <motion.div
            ref={middleRowRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
            initial="hidden"
            animate={middleRowControls}
            variants={contentRowVariants}
          >
            <motion.div
              className="lg:col-span-2"
              variants={scrollAnimations.scaleIn}
              // whileHover={{
              //   scale: 1.03,
              //   rotateY: 3,
              //   rotateX: 2,
              //   z: 50,
              //   boxShadow: '0 30px 60px rgba(34, 197, 94, 0.3)',
              //   transition: { type: 'spring', stiffness: 300, damping: 20 }
              // }}
              // whileTap={{ scale: 0.98 }}
            >
              <MilestoneTrackerCard milestones={milestones} />
            </motion.div>
            <motion.div
              className="lg:col-span-1"
              variants={scrollAnimations.fadeInRight}
              // whileHover={{
              //   scale: 1.05,
              //   rotateY: -8,
              //   rotateX: 5,
              //   z: 50,
              //   boxShadow: '0 30px 60px rgba(249, 115, 22, 0.3)',
              //   transition: { type: 'spring', stiffness: 300, damping: 20 }
              // }}
              // whileTap={{ scale: 0.98 }}
            >
              <SkillsSummaryCard languages={languages} />
            </motion.div>
          </motion.div>

          {/* Bottom Row - Recent PRs */}
          <motion.div
            ref={bottomRowRef}
            className="w-full"
            initial="hidden"
            animate={bottomRowControls}
            variants={scrollAnimations.slideInBlur}
            // whileHover={{
            //   scale: 1.02,
            //   rotateX: 2,
            //   z: 30,
            //   boxShadow: '0 25px 50px rgba(20, 184, 166, 0.3)',
            //   transition: { type: 'spring', stiffness: 300, damping: 20 }
            // }}
            // whileTap={{ scale: 0.99 }}
          >
            <RecentPRsCard recentPRs={recentPRs} />
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          ref={footerRef}
          initial="hidden"
          animate={footerControls}
          variants={scrollAnimations.fadeInUp}
          // whileHover={{
          //   scale: 1.02,
          //   rotateX: 2,
          //   transition: { type: 'spring', stiffness: 300 }
          // }}
        >
          <DashboardFooter />
        </motion.div>
      </div>
    </motion.div>
  );
};
