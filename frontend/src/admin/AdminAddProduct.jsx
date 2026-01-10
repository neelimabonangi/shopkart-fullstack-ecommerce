import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";
import { BASE_URL } from "../config";

function AdminAddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/products`, product);
      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h2>Add Product</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={product.name}
            required
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={product.price}
            required
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={product.category}
            required
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            value={product.imageUrl}
            required
            onChange={(e) =>
              setProduct({ ...product, imageUrl: e.target.value })
            }
          />

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddProduct;

