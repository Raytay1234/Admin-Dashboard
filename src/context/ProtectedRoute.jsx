import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextValue";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext); // ✅ reactive

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/shop" replace />;
  }

  return children;
}