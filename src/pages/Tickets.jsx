// src/pages/Tickets.jsx
import { motion as Motion } from "framer-motion";
import useTickets from "../hooks/useTickets";
import TicketTable from "../components/TicketTable";

export default function Tickets() {
  const { tickets, updateStatus } = useTickets();

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">All Tickets</h1>
        <p className="text-gray-400 text-sm">
          View and manage customer support tickets
        </p>
      </div>

      {/* Ticket Table */}
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-800 rounded-2xl shadow-lg overflow-x-auto"
      >
        <TicketTable
          tickets={tickets}
          onUpdate={updateStatus}
        />
      </Motion.div>
    </div>
  );
}
