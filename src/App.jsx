// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Income from "./pages/IncomePro.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Profile from "./pages/Profile.jsx";
import Shop from "./pages/Shop.jsx";
import Comments from "./pages/Comments.jsx";

export default function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/income" element={<Income />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/comments" element={<Comments />} />
          </Routes>
        </Router>
    </AuthProvider>
  );
}
