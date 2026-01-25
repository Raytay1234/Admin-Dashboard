import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export default function TicketCharts({ tickets }) {
    // ───── Status Chart ─────
    const statusData = [
        { name: "Open", value: tickets.filter(t => t.status === "Open").length },
        { name: "In Progress", value: tickets.filter(t => t.status === "In Progress").length },
        { name: "Closed", value: tickets.filter(t => t.status === "Closed").length },
    ];

    // ───── Priority Chart ─────
    const priorityData = [
        { name: "Low", value: tickets.filter(t => t.priority === "Low").length },
        { name: "Medium", value: tickets.filter(t => t.priority === "Medium").length },
        { name: "High", value: tickets.filter(t => t.priority === "High").length },
    ];

    // ───── Tickets Over Time ─────
    const timeData = tickets.reduce((acc, t) => {
        const day = new Date(t.createdAt).toLocaleDateString();
        const existing = acc.find(d => d.date === day);
        if (existing) existing.count++;
        else acc.push({ date: day, count: 1 });
        return acc;
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* STATUS */}
            <div className="bg-gray-900 p-4 rounded-xl">
                <h3 className="text-gray-100 mb-2 font-semibold">Tickets by Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={statusData}>
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="value" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* PRIORITY */}
            <div className="bg-gray-900 p-4 rounded-xl">
                <h3 className="text-gray-100 mb-2 font-semibold">Priority Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={priorityData} dataKey="value" nameKey="name" label>
                            {priorityData.map((_, i) => (
                                <Cell key={i} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* TIME */}
            <div className="bg-gray-900 p-4 rounded-xl">
                <h3 className="text-gray-100 mb-2 font-semibold">Tickets Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={timeData}>
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line dataKey="count" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
