import { useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext";
import useTickets from "../hooks/useTickets";
import TicketCharts from "../components/TicketCharts";
import TicketTable from "../components/TicketTable";
import Layout from "../components/Layout";

export default function TicketDashboard() {
    const { user, loading: authLoading } = useContext(AuthContext);
    const { tickets, updateStatus, loading, error } = useTickets();

    const isAdmin = useMemo(() => user?.role === "admin", [user]);

    if (authLoading) {
        return (
            <Layout>
                <p className="text-gray-400">Checking permissions…</p>
            </Layout>
        );
    }

    if (!isAdmin) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <h2 className="text-xl font-semibold text-red-400 mb-2">
                        Access Denied
                    </h2>
                    <p className="text-gray-400">
                        You don’t have permission to view ticket analytics.
                    </p>
                </div>
            </Layout>
        );
    }

    if (loading) {
        return (
            <Layout>
                <p className="text-gray-400">Loading ticket data…</p>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <p className="text-red-400">Failed to load tickets.</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-100">
                    Ticket Analytics
                </h1>
                <span className="text-sm text-gray-400">
                    Total tickets: {tickets.length}
                </span>
            </div>

            {tickets.length > 0 ? (
                <>
                    <TicketCharts tickets={tickets} />

                    <div className="mt-6">
                        <TicketTable
                            tickets={tickets}
                            isAdmin
                            onUpdate={updateStatus}
                        />
                    </div>
                </>
            ) : (
                <p className="text-gray-400">No tickets available.</p>
            )}
        </Layout>
    );
}
