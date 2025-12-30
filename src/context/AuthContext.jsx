import { createContext, useContext, useState } from "react";
import { apiFetch } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      /*
        Expected response:
        {
          token: "...",
          user: { id, email, role, firstName, lastName }
        }
      */

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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
