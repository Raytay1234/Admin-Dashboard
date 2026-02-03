// src/context/OrdersProvider.jsx
import { useEffect, useState } from "react";
import OrdersContext from "./OrdersContext.js";
import { ordersData } from "../data/orders.js";

export default function OrdersProvider({ children }) {
    const [orders, setOrders] = useState(() => {
        try {
            const stored = localStorage.getItem("orders");
            return stored ? JSON.parse(stored) : ordersData;
        } catch {
            return ordersData;
        }
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const updateStatus = (id, status) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === id ? { ...o, status } : o))
        );
    };

    return (
        <OrdersContext.Provider value={{ orders, updateStatus }}>
            {children}
        </OrdersContext.Provider>
    );
}
