// src/components/TicketTable.jsx
import { motion as Motion } from "framer-motion";
import { Check, X, RefreshCw } from "lucide-react";

export default function TicketTable({ tickets = [], onUpdate }) {
  const handleStatusChange = (id, newStatus) => {
    onUpdate?.(id, newStatus);
  };

  return (
    <table className="w-full text-sm text-left text-gray-300">
      <thead className="bg-gray-700 text-gray-400 uppercase text-xs border-b border-gray-600">
        <tr>
          <th className="px-4 py-2">Ticket ID</th>
          <th className="px-4 py-2">Customer</th>
          <th className="px-4 py-2">Subject</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {tickets.length > 0 ? (
          tickets.map((ticket, idx) => (
            <Motion.tr
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <td className="px-4 py-2 font-mono">{ticket.id}</td>
              <td className="px-4 py-2">{ticket.customer}</td>
              <td className="px-4 py-2 truncate max-w-xs">{ticket.subject}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${ticket.status === "Open"
                      ? "bg-green-900/40 text-green-400"
                      : ticket.status === "Pending"
                        ? "bg-yellow-900/40 text-yellow-400"
                        : "bg-red-900/40 text-red-400"
                    }`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-2">
                {ticket.status !== "Closed" && (
                  <button
                    onClick={() => handleStatusChange(ticket.id, "Closed")}
                    className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full flex items-center justify-center transition"
                    title="Close Ticket"
                  >
                    <X size={16} />
                  </button>
                )}
                {ticket.status !== "Approved" && (
                  <button
                    onClick={() => handleStatusChange(ticket.id, "Approved")}
                    className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-full flex items-center justify-center transition"
                    title="Approve Ticket"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleStatusChange(ticket.id, "Pending")}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white p-1 rounded-full flex items-center justify-center transition"
                  title="Mark Pending"
                >
                  <RefreshCw size={16} />
                </button>
              </td>
            </Motion.tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
              No tickets found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
