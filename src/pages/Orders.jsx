import { motion as Motion } from "framer-motion";
import { useState, useMemo } from "react";
import OrdersTable from "../components/OrdersTable";
import useOrders from "../hooks/useOrders";

export default function Orders() {
  const { orders } = useOrders();
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Compute stats dynamically (based on filtered orders)
  const stats = useMemo(() => {
    let filtered = orders;

    if (filter !== "all") filtered = filtered.filter((o) => o.status === filter);
    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      filtered = filtered.filter((o) => {
        const created = new Date(o.createdAt);
        return created >= start && created <= end;
      });
    }

    return {
      totalOrders: filtered.length,
      totalRevenue: filtered.reduce((sum, o) => sum + o.total, 0),
      processing: filtered.filter((o) => o.status === "Processing").length,
      shipped: filtered.filter((o) => o.status === "Shipped").length,
      delivered: filtered.filter((o) => o.status === "Delivered").length,
      cancelled: filtered.filter((o) => o.status === "Cancelled").length,
    };
  }, [orders, filter, dateRange]);

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 text-sm">View and manage all customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col">
          <p className="text-gray-400 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold mt-2">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(stats.totalRevenue)}
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
        {["all", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
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
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="px-3 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
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
        <OrdersTable filter={filter} dateRange={dateRange} />
      </Motion.div>
    </div>
  );
}
