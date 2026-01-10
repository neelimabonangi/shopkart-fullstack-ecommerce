import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";
import { BASE_URL } from "../config";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h2>All Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Total Items</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id || index}>
                  <td>{index + 1}</td>
                  <td>{order.items.length}</td>
                  <td>₹{order.total}</td>
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;



