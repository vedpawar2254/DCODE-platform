import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout/AppLayout';
import WaitList from '../pages/WaitList';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />
  },
  {
    path: '/waitlist',
    element: <WaitList />
  }
]);
