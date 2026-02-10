// src/data/orders.js

// Generate “infinite-looking” orders
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
        const randomTotal = parseFloat((Math.random() * 500 + 20).toFixed(2));

        // Random date in last 2 years
        const createdAt = new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 2))
            .toISOString()
            .split("T")[0];

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

// Use generated orders
export const ordersData = generateOrders(200); // 200 orders, looks infinite

// --- Totals ---
export const getOrdersTotals = () => {
    return ordersData.reduce(
        (acc, order) => {
            acc.totalRevenue += order.total;
            acc.totalOrders += 1;
            acc.totalItems += order.items;
            acc.statusCounts[order.status] = (acc.statusCounts[order.status] || 0) + 1;
            return acc;
        },
        { totalRevenue: 0, totalOrders: 0, totalItems: 0, statusCounts: {} }
    );
};

// --- Filter by status ---
export const filterOrders = (status) => {
    if (!status || status === "all") return ordersData;
    return ordersData.filter((o) => o.status === status);
};

// --- Filter by date range ---
export const filterOrdersByDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return ordersData.filter((o) => {
        const created = new Date(o.createdAt);
        return created >= start && created <= end;
    });
};

// --- Filter by period: daily, weekly, monthly, yearly ---
export const filterOrdersByPeriod = (period) => {
    const now = new Date();

    switch (period) {
        case "daily":
            return ordersData.filter((o) => {
                const created = new Date(o.createdAt);
                return created.toDateString() === now.toDateString();
            });

        case "weekly": {
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return ordersData.filter((o) => {
                const created = new Date(o.createdAt);
                return created >= startOfWeek && created <= endOfWeek;
            });
        }

        case "monthly": {
            const month = now.getMonth();
            const year = now.getFullYear();
            return ordersData.filter((o) => {
                const created = new Date(o.createdAt);
                return created.getMonth() === month && created.getFullYear() === year;
            });
        }

        case "yearly": {
            const year = now.getFullYear();
            return ordersData.filter((o) => new Date(o.createdAt).getFullYear() === year);
        }

        default:
            return ordersData;
    }
};
