import { createBrowserRouter } from "react-router-dom";
import WaitList from "../pages/Waitlist/WaitList";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import ContactPage from "../pages/Contact/ContactPage";
import AuthPage from "../pages/auth/AuthPage";
import Onboarding from "../pages/Onboarding/Onboarding";
import AskExperience from "../components/Onboarding/AskExperience";
import AuthenticatedLayout from "../components/Layout/AuthenticatedLayout";
import SidebarLayout from "../components/Layout/SidebarLayout";
import NoSidebarLayout from "../components/Layout/NoSidebarLayout";
import Notifications from "../pages/Notifications/Notifications";

import TermsOfUse from "../pages/Terms/TermsOfUse";
import PrivacyPolicy from "../pages/Terms/PrivacyPolicy";

import CreateFork from "../components/Onboarding/CreateForkStatic";
import Profile from "../pages/Profile/Profile";

import RepositoriesListing from "../pages/Repositories/repositoriesListing";
import RepositoryDetails from "../pages/Repositories/RepositoryDetails";
import ConnectGithub from "../components/Onboarding/ConnectGithub";

export const routes = createBrowserRouter([
  // Public routes (no sidebar)
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/waitlist",
    element: <WaitList />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/terms",
    element: <TermsOfUse />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "onboarding",
    element: <Onboarding />,
    children: [
      { path: "", element: <AskExperience /> },
      { path: "fork", element: <CreateFork /> },
      { path: "connect-github", element: <ConnectGithub /> },
    ],
  },

  // Authenticated routes (with sidebar when logged in)
  {
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      // Routes without sidebar
      {
        path: "/",
        element: <NoSidebarLayout />,
        children: [
          {
            path: "onboarding",
            element: <Onboarding />,
            children: [
              { path: "", element: <AskExperience /> },
              { path: "fork", element: <CreateFork /> },
              { path: "connect-github", element: <ConnectGithub /> },
            ],
          },
        ],
      },
      // Routes with sidebar
      {
        path: "/",
        element: <SidebarLayout />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "repositories",
            element: <RepositoriesListing />,
          },
          {
            path: "repositories/:id",
            element: <RepositoryDetails />,
          },
        ],
      },
    ],
  },
]);
