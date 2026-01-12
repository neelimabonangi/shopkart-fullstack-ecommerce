import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";
import { BASE_URL } from "../config";

function AdminDashboard() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [orders, setOrders] = useState([]);

  // 🔐 Admin protection
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === "true") {
      setAuthorized(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 📦 Fetch orders
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/orders`)
      .then((res) => {
        console.log("ORDERS:", res.data);
        setOrders(res.data || []);
      })
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  if (!authorized) {
    return <p style={{ padding: "20px" }}>Checking admin access...</p>;
  }

  // ✅ Total Orders
  const totalOrders = orders.length;

  // ✅ Total Revenue (FIXED)
  const totalRevenue = orders.reduce((sum, order) => {
    // Use backend totalAmount if available
    if (order?.totalAmount) {
      return sum + Number(order.totalAmount);
    }

    // Otherwise calculate from items
    const items = Array.isArray(order?.items) ? order.items : [];
    const orderTotal = items.reduce(
      (itemSum, item) =>
        itemSum + Number(item?.price || 0) * Number(item?.quantity || 1),
      0
    );

    return sum + orderTotal;
  }, 0);

  // ✅ Total Products Sold
  const totalProductsSold = orders.reduce((sum, order) => {
    const items = Array.isArray(order?.items) ? order.items : [];
    const count = items.reduce(
      (itemSum, item) => itemSum + Number(item?.quantity || 1),
      0
    );
    return sum + count;
  }, 0);

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
            <h3>Total Products Sold</h3>
            <p>{totalProductsSold}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;













