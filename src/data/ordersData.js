// --- ORDER GENERATOR ---
const generateOrders = (count = 100) => {
    const statuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
    const customers = [
        "john@example.com",
        "sarah@example.com",
        "mike@example.com",
        "lisa@example.com",
        "jane@example.com",
        "alex@example.com",
        "remmy@gmail.com",
    ];

    return Array.from({ length: count }).map((_, i) => {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
        const randomItems = Math.floor(Math.random() * 6) + 1;
        const randomTotal = Number((Math.random() * 500 + 20).toFixed(2));

        const createdAt = new Date(
            Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 2)
        ).toISOString();

        return {
            id: `ORD-${1000 + i + 1}`,
            customer: randomCustomer,
            items: randomItems,
            total: randomTotal,
            status: randomStatus,
            createdAt,
        };
    });
};

// --- ORDERS DATA ---
export const ordersData = generateOrders(200);

// --- TOTALS ---
export const getOrdersTotals = () => {
    return ordersData.reduce(
        (acc, o) => {
            acc.totalRevenue += o.total;
            acc.totalOrders += 1;
            acc.totalItems += o.items;

            acc.statusCounts[o.status] =
                (acc.statusCounts[o.status] || 0) + 1;

            return acc;
        },
        {
            totalRevenue: 0,
            totalOrders: 0,
            totalItems: 0,
            statusCounts: {},
        }
    );
};

// --- FILTER BY STATUS ---
export const filterOrders = (status) => {
    if (!status || status === "all") return ordersData;
    return ordersData.filter((o) => o.status === status);
};

// --- FILTER BY DATE RANGE ---
export const filterOrdersByDate = (startDate, endDate) => {
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    return ordersData.filter((o) => {
        const created = new Date(o.createdAt).getTime();
        return created >= start && created <= end;
    });
};

// --- FILTER BY PERIOD ---
export const filterOrdersByPeriod = (period) => {
    const now = new Date();

    return ordersData.filter((o) => {
        const created = new Date(o.createdAt);

        switch (period) {
            case "daily":
                return created.toDateString() === now.toDateString();

            case "weekly": {
                const start = new Date(now);
                start.setDate(now.getDate() - now.getDay());
                start.setHours(0, 0, 0, 0);

                const end = new Date(start);
                end.setDate(start.getDate() + 6);
                end.setHours(23, 59, 59, 999);

                return created >= start && created <= end;
            }

            case "monthly":
                return (
                    created.getFullYear() === now.getFullYear() &&
                    created.getMonth() === now.getMonth()
                );

            case "yearly":
                return created.getFullYear() === now.getFullYear();

            default:
                return true;
        }
    });
};

// --- MONTHLY TREND (ORDERS, REVENUE, ITEMS) ---
export const getMonthlyOrderTrend = () => {
    const map = {};

    ordersData.forEach((o) => {
        const d = new Date(o.createdAt);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

        if (!map[key]) {
            map[key] = { month: key, orders: 0, revenue: 0, items: 0 };
        }

        map[key].orders += 1;
        map[key].revenue += o.total;
        map[key].items += o.items;
    });

    return Object.values(map).sort((a, b) =>
        a.month.localeCompare(b.month)
    );
};

// --- % CHANGE HELPER ---
export const getChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
};

export const getMonthlyComparison = () => {
    const now = new Date();

    const current = { revenue: 0, orders: 0, items: 0 };
    const previous = { revenue: 0, orders: 0, items: 0 };

    const prevDate = new Date(now.getFullYear(), now.getMonth() - 1);

    ordersData.forEach((o) => {
        const d = new Date(o.createdAt);

        if (
            d.getFullYear() === now.getFullYear() &&
            d.getMonth() === now.getMonth()
        ) {
            current.revenue += o.total;
            current.orders += 1;
            current.items += o.items;
        }
        if (
            d.getFullYear() === prevDate.getFullYear() &&
            d.getMonth() === prevDate.getMonth()
        ) {
            previous.revenue += o.total;
            previous.orders += 1;
            previous.items += o.items;
        }
    });

    return { current, previous };
};