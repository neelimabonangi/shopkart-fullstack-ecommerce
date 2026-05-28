import {
  useContext,
  useState
} from "react";

import {
  CartContext
} from "../context/CartContext";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

function Checkout() {

  const {
    cart,
    clearCart
  } = useContext(
    CartContext
  );

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const buyNowProduct =
    location.state?.buyNowProduct;

  // ✅ PRODUCTS
  const initialItems =

    buyNowProduct

      ? [
          {
            ...buyNowProduct,
            quantity: 1
          }
        ]

      : cart.map((item) => ({
          ...item,
          quantity:
            item.quantity || 1
        }));

  // ✅ ITEMS STATE
  const [items,
    setItems] =
    useState(initialItems);

  // ✅ STEP
  const [step,
    setStep] =
    useState(1);

  // ✅ ADDRESS
  const [address,
    setAddress] =
    useState({

      name: "",

      mobile: "",

      city: "",

      fullAddress: ""

    });

  // ✅ PAYMENT
  const [paymentMethod,
    setPaymentMethod] =
    useState("COD");

  const [upiApp,
    setUpiApp] =
    useState("PhonePe");

  const [upiId,
    setUpiId] =
    useState("");

  // ✅ EMPTY CART
  if (items.length === 0) {

    return (

      <div
        style={{
          padding: "40px",
          textAlign:
            "center"
        }}
      >

        <h2>
          Your cart is empty
        </h2>

        <button
          onClick={() =>
            navigate("/")
          }
          style={continueBtn}
        >
          Go Home
        </button>

      </div>

    );
  }

  // ✅ TOTAL
  const checkoutTotal =
    items.reduce(

      (sum, item) =>

        sum +

        item.price *

        item.quantity,

      0
    );

  // ✅ INCREASE QUANTITY
  const increaseQuantity =
    (index) => {

    const updatedItems =
      [...items];

    updatedItems[index]
      .quantity += 1;

    setItems(
      updatedItems
    );
  };

  // ✅ DECREASE QUANTITY
  const decreaseQuantity =
    (index) => {

    const updatedItems =
      [...items];

    if (
      updatedItems[index]
        .quantity > 1
    ) {

      updatedItems[index]
        .quantity -= 1;

      setItems(
        updatedItems
      );
    }
  };

  // ✅ PLACE ORDER
  const handlePlaceOrder =
    () => {

    // ADDRESS VALIDATION
    if (

      !address.name ||

      !address.mobile ||

      !address.city ||

      !address.fullAddress
    ) {

      alert(
        "Please fill all address details"
      );

      return;
    }

    // UPI VALIDATION
    if (
      paymentMethod === "UPI" &&
      !upiId.trim()
    ) {

      alert(
        "Please enter UPI ID"
      );

      return;
    }

    // ✅ ORDER DATA
    const orderData = {

      id: Date.now(),

      products: items,

      items: items,

      total:
        checkoutTotal,

      totalAmount:
        checkoutTotal,

      paymentMethod,

      upiApp:
        paymentMethod === "UPI"

          ? upiApp

          : null,

      address,

      orderDate:
        new Date()
          .toLocaleString(),

      date:
        new Date()
          .toLocaleString()

    };

    // ✅ GET OLD ORDERS
    const existingOrders =

      JSON.parse(
        localStorage.getItem(
          "orders"
        )
      ) || [];

    // ✅ ADD NEW ORDER
    existingOrders.push(
      orderData
    );

    // ✅ SAVE CUSTOMER ORDERS
    localStorage.setItem(

      "orders",

      JSON.stringify(
        existingOrders
      )
    );

    // ✅ SAVE ADMIN ORDERS
    localStorage.setItem(

      "allOrders",

      JSON.stringify(
        existingOrders
      )
    );

    // ✅ CLEAR CART
    clearCart();

    // ✅ SUCCESS
    alert(
      "✅ Order Placed Successfully"
    );

    // ✅ REDIRECT
    navigate("/orders");
  };

  return (

    <div
      style={{
        background:
          "#f1f3f6",
        minHeight:
          "100vh",
        padding:
          "20px"
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display:
            "flex",

          justifyContent:
            "center",

          gap: "50px",

          marginBottom:
            "30px",

          fontWeight:
            "bold",

          fontSize:
            "22px"
        }}
      >

        <div
          style={{
            color:
              step >= 1
                ? "#2874f0"
                : "gray"
          }}
        >
          1 Address
        </div>

        <div
          style={{
            color:
              step >= 2
                ? "#2874f0"
                : "gray"
          }}
        >
          2 Summary
        </div>

        <div
          style={{
            color:
              step >= 3
                ? "#2874f0"
                : "gray"
          }}
        >
          3 Payment
        </div>

      </div>

      {/* STEP 1 */}
      {step === 1 && (

        <div style={boxStyle}>

          <h2>
            Delivery Address
          </h2>

          <input
            placeholder="Full Name"
            value={address.name}
            onChange={(e) =>
              setAddress({
                ...address,
                name:
                  e.target.value
              })
            }
            style={inputStyle}
          />

          <input
            placeholder="Mobile Number"
            value={address.mobile}
            onChange={(e) =>
              setAddress({
                ...address,
                mobile:
                  e.target.value
              })
            }
            style={inputStyle}
          />

          <input
            placeholder="City"
            value={address.city}
            onChange={(e) =>
              setAddress({
                ...address,
                city:
                  e.target.value
              })
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Full Address"
            value={
              address.fullAddress
            }
            onChange={(e) =>
              setAddress({
                ...address,
                fullAddress:
                  e.target.value
              })
            }
            style={{
              ...inputStyle,
              height: "100px"
            }}
          />

          <button
            onClick={() =>
              setStep(2)
            }
            style={continueBtn}
          >
            Continue
          </button>

        </div>

      )}

      {/* STEP 2 */}
      {step === 2 && (

        <div style={boxStyle}>

          <h2>
            Order Summary
          </h2>

          {items.map((
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

                borderBottom:
                  "1px solid #eee",

                paddingBottom:
                  "20px"
              }}
            >

              {/* IMAGE */}
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
                    "120px",

                  height:
                    "120px",

                  objectFit:
                    "cover",

                  borderRadius:
                    "10px"
                }}
              />

              {/* DETAILS */}
              <div>

                <h2>
                  {item.name}
                </h2>

                <h3>
                  ₹{item.price}
                </h3>

                {/* QUANTITY */}
                <div
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: "12px",

                    marginTop:
                      "15px"
                  }}
                >

                  <button
                    onClick={() =>
                      decreaseQuantity(index)
                    }

                    style={
                      quantityBtn
                    }
                  >
                    -
                  </button>

                  <span
                    style={{
                      fontSize:
                        "18px",

                      fontWeight:
                        "bold"
                    }}
                  >
                    {
                      item.quantity
                    }
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(index)
                    }

                    style={
                      quantityBtn
                    }
                  >
                    +
                  </button>

                </div>

                {/* SIZE */}
                <p
                  style={{
                    marginTop:
                      "15px"
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

                {/* ITEM TOTAL */}
                <h3
                  style={{
                    color:
                      "green"
                  }}
                >
                  ₹
                  {
                    item.price *
                    item.quantity
                  }
                </h3>

              </div>

            </div>

          ))}

          {/* FINAL TOTAL */}
          <h1
            style={{
              marginTop:
                "30px"
            }}
          >
            Total:
            ₹{checkoutTotal}
          </h1>

          <button
            onClick={() =>
              setStep(3)
            }

            style={continueBtn}
          >
            Continue
          </button>

        </div>

      )}

      {/* STEP 3 */}
      {step === 3 && (

        <div style={boxStyle}>

          <h2>
            Select Payment Method
          </h2>

          {/* COD */}
          <div
            style={paymentBox}

            onClick={() =>
              setPaymentMethod(
                "COD"
              )
            }
          >

            <input
              type="radio"

              checked={
                paymentMethod ===
                "COD"
              }

              readOnly
            />

            Cash On Delivery

          </div>

          {/* UPI */}
          <div
            style={paymentBox}

            onClick={() =>
              setPaymentMethod(
                "UPI"
              )
            }
          >

            <input
              type="radio"

              checked={
                paymentMethod ===
                "UPI"
              }

              readOnly
            />

            UPI Payment

          </div>

          {/* UPI DETAILS */}
          {paymentMethod ===
            "UPI" && (

            <div>

              <select
                value={upiApp}

                onChange={(e) =>
                  setUpiApp(
                    e.target.value
                  )
                }

                style={inputStyle}
              >

                <option>
                  PhonePe
                </option>

                <option>
                  Google Pay
                </option>

                <option>
                  Paytm
                </option>

              </select>

              <input
                placeholder="Enter UPI ID"

                value={upiId}

                onChange={(e) =>
                  setUpiId(
                    e.target.value
                  )
                }

                style={inputStyle}
              />

            </div>

          )}

          {/* PLACE ORDER */}
          <button
            onClick={
              handlePlaceOrder
            }

            style={continueBtn}
          >
            Place Order
          </button>

        </div>

      )}

    </div>
  );
}

