// src/pages/Profile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function Profile() {
    const navigate = useNavigate();
    const { user, logout, isAdmin } = useAuth(); // ✅ get admin info
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        avatar: user?.avatar || "",
        password: "",
    });
    const [successMsg, setSuccessMsg] = useState("");

    const joinDate = user?.joinedAt || new Date().toISOString().split("T")[0];

    // --- Redirect or display message if not logged in ---
    if (!user) {
        return (
            <div className="p-6 text-gray-100">
                <p>You are not logged in.</p>
                <button
                    onClick={() => navigate("/login")}
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const updatedUser = {
            ...user,
            name: formData.name,
            email: formData.email,
            avatar: formData.avatar,
        };
        if (formData.password) updatedUser.password = formData.password;

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSuccessMsg("Profile updated successfully!");
        setEditing(false);
        setFormData((prev) => ({ ...prev, password: "" }));

        // Refresh the app context so Sidebar and other components show updated info
        window.dispatchEvent(new Event("storage"));

        setTimeout(() => setSuccessMsg(""), 3000);
    };

    const handleCancel = () => {
        setEditing(false);
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            avatar: user?.avatar || "",
            password: "",
        });
    };

    return (
        <div className="p-6 lg:p-8 space-y-6 text-gray-100">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT: Avatar & Info */}
                <div className="bg-gray-900 p-6 rounded-xl shadow-md flex flex-col items-center">
                    <div className="relative mb-4">
                        <img
                            src={formData.avatar || `https://i.pravatar.cc/150?u=${formData.email}`}
                            alt={formData.name}
                            className="w-32 h-32 rounded-full border-4 border-green-600 object-cover"
                        />
                        {isAdmin && (
                            <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                                ADMIN
                            </span>
                        )}
                    </div>

                    {editing && (
                        <input
                            type="text"
                            name="avatar"
                            placeholder="Avatar URL"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="w-full p-2 mb-2 rounded-md text-black"
                        />
                    )}

                    <h2 className="text-xl font-semibold">{formData.name}</h2>
                    <p className="text-gray-400">{formData.email || "No email set"}</p>
                    <p className="text-gray-500 mt-1">
                        Role:{" "}
                        <span className={`font-medium ${isAdmin ? "text-green-400" : ""}`}>
                            {user.role}
                        </span>
                    </p>
                    <p className="text-gray-500 mt-1">
                        Joined: <span className="font-medium">{joinDate}</span>
                    </p>
                    {isAdmin && (
                        <p className="mt-2 text-green-400 font-medium text-sm">
                            You have admin privileges
                        </p>
                    )}
                </div>

                {/* RIGHT: Editable Info & Actions */}
                <div className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4">
                    <h3 className="text-lg font-semibold mb-2">Account Information</h3>

                    {["name", "email", "password"].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label className="block text-gray-400 mb-1 capitalize">{field}</label>
                            <input
                                type={field === "password" ? "password" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={field === "password" ? "Enter new password" : ""}
                                disabled={!editing}
                                className={`w-full p-2 rounded-md ${editing ? "text-black bg-gray-100" : "bg-gray-800 text-gray-300"
                                    }`}
                            />
                        </div>
                    ))}

                    {/* Success Message */}
                    {successMsg && <p className="text-green-400 text-sm font-medium">{successMsg}</p>}

                    {/* Actions */}
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
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-700 rounded-md text-white hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setEditing(true)}
                                    className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate("/login");
                                    }}
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
    );
}
