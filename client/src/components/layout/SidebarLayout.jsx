import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useAuthStore } from "../../store/useAuthStore";
import { useSidebar } from "../../context/SidebarContext";

const SidebarLayout = () => {
  const { authUser } = useAuthStore();
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#121212]">
      {authUser && <Sidebar />}
      <div
        className={`${authUser ? (isCollapsed ? "lg:ml-16" : "lg:ml-64") : "ml-0"} transition-all duration-300`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
