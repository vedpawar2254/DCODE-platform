import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { ErrorBoundary } from "./pages/Error";

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Check authentication status when app loads
    checkAuth();
  }, [checkAuth]);

  return (
    <ErrorBoundary>
      <RouterProvider router={routes} />
      <Toaster position="top-right" />
    </ErrorBoundary>
  );
};

export default App;
