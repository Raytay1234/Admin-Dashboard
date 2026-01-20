// src/pages/Profile.jsx
import { useState } from "react";
import { motion as Motion } from "framer-motion";
import Layout from "../components/Layout.jsx";

export default function Profile() {
    // Mock user data
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        joined: "Jan 15, 2023",
        avatar: "https://i.pravatar.cc/150?img=3",
        orders: 24,
        totalSpent: 5490,
    });

    const formatCurrency = (val) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Profile Info */}
                <div className="lg:w-1/3 bg-gray-900 text-gray-100 rounded-xl p-6 shadow-md">
                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-green-600"
                        />
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-400">{user.email}</p>
                        <p className="text-gray-400 text-sm">Joined {user.joined}</p>
                    </div>

                    <div className="mt-6 flex justify-around">
                        <div className="flex flex-col items-center">
                            <span className="text-lg font-semibold">{user.orders}</span>
                            <span className="text-gray-400 text-sm">Orders</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-lg font-semibold">{formatCurrency(user.totalSpent)}</span>
                            <span className="text-gray-400 text-sm">Total Spent</span>
                        </div>
                    </div>
                </div>

                {/* Right: Editable Profile Form */}
                <div className="flex-1 bg-gray-900 text-gray-100 rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                    <form className="flex flex-col gap-4">
                        <label className="flex flex-col">
                            <span className="text-gray-400 text-sm mb-1">Full Name</span>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                className="p-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-gray-400 text-sm mb-1">Email</span>
                            <input
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="p-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-gray-400 text-sm mb-1">Avatar URL</span>
                            <input
                                type="text"
                                value={user.avatar}
                                onChange={(e) => setUser({ ...user, avatar: e.target.value })}
                                className="p-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-green-500"
                            />
                        </label>

                        <button
                            type="submit"
                            className="mt-4 py-2 px-4 rounded-lg bg-green-600 text-gray-100 font-medium hover:bg-green-500 transition"
                            onClick={(e) => {
                                e.preventDefault();
                                alert("Profile updated!");
                            }}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
