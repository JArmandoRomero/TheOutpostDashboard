import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Load auth from storage ONCE
useEffect(() => {
  try {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.token) {
        setUser(parsed);
      }
    }
  } catch {
    localStorage.removeItem("auth");
  } finally {
    setLoading(false);
  }
}, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      const authData = {
        token: data.token,
        user: data.user
      };

      setUser(authData);
      localStorage.setItem("auth", JSON.stringify(authData));

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Login failed"
      };
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
