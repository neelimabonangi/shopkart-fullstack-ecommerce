import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function AdminAnalytics() {
  const { orders } = useContext(CartContext);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.total,
    0
  );

  return (
    <div>
      <h2>Revenue Analytics</h2>

      <div style={{ marginTop: "20px" }}>
        <h3>Total Revenue</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          ₹{totalRevenue}
        </p>
      </div>
    </div>
  );
}

export default AdminAnalytics;
