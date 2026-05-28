import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import AdminSidebar from "./AdminSidebar";

import "./Admin.css";

function AdminOrders() {

  // ✅ ORDERS
  const [orders,
    setOrders] =
    useState([]);

  // ✅ LOADING
  const [loading,
    setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  // ✅ ADMIN CHECK
  useEffect(() => {

    const isAdmin =
      localStorage.getItem(
        "isAdmin"
      );

    if (
      isAdmin !== "true"
    ) {

      navigate("/login");

      return;
    }

    // ✅ GET CUSTOMER ORDERS
    const savedOrders =

      JSON.parse(
        localStorage.getItem(
          "allOrders"
        )
      ) || [];

    console.log(
      "CUSTOMER ORDERS:",
      savedOrders
    );

    setOrders(
      savedOrders
    );

    setLoading(false);

  }, [navigate]);

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <div className="admin-content">

        <h2
          style={{
            marginBottom:
              "25px"
          }}
        >
          Customer Orders History
        </h2>

        {/* LOADING */}
        {loading ? (

          <p>
            Loading customer orders...
          </p>

        ) : orders.length === 0 ? (

          // EMPTY
          <div
            style={{
              textAlign:
                "center",
              marginTop:
                "50px"
            }}
          >

            <h2>
              No customer orders found
            </h2>

            <p>
              Customers need to place orders first
            </p>

          </div>

        ) : (

          orders.map((
            order,
            orderIndex
          ) => {

            // ✅ PRODUCTS
            const items =

              order.products ||

              order.items ||

              [];

            return (

              <div
                key={orderIndex}

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
                    "0 2px 10px rgba(0,0,0,0.08)"
                }}
              >

                {/* ORDER HEADER */}
                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    borderBottom:
                      "1px solid #eee",

                    paddingBottom:
                      "15px",

                    marginBottom:
                      "25px"
                  }}
                >

                  {/* LEFT */}
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
                      {
                        order.orderDate ||

                        order.date
                      }
                    </p>

                  </div>

                  {/* RIGHT */}
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

                        order.totalAmount
                      }
                    </h2>

                    <p>
                      Payment:
                      {" "}
                      {
                        order.paymentMethod ||
                        "COD"
                      }
                    </p>

                  </div>

                </div>

                {/* PRODUCTS */}
                {items.map((
                  item,
                  index
                ) => (

                  <div
                    key={index}

                    style={{
                      display:
                        "flex",

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
                    <div
                      style={{
                        overflow:
                          "hidden",

                        borderRadius:
                          "10px"
                      }}
                    >

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
                            "170px",

                          height:
                            "210px",

                          objectFit:
                            "cover",

                          borderRadius:
                            "10px",

                          transition:
                            "0.4s ease",

                          cursor:
                            "pointer"
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

                    {/* DETAILS */}
                    <div
                      style={{
                        flex: 1
                      }}
                    >

                      <h2>
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

                      {/* PRICE */}
                      <h2
                        style={{
                          marginTop:
                            "15px"
                        }}
                      >
                        ₹
                        {item.price}
                      </h2>

                      {/* SIZE */}
                      <p
                        style={{
                          marginTop:
                            "10px"
                        }}
                      >
                        Size:
                        {" "}
                        {
                          item.selectedSize ||

                          item.size ||

                          "M"
                        }
                      </p>

                      {/* QUANTITY */}
                      <p>
                        Quantity:
                        {" "}
                        {
                          item.quantity
                        }
                      </p>

                      {/* RATING */}
                      <div
                        style={{
                          marginTop:
                            "12px"
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

                      {/* STATUS */}
                      <p
                        style={{
                          marginTop:
                            "15px",

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

            );
          })
        )}

      </div>

    </div>
  );
}

export default AdminOrders;










