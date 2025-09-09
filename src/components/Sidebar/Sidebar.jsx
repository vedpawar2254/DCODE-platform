import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useSidebar } from "../../context/SidebarContext";
import {
  FiBarChart2,
  FiBell,
  FiGitBranch,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";
import { axiosInstance } from "../../utils/axios";
import { User } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser } = useAuthStore();
  const { isCollapsed, setIsCollapsed, isMobileMenuOpen, setIsMobileMenuOpen } =
    useSidebar();

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
    {
      icon: <User size={20} />,
      label: "My profile",
      path: "/profile",
      isActive: location.pathname === "/profile",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  if (!authUser) {
    return null; // Don't render sidebar if user is not logged in
  }
  const handleLogout = async () => {
    await axiosInstance.post("/auth/logout");
    navigate("/auth");
  };

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
        className={`fixed left-0 top-0 h-full ${isCollapsed ? "w-[5rem]" : "w-64"} bg-[#161616] text-white z-50 flex flex-col transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div
          className={`${isCollapsed ? "p-6" : "p-6"} border-b border-gray-800 relative`}
        >
          {
            <div
              className={`flex flex-col ${!isCollapsed ? "items-start" : "items-center justify-center"} `}
            >
              <img
                src={!isCollapsed ? "/images/d.png" : "/images/d-favicon.png"}
                className={`h-[2rem] /object-contain ${!isCollapsed ? "translate-x-[-0.3rem]" : ""} transition-all duration-300`}
                style={{ mixBlendMode: "lighten" }}
                alt=""
              />
              <p
                className={`text-gray-400 text-sm mt-2 ${!isCollapsed ? "opacity-100" : "opacity-0"} transition-all duration-300`}
              >
                PLATFORM
              </p>
            </div>
          }
          {/* { ? (
            <>
              <img
                src="/images/d.png"
                className="h-[2rem] translate-x-[-0.3rem]"
                style={{ mixBlendMode: "lighten" }}
                alt=""
              />
              <p className="text-gray-400 text-sm mt-2">PLATFORM</p>
            </>
          ) : (
            
          )} */}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden  lg:block absolute -right-3 top-6 bg-[#161616] border border-gray-600 rounded-full p-1 text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
          >
            {isCollapsed ? (
              <FiChevronRight size={16} />
            ) : (
              <FiChevronLeft size={16} />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex cursor-pointer items-center ${isCollapsed ? "justify-center px-4" : "space-x-3 px-4"} py-3 rounded-lg text-left transition-all duration-200 ${
                  item.isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                title={isCollapsed ? item.label : ""}
              >
                <span
                  className={`${item.isActive ? "text-white" : "text-gray-400"} h-[24px] pt-[0.1rem]`}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div
          className={`${isCollapsed ? "p-4" : "p-4"} border-t border-gray-800 hover:bg-white/3 cursor-pointer`}
          onClick={() => navigate("/profile")}
        >
          <div
            className={`flex items-center group relative ${isCollapsed ? "justify-center" : "space-x-3"}`}
          >
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              {authUser?.data?.avatar ? (
                <img
                  src={authUser.data.avatar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold text-gray-300">
                  {authUser?.data?.name?.includes(" ")
                    ? authUser?.data?.name
                        ?.split(" ")
                        .map((e) => e.charAt(0)?.toUpperCase())
                    : authUser?.data?.name?.charAt(0)?.toUpperCase() +
                      authUser?.data?.name?.charAt(1)?.toUpperCase()}
                </span>
              )}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {authUser?.data?.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {authUser?.data?.email}
                </p>
              </div>
            )}
            {!isCollapsed && (
              <div
                onClick={() => handleLogout()}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center"
              >
                <button className="bg-gray-700 text-gray-300 hover:text-white rounded-md p-2 group-hover:opacity-100 opacity-30 transition-opacity duration-300">
                  <FiLogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
