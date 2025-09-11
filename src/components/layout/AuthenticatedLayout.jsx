import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { SidebarProvider } from "../../context/SidebarContext";
import { useEffect } from "react";

const AuthenticatedLayoutContent = () => {
  const navigate = useNavigate();
  const { checkAuth, isLoggedIn } = useAuthStore();

  useEffect(() => {
    (async () => {
      // var loggedin = await checkAuth();
      if (isLoggedIn === false) {
        console.log("login------", isLoggedIn);
        if (!isLoggedIn) {
          navigate("/auth");
        }
      }
    })();
  }, [checkAuth, isLoggedIn]);

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
