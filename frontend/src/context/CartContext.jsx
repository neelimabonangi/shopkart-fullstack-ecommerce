import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // 🛒 CART (persisted locally)
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // 📦 ORDERS (from backend)
  const [orders, setOrders] = useState([]);

  // 💾 Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔄 Fetch orders from backend
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ UNIQUE ADD TO CART
  const addToCart = (product) => {
    if (!product || product.id == null) return;

    setCart((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // 🛒 PLACE ORDER (LIVE BACKEND)
  const placeOrder = async (orderData) => {
    if (!orderData || !orderData.items || orderData.items.length === 0) return;

    try {
      const res = await axios.post(`${BASE_URL}/api/orders`, orderData);
      setOrders((prev) => [...prev, res.data]);
      clearCart(); // 🔥 CLEAR CART AFTER CHECKOUT
    } catch (err) {
      console.error("Order failed:", err);
      alert("Order failed");
    }
  };

  // 🔔 UNIQUE COUNT
  const totalItems = cart.length;

  // 💰 UNIQUE TOTAL
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}










