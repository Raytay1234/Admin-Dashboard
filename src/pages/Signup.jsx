import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// ✅ Correct
import { useAuth } from "../context/useAuth.js";

export default function Signup() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        // Mock signup: create user object
        const newUser = {
            name,
            email,
            password, // for demo only; do NOT store plain passwords in production
            role: "admin", // default role
        };

        // Save user to localStorage (for demo)
        localStorage.setItem("user", JSON.stringify(newUser));

        // Log in immediately
        login(newUser);

        // Redirect to dashboard
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg">
                <h1 className="text-2xl font-bold text-green-500 mb-6 text-center">
                    Sign Up
                </h1>

                {error && (
                    <div className="bg-red-900/40 text-red-400 p-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="********"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-gray-900 font-semibold py-2 px-4 rounded transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-gray-400 text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
