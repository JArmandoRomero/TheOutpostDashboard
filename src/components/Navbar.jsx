import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const PUBLIC_SITE =
  import.meta.env.VITE_PUBLIC_SITE_URL || "https://www.theoutposttravel.com";
  const { profile, loading } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "";

  const handleLogout = () => {
    logout();          // clear auth + storage
     window.location.href = PUBLIC_SITE; // redirect to login page
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        {loading
          ? "Welcome"
          : `Welcome${displayName ? `, ${displayName}` : ""}`}
      </h1>

      <button
        onClick={handleLogout}
        className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </header>
  );
}
