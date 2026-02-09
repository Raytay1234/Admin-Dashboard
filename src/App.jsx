// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Shop from "./pages/Shop.jsx";
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

import Layout from "./components/Layout.jsx";

import ProtectedRoute from "./context/ProtectedRoute.jsx";
import AdminRoute from "./context/AdminRoute.jsx";

import { DashboardProvider } from "./context/DashboardProvider.jsx";
import ProductProvider from "./context/ProductProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx"; // ✅ Our fixed AuthContext

export default function App() {
  return (
    <AuthProvider> {/* Wrap the whole app so useAuth works everywhere */}
      <Router>
        <Routes>
          {/* ───────── PUBLIC ROUTES ───────── */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ───────── PROTECTED ROUTES ───────── */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardProvider>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </DashboardProvider>
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductProvider>
                  <Layout>
                    <Products />
                  </Layout>
                </ProductProvider>
              </ProtectedRoute>
            }
          />

          <Route
            path="/shop"
            element={
              <ProtectedRoute>
                <ProductProvider>
                  <Layout>
                    <Shop />
                  </Layout>
                </ProductProvider>
              </ProtectedRoute>
            }
          />

          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Layout>
                  <Customers />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Layout>
                  <Income />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Layout>
                  <Orders />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/comments"
            element={
              <ProtectedRoute>
                <Layout>
                  <Comments />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/promote"
            element={
              <ProtectedRoute>
                <Layout>
                  <Promote />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Layout>
                  <Help />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* ───────── TICKETS ───────── */}
          <Route
            path="/create-ticket"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateTicket />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <Layout>
                  <Tickets />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <TicketDetails />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* ───────── ADMIN ONLY ───────── */}
          <Route
            path="/admin/tickets"
            element={
              <AdminRoute>
                <Layout>
                  <TicketDashboard />
                </Layout>
              </AdminRoute>
            }
          />

          {/* ───────── SETTINGS ───────── */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
