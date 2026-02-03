// src/components/OrdersTable.jsx
import React from "react";
import useOrders from "../hooks/useOrders.js";

const STATUS_OPTIONS = ["Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersTable({ filter = "all", dateRange = {} }) {
  const { orders, updateStatus } = useOrders();

  // Filter orders by status and date
  const filteredOrders = orders.filter((o) => {
    // Status filter
    if (filter !== "all" && o.status !== filter) return false;

    // Date filter
    if (dateRange.start && dateRange.end) {
      const created = new Date(o.createdAt);
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      if (created < start || created > end) return false;
    }

    return true;
  });

  return (
    <table className="min-w-full divide-y divide-gray-700 text-gray-100">
      <thead className="bg-gray-800">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
          <th className="px-4 py-2 text-left text-sm font-medium">Customer</th>
          <th className="px-4 py-2 text-left text-sm font-medium">Total</th>
          <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
          <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
        </tr>
      </thead>
      <tbody className="bg-gray-900 divide-y divide-gray-700">
        {filteredOrders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-800 transition">
            <td className="px-4 py-2">{order.id}</td>
            <td className="px-4 py-2">{order.customer}</td>
            <td className="px-4 py-2">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(order.total)}
            </td>
            <td className="px-4 py-2">
              <select
                aria-label={`Update status for order ${order.id}`}
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="px-2 py-1 rounded-lg text-black text-sm font-medium bg-gray-200"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-2">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
