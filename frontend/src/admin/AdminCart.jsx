import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

function AdminCart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h2>Products in Cart</h2>

        {cart.length === 0 ? (
          <p>No products in cart</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminCart;



