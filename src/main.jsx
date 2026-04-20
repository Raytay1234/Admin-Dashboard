// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from "./App.jsx";

// CONTEXT PROVIDERS
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import ProductProvider from "./context/ProductProvider.jsx";
import TicketProvider from "./context/TicketProvider.jsx";
import { CartProvider } from "./context/CartProvider.jsx";
import OrdersProvider from "./context/OrdersProvider.jsx";
import { DashboardProvider } from "./context/DashboardProvider.jsx";
import PromotionProvider from "./context/PromotionProvider.jsx";

import "./index.css";

const paypalOptions = {
  "client-id":
    "AddSUwOO2hl925HDpUiqUpwLgHNPGN20ZcWjJ8trkkPWbvKncXALZAQutay9y7os--pTaKukahxIXWhN",
  currency: "USD",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider options={paypalOptions}>
      <AuthProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </AuthProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
);