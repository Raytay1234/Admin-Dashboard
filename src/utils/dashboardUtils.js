import { incomeData, getYearlyTotals } from "../data/incomeData.js";

export const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1));

export const getInitialMetrics = () => {
    const yearlyTotals = getYearlyTotals();

    return {
        customers: yearlyTotals.newCustomers,
        income: yearlyTotals.income,
        ordersToday: randomInt(20, 80),
        ticketsOpen: randomInt(2, 15),
    };
};

export const buildChartData = () =>
    incomeData.reduce((acc, month, idx) => {
        const cumulativeIncome =
            (acc[idx - 1]?.cumulativeIncome || 0) + month.income;

        acc.push({
            month: month.month,
            income: month.income,
            orders: month.orders,
            newCustomers: month.newCustomers,
            cumulativeIncome,
        });

        return acc;
    }, []);
