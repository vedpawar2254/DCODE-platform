import { createBrowserRouter } from 'react-router-dom';
import Signup from '../pages/Signup/Signup';
import WaitList from '../pages/Waitlist/WaitList';
import Home from '../pages/Home/Home';
import Dashboard from "../pages/Dashboard/Dashboard"
import ContactPage from '../pages/Contact/ContactPage';
import { OnboardingPage } from '../pages/Onboarding/OnboardingPage';
import { element } from 'prop-types';
import { AskExperience } from '../components/Onboarding/AskExperience';


export const routes = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <AppLayout />,
  //   children: [
  {
    path: '/',
    element: <WaitList />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/contact",
    element:<ContactPage/>
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
    children: [
      {path: '/exp',
      element: <AskExperience />},
      {path: '/auth',
        element: <Auth />
      },
      {path: '/createFork', element: <CreateFork />},
      {path: '/createBranch', element: <CreateBranch />},
      {path: '/createCommit', element: <CreateCommit />},
      {path: '/createPullRunChecks', element: <createPullRunChecks />},
      {path: '/end', element: <EndFlow />},
      {path: '/checkStatus', element: <CheckStatus />},

    ]
  }
]);
