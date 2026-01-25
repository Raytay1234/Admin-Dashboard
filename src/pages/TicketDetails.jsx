import { useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { ticketsData } from "../data/tickets.js";
import { useState } from "react";

export default function TicketDetails() {
    const { id } = useParams();
    const ticket = ticketsData.find((t) => t.id === id);

    const [status, setStatus] = useState(ticket?.status);

    if (!ticket) {
        return (
            <Layout>
                <p className="text-red-400">Ticket not found</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-3xl">
                <h1 className="text-2xl font-bold mb-2">{ticket.subject}</h1>
                <p className="text-gray-400 mb-6">
                    {ticket.id} • {ticket.user}
                </p>

                <div className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4">
                    <p className="text-gray-300">{ticket.message}</p>

                    <div className="flex gap-4">
                        <span className="text-sm text-gray-400">
                            Category: {ticket.category}
                        </span>
                        <span className="text-sm text-gray-400">
                            Priority: {ticket.priority}
                        </span>
                    </div>

                    {/* Status update */}
                    <div className="flex items-center gap-4 pt-4">
                        <label className="text-sm text-gray-400">Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                        >
                            <option>Open</option>
                            <option>Pending</option>
                            <option>Closed</option>
                        </select>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
