import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../utils/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Load user profile on app start
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await apiFetch(
          "/api/users/me"
        );
        setProfile(data);
      } catch (err) {
        console.warn("Profile load failed:", err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        profile,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
