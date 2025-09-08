import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';

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
  X,
  Loader2,
  User,
  Tag,
  Cpu,
  Code2,
  Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:8080';

const RepositoriesListing = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get user data from localStorage for authentication
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Filter and search states
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredRepo, setHoveredRepo] = useState(null);
  const [techStackFilter, setTechStackFilter] = useState('all');
  const [activeFilterType, setActiveFilterType] = useState('category'); // 'category' or 'tech'

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (user && user.token) {
          headers['Authorization'] = `Bearer ${user.token}`;
        }
        
        const response = await fetch(`${API_BASE_URL}/api/v1/project/get-all`, {
          method: 'GET',
          headers: headers
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle API response - check for different response structures
        let projectsData = [];
        if (Array.isArray(data)) {
          projectsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          projectsData = data.data;
        } else if (data.projects && Array.isArray(data.projects)) {
          projectsData = data.projects;
        } else {
          console.warn('Unexpected API response structure:', data);
        }
        
        setProjects(projectsData);
        
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message || 'Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, []);

  const handleRepoClick = (repoId, event) => {
    if (event.target.tagName === 'A' || event.target.closest('a')) {
      return;
    }
    
    navigate(`/repositories/${repoId}`);
  };

  // Fixed date formatting function
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks === 1) return '1 week ago';
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
    if (diffMonths === 1) return '1 month ago';
    if (diffMonths < 12) return `${diffMonths} months ago`;
    
    return `${Math.floor(diffMonths / 12)} years ago`;
  };

  // Get all unique tech stacks from projects
  const getAllTechStacks = () => {
    const allTechStacks = new Set();
    projects.forEach(project => {
      if (project.techStack && Array.isArray(project.techStack)) {
        project.techStack.forEach(tech => allTechStacks.add(tech));
      }
    });
    return Array.from(allTechStacks).sort();
  };

  // Get all unique tags from projects
  const getAllTags = () => {
    const allTags = new Set();
    projects.forEach(project => {
      if (project.tags && Array.isArray(project.tags)) {
        project.tags.forEach(tag => allTags.add(tag));
      }
    });
    return Array.from(allTags).sort();
  };

  // Filter and sort projects - FIXED CASE SENSITIVITY ISSUES
  const filteredProjects = projects
    .filter(project => {
      // Filter by category/tag - case insensitive
      const matchesCategory = filter === 'all' || 
        (project.tags && project.tags.some(tag => 
          tag.toLowerCase() === filter.toLowerCase()
        ));
      
      // Filter by tech stack - case insensitive
      const matchesTechStack = techStackFilter === 'all' || 
        (project.techStack && project.techStack.some(tech => 
          tech.toLowerCase() === techStackFilter.toLowerCase()
        ));
      
      // Filter by search term - case insensitive
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' ||
        project.name.toLowerCase().includes(searchTermLower) ||
        (project.description && project.description.toLowerCase().includes(searchTermLower)) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTermLower))) ||
        (project.techStack && project.techStack.some(tech => tech.toLowerCase().includes(searchTermLower)));
      
      return matchesCategory && matchesTechStack && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'lastUpdated') {
        return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
      } else if (sortBy === 'stars') {
        return (b.stars || 0) - (a.stars || 0);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const getStatusColor = (status) => {
    return 'text-emerald-400'; // Default to active status
  };

  const getStatusBg = (status) => {
    return 'bg-emerald-400/10 border-emerald-400/20'; // Default to active status
  };

  const getCategoryColor = (tag) => {
    const colors = {
      'platform': 'from-blue-500 to-cyan-500',
      'productivity': 'from-purple-500 to-pink-500',
      'sustainability': 'from-green-500 to-emerald-500',
      'social': 'from-orange-500 to-red-500',
      'education': 'from-indigo-500 to-purple-500',
      'javascript': 'from-yellow-500 to-amber-500',
      'typescript': 'from-blue-500 to-indigo-500',
      'python': 'from-blue-400 to-teal-500',
      'react': 'from-cyan-500 to-blue-500',
      'node': 'from-green-500 to-emerald-500',
      'vue': 'from-emerald-500 to-green-500',
      'django': 'from-green-700 to-emerald-700',
      'express': 'from-gray-500 to-gray-700'
    };
    return colors[tag.toLowerCase()] || 'from-gray-500 to-gray-600';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E0A] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-[#BCDD19] animate-spin mb-4" />
          <p className="text-gray-400">Loading repositories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E0A] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E0A] via-[#0b0f0b]/20 to-[#0A0E0A]"></div>
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
        {/* Header Section */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Poppins' }}>
            Project <span className="bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] bg-clip-text text-transparent">Repositories</span>
          </h1>
          <p className="text-gray-400 max-w-3xl">
            Explore our collection of projects maintained by our community members.
          </p>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Enhanced Controls */}
        <motion.div 
          className="mb-8 bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl p-5"
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
                placeholder="Search projects, technologies, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#0b0f0b] border border-[#1A1E1A] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20 transition-all duration-300"
                whileFocus={{ scale: 1.01 }}
              />
            </div>

            <div className="flex gap-3">
              {/* View Toggle */}
              <motion.div 
                className="flex bg-[#0b0f0b] border border-[#1A1E1A] rounded-xl p-1"
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
                className="bg-[#0b0f0b] border border-[#1A1E1A] text-white rounded-xl px-4 focus:outline-none focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20"
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
              >
                <option value="lastUpdated">Last Updated</option>
                <option value="stars">Most Stars</option>
                <option value="name">Name</option>
              </motion.select>

              {/* Filter Button */}
              <motion.button 
                className="flex items-center gap-2 bg-[#0b0f0b] border border-[#1A1E1A] text-white px-4 rounded-xl hover:border-[#BCDD19]/50 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </motion.button>
            </div>
          </div>

          {/* Category and Tech Stack Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="mt-5 space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Filter Type Toggle */}
                <div className="flex gap-2 mb-4">
                  <motion.button
                    onClick={() => setActiveFilterType('category')}
                    className={`px-3 py-1.5 rounded-lg transition-all duration-300 text-sm ${
                      activeFilterType === 'category'
                        ? 'bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-black shadow-lg shadow-[#BCDD19]/25'
                        : 'bg-[#0b0f0b] border border-[#1A1E1A] text-gray-300 hover:border-[#BCDD19]/50 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Tag className="w-4 h-4 inline mr-1" />
                    Categories
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveFilterType('tech')}
                    className={`px-3 py-1.5 rounded-lg transition-all duration-300 text-sm ${
                      activeFilterType === 'tech'
                        ? 'bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-black shadow-lg shadow-[#BCDD19]/25'
                        : 'bg-[#0b0f0b] border border-[#1A1E1A] text-gray-300 hover:border-[#BCDD19]/50 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Cpu className="w-4 h-4 inline mr-1" />
                    Tech Stack
                  </motion.button>
                </div>

                {/* Category Filters */}
                {activeFilterType === 'category' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      <motion.button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1.5 rounded-lg transition-all duration-300 text-xs ${
                          filter === 'all'
                            ? 'bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-black shadow-lg shadow-[#BCDD19]/25'
                            : 'bg-[#0b0f0b] border border-[#1A1E1A] text-gray-300 hover:border-[#BCDD19]/50 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        All Categories
                      </motion.button>
                      
                      {getAllTags().map((tag) => (
                        <motion.button
                          key={tag}
                          onClick={() => setFilter(tag)}
                          className={`px-3 py-1.5 rounded-lg transition-all duration-300 text-xs ${
                            filter.toLowerCase() === tag.toLowerCase()
                              ? 'bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-black shadow-lg shadow-[#BCDD19]/25'
                              : 'bg-[#0b0f0b] border border-[#1A1E1A] text-gray-300 hover:border-[#BCDD19]/50 hover:text-white'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tag}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Filters */}
                {activeFilterType === 'tech' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      <motion.button
                        onClick={() => setTechStackFilter('all')}
                        className={`px-3 py-1.5 rounded-lg transition-all duration-300 text-xs ${
                          techStackFilter === 'all'
                            ? 'bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-black shadow-lg shadow-[#BCDD19]/25'
                            : 'bg-[#0b0f0b] border border-[#1A1E1A] text-gray-300 hover:border-[#BCDD19]/50 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        All Technologies
                      </motion.button>
                      
                      {getAllTechStacks().map((tech) => (
                        <motion.button
                          key={tech}
                          onClick={() => setTechStackFilter(tech)}
                          className={`px-3 py-1.5 rounded-lg transition-all duration-300 text-xs ${
                            techStackFilter.toLowerCase() === tech.toLowerCase()
                              ? 'bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-black shadow-lg shadow-[#BCDD19]/25'
                              : 'bg-[#0b0f0b] border border-[#1A1E1A] text-gray-300 hover:border-[#BCDD19]/50 hover:text-white'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tech}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
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
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
            {filter !== 'all' && ` in ${filter}`}
            {techStackFilter !== 'all' && ` using ${techStackFilter}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </motion.div>

        {/* Project Grid/List */}
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
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project._id || project.id} 
                  className="group relative bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl overflow-hidden hover:border-[#BCDD19]/30 hover:shadow-2xl hover:shadow-[#BCDD19]/10 transition-all duration-500 cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onHoverStart={() => setHoveredRepo(project._id || project.id)}
                  onHoverEnd={() => setHoveredRepo(null)}
                  onClick={(e) => handleRepoClick(project._id || project.id, e)}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-10 h-10 bg-gradient-to-br ${project.tags && project.tags.length > 0 ? getCategoryColor(project.tags[0]) : 'from-gray-500 to-gray-600'} rounded-xl flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <FolderOpen className="w-5 h-5 text-white" />
                        </motion.div>
                        <div>
                          <h2 className="text-xl font-bold text-white group-hover:text-[#BCDD19] transition-colors duration-300">{project.name}</h2>
                          {project.tags && project.tags.length > 0 && (
                            <span className="text-xs text-gray-400">{project.tags[0]}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-5 line-clamp-2">
                      {project.description || 'No description available'}
                    </p>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Hash className="w-4 h-4 text-gray-400 mt-1" />
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <motion.span
                            key={index}
                            className="bg-[#1A1E1A] text-gray-300 px-2.5 py-1 rounded-lg text-xs font-medium border border-[#2A2E2A]"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="bg-[#1A1E1A] text-gray-400 px-2.5 py-1 rounded-lg text-xs border border-[#2A2E2A]">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Tech Stack */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        <Code2 className="w-4 h-4 text-[#BCDD19] mt-1" />
                        {project.techStack.slice(0, 4).map((tech, index) => (
                          <motion.span
                            key={index}
                            className="bg-[#BCDD19]/10 border border-[#BCDD19]/20 text-[#BCDD19] px-2.5 py-1 rounded-lg text-xs font-medium"
                            whileHover={{ scale: 1.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="bg-[#1A1E1A] text-gray-400 px-2.5 py-1 rounded-lg text-xs border border-[#2A2E2A]">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-5">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{project.stars || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Cpu className="w-4 h-4 text-blue-400" />
                          <span>{project.techStack ? project.techStack.length : 0} techs</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">{formatDate(project.updatedAt)}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-[#1A1E1A] pt-4">
                      <div className="text-xs text-gray-400">
                        {project.assignedMentor ? (
                          <>Mentor: <span className="text-white">{project.assignedMentor}</span></>
                        ) : (
                          <>No mentor assigned</>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {project.repositoryUrl && (
                          <motion.a
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-[#0b0f0b] border border-[#1A1E1A] rounded-lg hover:bg-[#BCDD19]/10 hover:border-[#BCDD19]/30 transition-colors"
                            title="View Repository"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="w-4 h-4" />
                          </motion.a>
                        )}
                        {project.liveDemoUrl && (
                          <motion.a
                            href={project.liveDemoUrl}
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
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project._id || project.id} 
                  className="group relative bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl overflow-hidden hover:border-[#BCDD19]/30 transition-all duration-300 cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  onClick={(e) => handleRepoClick(project._id || project.id, e)}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Main Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className={`w-10 h-10 bg-gradient-to-br ${project.tags && project.tags.length > 0 ? getCategoryColor(project.tags[0]) : 'from-gray-500 to-gray-600'} rounded-xl flex items-center justify-center shadow-lg`}
                              whileHover={{ rotate: 5, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <FolderOpen className="w-5 h-5 text-white" />
                            </motion.div>
                            <div>
                              <h2 className="text-xl font-bold text-white group-hover:text-[#BCDD19] transition-colors duration-300">{project.name}</h2>
                              <div className="flex items-center gap-3 mt-1">
                                {project.tags && project.tags.length > 0 && (
                                  <span className="text-xs text-gray-400">{project.tags[0]}</span>
                                )}
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusBg('active')} ${getStatusColor('active')}`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                  Active
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4">
                          {project.description || 'No description available'}
                        </p>
                        
                        {/* Tags and Tech Stack */}
                        <div className="space-y-3 mb-4">
                          {/* Tags */}
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                              <Hash className="w-4 h-4 text-gray-400" />
                              {project.tags.map((tag, index) => (
                                <motion.span
                                  key={index}
                                  className="bg-[#1A1E1A] text-gray-300 px-2.5 py-1 rounded-lg text-xs font-medium border border-[#2A2E2A]"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  {tag}
                                </motion.span>
                              ))}
                            </div>
                          )}
                          
                          {/* Tech Stack */}
                          {project.techStack && project.techStack.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                              <Code2 className="w-4 h-4 text-[#BCDD19]" />
                              {project.techStack.map((tech, index) => (
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
                          )}
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{project.stars || 0} stars</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Cpu className="w-4 h-4 text-blue-400" />
                            <span>{project.techStack ? project.techStack.length : 0} technologies</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Updated {formatDate(project.updatedAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Sidebar */}
                      <div className="lg:w-48 flex flex-col justify-between">
                        <div className="text-sm text-gray-400 mb-4">
                          {project.assignedMentor && (
                            <div className="mb-2">
                              <span className="block text-xs text-gray-500">Mentor</span>
                              <span className="text-white">{project.assignedMentor}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          {project.repositoryUrl && (
                            <motion.a
                              href={project.repositoryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 bg-[#0b0f0b] border border-[#1A1E1A] text-white py-2 rounded-lg hover:bg-[#BCDD19]/10 hover:border-[#BCDD19]/30 transition-colors text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Github className="w-4 h-4" />
                              <span>Code</span>
                            </motion.a>
                          )}
                          {project.liveDemoUrl && (
                            <motion.a
                              href={project.liveDemoUrl}
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
        {filteredProjects.length === 0 && (
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
            <h3 className="text-2xl font-bold text-white mb-3">No projects found</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Try adjusting your search terms or filter criteria to find what you're looking for.
            </p>
            <motion.button 
              onClick={() => {
                setFilter('all');
                setTechStackFilter('all');
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