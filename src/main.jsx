import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import { TicketProvider } from "./context/TicketContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { DashboardProvider } from "./context/DashboardProvider.jsx"; // check filename
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <TicketProvider>
          <CartProvider>
            <DashboardProvider> {/* <-- Wrap App with DashboardProvider */}
              <App />
            </DashboardProvider>
          </CartProvider>
        </TicketProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
