import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Product updated (frontend only)");
    navigate("/admin/products");
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
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
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



