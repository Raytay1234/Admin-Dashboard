// src/pages/Tickets.jsx
import { motion as Motion } from "framer-motion";
import { useMemo } from "react";
import TicketTable from "../components/TicketTable";
import StatCard from "../components/StatCard";
import useTickets from "../hooks/useTickets";

export default function Tickets() {
  // Pull tickets and update functions from the shared context
  const { tickets, updateStatus } = useTickets();

  // Compute stats for dashboard cards
  const stats = useMemo(() => {
    const counts = { Open: 0, Pending: 0, Resolved: 0, Closed: 0 };
    tickets.forEach((t) => counts[t.status] = (counts[t.status] || 0) + 1);
    return counts;
  }, [tickets]);

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">All Tickets</h1>
        <p className="text-gray-400 text-sm">
          View and manage customer support tickets
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(stats).map(([status, count]) => (
          <StatCard
            key={status}
            title={`${status} Tickets`}
            value={count}
            type="number"
          />
        ))}
      </div>

      {/* Ticket Table */}
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-800 rounded-2xl shadow-lg overflow-x-auto"
      >
        <TicketTable tickets={tickets} onUpdate={updateStatus} isAdmin />
      </Motion.div>
    </div>
  );
}
