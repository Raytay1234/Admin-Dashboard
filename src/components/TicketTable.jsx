export default function TicketTable({ tickets, onUpdate }) {
  if (!tickets.length) {
    return <p className="text-gray-400">No tickets yet.</p>;
  }

  return (
    <div className="overflow-x-auto bg-gray-900 rounded-xl">
      <table className="w-full text-sm">
        <thead className="bg-gray-800 text-left">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="border-t border-gray-800">
              <td className="p-3">{t.title}</td>
              <td className="p-3">{t.priority}</td>
              <td className="p-3">{t.status}</td>
              <td className="p-3">
                <select
                  value={t.status}
                  onChange={(e) =>
                    onUpdate(t.id, e.target.value)
                  }
                  className="bg-gray-800 rounded p-1"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
