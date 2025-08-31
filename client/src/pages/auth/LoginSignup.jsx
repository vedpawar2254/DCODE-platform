import { AuthLayout } from '../../components/Auth/AuthLayout';
import { AuthProvider } from '../../context/AuthContext';
export const LoginSignup = () => {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
};
