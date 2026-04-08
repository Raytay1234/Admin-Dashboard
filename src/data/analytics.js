import { ordersData } from "./ordersData.js";

export const getMonthlyRevenue = () => {
    const map = {};

    ordersData.forEach((order) => {
        const date = new Date(order.createdAt);

        const month = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!map[month]) {
            map[month] = {
                month,
                income: 0,
                orders: 0,
                items: 0,
            };
        }

        map[month].income += Number(order.total || 0);
        map[month].orders += 1;
        map[month].items += Number(order.items || 0);
    });

    return Object.values(map).sort((a, b) =>
        a.month.localeCompare(b.month)
    );
};

// --- TOTAL REVENUE ---
export const getTotalRevenue = () => {
    return ordersData.reduce(
        (sum, o) => sum + Number(o.total || 0),
        0
    );
};