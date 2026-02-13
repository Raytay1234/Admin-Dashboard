import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            setError("Please enter both email and password");
            return;
        }

        // Mock login (replace with API if needed)
        const mockUser = {
            name: "Admin User",
            email: trimmedEmail,
            role: "admin",
        };

        login(mockUser); // set user in AuthContext
        navigate("/"); // redirect to dashboard
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg">
                <h1 className="text-2xl font-bold text-green-500 mb-6 text-center">
                    Login
                </h1>

                {error && (
                    <div className="bg-red-900/40 text-red-400 p-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError("");
                            }}
                            className="p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError("");
                            }}
                            className="p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="********"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-gray-900 font-semibold py-2 px-4 rounded transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-400 text-sm mt-4 text-center">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-green-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
