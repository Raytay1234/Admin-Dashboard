import { customersData } from "../data/customersData.js";

export function getCustomerStats() {
  const total = customersData.length;

  const active = customersData.filter(c => c.status === "Active").length;
  const inactive = customersData.filter(c => c.status === "Inactive").length;

  const totalOrders = customersData.reduce(
    (acc, c) => acc + (c.totalOrders || 0),
    0
  );

  const totalRevenue = customersData.reduce(
    (acc, c) => acc + (c.totalSpent || 0),
    0
  );

  const topSpender = [...customersData].sort(
    (a, b) => (b.totalSpent || 0) - (a.totalSpent || 0)
  )[0];

  const recent = [...customersData]
    .sort((a, b) => new Date(b.joined) - new Date(a.joined))
    .slice(0, 6);

  const monthlyGrowth = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1900 },
    { month: "Mar", revenue: 2400 },
    { month: "Apr", revenue: 1800 },
    { month: "May", revenue: 3200 },
    { month: "Jun", revenue: 4100 },
  ];

  return {
    total,
    active,
    inactive,
    totalOrders,
    totalRevenue,
    topSpender,
    recent,
    monthlyGrowth,
  };
}