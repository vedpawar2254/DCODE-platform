import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import ContactPage from "../pages/Contact/ContactPage";
import AuthPage from "../pages/auth/AuthPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import EmailVerification from "../pages/auth/EmailVerification";
import Onboarding from "../pages/Onboarding/Onboarding";
import AskExperience from "../components/Onboarding/AskExperience";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import SidebarLayout from "../components/layout/SidebarLayout";
import NoSidebarLayout from "../components/layout/NoSidebarLayout";

import TermsOfUse from "../pages/Terms/TermsOfUse";
import PrivacyPolicy from "../pages/Terms/PrivacyPolicy";

import CreateFork from "../components/Onboarding/CreateForkStatic";
import Profile from "../pages/Profile/Profile";

import RepositoriesListing from "../pages/Repositories/repositoriesListing";
import RepositoryDetails from "../pages/Repositories/RepositoryDetails";
import ConnectGithub from "../components/Onboarding/ConnectGithub";
import UserProfile from "../pages/Profile/UserProfile";
import UsersListing from "../pages/Users/UsersListing";

import FaqPage from "../pages/Faqs/FaqsPage"

import { ErrorPage, NotFound } from "../pages/Error";
import Settings from "../pages/Settings/Settings";

export const routes = createBrowserRouter([
  // Public routes (no sidebar)
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/verify-email/:token",
    element: <EmailVerification />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms",
    element: <TermsOfUse />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/faqs",
    element: <FaqPage/>,
    errorElement:<ErrorPage/>
  },
  // Error pages
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  // Authenticated routes (with sidebar when logged in)
  {
    path: "/",
    element: <AuthenticatedLayout />,
    errorElement: <ErrorPage />,
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
            path: "profile",
            element: <Profile />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/settings",
            element: <Settings />,
            errorElement: <ErrorPage />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
            errorElement: <ErrorPage />,
          },
          // {
          //   path: "notifications",
          //   element: <Notifications />,
          // },
          {
            path: "repositories",
            element: <RepositoriesListing />,
            errorElement: <ErrorPage />,
          },
          {
            path: "repositories/:id",
            element: <RepositoryDetails />,
            errorElement: <ErrorPage />,
          },
          {
            path: "users",
            element: <UsersListing />,
            errorElement: <ErrorPage />,
          },
          {
            path: "user/:username",
            element: <UserProfile />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
  // 404 catch-all route
  {
    path: "*",
    element: <NotFound />,
  },
]);
