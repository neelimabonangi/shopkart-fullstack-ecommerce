import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // 🔁 Load from localStorage
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  // 💾 Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 💾 Persist orders
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ✅ STRICT UNIQUE BY PRODUCT ID ONLY
  const addToCart = (product) => {
    if (!product || product.id == null) return;

    setCart((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        return prev;
      }

      return [...prev, { ...product }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // 🛒 PLACE ORDER (FIXED)
  const placeOrder = (orderData) => {
    if (!orderData || !orderData.items || orderData.items.length === 0) return;

    const newOrder = {
      id: Date.now(),
      ...orderData,
    };

    setOrders((prev) => [...prev, newOrder]);
    setCart([]); // 🔥 CLEAR CART AFTER CHECKOUT
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
        placeOrder, // 🔥 FIXED
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}









