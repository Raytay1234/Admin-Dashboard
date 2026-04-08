import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const ADMIN_EMAIL = "ryanmugi2004@gmail.com"; // Example admin email

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

    // Determine role
    const role = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "user";

    const user = { name, email, role, joinedAt: new Date().toISOString() };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/"); // redirect to home/dashboard
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          required
          onChange={(e) => setConfirm(e.target.value)}
          className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none"
        />

        <button
          type="submit"
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}