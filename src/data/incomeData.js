// src/data/incomeData.js

export const incomeData = [
    { month: "Jan", income: 45000, expenses: 32000, profit: 13000, orders: 120, newCustomers: 35, refunds: 4 },
    { month: "Feb", income: 52000, expenses: 30000, profit: 22000, orders: 135, newCustomers: 42, refunds: 3 },
    { month: "Mar", income: 48000, expenses: 31000, profit: 17000, orders: 128, newCustomers: 38, refunds: 5 },
    { month: "Apr", income: 60000, expenses: 35000, profit: 25000, orders: 150, newCustomers: 50, refunds: 6 },
    { month: "May", income: 58000, expenses: 34000, profit: 24000, orders: 142, newCustomers: 48, refunds: 4 },
    { month: "Jun", income: 62000, expenses: 36000, profit: 26000, orders: 155, newCustomers: 52, refunds: 5 },
    { month: "Jul", income: 64000, expenses: 37000, profit: 27000, orders: 160, newCustomers: 55, refunds: 3 },
    { month: "Aug", income: 59000, expenses: 33000, profit: 26000, orders: 148, newCustomers: 47, refunds: 6 },
    { month: "Sep", income: 61000, expenses: 34000, profit: 27000, orders: 152, newCustomers: 50, refunds: 4 },
    { month: "Oct", income: 63000, expenses: 35000, profit: 28000, orders: 158, newCustomers: 53, refunds: 3 },
    { month: "Nov", income: 67000, expenses: 37000, profit: 30000, orders: 165, newCustomers: 60, refunds: 5 },
    { month: "Dec", income: 70000, expenses: 39000, profit: 31000, orders: 172, newCustomers: 62, refunds: 6 },
];

// Totals for cards
export const getYearlyTotals = () =>
    incomeData.reduce(
        (acc, cur) => {
            acc.income += cur.income;
            acc.expenses += cur.expenses;
            acc.profit += cur.profit;
            acc.orders += cur.orders;
            acc.newCustomers += cur.newCustomers;
            acc.refunds += cur.refunds;
            return acc;
        },
        { income: 0, expenses: 0, profit: 0, orders: 0, newCustomers: 0, refunds: 0 }
    );

// Monthly comparison (current month vs previous month)
export const getMonthlyComparison = () => {
    const now = new Date();
    const monthIndex = now.getMonth();
    const current = incomeData[monthIndex] || incomeData[0];
    const previous = incomeData[monthIndex - 1] || incomeData[0];

    return {
        income: Math.round(((current.income - previous.income) / previous.income) * 100),
        customers: Math.round(((current.newCustomers - previous.newCustomers) / previous.newCustomers) * 100),
    };
};

// Year-to-date income
export const getYearToDateIncome = () => {
    const now = new Date();
    const monthIndex = now.getMonth();
    return incomeData.slice(0, monthIndex + 1).reduce((sum, m) => sum + m.income, 0);
};
