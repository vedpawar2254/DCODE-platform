import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  axios.defaults.withCredentials = true;
  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  const register = async formData => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_github_login: false
      });
      setUser(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async credentials => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: credentials.email,
        password: credentials.password
      });
      setUser(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.get(`${BASE_URL}/auth/logout`);
      setUser(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/auth/profile`);
      setUser(response.data.data);
      return response.data;
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const githubLogin = () => {
    window.location.href = `${BASE_URL}/auth/github`;
  };

  useEffect(() => {
    const init = async () => {
      await getProfile();
    };
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        githubLogin,
        getProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
