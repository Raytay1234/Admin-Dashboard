import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Helpers
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));
const randomFloat = (min, max, decimals = 2) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const generateOrders = (count = 50) =>
  Array.from({ length: count }).map((_, i) => ({
    id: `ORD${1000 + i}`,
    customer: `Customer ${i + 1}`,
    total: randomFloat(50, 500),
    status: ["Pending", "Shipped", "Delivered"][randomInt(0, 2)],
    date: new Date(2026, randomInt(0, 11), randomInt(1, 28))
      .toISOString()
      .split("T")[0],
  }));

// Summary Card Component
const SummaryCard = ({ title, value, color }) => (
  <div
    className={`bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-start`}
  >
    <p className="text-gray-400 text-sm">{title}</p>
    <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
  </div>
);

export default function Orders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders] = useState(generateOrders());

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // Compute summary stats
  const summary = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === "Pending").length;
    const shipped = orders.filter(o => o.status === "Shipped").length;
    const delivered = orders.filter(o => o.status === "Delivered").length;
    return { total, pending, shipped, delivered };
  }, [orders]);

  return (
    <div className="p-6 lg:p-8 space-y-8 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">All Orders</h1>
        <p className="text-gray-400 mt-1">Search, filter, and manage customer orders</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard title="Total Orders" value={summary.total} color="text-white" />
        <SummaryCard title="Pending Orders" value={summary.pending} color="text-red-400" />
        <SummaryCard title="Shipped Orders" value={summary.shipped} color="text-yellow-400" />
        <SummaryCard title="Delivered Orders" value={summary.delivered} color="text-green-400" />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
        <input
          type="text"
          placeholder="Search by Order ID or Customer..."
          className="px-4 py-2 rounded-xl bg-gray-800 text-gray-100 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-xl bg-gray-800 text-gray-100 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300 border-separate border-spacing-y-2">
          <thead className="text-gray-400 uppercase border-b border-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg transition cursor-pointer"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">{formatCurrency(order.total)}</td>
                  <td
                    className={`px-4 py-2 font-medium ${order.status === "Delivered"
                        ? "text-green-400"
                        : order.status === "Shipped"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
