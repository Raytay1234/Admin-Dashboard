export async function getOrdersFromAPI() {
  try {
    const response = await fetch("https://your-backend.com/api/orders");
    if (!response.ok) throw new Error("Failed to fetch orders");
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      orders: [
        { id: 1, customer: "John Doe", total: 99.99, status: "Processing", createdAt: "2024-01-15" },
        { id: 2, customer: "Jane Smith", total: 149.49, status: "Shipped", createdAt: "2024-01-10" },
        { id: 3, customer: "Mike Johnson", total: 79.95, status: "Delivered", createdAt: "2024-01-05" },
      ],
    };
  }
}