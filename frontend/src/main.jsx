import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// ✅ Context
import { CartProvider } from "./context/CartContext";

// ✅ App
import App from "./App";

// ✅ Global styles
import "./styles/global.css";

// 🔥 Mount React App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Cart context available to entire app */}
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);



