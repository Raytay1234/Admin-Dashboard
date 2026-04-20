import { useState, useMemo } from "react";
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
  FaTicketAlt,
  FaBullhorn,
} from "react-icons/fa";
import clsx from "clsx";
import { useAuth } from "../context/useAuth.js";
import logo from "../assets/duka.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((p) => !p);

  // -----------------------------
  // MENUS
  // -----------------------------
  const adminMenu = useMemo(
    () => [
      { label: "Dashboard", icon: FaHome, path: "/" },
      { label: "Products", icon: FaBoxOpen, path: "/products" },
      { label: "Customers", icon: FaUsers, path: "/customers" },
      { label: "Income", icon: FaDollarSign, path: "/income" },
      { label: "Promote", icon: FaBullhorn, path: "/promote" },
      { label: "Orders", icon: FaShoppingCart, path: "/orders" },
      { label: "Tickets", icon: FaTicketAlt, path: "/tickets" },
      { label: "Reports", icon: FaHome, path: "/reports" },
    ],
    []
  );

  const userMenu = useMemo(
    () => [
      { label: "Shop", icon: FaShoppingCart, path: "/shop" },
      { label: "Cart", icon: FaShoppingCart, path: "/cart" },
      { label: "Help Center", icon: FaLifeRing, path: "/help" },
      { label: "Create Ticket", icon: FaTicketAlt, path: "/create-ticket" },
      { label: "Profile", icon: FaUserCircle, path: "/profile" },
    ],
    []
  );

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const handleLogout = () => {
    logout(); // 🔥 state-driven logout (ProtectedRoute handles redirect)
    navigate("/login", { replace: true }); // fallback safety
  };

  // -----------------------------
  // RENDER MENU
  // -----------------------------
  const renderMenu = (menu) =>
    menu.map((item) => (
      <NavLink
        key={item.label}
        to={item.path}
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          clsx(
            "group flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            "hover:translate-x-1 hover:bg-gray-100 dark:hover:bg-gray-800",
            isActive
              ? "bg-green-500/15 text-green-500 shadow-sm border-l-4 border-green-500"
              : "text-gray-700 dark:text-gray-300"
          )
        }
      >
        <item.icon
          size={18}
          className="group-hover:scale-110 transition-transform"
        />
        {item.label}
      </NavLink>
    ));

  // -----------------------------
  // PREVENT RENDER WHEN LOGGED OUT
  // -----------------------------
  if (!user) return null;

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={toggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-green-400"
      >
        {open ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 z-50",
          "bg-white dark:bg-gray-900 border-r dark:border-gray-800",
          "p-5 flex flex-col justify-between",
          "transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static"
        )}
      >
        {/* TOP */}
        <div>
          {/* LOGO */}
          <div className="mb-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
              <img src={logo} alt="Duka" className="w-full h-full object-cover" />
            </div>

            <h1 className="mt-3 text-2xl font-bold text-green-500">Duka</h1>

            <p className="text-xs text-gray-400 uppercase tracking-widest">
              {user?.role === "admin" ? "Admin Panel" : "User Panel"}
            </p>
          </div>

          {/* USER CARD */}
          <div
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="mb-6 flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 cursor-pointer hover:scale-[1.02] transition"
          >
            <img
              src={
                user?.avatar ||
                `https://i.pravatar.cc/150?u=${user?.email}`
              }
              className="w-10 h-10 rounded-full border border-green-500"
              alt="avatar"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800 dark:text-white">
                {user?.name}
              </span>
              <span className="text-xs text-gray-400 capitalize">
                {user?.role || "user"}
              </span>
            </div>
          </div>

          {/* MENU */}
          <div className="space-y-1">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
              {user?.role === "admin" ? "Admin Tools" : "Main Menu"}
            </p>

            <nav className="space-y-1">
              {renderMenu(user?.role === "admin" ? adminMenu : userMenu)}
            </nav>
          </div>
        </div>

        {/* BOTTOM */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>
    </>
  );
}