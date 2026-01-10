import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Orders() {
  const { orders } = useContext(CartContext);

  if (!orders || orders.length === 0) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2>No orders yet</h2>
        <p>Place an order to see it here</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>My Orders</h2>

      {orders.map((order, index) => (
        <div
          key={order.id}
          style={{
            background: "#f7f7f7",
            borderRadius: "10px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          {/* ================= ORDER CARD ================= */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "30px",
            }}
          >
            {/* LEFT SIDE – DETAILS */}
            <div style={{ flex: 1 }}>
              <h4 style={{ marginBottom: "8px" }}>
                Order #{index + 1}
              </h4>

              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentMethod}
              </p>
              <p style={{ fontSize: "13px", color: "#555" }}>
                Ordered on: {order.date}
              </p>

              {/* PRODUCTS INFO */}
              {order.items.map((item, i) => (
                <div key={i} style={{ marginTop: "14px" }}>
                  <p style={{ fontWeight: "600", fontSize: "16px" }}>
                    {item.name}
                  </p>
                  {item.size && <p>Size: {item.size}</p>}
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE – BIG IMAGE */}
            <div
              style={{
                width: "280px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={
                  order.items[0].imageUrl ||
                  order.items[0].image ||
                  "/no-image.png"
                }
                alt={order.items[0].name}
                style={{
                  width: "100%",
                  height: "340px",        // 🔥 BIG IMAGE
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;




