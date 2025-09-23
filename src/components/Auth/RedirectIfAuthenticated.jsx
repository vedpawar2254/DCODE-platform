import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const RedirectIfAuthenticated = ({ children }) => {
  const { isLoggedIn, isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      checkAuth();
    }
  }, [isLoggedIn, checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, isCheckingAuth, navigate]);

  if (isCheckingAuth || isLoggedIn) {
    // You can return a loader here if you want
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return children;
};

export default RedirectIfAuthenticated;
