import { useAuth } from '../../context/AuthContext';

export const Auth = () => {
  const { user, loading, error, login, logout, githubLogin } = useAuth();
  console.log(user);
  return <button type="button">login with github</button>;
};
