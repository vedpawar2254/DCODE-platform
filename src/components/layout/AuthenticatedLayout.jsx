import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { SidebarProvider } from "../../context/SidebarContext";
import { MobileWarning } from "../ui/MobileWarning";
import { useEffect } from "react";

const AuthenticatedLayoutContent = () => {
  const navigate = useNavigate();
  const { checkAuth, isLoggedIn } = useAuthStore();

  useEffect(() => {
    (async () => {
      var loggedin = await checkAuth();
      console.log("trgefdw",loggedin)
      if (isLoggedIn === false) {
        console.log("login------", isLoggedIn);
        if (!isLoggedIn) {
          navigate("/auth");
        }
      }
    })();
  }, [checkAuth, isLoggedIn]);

  return (
    <>
      {/* Mobile Warning - Only shows on small screens */}
      <MobileWarning />
      
      {/* Main Content - Hidden on small screens */}
      <div className="none sm:block">
        <Outlet />
      </div>
    </>
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
