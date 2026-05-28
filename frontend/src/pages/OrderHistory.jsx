import {
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  CartContext
} from "../context/CartContext";

function OrderHistory() {

  const {
    orders
  } = useContext(
    CartContext
  );

  const navigate =
    useNavigate();

  // ✅ EMPTY
  if (
    !orders ||
    orders.length === 0
  ) {

    return (

      <div
        style={{
          padding: "30px",
          textAlign:
            "center"
        }}
      >

        <h2>
          No orders yet
        </h2>

        <p>
          Your orders will appear here after checkout
        </p>

        <button
          onClick={() =>
            navigate("/products")
          }
          style={{
            marginTop:
              "20px",
            background:
              "#2874f0",
            color:
              "white",
            border:
              "none",
            padding:
              "12px 25px",
            borderRadius:
              "6px",
            cursor:
              "pointer",
            fontWeight:
              "bold"
          }}
        >
          Shop Now
        </button>

      </div>

    );
  }

  return (

    <div
      style={{
        background:
          "#f1f3f6",
        minHeight:
          "100vh",
        padding:
          "30px"
      }}
    >

      <div
        style={{
          maxWidth:
            "1100px",
          margin:
            "auto"
        }}
      >

        {/* TITLE */}
        <h1
          style={{
            marginBottom:
              "30px"
          }}
        >
          My Orders
        </h1>

        {orders.map((
          order,
          orderIndex
        ) => (

          <div
            key={
              order.id ||
              orderIndex
            }
            style={{
              background:
                "white",
              borderRadius:
                "12px",
              padding:
                "25px",
              marginBottom:
                "30px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)"
            }}
          >

            {/* ORDER TOP */}
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                marginBottom:
                  "25px",
                borderBottom:
                  "1px solid #eee",
                paddingBottom:
                  "15px"
              }}
            >

              <div>

                <h2>
                  Order #
                  {orderIndex + 1}
                </h2>

                <p
                  style={{
                    color:
                      "gray"
                  }}
                >
                  Order Date:
                  {" "}
                  {
                    order.date ||

                    order.orderDate
                  }
                </p>

              </div>

              <div
                style={{
                  textAlign:
                    "right"
                }}
              >

                <h2
                  style={{
                    color:
                      "green"
                    }}
                >
                  ₹
                  {
                    order.total ||

                    order.totalPrice
                  }
                </h2>

                <p>
                  {
                    order.paymentMethod
                  }
                </p>

              </div>

            </div>

            {/* PRODUCTS */}
            {(order.items ||

              order.products ||

              []).map((
              item,
              index
            ) => (

              <div
                key={index}
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: "25px",
                  marginBottom:
                    "25px",
                  borderBottom:
                    "1px solid #f2f2f2",
                  paddingBottom:
                    "20px"
                }}
              >

                {/* IMAGE */}
                <img
                  src={
                    item.imageUrl ||

                    item.image ||

                    "/no-image.png"
                  }

                  alt={
                    item.name
                  }

                  style={{
                    width:
                      "140px",

                    height:
                      "170px",

                    objectFit:
                      "cover",

                    borderRadius:
                      "10px"
                  }}
                />

                {/* DETAILS */}
                <div
                  style={{
                    flex: 1
                  }}
                >

                  <h2
                    style={{
                      margin: 0
                    }}
                  >
                    {item.name}
                  </h2>

                  {/* CATEGORY */}
                  <p
                    style={{
                      color:
                        "gray",
                      marginTop:
                        "8px"
                    }}
                  >
                    {
                      item.category
                    }
                  </p>

                  {/* RATING */}
                  <div
                    style={{
                      marginTop:
                        "10px"
                    }}
                  >

                    <span
                      style={{
                        background:
                          "green",
                        color:
                          "white",
                        padding:
                          "4px 10px",
                        borderRadius:
                          "5px",
                        fontWeight:
                          "bold"
                      }}
                    >
                      ⭐
                      {" "}
                      {
                        item.rating ||
                        4.2
                      }
                    </span>

                  </div>

                  {/* PRICE */}
                  <h2
                    style={{
                      marginTop:
                        "12px"
                    }}
                  >
                    ₹
                    {item.price}
                  </h2>

                  {/* SIZE */}
                  {(item.size ||

                    item.selectedSize)

                    && (

                    <p>
                      Size:
                      {" "}
                      {
                        item.size ||

                        item.selectedSize
                      }
                    </p>

                  )}

                  {/* QUANTITY */}
                  <p>
                    Quantity:
                    {" "}
                    {
                      item.quantity
                    }
                  </p>

                  {/* DELIVERY */}
                  <p
                    style={{
                      marginTop:
                        "12px",
                      color:
                        "green",
                      fontWeight:
                        "bold"
                    }}
                  >
                    Delivered Successfully ✅
                  </p>

                </div>

              </div>

            ))}

          </div>

        ))}

      </div>

    </div>
  );
}

export default OrderHistory;
