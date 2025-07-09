import { createBrowserRouter } from 'react-router-dom';
import Signup from '../pages/Signup/Signup';
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
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);
