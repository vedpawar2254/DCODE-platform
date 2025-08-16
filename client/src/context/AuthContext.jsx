// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1️⃣ Create Context
const AuthContext = createContext(null);

// 2️⃣ Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 👉 Placeholder auth functions
  const register = async formData => {
    // TODO: call /auth/register
  };

  const login = async credentials => {
    // TODO: call /auth/login
  };

  const logout = async () => {
    // TODO: call /auth/logout
  };

  const getProfile = async () => {
    // TODO: call /auth/profile
  };

  const githubLogin = () => {
    // TODO: redirect to backend GitHub OAuth endpoint
  };

  useEffect(() => {
    const init = async () => {
      try {
        await getProfile();
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
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
