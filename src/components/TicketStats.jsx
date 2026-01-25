export default function TicketStats({ tickets }) {
    const stats = {
        open: tickets.filter((t) => t.status === "Open").length,
        progress: tickets.filter((t) => t.status === "In Progress").length,
        closed: tickets.filter((t) => t.status === "Closed").length,
    };

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(stats).map(([k, v]) => (
                <div key={k} className="bg-gray-900 p-4 rounded-xl text-center">
                    <p className="text-gray-400">{k.toUpperCase()}</p>
                    <p className="text-3xl font-bold text-green-500">{v}</p>
                </div>
            ))}
        </div>
    );
}
