import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

// Backend Base URL (Render)
const BASE_URL = "https://shopkart-fullstack-ecommerce.onrender.com";

function ProductList({ category, search }) {
  const [products, setProducts] = useState(() => {
    const cached = localStorage.getItem("products");
    return cached ? JSON.parse(cached) : [];
  });

  const [selectedSizes, setSelectedSizes] = useState({});
  const [ratings, setRatings] = useState({});
  const [zoomImage, setZoomImage] = useState(null);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔹 Fetch products
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => {
        const freshProducts = res.data || [];
        setProducts(freshProducts);
        localStorage.setItem("products", JSON.stringify(freshProducts));
      })
      .catch((err) => {
        console.error("Error loading products:", err);
      });
  }, []);

  // 🔹 Filters
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      !category ||
      p.category?.toLowerCase().trim() === category.toLowerCase().trim();

    const matchSearch =
      !search ||
      p.name?.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  const getBaseRating = (product) =>
    ratings[product.id] ??
    Number(((product.id % 5) + 1 + Math.random()).toFixed(1));

  const getRatingCount = (product) =>
    product.ratingCount ?? 120 + product.id * 9;

  const hasFreeDelivery = (product) =>
    product.freeDelivery ?? product.id % 2 === 0;

  const getDiscount = (product) => {
    const discounts = [10, 20, 30, 40, 50, 60, 70];
    return product.discount ?? discounts[product.id % discounts.length];
  };

  const handleRatingClick = (productId, star) => {
    setRatings((prev) => ({ ...prev, [productId]: star }));
  };

  return (
    <>
      {/* 🔍 IMAGE ZOOM */}
      {zoomImage && (
        <div className="zoom-overlay" onClick={() => setZoomImage(null)}>
          <div className="zoom-content" onClick={(e) => e.stopPropagation()}>
            <span className="zoom-close" onClick={() => setZoomImage(null)}>
              ✕
            </span>
            <img src={zoomImage} alt="Zoomed product" />
          </div>
        </div>
      )}

      <div className="products-container">
        {filteredProducts.map((product) => {
          const currentRating = getBaseRating(product);

          return (
            <div key={product.id} className="product-card">
              <div className="rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      Math.round(currentRating) >= star
                        ? "star filled"
                        : "star"
                    }
                    onClick={() => handleRatingClick(product.id, star)}
                  >
                    ★
                  </span>
                ))}
                <span className="rating-text">
                  {currentRating} | {getRatingCount(product)}
                </span>
              </div>

              <div
                className="image-wrapper zoomable"
                onClick={() =>
                  setZoomImage(product.imageUrl || "/no-image.png")
                }
              >
                <img
                  src={product.imageUrl || "/no-image.png"}
                  alt={product.name}
                />
              </div>

              <h4>{product.name}</h4>

              <p className="price">
                ₹{product.price}
                <span className="discount">
                  {" "}
                  {getDiscount(product)}% off
                </span>
              </p>

              {hasFreeDelivery(product) && (
                <p className="delivery">Free Delivery</p>
              )}

              <div className="size-section">
                <span className="size-label">Select Size</span>
                <div className="size-options">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      className={
                        selectedSizes[product.id] === size
                          ? "size-btn active"
                          : "size-btn"
                      }
                      onClick={() =>
                        setSelectedSizes((prev) => ({
                          ...prev,
                          [product.id]: size,
                        }))
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="action-row">
                <button
                  className="add-cart-btn"
                  onClick={() => {
                    if (!selectedSizes[product.id]) {
                      alert("Please select size");
                      return;
                    }

                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.imageUrl,
                      size: selectedSizes[product.id],
                      quantity: 1,
                      rating: currentRating,
                    });
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="buy-now-btn"
                  onClick={() => {
                    if (!selectedSizes[product.id]) {
                      alert("Please select size");
                      return;
                    }

                    navigate("/checkout", {
                      state: {
                        buyNowProduct: {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.imageUrl,
                          size: selectedSizes[product.id],
                          quantity: 1,
                          rating: currentRating,
                        },
                      },
                    });
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductList;











































