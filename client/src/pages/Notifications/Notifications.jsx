import React from "react";
import { motion } from "framer-motion";
import { FiBell, FiSettings } from "react-icons/fi";

const Notifications = () => {
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
            <FiBell className="text-green-400" size={32} />
            <h1 className="text-3xl font-bold">Notifications</h1>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
            <FiSettings size={16} />
            <span>Settings</span>
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <FiBell className="mx-auto text-gray-500 mb-4" size={64} />
          <h2 className="text-xl font-semibold mb-2">No Notifications Yet</h2>
          <p className="text-gray-400 mb-6">
            When you have notifications, they'll appear here. Stay tuned for
            updates on your projects and activities!
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
            Configure Notifications
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications;
