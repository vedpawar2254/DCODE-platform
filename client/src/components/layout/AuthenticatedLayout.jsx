import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useAuthStore } from "../../store/useAuthStore";
import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { useEffect } from "react";

const AuthenticatedLayoutContent = () => {
  const navigate = useNavigate();
  const { authUser, checkAuth } = useAuthStore();
  const { isCollapsed } = useSidebar();

  useEffect(() => {
    (async () => {
      var loggedin = await checkAuth();
      if (!loggedin.status) {
        navigate("/auth");
      }
    })();
  }, []);

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

const AuthenticatedLayout = () => {
  return (
    <SidebarProvider>
      <AuthenticatedLayoutContent />
    </SidebarProvider>
  );
};

export default AuthenticatedLayout;
