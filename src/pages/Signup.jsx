import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const ADMIN_EMAIL = "ryanmugi2004@gmail.com";

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }

    const role =
      email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
        ? "admin"
        : "user";

    const user = {
      name,
      email,
      role,
      joinedAt: new Date().toISOString(),
    };

    // ✅ Use context login instead of setUser
    login(user);

    localStorage.setItem("user", JSON.stringify(user));

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-green-500 mb-6 text-center">
          Sign Up
        </h1>

        {error && (
          <div className="bg-red-900/40 text-red-400 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
          />

          <button className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded">
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}