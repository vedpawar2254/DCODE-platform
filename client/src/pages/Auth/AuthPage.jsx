import { AuthLayout } from '../../components/Auth/AuthLayout';
import { AuthProvider } from '../../context/AuthContext';
const AuthPage = () => {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
};

export default AuthPage;
