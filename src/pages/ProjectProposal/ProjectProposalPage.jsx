import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  X,
  Upload,
  Code,
  GitBranch,
  Globe,
  Users,
  Sparkles,
  FileText,
  Github,
  Star,
  ExternalLink,
  Folder,
} from "lucide-react";
import Button from "../../components/ui/Button/Button";
import { toast } from "sonner";
import axios from "axios";

const API_URL = "http://localhost:3008/api/v1/projects";

const ProjectProposalPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    repositoryUrl: "",
    techStack: [],
    tags: [],
    liveDemoUrl: "",
    assignedMentor: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newTechStack, setNewTechStack] = useState("");
  const [newTag, setNewTag] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Project name cannot exceed 100 characters";
    }

    if (formData.description.length > 1000) {
      newErrors.description = "Description cannot exceed 1000 characters";
    }

    // URL validations
    if (
      formData.repositoryUrl &&
      !/^https:\/\/(github|gitlab|bitbucket)\.com\/.+/.test(
        formData.repositoryUrl
      )
    ) {
      newErrors.repositoryUrl =
        "Repository URL must be a valid Git repo (GitHub, GitLab, or Bitbucket)";
    }

    if (formData.liveDemoUrl && !/^https?:\/\/.+/.test(formData.liveDemoUrl)) {
      newErrors.liveDemoUrl = "Live demo URL must be a valid URL";
    }

    if (formData.assignedMentor && formData.assignedMentor.length > 50) {
      newErrors.assignedMentor = "Mentor name cannot exceed 50 characters";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const addTechStack = () => {
    if (
      newTechStack.trim() &&
      !formData.techStack.includes(newTechStack.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, newTechStack.trim()],
      }));
      setNewTechStack("");
    }
  };

  const removeTechStack = (index) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(API_URL, formData);

      toast.success("Project proposal submitted successfully!");
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        repositoryUrl: "",
        techStack: [],
        tags: [],
        liveDemoUrl: "",
        assignedMentor: "",
      });
    } catch (err) {
      console.error("Project proposal submit failed:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to submit project proposal. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError) =>
    `w-full px-4 py-3 border-2 rounded-lg text-white bg-gray-900/30 focus:outline-none text-sm transition-all duration-200 ${
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-gray-700 focus:border-[#BCDD19] focus:bg-gray-900/50"
    }`;

  const textareaClasses = (hasError) =>
    `w-full px-4 py-3 border-2 rounded-lg text-white bg-gray-900/30 focus:outline-none text-sm transition-all duration-200 resize-none ${
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-gray-700 focus:border-[#BCDD19] focus:bg-gray-900/50"
    }`;

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Header & Graphic */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <h1
                className="text-3xl lg:text-4xl font-semibold leading-tight"
                style={{ fontFamily: "Poppins" }}
              >
                Submit Your <span className="text-[#BCDD19]">Project</span>
              </h1>

              <p className="text-gray-400 text-md leading-relaxed">
                Share your innovative project with the DCODE community. Connect
                with mentors, showcase your skills, and bring your ideas to
                life.
              </p>
            </div>

            {/* Graphic */}
            <div className="relative w-full h-full min-h-[600px]">
              {/* Main container with gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#BCDD19]/5 via-gray-900/20 to-transparent rounded-2xl border border-[#BCDD19]/10">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-[#BCDD19]/30 rounded-full blur-xl animate-pulse-slow"></div>
                  <div
                    className="absolute bottom-20 right-20 w-40 h-40 bg-[#BCDD19]/20 rounded-full blur-xl animate-pulse-slow"
                    style={{ animationDelay: "2s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#BCDD19]/25 rounded-full blur-lg animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>

                {/* Project proposal showcase */}
                <div className="relative z-10 p-8 space-y-6">
                  {/* Project showcase header */}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">
                      What You'll Submit
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Your project will be showcased with these details
                    </p>
                  </div>

                  {/* Project card mockup */}
                  <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-[#BCDD19]/20 rounded-lg flex items-center justify-center">
                        <Code className="w-8 h-8 text-[#BCDD19]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-200 font-semibold mb-2">
                          Your Project Name
                        </h4>
                        <p className="text-gray-400 text-sm mb-3">
                          A brief description of your innovative project and
                          what makes it unique...
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-[#BCDD19]/20 text-[#BCDD19] px-2 py-1 rounded-full text-xs">
                            React
                          </span>
                          <span className="bg-[#BCDD19]/20 text-[#BCDD19] px-2 py-1 rounded-full text-xs">
                            Node.js
                          </span>
                          <span className="bg-[#BCDD19]/20 text-[#BCDD19] px-2 py-1 rounded-full text-xs">
                            MongoDB
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center gap-2">
                            <Star size={18} /> 0 stars
                          </span>
                          <span className="flex items-center gap-2">
                            <ExternalLink size={18} /> Live Demo
                          </span>
                          <span className="flex items-center gap-2">
                            <Folder size={18} /> Repository
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-200 mb-4">
                      Why Submit Your Project?
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#BCDD19]/20 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#BCDD19]" />
                        </div>
                        <span className="text-gray-300 text-sm">
                          Get feedback from experienced mentors
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#BCDD19]/20 rounded-full flex items-center justify-center">
                          <Globe className="w-4 h-4 text-[#BCDD19]" />
                        </div>
                        <span className="text-gray-300 text-sm">
                          Showcase your work to the community
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#BCDD19]/20 rounded-full flex items-center justify-center">
                          <GitBranch className="w-4 h-4 text-[#BCDD19]" />
                        </div>
                        <span className="text-gray-300 text-sm">
                          Connect with other developers
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#BCDD19]/20 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-[#BCDD19]" />
                        </div>
                        <span className="text-gray-300 text-sm">
                          Build your portfolio and reputation
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-[#BCDD19]/10 rounded-xl animate-float"></div>
                  <div
                    className="absolute bottom-4 left-4 w-12 h-12 bg-[#BCDD19]/15 rounded-lg animate-float"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute top-1/3 right-8 w-8 h-8 bg-[#BCDD19]/20 rounded-full animate-float"
                    style={{ animationDelay: "2s" }}
                  ></div>

                  {/* Success indicator */}
                  {/* <div className="absolute bottom-6 right-6">
                     <div className="bg-[#7A900F]/20 rounded-full p-3 border border-[#7A900F]/30">
                       <Sparkles className="w-6 h-6 text-[#7A900F]" />
                     </div>
                   </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="space-y-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Details */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-200">
                  Project Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Project Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your project name"
                      className={inputClasses(errors.name)}
                      maxLength={100}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-2">{errors.name}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-2">
                      {formData.name.length}/100 characters
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="assignedMentor"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Maintainer Name *
                    </label>
                    <input
                      id="assignedMentor"
                      type="text"
                      name="assignedMentor"
                      value={formData.assignedMentor}
                      onChange={handleInputChange}
                      placeholder="Enter maintainer name"
                      className={inputClasses(errors.assignedMentor)}
                      maxLength={50}
                    />
                    {errors.assignedMentor && (
                      <p className="text-red-400 text-xs mt-2">
                        {errors.assignedMentor}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project, its purpose, and what makes it unique..."
                    rows={4}
                    className={textareaClasses(errors.description)}
                    maxLength={1000}
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs mt-2">
                      {errors.description}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs mt-2">
                    {formData.description.length}/1000 characters
                  </p>
                </div>
              </div>

              {/* Links & URLs */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-200">
                  Links & URLs
                </h2>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="repositoryUrl"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Repository URL
                    </label>
                    <input
                      id="repositoryUrl"
                      type="url"
                      name="repositoryUrl"
                      value={formData.repositoryUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/repository"
                      className={inputClasses(errors.repositoryUrl)}
                    />
                    {errors.repositoryUrl && (
                      <p className="text-red-400 text-xs mt-2">
                        {errors.repositoryUrl}
                      </p>
                    )}
                    <p className="text-gray-500 text-xs mt-2">
                      Supports GitHub, GitLab, and Bitbucket
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="liveDemoUrl"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Live Demo URL
                      </label>
                      <input
                        id="liveDemoUrl"
                        type="url"
                        name="liveDemoUrl"
                        value={formData.liveDemoUrl}
                        onChange={handleInputChange}
                        placeholder="https://your-demo-site.com"
                        className={inputClasses(errors.liveDemoUrl)}
                      />
                      {errors.liveDemoUrl && (
                        <p className="text-red-400 text-xs mt-2">
                          {errors.liveDemoUrl}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="imageUrl"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Project Image URL
                      </label>
                      <input
                        id="imageUrl"
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/project-image.png"
                        className={inputClasses(errors.imageUrl)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack & Tags */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-200">
                  Tech Stack & Tags
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Tech Stack */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Tech Stack
                    </label>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTechStack}
                          onChange={(e) => setNewTechStack(e.target.value)}
                          placeholder="Add technology (e.g., React, Node.js)"
                          className="flex-1 px-4 py-3 border-2 border-gray-700 rounded-lg text-white bg-gray-900/30 focus:outline-none focus:border-[#BCDD19] text-sm transition-all duration-200"
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addTechStack())
                          }
                        />
                        <button
                          type="button"
                          onClick={addTechStack}
                          className="px-4 py-3 bg-[#BCDD19] hover:bg-[#BCDD19]/80 text-black font-medium rounded-lg transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {formData.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 bg-[#BCDD19]/20 text-[#BCDD19] px-3 py-1 rounded-full text-sm border border-[#BCDD19]/30"
                            >
                              {tech}
                              <button
                                type="button"
                                onClick={() => removeTechStack(index)}
                                className="hover:text-red-400 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Tags
                    </label>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add tag (e.g., web-app, mobile, AI)"
                          className="flex-1 px-4 py-3 border-2 border-gray-700 rounded-lg text-white bg-gray-900/30 focus:outline-none focus:border-[#BCDD19] text-sm transition-all duration-200"
                          onKeyPress={(e) =>
                            e.key === "Enter" && (e.preventDefault(), addTag())
                          }
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="px-4 py-3 bg-[#BCDD19] hover:bg-[#BCDD19]/80 text-black font-medium rounded-lg transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm border border-gray-600"
                            >
                              #{tag}
                              <button
                                type="button"
                                onClick={() => removeTag(index)}
                                className="hover:text-red-400 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-start pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 text-lg font-medium bg-[#BCDD19] hover:bg-[#BCDD19]/80 text-black rounded-lg transition-all duration-200 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Proposal"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProposalPage;
