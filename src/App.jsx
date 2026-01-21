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
import Promote from "./pages/Promote.jsx";
import Help from "./pages/Help.jsx";
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
            <Route path="/promote" element={<Promote />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Router>
    </AuthProvider>
  );
}
