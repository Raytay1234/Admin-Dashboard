export default function TicketTable({ tickets, isAdmin, onUpdate }) {
    return (
        <table className="w-full text-gray-200">
            <thead>
                <tr className="border-b border-gray-700">
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Owner</th>
                    {isAdmin && <th>Action</th>}
                </tr>
            </thead>
            <tbody>
                {tickets.map((t) => (
                    <tr key={t.id} className="border-b border-gray-800">
                        <td>{t.title}</td>
                        <td>{t.status}</td>
                        <td>{t.priority}</td>
                        <td>{t.createdBy?.name}</td>
                        {isAdmin && (
                            <td>
                                <select
                                    value={t.status}
                                    onChange={(e) => onUpdate(t.id, e.target.value)}
                                    className="bg-gray-800 p-1 rounded"
                                >
                                    <option>Open</option>
                                    <option>In Progress</option>
                                    <option>Closed</option>
                                </select>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
