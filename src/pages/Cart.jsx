// src/pages/Cart.jsx
import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext.js";
import PayPalButton from "../components/PayPalButton.jsx";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [mpesaLoading, setMpesaLoading] = useState(false);
  const [mpesaMessage, setMpesaMessage] = useState("");

  const total = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  }, [cart]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, quantity || 1) }
          : item
      )
    );
  };

  // Mock M-Pesa payment
  const handleMpesaPayment = async () => {
    if (cart.length === 0) return;

    setMpesaLoading(true);
    setMpesaMessage("");

    try {
      // Simulate payment API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setMpesaMessage(`✅ M-Pesa payment of $${total.toFixed(2)} successful!`);
      setCart([]); // clear cart after payment
    } catch (err) {
      console.error("M-Pesa error:", err); // ✅ FIXED (Option 2)
      setMpesaMessage("❌ M-Pesa payment failed. Please try again.");
    } finally {
      setMpesaLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300 bg-gray-900">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-12 bg-gray-900 min-h-screen text-white space-y-6">
      <h1 className="text-2xl font-bold text-green-500">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-400">
                  ${item.price} × {item.quantity || 1}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.quantity || 1}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="w-16 p-1 rounded text-gray-900"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-600 hover:bg-red-500 px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center mt-6 gap-4">
        <span className="text-xl font-bold">
          Total: ${total.toFixed(2)}
        </span>

        <div className="flex gap-4">
          <PayPalButton amount={total} />

          <button
            onClick={handleMpesaPayment}
            disabled={mpesaLoading}
            className={`bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded transition ${
              mpesaLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {mpesaLoading ? "Processing..." : "Pay with M-Pesa"}
          </button>
        </div>
      </div>

      {mpesaMessage && (
        <p className="mt-4 font-medium text-center">
          {mpesaMessage}
        </p>
      )}
    </div>
  );
}