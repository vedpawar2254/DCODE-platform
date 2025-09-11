import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  Share,
  Loader2,
  AlertCircle,
  GitFork,
  AlertTriangle,
  CheckCircle,
  Merge,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import markdownToHtml from "../../utils/markdowntohtml";
import DOMPurify from "dompurify";
import { axiosInstance } from "@/utils/axios";
import { toast } from "sonner";

// Default fallback image as base64 or use a placeholder service
const DEFAULT_REPO_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23BCDD19'/%3E%3Ctext x='50' y='55' font-family='Arial, sans-serif' font-size='14' fill='%23000' text-anchor='middle'%3ERepo%3C/text%3E%3C/svg%3E";

// const API_BASE_URL = "http://localhost:8080";

const RepositoryDetails = () => {
  const { id } = useParams();
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("readme");
  const [isStarred, setIsStarred] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [repoImage, setRepoImage] = useState(DEFAULT_REPO_IMAGE);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [githubData, setGithubData] = useState({
    issues: [],
    pullRequests: [],
    loading: false,
    error: null,
  });

  // Get user data from localStorage for authentication
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Extract owner and repo from GitHub URL
  const extractGitHubInfo = (url) => {
    if (!url) return null;
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)(\.git)?$/);
    return match ? { owner: match[1], repo: match[2] } : null;
  };

  // Truncate description to max 100 words
  const truncateDescription = (text, maxWords = 20) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  // Handle repository image loading
  const handleImageLoad = (repository) => {
    if (imageLoaded) return; // Prevent repeated attempts

    if (repository?.imageUrl) {
      // Try repository's imageUrl first
      const img = new Image();
      img.onload = () => {
        setRepoImage(repository.imageUrl);
        setImageLoaded(true);
      };
      img.onerror = () => {
        // Fallback to GitHub opengraph if imageUrl fails
        tryGithubImage(repository);
      };
      img.src = repository.imageUrl;
    } else {
      // Try GitHub opengraph directly
      tryGithubImage(repository);
    }
  };

  const tryGithubImage = (repository) => {
    const githubInfo = repository?.repositoryUrl
      ? extractGitHubInfo(repository.repositoryUrl)
      : null;
    if (githubInfo && !imageLoaded) {
      const githubImageUrl = `https://opengraph.githubassets.com/1/${githubInfo?.owner}/${githubInfo?.repo}`;
      const img = new Image();
      img.onload = () => {
        setRepoImage(githubImageUrl);
        setImageLoaded(true);
      };
      img.onerror = () => {
        // Keep default image
        setImageLoaded(true);
      };
      img.src = githubImageUrl;
    } else {
      setImageLoaded(true);
    }
  };

  // Fetch repository details from backend
  useEffect(() => {
    const fetchRepository = async () => {
      try {
        setLoading(true);
        setError(null);

        // const headers = {
        //   "Content-Type": "application/json",
        // };

        // if (user && user.token) {
        //   headers["Authorization"] = `Bearer ${user.token}`;
        // }

        const response = await axiosInstance.get(`/project/get/${id}`);

        const repositoryData = response.data.data;
        console.log(repositoryData);
        setRepository(repositoryData);
      } catch (error) {
        console.error("Error fetching repository");
        setError(
          error.message || "Failed to load repository. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRepository();
    }
  }, [id, user.token]);

  // Handle image loading when repository data is available
  useEffect(() => {
    if (repository && !imageLoaded) {
      handleImageLoad(repository);
    }
  }, [repository, imageLoaded]);

  // Fetch GitHub issues and PRs with proper authentication and error handling
  const fetchGitHubData = async () => {
    if (!repository || !repository.repositoryUrl || githubData.loading) return;

    const githubInfo = extractGitHubInfo(repository.repositoryUrl);
    if (!githubInfo) return;

    try {
      setGithubData((prev) => ({ ...prev, loading: true, error: null }));

      // GitHub API headers - you might need a personal access token for higher rate limits
      const githubHeaders = {
        Accept: "application/vnd.github.v3+json",
        // will add later
        // 'Authorization': 'token YOUR_GITHUB_TOKEN_HERE',
      };

      // Fetch issues and PRs concurrently
      const [issuesResponse, prResponse] = await Promise.allSettled([
        fetch(
          `https://api.github.com/repos/${githubInfo?.owner}/${githubInfo?.repo}/issues?state=open&per_page=5`,
          {
            headers: githubHeaders,
          }
        ),
        fetch(
          `https://api.github.com/repos/${githubInfo?.owner}/${githubInfo?.repo}/pulls?state=open&per_page=5`,
          {
            headers: githubHeaders,
          }
        ),
      ]);

      let issues = [];
      let pullRequests = [];
      let errorMessage = null;

      // Handle issues response
      if (issuesResponse.status === "fulfilled" && issuesResponse.value.ok) {
        const issuesData = await issuesResponse.value.json();
        // Filter out pull requests (GitHub API returns PRs as issues)
        issues = issuesData.filter((issue) => !issue.pull_request);
      } else if (issuesResponse.status === "fulfilled") {
        console.warn("Issues fetch failed:", issuesResponse.value.status);
        if (issuesResponse.value.status === 403) {
          errorMessage =
            "GitHub API rate limit exceeded. Please try again later.";
        }
      }

      // Handle PRs response
      if (prResponse.status === "fulfilled" && prResponse.value.ok) {
        const prData = await prResponse.value.json();
        pullRequests = prData;
      } else if (prResponse.status === "fulfilled") {
        console.warn("PRs fetch failed:", prResponse.value.status);
        if (prResponse.value.status === 403 && !errorMessage) {
          errorMessage =
            "GitHub API rate limit exceeded. Please try again later.";
        }
      }

      setGithubData({
        issues,
        pullRequests,
        loading: false,
        error: errorMessage,
      });
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      setGithubData((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to fetch GitHub data. Please check your connection.",
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-emerald-500";
      case "maintenance":
        return "text-amber-500";
      case "archived":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      platform: "from-blue-600 to-cyan-600",
      productivity: "from-purple-600 to-pink-600",
      sustainability: "from-green-600 to-emerald-600",
      social: "from-orange-600 to-red-600",
      education: "from-indigo-600 to-purple-600",
    };
    return colors[category?.toLowerCase()] || "from-gray-600 to-gray-700";
  };

  // Get PR status color and icon
  const getPRStatus = (pr) => {
    if (pr.merged) {
      return {
        color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
        icon: <Merge className="w-3 h-3" />,
        text: "Merged",
      };
    } else if (pr.state === "closed") {
      return {
        color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
        icon: <CheckCircle className="w-3 h-3" />,
        text: "Closed",
      };
    } else {
      return {
        color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        icon: <GitPullRequest className="w-3 h-3" />,
        text: "Open",
      };
    }
  };

  // Get issue status color and icon
  const getIssueStatus = (issue) => {
    if (issue.state === "closed") {
      return {
        color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
        icon: <CheckCircle className="w-3 h-3" />,
        text: "Closed",
      };
    } else {
      return {
        color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        icon: <AlertCircle className="w-3 h-3" />,
        text: "Open",
      };
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks === 1) return "1 week ago";
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
    if (diffMonths === 1) return "1 month ago";
    if (diffMonths < 12) return `${diffMonths} months ago`;

    return `${Math.floor(diffMonths / 12)} years ago`;
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy to clipboard");
      }
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E0A] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-[#BCDD19] animate-spin mb-4" />
          <p className="text-gray-400">Loading repository details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0E0A] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            {error}
          </div>
          <Link
            to="/repositories"
            className="inline-flex items-center text-[#BCDD19] hover:text-[#A2C00C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Repositories
          </Link>
        </div>
      </div>
    );
  }

  // If no repository data
  if (!repository) {
    return (
      <div className="min-h-screen bg-[#0A0E0A] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 p-4 bg-gray-500/10 border border-gray-500/20 rounded-xl text-gray-400">
            Repository not found
          </div>
          <Link
            to="/repositories"
            className="inline-flex items-center text-[#BCDD19] hover:text-[#A2C00C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Repositories
          </Link>
        </div>
      </div>
    );
  }

  // Static data for parts not available from backend
  const staticData = {
    // Default values for missing fields
    forks: repository.forks || 0,
    watchers: repository.watchers || 0,
    openPRs: repository.openPRs || 0,
    commits: repository.commits || 0,
    branches: repository.branches || 0,
    issues: repository.issues || 0,
    license: repository.license || "MIT",
    status: repository.status || "active",
    category: repository.category || "Platform",
    // Generate full description if not available
    fullDescription:
      repository.readme ||
      repository.description ||
      `# ${repository.name}

${repository.description || "No description available"}

## Features

- **Project Collaboration**: Work together with other developers on exciting projects
- **Learning Resources**: Access tutorials, documentation, and learning paths
- **Community Engagement**: Connect with mentors and other developers

## Tech Stack

${
  repository.techStack && repository.techStack.length > 0
    ? repository.techStack.map((tech) => `- ${tech}`).join("\n")
    : "- No technologies specified"
}

## Getting Started

To get started with this project:

1. Clone the repository
\`\`\`bash
git clone ${repository.repositoryUrl}
\`\`\`

2. Install dependencies
\`\`\`bash
cd ${repository.name}
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npm run dev
\`\`\`

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting a pull request.`,
  };

  // Get GitHub info for links
  const githubInfo = extractGitHubInfo(repository.repositoryUrl);

  return (
    <div className="min-h-screen bg-[#0A0E0A] text-white relative overflow-hidden">
      {/* Background Effects */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E0A] via-[#0b0f0b]/20 to-[#0A0E0A]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#BCDD19]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#BCDD19]/5 rounded-full blur-3xl"></div> */}

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
                  {/* <motion.div 
                    className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-lg bg-[#1A1E1A]"
                    whileHover={{ rotate: 2, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <img 
                      src={repoImage}
                      alt={repository.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (e.target.src !== DEFAULT_REPO_IMAGE) {
                          e.target.src = DEFAULT_REPO_IMAGE;
                        }
                      }}
                    />
                  </motion.div> */}
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                      {repository.name}
                    </h1>
                    <p className="text-gray-400 text-sm">
                      {truncateDescription(repository.description)}
                    </p>
                  </div>
                </div>
                {/* <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(staticData.status)} bg-opacity-10 border ${getStatusColor(staticData.status)}/20`}>
                  {staticData.status}
                </span> */}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-[#1A1E1A] text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{repository.stars || 0}</span>
                  <span className="text-gray-500">Stars</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{staticData.forks}</span>
                  <span className="text-gray-500">Forks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{staticData.watchers}</span>
                  <span className="text-gray-500">Watchers</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">
                    {githubData.pullRequests.length || staticData.openPRs}
                  </span>
                  <span className="text-gray-500">Open PRs</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span className="font-medium">
                    {githubData.issues.length || staticData.issues}
                  </span>
                  <span className="text-gray-500">Issues</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <motion.a
                  href={repository.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0b0f0b] border border-[#1A1E1A] text-gray-200 rounded-xl hover:bg-[#131712] transition-colors text-sm"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </motion.a>
                {repository.liveDemoUrl && (
                  <motion.a
                    href={repository.liveDemoUrl}
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
                      ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      : "bg-[#0b0f0b] border border-[#1A1E1A] text-gray-200 hover:bg-[#131712]"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Star
                    className="w-4 h-4"
                    fill={isStarred ? "currentColor" : "none"}
                  />
                  <span>{isStarred ? "Starred" : "Star"}</span>
                </motion.button>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-[#0b0f0b] border border-[#1A1E1A] text-gray-200 rounded-xl hover:bg-[#131712] transition-colors text-sm"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GitBranch className="w-4 h-4" />
                  <span>
                    <a
                      href={`https://github.com/${githubInfo?.owner}/${githubInfo?.repo}/fork`}
                      target="_blank"
                    >
                      Fork
                    </a>
                  </span>
                </motion.button>
                {/* <motion.button
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
                </motion.button> */}
                {/* <motion.button
                  onClick={() => copyToClipboard(window.location.href)}
                  className="p-2 bg-[#0b0f0b] border border-[#1A1E1A] text-gray-400 rounded-xl hover:bg-[#131712] hover:text-gray-200 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share className="w-4 h-4" />
                </motion.button> */}
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              className="bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl overflow-hidden mb-6"
              variants={fadeIn}
            >
              <div className="flex border-b border-[#1A1E1A]">
                {["readme", "issues", "pull-requests"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      if (
                        (tab === "issues" || tab === "pull-requests") &&
                        !githubData.loading &&
                        githubData.issues.length === 0 &&
                        githubData.pullRequests.length === 0 &&
                        !githubData.error
                      ) {
                        fetchGitHubData();
                      }
                    }}
                    className={`px-5 py-3 text-sm font-medium transition-all duration-300 relative ${
                      activeTab === tab
                        ? "text-[#BCDD19]"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {tab === "readme" && (
                      <FileText className="w-4 h-4 inline mr-2 -mt-0.5" />
                    )}
                    {tab === "issues" && (
                      <AlertCircle className="w-4 h-4 inline mr-2 -mt-0.5" />
                    )}
                    {tab === "pull-requests" && (
                      <GitPullRequest className="w-4 h-4 inline mr-2 -mt-0.5" />
                    )}
                    {tab
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#BCDD19]"
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "readme" && (
                    <motion.div
                      key="readme"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            markdownToHtml(
                              repository.readme || staticData.fullDescription
                            )
                          ),
                        }}
                      />
                    </motion.div>
                  )}

                  {activeTab === "issues" && (
                    <motion.div
                      key="issues"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">
                          Open Issues
                        </h2>
                        {githubInfo && (
                          <motion.a
                            href={`https://github.com/${githubInfo?.owner}/${githubInfo?.repo}/issues`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#BCDD19] hover:underline"
                            whileHover={{ x: 2 }}
                          >
                            <span>View all on GitHub</span>
                            <ExternalLink className="w-3 h-3" />
                          </motion.a>
                        )}
                      </div>

                      {githubData.loading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="w-6 h-6 text-[#BCDD19] animate-spin" />
                        </div>
                      ) : githubData.error ? (
                        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-xl text-sm">
                          <AlertTriangle className="w-4 h-4 inline mr-2 -mt-0.5" />
                          {githubData.error}
                        </div>
                      ) : githubData.issues.length === 0 ? (
                        <div className="bg-[#0b0f0b] border border-[#1A1E1A] rounded-xl p-6 text-center">
                          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                          <p className="text-gray-400">No open issues</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {githubData.issues.map((issue) => {
                            const status = getIssueStatus(issue);
                            return (
                              <motion.a
                                key={issue.id}
                                href={issue.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-[#0b0f0b] border bor
                                der-[#1A1E1A] rounded-xl p-4 hover:border-[#BCDD19]/30 transition-colors"
                                whileHover={{ y: -2 }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-medium text-white text-sm">
                                    {issue.title}
                                  </h3>
                                  <span
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${status.color}`}
                                  >
                                    {status.icon}
                                    <span>{status.text}</span>
                                  </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                  {issue.body || "No description provided"}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>
                                    #{issue.number} opened{" "}
                                    {formatDate(issue.created_at)} by{" "}
                                    {issue.user?.login}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <span>Comments: {issue.comments}</span>
                                  </div>
                                </div>
                              </motion.a>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "pull-requests" && (
                    <motion.div
                      key="pull-requests"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">
                          Pull Requests
                        </h2>
                        {githubInfo && (
                          <motion.a
                            href={`https://github.com/${githubInfo?.owner}/${githubInfo?.repo}/pulls`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#BCDD19] hover:underline"
                            whileHover={{ x: 2 }}
                          >
                            <span>View all on GitHub</span>
                            <ExternalLink className="w-3 h-3" />
                          </motion.a>
                        )}
                      </div>

                      {githubData.loading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="w-6 h-6 text-[#BCDD19] animate-spin" />
                        </div>
                      ) : githubData.error ? (
                        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-xl text-sm">
                          <AlertTriangle className="w-4 h-4 inline mr-2 -mt-0.5" />
                          {githubData.error}
                        </div>
                      ) : githubData.pullRequests.length === 0 ? (
                        <div className="bg-[#0b0f0b] border border-[#1A1E1A] rounded-xl p-6 text-center">
                          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                          <p className="text-gray-400">No open pull requests</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {githubData.pullRequests.map((pr) => {
                            const status = getPRStatus(pr);
                            return (
                              <motion.a
                                key={pr.id}
                                href={pr.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-[#0b0f0b] border border-[#1A1E1A] rounded-xl p-4 hover:border-[#BCDD19]/30 transition-colors"
                                whileHover={{ y: -2 }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-medium text-white text-sm">
                                    {pr.title}
                                  </h3>
                                  <span
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${status.color}`}
                                  >
                                    {status.icon}
                                    <span>{status.text}</span>
                                  </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                  {pr.body || "No description provided"}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>
                                    #{pr.number} opened{" "}
                                    {formatDate(pr.created_at)} by{" "}
                                    {pr.user?.login}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <span>Comments: {pr.comments}</span>
                                    <span>Commits: {pr.commits}</span>
                                  </div>
                                </div>
                              </motion.a>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div className="lg:col-span-1" variants={slideUp}>
            {/* Repository Image */}
            <motion.div
              className="bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl p-5 mb-5 overflow-hidden"
              variants={fadeIn}
            >
              <img
                src={repoImage}
                alt={repository.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  if (e.target.src !== DEFAULT_REPO_IMAGE) {
                    e.target.src = DEFAULT_REPO_IMAGE;
                  }
                }}
              />
              <h2 className="text-lg font-semibold text-white mb-4">About</h2>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                {repository.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">
                    Maintainer
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#0b0f0b] border border-[#1A1E1A] rounded-full flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-white text-sm">
                      {repository.assignedMentor || "Not assigned"}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">
                    License
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#0b0f0b] border border-[#1A1E1A] rounded-full flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-white text-sm">
                      {staticData.license} License
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">
                    Updated
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#0b0f0b] border border-[#1A1E1A] rounded-full flex items-center justify-center">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-white text-sm">
                      {formatDate(repository.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl p-5 mb-5"
              variants={fadeIn}
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {repository.techStack && repository.techStack.length > 0 ? (
                  repository.techStack.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="bg-[#BCDD19]/10 border border-[#BCDD19]/20 text-[#BCDD19] px-2.5 py-1 rounded-lg text-xs font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">
                    No technologies specified
                  </span>
                )}
              </div>
            </motion.div>

            {/* Tags */}
            {repository.tags && repository.tags.length > 0 && (
              <motion.div
                className="bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl p-5 mb-5"
                variants={fadeIn}
              >
                <h2 className="text-lg font-semibold text-white mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {repository.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="bg-[#1A1E1A] text-gray-300 px-2.5 py-1 rounded-lg text-xs font-medium border border-[#2A2E2A]"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* GitHub Links */}
            {githubInfo && (
              <motion.div
                className="bg-[#0b0f0b] backdrop-blur-sm border border-[#1A1E1A] rounded-2xl p-5"
                variants={fadeIn}
              >
                <h2 className="text-lg font-semibold text-white mb-4">
                  GitHub
                </h2>
                <div className="space-y-3">
                  <motion.a
                    href={`https://github.com/${githubInfo?.owner}/${githubInfo?.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#BCDD19] transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <Github className="w-4 h-4" />
                    <span>Repository</span>
                  </motion.a>
                  <motion.a
                    href={`https://github.com/${githubInfo?.owner}/${githubInfo?.repo}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#BCDD19] transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Issues</span>
                  </motion.a>
                  <motion.a
                    href={`https://github.com/${githubInfo?.owner}/${githubInfo?.repo}/pulls`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#BCDD19] transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <GitPullRequest className="w-4 h-4" />
                    <span>Pull Requests</span>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RepositoryDetails;
