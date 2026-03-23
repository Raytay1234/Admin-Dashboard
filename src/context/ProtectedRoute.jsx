import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/shop" replace />;
  }

  return children;
}