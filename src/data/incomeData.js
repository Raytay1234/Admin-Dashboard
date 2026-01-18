// src/data/incomeData.js

// Mocked detailed financial data for a full year
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

// Optionally, create a helper function to compute totals for metrics cards
export const getYearlyTotals = () => {
    return incomeData.reduce(
        (acc, curr) => {
            acc.income += curr.income;
            acc.expenses += curr.expenses;
            acc.profit += curr.profit;
            acc.orders += curr.orders;
            acc.newCustomers += curr.newCustomers;
            acc.refunds += curr.refunds;
            return acc;
        },
        { income: 0, expenses: 0, profit: 0, orders: 0, newCustomers: 0, refunds: 0 }
    );
};
