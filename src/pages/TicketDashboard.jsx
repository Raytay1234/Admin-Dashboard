import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useTickets from "../hooks/useTickets";
import TicketCharts from "../components/TicketCharts";
import TicketTable from "../components/TicketTable";
import Layout from "../components/Layout";

export default function TicketDashboard() {
    const { user } = useContext(AuthContext);
    const { tickets, updateStatus } = useTickets();

    if (user.role !== "admin") {
        return <Layout><p>Access denied</p></Layout>;
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold text-gray-100 mb-4">
                Ticket Analytics
            </h1>

            <TicketCharts tickets={tickets} />

            <TicketTable
                tickets={tickets}
                isAdmin
                onUpdate={updateStatus}
            />
        </Layout>
    );
}
