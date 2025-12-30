import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { useAuth } from "./AuthContext";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { user: auth, loading: authLoading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ⛔ Wait until auth is resolved
    if (authLoading) return;

    // ⛔ Not logged in → do NOT call API
    if (!auth?.token) {
      setProfile(null);
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/api/users/me");
        setProfile(data);
      } catch (err) {
        console.warn("Profile load failed:", err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [authLoading, auth]);

  return (
    <UserContext.Provider value={{ profile, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
