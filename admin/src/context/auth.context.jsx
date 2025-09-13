/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../apis/apis";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  const isLoggedIn = useMemo(() => !!token, [token]);
  const validToken = useMemo(() => (token ? `Bearer ${token}` : ""), [token]);

  const storeToken = async (serverToken) => {
    try {
      localStorage.setItem("token", serverToken);
      setToken(serverToken);
      await loggedInUser(serverToken);
    } catch (error) {
      console.error("Failed to store token:", error);
    };
  };

  const logOutUser = async () => {
    try {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logout successful.");
    } catch (error) {
      console.error("Failed to remove token and admin:", error);
    };
  };

  const loggedInUser = async (externalToken = null) => {
    setIsAuthResolved(false);
    const storedToken = externalToken || localStorage.getItem("token");
    if (!storedToken) {
      setToken(null);
      setUser(null);
      setIsAuthResolved(true);
      return;
    };
    setToken(storedToken);
    try {
      setIsLoading(true);
      const response = await axios.get(apis.auth.loggedIn, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response?.data?.success) {
        const userData = response?.data?.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      };
    } catch (error) {
      console.error("Error while fetching admin:", error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
      setIsAuthResolved(true);
    };
  };

  useEffect(() => {
    loggedInUser();
  }, []);

  const value = {
    storeToken,
    logOutUser,
    isLoggedIn,
    user,
    isLoading,
    validToken,
    loggedInUser,
    isAuthResolved,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
