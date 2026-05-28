import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

function AdminDashboard() {

  const navigate =
    useNavigate();

  const [authorized,
    setAuthorized] =
    useState(false);

  const [orders,
    setOrders] =
    useState([]);

  const [cartProducts,
    setCartProducts] =
    useState([]);

  // ✅ ADMIN CHECK
  useEffect(() => {

    const isAdmin =
      localStorage.getItem(
        "isAdmin"
      );

    if (isAdmin === "true") {

      setAuthorized(true);

    } else {

      navigate("/login");

    }

  }, [navigate]);

  // ✅ FETCH ORDERS
  useEffect(() => {

    axios
      .get(
        "http://localhost:8080/api/orders"
      )

      .then((res) => {

        console.log(
          "ORDERS:",
          res.data
        );

        setOrders(
          res.data || []
        );

      })

      .catch((err) =>

        console.error(
          "Dashboard fetch error:",
          err
        )
      );

    // ✅ CART PRODUCTS
    const savedCart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || [];

    setCartProducts(
      savedCart
    );

  }, []);

  // ✅ LOADING
  if (!authorized) {

    return (
      <p
        style={{
          padding: "20px"
        }}
      >
        Checking admin access...
      </p>
    );
  }

  // ✅ TOTAL ORDERS
  const totalOrders =
    orders.length;

  // ✅ TOTAL REVENUE
  const totalRevenue =
    orders.reduce(

      (sum, order) => {

        // BACKEND TOTAL
        if (
          order?.totalAmount
        ) {

          return (
            sum +
            Number(
              order.totalAmount
            )
          );
        }

        // PRODUCTS
        const products =
          Array.isArray(
            order?.products
          )

            ? order.products

            : [];

        const orderTotal =
          products.reduce(

            (
              itemSum,
              item
            ) =>

              itemSum +
              Number(
                item?.price || 0
              ) *
                Number(
                  item?.quantity || 1
                ),

            0
          );

        return (
          sum + orderTotal
        );

      },

      0
    );

  // ✅ TOTAL PRODUCTS SOLD
  const totalProductsSold =
    orders.reduce(

      (sum, order) => {

        const products =
          Array.isArray(
            order?.products
          )

            ? order.products

            : [];

        const count =
          products.reduce(

            (
              itemSum,
              item
            ) =>

              itemSum +
              Number(
                item?.quantity || 1
              ),

            0
          );

        return sum + count;

      },

      0
    );

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <div className="admin-content">

        <h2>
          Dashboard
        </h2>

        {/* TOP CARDS */}
        <div className="admin-cards">

          {/* ORDERS */}
          <div className="admin-card">

            <h3>
              Total Orders
            </h3>

            <p>
              {totalOrders}
            </p>

          </div>

          {/* REVENUE */}
          <div className="admin-card">

            <h3>
              Total Revenue
            </h3>

            <p>
              ₹{totalRevenue}
            </p>

          </div>

          {/* PRODUCTS SOLD */}
          <div className="admin-card">

            <h3>
              Total Products Sold
            </h3>

            <p>
              {totalProductsSold}
            </p>

          </div>

        </div>

        {/* CUSTOMER ORDERS */}
        <h2
          style={{
            marginTop: "40px"
          }}
        >
          Customer Orders
        </h2>

        {orders.length === 0 ? (

          <p>
            No Orders Yet
          </p>

        ) : (

          orders.map((
            order,
            index
          ) => (

            <div
              key={index}
              style={{
                border:
                  "1px solid #ddd",
                padding: "20px",
                marginBottom:
                  "20px",
                borderRadius:
                  "10px",
                background:
                  "white"
              }}
            >

              <h3>
                Order #
                {index + 1}
              </h3>

              <p>
                Payment:
                {" "}
                {
                  order.paymentMethod ||
                  "COD"
                }
              </p>

              <p>
                Date:
                {" "}
                {
                  order.orderDate
                }
              </p>

              {/* PRODUCTS */}
              {(order.products || [])
                .map((
                  item,
                  i
                ) => (

                  <div
                    key={i}
                    style={{
                      display:
                        "flex",
                      gap: "15px",
                      marginTop:
                        "15px",
                      borderBottom:
                        "1px solid #eee",
                      paddingBottom:
                        "15px"
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
                          "90px",
                        height:
                          "90px",
                        objectFit:
                          "cover",
                        borderRadius:
                          "10px"
                      }}
                    />

                    <div>

                      <h4>
                        {item.name}
                      </h4>

                      <p>
                        ₹
                        {item.price}
                      </p>

                      <p>
                        Quantity:
                        {" "}
                        {
                          item.quantity
                        }
                      </p>

                      <p>
                        Size:
                        {" "}
                        {
                          item.selectedSize ||
                          "M"
                        }
                      </p>

                    </div>

                  </div>

                ))}

            </div>

          ))
        )}

        {/* CART PRODUCTS */}
        <h2
          style={{
            marginTop: "50px"
          }}
        >
          Customer Cart Products
        </h2>

        {cartProducts.length === 0 ? (

          <p>
            No Products In Cart
          </p>

        ) : (

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "20px"
            }}
          >

            {cartProducts.map(
              (item) => (

                <div
                  key={item.id}
                  style={{
                    border:
                      "1px solid #ddd",
                    padding:
                      "15px",
                    borderRadius:
                      "10px",
                    background:
                      "white"
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
                        "250px",
                      objectFit:
                        "cover",
                      borderRadius:
                        "10px"
                    }}
                  />

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    ₹
                    {item.price}
                  </p>

                  <p>
                    Quantity:
                    {" "}
                    {
                      item.quantity
                    }
                  </p>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminDashboard;













