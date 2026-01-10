import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Admin.css";

function AdminSidebar() {
  const navigate = useNavigate();
  const { cart = [] } = useContext(CartContext);

  return (
    <aside className="admin-sidebar">
      <h3 className="admin-title">Admin Panel</h3>

      <button className="admin-link" onClick={() => navigate("/admin")}>
        Dashboard
      </button>

      <button
        className="admin-link"
        onClick={() => navigate("/admin/products")}
      >
        Products
      </button>

      <button
        className="admin-link"
        onClick={() => navigate("/admin/orders")}
      >
        Orders
      </button>

      {/* 🛒 CLICKABLE CART PAGE */}
      <button
        className="admin-link"
        onClick={() => navigate("/admin/cart")}
      >
        Products in Cart
      </button>

      <button
        className="admin-link"
        onClick={() => navigate("/products")}
      >
        Go to Shop
      </button>

      <button
        className="admin-logout"
        onClick={() => {
          localStorage.removeItem("isAdmin");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;






