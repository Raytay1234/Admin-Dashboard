// src/pages/Orders.jsx
import { useState, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { filterOrders, filterOrdersByDate } from "../data/orders.js";

const STATUS_COLORS = {
  Processing: "bg-yellow-500 text-black",
  Shipped: "bg-blue-500 text-white",
  Delivered: "bg-green-500 text-white",
  Cancelled: "bg-red-500 text-white",
};

export default function Orders() {
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [downloadMenu, setDownloadMenu] = useState(false);

  const filteredOrders = useMemo(() => {
    let result = filterOrders(filter);
    if (dateRange.start && dateRange.end) {
      result = filterOrdersByDate(dateRange.start, dateRange.end).filter(o =>
        result.some(f => f.id === o.id)
      );
    }
    return result;
  }, [filter, dateRange]);

  // --- Stats ---
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

  // --- Download function ---
  const downloadOrders = (type) => {
    const data = filteredOrders.map(order => ({
      "Order ID": order.id,
      Customer: order.customer,
      Items: order.items,
      Total: order.total,
      Status: order.status,
      Created: order.createdAt,
    }));

    if (type === "csv") {
      const csv = [
        Object.keys(data[0]).join(","), // headers
        ...data.map(row => Object.values(row).join(","))
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "orders.csv");
      link.click();
    }

    if (type === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "orders.json");
      link.click();
    }

    if (type === "pdf") {
      const doc = new jsPDF();
      doc.text("Orders Report", 14, 20);

      autoTable(doc, {
        startY: 25,
        head: [["Order ID", "Customer", "Items", "Total", "Status", "Created"]],
        body: filteredOrders.map(o => [
          o.id,
          o.customer,
          o.items,
          `$${o.total.toLocaleString()}`,
          o.status,
          o.createdAt
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [34, 197, 94] }, // green
      });

      doc.save("orders.pdf");
    }

    setDownloadMenu(false);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 text-sm">View and manage all customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Orders", value: stats.totalOrders },
          { title: "Total Revenue", value: stats.totalRevenue, currency: true },
          { title: "Processing", value: stats.processing },
          { title: "Delivered", value: stats.delivered },
        ].map((card, idx) => (
          <Motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 + idx * 0.1 }}
            className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col"
          >
            <p className="text-gray-400 text-sm">{card.title}</p>
            <p className="text-2xl font-bold mt-2">
              {card.currency
                ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(card.value)
                : card.value}
            </p>
          </Motion.div>
        ))}
      </div>

      {/* Filters & Download */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        {["all", "Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded-full text-sm capitalize font-medium transition
              ${filter === status
                ? "bg-green-500 text-black shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            {status}
          </button>
        ))}

        {/* Date Range */}
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

        {/* Download Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDownloadMenu(!downloadMenu)}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-black font-semibold"
          >
            Download as ▾
          </button>
          {downloadMenu && (
            <div className="absolute mt-2 w-40 bg-gray-800 rounded-lg shadow-lg z-50 flex flex-col">
              {["csv", "json", "pdf"].map(type => (
                <button
                  key={type}
                  onClick={() => downloadOrders(type)}
                  className="px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 transition text-left"
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Orders Table / Cards */}
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        {/* Desktop Table */}
        <div className="hidden lg:block bg-gray-800 rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-gray-300 border-separate border-spacing-y-2">
            <thead className="text-gray-400 uppercase tracking-wider text-xs">
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
              {filteredOrders.map((order, idx) => (
                <tr
                  key={order.id}
                  className={`cursor-pointer transition transform hover:scale-[1.01] ${idx % 2 === 0 ? "bg-gray-700" : "bg-gray-700/80"} hover:bg-gray-600`}
                >
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.items}</td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(order.total)}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || "bg-gray-500 text-white"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden flex flex-col gap-3">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col gap-2 hover:bg-gray-700 transition">
              <div className="flex justify-between">
                <span className="font-semibold">{order.id}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || "bg-gray-500 text-white"}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-300 text-sm">Customer: {order.customer}</p>
              <p className="text-gray-300 text-sm">Items: {order.items}</p>
              <p className="text-green-400 font-semibold">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(order.total)}
              </p>
              <p className="text-gray-400 text-xs">Created: {order.createdAt}</p>
            </div>
          ))}
        </div>
      </Motion.div>
    </div>
  );
}
