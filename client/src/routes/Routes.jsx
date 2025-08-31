import { createBrowserRouter } from "react-router-dom";
import WaitList from "../pages/Waitlist/WaitList";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import ContactPage from "../pages/Contact/ContactPage";
import { AuthPage } from "../pages/Auth/AuthPage";
import Onboarding from "../pages/Onboarding/Onboarding";
import AskExperience from "../components/Onboarding/AskExperience";
import Fork from "../components/Onboarding/Fork";

import TermsOfUse from "../pages/Terms/TermsOfUse";
import PrivacyPolicy from "../pages/Terms/PrivacyPolicy";

import { OnboardingPage } from "../pages/Onboarding/OnboardingPage";
import { element } from "prop-types";
import { CreateBranch } from "../components/Onboarding/CreateBranch";
import CreateFork  from "../components/Onboarding/CreateForkStatic";
import { CreatePullRunChecks } from "../components/Onboarding/CreatePullRunChecks";
import { EndFlow } from "../components/Onboarding/EndFlow";
import { LoginSignup } from "../pages/auth/loginSignup";
export const routes = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <AppLayout />,
  //   children: [
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
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
    children: [
      { path: "askExp", element: <AskExperience /> },
      { path: "fork", element: <Fork /> },
    ],
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
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
    children: [
      { path: "exp", element: <AskExperience /> },
      { path: "auth", element: <AuthPage /> },
      { path: "createFork", element: <CreateFork /> },
      { path: "createBranch", element: <CreateBranch /> },
      { path: "createPullRunChecks", element: <CreatePullRunChecks /> },
      { path: "end", element: <EndFlow /> },
    ],
  },
  {
    path: "/auth",
    element: <LoginSignup />,
  },
]);
