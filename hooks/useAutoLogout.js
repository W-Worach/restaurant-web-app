import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import jwt_decode from "jwt-decode";

const useAutoLogout = () => {
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000; // current time in seconds

        if (decoded.exp < currentTime) {
          console.log("Token expired, logging out...");
          logout();
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        logout();
      }
    }
  }, [token, logout]);
};

export default useAutoLogout;
