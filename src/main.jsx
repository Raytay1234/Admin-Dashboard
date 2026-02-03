import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import { ProductProvider } from "./context/ProductProvider.jsx";
import TicketProvider from "./context/TicketProvider.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import OrdersProvider from "./context/OrdersProvider.jsx"; // ✅ correct filename
import { DashboardProvider } from "./context/DashboardProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <TicketProvider>
          <CartProvider>
            <OrdersProvider>
              <ProductProvider>
                <DashboardProvider>
                  <App />
                </DashboardProvider>
              </ProductProvider>
            </OrdersProvider>
          </CartProvider>
        </TicketProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
