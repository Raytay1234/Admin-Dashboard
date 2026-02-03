// src/hooks/useOrders.js
import { useContext } from "react";
import OrdersContext from "../context/OrdersContext.js";

export default function useOrders() {
    const ctx = useContext(OrdersContext);
    if (!ctx) throw new Error("useOrders must be used inside OrdersProvider");
    return ctx;
}
