// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// PAGES
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import Customers from "./pages/Customers.jsx";
import Income from "./pages/IncomePro.jsx";
import Profile from "./pages/Profile.jsx";
import Comments from "./pages/Comments.jsx";
import Promote from "./pages/Promote.jsx";
import Help from "./pages/Help.jsx";
import Orders from "./pages/Orders.jsx";
import CreateTicket from "./pages/CreateTicket.jsx";
import Tickets from "./pages/Tickets.jsx";
import TicketDashboard from "./pages/TicketDashboard.jsx";
import TicketDetails from "./pages/TicketDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Settings from "./pages/Settings.jsx";

// COMPONENTS
import Layout from "./components/Layout.jsx";

// CONTEXT
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import OrderProvider from "./context/OrdersProvider.jsx";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const redirectLoggedIn = (component) => {
    if (user) {
      return <Navigate to={user.role === "admin" ? "/" : "/shop"} replace />;
    }
    return component;
  };

  return (
    <OrderProvider>
      <Routes>
        {/* ───────── PUBLIC ROUTES ───────── */}
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/login" element={redirectLoggedIn(<Login setUser={setUser} />)} />
        <Route path="/signup" element={redirectLoggedIn(<Signup setUser={setUser} />)} />

        {/* ───────── USER ROUTES ───────── */}
        <Route path="/profile" element={<ProtectedRoute user={user}><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute user={user}><Layout><Orders /></Layout></ProtectedRoute>} />
        <Route path="/create-ticket" element={<ProtectedRoute user={user}><Layout><CreateTicket /></Layout></ProtectedRoute>} />
        <Route path="/tickets" element={<ProtectedRoute user={user}><Layout><Tickets /></Layout></ProtectedRoute>} />
        <Route path="/tickets/:id" element={<ProtectedRoute user={user}><Layout><TicketDetails /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute user={user}><Layout><Settings /></Layout></ProtectedRoute>} />

        {/* ───────── ADMIN ROUTES ───────── */}
        <Route path="/" element={<ProtectedRoute user={user} adminOnly><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute user={user} adminOnly><Layout><Products /></Layout></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute user={user} adminOnly><Layout><Customers /></Layout></ProtectedRoute>} />
        <Route path="/income" element={<ProtectedRoute user={user} adminOnly><Layout><Income /></Layout></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute user={user} adminOnly><Layout><Orders /></Layout></ProtectedRoute>} />
        <Route path="/comments" element={<ProtectedRoute user={user} adminOnly><Layout><Comments /></Layout></ProtectedRoute>} />
        <Route path="/promote" element={<ProtectedRoute user={user} adminOnly><Layout><Promote /></Layout></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute user={user} adminOnly><Layout><Help /></Layout></ProtectedRoute>} />
        <Route path="/admin/tickets" element={<ProtectedRoute user={user} adminOnly><Layout><TicketDashboard /></Layout></ProtectedRoute>} />

        {/* ───────── FALLBACK ROUTE ───────── */}
        <Route path="*" element={<Navigate to={user?.role === "admin" ? "/" : "/shop"} replace />} />
      </Routes>
    </OrderProvider>
  );
}