import { motion as Motion } from "framer-motion";
import { useMemo } from "react";
import TicketTable from "../components/TicketTable";
import useTickets from "../hooks/useTickets";

export default function Tickets() {
  const { tickets = [], updateStatus } = useTickets();

  // ---------------- STATS ----------------
  const stats = useMemo(() => {
    const base = {
      Open: 0,
      Pending: 0,
      Resolved: 0,
      Closed: 0,
    };

    tickets.forEach((t) => {
      const key = t?.status || "Open";
      base[key] = (base[key] || 0) + 1;
    });

    return base;
  }, [tickets]);

  // ---------------- STATUS COLORS ----------------
  const statusStyles = {
    Open: "from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30",
    Pending: "from-yellow-500/20 to-yellow-600/10 text-yellow-400 border-yellow-500/30",
    Resolved: "from-green-500/20 to-green-600/10 text-green-400 border-green-500/30",
    Closed: "from-gray-500/20 to-gray-600/10 text-gray-400 border-gray-500/30",
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 bg-linear-to-br from-gray-950 via-gray-900 to-black min-h-screen text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Support Tickets
        </h1>
        <p className="text-gray-400 mt-1">
          Monitor and manage all customer support requests
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([status, count]) => (
          <Motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className={`p-5 rounded-2xl border backdrop-blur-xl bg-linear-to-br ${statusStyles[status]} shadow-lg`}
          >
            <p className="text-sm opacity-80">{status}</p>
            <p className="text-2xl font-bold mt-2">{count}</p>
          </Motion.div>
        ))}
      </div>

      {/* TABLE CARD */}
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-xl overflow-hidden"
      >
        {/* TABLE HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">All Tickets</h2>

          <span className="text-sm text-gray-400">
            {tickets.length} total
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <TicketTable
            tickets={tickets}
            onUpdate={updateStatus}
            isAdmin
          />
        </div>
      </Motion.div>
    </div>
  );
}