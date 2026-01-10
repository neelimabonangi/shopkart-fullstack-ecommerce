import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";
import { BASE_URL } from "../config";

function AdminEditProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [category, setCategory] = useState(product?.category || "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");

  if (!product) {
    return <h2 style={{ padding: "20px" }}>No product found</h2>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      price,
      category,
      imageUrl,
    };

    try {
      await axios.put(
        `${BASE_URL}/api/products/${product.id}`,
        updatedProduct
      );
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h2>Edit Product</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            required
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProduct;




