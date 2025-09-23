import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const RedirectComponent = () => {
  const { isLoggedIn, isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      // If we don't know the auth status, check it.
      if (!isCheckingAuth && !isLoggedIn) {
        await checkAuth();
      }
    };
    check();
  }, [isLoggedIn, isCheckingAuth, checkAuth]);

  useEffect(() => {
    // After checking, if the user is logged in, redirect to dashboard.
    // Otherwise, redirect to home.
    if (!isCheckingAuth) {
      if (isLoggedIn) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [isLoggedIn, isCheckingAuth, navigate]);

  // Render a loading indicator while checking auth status
  return (
    <div className="flex items-center justify-center h-screen bg-[#121212] text-white">
      Loading...
    </div>
  );
};

export default RedirectComponent;
