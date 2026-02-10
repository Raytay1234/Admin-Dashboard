import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function IncomeChart({ data = [], period = "monthly", showLines = { income: true, newCustomers: true, orders: false } }) {
  if (!data.length) return <p className="text-gray-300">No data available</p>;

  // For yearly, use BarChart instead of LineChart
  if (period === "yearly") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" tickFormatter={formatCurrency} />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", color: "#fff" }} />
          <Legend />
          {showLines.income && <Bar dataKey="income" name="Income" fill="#10B981" />}
          {showLines.orders && <Bar dataKey="orders" name="Orders" fill="#FBBF24" />}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip
          formatter={(value, name) =>
            name === "income"
              ? [formatCurrency(value), "Income"]
              : [value, name === "newCustomers" ? "New Customers" : "Orders"]
          }
          contentStyle={{ backgroundColor: "#1F2937", border: "none", color: "#fff" }}
        />
        <Legend />
        {showLines.income && <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />}
        {showLines.newCustomers && <Line type="monotone" dataKey="newCustomers" stroke="#60A5FA" strokeWidth={2} dot={{ r: 3 }} />}
        {showLines.orders && <Line type="monotone" dataKey="orders" stroke="#FBBF24" strokeWidth={2} dot={{ r: 3 }} />}
      </LineChart>
    </ResponsiveContainer>
  );
}
