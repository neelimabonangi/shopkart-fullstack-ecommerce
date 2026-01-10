import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

function AdminDashboard() {
  const { orders, cart } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔐 PROTECT ADMIN PAGE
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  // ✅ FIXED: Total products in cart
  const totalCartItems = cart.length;

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h2>Dashboard</h2>

        <div className="admin-cards">
          <div className="admin-card">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>

          <div className="admin-card">
            <h3>Total Revenue</h3>
            <p>₹{totalRevenue}</p>
          </div>

          <div className="admin-card">
            <h3>Products in Cart</h3>
            <p>{totalCartItems}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;





