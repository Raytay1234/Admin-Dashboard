// src/data/orders.js

// Sample orders data
export const ordersData = [
    { id: "ORD-1001", customer: "john@example.com", items: 3, total: 125.5, status: "Processing", createdAt: "2026-01-15" },
    { id: "ORD-1002", customer: "sarah@example.com", items: 1, total: 45.0, status: "Shipped", createdAt: "2026-01-14" },
    { id: "ORD-1003", customer: "mike@example.com", items: 2, total: 80.0, status: "Delivered", createdAt: "2026-01-12" },
    { id: "ORD-1004", customer: "lisa@example.com", items: 5, total: 250.0, status: "Cancelled", createdAt: "2026-01-10" },
    { id: "ORD-1005", customer: "mike@example.com", items: 4, total: 180.0, status: "Processing", createdAt: "2026-01-08" },
    { id: "ORD-1006", customer: "jane@example.com", items: 2, total: 90.0, status: "Shipped", createdAt: "2015-01-07" },
    { id: "ORD-1007", customer: "Remmy@gmail.com", items: 6, total: 1200, status: "Delivered", createdAt: "2014-05-09" },
];

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
            startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
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
