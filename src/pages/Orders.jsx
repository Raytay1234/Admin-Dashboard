// src/pages/Orders.jsx
import { useState, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { filterOrders, filterOrdersByDate } from "../data/orders.js";

export default function Orders() {
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // --- Filtered orders based on status + date ---
  const filteredOrders = useMemo(() => {
    let result = filterOrders(filter);
    if (dateRange.start && dateRange.end) {
      result = filterOrdersByDate(dateRange.start, dateRange.end).filter(o =>
        result.some(f => f.id === o.id)
      );
    }
    return result;
  }, [filter, dateRange]);

  // --- Compute stats dynamically based on filtered orders ---
  const stats = useMemo(() => {
    const totals = filteredOrders.reduce(
      (acc, o) => {
        acc.totalOrders += 1;
        acc.totalRevenue += o.total;
        acc.statusCounts[o.status] = (acc.statusCounts[o.status] || 0) + 1;
        return acc;
      },
      { totalOrders: 0, totalRevenue: 0, statusCounts: {} }
    );
    return {
      totalOrders: totals.totalOrders,
      totalRevenue: totals.totalRevenue,
      processing: totals.statusCounts["Processing"] || 0,
      shipped: totals.statusCounts["Shipped"] || 0,
      delivered: totals.statusCounts["Delivered"] || 0,
      cancelled: totals.statusCounts["Cancelled"] || 0,
    };
  }, [filteredOrders]);

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 text-sm">View and manage all customer orders</p>
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
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(stats.totalRevenue)}
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

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded-full text-sm capitalize transition
              ${filter === status
                ? "bg-green-500 text-black font-semibold"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Date Range */}
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={dateRange.start}
          onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
          className="px-3 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
          className="px-3 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700"
        />
        <button
          onClick={() => setDateRange({ start: "", end: "" })}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-semibold"
        >
          Reset Dates
        </button>
      </div>

      {/* Orders Table */}
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-800 rounded-2xl shadow-lg overflow-x-auto"
      >
        <table className="w-full text-sm text-gray-300 border-separate border-spacing-y-2">
          <thead className="text-gray-400">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} className="bg-gray-700 hover:bg-gray-600 cursor-pointer">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.items}</td>
                <td className="px-4 py-2">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(order.total)}
                </td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Motion.div>
    </div>
  );
}
