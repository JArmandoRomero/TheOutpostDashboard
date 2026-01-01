import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Wait for auth to hydrate
  if (loading) return null; // or spinner

  // 🔒 Not authenticated
  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  return children ?? <Outlet />;
}
