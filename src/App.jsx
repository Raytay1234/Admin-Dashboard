// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Income from "./pages/IncomePro.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/income" element={<Income />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
