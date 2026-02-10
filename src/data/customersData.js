// src/data/customersData.js

// Base customers
const baseCustomers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", orders: 12, totalSpent: 1240 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", orders: 8, totalSpent: 980 },
  { id: 3, name: "Charlie Lee", email: "charlie@example.com", orders: 15, totalSpent: 2100 },
  { id: 4, name: "Diana Prince", email: "diana@example.com", orders: 5, totalSpent: 430 },
  { id: 5, name: "Evan White", email: "evan@example.com", orders: 9, totalSpent: 1275 },
  { id: 6, name: "Fiona Green", email: "fiona@example.com", orders: 11, totalSpent: 1850 },
];

// Function to generate infinite-like dataset
export const generateCustomers = (count = 1000) => {
  const customers = [];
  for (let i = 0; i < count; i++) {
    const base = baseCustomers[i % baseCustomers.length]; // Cycle through base data
    customers.push({
      id: i + 1,
      name: `${base.name.split(" ")[0]} ${base.name.split(" ")[1]} ${i + 1}`, // Unique name
      email: `user${i + 1}@example.com`, // Unique email
      orders: base.orders + (i % 10), // Slight variation
      totalSpent: base.totalSpent + (i * 10), // Slight variation
      status: Math.random() > 0.5 ? "Active" : "Inactive",
      joined: new Date(
        Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
      ).toLocaleDateString("en-US"),
      avatar: `https://picsum.photos/seed/customer${i + 1}/100/100`,
    });
  }
  return customers;
};

// Default export for convenience
export const customersData = generateCustomers();
