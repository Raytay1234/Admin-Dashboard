// src/context/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth.js"; // ✅ import the hook

export default function AdminRoute({ children }) {
  const { user, isAdmin } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />; // Redirect non-admins

  return children;
}
