import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  GitPullRequest, 
  Users, 
  Code, 
  Globe, 
  Github, 
  ExternalLink,
  Calendar,
  TrendingUp,
  Shield,
  Sparkles
} from 'lucide-react';

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

  const filteredRepositories = repositories.filter(repo => {
    const matchesFilter = filter === 'all' || repo.category.toLowerCase() === filter;
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.maintainer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      case 'archived': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-400/20';
      case 'maintenance': return 'bg-yellow-400/20';
      case 'archived': return 'bg-gray-400/20';
      default: return 'bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="p-6 sm:p-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-[#BCDD19] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Go Back</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-6" style={{ fontFamily: 'Poppins' }}>
            DCODE <span className="text-[#BCDD19]">Repositories</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Explore our curated collection of open-source projects. Each repository is maintained by our community members and mentored by experienced developers.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#BCDD19] transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'platform', 'productivity', 'sustainability', 'social', 'education'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                  filter === category
                    ? 'bg-[#BCDD19] text-black font-medium'
                    : 'bg-gray-900/30 border border-gray-700 text-gray-300 hover:border-[#BCDD19]'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Repository Cards */}
        <div className="space-y-6">
          {filteredRepositories.map((repo) => (
            <div key={repo.id} className="bg-gray-900/40 border border-gray-800 rounded-xl overflow-hidden hover:border-[#BCDD19]/30 transition-all duration-300">
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Section - Main Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-[#BCDD19]/20 rounded-lg flex items-center justify-center">
                            <Code className="w-6 h-6 text-[#BCDD19]" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-semibold text-white mb-1">{repo.name}</h2>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {repo.lastUpdated}
                              </span>
                              <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusBg(repo.status)} ${getStatusColor(repo.status)}`}>
                                <div className="w-2 h-2 rounded-full bg-current"></div>
                                {repo.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">{repo.description}</p>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {repo.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-[#BCDD19]/20 text-[#BCDD19] px-3 py-1 rounded-full text-sm border border-[#BCDD19]/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{repo.stars} stars</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <GitPullRequest className="w-4 h-4 text-[#BCDD19]" />
                        <span>{repo.openPRs} open PRs</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span>{repo.language}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - People and Actions */}
                  <div className="space-y-6">
                    {/* People Info */}
                    <div className="space-y-4">
                      <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-sm font-medium text-gray-400 mb-3">Project Team</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-[#BCDD19]" />
                              <span className="text-sm text-gray-300">Maintainer</span>
                            </div>
                            <span className="text-sm font-medium text-white">{repo.maintainer}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-[#BCDD19]" />
                              <span className="text-sm text-gray-300">DCODE Mentor</span>
                            </div>
                            <span className="text-sm font-medium text-white">{repo.dcodeMentor}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <a
                        href={repo.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200"
                      >
                        <Github className="w-4 h-4" />
                        View Repository
                      </a>
                      {repo.liveDemo && (
                        <a
                          href={repo.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-[#BCDD19] hover:bg-[#BCDD19]/80 text-black font-medium px-4 py-3 rounded-lg transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Decorative Bar */}
              <div className="h-1 bg-gradient-to-r from-[#BCDD19] via-[#BCDD19]/50 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRepositories.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#BCDD19]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="w-12 h-12 text-[#BCDD19]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No repositories found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoriesListing;
