import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // 🔴 SIZE VALIDATION (Flipkart behaviour)
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({ ...product, size: selectedSize });
    alert("Added to cart");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({ ...product, size: selectedSize });
    navigate("/checkout");
  };

  return (
    <div className="product-details">
      {/* IMAGE */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <span className="rating">⭐ 3.6 | 973</span>
      </div>

      {/* INFO */}
      <div className="product-info">
        <h3 className="brand">{product.brand}</h3>
        <h2>{product.name}</h2>

        {/* SIZE */}
        <div className="sizes">
          <p>Select Size</p>
          <div className="size-box">
            {sizes.map((size) => (
              <button
                key={size}
                className={selectedSize === size ? "active" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="price-section">
          <span className="discount">70% OFF</span>
          <span className="old-price">₹1999</span>
          <span className="price">₹608</span>
        </div>

        {/* ACTIONS */}
        <div className="actions">
          <button className="add-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-now" onClick={handleBuyNow}>
            Buy at ₹608
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

