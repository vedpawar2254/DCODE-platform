import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  Eye,
  GitBranch,
  FolderOpen,
  FileText,
  Code2,
  BarChart3,
  Copy,
  BookmarkPlus,
  Share
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RepositoryDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('readme');
  const [isStarred, setIsStarred] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Mock repository data
  const repository = {
    id: 1,
    name: "DCODE Platform",
    description: "The main platform for DCODE - an open source community for developers to contribute, learn, and grow together.",
    fullDescription: `DCODE Platform is a comprehensive open-source project designed to connect developers from around the world. It provides a space for collaboration, learning, and project development.

## Features

- **Project Collaboration**: Work together with other developers on exciting projects
- **Learning Resources**: Access tutorials, documentation, and learning paths
- **Community Engagement**: Connect with mentors and other developers
- **Code Review System**: Get feedback on your code from experienced developers
- **Real-time Collaboration**: Work together using our real-time editing features

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, Socket.io
- Database: MongoDB with Mongoose ODM
- Authentication: JWT with secure password hashing
- Deployment: Vercel for frontend, Heroku for backend

## Getting Started

To get started with the DCODE Platform:

1. Clone the repository
\`\`\`bash
git clone https://github.com/dcode-org/platform.git
\`\`\`

2. Install dependencies
\`\`\`bash
cd platform
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

4. Start the development server
\`\`\`bash
npm run dev
\`\`\`

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting a pull request.`,
    maintainer: "Aditya Kumar",
    dcodeMentor: "Sarah Chen",
    stars: 245,
    openPRs: 12,
    language: "React",
    lastUpdated: "2 days ago",
    status: "active",
    category: "Platform",
    techStack: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Tailwind CSS"],
    liveDemo: "https://dcode-platform.vercel.app",
    repository: "https://github.com/dcode-org/platform",
    license: "MIT",
    forks: 34,
    issues: 8,
    watchers: 124,
    contributors: [
      { name: "Aditya Kumar", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
      { name: "Michael Rodriguez", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
      { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face" },
      { name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" }
    ],
    commits: 247,
    branches: 4,
    pullRequests: [
      { id: 1, title: "Fix authentication bug", author: "Sarah Chen", status: "open", created: "2 hours ago" },
      { id: 2, title: "Add dark mode toggle", author: "Michael Rodriguez", status: "merged", created: "1 day ago" },
      { id: 3, title: "Update documentation", author: "Priya Sharma", status: "closed", created: "3 days ago" }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-500';
      case 'maintenance': return 'text-amber-500';
      case 'archived': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'platform': 'from-blue-600 to-cyan-600',
      'productivity': 'from-purple-600 to-pink-600',
      'sustainability': 'from-green-600 to-emerald-600',
      'social': 'from-orange-600 to-red-600',
      'education': 'from-indigo-600 to-purple-600'
    };
    return colors[category.toLowerCase()] || 'from-gray-600 to-gray-700';
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a subtle toast notification here
  };

  return (
    <div className="min-h-screen bg-[#0A0E0A] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E0A] via-[#0b0f0b]/20 to-[#0A0E0A]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#BCDD19]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#BCDD19]/5 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/repositories"
              className="inline-flex items-center text-gray-400 hover:text-[#BCDD19] transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Repositories</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {/* Left Column - Repository Info */}
          <motion.div className="lg:col-span-2" variants={slideUp}>
            {/* Repository Header */}
            <motion.div 
              className="bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl p-6 mb-6"
              variants={fadeIn}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(repository.category)} rounded-xl flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 2, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <FolderOpen className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">{repository.name}</h1>
                    <p className="text-gray-400 text-sm">{repository.description}</p>
                  </div>
                </div>
                {/* <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(repository.status)} bg-opacity-10 border ${getStatusColor(repository.status)}/20`}>
                  {repository.status}
                </span> */}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-[#1A1E1A] text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{repository.stars}</span>
                  <span className="text-gray-500">Stars</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{repository.forks}</span>
                  <span className="text-gray-500">Forks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{repository.watchers}</span>
                  <span className="text-gray-500">Watchers</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">{repository.openPRs}</span>
                  <span className="text-gray-500">Open PRs</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <motion.a
                  href={repository.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0b0f0b] border border-[#1A1E1A] text-gray-200 rounded-xl hover:bg-[#131712] transition-colors text-sm"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </motion.a>
                {repository.liveDemo && (
                  <motion.a
                    href={repository.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#BCDD19] to-[#A2C00C] text-gray-900 rounded-xl hover:shadow-lg hover:shadow-[#BCDD19]/25 transition-all text-sm font-medium"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </motion.a>
                )}
                <motion.button
                  onClick={() => setIsStarred(!isStarred)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm ${
                    isStarred 
                      ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
                      : 'bg-[#0b0f0b] border border-[#1A1E1A] text-gray-200 hover:bg-[#131712]'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Star className="w-4 h-4" fill={isStarred ? 'currentColor' : 'none'} />
                  <span>{isStarred ? 'Starred' : 'Star'}</span>
                </motion.button>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-[#0b0f0b] border border-[#1A1E1A] text-gray-200 rounded-xl hover:bg-[#131712] transition-colors text-sm"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GitBranch className="w-4 h-4" />
                  <span>Fork</span>
                </motion.button>
                <motion.button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-xl transition-colors ${
                    isBookmarked 
                      ? 'bg-[#BCDD19]/10 text-[#BCDD19] border border-[#BCDD19]/20' 
                      : 'bg-[#0b0f0b] border border-[#1A1E1A] text-gray-400 hover:text-gray-200'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookmarkPlus className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                </motion.button>
                <motion.button
                  onClick={() => copyToClipboard(window.location.href)}
                  className="p-2 bg-[#0b0f0b] border border-[#1A1E1A] text-gray-400 rounded-xl hover:bg-[#131712] hover:text-gray-200 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div 
              className="bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl overflow-hidden mb-6"
              variants={fadeIn}
            >
              <div className="flex border-b border-[#1A1E1A]">
                {['readme', 'code', 'issues', 'pull-requests'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-sm font-medium transition-all duration-300 relative ${
                      activeTab === tab 
                        ? 'text-[#BCDD19]' 
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {tab === 'readme' && <FileText className="w-4 h-4 inline mr-2 -mt-0.5" />}
                    {tab === 'code' && <Code className="w-4 h-4 inline mr-2 -mt-0.5" />}
                    {tab === 'issues' && <Code2 className="w-4 h-4 inline mr-2 -mt-0.5" />}
                    {tab === 'pull-requests' && <GitPullRequest className="w-4 h-4 inline mr-2 -mt-0.5" />}
                    {tab === 'insights' && <BarChart3 className="w-4 h-4 inline mr-2 -mt-0.5" />}
                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    {activeTab === tab && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#BCDD19]"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'readme' && (
                    <motion.div
                      key="readme"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="prose prose-invert max-w-none"
                    >
                      <div className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                        {repository.fullDescription}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'code' && (
                    <motion.div
                      key="code"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <h2 className="text-lg font-semibold text-white mb-4">Code Structure</h2>
                      <div className="bg-[#0b0f0b] border border-[#1A1E1A] rounded-xl p-4 text-sm">
                        <div className="text-gray-400 mb-2">src/</div>
                        <div className="pl-4 text-gray-400 mb-2">components/</div>
                        <div className="pl-8 text-gray-300 mb-1">Button.jsx</div>
                        <div className="pl-8 text-gray-300 mb-1">Card.jsx</div>
                        <div className="pl-4 text-gray-400 mb-2">pages/</div>
                        <div className="pl-8 text-gray-300 mb-1">Home.jsx</div>
                        <div className="pl-8 text-gray-300 mb-2">About.jsx</div>
                        <div className="text-gray-400 mb-1">package.json</div>
                        <div className="text-gray-400">README.md</div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'issues' && (
                    <motion.div
                      key="issues"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <h2 className="text-lg font-semibold text-white mb-4">Open Issues</h2>
                      <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="bg-[#0b0f0b] border border-[#1A1E1A] rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium text-white text-sm">Issue title #{i}</h3>
                              <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">Bug</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">This is a description of the issue that needs to be resolved...</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Opened 2 days ago by Contributor</span>
                              <div className="flex items-center gap-3">
                                <span>Comments: 3</span>
                                <span>Assignees: 1</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'pull-requests' && (
                    <motion.div
                      key="pull-requests"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <h2 className="text-lg font-semibold text-white mb-4">Pull Requests</h2>
                      <div className="space-y-3">
                        {repository.pullRequests.map(pr => (
                          <div key={pr.id} className="bg-[#0b0f0b] border border-[#1A1E1A] rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium text-white text-sm">{pr.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full border ${
                                pr.status === 'open' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                pr.status === 'merged' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                                'bg-gray-500/10 text-gray-500 border-gray-500/20'
                              }`}>
                                {pr.status}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">This PR addresses an important issue with the authentication flow...</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>By {pr.author} • {pr.created}</span>
                              <div className="flex items-center gap-3">
                                <span>Comments: 5</span>
                                <span>Commits: 3</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'insights' && (
                    <motion.div
                      key="insights"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <h2 className="text-lg font-semibold text-white mb-4">Repository Insights</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#0b0f0b] border border-[#1A1E1A] rounded-xl p-4">
                          <h3 className="font-medium text-white mb-3 text-sm">Activity</h3>
                          <div className="h-32 bg-[#0A0E0A] rounded-xl flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Commit activity chart</span>
                          </div>
                        </div>
                        <div className="bg-[#0b0f0b] border border-[#1A1E1A] rounded-xl p-4">
                          <h3 className="font-medium text-white mb-3 text-sm">Contributors</h3>
                          <div className="h-32 bg-[#0A0E0A] rounded-xl flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Contributors chart</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div className="lg:col-span-1" variants={slideUp}>
            {/* About Card */}
            <motion.div 
              className="bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl p-5 mb-5"
              variants={fadeIn}
            >
              <h2 className="text-lg font-semibold text-white mb-4">About</h2>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">{repository.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">Maintainer</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#0b0f0b] border border-[#1A1E1A] rounded-full flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-white text-sm">{repository.maintainer}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">Mentor</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#0b0f0b] border border-[#1A1E1A] rounded-full flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-white text-sm">{repository.dcodeMentor}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">License</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#0b0f0b] border border-[#1A1E1A] rounded-full flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-white text-sm">{repository.license} License</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">Updated</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#0b0f0b] border border-[#1A1E1A] rounded-full flex items-center justify-center">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-white text-sm">{repository.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div 
              className="bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl p-5 mb-5"
              variants={fadeIn}
            >
              <h2 className="text-lg font-semibold text-white mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {repository.techStack.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="bg-[#BCDD19]/10 border border-[#BCDD19]/20 text-[#BCDD19] px-2.5 py-1 rounded-lg text-xs font-medium"
                    // whileHover={{ scale: 1.05 }}
                    // transition={{ type: "spring", stiffness: 400 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Contributors */}
            <motion.div 
              className="bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl p-5"
              variants={fadeIn}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Contributors</h2>
                <span className="text-xs text-gray-500">{repository.contributors.length}</span>
              </div>
              <div className="space-y-3">
                {repository.contributors.map((contributor, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3"
                    // whileHover={{ x: 2 }}
                    // transition={{ type: "spring", stiffness: 400 }}
                  >
                    <img 
                      src={contributor.avatar} 
                      alt={contributor.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#1A1E1A]"
                    />
                    <span className="text-white text-sm">{contributor.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RepositoryDetails;