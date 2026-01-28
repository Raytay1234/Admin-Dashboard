import { useState, useEffect, useMemo } from "react";
import DashboardContext from "./DashboardContext.js";
import { getYearlyTotals, incomeData } from "../data/incomeData.js";

// Helper to generate random integer between min and max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));

export function DashboardProvider({ children }) {
  const yearlyTotals = getYearlyTotals();

  // Live metrics state
  const [customers, setCustomers] = useState(yearlyTotals.newCustomers);
  const [income, setIncome] = useState(yearlyTotals.income);
  
  // Orders today and tickets open: set once when component mounts
  const [ordersToday] = useState(() => randomInt(20, 80));
  const [ticketsOpen] = useState(() => randomInt(2, 15));

  // Live updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCustomers(prev => prev + randomInt(0, 3));
      setIncome(prev => prev + randomInt(2000, 15000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Compute chart data for IncomeChart (monthly + cumulative YTD)
  const chartData = useMemo(() => {
    return incomeData.reduce((acc, month, idx) => {
      const cumulativeIncome = (acc[idx - 1]?.cumulativeIncome || 0) + month.income;
      acc.push({
        month: month.month,
        income: month.income,
        orders: month.orders,
        newCustomers: month.newCustomers,
        cumulativeIncome,
      });
      return acc;
    }, []);
  }, []);

  return (
    <DashboardContext.Provider value={{
      customers,
      income,
      ordersToday,
      ticketsOpen,
      chartData,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}
