import { useState, useEffect } from "react";
import CartContext from "./CartContext.js";

// Provider component
export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("cart")) || [];
        } catch {
            return [];
        }
    });

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}
