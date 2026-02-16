import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ ADD THIS
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import ProductProvider from "./context/ProductProvider.jsx";
import TicketProvider from "./context/TicketProvider.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import OrdersProvider from "./context/OrdersProvider.jsx";
import { DashboardProvider } from "./context/DashboardProvider.jsx";
import PromotionProvider from "./context/PromotionProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ MUST WRAP EVERYTHING */}
      <AuthProvider>
        <ThemeProvider>
          <TicketProvider>
            <CartProvider>
              <OrdersProvider>
                <ProductProvider>
                  <DashboardProvider>
                    <PromotionProvider>
                      <App />
                    </PromotionProvider>
                  </DashboardProvider>
                </ProductProvider>
              </OrdersProvider>
            </CartProvider>
          </TicketProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
