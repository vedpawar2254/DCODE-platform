import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout/AppLayout';
import WaitList from '../pages/Waitlist/WaitList';
import Home from '../pages/Home/Home';

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
  }
]);
