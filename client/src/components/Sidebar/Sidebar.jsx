import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { FiBarChart2, FiBell, FiGitBranch, FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifiedUser } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      icon: <FiBarChart2 size={20} />,
      label: "Dashboard",
      path: "/dashboard",
      isActive: location.pathname === "/dashboard",
    },
    {
      icon: <FiBell size={20} />,
      label: "Notifications",
      path: "/notifications",
      isActive: location.pathname === "/notifications",
    },
    {
      icon: <FiGitBranch size={20} />,
      label: "Repositories",
      path: "/repositories",
      isActive: location.pathname === "/repositories",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  if (!verifiedUser) {
    return null; // Don't render sidebar if user is not logged in
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-gray-900 text-white rounded-lg"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-[#161616] text-white z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800">
          <img
            src="/images/d.png"
            className="h-[2rem] translate-x-[-0.3rem]"
            style={{ mixBlendMode: "lighten" }}
            alt=""
          />
          <p className="text-gray-400 text-sm mt-2">PLATFORM</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex cursor-pointer items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  item.isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span
                  className={item.isActive ? "text-white" : "text-gray-400"}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              {verifiedUser?.profilePicture ? (
                <img
                  src={verifiedUser.profilePicture}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold text-gray-300">
                  {verifiedUser?.data.name?.includes(" ")
                    ? verifiedUser?.data.name
                        ?.split(" ")
                        .map((e) => e.charAt(0)?.toUpperCase())
                    : verifiedUser?.data.name?.charAt(0)?.toUpperCase() +
                      verifiedUser?.data.name?.charAt(1)?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {verifiedUser?.data.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {verifiedUser?.data.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
