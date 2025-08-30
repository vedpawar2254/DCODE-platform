import { createBrowserRouter } from 'react-router-dom';
import WaitList from '../pages/Waitlist/WaitList';
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import ContactPage from '../pages/Contact/ContactPage';
import { AuthPage } from '../pages/Auth/AuthPage';
import Onboarding from '../pages/Onboarding/Onboarding';
import AskExperience from '../components/Onboarding/AskExperience';

export const routes = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <AppLayout />,
  //   children: [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/waitlist',
    element: <WaitList />
  },
  {
    path: '/auth',
    element: <AuthPage />
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
    element: <Onboarding />,
    children: [{ path: 'askExp', element: <AskExperience /> }]
  }
]);
