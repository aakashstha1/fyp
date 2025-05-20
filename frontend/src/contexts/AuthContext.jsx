import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:8000/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (inputs) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, inputs, {
        withCredentials: true,
      });

      setCurrentUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      console.log(error);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      const message = error.response?.data?.message || "Logout failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
