import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000; // Convert to seconds since epoch

        if (decodedToken.exp < currentTime) {
          logout();
        } else {
          setIsLoggedIn(true);
          setUserId(storedUserId);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error decoding the token:", error);
        logout(); 
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
