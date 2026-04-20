import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";

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
import Reports from "./pages/Reports.jsx";
import CategoryDetails from "./pages/CategoryDetails.jsx";

// LAYOUT
import Layout from "./components/Layout.jsx";

// AUTH
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import OrderProvider from "./context/OrdersProvider.jsx";

export default function App() {
  const { user } = useAuth();

  return (
    <OrderProvider>
      <Routes>

        {/* ───────── PUBLIC ───────── */}
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />

        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup />}
        />

        {/* ───────── USER ───────── */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout><Profile /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout><Orders /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-ticket"
          element={
            <ProtectedRoute>
              <Layout><CreateTicket /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Layout><Tickets /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute>
              <Layout><TicketDetails /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout><Settings /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <Layout><Help /></Layout>
            </ProtectedRoute>
          }
        />

        {/* ───────── ADMIN ───────── */}
        <Route
          path="/"
          element={
            <ProtectedRoute adminOnly>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute adminOnly>
              <Layout><Products /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute adminOnly>
              <Layout><Customers /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/income"
          element={
            <ProtectedRoute adminOnly>
              <Layout><Income /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute adminOnly>
              <Layout><Orders /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/comments"
          element={
            <ProtectedRoute adminOnly>
              <Layout><Comments /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/promote"
          element={
            <ProtectedRoute adminOnly>
              <Layout><Promote /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tickets"
          element={
            <ProtectedRoute adminOnly>
              <Layout><TicketDashboard /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute adminOnly>
              <Layout><Reports /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports/category/:category"
          element={
            <ProtectedRoute adminOnly>
              <Layout><CategoryDetails /></Layout>
            </ProtectedRoute>
          }
        />

        {/* ───────── FALLBACK ───────── */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />

      </Routes>
    </OrderProvider>
  );
}