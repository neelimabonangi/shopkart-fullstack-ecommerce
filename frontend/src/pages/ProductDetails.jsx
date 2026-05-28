import {
  useState,
  useContext
} from "react";

import {
  CartContext
} from "../context/CartContext";

import {
  useNavigate
} from "react-router-dom";

import "./ProductDetails.css";

function ProductDetails({
  product
}) {

  const [selectedSize,
    setSelectedSize] =
    useState("");

  const [selectedRating,
    setSelectedRating] =
    useState(4);

  const [zoomed,
    setZoomed] =
    useState(false);

  const {
    addToCart
  } = useContext(
    CartContext
  );

  const navigate =
    useNavigate();

  // ✅ SIZES
  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL"
  ];

  // ✅ RANDOM DATA
  const ratings = [
    3.6,
    4.0,
    4.2,
    4.5,
    4.8
  ];

  const reviews = [
    973,
    2100,
    432,
    765,
    1800
  ];

  const discounts = [
    "70% OFF",
    "55% OFF",
    "82% OFF",
    "60% OFF"
  ];

  const oldPrices = [
    1999,
    2499,
    2999,
    1599
  ];

  const randomRating =
    ratings[
      product.id %
      ratings.length
    ];

  const randomReview =
    reviews[
      product.id %
      reviews.length
    ];

  const randomDiscount =
    discounts[
      product.id %
      discounts.length
    ];

  const randomOldPrice =
    oldPrices[
      product.id %
      oldPrices.length
    ];

  // ✅ ADD TO CART
  const handleAddToCart =
    () => {

    if (!selectedSize) {

      alert(
        "Please select a size"
      );

      return;
    }

    addToCart({

      ...product,

      size:
        selectedSize,

      rating:
        selectedRating

    });

    alert(
      "Added to cart ✅"
    );
  };

  // ✅ BUY NOW
  const handleBuyNow =
    () => {

    if (!selectedSize) {

      alert(
        "Please select a size"
      );

      return;
    }

    navigate(
      "/checkout",
      {
        state: {
          buyNowProduct: {

            ...product,

            size:
              selectedSize,

            rating:
              selectedRating,

            quantity: 1
          }
        }
      }
    );
  };

  return (

    <div className="product-details">

      {/* LEFT IMAGE */}
      <div className="product-image">

        <div
          style={{
            overflow:
              "hidden",
            borderRadius:
              "12px"
          }}
        >

          <img
            src={
              product.imageUrl ||
              product.image
            }

            alt={
              product.name
            }

            style={{
              width: "100%",
              borderRadius:
                "12px",
              transition:
                "0.4s ease",
              cursor:
                "zoom-in",
              transform:
                zoomed

                  ? "scale(1.4)"

                  : "scale(1)"
            }}

            onMouseEnter={() =>
              setZoomed(true)
            }

            onMouseLeave={() =>
              setZoomed(false)
            }
          />

        </div>

        {/* RATING */}
        <span
          className="rating"
        >
          ⭐
          {" "}
          {randomRating}
          {" | "}
          {randomReview}
        </span>

      </div>

      {/* RIGHT INFO */}
      <div className="product-info">

        {/* BRAND */}
        <h3 className="brand">

          {
            product.brand ||
            "ShopKart"
          }

        </h3>

        {/* PRODUCT NAME */}
        <h2>
          {product.name}
        </h2>

        {/* CATEGORY */}
        <p
          style={{
            color: "gray"
          }}
        >
          {
            product.category
          }
        </p>

        {/* SIZE */}
        <div className="sizes">

          <p>
            Select Size
          </p>

          <div className="size-box">

            {sizes.map((
              size
            ) => (

              <button
                key={size}

                className={
                  selectedSize ===
                  size

                    ? "active"

                    : ""
                }

                onClick={() =>
                  setSelectedSize(
                    size
                  )
                }
              >
                {size}
              </button>

            ))}

          </div>

        </div>

        {/* USER RATING */}
        <div
          style={{
            marginTop:
              "20px"
          }}
        >

          <p>
            Rate Product
          </p>

          {[1,2,3,4,5]
            .map((star) => (

              <span
                key={star}

                onClick={() =>
                  setSelectedRating(
                    star
                  )
                }

                style={{
                  fontSize:
                    "30px",

                  cursor:
                    "pointer",

                  color:
                    star <=
                    selectedRating

                      ? "gold"

                      : "#ccc",

                  transition:
                    "0.3s"
                }}
              >
                ★
              </span>

            ))}

        </div>

        {/* PRICE */}
        <div className="price-section">

          <span className="discount">

            {
              randomDiscount
            }

          </span>

          <span className="old-price">

            ₹
            {
              randomOldPrice
            }

          </span>

          <span className="price">

            ₹
            {product.price}

          </span>

        </div>

        {/* DESCRIPTION */}
        <div
          style={{
            marginTop:
              "25px"
          }}
        >

          <h3>
            Product Details
          </h3>

          <p>
            Premium quality product with stylish design and comfortable fit.
          </p>

          <p>
            Free delivery available.
          </p>

          <p>
            7 days return policy.
          </p>

        </div>

        {/* BUTTONS */}
        <div className="actions">

          {/* ADD CART */}
          <button
            className="add-cart"

            onClick={
              handleAddToCart
            }
          >
            Add to Cart
          </button>

          {/* BUY NOW */}
          <button
            className="buy-now"

            onClick={
              handleBuyNow
            }
          >
            Buy at ₹
            {product.price}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;

