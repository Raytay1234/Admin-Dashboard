// src/components/OrdersTable.jsx

export default function OrdersTable({ orders = [], onUpdate }) {
  const STATUS_OPTIONS = ["Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <table className="min-w-full divide-y divide-gray-700 text-gray-100">
      <thead className="bg-gray-800">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
          <th className="px-4 py-2 text-left text-sm font-medium">Customer</th>
          <th className="px-4 py-2 text-left text-sm font-medium">Total</th>
          <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
          <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
        </tr>
      </thead>
      <tbody className="bg-gray-900 divide-y divide-gray-700">
        {orders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-800 transition">
            <td className="px-4 py-2">{order.id}</td>
            <td className="px-4 py-2">{order.customer}</td>
            <td className="px-4 py-2">${order.total.toLocaleString()}</td>
            <td className="px-4 py-2">
              <select
                value={order.status}
                onChange={(e) => onUpdate(order.id, e.target.value)}
                className={`px-2 py-1 rounded-lg text-black text-sm font-medium bg-gray-200`}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-2">{order.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
