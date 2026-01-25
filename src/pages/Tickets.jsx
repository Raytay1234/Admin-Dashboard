import useTickets from "../hooks/useTickets";
import TicketTable from "../components/TicketTable";

export default function Tickets() {
  const { tickets, updateStatus } = useTickets();

  return (
    <div className="p-6 lg:p-8 space-y-6 text-gray-100">
      <h1 className="text-2xl font-bold mb-4">All Tickets</h1>
      <TicketTable tickets={tickets} onUpdate={updateStatus} />
    </div>
  );
}
