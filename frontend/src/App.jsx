import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

// ✅ ADMIN PAGES
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminAddProduct from "./admin/AdminAddProduct";
import AdminEditProduct from "./admin/AdminEditProduct";
import AdminOrderDetails from "./admin/AdminOrderDetails";
import AdminCart from "./admin/AdminCart";

function App() {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);

  // 🔐 Safe admin check
  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin");
    setIsAdmin(adminFlag === "true");
  }, []);

  // ⏳ Prevent blank screen while checking admin
  if (isAdmin === null) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <BrowserRouter>
      {/* 🔵 NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
        setCategory={setCategory}
      />

      <Routes>
        {/* 🏠 HOME */}
        <Route path="/" element={<HeroBanner />} />

        {/* 🛍️ PRODUCTS */}
        <Route
          path="/products"
          element={<ProductList category={category} search={search} />}
        />

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🛒 CART */}
        <Route path="/cart" element={<Cart />} />

        {/* 💳 CHECKOUT */}
        <Route path="/checkout" element={<Checkout />} />

        {/* 🧾 USER ORDERS */}
        <Route path="/orders" element={<Orders />} />

        {/* 🛡️ ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        {/* 🛡️ ADMIN PRODUCTS */}
        <Route
          path="/admin/products"
          element={isAdmin ? <AdminProducts /> : <Navigate to="/login" />}
        />

        {/* 🛡️ ADMIN ORDERS */}
        <Route
          path="/admin/orders"
          element={isAdmin ? <AdminOrders /> : <Navigate to="/login" />}
        />

        {/* 🛡️ ADMIN ORDER DETAILS */}
        <Route
          path="/admin/orders/:id"
          element={isAdmin ? <AdminOrderDetails /> : <Navigate to="/login" />}
        />

        {/* 🛡️ ADMIN CART */}
        <Route
          path="/admin/cart"
          element={isAdmin ? <AdminCart /> : <Navigate to="/login" />}
        />

        {/* 🛡️ ADD PRODUCT */}
        <Route
          path="/admin/add-product"
          element={isAdmin ? <AdminAddProduct /> : <Navigate to="/login" />}
        />

        {/* 🛡️ EDIT PRODUCT */}
        <Route
          path="/admin/products/edit/:id"
          element={isAdmin ? <AdminEditProduct /> : <Navigate to="/login" />}
        />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





























