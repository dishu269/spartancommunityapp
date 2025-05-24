import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Will be used for redirection after login

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for user
    try {
      const storedUser = localStorage.getItem('spartanUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      localStorage.removeItem('spartanUser'); // Clear corrupted data
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userData = { email, userId: data.userId }; // Or whatever user data your API returns
        localStorage.setItem('spartanUser', JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
        // router.push('/dashboard'); // Redirect handled by calling component or effect
        return true;
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
        setUser(null);
        setLoading(false);
        return false;
      }
    } catch (err) {
      console.error('Login API error:', err);
      setError('An unexpected error occurred during login.');
      setUser(null);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spartanUser');
    router.push('/'); // Redirect to login or home page after logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
