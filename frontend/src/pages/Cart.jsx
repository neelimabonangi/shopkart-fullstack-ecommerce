import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, totalPrice } =
    useContext(CartContext);

  const navigate = useNavigate();

  // 🛑 EMPTY CART
  if (!cart || cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Your cart is empty
      </h2>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div
          key={`${item.id}-${item.size}`}
          className="cart-row"
        >
          {/* 🖼 PRODUCT IMAGE */}
          <img
            src={item.imageUrl || item.image || "/no-image.png"}
            alt={item.name}
            className="cart-img"
          />

          {/* ℹ️ PRODUCT INFO */}
          <div className="cart-info">
            <h4>{item.name}</h4>

            {item.size && <p>Size: {item.size}</p>}

            <p>Price: ₹{item.price}</p>

            {/* ❌ NO QUANTITY */}
            {/* ❌ NO PRICE MULTIPLY */}

            <button
              className="remove-btn"
              onClick={() =>
                removeFromCart(item.id, item.size)
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* 💰 TOTAL — UNIQUE ITEMS ONLY */}
      <h3 className="cart-total">
        Total: ₹{totalPrice}
      </h3>

      <button
        className="checkout-btn"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;











