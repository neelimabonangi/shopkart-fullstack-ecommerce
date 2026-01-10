import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

function AdminOrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return <h2 style={{ padding: "20px" }}>No order found</h2>;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h2>Order Details</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.imageUrl || item.image || "/no-image.png"}
                    alt={item.name}
                    width="50"
                    height="50"
                    style={{
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                </td>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ marginTop: "20px" }}>
          Total Amount: ₹{order.total}
        </h3>

        <button
          style={{
            marginTop: "15px",
            padding: "8px 16px",
            backgroundColor: "#2874f0",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={() => navigate("/admin/orders")}
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}

export default AdminOrderDetails;





