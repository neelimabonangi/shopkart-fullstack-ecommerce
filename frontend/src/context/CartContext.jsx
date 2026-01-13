import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Base URL for backend (Render)
const BASE_URL = "https://shopkart-fullstack-ecommerce.onrender.com";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Cart load error:", e);
      return [];
    }
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/orders`)
      .then((res) => setOrders(res.data || []))
      .catch((err) => console.error("Fetch orders error:", err));
  }, []);

  const addToCart = (product) => {
    if (!product || product.id == null) return;

    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = async (orderData) => {
    if (!orderData || !orderData.items || orderData.items.length === 0) return;

    try {
      const res = await axios.post(`${BASE_URL}/api/orders`, orderData);
      setOrders((prev) => [...prev, res.data]);
      clearCart();
    } catch (err) {
      console.error("Order failed:", err);
      alert("Order failed");
    }
  };

  const totalItems = cart.length;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

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













