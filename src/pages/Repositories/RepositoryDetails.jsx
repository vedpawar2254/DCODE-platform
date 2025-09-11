import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  GitFork,
  Eye,
  Users,
  Github,
  ExternalLink,
  Calendar,
  FileText,
  Loader2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import markdownToHtml from "../../utils/markdowntohtml";
import DOMPurify from "dompurify";
import { axiosInstance } from "../../utils/axios";

// Default fallback image
const DEFAULT_REPO_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23BCDD19'/%3E%3Ctext x='50' y='55' font-family='Arial, sans-serif' font-size='14' fill='%23000' text-anchor='middle'%3ERepo%3C/text%3E%3C/svg%3E";

const RepositoryDetails = () => {
  const { id } = useParams();
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("readme");
  const [isStarred, setIsStarred] = useState(false);
  const [repoImage, setRepoImage] = useState(DEFAULT_REPO_IMAGE);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [githubData, setGithubData] = useState({
    issues: [],
    pullRequests: [],
    loading: false,
    error: null,
  });

  // Extract owner/repo from GitHub URL
  const extractGitHubInfo = useCallback((url) => {
    if (!url) return null;
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)(?:\.git)?$/);
    return match ? { owner: match[1], repo: match[2] } : null;
  }, []);

  // Fetch repository details
  useEffect(() => {
    const fetchRepository = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/project/get/${id}`);
        setRepository(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load repository.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRepository();
  }, [id]);

  // Fetch GitHub issues & PRs
  const fetchGitHubData = useCallback(async () => {
    if (githubData.loading) return;
    setGithubData(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await axiosInstance.get(`/project/${id}/github-stats`);
      const { issues, pullRequests } = response.data.data;
      setGithubData({ issues, pullRequests, loading: false, error: null });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch GitHub data.";
      setGithubData(prev => ({ ...prev, loading: false, error: errorMessage }));
    }
  }, [id, githubData.loading]);

  // Try GitHub OpenGraph image
  const tryGithubImage = useCallback((repository) => {
    const githubInfo = repository?.repositoryUrl
      ? extractGitHubInfo(repository.repositoryUrl)
      : null;

    if (githubInfo && !imageLoaded) {
      const githubImageUrl = `https://opengraph.githubassets.com/1/${githubInfo.owner}/${githubInfo.repo}`;
      const img = new Image();

      img.onload = () => {
        setRepoImage(githubImageUrl);
        setImageLoaded(true);
      };

      img.onerror = () => setImageLoaded(true);

      img.src = githubImageUrl;
    } else {
      setImageLoaded(true);
    }
  }, [extractGitHubInfo, imageLoaded]);

  // Set repo image on load
  useEffect(() => {
    if (repository) {
      if (repository.imageUrl) {
        setRepoImage(repository.imageUrl);
        setImageLoaded(true);
      } else {
        tryGithubImage(repository);
      }
    }
  }, [repository, tryGithubImage]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "some time ago";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "1 month ago";
    if (diffMonths < 12) return `${diffMonths} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6FF3D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-center p-4">
        <div>
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            {error}
          </div>
          <Link to="/repositories" className="inline-flex items-center text-[#C6FF3D] hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Repositories
          </Link>
        </div>
      </div>
    );
  }

  if (!repository) return null;

  const githubInfo = extractGitHubInfo(repository.repositoryUrl);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back Link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/repositories" className="inline-flex items-center text-[#A1A1AA] hover:text-[#C6FF3D] transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Repositories</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Header Card */}
            <div className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-6 mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{repository.name}</h1>
              <p className="text-[#A1A1AA] text-sm mb-6">{repository.description}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-[#23252B] text-sm">
                <StatItem icon={<Star size={16} className="text-yellow-400" />} value={repository.stars || 0} label="Stars" />
                <StatItem icon={<GitFork size={16} className="text-blue-400" />} value={repository.forks || 0} label="Forks" />
                <StatItem icon={<Eye size={16} className="text-gray-400" />} value={repository.watchers || 0} label="Watchers" />
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <ActionButton href={repository.repositoryUrl} icon={<Github size={16} />} text="Code" primary={false} />
                {repository.liveDemoUrl && <ActionButton href={repository.liveDemoUrl} icon={<ExternalLink size={16} />} text="Live Demo" primary={true} />}
                <button onClick={() => setIsStarred(!isStarred)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${isStarred ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20" : "bg-[#23252B] hover:bg-[#2A2A2A] text-white"}`}>
                  <Star size={16} fill={isStarred ? "currentColor" : "none"} /><span>{isStarred ? "Starred" : "Star"}</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-[#1A1A1A] border border-[#23252B] rounded-xl overflow-hidden">
              <div className="flex border-b border-[#23252B]">
                {["readme", "issues", "pull-requests"].map(tab => (
                  <button key={tab} onClick={() => { setActiveTab(tab); if (tab !== 'readme' && !githubData.issues.length && !githubData.pullRequests.length) fetchGitHubData(); }} className={`px-5 py-3 text-sm font-medium transition-colors relative ${activeTab === tab ? "text-white" : "text-[#A1A1AA] hover:text-white"}`}>
                    {tab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    {activeTab === tab && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6FF3D]" layoutId="activeTab" />}
                  </button>
                ))}
              </div>
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'readme' && (
                    <motion.div key="readme" className="prose prose-invert max-w-none prose-p:text-[#A1A1AA] prose-headings:text-white" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(markdownToHtml(repository.readme || "### No README Provided\n\nThis project does not have a README file yet.")) }}
                      variants={tabContentVariants} initial="hidden" animate="visible" exit="exit"
                    />
                  )}
                  {(activeTab === 'issues' || activeTab === 'pull-requests') && (
                    <GitHubContent
                      key={activeTab}
                      type={activeTab}
                      data={activeTab === 'issues' ? githubData.issues : githubData.pullRequests}
                      loading={githubData.loading}
                      error={githubData.error}
                      githubInfo={githubInfo}
                      formatDate={formatDate}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-5">
              <img src={repoImage} alt={`${repository.name} preview`} className="w-full h-40 object-cover rounded-lg mb-4 bg-[#23252B]" onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_REPO_IMAGE; }} />
              <div className="space-y-4">
                <SidebarInfoItem icon={<Users size={14} />} label="Maintainer" value={repository.assignedMentor || "Not Assigned"} />
                <SidebarInfoItem icon={<FileText size={14} />} label="License" value={repository.license || "N/A"} />
                <SidebarInfoItem icon={<Calendar size={14} />} label="Last Updated" value={formatDate(repository.updatedAt)} />
              </div>
            </div>

            {repository.techStack?.length > 0 && (
              <div className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {repository.techStack.map(tech => <span key={tech} className="bg-[#C6FF3D]/10 text-[#C6FF3D] px-2.5 py-1 rounded-md text-xs font-medium">{tech}</span>)}
                </div>
              </div>
            )}

            {repository.tags?.length > 0 && (
              <div className="bg-[#1A1A1A] border border-[#23252B] rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {repository.tags.map(tag => <span key={tag} className="bg-[#2A2A2A] text-[#A1A1AA] px-2.5 py-1 rounded-md text-xs font-medium">#{tag}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const StatItem = ({ icon, value, label }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="font-semibold text-white">{value}</span>
    <span className="text-[#A1A1AA]">{label}</span>
  </div>
);

const ActionButton = ({ href, icon, text, primary }) => (
  <motion.a href={href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${primary ? 'bg-[#C6FF3D] text-black hover:bg-[#B8E835]' : 'bg-[#23252B] text-white hover:bg-[#2A2A2A]'}`} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
    {icon}<span>{text}</span>
  </motion.a>
);

const SidebarInfoItem = ({ icon, label, value }) => (
  <div>
    <h3 className="text-xs text-[#A1A1AA] mb-1">{label}</h3>
    <div className="flex items-center gap-2 text-white text-sm">
      {icon}<span>{value}</span>
    </div>
  </div>
);

const GitHubContent = ({ type, data, loading, error, githubInfo, formatDate }) => {
  const title = type === 'issues' ? 'Open Issues' : 'Pull Requests';
  const emptyMessage = type === 'issues' ? 'No open issues found.' : 'No open pull requests found.';
  const viewAllLink = `https://github.com/${githubInfo?.owner}/${githubInfo?.repo}/${type}`;

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-[#C6FF3D] animate-spin" /></div>;
  if (error) return <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm"><AlertTriangle className="w-4 h-4 inline mr-2" />{error}</div>;

  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {githubInfo && (
          <a href={viewAllLink} target="_blank" rel="noopener noreferrer" className="text-sm text-[#A1A1AA] hover:text-[#C6FF3D] transition-colors flex items-center gap-1">
            View all on GitHub
            <ExternalLink size={14} />
          </a>
        )}
      </div>
      {data.length === 0 ? (
        <div className="bg-[#121212] border border-[#23252B] rounded-xl p-6 text-center text-[#A1A1AA]">
          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map(item => (
            <a key={item.id} href={item.html_url} target="_blank" rel="noopener noreferrer" className="block bg-[#121212] border border-[#23252B] rounded-lg p-4 hover:border-[#C6FF3D]/50 transition-colors">
              <p className="font-medium text-white text-sm truncate">{item.title}</p>
              <p className="text-xs text-[#A1A1AA] mt-1">
                #{item.number} opened {formatDate(item.created_at)} by {item.user?.login}
              </p>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default RepositoryDetails;
