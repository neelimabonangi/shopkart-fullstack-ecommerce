import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function OrderHistory() {
  const { orders } = useContext(CartContext);

  if (orders.length === 0) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2>No orders yet</h2>
        <p>Your orders will appear here after checkout</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <p><strong>Order Date:</strong> {order.date}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>

          <hr />

          {order.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <img
                src={item.imageUrl || item.image || "/no-image.png"}
                alt={item.name}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  marginRight: "15px",
                }}
              />

              <div>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                {item.size && <p>Size: {item.size}</p>}
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
