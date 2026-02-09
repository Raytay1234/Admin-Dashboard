// src/context/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth.js"; // ✅ import the hook, not the context

export default function ProtectedRoute({ children }) {
  const { user } = useAuth(); // useAuth works safely

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
