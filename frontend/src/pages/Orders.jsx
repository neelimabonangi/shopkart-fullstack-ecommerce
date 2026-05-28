import {
  useEffect,
  useState
} from "react";

function Orders() {

  const [orders,
    setOrders] =
    useState([]);

  useEffect(() => {

    const savedOrders =

      JSON.parse(
        localStorage.getItem(
          "orders"
        )
      ) || [];

    console.log(
      "ORDERS:",
      savedOrders
    );

    setOrders(savedOrders);

  }, []);

  if (orders.length === 0) {

    return (

      <div
        style={{
          textAlign:
            "center",
          marginTop:
            "80px"
        }}
      >

        <h1>
          No orders yet
        </h1>

        <p>
          Place an order to see it here
        </p>

      </div>

    );
  }

  return (

    <div
      style={{
        padding: "30px",
        maxWidth:
          "1100px",
        margin: "auto"
      }}
    >

      <h1
        style={{
          marginBottom:
            "30px"
        }}
      >
        Order History Details
      </h1>

      {orders.map((
        order,
        orderIndex
      ) => (

        <div
          key={orderIndex}
          style={{
            background:
              "white",

            padding:
              "25px",

            borderRadius:
              "12px",

            marginBottom:
              "30px",

            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)"
          }}
        >

          <h2>
            Order #
            {orderIndex + 1}
          </h2>

          <p>
            {
              order.orderDate
            }
          </p>

          <h2
            style={{
              color:
                "green"
            }}
          >
            ₹{order.total}
          </h2>

          {order.items.map((
            item,
            index
          ) => (

            <div
              key={index}
              style={{
                display:
                  "flex",

                gap: "20px",

                marginTop:
                  "20px",

                borderTop:
                  "1px solid #eee",

                paddingTop:
                  "20px"
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
                    "140px",

                  height:
                    "170px",

                  objectFit:
                    "cover",

                  borderRadius:
                    "10px"
                }}
              />

              <div>

                <h2>
                  {item.name}
                </h2>

                <p>
                  ₹{item.price}
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

                    item.size ||

                    "M"
                  }
                </p>

                <p
                  style={{
                    color:
                      "green",

                    fontWeight:
                      "bold"
                  }}
                >
                  Delivered ✅
                </p>

              </div>

            </div>

          ))}

        </div>

      ))}

    </div>
  );
}

export default Orders;





