import { createBrowserRouter } from 'react-router-dom';
import Signup from '../pages/Signup/Signup';
import WaitList from '../pages/Waitlist/WaitList';
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import ContactPage from '../pages/Contact/ContactPage';
import { OnboardingPage } from '../pages/Onboarding/OnboardingPage';
import { element } from 'prop-types';
import { AskExperience } from '../components/Onboarding/AskExperience';
import { Auth } from '../components/Onboarding/Auth';
import { CreateBranch } from '../components/Onboarding/CreateBranch';
import { CreateFork } from '../components/Onboarding/CreateFork';
import { CreatePullRunChecks } from '../components/Onboarding/CreatePullRunChecks';
import { EndFlow } from '../components/Onboarding/EndFlow';

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
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
    children: [
      { path: 'exp', element: <AskExperience /> },
      { path: 'auth', element: <Auth /> },
      { path: 'createFork', element: <CreateFork /> },
      { path: 'createBranch', element: <CreateBranch /> },
      { path: 'createPullRunChecks', element: <CreatePullRunChecks /> },
      { path: 'end', element: <EndFlow /> }
    ]
  }
]);
