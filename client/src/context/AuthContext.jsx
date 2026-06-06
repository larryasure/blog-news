import { createContext, useEffect, useState } from "react";
import api from "../api/api";


export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  


  const login = async (username, password) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("token/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      await fetchMe();
      setSuccess("Login successful.. Please Wait");
      return true;

    } catch (error) {
      console.error(error);
      setError("invalid username or password");
      return false;

    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      await api.post("register/", formData);
      setSuccess("Registration successful");
      return true
    } catch (error) {
      if (error.response?.data) {
        const errors = error.response.data;
        const firstError = Object.values(errors)[0][0];
        setError(firstError);
        return false
      } else {
        setError("Registration Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setUser(null);

    setError("");
    setSuccess("");

  };

  const fetchMe = async () => {
    try {
      const res = await api.get("me/");
      setUser(res.data);
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        await fetchMe();
      } catch (error) {
        console.error(error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess,
        login,
        register,
        logout,
        fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
