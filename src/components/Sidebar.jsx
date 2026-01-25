// src/components/Sidebar.jsx
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaBoxOpen, FaUsers, FaDollarSign, FaShoppingCart, FaUserCircle, FaLifeRing, FaSignOutAlt } from "react-icons/fa";
import clsx from "clsx";
import AuthContext from "../context/AuthContext";

export default function Sidebar() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen((prev) => !prev);

    const adminMenu = [
        { label: "Dashboard", icon: FaHome, path: "/" },
        { label: "Products", icon: FaBoxOpen, path: "/products" },
        { label: "Customers", icon: FaUsers, path: "/customers" },
        { label: "Income", icon: FaDollarSign, path: "/income" },
        { label: "Promote", icon: FaDollarSign, path: "/promote" },
    ];

    const userMenu = [
        { label: "Shop", icon: FaShoppingCart, path: "/shop" },
        { label: "Help", icon: FaLifeRing, path: "/help" },
        { label: "Create Ticket", icon: FaLifeRing, path: "/create-ticket" },
        { label: "Profile", icon: FaUserCircle, path: "/profile" },
        { label: "Tickets", icon: FaLifeRing, path: "/tickets" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const renderMenu = (menu) =>
        menu.map((item) => (
            <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)} // close sidebar on mobile
                className={({ isActive }) =>
                    clsx(
                        "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                        isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )
                }
            >
                <item.icon size={16} />
                {item.label}
            </NavLink>
        ));

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggle}
                className="
    lg:hidden fixed top-4 left-4 z-50
    p-3 rounded-xl shadow-md
    bg-white dark:bg-gray-900
    text-gray-800 dark:text-green-400
    hover:bg-gray-100 dark:hover:bg-gray-800
    transition-all duration-200
    transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-green-400
  "
                aria-label="Toggle sidebar"
            >
                {open ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>


            {/* Sidebar Overlay */}
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
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-green-600 tracking-tight">
                        Duka
                    </h1>
                </div>

                {/* Admin Section */}
                <div className="mb-6">
                    <h2 className="text-gray-400 text-xs font-semibold uppercase mb-2">
                        Admin
                    </h2>
                    <nav className="flex flex-col gap-2">{renderMenu(adminMenu)}</nav>
                </div>

                {/* User Section */}
                <div className="mb-6">
                    <h2 className="text-gray-400 text-xs font-semibold uppercase mb-2">
                        User
                    </h2>
                    <nav className="flex flex-col gap-2">
                        {renderMenu(userMenu)}

                        {user && (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 mt-2"
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
