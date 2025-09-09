import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export const Auth = () => {
  const { user, loading, error, login, logout, githubLogin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      return navigate('/auth');
    }
  }, []);
};
