// src/context/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth.js";

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  // ✅ If not logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // ✅ Check role dynamically
  const isAdmin = user.role === "admin";

  // ✅ If logged in but not admin, redirect to shop (user homepage)
  if (!isAdmin) return <Navigate to="/shop" replace />;

  return children;
}