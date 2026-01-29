// src/pages/Orders.jsx
import { motion as Motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ordersData, getOrdersTotals, filterOrders } from "../data/orders.js";
import OrdersTable from "../components/OrdersTable"; // we'll assume a reusable table component

export default function Orders() {
  const [, setOrders] = useState(ordersData);
  const [filter, setFilter] = useState("all");

  // Update order status
  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Filtered orders based on status
  const filteredOrders = useMemo(() => {
    return filterOrders(filter);
  }, [filter]);

  // Compute stats
  const stats = useMemo(() => {
    const totals = getOrdersTotals();
    return {
      totalOrders: totals.totalOrders,
      totalRevenue: totals.totalRevenue,
      processing: totals.statusCounts["Processing"] || 0,
      shipped: totals.statusCounts["Shipped"] || 0,
      delivered: totals.statusCounts["Delivered"] || 0,
      cancelled: totals.statusCounts["Cancelled"] || 0,
    };
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 text-sm">
          View and manage all customer orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col">
          <p className="text-gray-400 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold mt-2">
            ${stats.totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col">
          <p className="text-gray-400 text-sm">Processing</p>
          <p className="text-2xl font-bold mt-2">{stats.processing}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col">
          <p className="text-gray-400 text-sm">Delivered</p>
          <p className="text-2xl font-bold mt-2">{stats.delivered}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["all", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1 rounded-full text-sm capitalize transition
              ${filter === s
                ? "bg-green-500 text-black font-semibold"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-800 rounded-2xl shadow-lg overflow-x-auto"
      >
        <OrdersTable orders={filteredOrders} onUpdate={updateStatus} />
      </Motion.div>
    </div>
  );
}
