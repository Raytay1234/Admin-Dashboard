// src/components/Sidebar.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBoxOpen,
  FaUsers,
  FaDollarSign,
  FaShoppingCart,
  FaLifeRing,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import clsx from "clsx";
import { useAuth } from "../context/useAuth.js";
import logo from "../assets/duka.png"; // ✅ Production-safe import

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const adminMenu = [
    { label: "Dashboard", icon: FaHome, path: "/" },
    { label: "Products", icon: FaBoxOpen, path: "/products" },
    { label: "Customers", icon: FaUsers, path: "/customers" },
    { label: "Income", icon: FaDollarSign, path: "/income" },
    { label: "Promote", icon: FaDollarSign, path: "/promote" },
    { label: "Orders", icon: FaShoppingCart, path: "/orders" },
  ];

  const baseUserMenu = [
    { label: "Shop", icon: FaShoppingCart, path: "/shop" },
    { label: "Help", icon: FaLifeRing, path: "/help" },
    { label: "Create Ticket", icon: FaLifeRing, path: "/create-ticket" },
    { label: "Tickets", icon: FaLifeRing, path: "/tickets" },
  ];

  const finalUserMenu = user
    ? baseUserMenu
    : [...baseUserMenu, { label: "Profile", icon: FaUserCircle, path: "/profile" }];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderMenu = (menu) =>
    menu.map((item) => (
      <NavLink
        key={item.label}
        to={item.path}
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          clsx(
            "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            isActive
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          )
        }
      >
        <item.icon size={18} />
        {item.label}
      </NavLink>
    ));

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle sidebar"
      >
        {open ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 p-6 flex flex-col overflow-y-auto transition-transform z-50",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:h-screen"
        )}
      >
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl opacity-70 group-hover:opacity-100 transition" />
            <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-green-500 to-emerald-600 p-1 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                {/* ✅ Updated image usage */}
                <img
                  src={logo}
                  alt="Duka Logo"
                  className="w-14 h-14 object-cover"
                />
              </div>
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold bg-linear-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent tracking-wide">
            Duka
          </h1>
          <p className="text-xs text-gray-400 tracking-wider uppercase">
            Admin Panel
          </p>
        </div>

        {/* Profile Avatar */}
        {user && (
          <div
            className="mb-6 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
          >
            <img
              src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-green-500 object-cover mb-2 shadow-sm"
            />
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {user.name}
            </p>
            <p className="text-xs text-gray-400">{user.role}</p>
          </div>
        )}

        {isAdmin && (
          <div className="mb-6">
            <h2 className="text-gray-400 text-xs font-semibold uppercase mb-2">
              Admin
            </h2>
            <nav className="flex flex-col gap-2">{renderMenu(adminMenu)}</nav>
          </div>
        )}

        <div className="mt-auto">
          <h2 className="text-gray-400 text-xs font-semibold uppercase mb-2">
            User
          </h2>
          <nav className="flex flex-col gap-2">
            {renderMenu(finalUserMenu)}
            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 mt-2 transition-all duration-200"
              >
                <FaSignOutAlt size={16} />
                Logout
              </button>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}