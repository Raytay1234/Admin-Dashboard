
import { useState, useEffect } from "react";
import { OrderContext } from "./orderContext.js";
import { ordersData as mockOrders } from "../data/ordersData.js"; // your mock orders generator

export default function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate API fetch
    const timeout = setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500); // 0.5s delay to mimic fetch

    return () => clearTimeout(timeout);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, loading }}>
      {children}
    </OrderContext.Provider>
  );
}