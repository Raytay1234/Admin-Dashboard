import { useContext } from "react";
import CartContext from "../context/CartContext.js";

export default function useCart() {
    const context = useContext(CartContext);

    if (!context) throw new Error("useCart must be used within a CartProvider");

    const { cart, setCart } = context;

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === product.id);
            if (exists) return prev;
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const updateQty = (id, qty) => {
        setCart((prev) =>
            prev.map((p) => (p.id === id ? { ...p, qty: Math.max(qty, 1) } : p))
        );
    };

    return { cart, addToCart, removeFromCart, updateQty };
}
