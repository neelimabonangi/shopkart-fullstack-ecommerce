import {
  useState
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// ✅ COMPONENTS
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";

// ✅ PAGES
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

// ✅ ADMIN
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminAddProduct from "./admin/AdminAddProduct";
import AdminEditProduct from "./admin/AdminEditProduct";
import AdminOrderDetails from "./admin/AdminOrderDetails";
import AdminCart from "./admin/AdminCart";

function App() {

  // ✅ CATEGORY
  const [category,
    setCategory] =
    useState("All");

  // ✅ SEARCH
  const [search,
    setSearch] =
    useState("");

  // ✅ GET USER
  const loggedInUser =

    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    );

  // ✅ ADMIN CHECK
  const isAdmin =

    loggedInUser?.role ===
    "admin";

  return (

    <BrowserRouter>

      {/* ✅ NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
        setCategory={setCategory}
      />

      <Routes>

        {/* ✅ HOME */}
        <Route
          path="/"
          element={
            <HeroBanner />
          }
        />

        {/* ✅ PRODUCTS */}
        <Route
          path="/products"
          element={
            <ProductList
              category={category}
              search={search}
            />
          }
        />

        {/* ✅ PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails />
          }
        />

        {/* ✅ LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* ✅ SIGNUP */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ✅ CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* ✅ CHECKOUT */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* ✅ USER ORDERS */}
        <Route
          path="/orders"
          element={<Orders />}
        />

        {/* ================= ADMIN ================= */}

        {/* ✅ ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={

            isAdmin

              ? <AdminDashboard />

              : <Navigate to="/login" />
          }
        />

        {/* ✅ ADMIN PRODUCTS */}
        <Route
          path="/admin/products"
          element={

            isAdmin

              ? <AdminProducts />

              : <Navigate to="/login" />
          }
        />

        {/* ✅ ADMIN ORDERS */}
        <Route
          path="/admin/orders"
          element={

            isAdmin

              ? <AdminOrders />

              : <Navigate to="/login" />
          }
        />

        {/* ✅ ADMIN ORDER DETAILS */}
        <Route
          path="/admin/orders/:id"
          element={

            isAdmin

              ? <AdminOrderDetails />

              : <Navigate to="/login" />
          }
        />

        {/* ✅ ADMIN CART */}
        <Route
          path="/admin/cart"
          element={

            isAdmin

              ? <AdminCart />

              : <Navigate to="/login" />
          }
        />

        {/* ✅ ADMIN ADD PRODUCT */}
        <Route
          path="/admin/add-product"
          element={

            isAdmin

              ? <AdminAddProduct />

              : <Navigate to="/login" />
          }
        />

        {/* ✅ ADMIN EDIT PRODUCT */}
        <Route
          path="/admin/products/edit/:id"
          element={

            isAdmin

              ? <AdminEditProduct />

              : <Navigate to="/login" />
          }
        />

        {/* ✅ FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;





























