import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { SidebarProvider } from "../../context/SidebarContext";
import { useEffect } from "react";

const AuthenticatedLayoutContent = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    (async () => {
      var loggedin = await checkAuth();
      if (!loggedin.status) {
        navigate("/auth");
      }
    })();
  }, []);

  return <Outlet />;
};

const AuthenticatedLayout = () => {
  return (
    <SidebarProvider>
      <AuthenticatedLayoutContent />
    </SidebarProvider>
  );
};

export default AuthenticatedLayout;
