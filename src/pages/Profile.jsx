import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { motion as Motion } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const [editing, setEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    password: "",
  });

  const joinDate =
    user?.joinedAt || new Date().toISOString().split("T")[0];

  if (!user) {
    return (
      <div className="p-6 text-gray-100">
        <p>You are not logged in.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-3 px-4 py-2 bg-green-600 rounded-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

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

    if (formData.password) {
      updatedUser.password = formData.password;
    }

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setSuccessMsg("Profile updated successfully!");
    setEditing(false);
    setFormData((prev) => ({ ...prev, password: "" }));

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
    <div className="p-6 lg:p-10 bg-linear-to-br from-gray-950 via-gray-900 to-black min-h-screen text-white space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-gray-400 mt-1">
          Manage your account settings and profile
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT - PROFILE CARD */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 p-6 rounded-2xl shadow-xl flex flex-col items-center"
        >
          <div className="relative">
            <img
              src={
                formData.avatar ||
                `https://i.pravatar.cc/150?u=${formData.email}`
              }
              alt={formData.name}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-500"
            />

            {editing && (
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Paste image URL..."
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-56 p-1 text-xs rounded bg-gray-800 border border-gray-600"
              />
            )}
          </div>

          <h2 className="text-xl font-semibold mt-4">
            {formData.name}
          </h2>
          <p className="text-gray-400">{formData.email}</p>

          <div className="mt-3 flex gap-2">
            <span className="px-3 py-1 text-xs rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              {user.role}
            </span>

            {isAdmin && (
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                Admin
              </span>
            )}
          </div>

          <p className="text-gray-500 text-sm mt-3">
            Joined: {joinDate}
          </p>
        </Motion.div>

        {/* RIGHT - FORM */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-gray-900/80 backdrop-blur-xl border border-gray-700 p-6 rounded-2xl shadow-xl space-y-6"
        >
          <h3 className="text-lg font-semibold">Account Settings</h3>

          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email"].map((field) => (
              <div key={field}>
                <label className="text-gray-400 text-sm capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full mt-1 p-3 rounded-xl transition border ${
                    editing
                      ? "bg-gray-800 border-gray-600 focus:border-indigo-500"
                      : "bg-gray-800/50 border-gray-700 text-gray-400"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-gray-400 text-sm">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Leave blank to keep current"
              className={`w-full mt-1 p-3 rounded-xl border ${
                editing
                  ? "bg-gray-800 border-gray-600 focus:border-indigo-500"
                  : "bg-gray-800/50 border-gray-700 text-gray-400"
              }`}
            />
          </div>

          {/* SUCCESS */}
          {successMsg && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-sm"
            >
              {successMsg}
            </Motion.div>
          )}

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3 pt-2">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 bg-gray-700 rounded-xl"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-xl"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </Motion.div>
      </div>
    </div>
  );
}