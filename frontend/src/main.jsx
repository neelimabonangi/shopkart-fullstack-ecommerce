import { createRoot } from "react-dom/client";

// ✅ Context
import { CartProvider } from "./context/CartContext";

// ✅ App
import App from "./App";

// ✅ Global styles
import "./styles/global.css";

// 🔥 Mount React App
createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>
);



