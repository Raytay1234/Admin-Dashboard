export const incomeData = [
  { month: "Jan", income: 45000, orders: 120, newCustomers: 35, refunds: 4 },
  { month: "Feb", income: 52000, orders: 135, newCustomers: 42, refunds: 3 },
  { month: "Mar", income: 48000, orders: 128, newCustomers: 38, refunds: 5 },
  { month: "Apr", income: 60000, orders: 150, newCustomers: 50, refunds: 6 },
  { month: "May", income: 58000, orders: 142, newCustomers: 48, refunds: 4 },
  { month: "Jun", income: 62000, orders: 155, newCustomers: 52, refunds: 5 },
  { month: "Jul", income: 64000, orders: 160, newCustomers: 55, refunds: 3 },
  { month: "Aug", income: 59000, orders: 148, newCustomers: 47, refunds: 6 },
  { month: "Sep", income: 61000, orders: 152, newCustomers: 50, refunds: 4 },
  { month: "Oct", income: 63000, orders: 158, newCustomers: 53, refunds: 3 },
  { month: "Nov", income: 67000, orders: 165, newCustomers: 60, refunds: 5 },
  { month: "Dec", income: 70000, orders: 172, newCustomers: 62, refunds: 6 },
];

// Yearly totals
export const getYearlyTotals = () =>
  incomeData.reduce(
    (acc, m) => {
      acc.income += m.income;
      acc.orders += m.orders;
      acc.newCustomers += m.newCustomers;
      acc.refunds += m.refunds;
      return acc;
    },
    { income: 0, orders: 0, newCustomers: 0, refunds: 0 }
  );

// Filtered data by period
export const filterIncomeData = (period) => {
  const lastMonth = incomeData[incomeData.length - 1];
  const jitter = (value, percent = 0.1) =>
    Math.round(value * (1 + (Math.random() - 0.5) * percent));

  switch (period) {
    case "daily": {
      const dailyOrders = Math.round(lastMonth.orders / 30);
      const dailyIncome = Math.round(lastMonth.income / 30);
      const dailyCustomers = Math.round(lastMonth.newCustomers / 30);
      return Array.from({ length: 7 }).map((_, i) => ({
        month: `Day ${i + 1}`,
        income: jitter(dailyIncome),
        orders: jitter(dailyOrders),
        newCustomers: jitter(dailyCustomers),
        refunds: jitter(Math.round(lastMonth.refunds / 30)),
      }));
    }
    case "weekly": {
      const weeklyOrders = Math.round(lastMonth.orders / 4);
      const weeklyIncome = Math.round(lastMonth.income / 4);
      const weeklyCustomers = Math.round(lastMonth.newCustomers / 4);
      return Array.from({ length: 4 }).map((_, i) => ({
        month: `Week ${i + 1}`,
        income: jitter(weeklyIncome),
        orders: jitter(weeklyOrders),
        newCustomers: jitter(weeklyCustomers),
        refunds: jitter(Math.round(lastMonth.refunds / 4)),
      }));
    }
    case "monthly":
      return incomeData;
    case "yearly":
      return [
        {
          month: "Year",
          income: incomeData.reduce((a, b) => a + b.income, 0),
          orders: incomeData.reduce((a, b) => a + b.orders, 0),
          newCustomers: incomeData.reduce((a, b) => a + b.newCustomers, 0),
          refunds: incomeData.reduce((a, b) => a + b.refunds, 0),
        },
      ];
    default:
      return incomeData;
  }
};
