'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('mg_token');
    const storedUser = localStorage.getItem('mg_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  function login(tokenValue, userData) {
    localStorage.setItem('mg_token', tokenValue);
    localStorage.setItem('mg_user', JSON.stringify(userData));
    setToken(tokenValue);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem('mg_token');
    localStorage.removeItem('mg_user');
    setToken(null);
    setUser(null);
  }

  const isAdmin = user?.role === 'Administrador';
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
