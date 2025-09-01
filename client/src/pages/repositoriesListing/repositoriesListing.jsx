import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  GitPullRequest, 
  Users, 
  Code, 
  Github, 
  ExternalLink,
  Calendar,
  Shield,
  Search,
  Filter,
  Eye,
  GitBranch,
  FolderOpen,
  BookOpen,
  LayoutGrid,
  List,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RepositoriesListing = () => {
  const [repositories, setRepositories] = useState([
    {
      id: 1,
      name: "DCODE Platform",
      description: "The main platform for DCODE - an open source community for developers to contribute, learn, and grow together.",
      maintainer: "Aditya Kumar",
      dcodeMentor: "Sarah Chen",
      stars: 245,
      openPRs: 12,
      language: "React",
      lastUpdated: "2 days ago",
      status: "active",
      category: "Platform",
      techStack: ["React", "Node.js", "MongoDB", "Express"],
      liveDemo: "https://dcode-platform.vercel.app",
      repository: "https://github.com/dcode-org/platform"
    },
    {
      id: 2,
      name: "TaskFlow Manager",
      description: "A comprehensive task management system with real-time collaboration, kanban boards, and project tracking.",
      maintainer: "Priya Sharma",
      dcodeMentor: "Michael Rodriguez",
      stars: 189,
      openPRs: 8,
      language: "TypeScript",
      lastUpdated: "1 week ago",
      status: "active",
      category: "Productivity",
      techStack: ["TypeScript", "Next.js", "PostgreSQL", "Prisma"],
      liveDemo: "https://taskflow-demo.vercel.app",
      repository: "https://github.com/dcode-org/taskflow"
    },
    {
      id: 3,
      name: "EcoTracker",
      description: "Environmental impact tracking application that helps users monitor and reduce their carbon footprint.",
      maintainer: "Alex Johnson",
      dcodeMentor: "Emma Wilson",
      stars: 156,
      openPRs: 15,
      language: "Python",
      lastUpdated: "3 days ago",
      status: "active",
      category: "Sustainability",
      techStack: ["Python", "Django", "React", "PostgreSQL"],
      liveDemo: "https://ecotracker-demo.herokuapp.com",
      repository: "https://github.com/dcode-org/ecotracker"
    },
    {
      id: 4,
      name: "DevConnect",
      description: "A networking platform for developers to connect, share knowledge, and collaborate on projects.",
      maintainer: "Maria Garcia",
      dcodeMentor: "David Kim",
      stars: 203,
      openPRs: 6,
      language: "JavaScript",
      lastUpdated: "5 days ago",
      status: "active",
      category: "Social",
      techStack: ["JavaScript", "Express", "Socket.io", "MongoDB"],
      liveDemo: "https://devconnect-app.vercel.app",
      repository: "https://github.com/dcode-org/devconnect"
    },
    {
      id: 5,
      name: "LearnPath",
      description: "Personalized learning path generator for developers with interactive tutorials and progress tracking.",
      maintainer: "Rahul Patel",
      dcodeMentor: "Lisa Thompson",
      stars: 178,
      openPRs: 11,
      language: "Vue.js",
      lastUpdated: "1 day ago",
      status: "active",
      category: "Education",
      techStack: ["Vue.js", "Node.js", "GraphQL", "Redis"],
      liveDemo: "https://learnpath-demo.netlify.app",
      repository: "https://github.com/dcode-org/learnpath"
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredRepo, setHoveredRepo] = useState(null);

  const filteredRepositories = repositories
    .filter(repo => {
      const matchesFilter = filter === 'all' || repo.category.toLowerCase() === filter;
      const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.maintainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'lastUpdated') {
        return a.id - b.id;
      } else if (sortBy === 'stars') {
        return b.stars - a.stars;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-400';
      case 'maintenance': return 'text-amber-400';
      case 'archived': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-400/10 border-emerald-400/20';
      case 'maintenance': return 'bg-amber-400/10 border-amber-400/20';
      case 'archived': return 'bg-gray-400/10 border-gray-400/20';
      default: return 'bg-gray-400/10 border-gray-400/20';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'platform': 'from-blue-500 to-cyan-500',
      'productivity': 'from-purple-500 to-pink-500',
      'sustainability': 'from-green-500 to-emerald-500',
      'social': 'from-orange-500 to-red-500',
      'education': 'from-indigo-500 to-purple-500'
    };
    return colors[category.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#BCDD19]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#BCDD19]/5 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="relative z-10 p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-gray-400 hover:text-[#BCDD19] transition-all duration-300 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        {/* Header Section - Simplified */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Poppins' }}>
            DCODE <span className="bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] bg-clip-text text-transparent">Repositories</span>
          </h1>
          <p className="text-gray-400 max-w-3xl">
            Explore our collection of open-source projects maintained by our community members.
          </p>
        </motion.div>

        {/* Enhanced Controls */}
        <motion.div 
          className="mb-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-5 justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <motion.input
                type="text"
                placeholder="Search repositories, maintainers, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20 transition-all duration-300"
                whileFocus={{ scale: 1.01 }}
              />
            </div>

            <div className="flex gap-3">
              {/* View Toggle */}
              <motion.div 
                className="flex bg-gray-800/50 border border-gray-700/50 rounded-xl p-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#BCDD19]/10 text-[#BCDD19]' : 'text-gray-400 hover:text-white'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#BCDD19]/10 text-[#BCDD19]' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </motion.div>

              {/* Sort Dropdown */}
              <motion.select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800/50 border border-gray-700/50 text-white rounded-xl px-4 focus:outline-none focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20"
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
              >
                <option value="lastUpdated">Last Updated</option>
                <option value="stars">Most Stars</option>
                <option value="name">Name</option>
              </motion.select>

              {/* Filter Button */}
              <motion.button 
                className="flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 text-white px-4 rounded-xl hover:border-[#BCDD19]/50 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </motion.button>
            </div>
          </div>

          {/* Category Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="flex flex-wrap gap-3 mt-5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {['all', 'platform', 'productivity', 'sustainability', 'social', 'education'].map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => {
                      setFilter(category);
                      setShowFilters(false);
                    }}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium text-sm ${
                      filter === category
                        ? 'bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-black shadow-lg shadow-[#BCDD19]/25'
                        : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:border-[#BCDD19]/50 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Info */}
        <motion.div 
          className="mb-6 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-400">
            {filteredRepositories.length} {filteredRepositories.length === 1 ? 'repository' : 'repositories'} found
            {filter !== 'all' && ` in ${filter}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </motion.div>

        {/* Repository Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid-view"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredRepositories.map((repo, index) => (
                <motion.div 
                  key={repo.id} 
                  className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-[#BCDD19]/30 hover:shadow-2xl hover:shadow-[#BCDD19]/10 transition-all duration-500"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onHoverStart={() => setHoveredRepo(repo.id)}
                  onHoverEnd={() => setHoveredRepo(null)}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-10 h-10 bg-gradient-to-br ${getCategoryColor(repo.category)} rounded-xl flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <FolderOpen className="w-5 h-5 text-white" />
                        </motion.div>
                        <div>
                          <h2 className="text-xl font-bold text-white group-hover:text-[#BCDD19] transition-colors duration-300">{repo.name}</h2>
                          <span className="text-xs text-gray-400">{repo.category}</span>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusBg(repo.status)} ${getStatusColor(repo.status)}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                        {repo.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-5 line-clamp-2">{repo.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {repo.techStack.slice(0, 3).map((tech, index) => (
                        <motion.span
                          key={index}
                          className="bg-[#BCDD19]/10 border border-[#BCDD19]/20 text-[#BCDD19] px-2.5 py-1 rounded-lg text-xs font-medium"
                          
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {repo.techStack.length > 3 && (
                        <span className="bg-gray-700/50 text-gray-400 px-2.5 py-1 rounded-lg text-xs">
                          +{repo.techStack.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-5">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <motion.div
                            animate={{ 
                              rotate: hoveredRepo === repo.id ? [0, -10, 10, -10, 0] : 0,
                              transition: { duration: 0.5 }
                            }}
                          >
                            <Star className="w-4 h-4 text-yellow-400" />
                          </motion.div>
                          <span>{repo.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitPullRequest className="w-4 h-4 text-[#BCDD19]" />
                          <span>{repo.openPRs}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="w-4 h-4 text-blue-400" />
                          <span>{repo.language}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">{repo.lastUpdated}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-gray-700/50 pt-4">
                      <div className="text-xs text-gray-400">
                        Maintained by <span className="text-white">{repo.maintainer}</span>
                      </div>
                      <div className="flex gap-2">
                        <motion.a
                          href={repo.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-[#BCDD19]/10 hover:border-[#BCDD19]/30 transition-colors"
                          title="View Repository"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                        {repo.liveDemo && (
                          <motion.a
                            href={repo.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-black rounded-lg hover:shadow-lg hover:shadow-[#BCDD19]/25 transition-all"
                            title="Live Demo"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <motion.div 
                    className="h-1 bg-gradient-to-r from-[#BCDD19] via-[#A2C00C] to-transparent"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list-view"
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredRepositories.map((repo, index) => (
                <motion.div 
                  key={repo.id} 
                  className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-[#BCDD19]/30 transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Main Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className={`w-10 h-10 bg-gradient-to-br ${getCategoryColor(repo.category)} rounded-xl flex items-center justify-center shadow-lg`}
                              whileHover={{ rotate: 5, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <FolderOpen className="w-5 h-5 text-white" />
                            </motion.div>
                            <div>
                              <h2 className="text-xl font-bold text-white group-hover:text-[#BCDD19] transition-colors duration-300">{repo.name}</h2>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-400">{repo.category}</span>
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusBg(repo.status)} ${getStatusColor(repo.status)}`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                  {repo.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4">{repo.description}</p>
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {repo.techStack.map((tech, index) => (
                            <motion.span
                              key={index}
                              className="bg-[#BCDD19]/10 border border-[#BCDD19]/20 text-[#BCDD19] px-2.5 py-1 rounded-lg text-xs font-medium"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{repo.stars} stars</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitPullRequest className="w-4 h-4 text-[#BCDD19]" />
                            <span>{repo.openPRs} open PRs</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitBranch className="w-4 h-4 text-blue-400" />
                            <span>{repo.language}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Updated {repo.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Sidebar */}
                      <div className="lg:w-48 flex flex-col justify-between">
                        <div className="text-sm text-gray-400 mb-4">
                          <div className="mb-2">
                            <span className="block text-xs text-gray-500">Maintainer</span>
                            <span className="text-white">{repo.maintainer}</span>
                          </div>
                          <div>
                            <span className="block text-xs text-gray-500">Mentor</span>
                            <span className="text-white">{repo.dcodeMentor}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <motion.a
                            href={repo.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-800/50 border border-gray-700/50 text-white py-2 rounded-lg hover:bg-[#BCDD19]/10 hover:border-[#BCDD19]/30 transition-colors text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </motion.a>
                          {repo.liveDemo && (
                            <motion.a
                              href={repo.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-black font-medium py-2 rounded-lg hover:shadow-lg hover:shadow-[#BCDD19]/25 transition-all text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Eye className="w-4 h-4" />
                              <span>Demo</span>
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Gradient Line */}
                  <motion.div 
                    className="h-1 bg-gradient-to-r from-[#BCDD19] via-[#A2C00C] to-transparent"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Empty State */}
        {filteredRepositories.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-[#BCDD19]/20 to-[#A2C00C]/20 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <BookOpen className="w-12 h-12 text-[#BCDD19]" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">No repositories found</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Try adjusting your search terms or filter criteria to find what you're looking for.
            </p>
            <motion.button 
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-black font-medium rounded-xl shadow-lg shadow-[#BCDD19]/25 transition-all hover:shadow-[#BCDD19]/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear all filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RepositoriesListing;