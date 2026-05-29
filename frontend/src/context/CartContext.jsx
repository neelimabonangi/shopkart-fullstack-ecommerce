import {
  createContext,
  useState,
  useEffect
} from "react";

import axios from "axios";

// ✅ BACKEND URL
const BASE_URL =
  "https://shopkart-fullstack-ecommerce.onrender.com";

// ✅ CONTEXT
export const CartContext =
  createContext();

// ✅ PROVIDER
export function CartProvider({
  children
}) {

  // ✅ CART STATE
  const [cart,
    setCart] =
    useState(() => {

      try {

        const savedCart =
          localStorage.getItem(
            "cart"
          );

        return savedCart

          ? JSON.parse(savedCart)

          : [];

      } catch (e) {

        console.error(
          "Cart load error:",
          e
        );

        return [];

      }
    });

  // ✅ ORDERS
  const [orders,
    setOrders] =
    useState([]);

  // ✅ SAVE CART
  useEffect(() => {

    localStorage.setItem(

      "cart",

      JSON.stringify(cart)

    );

  }, [cart]);

  // ✅ FETCH ORDERS
  useEffect(() => {

    axios
      .get(
        `${BASE_URL}/api/orders`
      )

      .then((res) => {

        setOrders(
          res.data || []
        );

      })

      .catch((err) => {

        console.error(
          "Fetch orders error:",
          err
        );

      });

  }, []);

  // ✅ ADD TO CART
  const addToCart =
    (product) => {

    if (
      !product ||
      product.id == null
    ) {

      return;
    }

    setCart((prev) => {

      // ✅ CHECK SAME PRODUCT + SIZE
      const existingItem =
        prev.find(
          (item) =>

            item.id ===
            product.id

            &&

            item.selectedSize ===
            product.selectedSize
        );

      // ✅ IF EXISTS
      if (existingItem) {

        return prev.map(
          (item) =>

            item.id ===
            product.id

            &&

            item.selectedSize ===
            product.selectedSize

              ? {

                  ...item,

                  quantity:
                    item.quantity + 1
                }

              : item
        );
      }

      // ✅ NEW PRODUCT
      return [

        ...prev,

        {
          ...product,

          quantity: 1
        }
      ];
    });

    alert(
      "✅ Added To Cart"
    );
  };

  // ✅ REMOVE ITEM
  const removeFromCart =
    (
      id,
      selectedSize
    ) => {

    setCart((prev) =>

      prev.filter(
        (item) =>

          !(

            item.id === id

            &&

            item.selectedSize ===
            selectedSize
          )
      )
    );
  };

  // ✅ INCREASE QUANTITY
  const increaseQuantity =
    (
      id,
      selectedSize
    ) => {

    setCart((prev) =>

      prev.map(
        (item) => {

          if (

            item.id === id

            &&

            item.selectedSize ===
            selectedSize

          ) {

            return {

              ...item,

              quantity:
                item.quantity + 1
            };
          }

          return item;
        }
      )
    );
  };

  // ✅ DECREASE QUANTITY
  const decreaseQuantity =
    (
      id,
      selectedSize
    ) => {

    setCart((prev) =>

      prev.map(
        (item) => {

          if (

            item.id === id

            &&

            item.selectedSize ===
            selectedSize

          ) {

            return {

              ...item,

              quantity:

                item.quantity > 1

                  ? item.quantity - 1

                  : 1
            };
          }

          return item;
        }
      )
    );
  };

  // ✅ CLEAR CART
  const clearCart =
    () => {

    setCart([]);

  };

  // ✅ PLACE ORDER
  const placeOrder =
    async (
      orderData
    ) => {

    if (

      !orderData ||

      !orderData.items ||

      orderData.items.length === 0

    ) {

      alert(
        "No items in order"
      );

      return;
    }

    try {

      // ✅ SAVE ORDER
      const res =
        await axios.post(

          `${BASE_URL}/api/orders`,

          orderData
        );

      // ✅ UPDATE ORDERS
      setOrders((prev) => [

        ...prev,

        res.data

      ]);

      // ✅ SAVE ADMIN HISTORY
      const existingOrders =

        JSON.parse(
          localStorage.getItem(
            "allOrders"
          )
        ) || [];

      localStorage.setItem(

        "allOrders",

        JSON.stringify([

          ...existingOrders,

          res.data
        ])
      );

      // ✅ CLEAR CART
      clearCart();

      // ✅ SUCCESS
      alert(
        "✅ Order Placed Successfully"
      );

    } catch (err) {

      console.error(
        "Order failed:",
        err
      );

      alert(
        "❌ Failed to place order"
      );

    }
  };

  // ✅ TOTAL ITEMS
  const totalItems =

    cart.reduce(

      (sum, item) =>

        sum +
        (
          item.quantity || 1
        ),

      0
    );

  // ✅ TOTAL PRICE
  const totalPrice =

    cart.reduce(

      (sum, item) =>

        sum +

        (
          item.price *
          (
            item.quantity || 1
          )
        ),

      0
    );

  return (

    <CartContext.Provider

      value={{

        cart,

        setCart,

        orders,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        placeOrder,

        totalItems,

        totalPrice

      }}
    >

      {children}

    </CartContext.Provider>
  );
}











