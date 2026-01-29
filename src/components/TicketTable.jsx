// src/components/TicketTable.jsx
import React from "react";

export default function TicketTable({ tickets = [], onUpdate }) {
  const statuses = ["Open", "Pending", "Resolved", "Closed"];

  return (
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Subject
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Category
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Priority
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            User
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Created At
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-900 divide-y divide-gray-700">
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td className="px-6 py-4 whitespace-nowrap">{ticket.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{ticket.subject}</td>
            <td className="px-6 py-4 whitespace-nowrap">{ticket.category}</td>
            <td className="px-6 py-4 whitespace-nowrap">{ticket.priority}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <select
                value={ticket.status}
                onChange={(e) => onUpdate(ticket.id, e.target.value)}
                className={`px-2 py-1 rounded-lg text-sm ${ticket.status === "Open"
                    ? "bg-green-500 text-black"
                    : ticket.status === "Pending"
                      ? "bg-yellow-500 text-black"
                      : ticket.status === "Resolved"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-500 text-white"
                  }`}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{ticket.user}</td>
            <td className="px-6 py-4 whitespace-nowrap">{ticket.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
