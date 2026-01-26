// src/pages/Orders.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Helpers
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));
const randomFloat = (min, max, decimals = 2) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

// Mock Orders Generator
const generateOrders = (count = 50) =>
  Array.from({ length: count }).map((_, i) => ({
    id: `ORD${1000 + i}`,
    customer: `Customer ${i + 1}`,
    total: randomFloat(50, 500),
    status: ["Pending", "Shipped", "Delivered"][randomInt(0, 2)],
    date: new Date(2026, randomInt(0, 11), randomInt(1, 28)).toISOString().split("T")[0], // YYYY-MM-DD
  }));

export default function Orders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders] = useState(generateOrders());

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  // Filtered orders based on search and status
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  return (
      <div className="p-6 lg:p-8 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-100">All Orders</h1>
          <p className="text-gray-400">Search, filter, and manage customer orders</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-start md:items-center">
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 w-full md:w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 w-full md:w-1/4"
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
        <div className="bg-gray-900 p-6 rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-gray-400 uppercase border-b border-gray-700">
              <tr>
                <th className="px-3 py-2">Order ID</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredOrders.length ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-800 cursor-pointer transition"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <td className="px-3 py-2">{order.id}</td>
                    <td className="px-3 py-2">{order.customer}</td>
                    <td className="px-3 py-2">{order.date}</td>
                    <td className="px-3 py-2">{formatCurrency(order.total)}</td>
                    <td
                      className={`px-3 py-2 font-medium ${
                        order.status === "Delivered"
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
                  <td colSpan={5} className="px-3 py-4 text-center text-gray-500">
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
