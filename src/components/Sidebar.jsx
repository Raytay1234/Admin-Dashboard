import {
    FaBars,
    FaHome,
    FaBoxOpen,
    FaUsers,
    FaDollarSign,
    FaShoppingCart,
    FaUserCircle,
    FaTimes,
} from "react-icons/fa";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function Sidebar({ open = false, setOpen }) {
    const toggle = () => setOpen?.(!open);

    const mainMenu = [
        { label: "Home", icon: FaHome, path: "/" },
        { label: "Products", icon: FaBoxOpen, path: "/products" },
        { label: "Shop", icon: FaShoppingCart, path: "/shop" },
        { label: "Customers", icon: FaUsers, path: "/customers" },
        { label: "Income", icon: FaDollarSign, path: "/income" },
        { label: "Comments", icon: FaUsers, path: "/comments" },
        {label :"Promote", icon: FaDollarSign, path: "/promote" },
        {label:"Help", icon: FaUserCircle, path: "/help" }, 
    ];

    const userMenu = [
        { label: "Profile", icon: FaUserCircle, path: "/profile" },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white dark:bg-gray-900 shadow-md"
                onClick={toggle}
                aria-label="Toggle sidebar"
            >
                <FaBars />
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setOpen?.(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 flex flex-col justify-between transform transition-transform duration-300 ease-in-out",
                    open ? "translate-x-0" : "-translate-x-full",
                    "lg:translate-x-0 lg:static"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-green-600 tracking-tight">
                        Duka
                    </h1>

                    <button
                        className="lg:hidden"
                        onClick={() => setOpen?.(false)}
                        aria-label="Close sidebar"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Main Navigation */}
                <nav className="mt-4 px-3 flex-1 space-y-1">
                    {mainMenu.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            onClick={() => setOpen?.(false)}
                            className={({ isActive }) =>
                                clsx(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                )
                            }
                        >
                            <item.icon size={16} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* User / Profile Navigation */}
                <nav className="px-3 mb-6 space-y-1">
                    {userMenu.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            onClick={() => setOpen?.(false)}
                            className={({ isActive }) =>
                                clsx(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                )
                            }
                        >
                            <item.icon size={16} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
