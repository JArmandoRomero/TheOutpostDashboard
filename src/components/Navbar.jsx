import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { profile, loading } = useUser();
  const { logout } = useAuth();

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "";

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        {loading ? "Welcome" : `Welcome${displayName ? `, ${displayName}` : ""}`}
      </h1>

      <button
        onClick={logout}
        className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </header>
  );
}
