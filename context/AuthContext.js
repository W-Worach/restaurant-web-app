import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    const router = useRouter();
    router.push('/');
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};