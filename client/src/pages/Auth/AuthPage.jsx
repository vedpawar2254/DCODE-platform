import { AuthLayout } from '../../components/Auth/AuthLayout';
import { AuthProvider } from '../../context/AuthContext';
export const AuthPage = () => {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
};
