// src/pages/Profile.jsx
import { useState } from "react";
// ✅ Correct
import { useAuth } from "../context/useAuth.js";

export default function Profile() {
    const { user, logout } = useAuth();
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [avatar, setAvatar] = useState(user?.avatar || "");
    const [password, setPassword] = useState("");

    const joinDate = user?.joinedAt || new Date().toISOString().split("T")[0];

    if (!user) {
        return (
            <div className="p-6 text-gray-100">
                <p>You are not logged in.</p>
            </div>
        );
    }

    const handleSave = () => {
        const updatedUser = { ...user, name, email, avatar };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setEditing(false);
        alert("Profile updated successfully!");
    };

    return (
        <div className="p-6 lg:p-8 space-y-6 text-gray-100">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT: Avatar & Basic Info */}
                <div className="bg-gray-900 p-6 rounded-xl shadow-md flex flex-col items-center">
                    <div className="relative mb-4">
                        <img
                            src={avatar || `https://i.pravatar.cc/150?u=${email}`}
                            alt={name}
                            className="w-32 h-32 rounded-full border-4 border-green-600 object-cover"
                        />
                    </div>
                    {editing && (
                        <input
                            type="text"
                            placeholder="Avatar URL"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            className="w-full p-2 mb-2 rounded-md text-black"
                        />
                    )}
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-gray-400">{email || "No email set"}</p>
                    <p className="text-gray-500 mt-1">
                        Role: <span className="font-medium">{user.role}</span>
                    </p>
                    <p className="text-gray-500 mt-1">
                        Joined: <span className="font-medium">{joinDate}</span>
                    </p>
                </div>

                {/* RIGHT: Editable Info & Actions */}
                <div className="bg-gray-900 p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Account Information</h3>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-gray-400 mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!editing}
                                className={`w-full p-2 rounded-md ${editing ? "text-black bg-gray-100" : "bg-gray-800 text-gray-300"
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!editing}
                                className={`w-full p-2 rounded-md ${editing ? "text-black bg-gray-100" : "bg-gray-800 text-gray-300"
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                disabled={!editing}
                                className={`w-full p-2 rounded-md ${editing ? "text-black bg-gray-100" : "bg-gray-800 text-gray-300"
                                    }`}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                            {editing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setEditing(false)}
                                        className="px-4 py-2 bg-gray-700 rounded-md text-white hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setName(user?.name || "");
                                            setEmail(user?.email || "");
                                            setAvatar(user?.avatar || "");
                                            setEditing(true);
                                        }}
                                        className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700"
                                    >
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={logout}
                                        className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
