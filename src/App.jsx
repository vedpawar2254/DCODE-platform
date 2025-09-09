import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Check authentication status when app loads
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
