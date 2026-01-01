import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import Submissions from './pages/Submissions';
import SubmissionDetail from './pages/SubmissionDetail';
import Forms from './pages/Forms';

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Articles from "./pages/Articles";

import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter basename="/admin">
      <AuthProvider>
        <UserProvider>

          {/* 🔥 GLOBAL TOASTER */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#111827",
                color: "#fff",
              },
            }}
          />

          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Admin */}
            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="articles" element={<Articles />} />
              <Route path="settings" element={<Settings />} />
              <Route path="forms" element={<Forms />} />
              <Route path="submissions" element={<Submissions />} />
              <Route path="submissions/:id" element={<SubmissionDetail />} />

            </Route>
          </Routes>

        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
