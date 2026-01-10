import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

function AdminAddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product added (frontend only)");
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
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            value={product.imageUrl}
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
