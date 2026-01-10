import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout() {
  const { cart, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 BUY NOW PRODUCT
  const buyNowProduct = location.state?.buyNowProduct;

  const initialItems = buyNowProduct
    ? [{ ...buyNowProduct, quantity: buyNowProduct.quantity || 1 }]
    : cart.map((item) => ({ ...item, quantity: item.quantity || 1 }));

  const [items, setItems] = useState(initialItems);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiApp, setUpiApp] = useState("PhonePe");
  const [upiId, setUpiId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (items.length === 0 && !orderPlaced) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  const increaseQty = (index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const checkoutTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    if (paymentMethod === "UPI" && !upiId.trim()) {
      alert("Please enter UPI ID");
      return;
    }

    // 🔥 USE CONTEXT METHOD
    placeOrder({
      items,
      total: checkoutTotal,
      address,
      paymentMethod,
      date: new Date().toLocaleString(),
    });

    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
        <h2 style={{ color: "green" }}>✅ Order Placed Successfully</h2>

        <p>
          <strong>Total Amount:</strong> ₹{checkoutTotal}
        </p>

        {paymentMethod === "COD" ? (
          <p>💵 Pay ₹{checkoutTotal} in cash at delivery.</p>
        ) : (
          <>
            <p>
              📲 Pay using <strong>{upiApp}</strong>
            </p>
            <p>
              <strong>UPI ID:</strong> {upiId}
            </p>
          </>
        )}

        <p style={{ marginTop: "15px" }}>
          📦 Your order will be delivered soon
        </p>

        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#2874f0",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Checkout</h2>
      <hr />

      <h3>Order Summary</h3>

      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <img
            src={item.imageUrl || "/no-image.png"}
            alt={item.name}
            style={{
              width: "90px",
              height: "90px",
              objectFit: "cover",
              marginRight: "15px",
              borderRadius: "6px",
            }}
          />

          <div>
            <h4>{item.name}</h4>
            <p>Price: ₹{item.price}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <button onClick={() => decreaseQty(index)}>−</button>
              <strong>{item.quantity}</strong>
              <button onClick={() => increaseQty(index)}>+</button>
            </div>
          </div>
        </div>
      ))}

      <h3>Total: ₹{checkoutTotal}</h3>
      <hr />

      <h3>Delivery Address</h3>
      <textarea
        placeholder="Enter your delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          height: "80px",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <h3>Payment Method</h3>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{ padding: "8px", marginBottom: "15px" }}
      >
        <option value="COD">Cash on Delivery</option>
        <option value="UPI">UPI</option>
      </select>

      {paymentMethod === "UPI" && (
        <>
          <select
            value={upiApp}
            onChange={(e) => setUpiApp(e.target.value)}
            style={{ padding: "8px", marginBottom: "10px" }}
          >
            <option>PhonePe</option>
            <option>Google Pay</option>
            <option>Paytm</option>
          </select>

          <input
            type="text"
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "15px",
            }}
          />
        </>
      )}

      <button
        style={{
          backgroundColor: "#2874f0",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
        }}
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;








