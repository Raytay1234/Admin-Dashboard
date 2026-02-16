import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextValue.js";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = (userData) => userData?.role && setUser(userData);

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
