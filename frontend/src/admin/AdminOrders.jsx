import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";
import { BASE_URL } from "../config";

function AdminOrders() {
  const [orders, setOrders] = useState(() => {
    const cached = localStorage.getItem("orders");
    return cached ? JSON.parse(cached) : [];
  });

  const [loading, setLoading] = useState(orders.length === 0);
  const navigate = useNavigate();

  // 🔐 Protect admin route
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // 📦 Fetch orders (background refresh)
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/orders`)
      .then((res) => {
        const freshOrders = res.data || [];
        setOrders(freshOrders);
        localStorage.setItem("orders", JSON.stringify(freshOrders));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch orders error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h2>All Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Items</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => {
                const items =
                  order.items || order.products || order.cartItems || [];

                const safeItems = Array.isArray(items) ? items : [];

                const calculatedTotal = safeItems.reduce(
                  (sum, item) =>
                    sum + (item.price || 0) * (item.quantity || 1),
                  0
                );

                const total =
                  order.total ??
                  order.totalAmount ??
                  order.amount ??
                  calculatedTotal;

                return (
                  <tr key={order.id || index}>
                    <td>{index + 1}</td>
                    <td>{safeItems.length}</td>
                    <td>₹{total}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/admin/orders/${order.id || index}`, {
                            state: { order },
                          })
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;










