import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

function parseItems(str) {
  try {
    if (!str || typeof str !== "string") return [];

    // Remove [ and ]
    const clean = str.substring(1, str.length - 1);

    const parts = clean.split(", ");

    const obj = {};
    parts.forEach((part) => {
      const [key, ...rest] = part.split("=");
      obj[key.trim()] = rest.join("=").trim();
    });

    return [
      {
        id: Number(obj.id),
        name: obj.name,
        price: Number(obj.price),
        quantity: Number(obj.quantity),
        imageUrl: obj.imageUrl,
        size: obj.size,
      },
    ];
  } catch (e) {
    console.error("Parse error:", e);
    return [];
  }
}

function AdminOrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return <h2 style={{ padding: "20px" }}>No order found</h2>;
  }

  let items = [];

  if (typeof order.items === "string") {
    items = parseItems(order.items);
  } else if (Array.isArray(order.items)) {
    items = order.items;
  }

  const total =
    order.total ||
    order.totalAmount ||
    order.amount ||
    items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h2>Order Details</h2>

        {items.length === 0 ? (
          <p>No products found in this order</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.imageUrl || "/no-image.png"}
                      alt={item.name}
                      width="60"
                      height="60"
                      style={{ objectFit: "cover", borderRadius: "6px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h3 style={{ marginTop: "20px" }}>
          Total Amount: ₹{total}
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



