import "./Navbar.css";

import {
  useNavigate
} from "react-router-dom";

import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  CartContext
} from "../context/CartContext";

function Navbar({
  search,
  setSearch,
  setCategory
}) {

  const navigate =
    useNavigate();

  // ✅ CART
  const {
    totalItems
  } = useContext(
    CartContext
  );

  // ✅ USER STATE
  const [loggedInUser,
    setLoggedInUser] =
    useState(null);

  // ✅ LOAD USER
  useEffect(() => {

    const user =

      JSON.parse(
        localStorage.getItem(
          "loggedInUser"
        )
      );

    setLoggedInUser(
      user
    );

  }, []);

  // ✅ ADMIN CHECK
  const isAdmin =

    loggedInUser?.role ===
    "admin";

  // ✅ LOGOUT
  const handleLogout =
    () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    localStorage.removeItem(
      "isAdmin"
    );

    alert(
      "Logged out successfully ✅"
    );

    window.location.href =
      "/login";
  };

  return (

    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">

        {/* LOGO */}
        <h2
          className="logo"

          onClick={() => {

            setCategory("All");

            setSearch("");

            navigate("/");

          }}
        >
          ShopKart
        </h2>

        {/* CATEGORY */}
        <div className="categories">

          {/* ALL */}
          <button
            onClick={() => {

              setCategory("All");

              navigate("/products");

            }}
          >
            All
          </button>

          {/* MEN */}
          <button
            onClick={() => {

              setCategory(
                "Men Fashion"
              );

              navigate("/products");

            }}
          >
            Men
          </button>

          {/* WOMEN */}
          <button
            onClick={() => {

              setCategory(
                "Women Fashion"
              );

              navigate("/products");

            }}
          >
            Women
          </button>

        </div>

      </div>

      {/* SEARCH */}
      <input
        className="nav-search"

        type="text"

        placeholder="Search for products..."

        value={search}

        onChange={(e) => {

          setSearch(
            e.target.value
          );

          navigate("/products");

        }}
      />

      {/* RIGHT */}
      <div className="nav-right">

        {/* ✅ ADMIN BUTTON */}
        {isAdmin && (

          <button
            onClick={() =>
              navigate(
                "/admin/orders"
              )
            }

            style={{
              background:
                "#ff9800",

              color:
                "white",

              border:
                "none",

              padding:
                "10px 18px",

              borderRadius:
                "6px",

              cursor:
                "pointer",

              marginRight:
                "10px",

              fontWeight:
                "bold"
            }}
          >
            Admin
          </button>

        )}

        {/* LOGIN */}
        {!loggedInUser && (

          <button
            className="login-btn"

            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>

        )}

        {/* LOGOUT */}
        {loggedInUser && (

          <button
            onClick={
              handleLogout
            }

            style={{
              background:
                "#ff4d4f",

              color:
                "white",

              border:
                "none",

              padding:
                "10px 18px",

              borderRadius:
                "6px",

              cursor:
                "pointer",

              marginRight:
                "10px",

              fontWeight:
                "bold"
            }}
          >
            Logout
          </button>

        )}

        {/* CART */}
        <button
          onClick={() =>
            navigate("/cart")
          }

          style={{
            position:
              "relative",

            background:
              "#ff9f00",

            color:
              "white",

            border:
              "none",

            padding:
              "10px 20px",

            borderRadius:
              "5px",

            cursor:
              "pointer",

            fontWeight:
              "bold",

            fontSize:
              "16px"
          }}
        >

          Cart

          {/* BADGE */}
          {totalItems > 0 && (

            <span
              style={{
                position:
                  "absolute",

                top: "-8px",

                right: "-8px",

                backgroundColor:
                  "red",

                color:
                  "white",

                borderRadius:
                  "50%",

                width: "22px",

                height: "22px",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                fontSize:
                  "12px",

                fontWeight:
                  "bold"
              }}
            >
              {totalItems}
            </span>

          )}

        </button>

      </div>

    </nav>
  );
}

export default Navbar;



































