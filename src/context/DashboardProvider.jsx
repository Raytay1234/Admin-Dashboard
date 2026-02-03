import { useEffect, useMemo, useState } from "react";
import DashboardContext from "./DashboardContext.js";
import {
  getInitialMetrics,
  buildChartData,
  randomInt,
} from "../utils/dashboardUtils.js";

export function DashboardProvider({ children }) {
  const initial = useMemo(() => getInitialMetrics(), []);

  const [customers, setCustomers] = useState(initial.customers);
  const [income, setIncome] = useState(initial.income);
  const [ordersToday] = useState(initial.ordersToday);
  const [ticketsOpen] = useState(initial.ticketsOpen);

  useEffect(() => {
    const interval = setInterval(() => {
      setCustomers((prev) => prev + randomInt(0, 3));
      setIncome((prev) => prev + randomInt(2000, 15000));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => buildChartData(), []);

  return (
    <DashboardContext.Provider
      value={{
        customers,
        income,
        ordersToday,
        ticketsOpen,
        chartData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
