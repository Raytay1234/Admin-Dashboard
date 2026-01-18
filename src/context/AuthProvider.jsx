import { useState, useEffect } from "react";
import AuthContext from "./AuthContext.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : { name: "Admin User", role: "admin" };
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return { name: "Admin User", role: "admin" };
    }
  });

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    if (userData && userData.role) setUser(userData);
    else console.warn("Invalid user data provided to login.");
  };

  const logout = () => setUser(null);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
