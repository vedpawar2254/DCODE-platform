import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
export const OnboardingPage = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
