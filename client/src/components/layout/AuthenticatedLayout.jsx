import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  const { authUser, checkAuth } = useAuthStore();
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
        className={`${authUser ? "lg:ml-64" : "ml-0"} transition-all duration-300`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
