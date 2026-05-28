import React,
{
  useEffect,
  useState,
  useContext
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  CartContext
} from "../context/CartContext";

function ProductList({
  category,
  search
}) {

  const navigate =
    useNavigate();

  // ✅ CART CONTEXT
  const {
    addToCart
  } = useContext(
    CartContext
  );

  // ✅ PRODUCTS
  const [products,
    setProducts] =
    useState([]);

  // ✅ LOADING
  const [loading,
    setLoading] =
    useState(true);

  // ✅ ERROR
  const [error,
    setError] =
    useState(null);

  // ✅ SIZE
  const [selectedSizes,
    setSelectedSizes] =
    useState({});

  // ✅ RATINGS
  const [userRatings,
    setUserRatings] =
    useState({});

  // ✅ API
  const API_URL =
    "http://localhost:8080/api/products";

  // ✅ FETCH PRODUCTS
  useEffect(() => {

    axios
      .get(API_URL)

      .then((res) => {

        setProducts(
          res.data
        );

        setLoading(false);

      })

      .catch((err) => {

        console.error(err);

        setError(
          "Failed to load products"
        );

        setLoading(false);

      });

  }, []);

  // ✅ CATEGORY FILTER
  const filteredProducts =

    category === "All" ||
    !category

      ? products

      : products.filter(
          (item) =>

            item.category
              ?.toLowerCase()

              ===

            category
              ?.toLowerCase()
        );

  // ✅ SEARCH FILTER
  const finalProducts =
    filteredProducts.filter(
      (item) =>

        item.name
          ?.toLowerCase()

          .includes(
            search?.toLowerCase() || ""
          )
    );

  // ✅ RATINGS
  const ratings = [
    3.5,
    3.8,
    4.0,
    4.2,
    4.5,
    4.7
  ];

  // ✅ DISCOUNTS
  const discounts = [
    "40% OFF",
    "50% OFF",
    "60% OFF",
    "70% OFF",
    "80% OFF"
  ];

  // ✅ ADD TO CART
  const handleAddToCart =
    (product) => {

    addToCart(product);

  };

  // ✅ BUY NOW
  const handleBuyNow =
    (product) => {

    navigate(
      "/checkout",
      {
        state: {
          buyNowProduct: {
            ...product,
            quantity: 1
          }
        }
      }
    );
  };

  // ✅ LOADING
  if (loading) {

    return (

      <h2
        style={{
          textAlign:
            "center",
          marginTop:
            "50px"
        }}
      >
        Loading products...
      </h2>

    );
  }

  // ✅ ERROR
  if (error) {

    return (

      <h2
        style={{
          textAlign:
            "center",
          marginTop:
            "50px",
          color: "red"
        }}
      >
        {error}
      </h2>

    );
  }

  // ✅ EMPTY
  if (
    finalProducts.length === 0
  ) {

    return (

      <h2
        style={{
          textAlign:
            "center",
          marginTop:
            "50px"
        }}
      >
        No products found
      </h2>

    );
  }

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "25px"
        }}
      >

        {finalProducts.map(
          (item, index) => {

            const randomRating =
              ratings[
                index %
                ratings.length
              ];

            const randomDiscount =
              discounts[
                index %
                discounts.length
              ];

            return (

              <div
                key={item.id}

                style={{
                  border:
                    "1px solid #ddd",
                  borderRadius:
                    "12px",
                  padding:
                    "15px",
                  background:
                    "white",
                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.08)"
                }}
              >

                {/* IMAGE */}
                <div
                  onClick={() =>
                    navigate(
                      `/product/${item.id}`
                    )
                  }

                  style={{
                    overflow:
                      "hidden",
                    borderRadius:
                      "10px",
                    cursor:
                      "pointer"
                  }}
                >

                  <img
                    src={
                      item.imageUrl ||
                      item.image
                    }

                    alt={
                      item.name
                    }

                    style={{
                      width:
                        "100%",
                      height:
                        "350px",
                      objectFit:
                        "cover",
                      borderRadius:
                        "10px",
                      transition:
                        "0.4s ease"
                    }}

                    onMouseOver={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1.12)";
                    }}

                    onMouseOut={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1)";
                    }}
                  />

                </div>

                {/* NAME */}
                <h2
                  style={{
                    marginTop:
                      "15px",
                    fontSize:
                      "22px"
                  }}
                >
                  {item.name}
                </h2>

                {/* CATEGORY */}
                <p
                  style={{
                    color:
                      "gray"
                  }}
                >
                  {item.category}
                </p>

                {/* RATINGS */}
                <div
                  style={{
                    marginTop:
                      "10px",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: "10px"
                  }}
                >

                  {[1,2,3,4,5]
                    .map((star) => (

                      <span
                        key={star}

                        onClick={() =>

                          setUserRatings({

                            ...userRatings,

                            [item.id]:
                              star

                          })
                        }

                        style={{
                          cursor:
                            "pointer",
                          fontSize:
                            "24px",
                          color:

                            star <=
                            (
                              userRatings[
                                item.id
                              ] ||

                              Math.round(
                                randomRating
                              )
                            )

                              ? "gold"

                              : "#d1d5db"
                        }}
                      >
                        ★
                      </span>

                    ))}

                  <span>
                    {
                      userRatings[
                        item.id
                      ] ||
                      randomRating
                    }
                  </span>

                </div>

                {/* PRICE */}
                <div
                  style={{
                    marginTop:
                      "15px"
                  }}
                >

                  <span
                    style={{
                      color:
                        "green",
                      fontWeight:
                        "bold",
                      marginRight:
                        "10px"
                    }}
                  >
                    {
                      randomDiscount
                    }
                  </span>

                  <span
                    style={{
                      textDecoration:
                        "line-through",
                      color:
                        "gray",
                      marginRight:
                        "10px"
                    }}
                  >
                    ₹
                    {item.price + 1000}
                  </span>

                  <span
                    style={{
                      fontWeight:
                        "bold",
                      fontSize:
                        "28px"
                    }}
                  >
                    ₹{item.price}
                  </span>

                </div>

                {/* SIZE */}
                <div
                  style={{
                    marginTop:
                      "20px"
                  }}
                >

                  <p
                    style={{
                      fontWeight:
                        "bold"
                    }}
                  >
                    Select Size
                  </p>

                  <div
                    style={{
                      display:
                        "flex",
                      gap: "10px"
                    }}
                  >

                    {[
                      "XS",
                      "S",
                      "M",
                      "L",
                      "XL"
                    ].map((size) => (

                      <button
                        key={size}

                        onClick={() =>
                          setSelectedSizes({

                            ...selectedSizes,

                            [item.id]:
                              size

                          })
                        }

                        style={{
                          width:
                            "45px",
                          height:
                            "45px",
                          border:

                            selectedSizes[
                              item.id
                            ] === size

                              ? "2px solid #2874f0"

                              : "1px solid #ccc",

                          background:

                            selectedSizes[
                              item.id
                            ] === size

                              ? "#e8f0fe"

                              : "white",

                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                          fontWeight:
                            "bold"
                        }}
                      >
                        {size}
                      </button>

                    ))}

                  </div>

                </div>

                {/* BUTTONS */}
                <div
                  style={{
                    display:
                      "flex",
                    gap: "15px",
                    marginTop:
                      "25px"
                  }}
                >

                  {/* ADD TO CART */}
                  <button
                    onClick={() =>

                      handleAddToCart({

                        ...item,

                        selectedSize:

                          selectedSizes[
                            item.id
                          ] || "M"
                      })
                    }

                    style={{
                      flex: 1,
                      background:
                        "#ff9f00",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "14px",
                      borderRadius:
                        "8px",
                      fontWeight:
                        "bold",
                      cursor:
                        "pointer"
                    }}
                  >
                    Add To Cart
                  </button>

                  {/* BUY NOW */}
                  <button
                    onClick={() =>

                      handleBuyNow({

                        ...item,

                        selectedSize:

                          selectedSizes[
                            item.id
                          ] || "M"
                      })
                    }

                    style={{
                      flex: 1,
                      background:
                        "#2874f0",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "14px",
                      borderRadius:
                        "8px",
                      fontWeight:
                        "bold",
                      cursor:
                        "pointer"
                    }}
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            );
          }
        )}

      </div>

    </div>
  );
}

export default ProductList;








































