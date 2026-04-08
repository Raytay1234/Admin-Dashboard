import { useMemo } from "react";
import useCurrency from "../hooks/useCurrency.js";
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

export default function IncomeChart({
  data = [],
  period = "monthly",
  showLines = { income: true, newCustomers: true, orders: false },
}) {
  const { format, convert } = useCurrency();

  const convertedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      income: convert(item.income),
    }));
  }, [data, convert]);

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-50 text-gray-400 text-sm">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-62.5 sm:h-80 lg:h-95">
      <ResponsiveContainer width="100%" height="100%" debounce={50}>
        {period === "yearly" ? (
          <BarChart data={convertedData}>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={format} />

            <Tooltip
              formatter={(value, name) =>
                name === "income"
                  ? [format(value), "Income"]
                  : [value, name]
              }
            />

            <Legend />

            {showLines.income && (
              <Bar dataKey="income" fill="#10B981" />
            )}
          </BarChart>
        ) : (
          <LineChart data={convertedData}>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip
              formatter={(value, name) =>
                name === "income"
                  ? [format(value), "Income"]
                  : [value, name]
              }
            />

            <Legend />

            {showLines.income && (
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
              />
            )}

            {showLines.newCustomers && (
              <Line
                type="monotone"
                dataKey="newCustomers"
                stroke="#60A5FA"
                strokeWidth={2}
                dot={false}
              />
            )}

            {showLines.orders && (
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#FBBF24"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}