// ✅ BOX
const boxStyle = {

  background:
    "white",

  padding:
    "25px",

  borderRadius:
    "10px",

  maxWidth:
    "700px",

  margin:
    "auto"

};

// ✅ INPUT
const inputStyle = {

  width: "100%",

  padding: "12px",

  marginTop: "15px",

  borderRadius:
    "8px",

  border:
    "1px solid #ccc",

  fontSize:
    "16px"

};

// ✅ BUTTON
const continueBtn = {

  marginTop: "20px",

  background:
    "#fb641b",

  color: "white",

  border: "none",

  padding:
    "15px 30px",

  borderRadius:
    "8px",

  cursor:
    "pointer",

  fontWeight:
    "bold",

  fontSize:
    "16px"

};

// ✅ QUANTITY BUTTON
const quantityBtn = {

  width: "35px",

  height: "35px",

  borderRadius:
    "50%",

  border:
    "1px solid #ccc",

  background:
    "white",

  cursor:
    "pointer",

  fontSize:
    "20px",

  fontWeight:
    "bold"
};

// ✅ PAYMENT
const paymentBox = {

  border:
    "1px solid #ddd",

  padding: "15px",

  borderRadius:
    "10px",

  marginTop:
    "15px",

  cursor:
    "pointer"

};

export default Checkout;