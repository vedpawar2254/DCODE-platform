import React from "react";
import { motion } from "framer-motion";
import { FiGitBranch, FiPlus, FiSearch, FiFilter } from "react-icons/fi";

const Repositories = () => {
  return (
    <motion.div
      className="bg-[#121212] text-white p-4 sm:p-6 relative min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FiGitBranch className="text-green-400" size={32} />
            <h1 className="text-3xl font-bold">Repositories</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <FiSearch size={16} />
              <span>Search</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <FiFilter size={16} />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
              <FiPlus size={16} />
              <span>New Repository</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <FiGitBranch className="mx-auto text-gray-500 mb-4" size={64} />
          <h2 className="text-xl font-semibold mb-2">No Repositories Found</h2>
          <p className="text-gray-400 mb-6">
            Connect your GitHub account or create a new repository to get
            started with your coding journey on DCODE.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
              Connect GitHub
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
              Create Repository
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Repositories;
