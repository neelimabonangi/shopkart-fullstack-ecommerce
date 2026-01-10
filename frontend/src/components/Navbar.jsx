import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar({ search, setSearch, setCategory }) {
  const navigate = useNavigate();
  const { totalItems } = useContext(CartContext);

  // ✅ ADMIN CHECK (FROM LOGIN)
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <h2
          className="logo"
          onClick={() => {
            setCategory(null);
            setSearch("");
            navigate("/");
          }}
        >
          ShopKart
        </h2>

        <div className="categories">
          <button
            onClick={() => {
              setCategory(null);
              navigate("/products");
            }}
          >
            All
          </button>

          <button
            onClick={() => {
              setCategory("men");
              navigate("/products");
            }}
          >
            Men
          </button>

          <button
            onClick={() => {
              setCategory("women");
              navigate("/products");
            }}
          >
            Women
          </button>
        </div>
      </div>

      {/* CENTER */}
      <input
        className="nav-search"
        type="text"
        placeholder="Search for products, brands and more"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          navigate("/products");
        }}
      />

      {/* RIGHT — PLACEMENT UNCHANGED */}
      <div className="nav-right">
        {/* ✅ ADMIN BUTTON (VISIBLE ONLY FOR ADMIN) */}
        {isAdmin && (
          <button
            className="orders-btn"
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
        )}

        {/* ❌ Orders button removed */}

        <button
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="cart-btn"
          onClick={() => navigate("/cart")}
        >
          Cart
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;





































